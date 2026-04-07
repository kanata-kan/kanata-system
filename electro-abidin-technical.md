# Electro Abidin eSystem — Technical Architecture Analysis

> Extracted directly from the codebase. No assumptions — only verified implementation details.

---

## 1. Data Model

### 1.1 Entities Overview

| Entity | Collection | Type | Purpose |
|---|---|---|---|
| **Product** | `products` | Referenced | Product catalog with cached stock |
| **InventoryLog** | `inventorylogs` | Referenced | FIFO batch entries (SSOT for stock and cost) |
| **Sale** | `sales` | Referenced | Single-product sale workflow document |
| **Order** | `orders` | Referenced + Embedded items | Multi-product sale transaction |
| **SalesTransactionItem** | `salestransactionitems` | Referenced | Canonical financial record per product sold |
| **Invoice** | `invoices` | Referenced + Embedded items | Legal document (FACTURE / BON DE VENTE) |
| **Guarantee** | `guarantees` | Referenced + Embedded items | Warranty document (separate from invoice) |
| **User** | `users` | Referenced | Manager / Cashier accounts |
| **Brand** | `brands` | Referenced | Product brand reference data |
| **Category** | `categories` | Referenced | Top-level product category |
| **SubCategory** | `subcategories` | Referenced | Linked to Category (1:N) |
| **Supplier** | `suppliers` | Referenced | Supplier reference data |
| **SupplierPurchase** | `supplierpurchases` | Referenced | Purchase tracking per supplier |
| **StoreSettings** | `storesettings` | Singleton | Store info, tax IDs, invoice config |
| **STIDailySnapshot** | `stidailysnapshots` | Immutable | Daily financial aggregates for drift detection |
| **LoginAttempt** | `loginattempts` | Referenced | Brute-force protection logs |
| **OpeningStockInitialization** | `openingstockinitializations` | Referenced | Tracks initial FIFO stock setup |

### 1.2 Relationships

```
Brand (1) ──────────── (N) Product
Category (1) ──── (N) SubCategory (1) ──── (N) Product
Supplier (1) ──────────── (N) InventoryLog (batch-level, NOT product-level)
Product (1) ──────────── (N) InventoryLog (FIFO batches)
Product (1) ──────────── (N) Sale
User/Cashier (1) ──────── (N) Sale / Order
Sale (1) ──────────────── (1) SalesTransactionItem
Order (1) ─────────────── (N) SalesTransactionItem (one per item)
Sale (1) ──────────────── (0..1) Invoice
Order (1) ─────────────── (0..1) Invoice
Invoice (1) ───────────── (0..1) Guarantee
```

### 1.3 Embedded vs Referenced

| Pattern | Where | Why |
|---|---|---|
| **Embedded** | `Order.items[]` (OrderItem) | Items belong exclusively to the order; no independent lifecycle |
| **Embedded** | `Invoice.items[]` (InvoiceItem) | Immutable snapshot of sale line items at invoice creation time |
| **Embedded** | `Guarantee.items[]` (GuaranteeItem) | Warranty snapshot per product — no independent querying needed |
| **Embedded** | `Sale.productSnapshot` | Point-in-time capture of product data for historical accuracy |
| **Embedded** | `Sale.customer`, `Order.customer` | Customer info captured at sale time (not a separate collection) |
| **Referenced** | `Product → Brand`, `Product → SubCategory` | Independent lifecycle; shared across products |
| **Referenced** | `InventoryLog → Product`, `InventoryLog → Supplier` | FIFO batches reference product and supplier independently |
| **Referenced** | `Sale → SalesTransactionItem` via `transactionItemId` | Dual-write pattern: Sale (workflow) links to STI (financial truth) |

### 1.4 How Stock and Sales Connect

```
InventoryLog.remainingQty  ←──  SINGLE SOURCE OF TRUTH for stock
        │
        ├── Product.stock  =  Σ(InventoryLog.remainingQty)  [CACHED value]
        │
        ├── Sale creation  →  FIFO consumption (oldest batch first)
        │                     InventoryLog.remainingQty decremented
        │                     Product.stock decremented via adjustStock()
        │
        └── Sale cancel    →  FIFO restoration (new InventoryLog entry at original cost)
                              Product.stock synced from FIFO aggregation
```

---

## 2. Core Flows

### 2.1 Sale Flow (Single Product)

**Entry point**: `SaleService.registerSale(data)`

```
1. VALIDATE inputs (productId, quantity, sellingPrice, cashierId)
2. CALCULATE TVA (tvaAmount = priceHT * tvaRate, priceTTC = priceHT * (1 + tvaRate))
3. START MongoDB transaction
   │
   ├── 4. VALIDATE product exists (within session)
   ├── 5. BLOCK if product has no priceRange (pricing lifecycle enforcement)
   ├── 6. VALIDATE cashier exists + not suspended
   ├── 7. CHECK cached stock (Product.stock >= quantity)
   ├── 8. CHECK FIFO stock (aggregate InventoryLog.remainingQty >= quantity)
   ├── 9. DETECT price override (sellingPriceHT outside priceRange.min/max)
   ├── 10. BUILD productSnapshot (identity + display + business fields, NO TVA)
   ├── 11. CREATE Sale document
   ├── 12. CONSUME FIFO batches (computeAndConsumeFifoCost)
   │       └── Loop: find oldest batch → decrement remainingQty → accumulate cost
   │       └── Hard failure if FIFO exhausted (no fallback)
   ├── 13. CREATE SalesTransactionItem (dual-write, with costHT from FIFO)
   ├── 14. LINK Sale ↔ STI (sale.transactionItemId = sti._id)
   ├── 15. DECREMENT Product.stock via ProductService.adjustStock(-qty)
   │
   └── 16. COMMIT transaction
   
17. CREATE Invoice/Receipt (post-transaction, non-blocking)
18. RETURN { sale, newStock, isLowStock, invoice }
```

### 2.2 Order Flow (Multi-Product)

**Entry point**: `OrderService.createOrder(data)`

Same pattern as Sale, but iterates over `items[]` array. Each item independently:
- Validates stock
- Consumes FIFO batches
- Creates its own SalesTransactionItem
- Decrements Product.stock

All within a single MongoDB transaction. Order totals auto-calculated via pre-save hook.

### 2.3 Stock / Inventory Flow

**Entry point**: `InventoryService.addInventoryEntry(data)`

```
1. VALIDATE inputs (productId, quantityAdded, purchasePrice, managerId)
2. START MongoDB transaction
   │
   ├── 3. VALIDATE product exists
   ├── 4. VALIDATE manager exists + has manager role
   ├── 5. CREATE InventoryLog entry
   │       └── remainingQty = quantityAdded (full batch available for FIFO)
   │       └── purchasePrice stored per batch (NOT on Product)
   │       └── supplier stored per batch (NOT on Product)
   ├── 6. INCREMENT Product.stock via ProductService.adjustStock(+qty)
   ├── 7. MARK product as fifoInitialized (if first batch)
   │
   └── 8. COMMIT transaction
```

**Key design**: `Product.purchasePrice` and `Product.supplier` are **FROZEN/DEPRECATED** fields. Cost and supplier now live exclusively at the batch level in `InventoryLog` (FIFO architecture).

### 2.4 Cancel / Return Flow

**Entry point**: `SaleService.cancelSale(saleId, managerId, reason)` / `SaleService.returnSale(...)`

```
1. VALIDATE sale exists + status === "active"
2. VALIDATE manager exists
3. GET SalesTransactionItem for cost data (unitCostHT = sti.costHT / sti.quantity)
4. START MongoDB transaction — ALL changes atomic:
   │
   ├── a. Sale.status → "cancelled" / "returned"
   ├── b. RESTORE FIFO batches (restoreFifoAndSyncStock):
   │       └── CREATE new InventoryLog entry at original cost
   │       └── SYNC Product.stock = Σ(InventoryLog.remainingQty) via aggregation
   ├── c. STI.status → "cancelled" / "returned"
   ├── d. Invoice.status → "cancelled" / "returned"
   ├── e. Guarantee.status → "cancelled"
   │
   └── 5. COMMIT transaction
   
6. RETURN sale + _syncStatus { sale, sti, fifo, invoice, guarantee }
```

**Critical**: If ANY step fails, the entire transaction is rolled back. No partial state is possible.

---

## 3. Business Logic Decisions

### 3.1 FIFO Implementation

**Where**: `SaleService.computeAndConsumeFifoCost()` + `lib/utils/fifoUtils.js`

**How it works**:
- Each `InventoryLog` entry is a FIFO batch with `remainingQty` and `purchasePrice`
- On sale: batches are consumed **oldest first** (`sort: { createdAt: 1, _id: 1 }`)
- The `remainingQty` of each batch is decremented atomically with a guard (`$gte: consumeQty`)
- Concurrent access protection: if `updateResult.modifiedCount !== 1`, throws `INVENTORY_BATCH_CONFLICT` (409)
- **No fallback**: if FIFO batches are exhausted, the sale is **hard-rejected** with `FIFO_BATCHES_EXHAUSTED`
- Index `{ product: 1, remainingQty: 1, createdAt: 1 }` optimizes FIFO lookups

**On cancellation/return**: a new `InventoryLog` entry is created at the original purchase price. This preserves FIFO ordering (returned stock enters at end of queue).

### 3.2 Snapshot Architecture

**Where**: `Sale.productSnapshot`, `Order.items[].productSnapshot`, `SalesTransactionItem.productSnapshot`, `Invoice.items[]`, `Guarantee.items[]`

**Design**:
- Every sale/order captures a **point-in-time snapshot** of product data (name, brand, category, reference, designation, priceRange, warranty)
- Snapshots contain **identity fields** (productId, categoryId, subCategoryId) for aggregations and **display fields** (name, brand string) for UI
- Invoice and Guarantee items are fully embedded snapshots — immutable after creation
- This ensures historical accuracy: if a product name/price changes later, past sales/invoices remain correct

### 3.3 Price Handling

**Model**: `Product.priceRange { min, max }` — flexible pricing within a range

- Products **cannot be sold** until `priceRange` is configured (`PRODUCT_NOT_PRICED` error)
- Cashier enters a selling price HT; the system checks if it falls within `[min, max]`
- If price is outside range: sale is **NOT blocked** — instead, `priceOverride: true` is recorded for audit
- A virtual `priceRange.suggested` computes the midpoint of min/max
- All prices are stored as **integers** (MAD, no decimals) via `Math.round()` setters

### 3.4 TVA (Tax) System

- TVA rate is provided per sale/order item (not hardcoded)
- Fields: `sellingPriceHT`, `tvaRate`, `tvaAmount`, `sellingPriceTTC`
- TVA lives in the **financial layer** (Sale, STI, Invoice), never in `productSnapshot`
- Document types: `NONE` (quick sale), `RECEIPT` (bon de vente), `INVOICE` (facture with/without TVA)
- Invoice `documentTitle` distinguishes: `FACTURE`, `FACTURE SANS TVA`, `BON DE VENTE`

### 3.5 Warranty Logic

**Where**: `Product.warranty { enabled, durationMonths }` → flows into `Invoice.items[].warranty` → separate `Guarantee` document

- Product defines if warranty is enabled and its duration
- At invoice creation: warranty dates are calculated (`startDate` = sale date, `expirationDate` = start + durationMonths)
- `Guarantee` is a **separate document** from `Invoice` (different numbering: `GAR-YYYY-XXXX`)
- Guarantee is auto-created when invoice has warranty items
- Status lifecycle: `active` → `claimed` / `expired` / `cancelled`
- Virtuals compute: `hasActiveWarranty`, `hasExpiredWarranty`, `warrantyExpiringSoon` (7-day threshold), `earliestExpiration`, `latestExpiration`
- Serial number tracking supported per item (`serialNumber` field)

### 3.6 Dual-Write: Sale vs SalesTransactionItem

**Critical architectural decision**: the system maintains two parallel records:

| Aspect | Sale / Order | SalesTransactionItem |
|---|---|---|
| **Role** | Workflow document (UI entry point) | Canonical financial record |
| **Used for** | Display, history, process | Statistics, finance, analytics, reporting |
| **Mutable fields** | Status, cancellation metadata | Status, cancellation metadata |
| **Immutable fields** | — | Financial data, product snapshot, quantities |
| **Cost source** | Legacy `productSnapshot.purchasePrice` | `costHT` from FIFO batches (authoritative) |

STI records are **immutable** for financial fields. Corrections create new records (cancel + re-sell).

### 3.7 STI Daily Snapshots

`STIDailySnapshot` stores daily aggregated totals (revenue, cost, profit, TVA, item counts) from STI. These snapshots are:
- **Immutable** (pre-save hook prevents updates; pre-remove hook prevents deletion)
- Used for **drift detection** only, never for reporting
- Provide audit trail for financial integrity verification

---

## 4. Data Integrity & Safety

### 4.1 Validation Stack (3 layers)

| Layer | Technology | Location | Purpose |
|---|---|---|---|
| **Input Validation** | Zod schemas | `lib/validation/*.validation.js` (14 files) | Structure, types, formats at API boundary |
| **Business Validation** | Service methods | `lib/services/*.js` | Relationship existence, business rules, stock sufficiency |
| **Schema Validation** | Mongoose schemas | `lib/models/*.js` | Database-level constraints, required fields, min/max |

Zod validation covers: `auth`, `brand`, `category`, `subcategory`, `inventory`, `invoice`, `order`, `product`, `sale`, `storeSettings`, `supplier`, `supplierPurchase`, `user`.

### 4.2 Atomic Operations (MongoDB Transactions)

Every critical operation uses a MongoDB transaction with the pattern:

```javascript
const session = await mongoose.startSession();
session.startTransaction();
try {
  // ... all operations with { session } ...
  await session.commitTransaction();
} catch (error) {
  await session.abortTransaction();
  throw error;
} finally {
  session.endSession();
}
```

**Transactional operations**:

| Operation | What's atomic |
|---|---|
| **Sale creation** | Sale + FIFO consumption + STI creation + stock decrement |
| **Order creation** | Order + FIFO consumption (per item) + STI creation (per item) + stock decrement (per item) |
| **Inventory entry** | InventoryLog + stock increment + fifoInitialized flag |
| **Sale cancellation** | Sale status + FIFO restore + stock sync + STI status + Invoice status + Guarantee status |
| **Order cancellation** | Order status + FIFO restore (per item) + stock sync (per item) + all STI statuses + Invoice + Guarantee |
| **Sale return** | Same as cancellation with "returned" status |

### 4.3 Overselling Protection

Three-layer defense:

1. **Cached stock check**: `Product.stock >= quantity` (fast, but could be stale)
2. **FIFO stock check**: `aggregate(InventoryLog.remainingQty) >= quantity` (within transaction session — authoritative)
3. **FIFO batch guard**: `updateOne({ remainingQty: { $gte: consumeQty } })` — if `modifiedCount !== 1`, throws `INVENTORY_BATCH_CONFLICT` (409) to catch concurrent modifications

### 4.4 Inconsistent State Protection

- **Soft deletes**: Records use `status` field (`active`, `cancelled`, `returned`), never hard-deleted
- **Cascade consistency**: Cancellation atomically updates Sale/Order + STI + Invoice + Guarantee in one transaction
- **Sync status reporting**: Cancel/return operations return `_syncStatus` object confirming each entity's final state
- **Stock reconciliation**: `ProductService.syncStockFromFIFO()` and `StatisticsService.reconcileStock()` can detect and fix Product.stock drift from FIFO truth
- **Immutable financial records**: STI financial fields cannot be modified after creation
- **Immutable snapshots**: STIDailySnapshot has pre-save/pre-remove hooks that throw errors on update/delete attempts

---

## 5. Architecture

### 5.1 Folder Structure

```
store-management-system/
├── app/                          # Next.js App Router (UI + API Layer)
│   ├── api/                      # API route handlers (thin delegation layer)
│   │   ├── auth/                 # Login / logout / session
│   │   ├── products/             # Product CRUD + search + stock
│   │   ├── sales/                # Sale registration + history + cancel
│   │   ├── orders/               # Order creation + history + cancel
│   │   ├── invoices/             # Invoice generation + PDF + status
│   │   ├── inventory-in/         # Inventory entry
│   │   ├── finance/              # Financial overview + charts + export
│   │   ├── guarantees/           # Warranty management
│   │   ├── statistics/           # Dashboard KPIs
│   │   ├── brands/               # Brand CRUD
│   │   ├── categories/           # Category CRUD
│   │   ├── subcategories/        # SubCategory CRUD
│   │   ├── suppliers/            # Supplier CRUD
│   │   ├── users/                # User management
│   │   ├── settings/             # Store settings
│   │   └── system/               # Health check, admin utilities
│   ├── dashboard/                # Manager interface (Server Components)
│   │   ├── page.js               # Analytics dashboard (KPIs, charts)
│   │   ├── products/             # Product management pages
│   │   ├── sales/                # Sales history
│   │   ├── inventory/            # Inventory management
│   │   ├── invoices/             # Invoice management
│   │   ├── finance/              # Financial dashboard + charts
│   │   ├── guarantees/           # Warranty tracking
│   │   ├── pos/                  # POS (reuses cashier FastSellingClient)
│   │   ├── brands/               # Brand management
│   │   ├── categories/           # Category management
│   │   ├── subcategories/        # SubCategory management
│   │   ├── suppliers/            # Supplier management
│   │   ├── users/                # User management
│   │   └── alerts/               # Low stock alerts
│   ├── cashier/                  # Cashier interface
│   │   ├── FastSellingClient.js  # POS interface (main cashier tool)
│   │   ├── sales/                # Cashier sales history
│   │   ├── orders/               # Cashier orders
│   │   ├── invoices/             # Cashier invoices
│   │   ├── guarantees/           # Cashier warranty lookup
│   │   └── daily-summary/        # End-of-day summary
│   ├── login/                    # Authentication page
│   └── (print)/                  # Print-optimized layouts
│
├── lib/                          # Core business logic
│   ├── services/                 # Service Layer (ALL business logic)
│   │   ├── AuthService.js
│   │   ├── ProductService.js
│   │   ├── SaleService.js
│   │   ├── OrderService.js
│   │   ├── InventoryService.js
│   │   ├── InvoiceService.js
│   │   ├── GuaranteeService.js
│   │   ├── FinanceService.js
│   │   ├── StatisticsService.js
│   │   ├── PricingService.js
│   │   ├── ReconciliationService.js
│   │   ├── UserService.js
│   │   ├── BrandService.js
│   │   ├── CategoryService.js
│   │   ├── SubCategoryService.js
│   │   ├── SupplierService.js
│   │   ├── FinanceExportService.js
│   │   ├── FinanceSettingsService.js
│   │   ├── PrintService.js
│   │   ├── StoreSettingsService.js
│   │   ├── OpeningStockService.js
│   │   ├── SupplierPurchaseService.js
│   │   └── search/               # Search services
│   ├── models/                   # Mongoose schemas (Data Access Layer)
│   ├── validation/               # Zod schemas (Validation Layer)
│   ├── auth/                     # Auth middleware (requireUser, requireManager, requireCashier)
│   ├── utils/                    # Utilities (FIFO, pagination, error factory, monitoring)
│   └── db/                       # Database connection
│
├── components/                   # React components
│   ├── domain/                   # Domain-specific (sale, inventory, invoice, etc.)
│   ├── ui/                       # Generic UI (buttons, tables, modals, filters)
│   ├── shared/                   # Shared (layout, navigation)
│   ├── dashboard/                # Dashboard-specific (KPI cards, charts)
│   └── auth/                     # Auth components (login form, error states)
│
├── middleware.js                  # Edge middleware (cookie-based auth gate)
├── __tests__/                    # Jest tests (unit, integration, e2e)
└── scripts/                      # Utility scripts (seed, migrations, snapshots)
```

### 5.2 Layer Responsibilities

| Layer | Location | Responsibility | Forbidden |
|---|---|---|---|
| **UI** | `app/dashboard/`, `app/cashier/`, `components/` | Render UI, handle interactions, display API data | Business logic, direct DB access, authorization logic |
| **API** | `app/api/` | Parse HTTP requests, delegate to validation + auth + service, format responses | Business logic, data validation, authorization checks |
| **Validation** | `lib/validation/` | Zod schema validation at API boundary, type coercion, French error messages | Business rules, DB access |
| **Authorization** | `lib/auth/`, `middleware.js` | JWT verification, RBAC enforcement, user context extraction | Business logic |
| **Service** | `lib/services/` | ALL business logic, workflow orchestration, transaction management, business validation | Direct HTTP handling, UI concerns |
| **Data Access** | `lib/models/` | Schema definitions, indexes, virtuals, instance methods, pre-save hooks | Business logic beyond schema constraints |
| **Database** | MongoDB Atlas | Persistence, indexing, transactions, query execution | — |

---

## 6. Key Technical Decisions

### 6.1 Why Mongoose

Mongoose is used as the ODM for MongoDB, providing:
- **Schema enforcement** on a schemaless database (required fields, types, min/max, enums)
- **Pre-save hooks** for password hashing (`User`), total calculation (`Order`, `STI`), validation enforcement (`Product` reference/designation checks), and immutability (`STIDailySnapshot`)
- **Virtual fields** for computed properties (`Product.displayName`, `Product.isLowStock`, `Invoice.hasActiveWarranty`) without storing them
- **Population** for reference resolution across collections
- **Session/transaction support** via `.session(session)` on all queries within atomic operations
- **Hot reload protection** via `mongoose.models.X || mongoose.model("X", schema)` pattern (Next.js dev mode compatibility)

### 6.2 Why JWT + HTTP-only Cookies

- **Stateless authentication**: no server-side session storage needed
- **HTTP-only cookies**: token is not accessible via JavaScript (XSS protection)
- **Cookie config**: `httpOnly: true`, `secure: true`, `sameSite: 'strict'`
- **Token payload**: `{ userId, role, iat, exp }`
- **Session duration**: configurable via `JWT_EXPIRES_IN` (default: 1 day)
- **Secret validation**: JWT_SECRET must be 32+ characters; hard error in production if default value is used

### 6.3 Authentication Architecture (2-tier)

**Tier 1 — Edge Middleware** (`middleware.js`):
- Runs before server rendering on `/dashboard/**` and `/cashier/**`
- Checks **cookie existence only** (no JWT verification — Edge Runtime limitation)
- Redirects to `/login` immediately if no cookie, with `callbackUrl` preserved
- Purpose: avoid expensive server rendering for clearly unauthenticated users

**Tier 2 — Layout Server Components** (`app/dashboard/layout.js`, `app/cashier/layout.js`):
- Full JWT verification via `AuthService.getUserFromSession(token)`
- User existence check in database
- Role-based routing (manager → dashboard, cashier → cashier interface)
- This is the **authoritative** auth check

**API-level**: Each API route calls `requireUser()`, `requireManager()`, or `requireCashier()` from `lib/auth/middleware.js` before delegating to services.

### 6.4 Data Validation Strategy

Zod schemas validate at the API boundary **before** any business logic runs:

- **14 validation files** covering all entities
- Error messages in **French** (matching UI language)
- Custom error formatter (`lib/validation/errorFormatter.js`) standardizes error output
- Validation timing: API route → Zod validation → Authorization → Service call
- Services perform additional **business validation** (relationship existence, stock sufficiency, price range checks)
- Mongoose schemas provide **database-level** safety net (required, min, max, enum, unique)

### 6.5 Financial Architecture

The system uses a **dual-write** pattern for financial data:

- `Sale` / `Order` = **workflow documents** (UI entry points, process tracking)
- `SalesTransactionItem` = **canonical financial truth** (statistics, reports, analytics)
- Feature flags (`shouldUseSTIForStats()`, `shouldVerifySTIStats()`) control the migration from Sale-based to STI-based statistics
- Verification mode compares STI results against Sale results to detect drift during transition
- All monetary values stored as **integers** (no floating-point — `Math.round()` on all price setters)

### 6.6 Monitoring and Observability

- `recordTransactionAttempt(type)`: tracks transaction initiation
- `logTransactionAbort(type, error)`: logs transaction failures (non-blocking)
- `logSTICreationFailure(sourceType, sourceId, error)`: tracks STI dual-write failures
- Cancel/return operations return `_syncStatus` object for visibility into cascade results
- Stock reconciliation utilities detect Product.stock drift from FIFO truth

---

*Analysis generated from source code inspection. All statements are verifiable in the codebase.*

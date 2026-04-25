/**
 * @file middleware.ts
 * @description Next.js middleware for locale-based routing.
 *
 * Responsibilities:
 * 1. If the URL already has a valid locale prefix → pass through, sync cookie.
 * 2. If no locale prefix → detect preferred locale → 307 redirect to /{locale}{path}.
 *
 * Detection priority: cookie → Accept-Language → DEFAULT_LOCALE.
 */

import { NextRequest, NextResponse } from "next/server";

/* ── Inlined constants (middleware runs on Edge — keep imports minimal) ── */
const LOCALES = ["en", "fr", "ar"] as const;
type Locale = (typeof LOCALES)[number];
const DEFAULT_LOCALE: Locale = "en";

function isValidLocale(v: unknown): v is Locale {
  return typeof v === "string" && (LOCALES as readonly string[]).includes(v);
}

/** Detect the user's preferred locale. */
function detectLocale(req: NextRequest): Locale {
  // 1. Cookie
  const cookie = req.cookies.get("locale")?.value;
  if (isValidLocale(cookie)) return cookie;

  // 2. Accept-Language header
  const accept = req.headers.get("accept-language") ?? "";
  for (const locale of LOCALES) {
    if (accept.includes(locale)) return locale;
  }

  return DEFAULT_LOCALE;
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // ── Skip static assets, API routes, Next internals ──
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname === "/robots.txt" ||
    pathname === "/sitemap.xml" ||
    pathname === "/favicon.ico" ||
    /\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js|woff2?|ttf|json|xml|txt|pdf|mp4|webm)$/i.test(
      pathname,
    )
  ) {
    return NextResponse.next();
  }

  // ── Check if the first segment is a valid locale ──
  const segments = pathname.split("/");
  const firstSegment = segments[1]; // "" for "/", "en" for "/en"

  if (isValidLocale(firstSegment)) {
    // Already prefixed — sync the cookie so it matches the URL
    const res = NextResponse.next();
    res.cookies.set("locale", firstSegment, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
      sameSite: "lax",
    });
    return res;
  }

  // ── No locale prefix — redirect ──
  const locale = detectLocale(req);
  const url = req.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;

  const res = NextResponse.redirect(url);
  res.cookies.set("locale", locale, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
  });
  return res;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static, _next/image (Next.js internals)
     * - favicon.ico, sitemap.xml, robots.txt
     * - Files with extensions (static assets)
     */
    "/((?!_next/static|_next/image|favicon\\.ico).*)",
  ],
};

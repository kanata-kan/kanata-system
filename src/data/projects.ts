/**
 * @file projects.ts
 * @description Case-study driven projects data (problem → decision → value).
 */

export interface Project {
  n: string;
  year: string;
  name: string;
  type: string;
  desc: string;
  longDesc: string;
  stack: string[];
  status: "Live" | "Beta" | "OSS" | "Archived";
  statusColor: string;
  link: string;
  highlights: string[];
  color: string;
}

export const PROJECTS: Project[] = [
  {
    n: "01",
    year: "2024",
    name: "SaaSify",
    type: "SaaS Product",
    color: "#38BDF8",
    status: "Live",
    statusColor: "#3FB950",
    link: "saasify.dev",

    desc: "The real challenge wasn’t building features — it was handling complexity across multiple tenants.",

    longDesc:
      "I focused on structuring the system early to avoid future rewrites and scaling issues.",

    stack: [
      "Next.js 14",
      "Prisma",
      "Stripe",
      "PostgreSQL",
      "Resend",
      "Tailwind",
    ],

    highlights: [
      "Designed multi-tenant architecture to prevent future complexity",
      "Chose Stripe despite webhook complexity for scalability",
      "Defined permission system early to avoid security issues",
      "Optimized data flow for long-term maintainability",
    ],
  },

  {
    n: "02",
    year: "2024",
    name: "DevMetrics",
    type: "Internal Tool",
    color: "#F0883E",
    status: "Beta",
    statusColor: "#F0883E",
    link: "devmetrics.io",

    desc: "The problem wasn’t missing data — it was scattered data and constant context switching.",

    longDesc:
      "I focused on centralizing information and reducing friction between tools.",

    stack: [
      "React",
      "Node.js",
      "WebSockets",
      "Redis",
      "GitHub API",
      "Linear API",
    ],

    highlights: [
      "Unified multiple data sources into a single dashboard",
      "Used WebSockets to reduce refresh dependency",
      "Prioritized real-time feedback over static reporting",
      "Reduced context-switching for engineering teams",
    ],
  },

  {
    n: "03",
    year: "2023",
    name: "openapi-gen",
    type: "Open Source CLI",
    color: "#A78BFA",
    status: "OSS",
    statusColor: "#A78BFA",
    link: "github.com/abdelilah/openapi-gen",

    desc: "The issue wasn’t generating APIs — it was maintaining type safety across changes.",

    longDesc:
      "I built a tool that enforces consistency instead of relying on manual updates.",

    stack: ["Node.js", "TypeScript", "Zod", "Commander.js", "Prettier"],

    highlights: [
      "Automated SDK generation to remove manual errors",
      "Used TypeScript inference for strict type safety",
      "Integrated Zod for runtime validation",
      "Focused on zero-config usability for developers",
    ],
  },

  {
    n: "04",
    year: "2023",
    name: "MoroccoMap",
    type: "Data Visualization",
    color: "#3FB950",
    status: "Live",
    statusColor: "#3FB950",
    link: "moroccomap.ma",

    desc: "The challenge wasn’t data availability — it was making it understandable and usable.",

    longDesc:
      "I focused on clarity and interaction instead of raw data presentation.",

    stack: ["D3.js", "Next.js", "Python", "FastAPI", "PostgreSQL", "Mapbox"],

    highlights: [
      "Simplified complex datasets into clear visual insights",
      "Designed interactive maps for better exploration",
      "Prioritized usability over visual complexity",
      "Enabled multi-language accessibility (AR / FR / EN)",
    ],
  },
];

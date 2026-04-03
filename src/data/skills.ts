/**
 * @file skills.ts
 * @description Static data for skills and mindset strip.
 */

export interface SkillGroup {
  title: string;
  color: string;
  items: string[];
}

/**
 * 🛠️ Skills = Tools (credibility)
 * هنا نبقاو واقعيين، الشركات خاصها تعرف شنو كتستعمل
 */
export const SKILL_GROUPS: SkillGroup[] = [
  {
    title: "Frontend",
    color: "#38BDF8",
    items: [
      "React / Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "HTML / CSS",
    ],
  },
  {
    title: "Backend",
    color: "#3FB950",
    items: ["Node.js / Express", "PostgreSQL", "Prisma ORM", "REST APIs"],
  },
  {
    title: "DevOps",
    color: "#F0883E",
    items: ["Docker", "Vercel", "AWS", "Linux"],
  },
  {
    title: "Tooling",
    color: "#A78BFA",
    items: ["Git / GitHub", "Postman", "Figma", "Notion"],
  },
];

/**
 * 🧠 TechStrip = Mindset (identity)
 * هذا هو اللي كيبان فـHero، خاصو يعكس كيفاش كتفكّر
 */
export const TECH_STRIP: string[] = [
  "Understanding first",
  "Clear decisions",
  "Real constraints",
  "Value over features",
  "Fixing bottlenecks",
  "Business awareness",
  "Thinking in flows",
  "Reducing complexity",
  "Focus on outcomes",
  "Clarity in systems",
];

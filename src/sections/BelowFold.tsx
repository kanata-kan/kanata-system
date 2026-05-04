import type { Locale } from "@/data/content/types";
import { TechStrip } from "./TechStrip";
import { About } from "./About";
import { Skills } from "./Skills";
import { LazyWork } from "./LazyWork";
import { Contact } from "./Contact";

export function BelowFold({ locale }: { locale: Locale }) {
  return (
    <>
      <TechStrip locale={locale} />
      <LazyWork />
      <About locale={locale} />
      <Skills locale={locale} />
      <Contact locale={locale} />
    </>
  );
}

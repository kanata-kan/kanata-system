"use client";

import dynamic from "next/dynamic";
import { LazySection } from "@/sections/LazySection";

const WorkLazy = dynamic(
  () => import("@/sections/Work/Work").then((m) => m.Work),
  { ssr: false },
);

export function LazyWork() {
  return (
    <LazySection rootMargin="800px 0px" minHeight={600}>
      <WorkLazy />
    </LazySection>
  );
}

"use client";

import dynamic from "next/dynamic";

const TechStrip = dynamic(() => import("@/sections/TechStrip").then((m) => m.TechStrip));
const Work = dynamic(() => import("@/sections/Work").then((m) => m.Work));
const About = dynamic(() => import("@/sections/About").then((m) => m.About));
const Skills = dynamic(() => import("@/sections/Skills").then((m) => m.Skills));
const Contact = dynamic(() => import("@/sections/Contact").then((m) => m.Contact));

export function BelowFold() {
  return (
    <>
      <TechStrip />
      <Work />
      <About />
      <Skills />
      <Contact />
    </>
  );
}

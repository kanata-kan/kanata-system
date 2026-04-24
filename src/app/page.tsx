/**
 * @file page.tsx
 * @description Page d'accueil.
 * RÈGLE : Cette page ne contient QUE l'assemblage des sections.
 * Aucune logique, aucun state, aucun hook ici.
 */

import { Hero } from "@/sections/Hero";
import { TechStrip } from "@/sections/TechStrip";
import { Work } from "@/sections/Work";
import { About } from "@/sections/About";
import { Skills } from "@/sections/Skills";
import { Contact } from "@/sections/Contact";

export default function Home() {
  return (
    <main id="main-content">
      <Hero />
      <TechStrip />
      <Work />
      <About />
      <Skills />
      <Contact />
    </main>
  );
}

/**
 * @file useScrollReveal.ts
 * @description IntersectionObserver global qui ajoute la classe 'in'
 * à tous les éléments portant .rv / .rv-l / .rv-r / .rv-s dans le DOM.
 * Appelé une seule fois dans layout.tsx.
 *
 * Classes disponibles (définies dans globals.css) :
 *   .rv     → fadeUp (translateY)
 *   .rv-l   → slideFromLeft (translateX négatif)
 *   .rv-r   → slideFromRight (translateX positif)
 *   .rv-s   → scaleIn (scale)
 *   .d1–.d6 → delays de 80ms à 480ms (stagger)
 */
"use client";

import { useEffect } from "react";

const SELECTOR = ".rv, .rv-l, .rv-r, .rv-s";
const OPTIONS: IntersectionObserverInit = {
  threshold: 0.08,
  rootMargin: "0px 0px -30px 0px",
};

export function useScrollReveal() {
  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) e.target.classList.add("in");
      });
    }, OPTIONS);

    const observe = () =>
      document.querySelectorAll<Element>(SELECTOR).forEach((el) => obs.observe(el));

    observe();
    const t = setTimeout(observe, 400);

    return () => {
      obs.disconnect();
      clearTimeout(t);
    };
  }, []);
}

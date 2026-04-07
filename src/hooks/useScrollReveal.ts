/**
 * @file useScrollReveal.ts
 * @description IntersectionObserver global qui ajoute la classe 'in'
 * à tous les éléments portant .rv / .rv-l / .rv-r / .rv-s dans le DOM.
 * Appelé une seule fois dans layout.tsx.
 *
 * Re-scans on route change (usePathname) and watches for dynamically
 * added elements via MutationObserver so reveals work after navigation.
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
import { usePathname } from "next/navigation";

const SELECTOR = ".rv, .rv-l, .rv-r, .rv-s";
const OPTIONS: IntersectionObserverInit = {
  threshold: 0.08,
  rootMargin: "0px 0px -30px 0px",
};

export function useScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    const tracked = new WeakSet<Element>();

    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) e.target.classList.add("in");
      });
    }, OPTIONS);

    const observe = () => {
      document.querySelectorAll<Element>(SELECTOR).forEach((el) => {
        if (!tracked.has(el)) {
          tracked.add(el);
          obs.observe(el);
        }
      });
    };

    observe();
    const t = setTimeout(observe, 400);

    const mut = new MutationObserver(observe);
    mut.observe(document.body, { childList: true, subtree: true });

    return () => {
      obs.disconnect();
      mut.disconnect();
      clearTimeout(t);
    };
  }, [pathname]);
}

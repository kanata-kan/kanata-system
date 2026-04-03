/**
 * @file WindowDots.tsx
 * @description Trois points rouge/jaune/vert décoratifs (browser bar).
 * Atome purement visuel — aucune logique, aucune dépendance.
 * Mémorisé car le rendu est identique à chaque appel.
 */

import { memo } from "react";

const DOTS = ["#FF5F57", "#FEBC2E", "#28C840"] as const;

export const WindowDots = memo(function WindowDots() {
  return (
    <div className="flex gap-1.5">
      {DOTS.map((bg) => (
        <div
          key={bg}
          style={{ width: 10, height: 10, borderRadius: "50%", background: bg }}
        />
      ))}
    </div>
  );
});

/**
 * @file Tag.tsx
 * @description Pill coloré pour tags, statuts, technos.
 * Atome pur — ne dépend d'aucun autre composant.
 * Mémorisé car le rendu ne dépend que des props.
 * Usage : <Tag color={C.cyan}>Remote-friendly</Tag>
 */

import { memo } from "react";

interface TagProps {
  children: React.ReactNode;
  color: string;
}

export const Tag = memo(function Tag({ children, color }: TagProps) {
  return (
    <span
      style={{
        fontFamily: "var(--font-mono)",
        fontSize: 10,
        letterSpacing: 0.5,
        padding: "4px 11px",
        borderRadius: 4,
        background: `${color}18`,
        border: `1px solid ${color}35`,
        color,
      }}
    >
      {children}
    </span>
  );
});

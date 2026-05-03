/**
 * @file CopyButton.tsx
 * @description Tiny client island — clipboard copy with visual feedback.
 */
"use client";

import { useState } from "react";

interface CopyButtonProps {
  text: string;
  label: string;
  copiedLabel: string;
  children?: React.ReactNode;
}

export function CopyButton({ text, label, copiedLabel, children }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    });
  };

  return (
    <button
      type="button"
      onClick={copy}
      className="sc-copy-btn"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: 12,
        width: "100%",
        maxWidth: 460,
        padding: "16px 20px",
        borderRadius: 12,
        background: "var(--t-bg)",
        border: copied
          ? "1px solid color-mix(in srgb, var(--t-green) 30%, transparent)"
          : "1px solid var(--t-border)",
        color: "var(--t-text)",
        marginBottom: 24,
        transition: "all .25s",
        cursor: "pointer",
      }}
    >
      {children ?? (
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "clamp(12px, 2.5vw, 13px)",
            color: "var(--t-sub)",
            overflowWrap: "anywhere",
            textAlign: "start",
          }}
        >
          {text}
        </span>
      )}

      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 9,
          letterSpacing: 2,
          color: copied ? "var(--t-green)" : "var(--t-cyan)",
          background: copied
            ? "color-mix(in srgb, var(--t-green) 8%, transparent)"
            : "color-mix(in srgb, var(--t-cyan) 7%, transparent)",
          border: copied
            ? "1px solid color-mix(in srgb, var(--t-green) 20%, transparent)"
            : "1px solid color-mix(in srgb, var(--t-cyan) 20%, transparent)",
          padding: "4px 11px",
          borderRadius: 4,
          transition: "all .2s",
        }}
      >
        {copied ? copiedLabel : label}
      </span>
    </button>
  );
}

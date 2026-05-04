"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  children: React.ReactNode;
  rootMargin?: string;
  minHeight?: number;
};

export function LazySection({
  children,
  rootMargin = "600px 0px",
  minHeight = 1,
}: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (mounted) return;
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setMounted(true);
          io.disconnect();
        }
      },
      { root: null, rootMargin, threshold: 0.01 },
    );

    io.observe(el);
    return () => io.disconnect();
  }, [mounted, rootMargin]);

  return (
    <div ref={ref} style={{ minHeight }}>
      {mounted ? children : null}
    </div>
  );
}

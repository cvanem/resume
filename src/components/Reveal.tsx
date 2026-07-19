"use client";

import * as stylex from "@stylexjs/stylex";
import { useEffect, useRef, useState, type ReactNode } from "react";

const styles = stylex.create({
  base: {
    opacity: 0,
    transform: "translateY(14px)",
    transitionProperty: "opacity, transform",
    transitionDuration: "0.6s",
    transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
  },
  visible: {
    opacity: 1,
    transform: "translateY(0)",
  },
  delay: (ms: number) => ({
    transitionDelay: `${ms}ms`,
  }),
});

/** Fades content up into view the first time it enters the viewport. */
export function Reveal({
  children,
  delay = 0,
}: {
  children: ReactNode;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} {...stylex.props(styles.base, styles.delay(delay), visible && styles.visible)}>
      {children}
    </div>
  );
}

"use client";

import * as stylex from "@stylexjs/stylex";
import { useCallback, useId, useState } from "react";
import { colors, fonts } from "@/theme/tokens.stylex";

export interface CarouselImage {
  src: string;
  alt: string;
}

const styles = stylex.create({
  wrapper: {
    marginTop: 16,
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  viewer: {
    position: "relative",
    width: "100%",
    aspectRatio: "16 / 9",
    borderRadius: 10,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: colors.border,
    backgroundColor: colors.bg,
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    maxWidth: "100%",
    maxHeight: "100%",
    width: "auto",
    height: "auto",
    objectFit: "contain",
    display: "block",
  },
  navButton: {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: 36,
    height: 36,
    borderRadius: "50%",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "rgba(0, 0, 0, 0.12)",
    // Button surface is always light, so keep the glyph fixed-dark in both themes.
    color: "#1a1c1e",
    backgroundColor: { default: "rgba(255,255,255,0.72)", ":hover": "rgba(255,255,255,0.92)" },
    backdropFilter: "blur(6px)",
    boxShadow: `0 2px 10px ${colors.shadow}`,
    transitionProperty: "background-color, border-color",
    transitionDuration: "0.15s",
  },
  navPrev: {
    left: 10,
  },
  navNext: {
    right: 10,
  },
  counter: {
    position: "absolute",
    right: 10,
    bottom: 10,
    fontFamily: fonts.mono,
    fontSize: 11,
    lineHeight: 1,
    color: "#fff",
    paddingBlock: 5,
    paddingInline: 8,
    borderRadius: 999,
    backgroundColor: "rgba(4, 5, 8, 0.62)",
    backdropFilter: "blur(4px)",
  },
  footer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  caption: {
    flex: 1,
    minWidth: 0,
    fontSize: 12.5,
    lineHeight: 1.45,
    color: colors.textTertiary,
  },
  dots: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    flexShrink: 0,
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: "50%",
    padding: 0,
    borderWidth: 0,
    backgroundColor: { default: colors.border, ":hover": colors.textTertiary },
    transitionProperty: "background-color, transform",
    transitionDuration: "0.15s",
  },
  dotActive: {
    backgroundColor: colors.accent,
    transform: "scale(1.25)",
  },
});

export function Carousel({ images, label }: { images: CarouselImage[]; label?: string }) {
  const [index, setIndex] = useState(0);
  const groupId = useId();
  const count = images.length;

  const step = useCallback(
    (dir: number) => setIndex((current) => (current + dir + count) % count),
    [count],
  );

  if (count === 0) return null;
  const current = images[index];

  return (
    <div
      {...stylex.props(styles.wrapper)}
      role="group"
      aria-roledescription="carousel"
      aria-label={label ?? "Screenshots"}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          step(-1);
        } else if (event.key === "ArrowRight") {
          event.preventDefault();
          step(1);
        }
      }}
    >
      <div {...stylex.props(styles.viewer)}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          key={current.src}
          src={current.src}
          alt={current.alt}
          loading="lazy"
          {...stylex.props(styles.image)}
        />
        {count > 1 ? (
          <>
            <button
              type="button"
              {...stylex.props(styles.navButton, styles.navPrev)}
              onClick={() => step(-1)}
              aria-label="Previous screenshot"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                <path d="m15 18-6-6 6-6" />
              </svg>
            </button>
            <button
              type="button"
              {...stylex.props(styles.navButton, styles.navNext)}
              onClick={() => step(1)}
              aria-label="Next screenshot"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>
            <span {...stylex.props(styles.counter)} aria-hidden>
              {index + 1} / {count}
            </span>
          </>
        ) : null}
      </div>
      <div {...stylex.props(styles.footer)}>
        <p {...stylex.props(styles.caption)}>{current.alt}</p>
        {count > 1 ? (
          <div {...stylex.props(styles.dots)}>
            {images.map((image, dotIndex) => (
              <button
                key={image.src}
                type="button"
                {...stylex.props(styles.dot, dotIndex === index && styles.dotActive)}
                onClick={() => setIndex(dotIndex)}
                aria-label={`Go to screenshot ${dotIndex + 1}`}
                aria-current={dotIndex === index}
                aria-controls={groupId}
              />
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}

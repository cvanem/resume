"use client";

import * as stylex from "@stylexjs/stylex";
import { colors, fonts } from "@/theme/tokens.stylex";
import { profile } from "@/data/resume";

const fadeUp = stylex.keyframes({
  from: { opacity: 0, transform: "translateY(16px)" },
  to: { opacity: 1, transform: "translateY(0)" },
});

const styles = stylex.create({
  hero: {
    position: "relative",
    overflow: "hidden",
    paddingTop: 60, // nav height
  },
  glow: {
    position: "absolute",
    top: -280,
    left: "50%",
    transform: "translateX(-50%)",
    width: 900,
    height: 620,
    borderRadius: "50%",
    background: `radial-gradient(ellipse at center, ${colors.glow} 0%, transparent 65%)`,
    pointerEvents: "none",
  },
  grid: {
    position: "absolute",
    inset: 0,
    backgroundImage: `radial-gradient(${colors.border} 1px, transparent 1px)`,
    backgroundSize: "28px 28px",
    maskImage: "radial-gradient(ellipse 75% 65% at 50% 20%, black 30%, transparent 75%)",
    pointerEvents: "none",
  },
  inner: {
    position: "relative",
    maxWidth: 1024,
    marginInline: "auto",
    paddingInline: { default: 24, "@media (min-width: 768px)": 32 },
    paddingTop: { default: 72, "@media (min-width: 768px)": 110 },
    paddingBottom: { default: 8, "@media (min-width: 768px)": 12 },
  },
  animated: (delay: number) => ({
    animationName: fadeUp,
    animationDuration: "0.7s",
    animationTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
    animationFillMode: "both",
    animationDelay: `${delay}ms`,
  }),
  eyebrow: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    fontFamily: fonts.mono,
    fontSize: 13,
    color: colors.textSecondary,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: colors.border,
    borderRadius: 999,
    paddingBlock: 6,
    paddingInline: 14,
    marginBottom: 28,
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: "50%",
    backgroundColor: "#4cb782",
    boxShadow: "0 0 8px rgba(76, 183, 130, 0.7)",
  },
  name: {
    fontSize: { default: 42, "@media (min-width: 768px)": 64 },
    fontWeight: 650,
    letterSpacing: "-0.03em",
    lineHeight: 1.05,
    color: colors.text,
    marginBottom: 16,
  },
  title: {
    fontSize: { default: 20, "@media (min-width: 768px)": 24 },
    fontWeight: 500,
    letterSpacing: "-0.01em",
    color: colors.accentText,
    marginBottom: 20,
  },
  summaryLead: {
    fontSize: { default: 18, "@media (min-width: 768px)": 21 },
    fontWeight: 500,
    letterSpacing: "-0.01em",
    lineHeight: 1.5,
    color: colors.text,
    maxWidth: 640,
    marginBottom: 12,
  },
  summaryDetail: {
    fontSize: 15,
    lineHeight: 1.6,
    color: colors.textSecondary,
    maxWidth: 620,
  },
});

export function Hero() {
  return (
    <div id="top" {...stylex.props(styles.hero)}>
      <div {...stylex.props(styles.glow)} />
      <div {...stylex.props(styles.grid)} />
      <div {...stylex.props(styles.inner)}>
        <div {...stylex.props(styles.animated(0))}>
          <span {...stylex.props(styles.eyebrow)}>
            <span {...stylex.props(styles.dot)} />
            {profile.location} · open to senior roles
          </span>
        </div>
        <h1 {...stylex.props(styles.name, styles.animated(80))}>{profile.name}</h1>
        <p {...stylex.props(styles.title, styles.animated(160))}>{profile.title}</p>
        <p {...stylex.props(styles.summaryLead, styles.animated(240))}>{profile.summaryLead}</p>
        <p {...stylex.props(styles.summaryDetail, styles.animated(300))}>{profile.summaryDetail}</p>
      </div>
    </div>
  );
}

import * as stylex from "@stylexjs/stylex";
import type { ReactNode } from "react";
import { colors, fonts } from "@/theme/tokens.stylex";

const styles = stylex.create({
  section: {
    maxWidth: 1024,
    marginInline: "auto",
    paddingInline: { default: 24, "@media (min-width: 768px)": 32 },
    paddingBlock: { default: 56, "@media (min-width: 768px)": 88 },
    scrollMarginTop: 80,
  },
  kicker: {
    fontFamily: fonts.mono,
    fontSize: 13,
    fontWeight: 500,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    color: colors.accentText,
    marginBottom: 12,
  },
  title: {
    fontSize: { default: 28, "@media (min-width: 768px)": 36 },
    fontWeight: 600,
    letterSpacing: "-0.02em",
    lineHeight: 1.15,
    color: colors.text,
    marginBottom: 12,
  },
  lede: {
    fontSize: { default: 16, "@media (min-width: 768px)": 17 },
    lineHeight: 1.6,
    color: colors.textSecondary,
    maxWidth: 640,
    marginBottom: 40,
  },
});

export function Section({
  id,
  kicker,
  title,
  lede,
  children,
}: {
  id: string;
  kicker: string;
  title: string;
  lede?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} {...stylex.props(styles.section)}>
      <p {...stylex.props(styles.kicker)}>{kicker}</p>
      <h2 {...stylex.props(styles.title)}>{title}</h2>
      {lede ? <p {...stylex.props(styles.lede)}>{lede}</p> : null}
      {children}
    </section>
  );
}

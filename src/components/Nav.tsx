"use client";

import * as stylex from "@stylexjs/stylex";
import { colors, fonts } from "@/theme/tokens.stylex";
import { ThemeToggle } from "./ThemeToggle";
import { DownloadResumeButton } from "./DownloadResumeButton";

const styles = stylex.create({
  header: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 50,
    backdropFilter: "blur(12px)",
    backgroundColor: colors.bgTranslucent,
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: colors.border,
  },
  inner: {
    maxWidth: 1024,
    marginInline: "auto",
    paddingInline: { default: 24, "@media (min-width: 768px)": 32 },
    height: 60,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 16,
  },
  brand: {
    fontFamily: fonts.mono,
    fontSize: 14,
    fontWeight: 600,
    letterSpacing: "-0.01em",
    color: colors.text,
    textDecoration: "none",
    whiteSpace: "nowrap",
  },
  brandAccent: {
    color: colors.accentText,
  },
  links: {
    display: { default: "none", "@media (min-width: 768px)": "flex" },
    alignItems: "center",
    gap: 4,
  },
  link: {
    fontSize: 14,
    fontWeight: 450,
    color: { default: colors.textSecondary, ":hover": colors.text },
    textDecoration: "none",
    paddingBlock: 8,
    paddingInline: 12,
    borderRadius: 8,
    backgroundColor: { default: "transparent", ":hover": colors.chipBg },
    transitionProperty: "color, background-color",
    transitionDuration: "0.15s",
  },
  actions: {
    display: "flex",
    alignItems: "center",
    gap: 10,
  },
  downloadWrap: {
    display: { default: "none", "@media (min-width: 560px)": "block" },
  },
});

const LINKS = [
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  return (
    <header {...stylex.props(styles.header)}>
      <div {...stylex.props(styles.inner)}>
        <a href="#top" {...stylex.props(styles.brand)}>
          cvanem<span {...stylex.props(styles.brandAccent)}>.dev</span>
        </a>
        <nav {...stylex.props(styles.links)} aria-label="Sections">
          {LINKS.map((link) => (
            <a key={link.href} href={link.href} {...stylex.props(styles.link)}>
              {link.label}
            </a>
          ))}
        </nav>
        <div {...stylex.props(styles.actions)}>
          <ThemeToggle />
          <div {...stylex.props(styles.downloadWrap)}>
            <DownloadResumeButton compact />
          </div>
        </div>
      </div>
    </header>
  );
}

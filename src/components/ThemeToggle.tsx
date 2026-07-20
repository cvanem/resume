"use client";

import * as stylex from "@stylexjs/stylex";
import { observer } from "mobx-react-lite";
import { colors } from "@/theme/tokens.stylex";
import { useUIStore, type ThemeChoice } from "@/stores/ui-store";

const styles = stylex.create({
  button: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: 34,
    height: 34,
    borderRadius: 8,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: { default: colors.border, ":hover": colors.borderStrong },
    color: colors.textSecondary,
    backgroundColor: { default: "transparent", ":hover": colors.chipBg },
    transitionProperty: "border-color, background-color, color",
    transitionDuration: "0.15s",
  },
});

const ICONS: Record<ThemeChoice, { label: string; glyph: React.ReactNode }> = {
  dark: {
    label: "Theme: dark — switch to light",
    glyph: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
        <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
      </svg>
    ),
  },
  light: {
    label: "Theme: light — switch to dark",
    glyph: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
      </svg>
    ),
  },
};

export const ThemeToggle = observer(function ThemeToggle() {
  const ui = useUIStore();
  const icon = ICONS[ui.theme];

  return (
    <button
      type="button"
      {...stylex.props(styles.button)}
      onClick={() => ui.toggleTheme()}
      title={icon.label}
      aria-label={icon.label}
    >
      {icon.glyph}
    </button>
  );
});

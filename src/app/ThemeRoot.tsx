"use client";

import * as stylex from "@stylexjs/stylex";
import { observer } from "mobx-react-lite";
import type { ReactNode } from "react";
import { colors, fonts } from "@/theme/tokens.stylex";
import { lightTheme, darkTheme } from "@/theme/themes";
import { useUIStore } from "@/stores/ui-store";

const styles = stylex.create({
  root: {
    backgroundColor: colors.bg,
    color: colors.text,
    fontFamily: fonts.body,
    minHeight: "100dvh",
    transitionProperty: "background-color, color",
    transitionDuration: "0.25s",
    transitionTimingFunction: "ease",
  },
});

/**
 * Applies the active theme class at the top of the tree.
 * Default (system) uses the media-query-aware token values, so first paint
 * is always correct; an explicit user choice overrides after hydration.
 */
export const ThemeRoot = observer(function ThemeRoot({ children }: { children: ReactNode }) {
  const ui = useUIStore();
  const explicit =
    ui.hydrated && ui.theme !== "system" ? (ui.theme === "light" ? lightTheme : darkTheme) : null;

  return <div {...stylex.props(explicit, styles.root)}>{children}</div>;
});

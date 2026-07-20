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
 * Before hydration the media-query-aware token values drive first paint (so it
 * matches the OS); after hydration an explicit light/dark choice takes over.
 */
export const ThemeRoot = observer(function ThemeRoot({ children }: { children: ReactNode }) {
  const ui = useUIStore();
  const explicit = ui.hydrated ? (ui.theme === "light" ? lightTheme : darkTheme) : null;

  return <div {...stylex.props(explicit, styles.root)}>{children}</div>;
});

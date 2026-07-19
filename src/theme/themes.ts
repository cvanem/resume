import * as stylex from "@stylexjs/stylex";
import { colors } from "./tokens.stylex";

/** Explicit light theme — applied when the user forces light mode. */
export const lightTheme = stylex.createTheme(colors, {
  bg: "#fcfcfd",
  bgTranslucent: "rgba(252, 252, 253, 0.8)",
  surface: "#ffffff",
  surfaceRaised: "#ffffff",
  border: "rgba(0, 0, 0, 0.09)",
  borderStrong: "rgba(0, 0, 0, 0.18)",
  text: "#0d0e10",
  textSecondary: "#5c5f66",
  textTertiary: "#8a8f98",
  accent: "#5e6ad2",
  accentText: "#4c58c4",
  accentSoft: "rgba(94, 106, 210, 0.09)",
  glow: "rgba(94, 106, 210, 0.16)",
  shadow: "rgba(0, 0, 0, 0.07)",
  chipBg: "rgba(0, 0, 0, 0.04)",
});

/** Explicit dark theme — applied when the user forces dark mode. */
export const darkTheme = stylex.createTheme(colors, {
  bg: "#08090a",
  bgTranslucent: "rgba(8, 9, 10, 0.75)",
  surface: "#0f1011",
  surfaceRaised: "#141516",
  border: "rgba(255, 255, 255, 0.09)",
  borderStrong: "rgba(255, 255, 255, 0.17)",
  text: "#f7f8f8",
  textSecondary: "#9ba0a8",
  textTertiary: "#686d76",
  accent: "#7c89f9",
  accentText: "#9aa5ff",
  accentSoft: "rgba(124, 137, 249, 0.12)",
  glow: "rgba(94, 106, 210, 0.22)",
  shadow: "rgba(0, 0, 0, 0.45)",
  chipBg: "rgba(255, 255, 255, 0.06)",
});

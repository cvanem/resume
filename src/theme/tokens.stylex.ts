import * as stylex from "@stylexjs/stylex";

const DARK = "@media (prefers-color-scheme: dark)";

/**
 * Design tokens. Defaults follow the system color scheme; explicit user
 * choice is applied via the themes in `themes.ts`.
 */
export const colors = stylex.defineVars({
  bg: { default: "#fcfcfd", [DARK]: "#08090a" },
  bgTranslucent: { default: "rgba(252, 252, 253, 0.8)", [DARK]: "rgba(8, 9, 10, 0.75)" },
  surface: { default: "#ffffff", [DARK]: "#0f1011" },
  surfaceRaised: { default: "#ffffff", [DARK]: "#141516" },
  border: { default: "rgba(0, 0, 0, 0.09)", [DARK]: "rgba(255, 255, 255, 0.09)" },
  borderStrong: { default: "rgba(0, 0, 0, 0.18)", [DARK]: "rgba(255, 255, 255, 0.17)" },
  text: { default: "#0d0e10", [DARK]: "#f7f8f8" },
  textSecondary: { default: "#5c5f66", [DARK]: "#9ba0a8" },
  textTertiary: { default: "#8a8f98", [DARK]: "#686d76" },
  accent: { default: "#5e6ad2", [DARK]: "#7c89f9" },
  accentText: { default: "#4c58c4", [DARK]: "#9aa5ff" },
  accentSoft: { default: "rgba(94, 106, 210, 0.09)", [DARK]: "rgba(124, 137, 249, 0.12)" },
  glow: { default: "rgba(94, 106, 210, 0.16)", [DARK]: "rgba(94, 106, 210, 0.22)" },
  shadow: { default: "rgba(0, 0, 0, 0.07)", [DARK]: "rgba(0, 0, 0, 0.45)" },
  chipBg: { default: "rgba(0, 0, 0, 0.04)", [DARK]: "rgba(255, 255, 255, 0.06)" },
});

export const fonts = stylex.defineVars({
  body: "'Inter Variable', 'Inter', system-ui, -apple-system, sans-serif",
  mono: "'JetBrains Mono Variable', 'JetBrains Mono', ui-monospace, monospace",
});

import * as stylex from "@stylexjs/stylex";
import { colors, fonts } from "@/theme/tokens.stylex";

const styles = stylex.create({
  chip: {
    display: "inline-flex",
    alignItems: "center",
    fontFamily: fonts.mono,
    fontSize: 12,
    lineHeight: 1,
    paddingBlock: 6,
    paddingInline: 10,
    borderRadius: 6,
    backgroundColor: colors.chipBg,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: colors.border,
    color: colors.textSecondary,
    whiteSpace: "nowrap",
  },
  accent: {
    backgroundColor: colors.accentSoft,
    borderColor: "transparent",
    color: colors.accentText,
  },
});

export function Chip({ label, accent = false }: { label: string; accent?: boolean }) {
  return <span {...stylex.props(styles.chip, accent && styles.accent)}>{label}</span>;
}

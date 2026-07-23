import * as stylex from "@stylexjs/stylex";
import { colors, fonts } from "@/theme/tokens.stylex";

const styles = stylex.create({
  button: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    fontFamily: fonts.body,
    fontSize: 14,
    fontWeight: 500,
    lineHeight: 1,
    paddingBlock: 10,
    paddingInline: 16,
    borderRadius: 8,
    color: "#ffffff",
    backgroundColor: colors.accent,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "transparent",
    textDecoration: "none",
    boxShadow: {
      default: "0 1px 2px rgba(0,0,0,0.12)",
      ":hover": "0 4px 16px rgba(94, 106, 210, 0.35)",
    },
    transform: { default: "translateY(0)", ":hover": "translateY(-1px)" },
    transitionProperty: "box-shadow, transform",
    transitionDuration: "0.18s",
    transitionTimingFunction: "ease",
  },
  compact: {
    paddingBlock: 8,
    paddingInline: 12,
    fontSize: 13,
  },
  // When the label is collapsed on small screens the button is icon-only, so
  // drop the icon↔text gap to keep it a tidy square.
  iconOnly: {
    gap: { default: 0, "@media (min-width: 560px)": 8 },
  },
  responsiveLabel: {
    display: { default: "none", "@media (min-width: 560px)": "inline" },
  },
});

/**
 * Links to /api/resume, which generates the PDF on demand — server-side,
 * from the same data (src/data/resume.ts) that renders this site.
 *
 * `responsiveLabel` collapses the text to an icon-only button below 560px —
 * used in the fixed nav, where the full label won't fit on a phone.
 */
export function DownloadResumeButton({
  compact = false,
  responsiveLabel = false,
}: {
  compact?: boolean;
  responsiveLabel?: boolean;
}) {
  return (
    <a
      href="/api/resume"
      aria-label="Download resume"
      {...stylex.props(styles.button, compact && styles.compact, responsiveLabel && styles.iconOnly)}
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
        <path d="M12 3v12m0 0 4-4m-4 4-4-4M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
      </svg>
      <span {...(responsiveLabel ? stylex.props(styles.responsiveLabel) : {})}>Download resume</span>
    </a>
  );
}

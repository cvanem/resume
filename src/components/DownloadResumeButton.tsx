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
});

/**
 * Links to /api/resume, which generates the PDF on demand — server-side,
 * from the same data (src/data/resume.ts) that renders this site.
 */
export function DownloadResumeButton({ compact = false }: { compact?: boolean }) {
  return (
    <a href="/api/resume" {...stylex.props(styles.button, compact && styles.compact)}>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
        <path d="M12 3v12m0 0 4-4m-4 4-4-4M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
      </svg>
      Download resume
    </a>
  );
}

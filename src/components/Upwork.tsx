import * as stylex from "@stylexjs/stylex";
import { colors, fonts } from "@/theme/tokens.stylex";
import { upworkStats, profile } from "@/data/resume";
import { Reveal } from "./Reveal";

const styles = stylex.create({
  wrap: {
    borderRadius: 14,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: colors.border,
    backgroundColor: colors.surface,
    overflow: "hidden",
  },
  statsRow: {
    display: "grid",
    gridTemplateColumns: { default: "repeat(2, 1fr)", "@media (min-width: 768px)": "repeat(5, 1fr)" },
    gap: 1,
    backgroundColor: colors.border,
  },
  stat: {
    backgroundColor: colors.surface,
    paddingBlock: 18,
    paddingInline: 20,
  },
  statValue: {
    fontFamily: fonts.mono,
    fontSize: 20,
    fontWeight: 600,
    color: colors.text,
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 12,
    color: colors.textTertiary,
  },
  badgeValue: {
    color: colors.accentText,
  },
  testimonials: {
    display: "grid",
    gridTemplateColumns: { default: "1fr", "@media (min-width: 768px)": "repeat(2, 1fr)" },
    gap: 1,
    backgroundColor: colors.border,
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: colors.border,
  },
  testimonial: {
    backgroundColor: colors.surface,
    padding: 24,
  },
  quote: {
    fontSize: 14,
    lineHeight: 1.65,
    color: colors.textSecondary,
    fontStyle: "italic",
    marginBottom: 12,
  },
  author: {
    fontSize: 13,
    fontWeight: 550,
    color: colors.text,
  },
  context: {
    fontSize: 12,
    color: colors.textTertiary,
    fontFamily: fonts.mono,
    marginTop: 2,
  },
  footer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: 12,
    paddingBlock: 14,
    paddingInline: 20,
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: colors.border,
  },
  placeholderNote: {
    fontSize: 12,
    color: colors.textTertiary,
    fontFamily: fonts.mono,
  },
  profileLink: {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    fontSize: 13,
    fontWeight: 500,
    color: { default: colors.accentText, ":hover": colors.accent },
    textDecoration: "none",
  },
});

export function Upwork() {
  const stats = [
    { value: upworkStats.badge, label: "Upwork badge", badge: true },
    { value: upworkStats.jobSuccess, label: "job success" },
    { value: upworkStats.totalEarnings, label: "earned" },
    { value: upworkStats.hoursWorked, label: "hours worked" },
    { value: upworkStats.jobsCompleted, label: "jobs completed" },
  ];

  return (
    <Reveal>
      <div {...stylex.props(styles.wrap)}>
        <div {...stylex.props(styles.statsRow)}>
          {stats.map((stat) => (
            <div key={stat.label} {...stylex.props(styles.stat)}>
              <div {...stylex.props(styles.statValue, stat.badge && styles.badgeValue)}>{stat.value}</div>
              <div {...stylex.props(styles.statLabel)}>{stat.label}</div>
            </div>
          ))}
        </div>
        <div {...stylex.props(styles.testimonials)}>
          {upworkStats.testimonials.map((testimonial) => (
            <div key={testimonial.quote} {...stylex.props(styles.testimonial)}>
              <p {...stylex.props(styles.quote)}>“{testimonial.quote}”</p>
              <p {...stylex.props(styles.author)}>{testimonial.author}</p>
              <p {...stylex.props(styles.context)}>{testimonial.context}</p>
            </div>
          ))}
        </div>
        <div {...stylex.props(styles.footer)}>
          {upworkStats.isPlaceholder ? (
            <span {...stylex.props(styles.placeholderNote)}>
              sample figures — pending import from Upwork profile
            </span>
          ) : (
            <span />
          )}
          <a
            href={profile.upwork}
            target="_blank"
            rel="noopener noreferrer"
            {...stylex.props(styles.profileLink)}
          >
            View Upwork profile
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              <path d="M7 17 17 7M9 7h8v8" />
            </svg>
          </a>
        </div>
      </div>
    </Reveal>
  );
}

"use client";

import * as stylex from "@stylexjs/stylex";
import { observer } from "mobx-react-lite";
import { colors, fonts } from "@/theme/tokens.stylex";
import { eras, type Era, type TimelineItem } from "@/data/resume";
import { useUIStore } from "@/stores/ui-store";
import { Chip } from "./Chip";
import { Reveal } from "./Reveal";

const styles = stylex.create({
  timeline: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    gap: 48,
  },
  era: {
    position: "relative",
    paddingLeft: { default: 28, "@media (min-width: 768px)": 40 },
  },
  rail: {
    position: "absolute",
    left: { default: 5, "@media (min-width: 768px)": 7 },
    top: 26,
    bottom: -48,
    width: 2,
    background: `linear-gradient(to bottom, ${colors.borderStrong}, ${colors.border})`,
  },
  railLast: {
    background: `linear-gradient(to bottom, ${colors.borderStrong}, transparent)`,
  },
  node: {
    position: "absolute",
    left: 0,
    top: 8,
    width: { default: 12, "@media (min-width: 768px)": 16 },
    height: { default: 12, "@media (min-width: 768px)": 16 },
    borderRadius: "50%",
    backgroundColor: colors.bg,
    borderWidth: 2,
    borderStyle: "solid",
    borderColor: colors.accent,
    boxShadow: `0 0 0 4px ${colors.accentSoft}`,
  },
  eraHeader: {
    marginBottom: 8,
  },
  periodRow: {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 6,
  },
  period: {
    fontFamily: fonts.mono,
    fontSize: 13,
    color: colors.accentText,
    letterSpacing: "0.04em",
  },
  typeBadge: {
    fontFamily: fonts.mono,
    fontSize: 11,
    fontWeight: 500,
    letterSpacing: "0.04em",
    textTransform: "uppercase",
    lineHeight: 1,
    paddingBlock: 5,
    paddingInline: 9,
    borderRadius: 999,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: colors.border,
    backgroundColor: colors.chipBg,
    color: colors.textSecondary,
  },
  typeBadgeIndependent: {
    borderColor: "transparent",
    backgroundColor: colors.accentSoft,
    color: colors.accentText,
  },
  role: {
    fontSize: { default: 20, "@media (min-width: 768px)": 24 },
    fontWeight: 600,
    letterSpacing: "-0.02em",
    color: colors.text,
    lineHeight: 1.25,
  },
  org: {
    fontSize: 15,
    color: colors.textSecondary,
    marginTop: 2,
  },
  blurb: {
    fontSize: 15,
    lineHeight: 1.6,
    color: colors.textSecondary,
    maxWidth: 620,
    marginTop: 10,
    marginBottom: 20,
  },
  itemsLabel: {
    fontFamily: fonts.mono,
    fontSize: 13,
    fontWeight: 500,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    color: colors.accentText,
    marginBottom: 4,
  },
  itemsCaption: {
    fontSize: 13,
    lineHeight: 1.5,
    color: colors.textTertiary,
    marginBottom: 14,
  },
  items: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  item: {
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: colors.border,
    borderRadius: 12,
    backgroundColor: colors.surface,
    overflow: "hidden",
    transitionProperty: "border-color, box-shadow",
    transitionDuration: "0.2s",
  },
  itemExpanded: {
    borderColor: colors.borderStrong,
    boxShadow: `0 8px 30px ${colors.shadow}`,
  },
  itemButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 16,
    width: "100%",
    textAlign: "left",
    paddingBlock: 16,
    paddingInline: { default: 16, "@media (min-width: 768px)": 20 },
    backgroundColor: { default: "transparent", ":hover": colors.chipBg },
    transitionProperty: "background-color",
    transitionDuration: "0.15s",
  },
  itemHeading: {
    display: "flex",
    flexDirection: "column",
    gap: 3,
    minWidth: 0,
  },
  itemYears: {
    fontFamily: fonts.mono,
    fontSize: 12,
    color: colors.textTertiary,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 550,
    color: colors.text,
    letterSpacing: "-0.01em",
  },
  itemSummary: {
    fontSize: 14,
    lineHeight: 1.5,
    color: colors.textSecondary,
    marginTop: 2,
  },
  chevron: {
    flexShrink: 0,
    color: colors.textTertiary,
    transitionProperty: "transform",
    transitionDuration: "0.25s",
    transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
  },
  chevronOpen: {
    transform: "rotate(180deg)",
  },
  // Smooth height animation without measuring: animate grid rows 0fr -> 1fr.
  collapse: {
    display: "grid",
    gridTemplateRows: "0fr",
    transitionProperty: "grid-template-rows",
    transitionDuration: "0.3s",
    transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
  },
  collapseOpen: {
    gridTemplateRows: "1fr",
  },
  collapseInner: {
    overflow: "hidden",
  },
  detail: {
    paddingInline: { default: 16, "@media (min-width: 768px)": 20 },
    paddingBottom: 20,
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: colors.border,
    paddingTop: 16,
  },
  bullets: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    marginBottom: 16,
    listStyleType: "none",
  },
  bullet: {
    position: "relative",
    paddingLeft: 18,
    fontSize: 14,
    lineHeight: 1.6,
    color: colors.textSecondary,
    "::before": {
      content: '""',
      position: "absolute",
      left: 0,
      top: 9,
      width: 6,
      height: 6,
      borderRadius: 2,
      backgroundColor: colors.accent,
      opacity: 0.7,
    },
  },
  chips: {
    display: "flex",
    flexWrap: "wrap",
    gap: 6,
  },
  itemLink: {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    marginTop: 14,
    fontSize: 13,
    fontWeight: 500,
    color: { default: colors.accentText, ":hover": colors.accent },
    textDecoration: "none",
  },
  itemNote: {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    marginTop: 14,
    fontSize: 13,
    fontWeight: 500,
    color: colors.textTertiary,
  },
});

const TimelineEntry = observer(function TimelineEntry({ item }: { item: TimelineItem }) {
  const ui = useUIStore();
  const open = ui.isTimelineItemExpanded(item.id);

  return (
    <div {...stylex.props(styles.item, open && styles.itemExpanded)}>
      <button
        type="button"
        {...stylex.props(styles.itemButton)}
        onClick={() => ui.toggleTimelineItem(item.id)}
        aria-expanded={open}
        aria-controls={`timeline-detail-${item.id}`}
      >
        <span {...stylex.props(styles.itemHeading)}>
          <span {...stylex.props(styles.itemYears)}>{item.years}</span>
          <span {...stylex.props(styles.itemTitle)}>{item.title}</span>
          <span {...stylex.props(styles.itemSummary)}>{item.summary}</span>
        </span>
        <svg
          {...stylex.props(styles.chevron, open && styles.chevronOpen)}
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>
      <div {...stylex.props(styles.collapse, open && styles.collapseOpen)}>
        <div {...stylex.props(styles.collapseInner)}>
          <div id={`timeline-detail-${item.id}`} {...stylex.props(styles.detail)}>
            <ul {...stylex.props(styles.bullets)}>
              {item.bullets.map((bullet) => (
                <li key={bullet} {...stylex.props(styles.bullet)}>
                  {bullet}
                </li>
              ))}
            </ul>
            {item.tech ? (
              <div {...stylex.props(styles.chips)}>
                {item.tech.map((tech) => (
                  <Chip key={tech} label={tech} />
                ))}
              </div>
            ) : null}
            {item.link ? (
              <a
                href={item.link.href}
                target="_blank"
                rel="noopener noreferrer"
                {...stylex.props(styles.itemLink)}
              >
                {item.link.label}
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                  <path d="M7 17 17 7M9 7h8v8" />
                </svg>
              </a>
            ) : null}
            {item.note ? (
              <span {...stylex.props(styles.itemNote)}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                  <rect x="5" y="11" width="14" height="10" rx="2" />
                  <path d="M8 11V7a4 4 0 0 1 8 0v4" />
                </svg>
                {item.note}
              </span>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
});

function EraBlock({ era, isLast }: { era: Era; isLast: boolean }) {
  return (
    <div {...stylex.props(styles.era)}>
      <div {...stylex.props(styles.rail, isLast && styles.railLast)} />
      <div {...stylex.props(styles.node)} />
      <Reveal>
        <div {...stylex.props(styles.eraHeader)}>
          <div {...stylex.props(styles.periodRow)}>
            <p {...stylex.props(styles.period)}>{era.period}</p>
            {era.employmentType ? (
              <span
                {...stylex.props(
                  styles.typeBadge,
                  era.employmentType.startsWith("Independent") && styles.typeBadgeIndependent,
                )}
              >
                {era.employmentType}
              </span>
            ) : null}
          </div>
          <h3 {...stylex.props(styles.role)}>{era.role}</h3>
          <p {...stylex.props(styles.org)}>
            {era.org} · {era.location}
          </p>
          {(Array.isArray(era.blurb) ? era.blurb : [era.blurb]).map((para) => (
            <p key={para} {...stylex.props(styles.blurb)}>
              {para}
            </p>
          ))}
        </div>
      </Reveal>
      {era.items.length > 0 ? (
        <>
          {era.itemsLabel ? (
            <Reveal>
              <p {...stylex.props(styles.itemsLabel)}>{era.itemsLabel}</p>
              {era.itemsCaption ? (
                <p {...stylex.props(styles.itemsCaption)}>{era.itemsCaption}</p>
              ) : null}
            </Reveal>
          ) : null}
          <div {...stylex.props(styles.items)}>
            {era.items.map((item, index) => (
              <Reveal key={item.id} delay={index * 60}>
                <TimelineEntry item={item} />
              </Reveal>
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
}

export function Timeline() {
  return (
    <div {...stylex.props(styles.timeline)}>
      {eras.map((era, index) => (
        <EraBlock key={era.id} era={era} isLast={index === eras.length - 1} />
      ))}
    </div>
  );
}

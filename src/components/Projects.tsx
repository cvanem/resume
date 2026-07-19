"use client";

import * as stylex from "@stylexjs/stylex";
import { observer } from "mobx-react-lite";
import { useEffect, useRef } from "react";
import { colors, fonts } from "@/theme/tokens.stylex";
import { projects, type Project } from "@/data/resume";
import { useUIStore } from "@/stores/ui-store";
import { Chip } from "./Chip";
import { Reveal } from "./Reveal";

const styles = stylex.create({
  grid: {
    display: "grid",
    gridTemplateColumns: { default: "1fr", "@media (min-width: 768px)": "repeat(2, 1fr)" },
    gap: 16,
  },
  card: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    textAlign: "left",
    width: "100%",
    height: "100%",
    gap: 10,
    padding: 24,
    borderRadius: 14,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: { default: colors.border, ":hover": colors.borderStrong },
    backgroundColor: colors.surface,
    boxShadow: { default: "none", ":hover": `0 12px 40px ${colors.shadow}` },
    transform: { default: "translateY(0)", ":hover": "translateY(-2px)" },
    transitionProperty: "border-color, box-shadow, transform",
    transitionDuration: "0.2s",
    transitionTimingFunction: "ease",
  },
  kicker: {
    fontFamily: fonts.mono,
    fontSize: 11,
    fontWeight: 500,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    color: colors.accentText,
  },
  cardName: {
    fontSize: 19,
    fontWeight: 600,
    letterSpacing: "-0.015em",
    color: colors.text,
  },
  cardClient: {
    fontSize: 13,
    color: colors.textTertiary,
    fontFamily: fonts.mono,
  },
  cardDescription: {
    fontSize: 14,
    lineHeight: 1.6,
    color: colors.textSecondary,
    flexGrow: 1,
  },
  cardMetrics: {
    display: "flex",
    flexWrap: "wrap",
    gap: 18,
    marginTop: 6,
  },
  metricValue: {
    fontFamily: fonts.mono,
    fontSize: 17,
    fontWeight: 600,
    color: colors.text,
  },
  metricLabel: {
    fontSize: 12,
    color: colors.textTertiary,
    marginTop: 2,
  },
  cardFooter: {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    marginTop: 10,
    fontSize: 13,
    fontWeight: 500,
    color: colors.accentText,
  },
  // --- dialog ---
  dialog: {
    maxWidth: 660,
    width: "calc(100vw - 40px)",
    maxHeight: "85dvh",
    borderRadius: 16,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: colors.borderStrong,
    backgroundColor: colors.surfaceRaised,
    color: colors.text,
    padding: 0,
    boxShadow: `0 24px 80px ${colors.shadow}`,
    "::backdrop": {
      backgroundColor: "rgba(4, 5, 8, 0.6)",
      backdropFilter: "blur(4px)",
    },
  },
  dialogInner: {
    padding: { default: 24, "@media (min-width: 768px)": 32 },
    overflowY: "auto",
    maxHeight: "85dvh",
    fontFamily: fonts.body,
  },
  dialogHeader: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 16,
    marginBottom: 6,
  },
  closeButton: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    width: 32,
    height: 32,
    borderRadius: 8,
    color: colors.textSecondary,
    backgroundColor: { default: "transparent", ":hover": colors.chipBg },
    transitionProperty: "background-color",
    transitionDuration: "0.15s",
  },
  dialogYears: {
    fontFamily: fonts.mono,
    fontSize: 12,
    color: colors.textTertiary,
    marginBottom: 16,
  },
  dialogDescription: {
    fontSize: 15,
    lineHeight: 1.65,
    color: colors.textSecondary,
    marginBottom: 20,
  },
  highlights: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
    marginBottom: 22,
    listStyleType: "none",
  },
  highlight: {
    position: "relative",
    paddingLeft: 18,
    fontSize: 14,
    lineHeight: 1.65,
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
    marginBottom: 8,
  },
  dialogLinks: {
    display: "flex",
    flexWrap: "wrap",
    gap: 16,
    marginTop: 16,
  },
  dialogLink: {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    fontSize: 14,
    fontWeight: 500,
    color: { default: colors.accentText, ":hover": colors.accent },
    textDecoration: "none",
  },
  dialogNote: {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    fontSize: 14,
    fontWeight: 500,
    color: colors.textTertiary,
  },
});

const ProjectDialog = observer(function ProjectDialog() {
  const ui = useUIStore();
  const ref = useRef<HTMLDialogElement>(null);
  const project = projects.find((candidate) => candidate.id === ui.openProjectId) ?? null;

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (project && !dialog.open) {
      dialog.showModal();
    } else if (!project && dialog.open) {
      dialog.close();
    }
  }, [project]);

  return (
    <dialog
      ref={ref}
      {...stylex.props(styles.dialog)}
      onClose={() => ui.closeProject()}
      onClick={(event) => {
        // Close when the backdrop (the dialog element itself) is clicked.
        if (event.target === event.currentTarget) ui.closeProject();
      }}
      aria-label={project ? `${project.name} details` : undefined}
    >
      {project ? (
        <div {...stylex.props(styles.dialogInner)}>
          <div {...stylex.props(styles.dialogHeader)}>
            <div>
              <p {...stylex.props(styles.kicker)}>{project.kicker}</p>
              <h3 {...stylex.props(styles.cardName)}>{project.name}</h3>
              <p {...stylex.props(styles.cardClient)}>{project.client}</p>
            </div>
            <button
              type="button"
              {...stylex.props(styles.closeButton)}
              onClick={() => ui.closeProject()}
              aria-label="Close"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
          </div>
          <p {...stylex.props(styles.dialogYears)}>{project.years}</p>
          <p {...stylex.props(styles.dialogDescription)}>{project.description}</p>
          <ul {...stylex.props(styles.highlights)}>
            {project.highlights.map((highlight) => (
              <li key={highlight} {...stylex.props(styles.highlight)}>
                {highlight}
              </li>
            ))}
          </ul>
          <div {...stylex.props(styles.chips)}>
            {project.tech.map((tech) => (
              <Chip key={tech} label={tech} />
            ))}
          </div>
          {project.links?.length || project.note ? (
            <div {...stylex.props(styles.dialogLinks)}>
              {project.links?.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  {...stylex.props(styles.dialogLink)}
                >
                  {link.label}
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                    <path d="M7 17 17 7M9 7h8v8" />
                  </svg>
                </a>
              ))}
              {project.note ? (
                <span {...stylex.props(styles.dialogNote)}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                    <rect x="5" y="11" width="14" height="10" rx="2" />
                    <path d="M8 11V7a4 4 0 0 1 8 0v4" />
                  </svg>
                  {project.note}
                </span>
              ) : null}
            </div>
          ) : null}
        </div>
      ) : null}
    </dialog>
  );
});

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const ui = useUIStore();

  return (
    <Reveal delay={(index % 2) * 80}>
      <button type="button" {...stylex.props(styles.card)} onClick={() => ui.openProject(project.id)}>
        <span {...stylex.props(styles.kicker)}>{project.kicker}</span>
        <span {...stylex.props(styles.cardName)}>{project.name}</span>
        <span {...stylex.props(styles.cardClient)}>{project.client}</span>
        <span {...stylex.props(styles.cardDescription)}>{project.description}</span>
        {project.metrics ? (
          <span {...stylex.props(styles.cardMetrics)}>
            {project.metrics.map((metric) => (
              <span key={metric.label}>
                <span {...stylex.props(styles.metricValue)}>{metric.value}</span>
                <span {...stylex.props(styles.metricLabel)}>{metric.label}</span>
              </span>
            ))}
          </span>
        ) : null}
        <span {...stylex.props(styles.cardFooter)}>
          View details
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
            <path d="M5 12h14m0 0-6-6m6 6-6 6" />
          </svg>
        </span>
      </button>
    </Reveal>
  );
}

export const Projects = observer(function Projects() {
  return (
    <>
      <div {...stylex.props(styles.grid)}>
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
      <ProjectDialog />
    </>
  );
});

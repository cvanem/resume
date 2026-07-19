import * as stylex from "@stylexjs/stylex";
import { colors, fonts } from "@/theme/tokens.stylex";
import { profile } from "@/data/resume";
import { DownloadResumeButton } from "./DownloadResumeButton";

const styles = stylex.create({
  contact: {
    maxWidth: 1024,
    marginInline: "auto",
    paddingInline: { default: 24, "@media (min-width: 768px)": 32 },
    paddingBlock: { default: 56, "@media (min-width: 768px)": 88 },
    scrollMarginTop: 80,
  },
  card: {
    position: "relative",
    overflow: "hidden",
    textAlign: "center",
    padding: { default: 40, "@media (min-width: 768px)": 64 },
    borderRadius: 18,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  cardGlow: {
    position: "absolute",
    top: -160,
    left: "50%",
    transform: "translateX(-50%)",
    width: 600,
    height: 320,
    borderRadius: "50%",
    background: `radial-gradient(ellipse at center, ${colors.glow} 0%, transparent 70%)`,
    pointerEvents: "none",
  },
  title: {
    position: "relative",
    fontSize: { default: 26, "@media (min-width: 768px)": 34 },
    fontWeight: 600,
    letterSpacing: "-0.02em",
    color: colors.text,
    marginBottom: 12,
  },
  text: {
    position: "relative",
    fontSize: 16,
    lineHeight: 1.6,
    color: colors.textSecondary,
    maxWidth: 480,
    marginInline: "auto",
    marginBottom: 28,
  },
  actions: {
    position: "relative",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 12,
    marginBottom: 28,
  },
  contactRow: {
    position: "relative",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: { default: 12, "@media (min-width: 768px)": 24 },
  },
  contactLink: {
    display: "inline-flex",
    alignItems: "center",
    gap: 7,
    fontSize: 14,
    color: { default: colors.textSecondary, ":hover": colors.text },
    textDecoration: "none",
    transitionProperty: "color",
    transitionDuration: "0.15s",
  },
  footer: {
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: colors.border,
  },
  footerInner: {
    maxWidth: 1024,
    marginInline: "auto",
    paddingInline: { default: 24, "@media (min-width: 768px)": 32 },
    paddingBlock: 24,
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  footerText: {
    fontSize: 13,
    color: colors.textTertiary,
  },
  footerMono: {
    fontFamily: fonts.mono,
    fontSize: 12,
    color: colors.textTertiary,
  },
  footerLink: {
    color: { default: colors.textSecondary, ":hover": colors.text },
    textDecoration: "none",
  },
});

function IconMail() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}

function IconPhone() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.5 2.1L8 10a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.9.6 2.9.7a2 2 0 0 1 1.7 2Z" />
    </svg>
  );
}

function IconGitHub() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.26-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02a9.58 9.58 0 0 1 5 0c1.91-1.3 2.75-1.02 2.75-1.02.55 1.37.2 2.38.1 2.64.64.7 1.03 1.6 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85V21c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
    </svg>
  );
}

function IconUpwork() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M18.56 13.9c-.83 0-1.6-.35-2.3-.92l.17-.8v-.03c.15-.86.63-2.3 2.13-2.3a2.03 2.03 0 0 1 0 4.06Zm0-6.13a4.1 4.1 0 0 0-4 3.16 12.9 12.9 0 0 1-1.85-3.87H10.6v4.7a1.67 1.67 0 1 1-3.34 0v-4.7H5.16v4.7a3.77 3.77 0 0 0 3.76 3.79 3.77 3.77 0 0 0 3.76-3.8v-.78c.41.86.92 1.73 1.53 2.5l-1.3 6.1h2.15l.94-4.42a5.1 5.1 0 0 0 2.56.68 4.1 4.1 0 0 0 4.1-4.1 4.06 4.06 0 0 0-4.1-3.96Z" />
    </svg>
  );
}

export function ContactAndFooter() {
  return (
    <>
      <section id="contact" {...stylex.props(styles.contact)}>
        <div {...stylex.props(styles.card)}>
          <div {...stylex.props(styles.cardGlow)} />
          <h2 {...stylex.props(styles.title)}>Let&rsquo;s build something great.</h2>
          <p {...stylex.props(styles.text)}>
            Available for senior full stack roles and consulting engagements. The résumé below is
            generated on demand from the same data that powers this page.
          </p>
          <div {...stylex.props(styles.actions)}>
            <DownloadResumeButton />
          </div>
          <div {...stylex.props(styles.contactRow)}>
            <a href={`mailto:${profile.email}`} {...stylex.props(styles.contactLink)}>
              <IconMail />
              {profile.email}
            </a>
            <a href={`tel:${profile.phone.replace(/[^+\d]/g, "")}`} {...stylex.props(styles.contactLink)}>
              <IconPhone />
              {profile.phone}
            </a>
            <a href={profile.github} target="_blank" rel="noopener noreferrer" {...stylex.props(styles.contactLink)}>
              <IconGitHub />
              github.com/cvanem
            </a>
            <a href={profile.upwork} target="_blank" rel="noopener noreferrer" {...stylex.props(styles.contactLink)}>
              <IconUpwork />
              Upwork
            </a>
          </div>
        </div>
      </section>
      <footer {...stylex.props(styles.footer)}>
        <div {...stylex.props(styles.footerInner)}>
          <span {...stylex.props(styles.footerText)}>
            © {new Date().getFullYear()} {profile.name} · {profile.location}
          </span>
          <span {...stylex.props(styles.footerMono)}>
            Built with Next.js · MobX · StyleX ·{" "}
            <a
              href="https://github.com/cvanem/portfolio"
              target="_blank"
              rel="noopener noreferrer"
              {...stylex.props(styles.footerLink)}
            >
              source
            </a>
          </span>
        </div>
      </footer>
    </>
  );
}

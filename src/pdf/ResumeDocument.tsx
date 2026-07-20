/**
 * The PDF resume, rendered with @react-pdf/renderer from the exact same
 * data (src/data/resume.ts) that powers the website.
 *
 * Loaded lazily on the client — never part of the main bundle.
 */
import type { ReactNode } from "react";
import { Document, Page, Text, View, Link, Svg, G, Path, Circle, StyleSheet } from "@react-pdf/renderer";
import { profile, eras, education, training, skillGroups } from "@/data/resume";

const ACCENT = "#4c58c4";
const LINK = "#1155cc"; // standard web-link blue for clickable values
const TEXT = "#16181d";
const SECONDARY = "#4b4f57";
const TERTIARY = "#7a7f88";
const BORDER = "#e2e4e8";
const RAIL = "#c8ccec"; // light accent tint for the era rail

const styles = StyleSheet.create({
  page: {
    paddingTop: 36,
    paddingBottom: 38,
    paddingHorizontal: 44,
    fontFamily: "Helvetica",
    fontSize: 9,
    color: TEXT,
    lineHeight: 1.4,
  },
  name: {
    fontSize: 22,
    fontFamily: "Helvetica-Bold",
    letterSpacing: -0.3,
    lineHeight: 1,
    textAlign: "center",
  },
  headline: {
    fontSize: 11,
    color: ACCENT,
    marginTop: 6,
    fontFamily: "Helvetica-Bold",
    lineHeight: 1,
    textAlign: "center",
  },
  contactBlock: {
    marginTop: 10,
  },
  contactRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  contactRow2: {
    marginTop: 6,
  },
  sep: {
    fontSize: 8,
    color: "#c2c6cf",
    lineHeight: 1,
  },
  contactEntry: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    fontSize: 8,
  },
  contactLabel: {
    fontFamily: "Helvetica-Bold",
    fontSize: 8,
    color: TEXT,
    lineHeight: 1,
  },
  contactValue: {
    fontSize: 8,
    color: LINK,
    textDecoration: "none",
    lineHeight: 1,
  },
  contactValuePlain: {
    fontSize: 8,
    color: SECONDARY,
    lineHeight: 1,
  },
  headerRule: {
    borderBottomWidth: 1,
    borderBottomColor: BORDER,
    marginTop: 9,
  },
  summary: {
    marginTop: 9,
    color: SECONDARY,
  },
  summaryLead: {
    fontFamily: "Helvetica-Bold",
    color: TEXT,
  },
  section: {
    marginTop: 12,
  },
  sectionTitle: {
    fontSize: 10.5,
    fontFamily: "Helvetica-Bold",
    textTransform: "uppercase",
    letterSpacing: 1.2,
    color: ACCENT,
    borderBottomWidth: 1,
    borderBottomColor: BORDER,
    paddingBottom: 4,
    marginBottom: 8,
  },
  era: {
    marginBottom: 11,
  },
  eraHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
  },
  eraRole: {
    flex: 1,
    paddingRight: 10,
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
  },
  eraType: {
    fontSize: 9,
    fontFamily: "Helvetica",
    color: ACCENT,
  },
  eraMeta: {
    fontSize: 8.5,
    color: TERTIARY,
  },
  eraOrg: {
    fontSize: 9,
    color: SECONDARY,
    marginTop: 1,
    marginBottom: 6,
  },
  eraItems: {
    marginLeft: 3,
    paddingLeft: 12,
    borderLeftWidth: 1.5,
    borderLeftColor: RAIL,
  },
  item: {
    marginBottom: 7,
  },
  itemTitleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
  },
  itemTitle: {
    flex: 1,
    paddingRight: 8,
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
    color: TEXT,
  },
  itemYears: {
    fontSize: 8,
    color: TERTIARY,
  },
  itemSummary: {
    color: SECONDARY,
    marginTop: 1.5,
  },
  bulletRow: {
    flexDirection: "row",
    marginTop: 2,
    paddingLeft: 1,
  },
  bulletGlyph: {
    width: 9,
    color: ACCENT,
    fontFamily: "Helvetica-Bold",
  },
  bulletText: {
    flex: 1,
    color: SECONDARY,
  },
  skillsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  skillGroup: {
    width: "50%",
    marginBottom: 6,
    paddingRight: 12,
  },
  skillLabel: {
    fontFamily: "Helvetica-Bold",
    fontSize: 9,
    marginBottom: 1.5,
  },
  skillList: {
    color: SECONDARY,
    fontSize: 8.5,
  },
  eduRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
  },
  link: {
    color: ACCENT,
    textDecoration: "none",
  },
  footer: {
    position: "absolute",
    bottom: 18,
    left: 44,
    right: 44,
    flexDirection: "row",
    justifyContent: "space-between",
    fontSize: 7.5,
    color: TERTIARY,
  },
});

const ICONS: Record<string, ReactNode> = {
  globe: (
    <G>
      <Circle cx={12} cy={12} r={10} fill="none" stroke={ACCENT} strokeWidth={2} />
      <Path d="M2 12h20" fill="none" stroke={ACCENT} strokeWidth={2} strokeLinejoin="round" />
      <Path
        d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"
        fill="none"
        stroke={ACCENT}
        strokeWidth={2}
        strokeLinejoin="round"
      />
    </G>
  ),
  pin: (
    <G>
      <Path
        d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"
        fill="none"
        stroke={ACCENT}
        strokeWidth={2}
        strokeLinejoin="round"
      />
      <Circle cx={12} cy={10} r={3} fill="none" stroke={ACCENT} strokeWidth={2} />
    </G>
  ),
  phone: (
    <Path
      d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
      fill="none"
      stroke={ACCENT}
      strokeWidth={2}
      strokeLinejoin="round"
    />
  ),
  mail: (
    <G>
      <Path
        d="M2 6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2z"
        fill="none"
        stroke={ACCENT}
        strokeWidth={2}
        strokeLinejoin="round"
      />
      <Path d="m2 7 10 6 10-6" fill="none" stroke={ACCENT} strokeWidth={2} strokeLinejoin="round" />
    </G>
  ),
  github: (
    <Path
      d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"
      fill="none"
      stroke={ACCENT}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  upwork: (
    <G>
      <Path
        d="M4 7h16a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1z"
        fill="none"
        stroke={ACCENT}
        strokeWidth={2}
        strokeLinejoin="round"
      />
      <Path
        d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
        fill="none"
        stroke={ACCENT}
        strokeWidth={2}
        strokeLinejoin="round"
      />
    </G>
  ),
};

function Icon({ name, size = 9 }: { name: keyof typeof ICONS; size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      {ICONS[name]}
    </Svg>
  );
}

/** Strip scheme, leading www., and any trailing slash so printed text shows a clean path. */
const displayUrl = (url: string) =>
  url.replace(/^https?:\/\//, "").replace(/^www\./, "").replace(/\/$/, "");

function ContactEntry({
  icon,
  label,
  value,
  href,
}: {
  icon: keyof typeof ICONS;
  label: string;
  value: string;
  href?: string;
}) {
  return (
    <View style={styles.contactEntry}>
      <Icon name={icon} />
      <Text style={styles.contactLabel}>{label}</Text>
      {href ? (
        <Link src={href} style={styles.contactValue}>
          {value}
        </Link>
      ) : (
        <Text style={styles.contactValuePlain}>{value}</Text>
      )}
    </View>
  );
}

type Entry = { icon: keyof typeof ICONS; label: string; value: string; href?: string };

function ContactLine({ items, second }: { items: Entry[]; second?: boolean }) {
  const nodes: ReactNode[] = [];
  items.forEach((it, i) => {
    if (i > 0) {
      nodes.push(
        <Text key={`sep-${i}`} style={styles.sep}>
          |
        </Text>,
      );
    }
    nodes.push(<ContactEntry key={it.label} {...it} />);
  });
  return <View style={second ? [styles.contactRow, styles.contactRow2] : styles.contactRow}>{nodes}</View>;
}

function Contact() {
  return (
    <View style={styles.contactBlock}>
      <ContactLine
        items={[
          { icon: "pin", label: "Location", value: profile.location },
          { icon: "mail", label: "Email", value: profile.email, href: `mailto:${profile.email}` },
          { icon: "phone", label: "Phone", value: profile.phone, href: `tel:${profile.phone}` },
        ]}
      />
      <ContactLine
        second
        items={[
          { icon: "globe", label: "Live Resume", value: displayUrl(profile.website), href: profile.website },
          { icon: "upwork", label: "Upwork", value: displayUrl(profile.upwork), href: profile.upwork },
          { icon: "github", label: "GitHub", value: displayUrl(profile.github), href: profile.github },
        ]}
      />
    </View>
  );
}

export function ResumeDocument({ generatedOn }: { generatedOn: string }) {
  return (
    <Document
      title={`${profile.name} — Resume`}
      author={profile.name}
      subject={profile.title}
      creator="cvanem/resume — generated on demand"
    >
      <Page size="LETTER" style={styles.page}>
        {/* Header */}
        <Text style={styles.name}>{profile.name}</Text>
        <Text style={styles.headline}>{profile.title}</Text>
        <View style={styles.headerRule} />
        <Contact />
        <View style={styles.headerRule} />
        <Text style={styles.summary}>
          <Text style={styles.summaryLead}>{profile.summaryLead} </Text>
          {profile.summaryDetail}
        </Text>

        {/* Experience */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Experience</Text>
          {eras
            .filter((era) => era.id !== "education")
            .map((era) => (
              <View key={era.id} style={styles.era}>
                <View style={styles.eraHeader}>
                  <Text style={styles.eraRole}>
                    {era.role}
                    {era.employmentType ? (
                      <Text style={styles.eraType}> · {era.employmentType}</Text>
                    ) : null}
                  </Text>
                  <Text style={styles.eraMeta}>{era.period}</Text>
                </View>
                <Text style={styles.eraOrg}>
                  {era.org} · {era.location}
                </Text>
                <View style={styles.eraItems}>
                  {era.items.map((item) => (
                    <View key={item.id} style={styles.item} wrap={false}>
                      <View style={styles.itemTitleRow}>
                        <Text style={styles.itemTitle}>{item.title}</Text>
                        <Text style={styles.itemYears}>{item.years}</Text>
                      </View>
                      <Text style={styles.itemSummary}>{item.summary}</Text>
                      {item.bullets.map((bullet) => (
                        <View key={bullet} style={styles.bulletRow}>
                          <Text style={styles.bulletGlyph}>•</Text>
                          <Text style={styles.bulletText}>{bullet}</Text>
                        </View>
                      ))}
                    </View>
                  ))}
                </View>
              </View>
            ))}
        </View>

        {/* Skills */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Skills</Text>
          <View style={styles.skillsGrid}>
            {skillGroups.map((group) => (
              <View key={group.label} style={styles.skillGroup} wrap={false}>
                <Text style={styles.skillLabel}>{group.label}</Text>
                <Text style={styles.skillList}>{group.skills.join(" · ")}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Education & Training */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Education & Training</Text>
          <View style={styles.eduRow}>
            <Text style={styles.itemTitle}>
              {education.degree} — {education.school}
            </Text>
            <Text style={styles.itemYears}>{education.years}</Text>
          </View>
          {training.map((entry) => (
            <Text key={entry} style={[styles.itemSummary, { marginTop: 3 }]}>
              {entry}
            </Text>
          ))}
        </View>

        <View style={styles.footer} fixed>
          <Text>
            {profile.name} — {profile.title}
          </Text>
          <Text
            render={({ pageNumber, totalPages }) =>
              `Generated ${generatedOn} · Page ${pageNumber} of ${totalPages}`
            }
          />
        </View>
      </Page>
    </Document>
  );
}

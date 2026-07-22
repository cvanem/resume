/**
 * The PDF resume, rendered with @react-pdf/renderer from the exact same
 * data (src/data/resume.ts) that powers the website.
 *
 * Loaded lazily on the client — never part of the main bundle.
 */
import type { ReactNode } from "react";
import { Document, Page, Text, View, Link, Svg, G, Path, Circle, StyleSheet } from "@react-pdf/renderer";
import { profile, eras, education, training, coreSkills, type TimelineItem } from "@/data/resume";

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
  topLinks: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 8,
  },
  sep: {
    fontSize: 8,
    color: "#c2c6cf",
    lineHeight: 1,
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginTop: 10,
  },
  name: {
    fontSize: 23,
    fontFamily: "Helvetica-Bold",
    letterSpacing: -0.3,
    lineHeight: 1,
  },
  headline: {
    fontSize: 11.5,
    color: ACCENT,
    marginTop: 5,
    fontFamily: "Helvetica-Bold",
    lineHeight: 1,
  },
  headerRight: {
    alignItems: "flex-end",
    gap: 3.5,
    paddingTop: 2,
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
  techRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 4,
  },
  techChip: {
    fontSize: 7.5,
    lineHeight: 1, // override the page's 1.4 so the pill hugs the text and stays centered
    color: "#33366b", // deeper indigo than ACCENT for stronger contrast at small size
    backgroundColor: "#eaecf9",
    borderRadius: 3,
    // Asymmetric vertical padding, tuned by measuring the rendered PDF: the glyph
    // sits low in the line box, so slightly more bottom padding than top centers
    // it. Total = 3, same pill height.
    paddingTop: 1.25,
    paddingBottom: 1.75,
    paddingHorizontal: 5,
    marginRight: 3,
    marginBottom: 3,
  },
  itemLink: {
    fontSize: 8,
    color: LINK,
    textDecoration: "none",
    marginTop: 4,
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

function TopLinks() {
  return (
    <View style={styles.topLinks}>
      <ContactEntry icon="globe" label="Live Resume" value={displayUrl(profile.website)} href={profile.website} />
      <Text style={styles.sep}>|</Text>
      <ContactEntry icon="upwork" label="Upwork" value={displayUrl(profile.upwork)} href={profile.upwork} />
      <Text style={styles.sep}>|</Text>
      <ContactEntry icon="github" label="GitHub" value={displayUrl(profile.github)} href={profile.github} />
    </View>
  );
}

function Contact() {
  return (
    <View style={styles.headerRight}>
      <ContactEntry icon="pin" label="Location" value={profile.location} />
      <ContactEntry icon="mail" label="Email" value={profile.email} href={`mailto:${profile.email}`} />
      <ContactEntry icon="phone" label="Phone" value={profile.phone} href={`tel:${profile.phone}`} />
    </View>
  );
}

/** A single project/role entry inside an era. Kept wrap={false} so a project never splits across pages. */
function EraItem({ item }: { item: TimelineItem }) {
  return (
    <View style={styles.item} wrap={false}>
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
      {item.tech && item.tech.length > 0 ? (
        <View style={styles.techRow}>
          {item.tech.map((t) => (
            <Text key={t} style={styles.techChip}>
              {t}
            </Text>
          ))}
        </View>
      ) : null}
      {item.link ? (
        <Link src={item.link.href} style={styles.itemLink}>
          {item.link.label}
        </Link>
      ) : null}
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
        <TopLinks />
        <View style={styles.headerRule} />
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.name}>{profile.name}</Text>
            <Text style={styles.headline}>{profile.title}</Text>
          </View>
          <Contact />
        </View>
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
            .map((era) => {
              const [firstItem, ...restItems] = era.items;
              return (
                <View key={era.id} style={styles.era}>
                  {/* Keep the heading (and org line) glued to its first project via
                      wrap={false}, so the heading can never land alone at the bottom
                      of a page. Fully dynamic — it only breaks to the next page when
                      the heading + first project don't fit in the remaining space. */}
                  <View wrap={false}>
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
                    {firstItem ? (
                      <View style={styles.eraItems}>
                        <EraItem item={firstItem} />
                      </View>
                    ) : null}
                  </View>
                  {restItems.length > 0 ? (
                    <View style={styles.eraItems}>
                      {restItems.map((item) => (
                        <EraItem key={item.id} item={item} />
                      ))}
                    </View>
                  ) : null}
                </View>
              );
            })}
        </View>

        {/* Core Skills — condensed cross-cutting competencies (per-project stacks
            are shown as chips above). Forced onto its own page (break before). */}
        <View style={styles.section} break>
          <Text style={styles.sectionTitle}>Core Skills</Text>
          <View style={styles.skillsGrid}>
            {coreSkills.map((group) => (
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

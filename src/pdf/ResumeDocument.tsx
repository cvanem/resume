/**
 * The PDF resume, rendered with @react-pdf/renderer from the exact same
 * data (src/data/resume.ts) that powers the website.
 *
 * Loaded lazily on the client — never part of the main bundle.
 */
import { Document, Page, Text, View, Link, StyleSheet } from "@react-pdf/renderer";
import { profile, eras, education, training, skillGroups } from "@/data/resume";

const ACCENT = "#4c58c4";
const TEXT = "#16181d";
const SECONDARY = "#4b4f57";
const TERTIARY = "#7a7f88";
const BORDER = "#e2e4e8";

const styles = StyleSheet.create({
  page: {
    paddingTop: 40,
    paddingBottom: 44,
    paddingHorizontal: 48,
    fontFamily: "Helvetica",
    fontSize: 9.5,
    color: TEXT,
    lineHeight: 1.45,
  },
  name: {
    fontSize: 22,
    fontFamily: "Helvetica-Bold",
    letterSpacing: -0.3,
    lineHeight: 1,
  },
  headline: {
    fontSize: 11,
    color: ACCENT,
    marginTop: 6,
    fontFamily: "Helvetica-Bold",
    lineHeight: 1,
  },
  contactRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginTop: 7,
    color: SECONDARY,
    fontSize: 8.5,
  },
  contactSeparator: {
    color: TERTIARY,
  },
  summary: {
    marginTop: 12,
    color: SECONDARY,
  },
  section: {
    marginTop: 16,
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
    marginBottom: 10,
  },
  eraHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
  },
  eraRole: {
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
  },
  eraMeta: {
    fontSize: 8.5,
    color: TERTIARY,
  },
  eraOrg: {
    fontSize: 9.5,
    color: SECONDARY,
    marginTop: 1,
    marginBottom: 6,
  },
  item: {
    marginBottom: 8,
  },
  itemTitleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
  },
  itemTitle: {
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
    marginTop: 1,
  },
  bulletRow: {
    flexDirection: "row",
    marginTop: 2.5,
    paddingLeft: 2,
  },
  bulletGlyph: {
    width: 10,
    color: ACCENT,
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
    marginBottom: 7,
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
    bottom: 22,
    left: 48,
    right: 48,
    flexDirection: "row",
    justifyContent: "space-between",
    fontSize: 7.5,
    color: TERTIARY,
  },
});

function Contact() {
  return (
    <View style={styles.contactRow}>
      <Text>{profile.location}</Text>
      <Text style={styles.contactSeparator}>·</Text>
      <Text>{profile.phone}</Text>
      <Text style={styles.contactSeparator}>·</Text>
      <Link src={`mailto:${profile.email}`} style={styles.link}>
        {profile.email}
      </Link>
      <Text style={styles.contactSeparator}>·</Text>
      <Link src={profile.github} style={styles.link}>
        github.com/cvanem
      </Link>
      <Text style={styles.contactSeparator}>·</Text>
      <Link src={profile.upwork} style={styles.link}>
        upwork.com/freelancers/chrisvanemmerik
      </Link>
    </View>
  );
}

export function ResumeDocument({ generatedOn }: { generatedOn: string }) {
  return (
    <Document
      title={`${profile.name} — Resume`}
      author={profile.name}
      subject={profile.title}
      creator="cvanem/portfolio — generated on demand"
    >
      <Page size="LETTER" style={styles.page}>
        {/* Header */}
        <Text style={styles.name}>{profile.name}</Text>
        <Text style={styles.headline}>{profile.title}</Text>
        <Contact />
        <Text style={styles.summary}>{profile.summary}</Text>

        {/* Experience */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Experience</Text>
          {eras
            .filter((era) => era.id !== "education")
            .map((era) => (
              <View key={era.id} style={{ marginBottom: 10 }}>
                <View style={styles.eraHeader}>
                  <Text style={styles.eraRole}>{era.role}</Text>
                  <Text style={styles.eraMeta}>{era.period}</Text>
                </View>
                <Text style={styles.eraOrg}>
                  {era.org} · {era.location}
                </Text>
                {era.items.map((item) => (
                  <View key={item.id} style={styles.item} wrap={false}>
                    <View style={styles.itemTitleRow}>
                      <Text style={styles.itemTitle}>{item.title}</Text>
                      <Text style={styles.itemYears}>{item.years}</Text>
                    </View>
                    <Text style={styles.itemSummary}>{item.summary}</Text>
                    {item.bullets.map((bullet) => (
                      <View key={bullet} style={styles.bulletRow}>
                        <Text style={styles.bulletGlyph}>›</Text>
                        <Text style={styles.bulletText}>{bullet}</Text>
                      </View>
                    ))}
                  </View>
                ))}
              </View>
            ))}
        </View>

        {/* Skills */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Skills</Text>
          <View style={styles.skillsGrid}>
            {skillGroups.map((group) => (
              <View key={group.label} style={styles.skillGroup}>
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
          <Text>{profile.name} — {profile.title}</Text>
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

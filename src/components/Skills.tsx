import * as stylex from "@stylexjs/stylex";
import { colors } from "@/theme/tokens.stylex";
import { skillGroups } from "@/data/resume";
import { Chip } from "./Chip";
import { Reveal } from "./Reveal";

const styles = stylex.create({
  grid: {
    display: "grid",
    gridTemplateColumns: { default: "1fr", "@media (min-width: 768px)": "repeat(2, 1fr)", "@media (min-width: 1024px)": "repeat(3, 1fr)" },
    gap: 16,
  },
  group: {
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: colors.border,
    backgroundColor: colors.surface,
    height: "100%",
  },
  label: {
    fontSize: 14,
    fontWeight: 600,
    letterSpacing: "-0.01em",
    color: colors.text,
    marginBottom: 14,
  },
  chips: {
    display: "flex",
    flexWrap: "wrap",
    gap: 6,
  },
});

export function Skills() {
  return (
    <div {...stylex.props(styles.grid)}>
      {skillGroups.map((group, index) => (
        <Reveal key={group.label} delay={(index % 3) * 60}>
          <div {...stylex.props(styles.group)}>
            <h3 {...stylex.props(styles.label)}>{group.label}</h3>
            <div {...stylex.props(styles.chips)}>
              {group.skills.map((skill) => (
                <Chip key={skill} label={skill} />
              ))}
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

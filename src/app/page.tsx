import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Section } from "@/components/Section";
import { Timeline } from "@/components/Timeline";
// import { Projects } from "@/components/Projects"; // Selected work section hidden — duplicates the Experience timeline. Re-enable the <Section id="projects"> below to restore.
import { Skills } from "@/components/Skills";
import { ContactAndFooter } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Section
          id="experience"
          kicker="Experience"
          title="Twenty-two years, two chapters"
          lede="Thirteen years building and leading product engineering in regulated gaming, then eight-plus years shipping full stack platforms end to end as an independent software engineer."
          flushTop
        >
          <Timeline />
        </Section>
        {/* Selected work section hidden for now — duplicates the Experience timeline.
        <Section
          id="projects"
          kicker="Selected work"
          title="Projects that carry real weight"
          lede="Products with revenue, regulators, clinicians, or a business's daily operations depending on them."
          flushTop
        >
          <Projects />
        </Section>
        */}
        <Section
          id="skills"
          kicker="Capabilities"
          title="Full stack means the whole stack"
          lede="Depth across the modern web plus the low-level foundation most web engineers never get."
          flushTop
        >
          <Skills />
        </Section>
      </main>
      <ContactAndFooter />
    </>
  );
}

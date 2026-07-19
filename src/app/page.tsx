import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Section } from "@/components/Section";
import { Timeline } from "@/components/Timeline";
import { Projects } from "@/components/Projects";
import { Skills } from "@/components/Skills";
import { Upwork } from "@/components/Upwork";
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
          title="Twenty-two years, three chapters"
          lede="From computer engineering fundamentals, to leading product teams in regulated gaming, to independent full stack work for clients who ship. Click any entry to expand it."
        >
          <Timeline />
        </Section>
        <Section
          id="projects"
          kicker="Selected work"
          title="Projects that carry real weight"
          lede="Products with revenue, regulators, clinicians, or a business's daily operations depending on them."
        >
          <Projects />
        </Section>
        <Section
          id="freelance"
          kicker="Independent practice"
          title="Freelance, done professionally"
          lede="Since 2017 — long-term client relationships through Upwork and private engagements."
        >
          <Upwork />
        </Section>
        <Section
          id="skills"
          kicker="Capabilities"
          title="Full stack means the whole stack"
          lede="Depth across the modern web plus the low-level foundation most web engineers never get."
        >
          <Skills />
        </Section>
      </main>
      <ContactAndFooter />
    </>
  );
}

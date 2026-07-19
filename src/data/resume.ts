/**
 * Single source of truth for all resume/portfolio content.
 *
 * Edit this file, and both the website and the downloadable PDF resume
 * update together. Nothing else needs to change.
 */

export interface Profile {
  name: string;
  title: string;
  tagline: string;
  summary: string;
  location: string;
  email: string;
  phone: string;
  github: string;
  upwork: string;
  linkedin?: string;
}

export interface Stat {
  value: string;
  label: string;
}

export interface TimelineItem {
  id: string;
  years: string;
  title: string;
  summary: string;
  bullets: string[];
  tech?: string[];
  link?: { label: string; href: string };
  projectId?: string; // links to a featured project card
}

export interface Era {
  id: string;
  period: string;
  role: string;
  org: string;
  location: string;
  blurb: string;
  items: TimelineItem[];
}

export interface Project {
  id: string;
  name: string;
  client: string;
  years: string;
  kicker: string; // short category label, e.g. "AI-native commerce"
  description: string;
  highlights: string[];
  tech: string[];
  links?: { label: string; href: string }[];
  metrics?: Stat[];
}

export interface SkillGroup {
  label: string;
  skills: string[];
}

export interface Testimonial {
  quote: string;
  author: string;
  context: string;
}

export interface UpworkStats {
  /**
   * PLACEHOLDER DATA — set to `false` once you replace the figures below
   * with the real numbers from upwork.com/freelancers/chrisvanemmerik.
   * While `true`, the site shows a subtle "sample figures" note.
   */
  isPlaceholder: boolean;
  badge: string;
  jobSuccess: string;
  totalEarnings: string;
  hoursWorked: string;
  jobsCompleted: string;
  testimonials: Testimonial[];
}

export const profile: Profile = {
  name: "Chris Van Emmerik",
  title: "Senior Full Stack Engineer",
  tagline: "Two decades shipping product — from in-circuit forensics to AI-native commerce.",
  summary:
    "I build complete products: information architecture, backend, UI, and the unglamorous " +
    "details in between. B.S. in Computer Engineering, 13 years leading software engineering in " +
    "the regulated gaming industry, and 8+ years as an independent full stack engineer shipping " +
    "React/Next.js platforms for clients ranging from a Harvard Medical School teaching hospital " +
    "to a 150,000-SKU retailer. I care about speed, craft, and software that feels obvious to use.",
  location: "Longmont, CO",
  email: "chris@greenlinkservices.com",
  phone: "720-818-0350",
  github: "https://github.com/cvanem",
  upwork: "https://www.upwork.com/freelancers/chrisvanemmerik",
};

export const heroStats: Stat[] = [
  { value: "22+", label: "years engineering" },
  { value: "150k+", label: "SKUs powered in production" },
  { value: "$1.5M+", label: "annual revenue from products built" },
  { value: "6", label: "US jurisdictions running my software" },
];

export const eras: Era[] = [
  {
    id: "freelance",
    period: "2017 — Present",
    role: "Senior Full Stack Engineer · Independent",
    org: "Greenlink Services LLC",
    location: "Longmont, CO",
    blurb:
      "Independent consultancy delivering end-to-end web platforms for private clients and via " +
      "Upwork. Sole engineer on most engagements: architecture, implementation, deployment, and " +
      "long-term ownership.",
    items: [
      {
        id: "fh-web",
        years: "2020 — Present", // TODO(chris): confirm start year
        title: "Family Hardware — E-commerce Platform",
        summary:
          "Designed, built, and maintain the full online storefront for a two-location Florida " +
          "retailer with 150,000+ SKUs.",
        bullets: [
          "Built “Ask Howard,” an AI shopping agent on the Anthropic API: hand-rolled streaming tool-use loop over SSE with 7 commerce tools (search, live inventory, shipping estimates, cart actions), prompt caching, and prompt-injection defenses.",
          "Engineered hybrid product search: Pinecone semantic vectors fused with Algolia keyword results via Reciprocal Rank Fusion, re-ranked against live MySQL stock and pricing.",
          "Full commerce stack: Stripe + PayPal checkout, subscriptions, dynamic tax, multi-warehouse ShipEngine/FedEx live rating, in-store pickup, returns with prepaid labels.",
          "Static generation at scale — pre-generated category/product pages, virtualized product grids, AVIF/WebP image pipeline.",
        ],
        tech: ["Next.js", "React 19", "TypeScript", "Anthropic API", "Pinecone", "Algolia", "Stripe", "MySQL", "Vercel"],
        link: { label: "familyhardware.com", href: "https://www.familyhardware.com" },
        projectId: "fh-web",
      },
      {
        id: "fh-admin",
        years: "2020 — Present", // TODO(chris): confirm start year
        title: "Family Hardware — POS & Business Management Platform",
        summary:
          "The internal operating system for the whole business: point of sale, inventory, " +
          "purchasing, AR, fulfillment, and reporting across two stores plus online.",
        bullets: [
          "~50 feature modules and ~86 API endpoints: registers and reconciliation, purchase orders, accounts receivable with automated finance charges, deliveries, warranty, and specialty workflows.",
          "In-person payments with Stripe Terminal, receipt printing via Star CloudPRNT plus a custom local print bridge, barcode scanning, and a queued label-printing subsystem.",
          "Real-time register/device messaging over AWS IoT Core MQTT (WebSockets, custom authorizer).",
          "AI-assisted operations: Claude-powered inventory analysis and a cron-driven daily business briefing.",
        ],
        tech: ["Next.js", "TypeScript", "MySQL", "DynamoDB", "Stripe Terminal", "AWS IoT", "Algolia", "Vercel"],
        link: { label: "admin.familyhardware.com (private)", href: "https://admin.familyhardware.com" },
        projectId: "fh-admin",
      },
      {
        id: "mind",
        years: "2019 — Present", // TODO(chris): confirm start year
        title: "MIND — mindapps.org",
        summary:
          "App-evaluation platform for the Division of Digital Psychiatry at Beth Israel " +
          "Deaconess Medical Center, a Harvard Medical School teaching hospital.",
        bullets: [
          "Created and maintain the public React platform behind MIND (M-Health Index & Navigation Database).",
          "600+ mental-health apps evaluated against 105 objective criteria from the American Psychiatric Association's evaluation framework.",
          "Used by clinicians and patients worldwide to find safe, effective mental-health apps.",
        ],
        tech: ["React", "TypeScript"],
        link: { label: "mindapps.org", href: "https://mindapps.org" },
        projectId: "mind",
      },
      {
        id: "upwork",
        years: "2017 — Present",
        title: "Upwork — Senior Full Stack Engineer",
        summary:
          "Top-rated freelance practice delivering Next.js and React builds for clients across " +
          "industries.",
        bullets: [
          "Long-running client relationships built on shipped, maintained software — not one-off gigs.",
          "Own the whole lifecycle: scoping, architecture, implementation, deployment, support.",
        ],
        tech: ["React", "Next.js", "TypeScript", "Node.js"],
        link: { label: "Upwork profile", href: "https://www.upwork.com/freelancers/chrisvanemmerik" },
      },
    ],
  },
  {
    id: "gli",
    period: "2004 — 2017",
    role: "Manager, Software Engineering",
    org: "Gaming Laboratories International",
    location: "Wheat Ridge, CO",
    blurb:
      "Thirteen years building and leading product engineering at the world's largest gaming " +
      "test lab — shipping verification tools, SaaS compliance platforms, and running a forensics " +
      "practice trusted in legal proceedings.",
    items: [
      {
        id: "verify",
        years: "2006 — 2017",
        title: "GLI Verify / Verify+",
        summary:
          "Software-authentication tool that became the most widely used verification product in " +
          "the casino industry.",
        bullets: [
          "Developed the product from the ground up in managed C#, C++, and unmanaged C++.",
          "Implemented an Ext2/Ext3 file-system driver enabling Windows to read and hash Linux partitions.",
          "Device-level signature methods for partitions, MBR, CD/DVD, and CF cards; worked directly with gaming manufacturers on proprietary hardware signature methodologies.",
          "Led the conversion from freemium tool to subscription service exceeding $500k annual revenue.",
        ],
        tech: ["C#", "C++", "Win32", "SQL Server", "SQLite"],
        projectId: "verify",
      },
      {
        id: "forensics",
        years: "2006 — 2017",
        title: "Forensic Analysis Practice",
        summary:
          "Founded and ran GLI's forensic department, investigating slot-machine malfunction " +
          "incidents worldwide.",
        bullets: [
          "Set up the department: testing methodology, procedures, and training for engineers.",
          "Used in-circuit emulation and hardware debuggers to step through live source on physical devices, tracing code paths to hardware behavior.",
          "Expert-level low-level program, memory, and communication analysis.",
          "Authored numerous forensic investigation reports and legal opinions relied on in disputes.",
        ],
        tech: ["In-circuit emulation", "Assembly", "C/C++", "Hardware debugging"],
        projectId: "forensics",
      },
      {
        id: "gat",
        years: "2008 — 2017",
        title: "GAT Image Repository",
        summary:
          "On-floor verification of live casino software via unique, on-demand seeded signature " +
          "calculations.",
        bullets: [
          "Created and established the project; adopted by 6 US regulatory jurisdictions.",
          "Generated testing revenue exceeding $1M annually.",
          "Designed the database structures, Windows calculation services, and integrations with GLI's product line.",
        ],
        tech: ["C#", ".NET", "SQL Server", "Windows Services"],
        projectId: "gat",
      },
      {
        id: "iris",
        years: "2012 — 2017",
        title: "Iris Online (GLiCloud)",
        summary:
          "SaaS inventory-tracking and regulatory-compliance platform for casinos and regulators.",
        bullets: [
          "Designed and developed the product from the ground up, then built and led the team that ran it.",
          "Customer onboarding with automated data import and mismatch-resolution UI, real-time status notifications, dynamic change-request workflows, and a regulated-shipping interface.",
        ],
        tech: [".NET", "MVC", "SQL Server", "Bootstrap", "jQuery"],
      },
      {
        id: "gi4000",
        years: "2015 — 2017",
        title: "Kobetron GI-4000 Plus",
        summary: "All-in-one embedded device for verifying gaming software and hardware.",
        bullets: [
          "Co-designed the product; implemented the communication protocol between the embedded device and its tablet front end.",
          "Integrated Verify+ hashing/verification engines with a C# WPF tablet UI; managed contract hardware and software engineers.",
        ],
        tech: ["C#", "WPF", "Embedded"],
      },
      {
        id: "scale-mobile",
        years: "2011 — 2017",
        title: "GLI Scale & GLI Mobile",
        summary:
          "Embedded load-testing platform for casino systems, and GLI's first cross-platform " +
          "mobile app.",
        bullets: [
          "GLI Scale: Raspberry Pi devices load-testing casino systems over serial, driven from a web MVC interface; led the restructure that added QCOM protocol support.",
          "GLI Mobile (2011): searchable certification database on Android, iOS, and Blackberry, backed by a .NET web API.",
        ],
        tech: ["Raspberry Pi", "C#", ".NET", "Ruby"],
      },
    ],
  },
  {
    id: "education",
    period: "2000 — 2004",
    role: "B.S. Computer Engineering",
    org: "University of Wyoming",
    location: "Laramie, WY",
    blurb:
      "Computer Engineering: where software meets hardware — the foundation for a career that " +
      "has spanned both.",
    items: [],
  },
];

export const projects: Project[] = [
  {
    id: "fh-web",
    name: "Family Hardware",
    client: "E-commerce platform · familyhardware.com",
    years: "2020 — Present",
    kicker: "AI-native commerce",
    description:
      "Complete online storefront for a two-location Florida hardware retailer — 150,000+ SKUs, " +
      "built and operated end-to-end by one engineer.",
    highlights: [
      "“Ask Howard” AI shopping agent: a hand-rolled streaming tool-use loop on the Anthropic API over Server-Sent Events, with 7 commerce tools — product search, live per-store inventory, shipping estimation, special-order quoting, and cart actions dispatched straight into Redux. Prompt caching keeps every turn fast and cheap; prompt-injection defenses keep it safe.",
      "Hybrid search built for 150k SKUs: Pinecone semantic vectors + Algolia keyword retrieval fused with Reciprocal Rank Fusion, then re-ranked against live MySQL inventory so relevance never lies about stock.",
      "Full commerce stack: Stripe Checkout + subscriptions + dynamic tax, PayPal, multi-warehouse ShipEngine/FedEx live rating with nearest-warehouse logic, in-store pickup, returns with prepaid labels, invoice PDF generation.",
      "Performance at catalog scale: pre-generated category/product pages, virtualized grids, AVIF/WebP image pipeline, tuned bundle splitting.",
    ],
    tech: ["Next.js", "React 19", "TypeScript", "Anthropic API", "Pinecone", "Algolia", "Stripe", "PayPal", "ShipEngine", "MySQL", "Clerk", "Vercel"],
    links: [{ label: "familyhardware.com", href: "https://www.familyhardware.com" }],
    metrics: [
      { value: "150k+", label: "SKUs" },
      { value: "7", label: "AI agent tools" },
      { value: "~635", label: "React components" },
    ],
  },
  {
    id: "fh-admin",
    name: "Family Hardware Admin",
    client: "POS & business management · internal",
    years: "2020 — Present",
    kicker: "Real-world operations software",
    description:
      "The internal operating system for the entire business: point of sale, inventory, " +
      "purchasing, accounts receivable, fulfillment, and reporting across two stores plus online.",
    highlights: [
      "Point of sale with Stripe Terminal card readers (live reader-display control over MQTT), cash management, register reconciliation, and gift cards.",
      "Hardware where it counts: Star CloudPRNT receipt printing plus a custom local print bridge, barcode scanners, and a queued label-printing subsystem backed by S3.",
      "Real-time device and register messaging over AWS IoT Core MQTT with WebSockets and a custom authorizer.",
      "Deep back-office coverage: ~50 feature modules and ~86 API endpoints — purchase orders, supplier shipments, AR aging with automated monthly finance charges, deliveries, warranty tracking, and mail-in sharpening workflows.",
      "AI-assisted operations: Claude-powered inventory analysis and a cron-driven daily business briefing surfacing metrics that matter.",
    ],
    tech: ["Next.js", "TypeScript", "MySQL", "DynamoDB", "Stripe Terminal", "AWS IoT MQTT", "Algolia", "ShipEngine", "S3", "Vercel"],
    links: [{ label: "admin.familyhardware.com (private)", href: "https://admin.familyhardware.com" }],
    metrics: [
      { value: "~50", label: "feature modules" },
      { value: "~86", label: "API endpoints" },
      { value: "2+1", label: "locations + web" },
    ],
  },
  {
    id: "mind",
    name: "MIND · mindapps.org",
    client: "Beth Israel Deaconess Medical Center",
    years: "2019 — Present",
    kicker: "Digital health, Harvard Medical School",
    description:
      "The M-Health Index & Navigation Database for the Division of Digital Psychiatry at Beth " +
      "Israel Deaconess Medical Center, a Harvard Medical School teaching hospital. The largest " +
      "database of evaluated mental-health apps, used by clinicians and patients worldwide.",
    highlights: [
      "Created and maintain the public React platform that clinicians use to match patients with safe, effective mental-health apps.",
      "600+ apps evaluated against 105 objective criteria based on the American Psychiatric Association's app-evaluation framework — searchable by condition, privacy posture, clinical foundation, and cost.",
      "Long-term engagement: built it, shipped it, and have kept it running and evolving ever since.",
    ],
    tech: ["React", "TypeScript"],
    links: [{ label: "mindapps.org", href: "https://mindapps.org" }],
    metrics: [
      { value: "600+", label: "apps evaluated" },
      { value: "105", label: "evaluation criteria" },
    ],
  },
  {
    id: "verify",
    name: "GLI Verify / Verify+",
    client: "Gaming Laboratories International",
    years: "2006 — 2017",
    kicker: "Industry-standard tooling",
    description:
      "Software-authentication tool for verifying casino gaming software — developed from the " +
      "ground up into the most widely used verification product in the industry.",
    highlights: [
      "Wrote an Ext2/Ext3 file-system driver so Windows could read and hash Linux partitions — the kind of problem you solve when no library exists.",
      "Device-level signature methods for partitions, MBR, CD/DVD, and CF cards; collaborated directly with gaming manufacturers on signature methodologies for proprietary hardware.",
      "Led the business-model conversion from freemium to subscription, growing it past $500k in annual revenue.",
      "Managed C# and C++ alongside unmanaged C++; migrated the codebase from MFC to .NET.",
    ],
    tech: ["C#", "C++", "Win32", "MFC → .NET", "SQL Server", "SQLite"],
    metrics: [
      { value: "#1", label: "verification tool in casino industry" },
      { value: "$500k+", label: "annual subscription revenue" },
    ],
  },
  {
    id: "forensics",
    name: "Forensic Engineering",
    client: "Gaming Laboratories International",
    years: "2006 — 2017",
    kicker: "Hardware-level investigation",
    description:
      "Founded and led GLI's forensic department, investigating slot-machine malfunction " +
      "incidents around the world — where a bug can be worth millions and the answer has to hold " +
      "up in court.",
    highlights: [
      "Built the department from nothing: methodology, procedures documentation, and engineer training.",
      "In-circuit emulation and hardware debuggers to step through source code executing on physical gaming devices, mapping functionality to hardware components.",
      "Expert-level low-level program, memory, and communication analysis.",
      "Authored numerous forensic reports and legal opinions relied on in regulatory disputes and litigation.",
    ],
    tech: ["In-circuit emulation", "Assembly", "C/C++", "Logic analysis", "Embedded hardware"],
    metrics: [
      { value: "Worldwide", label: "incident investigations" },
      { value: "Court-ready", label: "reports & legal opinions" },
    ],
  },
  {
    id: "gat",
    name: "GAT Image Repository",
    client: "Gaming Laboratories International",
    years: "2008 — 2017",
    kicker: "Zero-to-one product",
    description:
      "On-floor verification of live casino software through unique, on-demand seeded signature " +
      "calculations — created, built, and scaled into a seven-figure product line.",
    highlights: [
      "Conceived and established the project; adopted by 6 US regulatory jurisdictions.",
      "Generated testing revenue exceeding $1M annually.",
      "Designed the database structures, Windows calculation services, upload utilities, and integrations with the rest of GLI's product line.",
    ],
    tech: ["C#", ".NET", "SQL Server", "Windows Services"],
    metrics: [
      { value: "$1M+", label: "annual testing revenue" },
      { value: "6", label: "US jurisdictions" },
    ],
  },
];

export const skillGroups: SkillGroup[] = [
  {
    label: "Frontend",
    skills: ["React", "Next.js", "TypeScript", "MobX", "Redux", "StyleX", "Material UI", "InstantSearch", "PWA / offline-first"],
  },
  {
    label: "Backend & Data",
    skills: ["Node.js", "C# / .NET", "C / C++", "MySQL", "PostgreSQL", "SQL Server", "DynamoDB", "REST APIs", "Serverless"],
  },
  {
    label: "AI Engineering",
    skills: ["Anthropic API", "Streaming tool-use agents", "Prompt caching", "Pinecone / vector search", "Hybrid retrieval (RRF)", "Embeddings"],
  },
  {
    label: "Cloud & Infra",
    skills: ["Vercel", "AWS (S3, IoT Core, DynamoDB, Cognito)", "Docker", "CI/CD", "Cron / background jobs", "Observability"],
  },
  {
    label: "Commerce & Integrations",
    skills: ["Stripe + Stripe Terminal", "PayPal", "Algolia", "ShipEngine / FedEx", "Clerk", "Twilio-class messaging", "Webhooks"],
  },
  {
    label: "Hardware & Low-level",
    skills: ["Embedded systems", "In-circuit emulation", "Receipt printers / scanners", "File-system internals", "Serial protocols", "Raspberry Pi"],
  },
];

export const upworkStats: UpworkStats = {
  // PLACEHOLDER — replace with real figures from your Upwork profile, then set false.
  isPlaceholder: true,
  badge: "Top Rated",
  jobSuccess: "100%",
  totalEarnings: "$300k+",
  hoursWorked: "3,000+",
  jobsCompleted: "25+",
  testimonials: [
    {
      quote:
        "PLACEHOLDER — paste a real client testimonial from your Upwork work history here.",
      author: "Client name",
      context: "Project name · Upwork",
    },
    {
      quote:
        "PLACEHOLDER — paste a second real client testimonial from your Upwork work history here.",
      author: "Client name",
      context: "Project name · Upwork",
    },
  ],
};

/** Education shown in the PDF resume. */
export const education = {
  school: "University of Wyoming",
  degree: "B.S. Computer Engineering",
  years: "2000 — 2004",
  location: "Laramie, WY",
};

/** Extra training shown in the PDF resume. */
export const training = [
  "2013 · Graduate of The Complete Leader Program — Makarios Consulting, LLC",
];

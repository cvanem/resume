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
  /** Emphasized value-proposition lead line. */
  summaryLead: string;
  /** Secondary detail, shown de-emphasized after the lead. */
  summaryDetail: string;
  location: string;
  email: string;
  phone: string;
  github: string;
  upwork: string;
  website: string;
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
  note?: string; // non-clickable label, e.g. for private/internal tools
  image?: { src: string; alt: string }; // optional single screenshot shown in the expanded detail
  images?: { src: string; alt: string }[]; // optional screenshot gallery, rendered as a carousel
  projectId?: string; // links to a featured project card
}

export interface Era {
  id: string;
  period: string;
  role: string;
  org: string;
  location: string;
  /** Short employment-type badge, e.g. "Independent · Contract" or "Full-time". */
  employmentType?: string;
  /** One paragraph, or an array rendered as separate paragraphs. */
  blurb: string | string[];
  /** Optional heading above the items list, e.g. "Noteworthy Projects". */
  itemsLabel?: string;
  /** Optional caption under itemsLabel, e.g. to note the list is a selection. */
  itemsCaption?: string;
  items: TimelineItem[];
}

export interface Project {
  id: string;
  name: string;
  client: string;
  years: string;
  kicker: string; // short category label, e.g. "Commerce at scale"
  description: string;
  highlights: string[];
  tech: string[];
  links?: { label: string; href: string }[];
  note?: string; // non-clickable label, e.g. for private/internal tools
  image?: { src: string; alt: string }; // optional screenshot
  images?: { src: string; alt: string }[]; // optional screenshot gallery, rendered as a carousel
  metrics?: Stat[];
}

export interface SkillGroup {
  label: string;
  skills: string[];
}

export const profile: Profile = {
  name: "Chris Van Emmerik",
  title: "Senior Full Stack Engineer",
  tagline: "Two decades shipping product — from in-circuit forensics to real-time, AI-forward web platforms.",
  summaryLead:
    "I build complete products — information architecture, backend, UI, and the unglamorous " +
    "details in between.",
  summaryDetail:
    "Backed by a B.S. in Computer Engineering. I build AI-forward and lean on AI-assisted tooling " +
    "across my workflow, and I care about speed, craft, and software that feels obvious to use.",
  location: "Longmont, CO • Lead, SD",
  email: "chris@greenlinkservices.com",
  phone: "720-818-0350",
  github: "https://github.com/cvanem",
  upwork: "https://www.upwork.com/freelancers/chrisvanemmerik",
  website: "https://www.greenlinkservices.com",
};

/** Greenlink product screenshots, shared by the timeline item and project card. */
const greenlinkShots = [
  {
    src: "/screenshots/greenlink/register.webp",
    alt: "Point-of-sale register — scan-to-add live cart, category-filtered inventory, and an age/ID-verified customer.",
  },
  {
    src: "/screenshots/greenlink/receipt.webp",
    alt: "Completed sale with an itemized Colorado cannabis tax breakdown — city, county, state recreational, and cannabis excise — plus tender and change.",
  },
  {
    src: "/screenshots/greenlink/inventory.webp",
    alt: "Multi-location inventory with METRC package IDs, category filters, and live per-store quantities.",
  },
  {
    src: "/screenshots/greenlink/products.webp",
    alt: "Product catalog management across suppliers, strains, categories, and compliance types.",
  },
  {
    src: "/screenshots/greenlink/devices.webp",
    alt: "Device management — registers, cash drawers, and check-in stations configured per retail location.",
  },
  {
    src: "/screenshots/greenlink/device-edit.webp",
    alt: "Per-device configuration: device type, location, access mode, and authorized users.",
  },
  {
    src: "/screenshots/greenlink/architecture.webp",
    alt: "Offline-first Redux architecture in Redux DevTools — background DATABASE_SEND/RECEIVE_TRANSACTIONS sync alongside SignalR, Firebase, scanner, and printer state slices.",
  },
];

export const eras: Era[] = [
  {
    id: "freelance",
    period: "2017 — Present",
    role: "Owner & Full Stack Software Engineer",
    org: "Greenlink Services LLC · Development and Consultancy",
    location: "Longmont, CO • Lead, SD",
    employmentType: "Independent · Contract",
    blurb: [
      "As the sole engineer, I take client engagements end to end — architecture, implementation, " +
        "deployment, and years of ongoing operation. AI-assisted tooling runs throughout my " +
        "workflow — rapid prototyping, code review, testing — so more time goes to the architecture " +
        "and UX decisions that matter.",
      "I work with clients through direct contract or via Upwork, where I've earned $300k+ across " +
        "3,800+ hours logged for 30+ clients with a 100% job success score.",
    ],
    itemsLabel: "Noteworthy Projects",
    itemsCaption: "A selection of the work I'm most proud of.",
    items: [
      {
        id: "receiptkit",
        years: "2025 — Present",
        title: "ReceiptKit — Cloud-to-Thermal Printing Platform",
        summary:
          "Co-founder and sole engineer of receiptkit.io, a commercial SaaS product — “receipt " +
          "printing in 3 lines of code.” Design a receipt in a visual editor, then print to physical " +
          "thermal printers from any web or cloud app — via a simple JSON API or directly over MQTT. " +
          "I architected and built " +
          "the entire solution: a cloud web portal paired with a local “receipt bridge” — a Tauri " +
          "desktop app or a dedicated Raspberry Pi device — that runs on the store's network and drives " +
          "the printers.",
        bullets: [
          "The problem: browsers and cloud servers can't reach thermal printers, which speak proprietary binary protocols over raw TCP/USB on the local network — and Star's own cloud paths (CloudPRNT polling, MQTT) can't print image receipts fast enough.",
          "Built the missing edge “bridge” that caches templates, renders locally, and pushes print data straight to the printer over USB/Ethernet — ~40ms locally, ~97ms over the cloud.",
          "Designed a “pseudo-SVG” template format for speed: an SVG template plus dynamic JSON transforms to an SVG image, then to printer binary. Both hops are extremely fast — the quickest render path I found for image-based receipts, not just text.",
          "Cut render latency ~50x (600ms to 12ms) with a custom ttf-parser text-to-path pre-processor that eliminates the rasterizer's system-font resolution — verified byte-identical output before shipping.",
          "Real-time status, presence, and job dispatch over AWS IoT MQTT — chosen as a lightweight pub/sub transport that scales to large device fleets cost-effectively; per-org-scoped policies, plus deliberate offline-first failover to a LAN HTTP bridge so the register keeps printing when the internet drops.",
          "Shipped the public developer SDK — the receiptkit npm package — with two transports: a one-line fire-and-forget HTTP call for simple integrations, or direct MQTT pub/sub for real-time work (low-latency printing, live printer and bridge status, device discovery, and presence), plus React hooks and a synchronous status cache so UIs read live device state without async round-trips.",
          "Designed and built the entire customer dashboard end to end: a live overview (bridges online, prints today with day-over-day trends, average print latency), a real-time print-jobs feed, and per-device pages showing live printer hardware status straight off MQTT — plus template, API-key, billing, and team management.",
          "Built remote over-the-air bridge updates with automatic rollback: an admin picks any target version from the dashboard, the desktop (Tauri) bridge applies a signature-verified installer while streaming live download progress back over MQTT, and the Raspberry Pi bridge does an atomic install-directory swap gated by a post-restart health check that auto-reverts to the prior version if the new build fails to come up.",
          "Built a remote-view feature that mirrors a bridge's live UI into any browser over MQTT: a short-lived org-scoped session token connects to AWS IoT, the bridge streams chunked state snapshots every few seconds, and the page renders the exact same shared React components as the native desktop app or Raspberry Pi device — so support can watch printers, the queue, logs, and history in real time and even invoke commands remotely, identical to standing in front of the device.",
          "Built the visual editor — a drag-and-drop SVG template designer with dynamic, data-bound elements and fields that render live against real order data.",
          "Three AI authoring paths with Claude: generate a template from a text prompt, refine an existing one through incremental AI edits, or photograph a paper receipt and get an editable template back via vision — all SSE-streamed.",
        ],
        tech: ["Next.js 16", "React 19", "TypeScript", "Rust", "Tauri", "AWS IoT MQTT", "Supabase", "Stripe", "Anthropic API", "Vercel"],
        link: { label: "receiptkit.io", href: "https://receiptkit.io" },
        projectId: "receiptkit",
      },
      {
        id: "fh-web",
        years: "2020 — Present", // TODO(chris): confirm start year
        title: "Family Hardware — E-commerce Platform",
        summary:
          "Designed, built, and maintain the full online storefront for a two-location Florida " +
          "retailer with 150,000+ SKUs.",
        bullets: [
          "Full commerce stack: Stripe + PayPal checkout, subscriptions, dynamic tax, multi-warehouse ShipEngine/FedEx live rating, in-store pickup, returns with prepaid labels, and customer accounts with order history, tracking, and authentication.",
          "Faceted catalog search across 150,000+ SKUs with Algolia InstantSearch, surfacing live per-store inventory and pricing from MySQL.",
          "Built the analytics layer end to end — instrumented the full e-commerce funnel from add-to-cart through purchase and conversion across GA4, Google Ads, Bing UET, Facebook Pixel, and Algolia, with enhanced conversions and per-item category dimensions.",
          "Operational monitoring and alerting on Axiom server logs — a standardized error-handling layer across the API routes emails the team the instant a checkout, payment, or fulfillment error fires, with request-ID correlation for fast triage.",
          "Selective LogRocket session replay on the checkout and order-confirmation screens, with client-side errors and analytics failures bridged back to server logs to diagnose browser-side incidents end to end.",
        ],
        tech: ["Next.js", "React 19", "TypeScript", "Algolia", "Stripe", "PayPal", "MySQL", "Vercel"],
        link: { label: "familyhardware.com", href: "https://www.familyhardware.com" },
        projectId: "fh-web",
      },
      {
        id: "fh-admin",
        years: "2020 — Present", // TODO(chris): confirm start year
        title: "Family Hardware — POS & Business Management Platform",
        summary:
          "Architected and built the software that runs the whole business day to day — point of " +
          "sale, accounts receivable, inventory, purchasing, fulfillment, and reporting across two " +
          "stores plus online — unifying the owner's existing databases and third-party " +
          "services behind one interface.",
        bullets: [
          "The point-of-sale register — the highest-stakes screen in the business: a live cart driven by scan-to-add SKU input with fast item find, line-item discounts and price adjustments. Checkout via cash, credit-card, customer invoice, gift card, and split tender payments, along with receipt integration, refunds, and return processing — all reconciled through Stripe and the owner's backend databases.",
          "Designed the discount engine from scratch: cart and line item discounts across percent, fixed, and preset amounts, per-customer tier pricing (percent-off-retail or cost-plus margin), and SKU-targeted coupon codes with use limits, expiries, and product-level non-discountable flags.",
          "Full refund workflows across credit card and cash, including partial returns and split tenders, with per-line-item tracking that caps refundable quantities and prevents over-refunding before anything reaches Stripe.",
          "In-person payments via Stripe Terminal, receipt printing over Star CloudPRNT plus a custom local print bridge, and real-time register/device messaging over AWS IoT MQTT.",
          "Accounts receivable, end to end: on-account invoicing, customer credits from returns and overpayments, automated monthly finance charges, an accounts-aging dashboard, and statements sent by email or physical mail — with AI-drafted collection emails.",
          "Deep back-office breadth: product and inventory management with duplicate guards and inventory-health advisories, Algolia search, multi-carrier fulfillment via ShipEngine across pickup, delivery, and online orders, purchase orders and suppliers, plus warranty and mail-in tool-sharpening workflows.",
        ],
        tech: ["Next.js", "TypeScript", "MySQL", "DynamoDB", "Stripe Terminal", "AWS IoT", "Algolia", "ShipEngine", "Vercel"],
        note: "Private / internal tool",
        image: { src: "/screenshots/fh-pos.png", alt: "Family Hardware point-of-sale register — live cart, category browser, and tender panel" },
        projectId: "fh-admin",
      },
      {
        id: "mind",
        years: "2019 — Present", // TODO(chris): confirm start year
        title: "MIND — Mobile Health Index and Navigation Database",
        summary:
          "App-evaluation platform for the Division of Digital Psychiatry at Beth Israel " +
          "Deaconess Medical Center, a Harvard Medical School teaching hospital.",
        bullets: [
          "Created and maintain the public React platform behind MIND — used by clinicians and patients worldwide to find safe, effective mental-health apps.",
          "600+ mental-health apps evaluated against 105 objective criteria from the American Psychiatric Association's evaluation framework.",
          "Built the data pipeline behind the ratings: a serverless CORS proxy (AWS Lambda) wraps the Apple App Store and Google Play scrapers — normalizing and whitelisting fields and adding CORS headers so the browser app pulls live store metadata (icons, screenshots, install counts, in-app-purchase and pricing flags) directly, in multiple languages — then merges it with human rater reviews and runs it through an approval workflow that governs how ratings are published and kept current.",
          "Designed the DynamoDB data architecture behind the ratings: an append-only, versioned store where every rating is an immutable record — linked to its app by a groupId and to the revision it came from by a parent pointer — so one app accrues many ratings over time, each moving through a draft-then-approved workflow with the full history preserved. The public sees only the newest approved rating per app (resolved by grouping on groupId and taking the most recent approved record); raters and admins work against the whole chain.",
          "Built a virtualized app catalog that stays fast at scale — a windowed list (react-virtualized) with dynamic row measurement renders only the visible rows, so faceted filtering and fuzzy search across the full 600+ app catalog stay smooth and instant.",
          "Built an automated survey reminder system on AWS Lambda and SES: a scheduled job scans the survey tables, determines when each participant's next follow-up is due (Initial, then 2-week, then 6-week), and emails a deep-linked survey — recording what's been sent so no one is emailed twice or after they've already responded.",
          "Implemented as an installable PWA with usage logged to a dedicated DynamoDB tracking table, giving the team real-world engagement analytics.",
        ],
        tech: ["React", "TypeScript", "DynamoDB", "AWS Lambda", "Web scraping"],
        link: { label: "mindapps.org", href: "https://mindapps.org" },
        projectId: "mind",
      },
      {
        id: "greenlink",
        years: "2017 — 2019",
        title: "Greenlink — Cannabis POS, Inventory & Compliance Platform",
        summary:
          "Co-founder and architect of a hybrid, offline-first point-of-sale, inventory, and " +
          "compliance platform for the regulated cannabis industry — one React codebase shared " +
          "across web and native mobile.",
        bullets: [
          "Co-founded the product and designed the cloud architecture from the ground up: a single React/Redux codebase that ships as an offline-first PWA and, through Cordova, as native iOS and Android apps — one source base across web and mobile.",
          "Built the point-of-sale register end to end — a scan-to-add live cart, an age/ID-verified customer queue, cash and card tenders, and Colorado cannabis tax computation (city, county, state recreational, and cannabis excise) itemized to the cent on every receipt.",
          "Architected offline-first data sync: a background transaction queue reconciles local state with the server so registers keep selling through network drops, with SignalR pushing live updates across devices the moment connectivity returns.",
          "Integrated METRC — Colorado's state seed-to-sale compliance system — for package tracking and regulated reporting across multiple retail locations.",
          "Direct integration with native peripherals, including Star Micronics printers and Socket Mobile scanners.",          "Owned deployment and scale — Dockerized .NET Core services with PostgreSQL, plus the release process and scaling plan.",
        ],
        tech: ["React", "Redux", "Material UI", "SignalR", ".NET Core", "PostgreSQL", "Docker", "Cordova", "PWA / offline-first"],
        note: "Site no longer active",
        images: greenlinkShots,
        projectId: "greenlink",
      },
    ],
  },
  {
    id: "gli",
    period: "2004 — 2017",
    role: "Manager, Software Engineering",
    org: "Gaming Laboratories International",
    location: "Wheat Ridge, CO",
    employmentType: "Full-time",
    blurb:
      "Thirteen years building and leading product engineering at the world's largest gaming " +
      "test lab — shipping verification tools, compliance platforms, and performing numerous " +
      "forensic investigations.",
    items: [
      {
        id: "verify",
        years: "2006 — 2017",
        title: "Verify+ (formerly GLI Verify)",
        summary:
          "Software-authentication tool that became the most widely used verification product in " +
          "the casino industry — safeguarding the integrity of a multi-billion-dollar global gaming market.",
        bullets: [
          "Developed the product from the ground up in managed C#, C++, and unmanaged C++.",
          "Implemented an Ext2/Ext3 file-system driver enabling Windows to read and hash Linux files and directories on Linux partitions.",
          "Device-level signature methods for partitions, MBR, CD/DVD, and CF cards; worked directly with gaming manufacturers on proprietary hardware signature methodologies.",
          "Built client-level snapshot replication: logged-in clients pull a local snapshot of their approval database from the central system, so every signature they compute is matched against it automatically — instantly identifying the exact game or software build and its regulatory approval status.",
          "Led the conversion from freemium tool to subscription service exceeding $500k annual revenue.",
        ],
        tech: ["C#", "C++", "Win32", "SQL Server", "SQLite"],
        link: { label: "store.kobetron.com", href: "https://store.kobetron.com/collections/frontpage/products/monthly-subscription" },
        projectId: "verify",
      },
      {
        id: "forensics",
        years: "2006 — 2017",
        title: "Forensic Analysis",
        summary:
          "Primary forensic investigator for slot-machine malfunction incidents worldwide — " +
          "the go-to engineer for the hardest cases.",
        bullets: [
          "Performed 60+ forensic investigations, authoring the technical legal reports and expert opinions that documented the findings.",
          "Extracted and dumped RAM from physical gaming devices, then analyzed memory and source code to pinpoint bugs and points of failure.",
          "Reproduced reported malfunctions on live hardware, documenting each step of the analysis as it happened.",
          "Used in-circuit emulation and hardware debuggers to step through live source on physical devices, tracing code paths to hardware behavior.",
          "Partnered with compliance and engineering management to build out the practice's testing methodology and procedures.",
        ],
        tech: ["In-circuit emulation", "RAM extraction", "Deep source-code analysis", "Assembly", "C/C++", "Hardware debugging"],
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
          "Created and established the project; adopted by 6 US regulatory jurisdictions at the time, and now supported by virtually all gaming manufacturers.",
          "Generated testing revenue exceeding $1M annually.",
          "Designed the database structures, Windows calculation services, and integrations with GLI's product line.",
        ],
        tech: ["C#", ".NET", "SQL Server", "Windows Services"],
        projectId: "gat",
      },
      {
        id: "iris",
        years: "2012 — 2017",
        title: "Iris Online (formerly GLiCloud)",
        summary:
          "Inventory-tracking and regulatory-compliance platform for casinos and regulators.",
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
        link: { label: "store.kobetron.com", href: "https://store.kobetron.com/collections/frontpage/products/gi-4000-pro-bundle-deal" },
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
    id: "receiptkit",
    name: "ReceiptKit",
    client: "Co-founder / Software Architect · receiptkit.io",
    years: "2025 — Present",
    kicker: "SaaS · Real-time printing infrastructure",
    description:
      "Receipt printing in 3 lines of code. A commercial SaaS cloud-to-thermal-printer platform: " +
      "design a receipt in a visual editor, then print to physical Star Micronics printers from any " +
      "web or cloud app via a JSON API — or directly over MQTT. I co-founded it and architected and built the entire " +
      "solution — web app, SDK, real-time transport, desktop and Raspberry Pi bridges, and the Rust " +
      "rendering engine.",
    highlights: [
      "The core problem: browsers and cloud servers can't talk to thermal printers, which speak proprietary binary protocols over raw TCP/USB on the local network. ReceiptKit is the bridge — a visual template editor and a session.print({ data }) SDK on top, hiding all the rendering, binary-protocol, real-time-transport, and printer-status complexity underneath.",
      "A visual, drag-and-drop SVG template editor: dynamic, data-bound elements and fields that render live against real order data — so anyone can design a receipt and developers just pass the JSON.",
      "The speed comes from a “pseudo-SVG” template format I designed: an SVG template plus positioned elements and dynamic JSON that transforms into a flat SVG image, then into printer binary. I chose it because both hops are cheap — template-to-SVG is a near-instant transform, and SVG → 1-bit raster → Star binary is tight bitmap work — making it the fastest end-to-end path I found for image-based receipts (logos, barcodes, QR), not just text.",
      "Cut render latency ~50x (600ms → 12ms median). Profiling showed the rasterizer spent ~85% of its time loading ~360 system fonts and resolving text, so I wrote a standalone Rust text-to-path pre-processor (ttf-parser only, zero rasterizer dependency) that outlines every glyph — kerning, baselines, text-anchor — letting the rasterizer skip font resolution entirely. Verified byte-identical output before shipping, so a pure speed win carried zero quality risk.",
      "Implemented the Star Micronics binary protocol from scratch in Rust: Star Graphics Mode raster headers with little-endian packing, RGBA→luma→1-bit conversion via hard-threshold or Floyd–Steinberg dithering, MSB-first bit packing, and cash-drawer kick commands.",
      "Print delivery has to be local, and I proved why empirically: Star printers only print image-based receipts fast when data is pushed directly to them. Their own network paths couldn't keep up — CloudPRNT polls on a ~5s interval, and even Star's MQTT print path choked on image receipts (the hardware prints text-only receipts fast, images slowly). So the architecture offloads rendering and template caching to the edge bridge: templates cache locally, the transform runs on the bridge, only the small dynamic JSON payload crosses the network, and the bridge sends the finished job straight to the printer over USB/Ethernet — the design that keeps end-to-end print times under ~100ms.",
      "Solved a subtle systems problem: Star printers share one TCP port (9100) for both print data and status queries, so polling from multiple dashboard tabs delayed print jobs by 2–3s. Layered fixes — a status cache with TTL, post-print suppression to keep the port clear during the printer's mechanical phase, detached async tasks, and parallelized queries — brought latency back under control.",
      "Real-time transport over AWS IoT MQTT — chosen for its lightweight pub/sub model, which scales to large fleets of always-connected devices far more cost-effectively than persistent WebSocket servers or HTTP polling. A custom Lambda authorizer enforces per-org topic policies, and retained Last-Will messages track bridge presence. MQTT-primary with mDNS-discovered LAN-HTTP failover — a deliberate “fallback-first” design so a store keeps printing and opening its cash drawer when the internet drops.",
      "Shipped the public developer SDK — the receiptkit npm package, with modular entry points (receiptkit/http, receiptkit/mqtt, receiptkit/react, receiptkit/server). Developers print with a one-line fire-and-forget HTTP call → or drop down to direct MQTT pub/sub for real-time features: low-latency printing, live printer/bridge status, device discovery, presence, and a synchronous status cache — surfaced as React hooks (useReceiptKit, useBridgeStatus, useBridgeDiscover).",
      "Kept one canonical TypeScript SVG generator byte-identical across three runtimes — the browser, an embedded QuickJS engine inside the Rust bridge, and a native Rust reimplementation (~10x faster) — trading a custom esbuild pipeline for a single source of truth instead of divergent copies.",
      "Designed and built the entire customer dashboard end to end: a live overview (bridges online, prints today with day-over-day trends, average print latency across the last 7 days), a real-time print-jobs feed, per-device pages that show live printer hardware status (paper, cover, errors) straight off MQTT, plus template, API-key, billing, and team management.",
      "Remote over-the-air bridge updates with automatic rollback and remote downgrade: an admin picks any target version from the dashboard → the desktop (Tauri) bridge pulls a signature-verified installer and streams live download progress back over MQTT, while the Raspberry Pi bridge does an atomic install-directory swap gated by a post-restart HTTP health check that auto-reverts to the previous version if the new build doesn't come up. Because any version is a valid target, rolling a fleet back after a bad release is a one-click remote action — no site visit, no SSH.",
      "A remote-view feature that mirrors a bridge's live UI into any browser over MQTT: a short-lived, org-scoped session token connects to AWS IoT, the bridge publishes chunked state snapshots (core / logs / history) every few seconds, and the page renders the exact same shared React components as the native desktop app or Raspberry Pi device — so support can watch printers, the queue, logs, and history in real time and even invoke commands (request/response correlated over MQTT), identical to standing in front of the device.",
      "AI template authoring with Claude, three ways: generate a template from a natural-language prompt, refine an existing template through incremental AI edits (targeted, diff-style changes rather than full regeneration), and a vision mode — photograph a paper receipt and get back an editable template. All SSE-streamed, with JSON repair, retry/backoff, and an automatic font-audit pass.",
    ],
    tech: ["Next.js 16", "React 19", "TypeScript", "Rust", "Tauri 2", "AWS IoT MQTT", "Supabase", "Stripe", "Anthropic API", "Vercel"],
    links: [{ label: "receiptkit.io", href: "https://receiptkit.io" }],
    metrics: [
      { value: "~50x", label: "faster render (600→12ms)" },
      { value: "<100ms", label: "cloud-to-print" },
      { value: "TS + Rust", label: "monorepo, solo-built" },
    ],
  },
  {
    id: "fh-web",
    name: "Family Hardware",
    client: "E-commerce platform · familyhardware.com",
    years: "2020 — Present",
    kicker: "Commerce at scale",
    description:
      "Complete online storefront for a two-location Florida hardware retailer — 150,000+ SKUs, " +
      "built and operated end-to-end by one engineer.",
    highlights: [
      "Faceted catalog search across 150,000+ SKUs with Algolia InstantSearch, surfacing live per-store inventory and pricing from MySQL so results never misrepresent availability.",
      "Full commerce stack: Stripe Checkout + subscriptions + dynamic tax, PayPal, multi-warehouse ShipEngine/FedEx live rating with nearest-warehouse logic, in-store pickup, returns with prepaid labels, invoice PDF generation.",
      "Performance at catalog scale: pre-generated category/product pages, virtualized grids, AVIF/WebP image pipeline, tuned bundle splitting.",
      "Customer accounts, order history and tracking, and authentication.",
    ],
    tech: ["Next.js", "React 19", "TypeScript", "Algolia", "Stripe", "PayPal", "ShipEngine", "MySQL", "Vercel"],
    links: [{ label: "familyhardware.com", href: "https://www.familyhardware.com" }],
    metrics: [
      { value: "150k+", label: "SKUs" },
      { value: "2+1", label: "stores + online" },
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
      "The custom software that runs the entire business day to day: point of sale, inventory, " +
      "purchasing, accounts receivable, fulfillment, and reporting across two stores plus online — " +
      "tying the owner's existing data together with third-party integrations behind a " +
      "single interface.",
    highlights: [
      "The point-of-sale register — the highest-stakes screen in the business: a live cart driven by a scan-to-add SKU input, with fast item find.",
      "Cart engine handling line-item discounts, price adjustments, and return processing, with checkout flows for cash, credit-card, and on-account invoice tenders — all reconciled through Stripe and the owner's backend databases.",
      "A from-scratch discount engine: stacking rules, item- and order-level promotions, and the edge cases that have to stay correct to the cent.",
      "Full refund workflows across credit card and cash — partial returns and split tenders — with per-line-item return tracking that caps refundable quantities and blocks over-refunding before anything reaches Stripe.",
      "In-person payments with Stripe Terminal (live reader-display control over MQTT), Star CloudPRNT receipt printing plus a custom local print bridge, barcode scanners, and a queued label-printing subsystem, all over real-time AWS IoT MQTT.",
      "Accounts receivable, end to end: on-account invoicing, customer credits from returns and overpayments, automated monthly finance charges, an accounts-aging dashboard (current / 30 / 60 / 90+ buckets), and statements delivered by email or physical mail — plus AI-drafted, relationship-aware collection emails.",
      "Catalog and inventory management: product create/edit with SKU/UPC/GTIN/MPN duplicate guards, unit-of-measure-aware margin pricing, Algolia-powered product and customer search, and inventory-health tooling — confidence scoring, negative-margin and reorder-point advisories, and critical/excess/negative-stock reports.",
      "Omnichannel fulfillment and purchasing: in-store, pickup, delivery, and online orders; ShipEngine multi-carrier rate shopping, label creation, and address validation with auto-detected FedEx/UPS/USPS tracking; purchase orders and supplier management; plus warranty tracking and mail-in tool-sharpening workflows.",
      "Register operations and reporting: end-of-day register totals, reconciliation, and bank deposits; gift cards and coupon/promotion codes; and dashboards with YTD, monthly, and category-level charts.",
    ],
    tech: ["Next.js", "TypeScript", "MySQL", "DynamoDB", "Stripe Terminal", "AWS IoT MQTT", "Algolia", "ShipEngine", "PostGrid", "Anthropic API", "S3", "Vercel"],
    note: "Private / internal tool",
    image: { src: "/screenshots/fh-pos.png", alt: "Family Hardware point-of-sale register — live cart, category browser, and tender panel" },
    metrics: [
      { value: "Cash · Card · Invoice", label: "tender workflows" },
      { value: "2+1", label: "locations + web" },
    ],
  },
  {
    id: "mind",
    name: "MIND — Mobile Health Index and Navigation Database",
    client: "Beth Israel Deaconess Medical Center",
    years: "2019 — Present",
    kicker: "Digital health, Harvard Medical School",
    description:
      "The Mobile Health Index and Navigation Database for the Division of Digital Psychiatry at Beth " +
      "Israel Deaconess Medical Center, a Harvard Medical School teaching hospital. The largest " +
      "database of evaluated mental-health apps, used by clinicians and patients worldwide.",
    highlights: [
      "Created and maintain the public React platform that clinicians use to match patients with safe, effective mental-health apps.",
      "600+ apps evaluated against 105 objective criteria based on the American Psychiatric Association's app-evaluation framework — searchable by condition, privacy posture, clinical foundation, and cost.",
      "Automated data pipeline behind the ratings: a serverless CORS proxy (AWS Lambda) wraps the Apple App Store and Google Play scrapers — normalizing/whitelisting fields and injecting CORS headers so the browser SPA pulls live store metadata (icons, screenshots, installs, IAP and pricing flags) directly, across languages — then combines it with human rater reviews and gates every change through an approval workflow that controls how ratings are added and maintained on the site.",
      "Designed the DynamoDB data architecture behind the ratings: an append-only, versioned store where every rating is an immutable record — linked to its app by a groupId and to the revision it was derived from by a parent pointer. One app can carry many ratings over time, each moving through a draft → approved workflow; nothing is ever overwritten or deleted, so the complete rating history is preserved. The public sees only the most-recently-approved rating per app (resolved by grouping on groupId and taking the newest approved record), while raters and admins work against the whole chain.",
      "Virtualized app catalog for speed: a windowed list and grid (react-virtualized + react-virtuoso) with dynamic row measurement render only what's on screen, keeping faceted filtering and fuzzy search across the full 600+ app catalog smooth and instant.",
      "Automated survey reminders on AWS Lambda + SES: a scheduled job scans the survey tables, works out when each participant's next follow-up is due (Initial → 2-week → 6-week), and emails a deep-linked survey — tracking what's been sent so no one is emailed twice or after they've already responded.",
      "Installable PWA with usage logged to a dedicated DynamoDB tracking table for real-world engagement analytics.",
      "Long-term engagement: built it, shipped it, and have kept it running and evolving ever since.",
    ],
    tech: ["React", "TypeScript", "DynamoDB", "AWS Lambda", "Web scraping"],
    links: [{ label: "mindapps.org", href: "https://mindapps.org" }],
    metrics: [
      { value: "600+", label: "apps evaluated" },
      { value: "105", label: "evaluation criteria" },
    ],
  },
  {
    id: "greenlink",
    name: "Greenlink",
    client: "Co-founder / Architect · Cannabis POS & compliance",
    years: "2017 — 2019",
    kicker: "Regulated-industry POS",
    description:
      "A hybrid, offline-first point-of-sale, inventory, and compliance platform for the regulated " +
      "cannabis industry. I co-founded it and designed the cloud architecture from the ground up — " +
      "a single React codebase shared across an offline-first web app and native iOS and Android.",
    highlights: [
      "One React/Redux codebase, three targets: an offline-first PWA on the web and native iOS/Android through Cordova — sharing a single source base so features shipped everywhere at once.",
      "Point-of-sale register built end to end: scan-to-add live cart, age/ID-verified customer queue, cash and card tenders, and Colorado cannabis tax (city, county, state recreational, and cannabis excise) computed to the cent on every receipt.",
      "Offline-first by design — a background transaction queue reconciles local and server state so registers keep selling through network drops, with SignalR pushing live cross-device updates the moment connectivity returns.",
      "METRC integration for Colorado's state seed-to-sale compliance: package tracking and regulated reporting across multiple retail locations.",
      "Direct integration with native peripherals, including Star Micronics printers and Socket Mobile scanners.",      "Owned deployment and scalability — Dockerized .NET Core services with PostgreSQL, plus the release process and scaling plan.",
    ],
    tech: ["React", "Redux", "Material UI", "SignalR", ".NET Core", "PostgreSQL", "Docker", "Cordova", "PWA / offline-first"],
    note: "Site no longer active",
    images: greenlinkShots,
    metrics: [
      { value: "Web + Native", label: "one shared React codebase" },
      { value: "Offline-first", label: "background sync + live updates" },
      { value: "METRC", label: "state compliance built in" },
    ],
  },
  {
    id: "verify",
    name: "Verify+ (formerly GLI Verify)",
    client: "Gaming Laboratories International",
    years: "2006 — 2017",
    kicker: "Industry-standard tooling",
    description:
      "Software-authentication tool for verifying casino gaming software — developed from the " +
      "ground up into the most widely used verification product in the industry, responsible for " +
      "maintaining the integrity of a multi-billion-dollar global gaming industry.",
    highlights: [
      "Wrote an Ext2/Ext3 file-system driver so Windows could read and hash Linux files and directories on Linux partitions — the kind of problem you solve when no library exists.",
      "Device-level signature methods for partitions, MBR, CD/DVD, and CF cards; collaborated directly with gaming manufacturers on signature methodologies for proprietary hardware.",
      "Built client-level snapshot replication: logged-in clients pull a local snapshot of their approval database from our central system, so every signature they compute is matched against it automatically — instantly resolving the exact game or software build and its regulatory approval status.",
      "Led the business-model conversion from freemium to subscription, growing it past $500k in annual revenue.",
      "Managed C# and C++ alongside unmanaged C++; migrated the codebase from MFC to .NET.",
    ],
    tech: ["C#", "C++", "Win32", "MFC → .NET", "SQL Server", "SQLite"],
    links: [{ label: "store.kobetron.com", href: "https://store.kobetron.com/collections/frontpage/products/monthly-subscription" }],
    metrics: [
      { value: "#1", label: "verification tool in casino industry" },
      { value: "$500k+", label: "annual subscription revenue" },
      { value: "Multi-$B", label: "industry integrity safeguarded" },
    ],
  },
  {
    id: "forensics",
    name: "Forensic Engineering",
    client: "Gaming Laboratories International",
    years: "2006 — 2017",
    kicker: "Hardware-level investigation",
    description:
      "Primary forensic investigator for slot-machine malfunction incidents around the world — " +
      "the engineer brought in for the hardest cases, where a bug can be worth millions and the " +
      "answer has to hold up in court.",
    highlights: [
      "Performed 60+ forensic investigations, authoring the technical legal reports and expert opinions that documented the findings.",
      "Extracted and dumped RAM from live gaming devices, then analyzed memory alongside source code to identify bugs and points of error.",
      "Reproduced reported malfunctions on physical hardware, documenting the analysis step by step as the investigation unfolded.",
      "In-circuit emulation and hardware debuggers to step through source code executing on physical gaming devices, mapping functionality to hardware components.",
      "Authored numerous forensic reports and legal opinions relied on in regulatory disputes and litigation.",
    ],
    tech: ["In-circuit emulation", "RAM extraction", "Deep source-code analysis", "Assembly", "C/C++", "Logic analysis", "Embedded hardware"],
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
      "Conceived and established the project; adopted by 6 US regulatory jurisdictions at the time, and now supported by virtually all gaming manufacturers.",
      "Generated testing revenue exceeding $1M annually.",
      "Designed the database structures, Windows calculation services, upload utilities, and integrations with the rest of GLI's product line.",
    ],
    tech: ["C#", ".NET", "SQL Server", "Windows Services"],
    metrics: [
      { value: "$1M+", label: "annual testing revenue" },
      { value: "6", label: "US jurisdictions at launch" },
      { value: "Industry-wide", label: "manufacturer adoption today" },
    ],
  },
];

export const skillGroups: SkillGroup[] = [
  {
    label: "Frontend",
    skills: ["React", "Next.js", "TypeScript", "Redux", "Material UI", "InstantSearch", "PWA / offline-first", "Cordova"],
  },
  {
    label: "Backend & Data",
    skills: ["Node.js", "Rust", "C# / .NET", "C / C++", "PostgreSQL / Supabase", "MySQL", "SQL Server", "REST APIs", "Serverless", "Web scraping"],
  },
  {
    label: "Real-time & Systems",
    skills: ["AWS IoT / MQTT", "SignalR", "WebSockets", "Offline-first / failover", "Tauri (desktop)", "Binary protocols", "Presence / LWT"],
  },
  {
    label: "AI Engineering",
    skills: ["Anthropic API (Claude)", "Claude vision / multimodal", "SSE streaming", "AI-assisted development workflow"],
  },
  {
    label: "Cloud & Infra",
    skills: ["Vercel", "AWS (Lambda, S3, IoT Core, DynamoDB, Cognito)", "Docker", "CI/CD", "Cron / background jobs", "Observability"],
  },
  {
    label: "Commerce & Integrations",
    skills: ["Stripe + Stripe Terminal", "PayPal", "Algolia", "PostGrid (mail)", "Twilio-class messaging", "Webhooks"],
  },
  {
    label: "Hardware & Low-level",
    skills: ["Embedded systems", "In-circuit emulation", "Receipt printers / scanners", "File-system internals", "Serial protocols", "Raspberry Pi"],
  },
];

/**
 * Condensed, cross-cutting competencies for the PDF's Skills section.
 * The concrete per-project stacks are shown as chips under each project in the
 * PDF, so this section highlights capabilities that span projects rather than
 * repeating those tech names. (The website uses the fuller `skillGroups` above.)
 */
export const coreSkills: SkillGroup[] = [
  {
    label: "Engineering",
    skills: ["Full-stack product development", "Real-time & offline-first architecture", "REST APIs, serverless & background jobs", "WebSockets / MQTT / SignalR", "Binary protocols & device integration"],
  },
  {
    label: "AI Engineering",
    skills: ["Anthropic API (Claude)", "Vision / multimodal", "SSE streaming", "AI-assisted development workflow"],
  },
  {
    label: "Platform & Ops",
    skills: ["Vercel, AWS & Docker", "CI/CD", "Observability & alerting", "Cron / scheduled jobs"],
  },
  {
    label: "Systems & Hardware",
    skills: ["Embedded systems", "In-circuit emulation & forensics", "File-system internals", "Receipt printers / scanners", "Serial protocols"],
  },
];

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

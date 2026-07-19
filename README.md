# Chris Van Emmerik — Portfolio

Personal portfolio and living résumé. The site and the downloadable PDF résumé are both
generated from a single data source, so updating one file updates everything.

## Stack

- **Next.js 15** (App Router) + **React 19** + **TypeScript**
- **StyleX** — compile-time atomic CSS-in-JS (design tokens, dark/light themes)
- **MobX** — UI state (theme choice, timeline expansion, project dialogs)
- **@react-pdf/renderer** — on-demand PDF résumé generation at `/api/resume`
- Deployed on **Vercel**

## The one file that matters

All résumé/portfolio content lives in [`src/data/resume.ts`](src/data/resume.ts) —
profile, career timeline, featured projects, skills, education. Both the website and the
PDF résumé render from it. To update the résumé: edit that file, done. The PDF at
`/api/resume` is generated fresh on every request.

> **TODO:** `upworkStats` in that file contains placeholder figures (marked
> `isPlaceholder: true`). Replace them with real numbers from the Upwork profile and flip
> the flag.

## Development

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (StyleX runs via Babel + PostCSS)
npm start
```

## Architecture notes

- **Theming:** design tokens are defined in `src/theme/tokens.stylex.ts` with
  `prefers-color-scheme`-aware defaults, so first paint always matches the system theme
  (no flash). An explicit user choice applies a `createTheme` override after hydration
  and persists in `localStorage`.
- **StyleX pipeline:** `.babelrc.js` runs the StyleX Babel transform (which opts the
  build out of SWC); `postcss.config.js` extracts the generated CSS into
  `globals.css` via the `@stylex` directive. Fonts are self-hosted with Fontsource
  because `next/font` requires SWC.
- **PDF generation:** `@react-pdf/renderer` is listed in `serverExternalPackages` and
  only runs inside the `/api/resume` route handler — it never touches the client bundle.

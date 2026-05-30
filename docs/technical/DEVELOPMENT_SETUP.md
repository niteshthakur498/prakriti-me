# PrakritiMe — Development Setup

---

## Prerequisites

| Tool | Version | Install |
|---|---|---|
| Node.js | ≥ 18 (21 recommended) | [nodejs.org](https://nodejs.org) |
| npm | ≥ 9 | Bundled with Node.js |
| Git | Any recent | [git-scm.com](https://git-scm.com) |

Optional but recommended:
- **VS Code** with the [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss) extension
- **GitHub CLI** (`gh`) for repo management

---

## First-Time Setup

```bash
# 1. Clone
git clone https://github.com/niteshthakur498/prakriti-me.git
cd prakriti-me

# 2. Install dependencies
npm install

# 3. Create local environment file
# (copy the values below into a new .env.local file)
```

**`.env.local`** (create at project root — never commit this file):

```env
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=PrakritiMe
NEXT_PUBLIC_FEATURE_AI_CHAT=false
NEXT_PUBLIC_FEATURE_PROFILES=false
NEXT_PUBLIC_FEATURE_PDF=false
NEXT_PUBLIC_FEATURE_I18N=false
```

```bash
# 4. Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Hot-reload is enabled for all pages and API routes.

---

## Available Scripts

| Script | Command | Description |
|---|---|---|
| Dev server | `npm run dev` | Next.js dev server with HMR on port 3000 |
| Production build | `npm run build` | Compiles + optimises for production |
| Production server | `npm run start` | Serves the production build locally |
| Type check | `npm run type-check` | Runs `tsc --noEmit` — zero errors expected |
| Lint | `npm run lint` | Runs ESLint via `next lint` |

All scripts run from the project root.

---

## Project Layout for Contributors

```
prakriti-me/
├── data/               ← Do not move — imported by server-side code via relative paths
├── src/
│   ├── types/          ← Edit here when adding new types
│   ├── backend/        ← Pure TS, no React/Next imports allowed
│   ├── pages/          ← Next.js pages + API routes
│   ├── components/     ← React components, split by domain
│   ├── hooks/          ← Custom hooks, thin wrappers around state + API
│   ├── lib/            ← Pure utilities (apiClient, features, animations)
│   └── styles/         ← globals.css + tokens.css
├── docs/               ← You are here
└── ui-design-artifacts/ ← Reference only — Stitch design exports
```

---

## Adding a New Feature

### New page

1. Create `src/pages/your-page.tsx`
2. Add `getStaticProps` or `getServerSideProps` if data is needed at render time
3. Link from `Navbar` and `Footer`
4. No direct JSON imports in pages — use API routes or `getStaticProps`

### New API endpoint

1. Create `src/pages/api/your-endpoint.ts`
2. Export `default function handler(req, res) { return yourController.method(req, res) }`
3. Add controller in `src/backend/controllers/`
4. Add service + repository if new data is accessed
5. Apply `withValidation(withErrorHandler(handler), ['GET'])` middleware chain

### New recommendation field

1. Add the field to `data/recommendations.json` for all 7 Prakriti types
2. Add the TypeScript interface in `src/types/index.ts`
3. Update `ScoreResponseData` if the field should be returned by the score API
4. Update the relevant tab component to render the new field

### V2 feature activation

1. Set `NEXT_PUBLIC_FEATURE_YOUR_FEATURE=true` in `.env.local`
2. Add the flag to `FeatureFlags` interface in `src/types/index.ts`
3. Add the corresponding env read in `src/lib/features.ts`
4. Gate UI with `{FEATURES.YOUR_FEATURE && <Component />}`

---

## TypeScript Rules

These are non-negotiable (enforced by strict tsconfig):

- No `any` type — use `unknown` with type guards instead
- No non-null assertion (`!`) without a comment explaining why it is safe
- Every function parameter must be explicitly typed
- Every prop object must have an interface
- No business logic in pages, components, or API route files
- No imports from `src/backend/` in anything other than `src/pages/api/`
- Components must be under 150 lines — split if larger
- Use explicit `JSX.Element` return type, not `React.FC`

---

## Working with the Data Files

`data/questions.json` and `data/recommendations.json` are imported directly in server-side contexts (API routes, `getStaticProps`). They are never exposed at a public URL.

When editing JSON:
- Keep all 7 Prakriti types (`doshas.Vata`, `doshas.Pitta`, `doshas.Kapha`, `dualDoshas['Vata-Pitta']`, `dualDoshas['Pitta-Kapha']`, `dualDoshas['Vata-Kapha']`, `dualDoshas.Tridoshic`) in sync
- Run `npm run type-check` after editing — TypeScript's `resolveJsonModule` will catch structural mismatches
- Keep `favorFoods` at 10 items and `minimizeFoods` at 6 items per dosha (UI is built for these counts)

---

## Environment Variables Reference

| Variable | Type | Default | Effect |
|---|---|---|---|
| `NEXT_PUBLIC_APP_URL` | string | `""` | Base URL for `apiClient` — empty string uses relative paths in browser |
| `NEXT_PUBLIC_APP_NAME` | string | `PrakritiMe` | App name (unused in V1, reserved for metadata) |
| `NEXT_PUBLIC_FEATURE_AI_CHAT` | `"true"` / `"false"` | `"false"` | Enables AI chat UI in results sidebar |
| `NEXT_PUBLIC_FEATURE_PROFILES` | `"true"` / `"false"` | `"false"` | Enables "Save to Profile" button |
| `NEXT_PUBLIC_FEATURE_PDF` | `"true"` / `"false"` | `"false"` | Enables "Download Report" button |
| `NEXT_PUBLIC_FEATURE_I18N` | `"true"` / `"false"` | `"false"` | Enables multilingual toggle |

> All `NEXT_PUBLIC_` variables are baked into the client bundle at build time. They are **not** secret — do not put API keys or secrets in these variables.

---

## Deployment (Vercel)

The repo is configured for Vercel via `vercel.json`:

```json
{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "regions": ["bom1"]
}
```

`bom1` = Mumbai — closest to the primary Indian user base. Change to `iad1` (US East) or `syd1` (Sydney) as needed.

### Deploy steps

1. Push to `main` branch (or connect repo to Vercel dashboard)
2. Set environment variables in Vercel dashboard → Settings → Environment Variables
3. Vercel runs `npm run build` automatically on each push
4. The `/api/*` routes deploy as Vercel Serverless Functions

### Build output sizes (reference)

| Route | Size | First Load JS |
|---|---|---|
| `/` | ~3.6 kB | ~86 kB |
| `/quiz` | ~3.8 kB | ~86 kB |
| `/results` | ~5.1 kB | ~88 kB |
| `/about` | ~3.2 kB | ~86 kB |

All pages are either SSG (static) or client-rendered. No ISR or SSR in V1.

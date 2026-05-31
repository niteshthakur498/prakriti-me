# PrakritiMe — Claude Project Context

> Read this file at the start of every session. It captures everything built so far, all architectural decisions, known gotchas, and conventions. Do not duplicate anything already in `docs/`.

---

## What This Project Is

**PrakritiMe** — an Ayurveda Prakriti (mind-body constitution) quiz app.
Users answer 25 questions and receive personalized health recommendations based on their dominant dosha (Vata / Pitta / Kapha).

**GitHub:** https://github.com/niteshthakur498/prakriti-me  
**Stack:** Next.js 14 (Pages Router) · TypeScript strict · Tailwind CSS · Local JSON data · Vercel (region: `bom1`)  
**Dev server:** `npm run dev` → http://localhost:3000  
**Package name:** `prakriti-me` (directory is `PrakritiMe` with capitals — npm rejected the capital name, so package.json uses lowercase)

---

## Project Structure (complete as of now)

```
PrakritiMe/
├── .claude/
│   ├── CLAUDE.md          ← this file
│   └── launch.json        ← preview server config (port 3000, autoPort: false)
├── data/
│   ├── questions.json     ← 25 questions, 5 sections, 3 options each (V/P/K)
│   └── recommendations.json ← diet/routine/yoga/seasonal for all 7 Prakriti types
├── docs/
│   ├── functional/
│   │   ├── FEATURE_OVERVIEW.md
│   │   ├── USER_GUIDE.md
│   │   └── QUIZ_FLOW.md
│   └── technical/
│       ├── ARCHITECTURE.md
│       ├── API.md
│       ├── DATA_MODELS.md
│       └── DEVELOPMENT_SETUP.md
├── public/
│   ├── favicon.ico        ← placeholder
│   └── logo.png           ← real logo (from ui-design-artifacts/prakritime_lotus_logo/screen.png)
├── src/
│   ├── types/index.ts     ← ALL shared TypeScript types (single source of truth)
│   ├── backend/           ← 🔴 NO React/Next imports ever inside here
│   │   ├── domain/prakriti/
│   │   │   ├── prakritiConstants.ts   ← DOSHA_THRESHOLDS, RESULT_TYPES
│   │   │   ├── PrakritiScorer.ts      ← score(answers) → DoshaTally
│   │   │   └── PrakritiResolver.ts    ← resolve(tally) → PrakritiResultType
│   │   ├── domain/quiz/
│   │   │   └── QuizValidator.ts
│   │   ├── repositories/
│   │   │   ├── interfaces/IQuestionRepository.ts
│   │   │   ├── interfaces/IRecommendationRepository.ts
│   │   │   ├── QuestionRepository.ts       ← reads data/questions.json
│   │   │   └── RecommendationRepository.ts ← reads data/recommendations.json
│   │   ├── services/
│   │   │   ├── interfaces/IQuizService.ts
│   │   │   ├── interfaces/IPrakritiService.ts
│   │   │   ├── QuizService.ts
│   │   │   └── PrakritiService.ts          ← has V2 extraction comment
│   │   ├── controllers/
│   │   │   ├── quizController.ts
│   │   │   └── prakritiController.ts
│   │   └── middleware/
│   │       ├── withErrorHandler.ts
│   │       ├── withValidation.ts
│   │       └── withCors.ts
│   ├── pages/
│   │   ├── _app.tsx
│   │   ├── _document.tsx              ← Google Fonts, logo favicon
│   │   ├── index.tsx                  ← Landing (getStaticProps)
│   │   ├── quiz.tsx                   ← Quiz (getStaticProps)
│   │   ├── results.tsx                ← Results (client sessionStorage read)
│   │   ├── about.tsx                  ← Static educational page
│   │   └── api/
│   │       ├── quiz/questions.ts      ← GET /api/quiz/questions
│   │       └── prakriti/score.ts      ← POST /api/prakriti/score
│   ├── components/
│   │   ├── layout/Navbar.tsx          ← uses next/image logo.png
│   │   ├── layout/Footer.tsx          ← uses next/image logo.png
│   │   ├── landing/HeroSection.tsx
│   │   ├── landing/HowItWorks.tsx
│   │   ├── landing/DoshaPreview.tsx
│   │   ├── landing/Testimonials.tsx
│   │   ├── quiz/ProgressBar.tsx
│   │   ├── quiz/OptionButton.tsx
│   │   ├── quiz/QuizCard.tsx
│   │   ├── quiz/SectionTransition.tsx
│   │   ├── results/DoshaHero.tsx
│   │   ├── results/DoshaChart.tsx     ← React.memo, CSS bar animation on mount
│   │   ├── results/RecommendationTabs.tsx
│   │   ├── results/DietTab.tsx
│   │   ├── results/RoutineTab.tsx
│   │   ├── results/YogaTab.tsx
│   │   └── results/SeasonalTab.tsx
│   ├── hooks/
│   │   ├── useQuiz.ts                 ← all quiz state, clamps index on completion
│   │   ├── usePrakriti.ts             ← API call + sessionStorage + router.push
│   │   ├── usePrakritiChat.ts         ← V2 stub (isAvailable: false always)
│   │   └── useAuth.ts                 ← V2 stub (user: null always)
│   ├── lib/
│   │   ├── apiClient.ts               ← typed fetch wrapper (get/post)
│   │   ├── features.ts                ← FEATURES object from env vars
│   │   └── animations.ts
│   └── styles/
│       ├── globals.css                ← @tailwind + animation keyframes
│       └── tokens.css                 ← CSS custom properties
├── README.md
├── package.json                       ← name: "prakriti-me"
├── tsconfig.json
├── tailwind.config.ts
├── next.config.js
├── postcss.config.js
├── vercel.json                        ← regions: ["bom1"]
└── .env.local                         ← all NEXT_PUBLIC_FEATURE_* = false
```

---

## Critical Gotchas & Decisions

### 1. `@/types` path alias — non-wildcard required
`tsconfig.json` has BOTH:
```json
"@/types": ["src/types/index"],     ← needed for: import from '@/types'
"@/types/*": ["src/types/*"]        ← needed for: import from '@/types/foo'
```
Without the non-wildcard entry, `import from '@/types'` fails with "Cannot find module".

### 2. `useQuiz` — index clamping on completion
When the user answers Q25 and clicks Next, `questionIndex` is set to `totalQuestions` (25) to signal `isComplete`. The `currentQuestion` memo must use `safeIndex = Math.min(questionIndex, totalQuestions - 1)` to avoid throwing "No question at index 25". The quiz page gates rendering on `isComplete` so the clamped question is never displayed.

### 3. JSON imports use relative paths (not aliases)
Repositories import JSON with relative paths:
```typescript
import questionsData from '../../../data/questions.json'
```
`@/backend/*` alias does not reach `data/` — relative paths are required for cross-boundary JSON access.

### 4. `PrakritiService` — dual dosha recommendation resolution
Dual/Tridoshic result types get their `heroDescription` and `keyTraits` from the dual profile record, but `diet / routine / yoga / seasonal` come from the **dominant pure dosha** profile. This is by design.

### 5. `noUncheckedIndexedAccess` is ON
All array/object indexing returns `T | undefined`. Always null-guard or use `?? fallback`. The `DoshaTally` indexing in `PrakritiScorer` uses `(tally[dosha] ?? 0) + 1` for this reason.

### 6. PowerShell commit messages
Multi-line git commit messages must use PowerShell here-strings:
```powershell
$msg = @'
your message here
'@
git commit -m $msg
```
Do NOT use `$(cat <<'EOF'...)` — that's bash syntax and fails in PowerShell.

### 7. Port 3000 / preview server
The Claude Preview MCP (`launch.json`) manages its own Next.js process. If a background `npm run dev` is already running, kill it before calling `preview_start`. `launch.json` has `"autoPort": false`.

### 8. Logo
- Source: `ui-design-artifacts/.../prakritime_lotus_logo/screen.png`
- Deployed at: `public/logo.png`
- Used via `next/image` in `Navbar`, `Footer`, `quiz.tsx` header
- Favicon: `_document.tsx` has `<link rel="icon" type="image/png" href="/logo.png" />`

---

## API Endpoints

| Method | Path | Description |
|---|---|---|
| `GET` | `/api/quiz/questions` | Returns 25 questions in 5 sections |
| `POST` | `/api/prakriti/score` | Scores `AnswerMap` → `ScoreResponseData` |

**Scoring thresholds** (in `prakritiConstants.ts`):
- `TRIDOSHIC_MAX_SPREAD = 3` — if (1st − 3rd) ≤ 3 → Tridoshic
- `DUAL_MAX_SPREAD = 4` — if (1st − 2nd) ≤ 4 → Dual dosha

**Result types:** `Vata | Pitta | Kapha | Vata-Pitta | Pitta-Kapha | Vata-Kapha | Tridoshic`

---

## Data Flow (quiz → results)

```
1. /quiz loads via getStaticProps → imports questions.json directly
2. useQuiz(sections) manages all 25-question state
3. On completion → usePrakriti.scoreQuiz(answers)
4. POST /api/prakriti/score → PrakritiService → returns ScoreResponseData
5. Result stored: sessionStorage.setItem('prakriti_result', JSON.stringify(data))
6. router.push('/results')
7. /results reads sessionStorage → if absent, redirects to /quiz
```

---

## Feature Flags (all false in V1)

Set in `.env.local`, read in `src/lib/features.ts`:

| Flag | Env var | V2 feature |
|---|---|---|
| `AI_CHAT` | `NEXT_PUBLIC_FEATURE_AI_CHAT` | Vedic AI Assistant chat in results sidebar |
| `USER_PROFILES` | `NEXT_PUBLIC_FEATURE_PROFILES` | Save to Profile button |
| `PDF_EXPORT` | `NEXT_PUBLIC_FEATURE_PDF` | Download Report button |
| `MULTILINGUAL` | `NEXT_PUBLIC_FEATURE_I18N` | Language switcher in navbar |

V2 UI is shown in locked/grayed state even when flags are false (not hidden).

---

## TypeScript Rules (enforced, non-negotiable)

- No `any` — use `unknown` with type guards
- No non-null `!` without a comment
- Explicit types on all function parameters and map/forEach callbacks
- Every prop object has an interface
- No imports from `src/backend/` anywhere except `src/pages/api/`
- Components under 150 lines — split if larger
- Explicit `JSX.Element` return type — not `React.FC`

---

## Git State

- Branch: `master`
- Remote: `https://github.com/niteshthakur498/prakriti-me`
- Last commits:
  - `7eda628` fix: clamp questionIndex in useQuiz to prevent crash on quiz completion
  - `f66f114` feat: replace emoji placeholder with real logo PNG
  - `9eb85b2` docs: add comprehensive functional and technical documentation
  - `b1cf475` Initial commit: PrakritiMe Ayurveda Prakriti quiz app

---

## What Is NOT Done Yet (V2 backlog)

- AI Chat backed by Claude API (`POST /api/prakriti/chat`)
- User authentication + saved profiles
- PDF export of results
- Multilingual support (Hindi, Tamil, Telugu)
- Practitioner Mode (raw scores, clinical detail)
- Vikriti (current imbalance) assessment separate from Prakriti
- OG image for social sharing (`public/og-image.png`)
- Real hero illustration in landing page (currently uses emoji circles)
- Seasonal auto-detection (show current season tab by default)

---

## Commands Cheatsheet

```powershell
# Dev
npm run dev           # start dev server on :3000
npm run type-check    # tsc --noEmit (must be zero errors)
npm run build         # production build
npm run lint          # ESLint

# Git
git add .
$msg = @'
your message
'@
git commit -m $msg
git push origin master
```

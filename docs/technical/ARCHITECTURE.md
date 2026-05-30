# PrakritiMe — Technical Architecture

---

## Overview

PrakritiMe is a **Next.js 14 Pages Router** application structured as a **Backend-for-Frontend (BFF)**. The backend lives inside the Next.js app as API routes but is architecturally isolated — it has zero Next.js or React imports and can be extracted to a standalone Node service with minimal changes.

---

## Guiding Principles

### 1. Hard Backend Boundary

```
src/
├── backend/   ← 🔴 NO React, NO Next.js imports EVER
│   ├── domain/
│   ├── repositories/
│   ├── services/
│   ├── controllers/
│   └── middleware/
└── pages/api/  ← Only place that imports from backend/
```

Components and pages never import from `src/backend/`. They talk to the backend exclusively through hooks → `apiClient` → HTTP.

### 2. SOLID Throughout

| Principle | Application |
|---|---|
| **S** — Single Responsibility | `PrakritiScorer` only tallies. `PrakritiResolver` only classifies. Controllers only delegate. |
| **O** — Open/Closed | Thresholds in `prakritiConstants.ts`. Adding a new result type extends constants, not logic. |
| **L** — Liskov Substitution | `QuestionRepository` and any future `DatabaseQuestionRepository` both implement `IQuestionRepository`. Services never break when the implementation swaps. |
| **I** — Interface Segregation | `IQuizService` and `IPrakritiService` are focused, not a god interface. |
| **D** — Dependency Inversion | Services receive dependencies via constructor. No `new` inside services — wired in controllers. |

---

## Folder Structure

```
src/
├── types/
│   └── index.ts                   ← ALL shared types — single source of truth
│
├── backend/
│   ├── domain/
│   │   ├── prakriti/
│   │   │   ├── prakritiConstants.ts    ← Scoring thresholds + result type enum
│   │   │   ├── PrakritiScorer.ts       ← Tallies answers into { V, P, K }
│   │   │   └── PrakritiResolver.ts     ← Converts tally → PrakritiResultType
│   │   └── quiz/
│   │       └── QuizValidator.ts        ← Validates incoming AnswerMap
│   │
│   ├── repositories/
│   │   ├── interfaces/
│   │   │   ├── IQuestionRepository.ts
│   │   │   └── IRecommendationRepository.ts
│   │   ├── QuestionRepository.ts       ← Reads questions.json
│   │   └── RecommendationRepository.ts ← Reads recommendations.json
│   │
│   ├── services/
│   │   ├── interfaces/
│   │   │   ├── IQuizService.ts
│   │   │   └── IPrakritiService.ts
│   │   ├── QuizService.ts              ← Orchestrates questions fetch + validation
│   │   └── PrakritiService.ts          ← Orchestrates scoring + recommendations
│   │
│   ├── controllers/
│   │   ├── quizController.ts           ← Wires QuizService, applies middleware
│   │   └── prakritiController.ts       ← Wires PrakritiService, applies middleware
│   │
│   └── middleware/
│       ├── withErrorHandler.ts         ← Catches thrown errors → 500 JSON
│       ├── withValidation.ts           ← Enforces allowed HTTP methods
│       └── withCors.ts                 ← CORS headers for potential standalone extraction
│
├── pages/
│   ├── _app.tsx                        ← Injects global CSS
│   ├── _document.tsx                   ← HTML shell, Google Fonts
│   ├── index.tsx                       ← Landing (getStaticProps)
│   ├── quiz.tsx                        ← Quiz (getStaticProps)
│   ├── results.tsx                     ← Results (client-side sessionStorage read)
│   ├── about.tsx                       ← Static educational page
│   └── api/
│       ├── quiz/questions.ts           ← Thin wrapper → quizController
│       └── prakriti/score.ts           ← Thin wrapper → prakritiController
│
├── components/
│   ├── layout/   Navbar, Footer
│   ├── landing/  HeroSection, HowItWorks, DoshaPreview, Testimonials
│   ├── quiz/     ProgressBar, OptionButton, QuizCard, SectionTransition
│   └── results/  DoshaHero, DoshaChart, RecommendationTabs,
│                 DietTab, RoutineTab, YogaTab, SeasonalTab
│
├── hooks/
│   ├── useQuiz.ts          ← All quiz state (pure React, no API)
│   ├── usePrakriti.ts      ← API call + navigation after completion
│   ├── usePrakritiChat.ts  ← V2 stub (isAvailable: false)
│   └── useAuth.ts          ← V2 stub (user: null)
│
├── lib/
│   ├── apiClient.ts        ← Typed fetch wrapper (get / post)
│   ├── features.ts         ← Boolean feature flags from env vars
│   └── animations.ts       ← Imperative animation helpers (dosha bars, scroll reveal)
│
└── styles/
    ├── globals.css         ← @tailwind directives + custom animation keyframes
    └── tokens.css          ← CSS custom properties (colours, radii, fonts)
```

---

## Data Flow

### Quiz load

```
Browser → GET /quiz
  → getStaticProps (build time)
    → import questions.json (direct — no HTTP)
    → pass sections[] as props
  → QuizPage renders with sections prop
  → useQuiz(sections) manages all state
```

### Quiz completion

```
useQuiz.isComplete = true
  → useEffect triggers usePrakriti.scoreQuiz(answers)
    → apiClient.post('/api/prakriti/score', { answers })
      → pages/api/prakriti/score.ts
        → prakritiController.score(req, res)
          → withValidation(withErrorHandler(handler))
            → PrakritiService.scoreAndRecommend(answers)
              → PrakritiScorer.score(answers)      → DoshaTally
              → PrakritiResolver.resolve(tally)    → PrakritiResultType
              → PrakritiResolver.getPercentages()  → DoshaPercentages
              → RecommendationRepository.getByDoshaType()
              → returns ScoreResponseData
      → result stored in sessionStorage
      → router.push('/results')
```

### Results render

```
Browser → GET /results
  → useEffect reads sessionStorage['prakriti_result']
  → if absent → redirect to /quiz
  → parse as ScoreResponseData
  → render DoshaHero + DoshaChart + RecommendationTabs
    → DoshaChart useEffect animates bars after mount (200ms delay)
```

---

## Dependency Injection Pattern

Controllers wire all dependencies — services never instantiate their own:

```typescript
// In prakritiController.ts
const prakritiService = new PrakritiService(
  new PrakritiScorer(),
  new PrakritiResolver(),
  new RecommendationRepository(),
)
```

To swap in a database repository in V2:

```typescript
const prakritiService = new PrakritiService(
  new PrakritiScorer(),
  new PrakritiResolver(),
  new DatabaseRecommendationRepository(db),  // ← only change here
)
```

`PrakritiService` never changes. Neither do the tests.

---

## Middleware Chain

```typescript
// Applied as higher-order functions (typed HOFs)
export default function handler(req, res) {
  return prakritiController.score(req, res)
}

// Inside controller:
withValidation(withErrorHandler(scoreHandler), ['POST'])

// Execution order: withValidation → withErrorHandler → scoreHandler
```

---

## V2 Backend Extraction

The entire `src/backend/` directory can become a standalone service:

1. Copy `src/backend/` and `src/types/` to a new repo
2. Add Express/Fastify, wrap controllers in HTTP routes
3. Update `src/lib/apiClient.ts` `BASE_URL` to the new service URL
4. Set `NEXT_PUBLIC_APP_URL` env var in Vercel

Zero other changes. The `IQuestionRepository` / `IRecommendationRepository` interfaces ensure database implementations drop in transparently.

---

## TypeScript Configuration

Key compiler options:

| Option | Value | Reason |
|---|---|---|
| `strict` | `true` | Full strictness — no implicit any, null checks enforced |
| `noUncheckedIndexedAccess` | `true` | Array/object access returns `T \| undefined` — forces null guards |
| `noImplicitAny` | `true` | Every parameter must be explicitly typed |
| `moduleResolution` | `bundler` | Next.js 14 compatible, supports `paths` aliases |
| `resolveJsonModule` | `true` | Direct JSON imports with type inference |
| `isolatedModules` | `true` | Required for SWC transpilation |

### Path aliases

```json
"@/types"        → src/types/index.ts  (non-wildcard, required for barrel import)
"@/components/*" → src/components/*
"@/hooks/*"      → src/hooks/*
"@/lib/*"        → src/lib/*
"@/backend/*"    → src/backend/*
"@/styles/*"     → src/styles/*
```

---

## Design System Integration

Tailwind config extends the default theme with:
- **Dosha colours** — `vata`, `pitta`, `kapha` + `-dark` variants
- **Brand colours** — `saffron`, `turmeric`, `forest`, `sage`, `cream`
- **Material Design surface tokens** — mirrors the Stitch design export exactly
- **Custom font stacks** — `display`, `body`, `sanskrit` families
- **Custom border radii** — `card` (16px), `button` (24px), `tag` (8px)

CSS animation classes (`sun-shadow`, `glass-nav`, `saffron-gradient`, `card-hover`, `cta-pulse`, etc.) are defined in `globals.css` and used as Tailwind utility classes across components.

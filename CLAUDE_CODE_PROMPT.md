# PrakritiMe — Claude Code Development Prompt
> Place this file in the root of your repository.
> Start Claude Code and say: "Read CLAUDE_CODE_PROMPT.md and build the project."

---

## Project Overview

Build "PrakritiMe" — an Ayurveda-based Prakriti (mind-body constitution)
discovery web app. Users take a 25-question quiz and receive personalized
health recommendations based on their dominant dosha (Vata, Pitta, or Kapha).

## Repository Context

The repository already contains:
- `/data/questions.json` — 25 quiz questions across 5 sections
- `/data/recommendations.json` — Full recommendations for all 7 Prakriti types
- `/ui-design-artifacts/` — Stitch design exports (PNG + HTML) for desktop
  and mobile — USE THESE AS THE VISUAL REFERENCE for all UI decisions
- `/docs/` — Project structure guide and PRD

Read ALL files in `/data/`, `/ui-design-artifacts/`, and `/docs/`
BEFORE writing a single line of code. The design artifacts are the
source of truth for all visual decisions.

---

## Tech Stack

- **Framework**: Next.js 14 (Pages Router — NOT App Router)
- **Language**: **TypeScript** (strict mode enabled)
- **Styling**: Tailwind CSS + CSS Modules for component-specific styles
- **API**: Next.js API Routes (acting as BFF — Backend for Frontend)
- **Data**: Local JSON files in `/data/` (no database in V1)
- **Deployment**: Vercel
- **Package manager**: npm

---

## TypeScript Configuration

### tsconfig.json — use this exact config

```json
{
  "compilerOptions": {
    "target": "es2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": false,
    "skipLibCheck": true,
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "baseUrl": ".",
    "paths": {
      "@/components/*": ["src/components/*"],
      "@/hooks/*": ["src/hooks/*"],
      "@/lib/*": ["src/lib/*"],
      "@/backend/*": ["src/backend/*"],
      "@/types/*": ["src/types/*"],
      "@/styles/*": ["src/styles/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx"],
  "exclude": ["node_modules"]
}
```

### Core Type Definitions — create src/types/index.ts

```typescript
// ─── Dosha Core Types ────────────────────────────────────────────────────────

export type DoshaSymbol = 'V' | 'P' | 'K'

export type PureDoshaType = 'Vata' | 'Pitta' | 'Kapha'

export type DualDoshaType = 'Vata-Pitta' | 'Pitta-Kapha' | 'Vata-Kapha'

export type PrakritiResultType = PureDoshaType | DualDoshaType | 'Tridoshic'

// ─── Quiz Types ──────────────────────────────────────────────────────────────

export interface QuizOption {
  id: string
  dosha: DoshaSymbol
  text: string
  shortLabel: string
}

export interface QuizQuestion {
  id: string
  sectionId: string
  questionNumber: number
  text: string
  hint?: string
  options: QuizOption[]
}

export interface QuizSection {
  id: string
  sectionNumber: number
  title: string
  sanskritTitle: string
  sanskrit: string
  description: string
  emoji: string
  color: string
  questions: QuizQuestion[]
}

export interface QuizMeta {
  version: string
  totalQuestions: number
  sections: number
  questionsPerSection: number
  scoring: Record<string, string>
  notes: string
}

export interface QuestionsData {
  _meta: QuizMeta
  sections: QuizSection[]
  scoringGuide: {
    method: string
    totalPoints: number
    resultThresholds: Record<string, string>
    resultTypes: PrakritiResultType[]
  }
}

// ─── Answer Types ────────────────────────────────────────────────────────────

export type AnswerMap = Record<string, DoshaSymbol>

// ─── Scoring Types ───────────────────────────────────────────────────────────

export interface DoshaTally {
  V: number
  P: number
  K: number
}

export interface DoshaScores {
  vata: number
  pitta: number
  kapha: number
}

export interface DoshaPercentages {
  vata: number
  pitta: number
  kapha: number
}

export interface PrakritiScore {
  resultType: PrakritiResultType
  scores: DoshaScores
  percentages: DoshaPercentages
  dominant: PureDoshaType
  secondary: PureDoshaType
}

// ─── Recommendation Types ────────────────────────────────────────────────────

export interface FoodItem {
  name: string
  emoji: string
  reason: string
}

export interface DietRecommendation {
  principles: string[]
  tastes: {
    favor: string[]
    reduce: string[]
  }
  favorFoods: FoodItem[]
  minimizeFoods: FoodItem[]
}

export interface RoutineSlot {
  time: string
  activity: string
  detail: string
  emoji: string
}

export interface RoutineRecommendation {
  principle: string
  daily: RoutineSlot[]
  weeklyPractices: string[]
}

export interface YogaPose {
  name: string
  sanskrit: string
  benefit: string
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  emoji: string
}

export interface YogaRecommendation {
  principle: string
  style: string
  intensity: string
  poses: YogaPose[]
  breathwork: string
  avoid: string
}

export interface SeasonTips {
  season: string
  emoji: string
  focus: string
  tips: string[]
  [key: string]: string | string[]  // allows kaphaLevel, pittaLevel etc.
}

export interface SeasonalRecommendation {
  spring: SeasonTips
  summer: SeasonTips
  autumn: SeasonTips
  winter: SeasonTips
}

export interface DoshaProfile {
  id: string
  name: PureDoshaType
  sanskrit: string
  elements: string[]
  elementsEmoji: string[]
  primaryColor: string
  secondaryColor: string
  gradientFrom: string
  gradientTo: string
  icon: string
  tagline: string
  heroDescription: string
  keyTraits: string[]
  balancedQualities: string[]
  imbalancedQualities: string[]
  famousVataTypes: string
  diet: DietRecommendation
  routine: RoutineRecommendation
  yoga: YogaRecommendation
  seasonal: SeasonalRecommendation
}

export interface DualDoshaProfile {
  id: string
  name: DualDoshaType | 'Tridoshic'
  sanskrit: string
  icon: string
  gradientFrom: string
  gradientTo: string
  tagline: string
  heroDescription: string
  keyTraits: string[]
  primaryBalance: string
  keyPractices: string[]
  seasonalPriority: string
  seeFullRecommendationsFor: PureDoshaType[]
}

export interface RecommendationsData {
  _meta: {
    version: string
    description: string
    categories: string[]
    doshaTypes: PrakritiResultType[]
  }
  doshas: Record<PureDoshaType, DoshaProfile>
  dualDoshas: Record<DualDoshaType | 'Tridoshic', DualDoshaProfile>
  generalPrinciples: {
    sixTastes: {
      description: string
      tastes: Array<{
        name: string
        sanskrit: string
        elements: string
        increases: PureDoshaType[]
        decreases: PureDoshaType[]
        examples: string
      }>
    }
    dinacharya: {
      description: string
      universalPractices: Array<{ practice: string; benefit: string }>
    }
  }
}

// ─── API Types ───────────────────────────────────────────────────────────────

export interface ApiSuccess<T> {
  success: true
  data: T
}

export interface ApiError {
  success: false
  error: string
  code: string
}

export type ApiResponse<T> = ApiSuccess<T> | ApiError

export interface ScoreRequestBody {
  answers: AnswerMap
}

export interface ScoreResponseData extends PrakritiScore {
  recommendations: {
    profile: Pick<DoshaProfile, 
      'name' | 'sanskrit' | 'icon' | 'tagline' | 'heroDescription' |
      'keyTraits' | 'gradientFrom' | 'gradientTo' | 
      'primaryColor' | 'secondaryColor'
    >
    diet: DietRecommendation
    routine: RoutineRecommendation
    yoga: YogaRecommendation
    seasonal: SeasonalRecommendation
  }
}

export interface QuestionsResponseData {
  sections: QuizSection[]
  totalQuestions: number
  meta: QuizMeta
}

// ─── Hook Return Types ───────────────────────────────────────────────────────

export interface UseQuizReturn {
  currentQuestion: QuizQuestion
  currentSection: QuizSection
  questionIndex: number
  sectionIndex: number
  progressPercent: number
  answers: AnswerMap
  selectedAnswer: DoshaSymbol | null
  selectAnswer: (questionId: string, dosha: DoshaSymbol) => void
  goNext: () => void
  goPrev: () => void
  isFirstQuestion: boolean
  isLastQuestion: boolean
  isComplete: boolean
  canProceed: boolean
  isTransitioning: boolean  // true during section transition screen
}

export interface UsePrakritiReturn {
  result: ScoreResponseData | null
  isLoading: boolean
  error: string | null
  scoreQuiz: (answers: AnswerMap) => Promise<void>
}

// ─── Feature Flag Types ──────────────────────────────────────────────────────

export interface FeatureFlags {
  AI_CHAT: boolean
  USER_PROFILES: boolean
  PDF_EXPORT: boolean
  MULTILINGUAL: boolean
}

// ─── V2 Stub Types ───────────────────────────────────────────────────────────

export interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

export interface UsePrakritiChatReturn {
  messages: ChatMessage[]
  sendMessage: (text: string) => Promise<void>
  isLoading: boolean
  isAvailable: boolean
}

export interface UseAuthReturn {
  user: null
  isAuthenticated: false
  login: () => void
  logout: () => void
}
```

---

## Architecture Principles — Read Carefully

### The Golden Rule: Backend Has Its Own Kingdom

Even though the backend sits inside the Next.js app as API routes,
it must be structured as if it could be extracted into a standalone
Node/Express/Fastify service tomorrow with minimal changes.

### Folder Structure — NON-NEGOTIABLE

```
prakriti-app/
│
├── data/                              ← (already exists) JSON data files
│   ├── questions.json
│   └── recommendations.json
│
├── ui-design-artifacts/               ← (already exists) design reference
│
├── docs/                              ← (already exists) PRD and structure
│
├── CLAUDE_CODE_PROMPT.md              ← this file
│
├── src/
│   │
│   ├── types/
│   │   └── index.ts                   ← ALL shared types (defined above)
│   │
│   ├── backend/                       ← 🔴 BACKEND BOUNDARY
│   │   │                                 NO frontend code enters here EVER
│   │   │                                 NO Next.js imports inside here
│   │   │                                 NO React imports inside here
│   │   │
│   │   ├── domain/
│   │   │   ├── prakriti/
│   │   │   │   ├── PrakritiScorer.ts
│   │   │   │   ├── PrakritiResolver.ts
│   │   │   │   └── prakritiConstants.ts
│   │   │   └── quiz/
│   │   │       └── QuizValidator.ts
│   │   │
│   │   ├── repositories/
│   │   │   ├── interfaces/
│   │   │   │   ├── IQuestionRepository.ts
│   │   │   │   └── IRecommendationRepository.ts
│   │   │   ├── QuestionRepository.ts
│   │   │   └── RecommendationRepository.ts
│   │   │
│   │   ├── services/
│   │   │   ├── interfaces/
│   │   │   │   ├── IQuizService.ts
│   │   │   │   └── IPrakritiService.ts
│   │   │   ├── QuizService.ts
│   │   │   └── PrakritiService.ts
│   │   │
│   │   ├── controllers/
│   │   │   ├── quizController.ts
│   │   │   └── prakritiController.ts
│   │   │
│   │   └── middleware/
│   │       ├── withValidation.ts
│   │       ├── withErrorHandler.ts
│   │       └── withCors.ts
│   │
│   ├── pages/
│   │   ├── index.tsx                  ← Landing page
│   │   ├── quiz.tsx                   ← Quiz flow
│   │   ├── results.tsx                ← Results + recommendations
│   │   ├── about.tsx                  ← What is Prakriti?
│   │   ├── _app.tsx
│   │   ├── _document.tsx
│   │   └── api/
│   │       ├── quiz/
│   │       │   └── questions.ts       ← GET /api/quiz/questions
│   │       └── prakriti/
│   │           └── score.ts           ← POST /api/prakriti/score
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   └── Footer.tsx
│   │   ├── quiz/
│   │   │   ├── QuizCard.tsx
│   │   │   ├── ProgressBar.tsx
│   │   │   ├── OptionButton.tsx
│   │   │   └── SectionTransition.tsx
│   │   ├── results/
│   │   │   ├── DoshaHero.tsx
│   │   │   ├── DoshaChart.tsx
│   │   │   ├── RecommendationTabs.tsx
│   │   │   ├── DietTab.tsx
│   │   │   ├── RoutineTab.tsx
│   │   │   ├── YogaTab.tsx
│   │   │   └── SeasonalTab.tsx
│   │   └── landing/
│   │       ├── HeroSection.tsx
│   │       ├── HowItWorks.tsx
│   │       ├── DoshaPreview.tsx
│   │       └── Testimonials.tsx
│   │
│   ├── hooks/
│   │   ├── useQuiz.ts
│   │   ├── usePrakriti.ts
│   │   ├── usePrakritiChat.ts         ← V2 stub
│   │   └── useAuth.ts                 ← V2 stub
│   │
│   ├── lib/
│   │   ├── apiClient.ts
│   │   ├── animations.ts
│   │   └── features.ts                ← Feature flags
│   │
│   └── styles/
│       ├── globals.css
│       └── tokens.css
│
├── public/
│   └── favicon.ico
│
├── package.json
├── tsconfig.json
├── next.config.js
├── tailwind.config.ts
└── vercel.json
```

---

## SOLID Principles — How to Apply in TypeScript

### S — Single Responsibility

Each class/module does exactly ONE thing:

```typescript
// ✅ PrakritiScorer.ts — ONLY tallies scores, nothing else
export class PrakritiScorer {
  score(answers: AnswerMap): DoshaTally {
    const tally: DoshaTally = { V: 0, P: 0, K: 0 }
    Object.values(answers).forEach(dosha => {
      tally[dosha]++
    })
    return tally
  }
}

// ✅ PrakritiResolver.ts — ONLY resolves tally to a result type
export class PrakritiResolver {
  resolve(tally: DoshaTally): PrakritiResultType { ... }
}

// ❌ WRONG — API route doing business logic inline
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const answers = req.body.answers
  let vata = 0  // ← business logic in HTTP layer = violation
  ...
}

// ✅ RIGHT — API route is a thin wrapper only
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  return prakritiController.score(req, res)
}
```

### O — Open/Closed

Thresholds and constants are in `prakritiConstants.ts` — adding a new
result type means extending constants, NOT modifying scorer/resolver logic:

```typescript
// prakritiConstants.ts
export const DOSHA_THRESHOLDS = {
  TRIDOSHIC_MAX_SPREAD: 3,
  DUAL_MAX_SPREAD: 4,
} as const

export const RESULT_TYPES: Record<string, PrakritiResultType> = {
  VATA: 'Vata',
  PITTA: 'Pitta',
  KAPHA: 'Kapha',
  VATA_PITTA: 'Vata-Pitta',
  PITTA_KAPHA: 'Pitta-Kapha',
  VATA_KAPHA: 'Vata-Kapha',
  TRIDOSHIC: 'Tridoshic',
} as const
```

### L — Liskov Substitution

Repositories implement interfaces — file-based and DB-based are interchangeable:

```typescript
// src/backend/repositories/interfaces/IQuestionRepository.ts
export interface IQuestionRepository {
  getAll(): Promise<QuizSection[]>
  getById(id: string): Promise<QuizQuestion | null>
  getBySection(sectionId: string): Promise<QuizQuestion[]>
  getMeta(): Promise<QuizMeta>
}

// src/backend/repositories/interfaces/IRecommendationRepository.ts
export interface IRecommendationRepository {
  getByDoshaType(doshaType: PrakritiResultType): Promise<DoshaProfile | DualDoshaProfile>
  getAllDoshaProfiles(): Promise<Record<PureDoshaType, DoshaProfile>>
}

// V1: JsonQuestionRepository implements IQuestionRepository (reads JSON file)
// V2: DatabaseQuestionRepository implements IQuestionRepository (reads DB)
// Services never change — they depend on the INTERFACE not the implementation
```

### I — Interface Segregation

Services define focused interfaces — no god objects:

```typescript
// IQuizService.ts
export interface IQuizService {
  getQuestions(): Promise<QuestionsResponseData>
  validateAnswers(answers: AnswerMap): boolean
}

// IPrakritiService.ts
export interface IPrakritiService {
  scoreAndRecommend(answers: AnswerMap): Promise<ScoreResponseData>
}
```

### D — Dependency Inversion

Services receive dependencies via constructor — never instantiate internally:

```typescript
// ✅ RIGHT — dependencies injected
export class PrakritiService implements IPrakritiService {
  constructor(
    private readonly scorer: PrakritiScorer,
    private readonly resolver: PrakritiResolver,
    private readonly recommendationRepo: IRecommendationRepository
  ) {}

  async scoreAndRecommend(answers: AnswerMap): Promise<ScoreResponseData> {
    const tally = this.scorer.score(answers)
    const resultType = this.resolver.resolve(tally)
    const recommendations = await this.recommendationRepo.getByDoshaType(resultType)
    ...
  }
}

// In controller — wire dependencies here, not inside service
const prakritiService = new PrakritiService(
  new PrakritiScorer(),
  new PrakritiResolver(),
  new RecommendationRepository()
)
```

---

## Scoring Logic — Implement Exactly This

```typescript
// src/backend/domain/prakriti/PrakritiScorer.ts
import type { AnswerMap, DoshaTally } from '@/types'

export class PrakritiScorer {
  score(answers: AnswerMap): DoshaTally {
    const tally: DoshaTally = { V: 0, P: 0, K: 0 }
    Object.values(answers).forEach((dosha) => {
      if (dosha in tally) {
        tally[dosha]++
      }
    })
    return tally
  }
}

// src/backend/domain/prakriti/PrakritiResolver.ts
import { DOSHA_THRESHOLDS } from './prakritiConstants'
import type { DoshaTally, PrakritiResultType, PureDoshaType } from '@/types'

interface RankedDosha {
  dosha: PureDoshaType
  score: number
}

export class PrakritiResolver {
  resolve(tally: DoshaTally): PrakritiResultType {
    const ranked: RankedDosha[] = [
      { dosha: 'Vata',  score: tally.V },
      { dosha: 'Pitta', score: tally.P },
      { dosha: 'Kapha', score: tally.K },
    ].sort((a, b) => b.score - a.score) as RankedDosha[]

    const [first, second, third] = ranked
    // safe — ranked always has exactly 3 elements after sort
    if (!first || !second || !third) {
      throw new Error('Invalid tally — expected 3 doshas')
    }

    const spread = first.score - third.score
    const topTwo = first.score - second.score

    if (spread <= DOSHA_THRESHOLDS.TRIDOSHIC_MAX_SPREAD) {
      return 'Tridoshic'
    }
    if (topTwo <= DOSHA_THRESHOLDS.DUAL_MAX_SPREAD) {
      return `${first.dosha}-${second.dosha}` as PrakritiResultType
    }
    return first.dosha
  }

  getPercentages(tally: DoshaTally) {
    const total = tally.V + tally.P + tally.K
    return {
      vata:  Math.round((tally.V / total) * 100),
      pitta: Math.round((tally.P / total) * 100),
      kapha: Math.round((tally.K / total) * 100),
    }
  }
}
```

---

## API Design — Implement These Endpoints

### GET /api/quiz/questions

```typescript
// src/pages/api/quiz/questions.ts
import type { NextApiRequest, NextApiResponse } from 'next'
import { quizController } from '@/backend/controllers/quizController'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  return quizController.getQuestions(req, res)
}
```

Response 200:
```json
{
  "success": true,
  "data": {
    "sections": [...],
    "totalQuestions": 25,
    "meta": { "version": "1.0.0" }
  }
}
```

### POST /api/prakriti/score

```typescript
// src/pages/api/prakriti/score.ts
import type { NextApiRequest, NextApiResponse } from 'next'
import { prakritiController } from '@/backend/controllers/prakritiController'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  return prakritiController.score(req, res)
}
```

Request body:
```json
{
  "answers": {
    "Q01": "V",
    "Q02": "K",
    "Q03": "P"
  }
}
```

Response 200:
```json
{
  "success": true,
  "data": {
    "resultType": "Vata-Pitta",
    "scores": { "vata": 12, "pitta": 9, "kapha": 4 },
    "percentages": { "vata": 48, "pitta": 36, "kapha": 16 },
    "dominant": "Vata",
    "secondary": "Pitta",
    "recommendations": {
      "profile": { ... },
      "diet": { ... },
      "routine": { ... },
      "yoga": { ... },
      "seasonal": { ... }
    }
  }
}
```

Error responses (all errors):
```json
{ "success": false, "error": "Human readable message", "code": "ERROR_CODE" }
```

---

## Middleware — Implement With Typed HOFs

```typescript
// src/backend/middleware/withErrorHandler.ts
import type { NextApiRequest, NextApiResponse } from 'next'
import type { ApiError } from '@/types'

type ApiHandler = (req: NextApiRequest, res: NextApiResponse) => Promise<void> | void

export function withErrorHandler(handler: ApiHandler): ApiHandler {
  return async (req, res) => {
    try {
      await handler(req, res)
    } catch (error) {
      console.error('[API Error]', error)
      const body: ApiError = {
        success: false,
        error: 'An unexpected error occurred',
        code: 'INTERNAL_ERROR',
      }
      res.status(500).json(body)
    }
  }
}

// src/backend/middleware/withValidation.ts
export function withValidation(handler: ApiHandler, methods: string[]): ApiHandler {
  return async (req, res) => {
    if (!methods.includes(req.method ?? '')) {
      const body: ApiError = {
        success: false,
        error: `Method ${req.method} not allowed`,
        code: 'METHOD_NOT_ALLOWED',
      }
      return res.status(405).json(body)
    }
    return handler(req, res)
  }
}

// Usage in controller:
// withValidation(withErrorHandler(handler), ['POST'])
```

---

## Hook Signatures — Typed Exactly

```typescript
// src/hooks/useQuiz.ts
import type { UseQuizReturn, QuizSection, DoshaSymbol } from '@/types'

export function useQuiz(sections: QuizSection[]): UseQuizReturn {
  // All quiz state lives here — no useState in quiz page component
  // Exposes: currentQuestion, currentSection, questionIndex,
  //          sectionIndex, progressPercent, answers, selectedAnswer,
  //          selectAnswer, goNext, goPrev, isFirstQuestion,
  //          isLastQuestion, isComplete, canProceed, isTransitioning
}

// src/hooks/usePrakriti.ts
import type { UsePrakritiReturn, AnswerMap } from '@/types'

export function usePrakriti(): UsePrakritiReturn {
  // Manages: API call to POST /api/prakriti/score
  // Exposes: result, isLoading, error, scoreQuiz
  // On success: stores result in sessionStorage, navigates to /results
}

// src/hooks/usePrakritiChat.ts — V2 STUB
import type { UsePrakritiChatReturn, PrakritiResultType } from '@/types'

export function usePrakritiChat(_doshaType: PrakritiResultType): UsePrakritiChatReturn {
  // V1: fully stubbed — isAvailable is always false
  // V2: will call POST /api/prakriti/chat backed by Claude API
  return {
    messages: [],
    sendMessage: async () => undefined,
    isLoading: false,
    isAvailable: false,
  }
}

// src/hooks/useAuth.ts — V2 STUB
import type { UseAuthReturn } from '@/types'

export function useAuth(): UseAuthReturn {
  // V1: fully stubbed
  // V2: will handle user sessions for saved Prakriti profiles
  return {
    user: null,
    isAuthenticated: false,
    login: () => undefined,
    logout: () => undefined,
  }
}
```

---

## API Client — Typed Fetch Wrapper

```typescript
// src/lib/apiClient.ts
import type { ApiResponse } from '@/types'

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL ?? ''

async function request<T>(
  path: string,
  options?: RequestInit
): Promise<ApiResponse<T>> {
  const response = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  })
  const data = await response.json() as ApiResponse<T>
  return data
}

export const apiClient = {
  get: <T>(path: string) =>
    request<T>(path, { method: 'GET' }),

  post: <T>(path: string, body: unknown) =>
    request<T>(path, {
      method: 'POST',
      body: JSON.stringify(body),
    }),
}
```

---

## Feature Flags

```typescript
// src/lib/features.ts
import type { FeatureFlags } from '@/types'

export const FEATURES: FeatureFlags = {
  AI_CHAT:       process.env.NEXT_PUBLIC_FEATURE_AI_CHAT === 'true',
  USER_PROFILES: process.env.NEXT_PUBLIC_FEATURE_PROFILES === 'true',
  PDF_EXPORT:    process.env.NEXT_PUBLIC_FEATURE_PDF === 'true',
  MULTILINGUAL:  process.env.NEXT_PUBLIC_FEATURE_I18N === 'true',
}
```

---

## Component Contract — Every Component Must Follow This

```typescript
// Example: src/components/quiz/OptionButton.tsx
import type { DoshaSymbol } from '@/types'

interface OptionButtonProps {
  id: string
  text: string
  dosha: DoshaSymbol
  isSelected: boolean
  sectionColor: string
  onSelect: (dosha: DoshaSymbol) => void
}

export function OptionButton({
  id,
  text,
  dosha,
  isSelected,
  sectionColor,
  onSelect,
}: OptionButtonProps): JSX.Element {
  // No internal state — fully controlled
  // No direct JSON imports
  // No API calls
}

// Example: src/components/results/DoshaChart.tsx
interface DoshaChartProps {
  percentages: {
    vata: number
    pitta: number
    kapha: number
  }
}

export const DoshaChart = React.memo(function DoshaChart({
  percentages,
}: DoshaChartProps): JSX.Element {
  // Animated stacked bar chart
  // useEffect triggers CSS transition on mount
  // ARIA labels for screen readers
  // React.memo — expensive animation, avoid re-renders
})
```

---

## Data Flow — Follow This Exactly

```
User visits /quiz
  → getStaticProps calls QuizService.getQuestions()
    → QuizService calls QuestionRepository.getAll()
      → QuestionRepository reads /data/questions.json
  → sections typed as QuizSection[] passed as props to QuizPage
  → useQuiz(sections) manages ALL quiz state (typed via UseQuizReturn)

User completes quiz
  → useQuiz.isComplete becomes true
  → usePrakriti.scoreQuiz(answers: AnswerMap) called
    → apiClient.post<ScoreResponseData>('/api/prakriti/score', { answers })
      → prakritiController.score(req, res)
        → PrakritiService.scoreAndRecommend(answers)
          → PrakritiScorer.score(answers) → DoshaTally
          → PrakritiResolver.resolve(tally) → PrakritiResultType
          → RecommendationRepository.getByDoshaType(resultType)
          → returns ScoreResponseData
  → result stored in sessionStorage as JSON string
  → router.push('/results')

User lands on /results
  → reads result from sessionStorage, parses as ScoreResponseData
  → if null → redirect to /quiz
  → renders DoshaHero, DoshaChart, RecommendationTabs with typed props
```

---

## Design System — Tailwind Config

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        saffron:         '#F4A023',
        turmeric:        '#E8831A',
        forest:          '#2D6A4F',
        sage:            '#74B49B',
        cream:           '#FDF6EC',
        'warm-white':    '#FFFAF3',
        vata:            '#7EC8E3',
        'vata-dark':     '#4A90D9',
        pitta:           '#FF6B6B',
        'pitta-dark':    '#E8831A',
        kapha:           '#52796F',
        'kapha-dark':    '#2D6A4F',
        'text-primary':  '#2C1810',
        'text-secondary':'#6B4C3B',
        border:          '#E8D5C0',
      },
      fontFamily: {
        display: ['Playfair Display', 'serif'],
        body:    ['Inter', 'sans-serif'],
        mono:    ['JetBrains Mono', 'monospace'],
      },
      borderRadius: {
        card:   '16px',
        button: '24px',
        tag:    '8px',
      },
    },
  },
  plugins: [],
}

export default config
```

---

## Page Implementations

### Landing Page (src/pages/index.tsx)

```typescript
import type { GetStaticProps, NextPage } from 'next'
import type { QuizSection } from '@/types'

interface HomeProps {
  doshaProfiles: Array<{
    name: string
    sanskrit: string
    tagline: string
    heroDescription: string
    keyTraits: string[]
    icon: string
    primaryColor: string
    gradientFrom: string
    gradientTo: string
  }>
}

const Home: NextPage<HomeProps> = ({ doshaProfiles }) => {
  // Renders: Navbar → Hero → HowItWorks → DoshaPreview → Testimonials → Footer
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  // Import recommendations.json and extract dosha profile previews
  // Return as static props — no runtime fetch
}
```

### Quiz Page (src/pages/quiz.tsx)

```typescript
import type { GetStaticProps, NextPage } from 'next'
import type { QuizSection } from '@/types'
import { useQuiz } from '@/hooks/useQuiz'
import { usePrakriti } from '@/hooks/usePrakriti'

interface QuizProps {
  sections: QuizSection[]
}

const QuizPage: NextPage<QuizProps> = ({ sections }) => {
  const quiz = useQuiz(sections)      // ALL quiz state
  const prakriti = usePrakriti()      // API call state

  // When quiz.isComplete → call prakriti.scoreQuiz(quiz.answers)
  // Show SectionTransition when quiz.isTransitioning
  // Show QuizCard for quiz.currentQuestion
}

export const getStaticProps: GetStaticProps<QuizProps> = async () => {
  // Import questions.json, return sections as props
}
```

### Results Page (src/pages/results.tsx)

```typescript
import type { NextPage } from 'next'
import type { ScoreResponseData } from '@/types'
import { FEATURES } from '@/lib/features'

const ResultsPage: NextPage = () => {
  const [result, setResult] = useState<ScoreResponseData | null>(null)

  useEffect(() => {
    const stored = sessionStorage.getItem('prakriti_result')
    if (!stored) { router.push('/quiz'); return }
    setResult(JSON.parse(stored) as ScoreResponseData)
  }, [])

  // V2 hooks — always called (Rules of Hooks), result used conditionally
  const chat = usePrakritiChat(result?.resultType ?? 'Vata')
  const auth = useAuth()

  // Renders: DoshaHero → DoshaChart → RecommendationTabs
  // V2 locked UI: AI Chat button (FEATURES.AI_CHAT), Save Profile, Export PDF
}
```

---

## Animations

```css
/* src/styles/globals.css */

/* Quiz option select */
.option-button {
  transition: all 200ms ease;
}
.option-button.selected {
  transform: scale(1.02);
}

/* Progress bar */
.progress-fill {
  transition: width 400ms ease-out;
}

/* Dosha chart bars — JS sets width after mount */
.dosha-bar {
  width: 0%;
  transition: width 800ms ease-out;
}

/* Card hover */
.card-hover {
  transition: transform 200ms ease, box-shadow 200ms ease;
}
.card-hover:hover {
  transform: translateY(-4px);
}

/* CTA pulse */
.cta-pulse {
  animation: pulse 2s infinite;
}
@keyframes pulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(244, 160, 35, 0.4); }
  50%       { box-shadow: 0 0 0 8px rgba(244, 160, 35, 0); }
}

/* Section transition celebration */
.section-transition {
  animation: celebrate 0.8s ease forwards;
}
@keyframes celebrate {
  0%   { opacity: 0; transform: scale(0.9); }
  50%  { opacity: 1; transform: scale(1.05); }
  100% { opacity: 1; transform: scale(1); }
}

/* Results entry */
.results-entry {
  animation: resultReveal 1.5s ease forwards;
}
@keyframes resultReveal {
  0%   { opacity: 0; transform: translateY(20px); }
  100% { opacity: 1; transform: translateY(0); }
}

/* Respect reduced motion — always */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Environment & Deployment

### .env.local

```
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=PrakritiMe
NEXT_PUBLIC_FEATURE_AI_CHAT=false
NEXT_PUBLIC_FEATURE_PROFILES=false
NEXT_PUBLIC_FEATURE_PDF=false
NEXT_PUBLIC_FEATURE_I18N=false
```

### vercel.json

```json
{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "regions": ["bom1"]
}
```

`bom1` = Mumbai — closest to primary Indian user base.

### package.json scripts

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "type-check": "tsc --noEmit"
  }
}
```

### Core dependencies to install

```bash
npm install next react react-dom
npm install -D typescript @types/node @types/react @types/react-dom
npm install -D tailwindcss postcss autoprefixer
npm install -D eslint eslint-config-next
```

---

## Build Order — Follow This Sequence

Build in this exact order so each step is testable before the next:

```
Step 1: Project setup
  → npx create-next-app@latest with TypeScript + Tailwind options
  → Copy tsconfig.json from this prompt (replace generated one)
  → Create src/types/index.ts with ALL types from this prompt
  → tailwind.config.ts with design tokens
  → globals.css and tokens.css
  → Verify: npx tsc --noEmit passes with zero errors

Step 2: Backend layer (NO frontend code yet)
  → prakritiConstants.ts
  → PrakritiScorer.ts + PrakritiResolver.ts (pure — no I/O)
  → IQuestionRepository.ts + IRecommendationRepository.ts (interfaces)
  → QuestionRepository.ts + RecommendationRepository.ts (JSON impl)
  → IQuizService.ts + IPrakritiService.ts (interfaces)
  → QuizService.ts + PrakritiService.ts (implementations)
  → withValidation.ts + withErrorHandler.ts
  → quizController.ts + prakritiController.ts
  → pages/api/quiz/questions.ts + pages/api/prakriti/score.ts
  → Verify: curl both endpoints, check typed responses

Step 3: Core utilities + hooks
  → apiClient.ts
  → features.ts
  → useQuiz.ts (test logic isolated before wiring to UI)
  → usePrakriti.ts
  → usePrakritiChat.ts (V2 stub)
  → useAuth.ts (V2 stub)
  → Verify: npx tsc --noEmit still passes

Step 4: Landing page
  → Navbar.tsx, Footer.tsx
  → HeroSection.tsx, HowItWorks.tsx, DoshaPreview.tsx, Testimonials.tsx
  → pages/index.tsx with getStaticProps
  → Verify: matches Stitch design at 375px and 1280px

Step 5: Quiz page
  → OptionButton.tsx, ProgressBar.tsx, QuizCard.tsx, SectionTransition.tsx
  → pages/quiz.tsx
  → Verify: full 25-question flow, section transitions, answer accumulation

Step 6: Results page
  → DoshaHero.tsx, DoshaChart.tsx
  → DietTab.tsx, RoutineTab.tsx, YogaTab.tsx, SeasonalTab.tsx
  → RecommendationTabs.tsx
  → pages/results.tsx
  → Verify: all 7 Prakriti types render, chart animates, tabs switch

Step 7: About page
  → pages/about.tsx
  → Verify: renders, CTA links to /quiz

Step 8: V2 hooks and polish
  → All "Coming in V2" UI states with feature flag gates
  → FEATURES.AI_CHAT → floating chat button (grayed, tooltip)
  → FEATURES.USER_PROFILES → "Save to Profile" (waitlist modal)
  → FEATURES.PDF_EXPORT → "Export PDF" (V2 modal)
  → Multilingual toggle in navbar (EN active, others "Coming soon")
  → Verify: all V2 touchpoints show correct locked state

Step 9: Final checks
  → npx tsc --noEmit — zero errors
  → npm run build — zero errors or warnings
  → Mobile responsive at 375px on all 4 pages
  → All 7 Prakriti types end-to-end
  → API error states show user-friendly messages
  → Lighthouse mobile score 90+
```

---

## What NOT to Do

- ❌ Do NOT use `any` type — enable `noImplicitAny: true` and keep it satisfied
- ❌ Do NOT use non-null assertion `!` without a comment explaining why it's safe
- ❌ Do NOT put business logic inside pages/ or components/
- ❌ Do NOT import from `src/backend/` in components or pages
  (only `src/pages/api/` talks to backend code)
- ❌ Do NOT use raw `fetch()` in components — use hooks + apiClient
- ❌ Do NOT use App Router or React Server Components — Pages Router only
- ❌ Do NOT hardcode dosha names, colors, or content as strings in components
  — drive everything from typed JSON data
- ❌ Do NOT use `useEffect` for data that could come from `getStaticProps`
- ❌ Do NOT create components over 150 lines — split them
- ❌ Do NOT use `React.FC` — use explicit return type `JSX.Element` instead
- ❌ Do NOT skip interface definitions — every prop object gets an interface

---

## V2 Backend Extraction Note

Add this comment to `src/backend/services/PrakritiService.ts`:

```typescript
/**
 * V2 EXTRACTION NOTE:
 * This service has zero Next.js dependencies and zero React dependencies.
 * To extract the entire backend to a standalone service:
 *
 * 1. Move src/backend/ to a new repository
 * 2. Add Express/Fastify and wrap controllers in HTTP router
 * 3. Update src/lib/apiClient.ts BASE_URL to point to new service URL
 * 4. Set NEXT_PUBLIC_APP_URL env var in Vercel to new service URL
 *
 * Zero other changes required. The interface contracts ensure
 * the frontend never knows or cares where the backend lives.
 */
```

---

## Definition of Done

The build is complete when ALL of these pass:

- [ ] `npx tsc --noEmit` — zero TypeScript errors
- [ ] `npm run build` — zero errors or warnings
- [ ] All 4 pages render and match Stitch design artifacts
- [ ] Both API endpoints return correctly typed responses
- [ ] Full quiz flow end-to-end: landing → quiz → results
- [ ] All 7 Prakriti result types render correctly on results page
- [ ] Mobile layout correct at 375px width on all pages
- [ ] All V2 stubs in place with "Coming Soon" UI states
- [ ] Feature flags set up and gating V2 UI correctly
- [ ] API error states show user-friendly inline messages
- [ ] `noImplicitAny` satisfied — zero `any` types in codebase
- [ ] No business logic found in components, pages, or API route files
- [ ] Lighthouse mobile score 90+ on landing and results pages

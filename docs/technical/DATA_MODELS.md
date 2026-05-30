# PrakritiMe — Data Models

All types are defined in [`src/types/index.ts`](../../src/types/index.ts). This document describes each type group, how they map to the JSON data files, and how they flow through the app.

---

## Core Dosha Types

```typescript
type DoshaSymbol       = 'V' | 'P' | 'K'
type PureDoshaType     = 'Vata' | 'Pitta' | 'Kapha'
type DualDoshaType     = 'Vata-Pitta' | 'Pitta-Kapha' | 'Vata-Kapha'
type PrakritiResultType = PureDoshaType | DualDoshaType | 'Tridoshic'
```

`DoshaSymbol` is the raw quiz answer stored per question. `PureDoshaType` and `DualDoshaType` are used for recommendation lookup. `PrakritiResultType` is the full union returned by scoring.

---

## Quiz Data (`data/questions.json`)

### `QuestionsData` (root shape)

```typescript
interface QuestionsData {
  _meta: QuizMeta
  sections: QuizSection[]
  scoringGuide: { ... }
}
```

### `QuizSection`

```typescript
interface QuizSection {
  id: string            // "physical_body"
  sectionNumber: number // 1–5
  title: string         // "Physical Body"
  sanskritTitle: string // "Sharira Prakriti"
  sanskrit: string      // "शरीर प्रकृति"
  description: string
  emoji: string         // "🌿"
  color: string         // "#F4A023" — section accent colour
  questions: QuizQuestion[]
}
```

### `QuizQuestion`

```typescript
interface QuizQuestion {
  id: string           // "Q01"
  sectionId: string    // "physical_body"
  questionNumber: number
  text: string         // The question displayed to the user
  hint?: string        // Optional italic sub-text below the question
  options: QuizOption[]
}
```

### `QuizOption`

```typescript
interface QuizOption {
  id: string        // "Q01A"
  dosha: DoshaSymbol // 'V' | 'P' | 'K' — hidden from user
  text: string       // Full option text
  shortLabel: string // Short version (used in V2 practitioner mode)
}
```

### `QuizMeta`

```typescript
interface QuizMeta {
  version: string          // "1.0.0"
  totalQuestions: number   // 25
  sections: number         // 5
  questionsPerSection: number // 5
  scoring: Record<string, string>
  notes: string
}
```

---

## Answer & Scoring Types

```typescript
type AnswerMap = Record<string, DoshaSymbol>
// { "Q01": "V", "Q02": "K", ... }

interface DoshaTally {
  V: number
  P: number
  K: number
}

interface DoshaScores {
  vata: number
  pitta: number
  kapha: number
}

interface DoshaPercentages {
  vata: number   // 0–100, rounded
  pitta: number
  kapha: number
}

interface PrakritiScore {
  resultType:  PrakritiResultType
  scores:      DoshaScores
  percentages: DoshaPercentages
  dominant:    PureDoshaType
  secondary:   PureDoshaType
}
```

---

## Recommendations Data (`data/recommendations.json`)

### Root shape

```typescript
interface RecommendationsData {
  _meta: { version, description, categories, doshaTypes }
  doshas:          Record<PureDoshaType, DoshaProfile>      // 3 entries
  dualDoshas:      Record<DualDoshaType | 'Tridoshic', DualDoshaProfile> // 4 entries
  generalPrinciples: {
    sixTastes: { description, tastes[] }
    dinacharya: { description, universalPractices[] }
  }
}
```

### `DoshaProfile` (pure dosha — Vata, Pitta, Kapha)

```typescript
interface DoshaProfile {
  id:                 string        // "vata"
  name:               PureDoshaType // "Vata"
  sanskrit:           string        // "वात"
  elements:           string[]      // ["Air", "Space"]
  elementsEmoji:      string[]      // ["🌬️", "🌌"]
  primaryColor:       string        // "#7EC8E3"
  secondaryColor:     string        // "#B0C4DE"
  gradientFrom:       string
  gradientTo:         string
  icon:               string        // "🌬️"
  tagline:            string
  heroDescription:    string
  keyTraits:          string[]
  balancedQualities:  string[]
  imbalancedQualities: string[]
  famousVataTypes:    string
  diet:               DietRecommendation
  routine:            RoutineRecommendation
  yoga:               YogaRecommendation
  seasonal:           SeasonalRecommendation
}
```

### `DualDoshaProfile` (dual + tridoshic)

```typescript
interface DualDoshaProfile {
  id:                         string               // "vata-pitta"
  name:                       DualDoshaType | 'Tridoshic'
  sanskrit:                   string               // "वात-पित्त"
  icon:                       string
  gradientFrom:               string
  gradientTo:                 string
  tagline:                    string
  heroDescription:            string
  keyTraits:                  string[]
  primaryBalance:             string               // Key balancing principle
  keyPractices:               string[]
  seasonalPriority:           string
  seeFullRecommendationsFor:  PureDoshaType[]      // ["Vata", "Pitta"]
}
```

Dual profiles do not carry their own diet/routine/yoga/seasonal data — those are resolved from the dominant pure dosha at query time.

### `DietRecommendation`

```typescript
interface DietRecommendation {
  principles: string[]
  tastes: {
    favor:  string[]  // ["Sweet", "Sour", "Salty"]
    reduce: string[]  // ["Bitter", "Astringent", "Pungent"]
  }
  favorFoods:    FoodItem[]  // 10 items
  minimizeFoods: FoodItem[]  // 6 items
}

interface FoodItem {
  name:   string  // "Warm milk with ghee"
  emoji:  string  // "🥛"
  reason: string  // "Deeply nourishing and calming for Vata"
}
```

### `RoutineRecommendation`

```typescript
interface RoutineRecommendation {
  principle:       string
  daily:           RoutineSlot[]    // 10 time slots
  weeklyPractices: string[]
}

interface RoutineSlot {
  time:     string  // "6:00 AM"
  activity: string  // "Abhyanga — warm sesame oil self-massage"
  detail:   string  // Extended description
  emoji:    string  // "🫙"
}
```

### `YogaRecommendation`

```typescript
interface YogaRecommendation {
  principle:  string
  style:      string  // "Slow Flow, Yin Yoga, or Hatha"
  intensity:  string
  poses:      YogaPose[]  // 6 poses
  breathwork: string
  avoid:      string
}

interface YogaPose {
  name:       string
  sanskrit:   string
  benefit:    string
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  emoji:      string
}
```

### `SeasonalRecommendation`

```typescript
interface SeasonalRecommendation {
  spring: SeasonTips
  summer: SeasonTips
  autumn: SeasonTips
  winter: SeasonTips
}

interface SeasonTips {
  season: string
  emoji:  string
  focus:  string
  tips:   string[]
  [key: string]: string | string[]  // allows extra dosha-level fields
}
```

---

## API Types

### Request / Response envelope

```typescript
interface ApiSuccess<T> { success: true;  data: T }
interface ApiError      { success: false; error: string; code: string }
type ApiResponse<T> = ApiSuccess<T> | ApiError
```

### Score endpoint

```typescript
interface ScoreRequestBody {
  answers: AnswerMap
}

interface ScoreResponseData extends PrakritiScore {
  recommendations: {
    profile: Pick<DoshaProfile,
      'name' | 'sanskrit' | 'icon' | 'tagline' | 'heroDescription' |
      'keyTraits' | 'gradientFrom' | 'gradientTo' |
      'primaryColor' | 'secondaryColor'
    >
    diet:     DietRecommendation
    routine:  RoutineRecommendation
    yoga:     YogaRecommendation
    seasonal: SeasonalRecommendation
  }
}
```

`ScoreResponseData` extends `PrakritiScore` so it carries `resultType`, `scores`, `percentages`, `dominant`, and `secondary` alongside recommendations.

---

## Hook Return Types

```typescript
interface UseQuizReturn {
  currentQuestion:  QuizQuestion
  currentSection:   QuizSection
  questionIndex:    number
  sectionIndex:     number
  progressPercent:  number        // 0–100
  answers:          AnswerMap
  selectedAnswer:   DoshaSymbol | null
  selectAnswer:     (questionId: string, dosha: DoshaSymbol) => void
  goNext:           () => void
  goPrev:           () => void
  isFirstQuestion:  boolean
  isLastQuestion:   boolean
  isComplete:       boolean       // true when all 25 answered and Next pressed
  canProceed:       boolean       // true when current question is answered
  isTransitioning:  boolean       // true during 1.6s section transition screen
}

interface UsePrakritiReturn {
  result:    ScoreResponseData | null
  isLoading: boolean
  error:     string | null
  scoreQuiz: (answers: AnswerMap) => Promise<void>
}
```

---

## Feature Flags

```typescript
interface FeatureFlags {
  AI_CHAT:       boolean  // NEXT_PUBLIC_FEATURE_AI_CHAT
  USER_PROFILES: boolean  // NEXT_PUBLIC_FEATURE_PROFILES
  PDF_EXPORT:    boolean  // NEXT_PUBLIC_FEATURE_PDF
  MULTILINGUAL:  boolean  // NEXT_PUBLIC_FEATURE_I18N
}
```

All default to `false` in `.env.local`. Set to `"true"` to activate V2 UI.

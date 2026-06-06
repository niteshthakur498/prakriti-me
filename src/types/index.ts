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
  /** Clinical weight — 2 for high-signal constitutional markers, 1 for standard. Default: 1 */
  weight?: number
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
  /** Number or descriptive string when sections have variable counts */
  questionsPerSection: number | string
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
  /** null when the second-highest dosha scored 0 (e.g. pure 25/0/0 result) */
  secondary: PureDoshaType | null
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

export type Season = 'spring' | 'summer' | 'autumn' | 'winter'

export interface SeasonTips {
  season: string
  emoji: string
  focus: string
  tips: string[]
  [key: string]: string | string[]
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
  famousTypes: string
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

export interface VikritiResponseData {
  /** Dominant currently-aggravated dosha */
  vikritiType: PureDoshaType
  scores: DoshaScores
  percentages: DoshaPercentages
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
  isTransitioning: boolean
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

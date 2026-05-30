import type { FeatureFlags } from '@/types'

export const FEATURES: FeatureFlags = {
  AI_CHAT:       process.env.NEXT_PUBLIC_FEATURE_AI_CHAT === 'true',
  USER_PROFILES: process.env.NEXT_PUBLIC_FEATURE_PROFILES === 'true',
  PDF_EXPORT:    process.env.NEXT_PUBLIC_FEATURE_PDF === 'true',
  MULTILINGUAL:  process.env.NEXT_PUBLIC_FEATURE_I18N === 'true',
}

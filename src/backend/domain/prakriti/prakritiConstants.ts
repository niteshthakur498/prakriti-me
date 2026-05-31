import type { PrakritiResultType } from '@/types'

/**
 * Weighted total = 41 (27 questions; high-signal questions carry weight 2, standard weight 1).
 * Thresholds scaled from original 25-point equal-weight system (×1.64):
 *   TRIDOSHIC_MAX_SPREAD: 3 → 5  (~12% of total)
 *   DUAL_MAX_SPREAD:      4 → 7  (~17% of total)
 */
export const DOSHA_THRESHOLDS = {
  TRIDOSHIC_MAX_SPREAD: 5,
  DUAL_MAX_SPREAD: 7,
  WEIGHTED_TOTAL: 41,
} as const

/**
 * Per-question weights. High-signal constitutional markers = 2, behavioural/lifestyle = 1.
 * Any question ID not listed here defaults to 1.
 */
export const QUESTION_WEIGHTS: Readonly<Record<string, number>> = {
  // Physical Body — Sharira Prakriti (highest clinical signal)
  Q01: 2, Q02: 2, Q03: 2, Q04: 2, Q05: 2,
  // Physical markers (new in v1.1)
  Q26: 2, Q27: 2,
  // Digestion — core constitutional markers
  Q06: 2, Q07: 2,
  // Sleep — strong constitutional signal
  Q11: 2, Q12: 2,
  // Mind/Emotions — core Manas Prakriti markers
  Q16: 2, Q17: 2, Q18: 2,
  // All other questions default to weight 1 (behavioural/lifestyle indicators)
}

export const RESULT_TYPES: Record<string, PrakritiResultType> = {
  VATA:        'Vata',
  PITTA:       'Pitta',
  KAPHA:       'Kapha',
  VATA_PITTA:  'Vata-Pitta',
  PITTA_KAPHA: 'Pitta-Kapha',
  VATA_KAPHA:  'Vata-Kapha',
  TRIDOSHIC:   'Tridoshic',
} as const

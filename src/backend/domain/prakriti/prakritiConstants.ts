import type { PrakritiResultType } from '@/types'

export const DOSHA_THRESHOLDS = {
  TRIDOSHIC_MAX_SPREAD: 3,
  DUAL_MAX_SPREAD: 4,
} as const

export const RESULT_TYPES: Record<string, PrakritiResultType> = {
  VATA:        'Vata',
  PITTA:       'Pitta',
  KAPHA:       'Kapha',
  VATA_PITTA:  'Vata-Pitta',
  PITTA_KAPHA: 'Pitta-Kapha',
  VATA_KAPHA:  'Vata-Kapha',
  TRIDOSHIC:   'Tridoshic',
} as const

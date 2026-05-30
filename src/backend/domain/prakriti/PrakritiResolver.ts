import { DOSHA_THRESHOLDS } from './prakritiConstants'
import type { DoshaTally, PrakritiResultType, PureDoshaType, DoshaPercentages } from '@/types'

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
    // ranked always has exactly 3 elements after sort
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

  getPercentages(tally: DoshaTally): DoshaPercentages {
    const total = tally.V + tally.P + tally.K
    if (total === 0) return { vata: 0, pitta: 0, kapha: 0 }
    return {
      vata:  Math.round((tally.V / total) * 100),
      pitta: Math.round((tally.P / total) * 100),
      kapha: Math.round((tally.K / total) * 100),
    }
  }

  getDominantAndSecondary(tally: DoshaTally): { dominant: PureDoshaType; secondary: PureDoshaType } {
    const ranked: RankedDosha[] = [
      { dosha: 'Vata',  score: tally.V },
      { dosha: 'Pitta', score: tally.P },
      { dosha: 'Kapha', score: tally.K },
    ].sort((a, b) => b.score - a.score) as RankedDosha[]

    const first = ranked[0]
    const second = ranked[1]
    if (!first || !second) throw new Error('Invalid tally')
    return { dominant: first.dosha, secondary: second.dosha }
  }
}

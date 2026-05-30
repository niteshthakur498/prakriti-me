import type { AnswerMap, DoshaTally } from '@/types'

export class PrakritiScorer {
  score(answers: AnswerMap): DoshaTally {
    const tally: DoshaTally = { V: 0, P: 0, K: 0 }
    Object.values(answers).forEach((dosha) => {
      // AnswerMap values are DoshaSymbol ('V'|'P'|'K') which are exact keys of DoshaTally
      const count = tally[dosha]
      tally[dosha] = (count ?? 0) + 1
    })
    return tally
  }
}

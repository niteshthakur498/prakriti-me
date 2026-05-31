import type { AnswerMap, DoshaTally } from '@/types'
import { QUESTION_WEIGHTS } from './prakritiConstants'

export class PrakritiScorer {
  score(answers: AnswerMap): DoshaTally {
    const tally: DoshaTally = { V: 0, P: 0, K: 0 }
    Object.entries(answers).forEach(([questionId, dosha]) => {
      // Apply clinical weight: high-signal questions count 2, standard count 1
      const weight = QUESTION_WEIGHTS[questionId] ?? 1
      const current = tally[dosha]
      tally[dosha] = (current ?? 0) + weight
    })
    return tally
  }
}

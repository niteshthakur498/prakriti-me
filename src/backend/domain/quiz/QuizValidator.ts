import type { AnswerMap, DoshaSymbol } from '@/types'

const VALID_DOSHAS: ReadonlySet<DoshaSymbol> = new Set<DoshaSymbol>(['V', 'P', 'K'])

export class QuizValidator {
  validateAnswers(answers: unknown): answers is AnswerMap {
    if (typeof answers !== 'object' || answers === null || Array.isArray(answers)) {
      return false
    }
    const map = answers as Record<string, unknown>
    return Object.values(map).every((v) => typeof v === 'string' && VALID_DOSHAS.has(v as DoshaSymbol))
  }

  validateAnswerCount(answers: AnswerMap, expectedCount = 25): boolean {
    return Object.keys(answers).length === expectedCount
  }
}

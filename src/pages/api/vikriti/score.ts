import type { NextApiRequest, NextApiResponse } from 'next'
import type { ApiResponse, AnswerMap, DoshaSymbol, VikritiResponseData } from '@/types'
import { withErrorHandler } from '@/backend/middleware/withErrorHandler'
import { withCors } from '@/backend/middleware/withCors'

const VALID_DOSHA_SYMBOLS = new Set<DoshaSymbol>(['V', 'P', 'K'])
const EXPECTED_QUESTIONS = 5

const DOSHA_NAME_MAP: Record<DoshaSymbol, 'Vata' | 'Pitta' | 'Kapha'> = {
  V: 'Vata',
  P: 'Pitta',
  K: 'Kapha',
}

function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<VikritiResponseData>>,
): void {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST'])
    res.status(405).json({ success: false, error: 'Method not allowed', code: 'METHOD_NOT_ALLOWED' })
    return
  }

  const { answers } = req.body as { answers?: unknown }

  // Validate answers object
  if (!answers || typeof answers !== 'object' || Array.isArray(answers)) {
    res.status(400).json({ success: false, error: 'Invalid request — answers must be an object', code: 'INVALID_ANSWERS' })
    return
  }

  const answerMap = answers as Record<string, unknown>
  const questionIds = Object.keys(answerMap)

  if (questionIds.length !== EXPECTED_QUESTIONS) {
    res.status(400).json({
      success: false,
      error: `Expected exactly ${EXPECTED_QUESTIONS} answers, received ${questionIds.length}`,
      code: 'INVALID_ANSWER_COUNT',
    })
    return
  }

  // Validate all values are valid dosha symbols
  for (const [qId, value] of Object.entries(answerMap)) {
    if (!VALID_DOSHA_SYMBOLS.has(value as DoshaSymbol)) {
      res.status(400).json({
        success: false,
        error: `Invalid dosha symbol for ${qId}: must be V, P, or K`,
        code: 'INVALID_DOSHA_SYMBOL',
      })
      return
    }
  }

  // Score: simple equal-weight tally (5 Vikriti questions, no weighting needed)
  const tally = { V: 0, P: 0, K: 0 }
  for (const symbol of Object.values(answerMap as AnswerMap)) {
    tally[symbol] = (tally[symbol] ?? 0) + 1
  }

  const total = tally.V + tally.P + tally.K

  // Determine dominant vikriti dosha
  interface RankedDosha { symbol: DoshaSymbol; score: number }
  const ranked: RankedDosha[] = [
    { symbol: 'V' as DoshaSymbol, score: tally.V },
    { symbol: 'P' as DoshaSymbol, score: tally.P },
    { symbol: 'K' as DoshaSymbol, score: tally.K },
  ].sort((a: RankedDosha, b: RankedDosha) => b.score - a.score)

  const top = ranked[0]
  if (!top) {
    res.status(500).json({ success: false, error: 'Scoring failed', code: 'SCORING_ERROR' })
    return
  }

  const vikritiType = DOSHA_NAME_MAP[top.symbol]

  const data: VikritiResponseData = {
    vikritiType,
    scores: { vata: tally.V, pitta: tally.P, kapha: tally.K },
    percentages: {
      vata: total > 0 ? Math.round((tally.V / total) * 100) : 0,
      pitta: total > 0 ? Math.round((tally.P / total) * 100) : 0,
      kapha: total > 0 ? Math.round((tally.K / total) * 100) : 0,
    },
  }

  res.status(200).json({ success: true, data })
}

export default withCors(withErrorHandler(handler))

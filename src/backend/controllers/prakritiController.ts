import type { NextApiRequest, NextApiResponse } from 'next'
import type { ApiResponse, ScoreResponseData, ScoreRequestBody, ApiError } from '@/types'
import { PrakritiService } from '../services/PrakritiService'
import { PrakritiScorer } from '../domain/prakriti/PrakritiScorer'
import { PrakritiResolver } from '../domain/prakriti/PrakritiResolver'
import { RecommendationRepository } from '../repositories/RecommendationRepository'
import { QuizValidator } from '../domain/quiz/QuizValidator'
import { withValidation } from '../middleware/withValidation'
import { withErrorHandler } from '../middleware/withErrorHandler'

const prakritiService = new PrakritiService(
  new PrakritiScorer(),
  new PrakritiResolver(),
  new RecommendationRepository(),
)

const validator = new QuizValidator()

async function scoreHandler(req: NextApiRequest, res: NextApiResponse<ApiResponse<ScoreResponseData>>) {
  const body = req.body as ScoreRequestBody

  if (!body?.answers || !validator.validateAnswers(body.answers)) {
    const error: ApiError = {
      success: false,
      error: 'Invalid answers — must be a map of question IDs to dosha symbols (V/P/K)',
      code: 'INVALID_ANSWERS',
    }
    res.status(400).json(error)
    return
  }

  const data = await prakritiService.scoreAndRecommend(body.answers)
  res.status(200).json({ success: true, data })
}

export const prakritiController = {
  score: withValidation(withErrorHandler(scoreHandler), ['POST']),
}

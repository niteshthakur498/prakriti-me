import type { NextApiRequest, NextApiResponse } from 'next'
import type { ApiResponse, QuestionsResponseData } from '@/types'
import { QuizService } from '../services/QuizService'
import { QuestionRepository } from '../repositories/QuestionRepository'
import { QuizValidator } from '../domain/quiz/QuizValidator'
import { withValidation } from '../middleware/withValidation'
import { withErrorHandler } from '../middleware/withErrorHandler'

const quizService = new QuizService(
  new QuestionRepository(),
  new QuizValidator(),
)

async function getQuestionsHandler(req: NextApiRequest, res: NextApiResponse<ApiResponse<QuestionsResponseData>>) {
  const data = await quizService.getQuestions()
  res.status(200).json({ success: true, data })
}

export const quizController = {
  getQuestions: withValidation(withErrorHandler(getQuestionsHandler), ['GET']),
}

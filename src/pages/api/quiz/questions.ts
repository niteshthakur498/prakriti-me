import type { NextApiRequest, NextApiResponse } from 'next'
import { quizController } from '@/backend/controllers/quizController'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  return quizController.getQuestions(req, res)
}

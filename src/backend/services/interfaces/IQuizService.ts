import type { AnswerMap, QuestionsResponseData } from '@/types'

export interface IQuizService {
  getQuestions(): Promise<QuestionsResponseData>
  validateAnswers(answers: AnswerMap): boolean
}

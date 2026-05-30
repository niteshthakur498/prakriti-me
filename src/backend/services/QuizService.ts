import type { AnswerMap, QuestionsResponseData } from '@/types'
import type { IQuizService } from './interfaces/IQuizService'
import type { IQuestionRepository } from '../repositories/interfaces/IQuestionRepository'
import { QuizValidator } from '../domain/quiz/QuizValidator'

export class QuizService implements IQuizService {
  constructor(
    private readonly questionRepo: IQuestionRepository,
    private readonly validator: QuizValidator,
  ) {}

  async getQuestions(): Promise<QuestionsResponseData> {
    const [sections, meta] = await Promise.all([
      this.questionRepo.getAll(),
      this.questionRepo.getMeta(),
    ])
    return {
      sections,
      totalQuestions: meta.totalQuestions,
      meta,
    }
  }

  validateAnswers(answers: AnswerMap): boolean {
    return this.validator.validateAnswers(answers)
  }
}

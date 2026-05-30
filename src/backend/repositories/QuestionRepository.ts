import type { QuizSection, QuizQuestion, QuizMeta } from '@/types'
import type { IQuestionRepository } from './interfaces/IQuestionRepository'
import questionsData from '../../../data/questions.json'

export class QuestionRepository implements IQuestionRepository {
  async getAll(): Promise<QuizSection[]> {
    return questionsData.sections as QuizSection[]
  }

  async getById(id: string): Promise<QuizQuestion | null> {
    for (const section of questionsData.sections) {
      const q = section.questions.find((q) => q.id === id)
      if (q) return q as QuizQuestion
    }
    return null
  }

  async getBySection(sectionId: string): Promise<QuizQuestion[]> {
    const section = questionsData.sections.find((s) => s.id === sectionId)
    return (section?.questions ?? []) as QuizQuestion[]
  }

  async getMeta(): Promise<QuizMeta> {
    return questionsData._meta as QuizMeta
  }
}

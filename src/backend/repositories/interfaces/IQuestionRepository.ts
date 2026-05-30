import type { QuizSection, QuizQuestion, QuizMeta } from '@/types'

export interface IQuestionRepository {
  getAll(): Promise<QuizSection[]>
  getById(id: string): Promise<QuizQuestion | null>
  getBySection(sectionId: string): Promise<QuizQuestion[]>
  getMeta(): Promise<QuizMeta>
}

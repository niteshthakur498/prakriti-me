import type { AnswerMap, ScoreResponseData } from '@/types'

export interface IPrakritiService {
  scoreAndRecommend(answers: AnswerMap): Promise<ScoreResponseData>
}

import type { PrakritiResultType, DoshaProfile, DualDoshaProfile, PureDoshaType } from '@/types'

export interface IRecommendationRepository {
  getByDoshaType(doshaType: PrakritiResultType): Promise<DoshaProfile | DualDoshaProfile>
  getAllDoshaProfiles(): Promise<Record<PureDoshaType, DoshaProfile>>
}

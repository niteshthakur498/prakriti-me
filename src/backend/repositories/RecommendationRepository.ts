import type { PrakritiResultType, DoshaProfile, DualDoshaProfile, PureDoshaType } from '@/types'
import type { IRecommendationRepository } from './interfaces/IRecommendationRepository'
import recommendationsData from '../../../data/recommendations.json'

const PURE_DOSHAS: ReadonlySet<string> = new Set(['Vata', 'Pitta', 'Kapha'])

export class RecommendationRepository implements IRecommendationRepository {
  async getByDoshaType(doshaType: PrakritiResultType): Promise<DoshaProfile | DualDoshaProfile> {
    if (PURE_DOSHAS.has(doshaType)) {
      const key = doshaType as PureDoshaType
      const doshas = recommendationsData.doshas as Record<string, unknown>
      const profile = doshas[key]
      if (!profile) throw new Error(`Unknown dosha type: ${doshaType}`)
      return profile as DoshaProfile
    }
    const dualDoshas = recommendationsData.dualDoshas as Record<string, unknown>
    const profile = dualDoshas[doshaType]
    if (!profile) throw new Error(`Unknown dual dosha type: ${doshaType}`)
    return profile as DualDoshaProfile
  }

  async getAllDoshaProfiles(): Promise<Record<PureDoshaType, DoshaProfile>> {
    return recommendationsData.doshas as Record<PureDoshaType, DoshaProfile>
  }
}

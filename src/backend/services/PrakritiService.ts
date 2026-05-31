/**
 * V2 EXTRACTION NOTE:
 * This service has zero Next.js dependencies and zero React dependencies.
 * To extract the entire backend to a standalone service:
 *
 * 1. Move src/backend/ to a new repository
 * 2. Add Express/Fastify and wrap controllers in HTTP router
 * 3. Update src/lib/apiClient.ts BASE_URL to point to new service URL
 * 4. Set NEXT_PUBLIC_APP_URL env var in Vercel to new service URL
 *
 * Zero other changes required. The interface contracts ensure
 * the frontend never knows or cares where the backend lives.
 */

import type { AnswerMap, ScoreResponseData, DoshaProfile, DualDoshaProfile, PureDoshaType } from '@/types'
import type { IPrakritiService } from './interfaces/IPrakritiService'
import type { IRecommendationRepository } from '../repositories/interfaces/IRecommendationRepository'
import { PrakritiScorer } from '../domain/prakriti/PrakritiScorer'
import { PrakritiResolver } from '../domain/prakriti/PrakritiResolver'

const PURE_DOSHAS: ReadonlySet<string> = new Set(['Vata', 'Pitta', 'Kapha'])

function isPureDosha(profile: DoshaProfile | DualDoshaProfile): profile is DoshaProfile {
  return PURE_DOSHAS.has(profile.name)
}

export class PrakritiService implements IPrakritiService {
  constructor(
    private readonly scorer: PrakritiScorer,
    private readonly resolver: PrakritiResolver,
    private readonly recommendationRepo: IRecommendationRepository,
  ) {}

  async scoreAndRecommend(answers: AnswerMap): Promise<ScoreResponseData> {
    const tally = this.scorer.score(answers)
    const resultType = this.resolver.resolve(tally)
    const percentages = this.resolver.getPercentages(tally)
    const { dominant, secondary: rawSecondary } = this.resolver.getDominantAndSecondary(tally)
    const secondaryScore = rawSecondary === 'Vata' ? tally.V : rawSecondary === 'Pitta' ? tally.P : tally.K
    // Suppress secondary when it scored 0 — reporting "secondary: Vata" on a 25/0/0 result is misleading
    const secondary: PureDoshaType | null = secondaryScore === 0 ? null : rawSecondary

    const rawProfile = await this.recommendationRepo.getByDoshaType(resultType)

    // For dual/tridoshic types, pull diet/routine/yoga/seasonal from the dominant dosha
    let dietSource: DoshaProfile
    if (isPureDosha(rawProfile)) {
      dietSource = rawProfile
    } else {
      const dominantProfile = await this.recommendationRepo.getByDoshaType(dominant)
      if (!isPureDosha(dominantProfile)) throw new Error('Dominant profile must be pure dosha')
      dietSource = dominantProfile
    }

    const profileName = isPureDosha(rawProfile) ? rawProfile.name : (rawProfile.name as PureDoshaType)

    return {
      resultType,
      scores: { vata: tally.V, pitta: tally.P, kapha: tally.K },
      percentages,
      dominant,
      secondary,
      recommendations: {
        profile: {
          name: profileName as PureDoshaType,
          sanskrit: rawProfile.name === 'Tridoshic' ? 'त्रिदोषिक' : rawProfile.name,
          icon: rawProfile.icon,
          tagline: rawProfile.tagline,
          heroDescription: rawProfile.heroDescription,
          keyTraits: rawProfile.keyTraits,
          gradientFrom: rawProfile.gradientFrom,
          gradientTo: rawProfile.gradientTo,
          primaryColor: isPureDosha(rawProfile) ? rawProfile.primaryColor : dietSource.primaryColor,
          secondaryColor: isPureDosha(rawProfile) ? rawProfile.secondaryColor : dietSource.secondaryColor,
        },
        diet: dietSource.diet,
        routine: dietSource.routine,
        yoga: dietSource.yoga,
        seasonal: dietSource.seasonal,
      },
    }
  }
}

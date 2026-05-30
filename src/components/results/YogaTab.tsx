import type { YogaRecommendation, YogaPose } from '@/types'

interface YogaTabProps {
  yoga: YogaRecommendation
}

const DIFFICULTY_COLORS: Record<string, string> = {
  Beginner:     'bg-secondary-fixed text-on-secondary-fixed',
  Intermediate: 'bg-primary-fixed text-on-primary-fixed',
  Advanced:     'bg-error-container text-on-error-container',
}

export function YogaTab({ yoga }: YogaTabProps): JSX.Element {
  return (
    <div className="space-y-6">
      <div className="bg-primary-container/20 border border-primary-container rounded-xl p-5">
        <p className="text-body-md text-on-surface italic mb-3">{yoga.principle}</p>
        <div className="flex flex-wrap gap-4 text-label-md font-semibold">
          <span className="text-on-surface-variant">Style: <span className="text-primary">{yoga.style}</span></span>
          <span className="text-on-surface-variant">Intensity: <span className="text-primary">{yoga.intensity}</span></span>
        </div>
      </div>

      <div>
        <h3 className="font-display text-headline-md font-semibold text-on-surface mb-4">Recommended Poses</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {yoga.poses.map((pose: YogaPose) => {
            const diffColor = DIFFICULTY_COLORS[pose.difficulty] ?? DIFFICULTY_COLORS['Beginner'] ?? ''
            return (
              <div key={pose.name} className="bg-surface border border-outline-variant rounded-xl p-4 flex gap-3">
                <span className="text-3xl flex-shrink-0">{pose.emoji}</span>
                <div>
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <p className="text-label-md font-semibold text-on-surface">{pose.name}</p>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${diffColor}`}>
                      {pose.difficulty}
                    </span>
                  </div>
                  <p className="text-xs text-primary font-medium italic">{pose.sanskrit}</p>
                  <p className="text-xs text-on-surface-variant mt-1">{pose.benefit}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="bg-secondary-container/20 border border-secondary/20 rounded-xl p-5">
        <h3 className="font-display text-headline-md font-semibold text-secondary mb-2">Breathwork</h3>
        <p className="text-body-md text-on-surface-variant">{yoga.breathwork}</p>
      </div>

      <div className="bg-error-container/10 border border-error/20 rounded-xl p-4">
        <p className="text-label-md font-semibold text-error mb-1">Avoid</p>
        <p className="text-body-md text-on-surface-variant">{yoga.avoid}</p>
      </div>
    </div>
  )
}

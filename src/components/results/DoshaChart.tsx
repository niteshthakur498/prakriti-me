import React, { useEffect, useRef } from 'react'
import type { DoshaPercentages } from '@/types'

interface DoshaChartProps {
  percentages: DoshaPercentages
}

export const DoshaChart = React.memo(function DoshaChart({ percentages }: DoshaChartProps): JSX.Element {
  const vataRef = useRef<HTMLDivElement>(null)
  const pittaRef = useRef<HTMLDivElement>(null)
  const kaphaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      if (vataRef.current) vataRef.current.style.width = `${percentages.vata}%`
      if (pittaRef.current) pittaRef.current.style.width = `${percentages.pitta}%`
      if (kaphaRef.current) kaphaRef.current.style.width = `${percentages.kapha}%`
    }, 200)
    return () => clearTimeout(timer)
  }, [percentages])

  return (
    <article className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 sun-shadow">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-headline-md font-semibold text-on-surface">Dosha Breakdown</h2>
        <span className="text-2xl" aria-hidden>📊</span>
      </div>

      {/* Stacked bar */}
      <div
        className="relative w-full h-12 bg-surface-container rounded-full flex overflow-hidden mb-4 border border-outline-variant/30"
        role="img"
        aria-label={`Dosha breakdown: Vata ${percentages.vata}%, Pitta ${percentages.pitta}%, Kapha ${percentages.kapha}%`}
      >
        <div
          ref={vataRef}
          className="dosha-bar h-full bg-primary-container flex items-center justify-center text-[10px] font-bold text-on-primary-container"
          aria-hidden
        >
          {percentages.vata > 10 && `Vata ${percentages.vata}%`}
        </div>
        <div
          ref={pittaRef}
          className="dosha-bar h-full bg-tertiary flex items-center justify-center text-[10px] font-bold text-on-tertiary"
          aria-hidden
        >
          {percentages.pitta > 10 && `Pitta ${percentages.pitta}%`}
        </div>
        <div
          ref={kaphaRef}
          className="dosha-bar h-full bg-secondary flex items-center justify-center text-[10px] font-bold text-on-secondary"
          aria-hidden
        >
          {percentages.kapha > 10 && `Kapha ${percentages.kapha}%`}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mt-4">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-primary-container flex-shrink-0" />
          <span className="text-label-md font-semibold text-on-surface">Vata {percentages.vata}%</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-tertiary flex-shrink-0" />
          <span className="text-label-md font-semibold text-on-surface">Pitta {percentages.pitta}%</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-secondary flex-shrink-0" />
          <span className="text-label-md font-semibold text-on-surface">Kapha {percentages.kapha}%</span>
        </div>
      </div>
    </article>
  )
})

interface ProgressBarProps {
  percent: number
  sectionLabel: string
  sectionCount: number
  currentSection: number
  questionNumber: number
  totalQuestions: number
}

export function ProgressBar({
  percent,
  sectionLabel,
  sectionCount,
  currentSection,
  questionNumber,
  totalQuestions,
}: ProgressBarProps): JSX.Element {
  return (
    <div className="space-y-3">
      <div className="flex justify-between items-end">
        <div>
          <span className="text-label-md text-primary uppercase tracking-wider block mb-1 font-semibold">
            Section {currentSection} of {sectionCount}
          </span>
          <h2 className="font-display text-headline-md font-semibold text-on-surface">{sectionLabel}</h2>
        </div>
        <span className="text-label-md text-on-surface-variant font-semibold">
          Question {questionNumber} of {totalQuestions}
        </span>
      </div>
      <div className="w-full h-2 bg-surface-container-highest rounded-full overflow-hidden">
        <div
          className="h-full saffron-gradient rounded-full progress-fill"
          style={{ width: `${percent}%` }}
          role="progressbar"
          aria-valuenow={percent}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`Quiz progress: ${percent}%`}
        />
      </div>
    </div>
  )
}

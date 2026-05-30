import type { DoshaSymbol } from '@/types'

interface OptionButtonProps {
  id: string
  text: string
  dosha: DoshaSymbol
  isSelected: boolean
  label: string
  onSelect: (dosha: DoshaSymbol) => void
}

const LABELS = ['A', 'B', 'C']

export function OptionButton({
  id,
  text,
  dosha,
  isSelected,
  label,
  onSelect,
}: OptionButtonProps): JSX.Element {
  const letterIndex = dosha === 'V' ? 0 : dosha === 'P' ? 1 : 2
  const letter = LABELS[letterIndex] ?? 'A'

  return (
    <button
      id={id}
      type="button"
      onClick={() => onSelect(dosha)}
      className={`option-button w-full text-left p-6 border-2 rounded-xl transition-all duration-300 flex items-center justify-between group ${
        isSelected
          ? 'selected border-primary bg-surface-container-low shadow-md'
          : 'border-outline-variant hover:border-primary-container hover:bg-surface-container-low'
      }`}
      aria-pressed={isSelected}
    >
      <div className="flex items-center gap-4">
        <span
          className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-label-md transition-colors flex-shrink-0 ${
            isSelected
              ? 'bg-primary text-on-primary'
              : 'bg-surface-container-high text-primary group-hover:bg-primary group-hover:text-on-primary'
          }`}
        >
          {letter}
        </span>
        <span className="text-body-lg text-on-surface font-medium">{text}</span>
      </div>
      {isSelected && (
        <span className="text-primary text-xl flex-shrink-0" aria-hidden>✓</span>
      )}
    </button>
  )
}

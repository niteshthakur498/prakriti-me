import type { QuizQuestion, QuizSection, QuizOption, DoshaSymbol } from '@/types'
import { OptionButton } from './OptionButton'

interface QuizCardProps {
  question: QuizQuestion
  section: QuizSection
  selectedAnswer: DoshaSymbol | null
  onSelect: (questionId: string, dosha: DoshaSymbol) => void
}

export function QuizCard({ question, section, selectedAnswer, onSelect }: QuizCardProps): JSX.Element {
  return (
    <div className="bg-surface-container-lowest p-6 md:p-10 rounded-xl sun-shadow border border-outline-variant/30 relative overflow-hidden">
      <div className="absolute top-0 right-0 p-4 opacity-10 text-6xl select-none pointer-events-none" aria-hidden>
        {section.emoji}
      </div>

      <div className="space-y-2 mb-8">
        <p className="font-sanskrit text-xl text-primary opacity-70 italic">
          {section.sanskritTitle} — {section.sanskrit}
        </p>
        {question.hint && (
          <p className="text-label-md text-on-surface-variant italic">{question.hint}</p>
        )}
        <h3 className="font-display text-2xl md:text-3xl font-bold text-on-surface leading-tight">
          {question.text}
        </h3>
      </div>

      <div className="grid grid-cols-1 gap-4" role="radiogroup" aria-label="Answer options">
        {question.options.map((option: QuizOption) => (
          <OptionButton
            key={option.id}
            id={option.id}
            text={option.text}
            dosha={option.dosha}
            isSelected={selectedAnswer === option.dosha}
            label={option.shortLabel}
            onSelect={(dosha) => onSelect(question.id, dosha)}
          />
        ))}
      </div>
    </div>
  )
}

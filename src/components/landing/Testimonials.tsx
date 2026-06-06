import { useTranslations } from 'next-intl'

const TESTIMONIALS = [
  {
    initials: 'AR',
    color: 'bg-[#0ea5e9]/20 text-[#0369a1]',
    quote: '"Finding out I was 80% Vata explained so much about my sleep patterns. The routine suggested here changed my life in two weeks."',
    author: '— Ananya R., Artist',
  },
  {
    initials: 'MS',
    color: 'bg-[#f97316]/20 text-[#9a3412]',
    quote: '"I always felt \'too intense\' until I understood my Pitta nature. Now I know how to cool my fire through diet instead of fighting it."',
    author: '— Michael S., Entrepreneur',
  },
  {
    initials: 'KV',
    color: 'bg-[#22c55e]/20 text-[#166534]',
    quote: '"The Kapha morning routine is tough at first but the energy I have now is incredible. Classical Ayurveda simplified for today."',
    author: '— Kavita V., Yoga Teacher',
  },
]

export function Testimonials(): JSX.Element {
  const t = useTranslations('home')

  return (
    <section className="py-16 bg-surface-container">
      <div className="max-w-[1200px] mx-auto px-5 md:px-10">
        <div className="text-center mb-14">
          <h2 className="font-display text-headline-lg font-bold text-on-surface">{t('testimonialsHeading')}</h2>
          <p className="text-on-surface-variant text-body-md mt-2">{t('testimonialsSubtitle')}</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((item) => (
            <div key={item.author} className="bg-surface p-10 rounded-3xl sun-shadow">
              <div className={`w-12 h-12 rounded-full ${item.color} flex items-center justify-center font-bold mb-6`}>
                {item.initials}
              </div>
              <p className="text-body-md text-on-surface italic mb-6">{item.quote}</p>
              <p className="text-label-md text-on-surface-variant font-semibold">{item.author}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

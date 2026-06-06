import Link from 'next/link'
import { useTranslations } from 'next-intl'

interface DoshaCard {
  name: string
  sanskrit: string
  tagline: string
  heroDescription: string
  keyTraits: string[]
  icon: string
  primaryColor: string
  gradientFrom: string
  gradientTo: string
}

interface DoshaPreviewProps {
  doshaProfiles: DoshaCard[]
}

const DOSHA_STYLES: Record<string, { bg: string; ring: string; text: string; sub: string }> = {
  Vata:  { bg: 'bg-[#e0f2fe]', ring: 'ring-[#0ea5e9]', text: 'text-[#0c4a6e]', sub: 'text-[#0369a1]' },
  Pitta: { bg: 'bg-[#ffedd5]', ring: 'ring-[#f97316]', text: 'text-[#7c2d12]', sub: 'text-[#9a3412]' },
  Kapha: { bg: 'bg-[#dcfce7]', ring: 'ring-[#22c55e]', text: 'text-[#064e3b]', sub: 'text-[#166534]' },
}

export function DoshaPreview({ doshaProfiles }: DoshaPreviewProps): JSX.Element {
  const t = useTranslations('home')

  return (
    <section className="py-16">
      <div className="max-w-[1200px] mx-auto px-5 md:px-10">
        <div className="flex justify-between items-end mb-12">
          <div className="max-w-xl">
            <h2 className="font-display text-headline-lg font-bold text-on-surface mb-4">{t('doshaSectionHeading')}</h2>
            <p className="text-on-surface-variant text-body-md">{t('doshaSectionDesc')}</p>
          </div>
          <Link href="/about#doshas" className="hidden md:block text-primary text-label-md font-semibold hover:underline">
            {t('learnMoreLink')}
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {doshaProfiles.map((dosha) => {
            const styles = DOSHA_STYLES[dosha.name] ?? DOSHA_STYLES['Vata']
            if (!styles) return null
            return (
              <div
                key={dosha.name}
                className={`group relative ${styles.bg} rounded-[2.5rem] p-8 overflow-hidden transition-all duration-500 hover:ring-2 ${styles.ring}`}
              >
                <div className="flex justify-between items-start mb-8">
                  <span className="text-4xl">{dosha.icon}</span>
                  <span className={`font-sanskrit text-lg ${styles.sub}`}>{dosha.sanskrit}</span>
                </div>
                <h3 className={`font-display text-headline-md font-bold ${styles.text} mb-2`}>{dosha.name}</h3>
                <p className={`text-label-md font-semibold ${styles.sub} mb-5 tracking-widest uppercase`}>
                  {dosha.tagline}
                </p>
                <p className={`${styles.text} text-body-md mb-7`}>{dosha.heroDescription.slice(0, 120)}...</p>
                <ul className="space-y-2">
                  {dosha.keyTraits.slice(0, 3).map((trait) => (
                    <li key={trait} className={`flex items-center gap-2 ${styles.text} text-label-md font-semibold`}>
                      <span className="w-1.5 h-1.5 rounded-full bg-current flex-shrink-0" />
                      {trait}
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

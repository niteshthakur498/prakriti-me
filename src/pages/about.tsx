import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'

const DOSHAS = [
  {
    name: 'Vata',
    icon: '🌬️',
    elements: 'Air & Space',
    tagline: 'The force of movement and creativity',
    description: 'Vata governs all movement in the body — breathing, circulation, nerve impulses, and the movement of thoughts. When in balance, Vata types are creative, enthusiastic, and joyful. When out of balance, they can experience anxiety, insomnia, and digestive irregularities.',
    qualities: ['Light', 'Dry', 'Cold', 'Mobile', 'Subtle', 'Rough'],
    bg: 'bg-[#e0f2fe]',
    text: 'text-[#0c4a6e]',
    sub: 'text-[#0369a1]',
    border: 'border-[#7dd3fc]',
  },
  {
    name: 'Pitta',
    icon: '🔥',
    elements: 'Fire & Water',
    tagline: 'The force of metabolism and transformation',
    description: 'Pitta governs digestion, metabolism, and transformation. It controls how we process food, thoughts, and experiences. Balanced Pitta types are intelligent, decisive, and focused. Imbalanced Pitta manifests as anger, inflammation, and perfectionism.',
    qualities: ['Hot', 'Sharp', 'Oily', 'Light', 'Mobile', 'Liquid'],
    bg: 'bg-[#ffedd5]',
    text: 'text-[#7c2d12]',
    sub: 'text-[#9a3412]',
    border: 'border-[#fdba74]',
  },
  {
    name: 'Kapha',
    icon: '🌱',
    elements: 'Earth & Water',
    tagline: 'The force of structure and nourishment',
    description: 'Kapha provides the physical structure and lubrication for the body. It governs growth, strength, and immunity. Balanced Kapha types are calm, loving, and strong. Out of balance, they can become lethargic, resistant to change, or prone to congestion.',
    qualities: ['Heavy', 'Slow', 'Cool', 'Oily', 'Smooth', 'Dense'],
    bg: 'bg-[#dcfce7]',
    text: 'text-[#064e3b]',
    sub: 'text-[#166534]',
    border: 'border-[#86efac]',
  },
]

const AboutPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>What is Prakriti? — PrakritiMe</title>
        <meta name="description" content="Learn about Ayurveda, Prakriti (mind-body constitution), and the three doshas: Vata, Pitta, and Kapha." />
      </Head>

      <Navbar />

      <main className="pt-20">
        {/* Hero */}
        <section className="py-20 bg-gradient-to-br from-primary-container/30 to-secondary-container/20">
          <div className="max-w-[1200px] mx-auto px-5 md:px-10 text-center">
            <p className="font-sanskrit text-3xl text-primary opacity-70 mb-4">प्रकृति</p>
            <h1 className="font-display text-5xl md:text-6xl font-bold text-on-surface mb-6">What is Prakriti?</h1>
            <p className="text-body-lg text-on-surface-variant max-w-2xl mx-auto mb-10">
              Prakriti (Sanskrit: प्रकृति) means your innate nature — the unique combination of three bio-energies (doshas) that was established at conception and defines your mind-body constitution for life.
            </p>
            <Link
              href="/quiz"
              className="cta-pulse inline-flex items-center gap-2 bg-primary-container text-on-primary-container px-8 py-4 rounded-full text-label-md font-semibold sun-shadow hover:brightness-105 transition-all"
            >
              Discover Your Prakriti →
            </Link>
          </div>
        </section>

        {/* What is Ayurveda */}
        <section className="py-16 bg-surface">
          <div className="max-w-[800px] mx-auto px-5 md:px-10">
            <h2 className="font-display text-headline-lg font-bold text-on-surface mb-6">The Science of Life</h2>
            <p className="text-body-lg text-on-surface-variant mb-5">
              Ayurveda (Sanskrit: आयुर्वेद) is one of the world&apos;s oldest holistic healing systems, developed in India over 5,000 years ago. The word literally means the &quot;science of life&quot; (Ayur = life, Veda = science or knowledge).
            </p>
            <p className="text-body-lg text-on-surface-variant mb-5">
              Unlike modern medicine which focuses on treating disease, Ayurveda focuses on maintaining health by understanding and working with your unique constitution. At its core is the belief that each person has a unique combination of energies that influences everything from digestion to personality.
            </p>
            <p className="text-body-lg text-on-surface-variant">
              Your Prakriti — your individual constitution — is determined at birth and remains constant throughout your life. Understanding it is the foundation of Ayurvedic self-care.
            </p>
          </div>
        </section>

        {/* Three Doshas */}
        <section id="doshas" className="py-16 bg-surface-container-low">
          <div className="max-w-[1200px] mx-auto px-5 md:px-10">
            <div className="text-center mb-14">
              <h2 className="font-display text-headline-lg font-bold text-on-surface mb-4">The Three Doshas</h2>
              <p className="text-body-lg text-on-surface-variant max-w-xl mx-auto">
                Every person is born with all three doshas, but in different proportions. The dominant dosha(s) define your Prakriti.
              </p>
            </div>
            <div className="space-y-8">
              {DOSHAS.map((dosha) => (
                <div key={dosha.name} className={`${dosha.bg} border ${dosha.border} rounded-3xl p-8 md:p-10`}>
                  <div className="flex items-start gap-6 flex-wrap">
                    <div className="flex-shrink-0">
                      <span className="text-6xl">{dosha.icon}</span>
                    </div>
                    <div className="flex-grow">
                      <div className="flex items-baseline gap-4 mb-2 flex-wrap">
                        <h3 className={`font-display text-3xl font-bold ${dosha.text}`}>{dosha.name}</h3>
                        <span className={`text-label-md font-semibold ${dosha.sub} uppercase tracking-widest`}>{dosha.elements}</span>
                      </div>
                      <p className={`${dosha.sub} text-label-md font-semibold mb-4`}>{dosha.tagline}</p>
                      <p className={`${dosha.text} text-body-md mb-5`}>{dosha.description}</p>
                      <div>
                        <p className={`text-label-md font-semibold ${dosha.sub} mb-2 uppercase tracking-wider`}>Key Qualities</p>
                        <div className="flex flex-wrap gap-2">
                          {dosha.qualities.map((q) => (
                            <span key={q} className={`bg-white/60 px-3 py-1 rounded-full text-label-md font-semibold ${dosha.text}`}>{q}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 text-center bg-gradient-to-b from-background to-primary-fixed/20">
          <div className="max-w-[600px] mx-auto px-5">
            <h2 className="font-display text-headline-lg font-bold text-on-surface mb-4">Ready to Know Your Constitution?</h2>
            <p className="text-body-lg text-on-surface-variant mb-8">
              Take our 25-question quiz based on classical Ayurvedic texts and discover your unique Prakriti in under 5 minutes.
            </p>
            <Link
              href="/quiz"
              className="cta-pulse inline-flex items-center gap-2 bg-primary-container text-on-primary-container px-10 py-4 rounded-full text-label-md font-semibold sun-shadow hover:brightness-105 transition-all"
            >
              Take the Free Quiz →
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}

export default AboutPage

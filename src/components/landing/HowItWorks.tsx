const steps = [
  {
    icon: '🧾',
    bg: 'bg-primary-fixed',
    title: '1. Answer',
    description: 'Simple questions about your physical traits, digestion, and emotional temperament.',
  },
  {
    icon: '🧬',
    bg: 'bg-secondary-fixed',
    title: '2. Get Prakriti',
    description: 'Receive an in-depth breakdown of your Vata, Pitta, and Kapha percentages immediately.',
  },
  {
    icon: '🌿',
    bg: 'bg-tertiary-fixed',
    title: '3. Live in Harmony',
    description: 'Apply personalized diet, yoga, and lifestyle tips to find your natural equilibrium.',
  },
]

export function HowItWorks(): JSX.Element {
  return (
    <section className="py-16 bg-surface-container-low">
      <div className="max-w-[1200px] mx-auto px-5 md:px-10">
        <div className="text-center mb-14">
          <h2 className="font-display text-headline-lg font-bold text-on-surface">Your Path to Balance</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step) => (
            <div
              key={step.title}
              className="card-hover bg-surface p-8 rounded-3xl border border-outline-variant sun-shadow"
            >
              <div className={`w-16 h-16 rounded-2xl ${step.bg} mb-6 flex items-center justify-center text-3xl`}>
                {step.icon}
              </div>
              <h3 className="font-display text-headline-md font-semibold text-on-surface mb-3">{step.title}</h3>
              <p className="text-on-surface-variant text-body-md">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

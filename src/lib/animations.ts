export function animateDoshaBars(containerSelector: string): void {
  if (typeof window === 'undefined') return
  const bars = document.querySelectorAll<HTMLElement>(`${containerSelector} .dosha-bar`)
  requestAnimationFrame(() => {
    bars.forEach((bar) => {
      const target = bar.dataset['target'] ?? '0'
      bar.style.width = `${target}%`
    })
  })
}

export function revealOnScroll(selector: string): () => void {
  if (typeof window === 'undefined') return () => undefined
  const elements = document.querySelectorAll<HTMLElement>(selector)
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100', 'translate-y-0')
          entry.target.classList.remove('opacity-0', 'translate-y-4')
        }
      })
    },
    { threshold: 0.1 },
  )
  elements.forEach((el) => {
    el.classList.add('transition-all', 'duration-700', 'opacity-0', 'translate-y-4')
    observer.observe(el)
  })
  return () => observer.disconnect()
}

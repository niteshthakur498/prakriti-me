import type { Season } from '@/types'

const SOUTHERN_TZ_PREFIXES = ['Australia/', 'Antarctica/']
const SOUTHERN_TZ_EXACT = [
  'Pacific/Auckland', 'Pacific/Chatham', 'Pacific/Fiji',
  'America/Argentina/Buenos_Aires', 'America/Sao_Paulo', 'America/Santiago',
  'Africa/Johannesburg', 'Africa/Harare', 'Indian/Mauritius',
]

function detectHemisphere(): 'north' | 'south' {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone
    if (SOUTHERN_TZ_PREFIXES.some((p) => tz.startsWith(p))) return 'south'
    if (SOUTHERN_TZ_EXACT.includes(tz)) return 'south'
  } catch {
    // fall through to default
  }
  return 'north'
}

const FLIP: Record<Season, Season> = {
  spring: 'autumn',
  autumn: 'spring',
  summer: 'winter',
  winter: 'summer',
}

export function getCurrentSeason(date: Date = new Date(), hemisphere?: 'north' | 'south'): Season {
  const hemi = hemisphere ?? detectHemisphere()
  const month = date.getMonth() // 0-indexed

  let north: Season
  if (month >= 2 && month <= 4) north = 'spring'
  else if (month >= 5 && month <= 7) north = 'summer'
  else if (month >= 8 && month <= 10) north = 'autumn'
  else north = 'winter'

  return hemi === 'north' ? north : FLIP[north]
}

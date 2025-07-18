export const INTELLIGENCE_CLASSIFICATION_CONFIG = {
  TOP_SECRET: 'TOP SECRET',
  SECRET: 'SECRET',
  CONFIDENTIAL: 'CONFIDENTIAL'
} as const

export const INTELLIGENCE_SOURCE_CONFIG = {
  SIGINT: 'SIGINT',
  HUMINT: 'HUMINT',
  OSINT: 'OSINT',
  DIPLOMATIC: 'DIPLOMATIC'
} as const

export const INTELLIGENCE_THREAT_LEVEL_CONFIG = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  CRITICAL: 'critical'
} as const

export const INTELLIGENCE_STATUS_CONFIG = {
  VERIFIED: 'verified',
  PENDING: 'pending',
  ACTIVE: 'active'
} as const

export const INTELLIGENCE_CLASSIFICATION_COLORS_CONFIG = {
  'TOP SECRET': 'bg-red-500/20 text-red-500',
  'SECRET': 'bg-orange-500/20 text-orange-500',
  'CONFIDENTIAL': 'bg-neutral-500/20 text-neutral-300'
} as const

export const INTELLIGENCE_THREAT_COLORS_CONFIG = {
  critical: 'bg-red-500/20 text-red-500',
  high: 'bg-orange-500/20 text-orange-500',
  medium: 'bg-neutral-500/20 text-neutral-300',
  low: 'bg-white/20 text-white'
} as const

export const INTELLIGENCE_STATUS_COLORS_CONFIG = {
  verified: 'bg-white/20 text-white',
  pending: 'bg-orange-500/20 text-orange-500',
  active: 'bg-white/20 text-white'
} as const

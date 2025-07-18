export const AGENT_STATUS_CONFIG = {
  ACTIVE: 'active',
  STANDBY: 'standby',
  COMPROMISED: 'compromised',
  TRAINING: 'training'
} as const

export const AGENT_RISK_LEVEL_CONFIG = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  CRITICAL: 'critical'
} as const

export const AGENT_STATUS_COLORS_CONFIG = {
  active: {
    bg: 'bg-white',
    text: 'text-white',
    dot: 'bg-white'
  },
  standby: {
    bg: 'bg-neutral-500',
    text: 'text-neutral-500',
    dot: 'bg-neutral-500'
  },
  training: {
    bg: 'bg-orange-500',
    text: 'text-orange-500',
    dot: 'bg-orange-500'
  },
  compromised: {
    bg: 'bg-red-500',
    text: 'text-red-500',
    dot: 'bg-red-500'
  }
} as const

export const AGENT_RISK_COLORS_CONFIG = {
  critical: 'bg-red-500/20 text-red-500',
  high: 'bg-orange-500/20 text-orange-500',
  medium: 'bg-neutral-500/20 text-neutral-300',
  low: 'bg-white/20 text-white'
} as const

export const AGENT_TABLE_HEADERS_CONFIG = [
  'AGENT ID',
  'CODENAME',
  'STATUS',
  'LOCATION',
  'LAST SEEN',
  'MISSIONS',
  'RISK',
  'ACTIONS'
] as const

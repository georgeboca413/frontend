export const OPERATION_STATUS_CONFIG = {
  ACTIVE: 'active',
  PLANNING: 'planning',
  COMPLETED: 'completed',
  COMPROMISED: 'compromised'
} as const

export const OPERATION_PRIORITY_CONFIG = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  CRITICAL: 'critical'
} as const

export const OPERATION_STATUS_COLORS_CONFIG = {
  active: 'bg-white/20 text-white',
  planning: 'bg-orange-500/20 text-orange-500',
  completed: 'bg-white/20 text-white',
  compromised: 'bg-red-500/20 text-red-500'
} as const

export const OPERATION_PRIORITY_COLORS_CONFIG = {
  critical: 'bg-red-500/20 text-red-500',
  high: 'bg-orange-500/20 text-orange-500',
  medium: 'bg-neutral-500/20 text-neutral-300',
  low: 'bg-white/20 text-white'
} as const

export const OPERATION_STATUS_ICONS_CONFIG = {
  active: 'Target',
  planning: 'Clock',
  completed: 'CheckCircle',
  compromised: 'XCircle'
} as const

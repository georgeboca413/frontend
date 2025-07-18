export const SYSTEM_STATUS_CONFIG = {
  ONLINE: 'online',
  WARNING: 'warning',
  MAINTENANCE: 'maintenance',
  OFFLINE: 'offline'
} as const

export const SYSTEM_TYPE_CONFIG = {
  PRIMARY_SERVER: 'Primary Server',
  DATABASE: 'Database',
  FIREWALL: 'Firewall',
  NETWORK: 'Network',
  STORAGE: 'Storage',
  PROCESSING: 'Processing'
} as const

export const SYSTEM_STATUS_COLORS_CONFIG = {
  online: 'bg-white/20 text-white',
  warning: 'bg-orange-500/20 text-orange-500',
  maintenance: 'bg-neutral-500/20 text-neutral-300',
  offline: 'bg-red-500/20 text-red-500'
} as const

export const SYSTEM_STATUS_ICONS_CONFIG = {
  online: 'CheckCircle',
  warning: 'AlertTriangle',
  maintenance: 'Settings',
  offline: 'AlertTriangle'
} as const

export const SYSTEM_TYPE_ICONS_CONFIG = {
  'Primary Server': 'Server',
  'Database': 'Database',
  'Firewall': 'Shield',
  'Network': 'Wifi',
  'Storage': 'HardDrive',
  'Processing': 'Cpu'
} as const

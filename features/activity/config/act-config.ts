export const ACTIVITY_LOG_ACTIONS_CONFIG = {
  COMPLETED_MISSION: 'completed mission in',
  EXTRACTED_TARGET: 'extracted high-value target in',
  LOST_COMMUNICATION: 'lost communication in',
  INITIATED_SURVEILLANCE: 'initiated surveillance in'
} as const

export const ACTIVITY_TIME_FORMAT_CONFIG = {
  dateFormat: 'dd/MM/yyyy HH:mm',
  timeZone: 'UTC'
} as const

export const DASHBOARD_REFRESH_INTERVAL_CONFIG = 30000 // 30 seconds

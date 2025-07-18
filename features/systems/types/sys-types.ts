import type {
  System,
  SystemMetric,
  SystemMaintenance,
} from '@prisma/client'

// Re-export Prisma types for convenience
export type {
  System,
  SystemMetric,
  SystemMaintenance,
} from '@prisma/client'

export interface SystemWithMetrics {
  id: string
  systemId: string
  name: string
  type: string
  status: string
  health: number
  location: string
  uptime: string
  lastMaintenance: Date | null
  createdAt: Date
  updatedAt: Date
  metrics: SystemMetric[]
  maintenances: SystemMaintenance[]
  _count: {
    metrics: number
    maintenances: number
  }
}

export enum SystemStatus {
  ONLINE = 'online',
  WARNING = 'warning',
  MAINTENANCE = 'maintenance',
  OFFLINE = 'offline'
}

import type {
  Agent,
  Operation,
  OperationAssignment,
  OperationObjective,
  OperationStatusUpdate,
  IntelligenceReport,
  System,
  SystemMetric,
  SystemMaintenance,
  ActivityLog,
  ChatMessage,
} from '@prisma/client'

// Re-export Prisma types for convenience
export type {
  Agent,
  Operation,
  OperationAssignment,
  OperationObjective,
  OperationStatusUpdate,
  IntelligenceReport,
  System,
  SystemMetric,
  SystemMaintenance,
  ActivityLog,
  ChatMessage,
} from '@prisma/client'

// Extended types with relations
export interface AgentWithRelations {
  id: string
  agentId: string
  name: string
  status: string
  location: string
  lastSeen: Date
  missions: number
  riskLevel: string
  createdAt: Date
  updatedAt: Date
  operationAssignments: (OperationAssignment & {
    operation: {
      name: string
      status: string
      priority: string
    }
  })[]
  intelligenceReports: {
    id: string
    title: string
    classification: string
    threatLevel: string
  }[]
  activityLogs: {
    id: string
    action: string
    location: string
    timestamp: Date
  }[]
  _count: {
    operationAssignments: number
    intelligenceReports: number
    activityLogs: number
  }
}

export interface OperationWithRelations {
  id: string
  operationId: string
  name: string
  status: string
  priority: string
  location: string
  progress: number
  startDate: Date
  estimatedCompletion: Date
  actualCompletion: Date | null
  description: string
  createdAt: Date
  updatedAt: Date
  assignments: (OperationAssignment & {
    agent: {
      agentId: string
      name: string
      status: string
      riskLevel: string
    }
  })[]
  objectives: OperationObjective[]
  statusUpdates: OperationStatusUpdate[]
  _count: {
    assignments: number
    objectives: number
  }
}

export interface IntelligenceReportWithAgent {
  id: string
  reportId: string
  title: string
  classification: string
  source: string
  location: string
  status: string
  threatLevel: string
  summary: string
  content: string | null
  tags: string
  createdAt: Date
  updatedAt: Date
  agentId: string | null
  agent: {
    agentId: string
    name: string
    status: string
  } | null
}

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

export interface ActivityLogWithAgent {
  id: string
  agentId: string
  action: string
  location: string
  target: string | null
  timestamp: Date
  details: string | null
  agent: {
    agentId: string
    name: string
    status: string
  }
}

export interface DashboardStats {
  agents: {
    total: number
    active: number
    standby: number
    training: number
    compromised: number
    breakdown: { status: string; _count: number }[]
  }
  operations: {
    total: number
    active: number
    planning: number
    completed: number
    compromised: number
    completionRate: number
    breakdown: { status: string; _count: number }[]
  }
  intelligence: {
    total: number
    critical: number
    high: number
    medium: number
    low: number
    breakdown: { threatLevel: string; _count: number }[]
  }
  systems: {
    total: number
    online: number
    warning: number
    maintenance: number
    offline: number
    averageHealth: number
    breakdown: { status: string; _count: number }[]
  }
  activity: {
    recentCount: number
  }
  security: {
    compromisedAssets: number
    compromisedAgents: number
    compromisedOperations: number
  }
}

// Enums for status values
export enum AgentStatus {
  ACTIVE = 'active',
  STANDBY = 'standby',
  COMPROMISED = 'compromised',
  TRAINING = 'training'
}

export enum OperationStatus {
  ACTIVE = 'active',
  PLANNING = 'planning',
  COMPLETED = 'completed',
  COMPROMISED = 'compromised'
}

export enum Priority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical'
}

export enum Classification {
  TOP_SECRET = 'TOP SECRET',
  SECRET = 'SECRET',
  CONFIDENTIAL = 'CONFIDENTIAL'
}

export enum IntelligenceSource {
  SIGINT = 'SIGINT',
  HUMINT = 'HUMINT',
  OSINT = 'OSINT',
  DIPLOMATIC = 'DIPLOMATIC'
}

export enum SystemStatus {
  ONLINE = 'online',
  WARNING = 'warning',
  MAINTENANCE = 'maintenance',
  OFFLINE = 'offline'
}

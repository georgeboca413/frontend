import type {
  Agent,
  OperationAssignment,
  ActivityLog,
  IntelligenceReport,
} from '@prisma/client'

// Re-export Prisma types for convenience
export type {
  Agent,
  OperationAssignment,
  ActivityLog,
  IntelligenceReport,
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

// Enums for status values
export enum AgentStatus {
  ACTIVE = 'active',
  STANDBY = 'standby',
  COMPROMISED = 'compromised',
  TRAINING = 'training'
}

export enum Priority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical'
}

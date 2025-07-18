import type {
  Operation,
  OperationAssignment,
  OperationObjective,
  OperationStatusUpdate,
} from '@prisma/client'

// Re-export Prisma types for convenience
export type {
  Operation,
  OperationAssignment,
  OperationObjective,
  OperationStatusUpdate,
} from '@prisma/client'

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

// Enums for status values
export enum OperationStatus {
  ACTIVE = 'active',
  PLANNING = 'planning',
  COMPLETED = 'completed',
  COMPROMISED = 'compromised'
}

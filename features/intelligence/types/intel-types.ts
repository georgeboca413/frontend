import type {
  IntelligenceReport,
} from '@prisma/client'

// Re-export Prisma types for convenience
export type {
  IntelligenceReport,
} from '@prisma/client'

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

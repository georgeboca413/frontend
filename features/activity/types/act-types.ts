import type {
  ActivityLog,
  ChatMessage,
} from '@prisma/client'

// Re-export Prisma types for convenience
export type {
  ActivityLog,
  ChatMessage,
} from '@prisma/client'

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

export interface RecentAgent {
  id: string
  name: string
  status: "active" | "standby" | "compromised"
}

export interface ActivityStats {
  agentStats: {
    activeField: number
    undercover: number
    training: number
  }
  recentAgents: RecentAgent[]
  missionStats: {
    successful: {
      highRisk: number
      mediumRisk: number
      lowRisk: number
    }
    failed: {
      highRisk: number
      mediumRisk: number
      lowRisk: number
    }
  }
}

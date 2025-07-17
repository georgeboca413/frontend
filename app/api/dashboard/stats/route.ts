import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET() {
  try {
    // Get agent statistics
    const agentStats = await prisma.agent.groupBy({
      by: ['status'],
      _count: true,
    })

    // Get operation statistics
    const operationStats = await prisma.operation.groupBy({
      by: ['status'],
      _count: true,
    })

    // Get intelligence threat levels
    const intelligenceStats = await prisma.intelligenceReport.groupBy({
      by: ['threatLevel'],
      _count: true,
    })

    // Get system status
    const systemStats = await prisma.system.groupBy({
      by: ['status'],
      _count: true,
    })

    // Get recent activity count
    const recentActivityCount = await prisma.activityLog.count({
      where: {
        timestamp: {
          gte: new Date(Date.now() - 24 * 60 * 60 * 1000) // Last 24 hours
        }
      }
    })

    // Get compromised items count
    const compromisedAgents = await prisma.agent.count({
      where: { status: 'compromised' }
    })

    const compromisedOperations = await prisma.operation.count({
      where: { status: 'compromised' }
    })

    // Get mission completion stats
    const completedOperations = await prisma.operation.count({
      where: { status: 'completed' }
    })

    const totalOperations = await prisma.operation.count()

    // Get system health average
    const systemHealthAvg = await prisma.system.aggregate({
      _avg: { health: true }
    })

    // Transform data for easier consumption
    const stats = {
      agents: {
        total: agentStats.reduce((sum, stat) => sum + stat._count, 0),
        active: agentStats.find(s => s.status === 'active')?._count || 0,
        standby: agentStats.find(s => s.status === 'standby')?._count || 0,
        training: agentStats.find(s => s.status === 'training')?._count || 0,
        compromised: agentStats.find(s => s.status === 'compromised')?._count || 0,
        breakdown: agentStats,
      },
      operations: {
        total: totalOperations,
        active: operationStats.find(s => s.status === 'active')?._count || 0,
        planning: operationStats.find(s => s.status === 'planning')?._count || 0,
        completed: operationStats.find(s => s.status === 'completed')?._count || 0,
        compromised: operationStats.find(s => s.status === 'compromised')?._count || 0,
        completionRate: totalOperations > 0 ? (completedOperations / totalOperations) * 100 : 0,
        breakdown: operationStats,
      },
      intelligence: {
        total: intelligenceStats.reduce((sum, stat) => sum + stat._count, 0),
        critical: intelligenceStats.find(s => s.threatLevel === 'critical')?._count || 0,
        high: intelligenceStats.find(s => s.threatLevel === 'high')?._count || 0,
        medium: intelligenceStats.find(s => s.threatLevel === 'medium')?._count || 0,
        low: intelligenceStats.find(s => s.threatLevel === 'low')?._count || 0,
        breakdown: intelligenceStats,
      },
      systems: {
        total: systemStats.reduce((sum, stat) => sum + stat._count, 0),
        online: systemStats.find(s => s.status === 'online')?._count || 0,
        warning: systemStats.find(s => s.status === 'warning')?._count || 0,
        maintenance: systemStats.find(s => s.status === 'maintenance')?._count || 0,
        offline: systemStats.find(s => s.status === 'offline')?._count || 0,
        averageHealth: Math.round(systemHealthAvg._avg.health || 0),
        breakdown: systemStats,
      },
      activity: {
        recentCount: recentActivityCount,
      },
      security: {
        compromisedAssets: compromisedAgents + compromisedOperations,
        compromisedAgents,
        compromisedOperations,
      }
    }

    return NextResponse.json({ stats })
  } catch (error) {
    console.error('Error fetching dashboard stats:', error)
    return NextResponse.json(
      { error: 'Failed to fetch dashboard statistics' },
      { status: 500 }
    )
  }
}

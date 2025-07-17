import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const agentId = searchParams.get('agentId')
    const limit = parseInt(searchParams.get('limit') || '50')

    const activityLogs = await prisma.activityLog.findMany({
      where: agentId ? { agentId } : {},
      include: {
        agent: {
          select: {
            agentId: true,
            name: true,
            status: true,
          }
        }
      },
      orderBy: { timestamp: 'desc' },
      take: limit
    })

    return NextResponse.json({ activityLogs })
  } catch (error) {
    console.error('Error fetching activity logs:', error)
    return NextResponse.json(
      { error: 'Failed to fetch activity logs' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { agentId, action, location, target, details } = body

    const activityLog = await prisma.activityLog.create({
      data: {
        agentId,
        action,
        location,
        target,
        details,
      },
      include: {
        agent: {
          select: {
            agentId: true,
            name: true,
            status: true,
          }
        }
      }
    })

    return NextResponse.json({ activityLog }, { status: 201 })
  } catch (error) {
    console.error('Error creating activity log:', error)
    return NextResponse.json(
      { error: 'Failed to create activity log' },
      { status: 500 }
    )
  }
}

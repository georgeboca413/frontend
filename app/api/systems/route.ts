import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const type = searchParams.get('type')

    const systems = await prisma.system.findMany({
      where: {
        AND: [
          status ? { status } : {},
          type ? { type } : {},
        ]
      },
      include: {
        metrics: {
          orderBy: { timestamp: 'desc' },
          take: 1 // Get latest metrics
        },
        maintenances: {
          orderBy: { scheduledAt: 'desc' },
          take: 5 // Get recent maintenance records
        },
        _count: {
          select: {
            metrics: true,
            maintenances: true,
          }
        }
      },
      orderBy: { health: 'desc' }
    })

    return NextResponse.json({ systems })
  } catch (error) {
    console.error('Error fetching systems:', error)
    return NextResponse.json(
      { error: 'Failed to fetch systems' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { 
      systemId,
      name,
      type,
      status,
      health,
      location,
      uptime
    } = body

    const system = await prisma.system.create({
      data: {
        systemId,
        name,
        type,
        status,
        health: health || 100,
        location,
        uptime: uptime || '0 days',
      }
    })

    return NextResponse.json({ system }, { status: 201 })
  } catch (error) {
    console.error('Error creating system:', error)
    return NextResponse.json(
      { error: 'Failed to create system' },
      { status: 500 }
    )
  }
}

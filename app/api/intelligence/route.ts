import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search')
    const classification = searchParams.get('classification')
    const threatLevel = searchParams.get('threatLevel')
    const status = searchParams.get('status')

    const reports = await prisma.intelligenceReport.findMany({
      where: {
        AND: [
          search ? {
            OR: [
              { title: { contains: search } },
              { summary: { contains: search } },
              { location: { contains: search } },
            ]
          } : {},
          classification ? { classification } : {},
          threatLevel ? { threatLevel } : {},
          status ? { status } : {},
        ]
      },
      include: {
        agent: {
          select: {
            agentId: true,
            name: true,
            status: true,
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json({ reports })
  } catch (error) {
    console.error('Error fetching intelligence reports:', error)
    return NextResponse.json(
      { error: 'Failed to fetch intelligence reports' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { 
      reportId,
      title,
      classification,
      source,
      location,
      status,
      threatLevel,
      summary,
      content,
      tags,
      agentId
    } = body

    const report = await prisma.intelligenceReport.create({
      data: {
        reportId,
        title,
        classification,
        source,
        location,
        status,
        threatLevel,
        summary,
        content,
        tags: JSON.stringify(tags || []),
        agentId: agentId || null,
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

    return NextResponse.json({ report }, { status: 201 })
  } catch (error) {
    console.error('Error creating intelligence report:', error)
    return NextResponse.json(
      { error: 'Failed to create intelligence report' },
      { status: 500 }
    )
  }
}

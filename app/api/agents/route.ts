import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search");
    const status = searchParams.get("status");

    const agents = await prisma.agent.findMany({
      where: {
        AND: [
          search
            ? {
                OR: [
                  { name: { contains: search } },
                  { agentId: { contains: search } },
                  { location: { contains: search } },
                ],
              }
            : {},
          status ? { status } : {},
        ],
      },
      include: {
        operationAssignments: {
          include: {
            operation: {
              select: {
                name: true,
                status: true,
                priority: true,
              },
            },
          },
          where: { isActive: true },
        },
        intelligenceReports: {
          select: {
            id: true,
            title: true,
            classification: true,
            threatLevel: true,
          },
          orderBy: { createdAt: "desc" },
          take: 3,
        },
        activityLogs: {
          select: {
            id: true,
            action: true,
            location: true,
            timestamp: true,
          },
          orderBy: { timestamp: "desc" },
          take: 5,
        },
        _count: {
          select: {
            operationAssignments: true,
            intelligenceReports: true,
            activityLogs: true,
          },
        },
      },
      orderBy: { lastSeen: "desc" },
    });

    return NextResponse.json({ agents });
  } catch (error) {
    console.error("Error fetching agents:", error);
    return NextResponse.json({ error: "Failed to fetch agents" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { agentId, name, status, location, riskLevel } = body;

    const agent = await prisma.agent.create({
      data: {
        agentId,
        name,
        status,
        location,
        riskLevel,
        missions: 0,
      },
    });

    return NextResponse.json({ agent }, { status: 201 });
  } catch (error) {
    console.error("Error creating agent:", error);
    return NextResponse.json({ error: "Failed to create agent" }, { status: 500 });
  }
}

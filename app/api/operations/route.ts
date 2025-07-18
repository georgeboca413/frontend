import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const priority = searchParams.get("priority");

    const operations = await prisma.operation.findMany({
      where: {
        AND: [status ? { status } : {}, priority ? { priority } : {}],
      },
      include: {
        assignments: {
          include: {
            agent: {
              select: {
                agentId: true,
                name: true,
                status: true,
                riskLevel: true,
              },
            },
          },
          where: { isActive: true },
        },
        objectives: {
          orderBy: { order: "asc" },
        },
        statusUpdates: {
          orderBy: { timestamp: "desc" },
          take: 5,
        },
        _count: {
          select: {
            assignments: true,
            objectives: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ operations });
  } catch (error) {
    console.error("Error fetching operations:", error);
    return NextResponse.json({ error: "Failed to fetch operations" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      operationId,
      name,
      status,
      priority,
      location,
      description,
      startDate,
      estimatedCompletion,
      objectives = [],
    } = body;

    const data = {
      operationId: "OP-GAMMA-433",
      name: "STEEL SENTINEL",
      status: "planning",
      priority: "medium",
      location: "Northern Africa",
      description:
        "Classified mission requiring tactical coordination and strategic intelligence gathering. All operational parameters subject to field commander discretion.",
      startDate: "2025-07-18T11:40:00.000Z",
      estimatedCompletion: "2025-07-25T11:40:00.000Z",
      objectives: [
        {
          title: "Establish operational perimeter",
          description: "Secure designated area and establish communication protocols",
        },
        { title: "adad", description: "" },
      ],
    };

    const operation = await prisma.operation.create({
      data: {
        operationId,
        name,
        status,
        priority,
        location,
        description,
        startDate: new Date(startDate),
        estimatedCompletion: new Date(estimatedCompletion),
        objectives: {
          create: objectives.map((obj: any, index: number) => ({
            title: obj.title,
            description: obj.description,
            // order: index + 1,
          })),
        },
      },
      include: {
        objectives: true,
      },
    });

    return NextResponse.json({ operation }, { status: 201 });
  } catch (error) {
    console.error("Error creating operation:", error);
    console.log("error: ", error);
    return NextResponse.json({ error: "Failed to create operation" }, { status: 500 });
  }
}

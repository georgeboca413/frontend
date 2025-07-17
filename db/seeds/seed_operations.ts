import { PrismaClient } from '@prisma/client'

export async function seedOperations(prisma: PrismaClient) {
  console.log('🎯 Seeding operations...')

  // Clear existing operation data
  await prisma.operationStatusUpdate.deleteMany()
  await prisma.operationObjective.deleteMany()
  await prisma.operationAssignment.deleteMany()
  await prisma.operation.deleteMany()

  // Create Operations
  const operations = await prisma.operation.createMany({
    data: [
      {
        operationId: 'OP-OMEGA-001',
        name: 'SHADOW PROTOCOL',
        status: 'active',
        priority: 'critical',
        location: 'Eastern Europe',
        progress: 75,
        startDate: new Date('2025-06-15'),
        estimatedCompletion: new Date('2025-06-30'),
        description: 'Track high-value target in Eastern Europe',
      },
      {
        operationId: 'OP-DELTA-002',
        name: 'GHOST FIRE',
        status: 'planning',
        priority: 'high',
        location: 'Seoul',
        progress: 25,
        startDate: new Date('2025-06-20'),
        estimatedCompletion: new Date('2025-07-05'),
        description: 'Infiltrate cybercrime network in Seoul',
      },
      {
        operationId: 'OP-SIERRA-003',
        name: 'NIGHT STALKER',
        status: 'completed',
        priority: 'medium',
        location: 'Berlin',
        progress: 100,
        startDate: new Date('2025-05-28'),
        estimatedCompletion: new Date('2025-06-12'),
        actualCompletion: new Date('2025-06-12'),
        description: 'Monitor rogue agent communications in Berlin',
      },
      {
        operationId: 'OP-ALPHA-004',
        name: 'CRIMSON TIDE',
        status: 'active',
        priority: 'high',
        location: 'Cairo',
        progress: 60,
        startDate: new Date('2025-06-10'),
        estimatedCompletion: new Date('2025-06-25'),
        description: 'Support covert extraction in South America',
      },
      {
        operationId: 'OP-BRAVO-005',
        name: 'SILENT BLADE',
        status: 'compromised',
        priority: 'critical',
        location: 'Moscow',
        progress: 40,
        startDate: new Date('2025-06-05'),
        estimatedCompletion: new Date('2025-06-20'),
        description: 'Monitor rogue agent communications in Berlin',
      },
    ],
  })

  console.log(`✅ Created ${operations.count} operations`)
  return operations
}

export async function seedOperationObjectives(prisma: PrismaClient) {
  console.log('📋 Seeding operation objectives...')

  // Get created operations for relationships
  const createdOperations = await prisma.operation.findMany()

  // Create Operation Objectives
  for (const operation of createdOperations) {
    if (operation.operationId === 'OP-OMEGA-001') {
      await prisma.operationObjective.createMany({
        data: [
          { operationId: operation.id, title: 'Locate target', order: 1, isCompleted: true, completedAt: new Date() },
          { operationId: operation.id, title: 'Establish surveillance', order: 2, isCompleted: true, completedAt: new Date() },
          { operationId: operation.id, title: 'Extract intelligence', order: 3, isCompleted: false },
        ],
      })
    } else if (operation.operationId === 'OP-DELTA-002') {
      await prisma.operationObjective.createMany({
        data: [
          { operationId: operation.id, title: 'Penetrate network', order: 1, isCompleted: false },
          { operationId: operation.id, title: 'Gather evidence', order: 2, isCompleted: false },
          { operationId: operation.id, title: 'Identify key players', order: 3, isCompleted: false },
        ],
      })
    } else if (operation.operationId === 'OP-SIERRA-003') {
      await prisma.operationObjective.createMany({
        data: [
          { operationId: operation.id, title: 'Intercept communications', order: 1, isCompleted: true, completedAt: new Date() },
          { operationId: operation.id, title: 'Decode messages', order: 2, isCompleted: true, completedAt: new Date() },
          { operationId: operation.id, title: 'Report findings', order: 3, isCompleted: true, completedAt: new Date() },
        ],
      })
    } else if (operation.operationId === 'OP-ALPHA-004') {
      await prisma.operationObjective.createMany({
        data: [
          { operationId: operation.id, title: 'Secure extraction point', order: 1, isCompleted: true, completedAt: new Date() },
          { operationId: operation.id, title: 'Neutralize threats', order: 2, isCompleted: false },
          { operationId: operation.id, title: 'Extract asset', order: 3, isCompleted: false },
        ],
      })
    } else if (operation.operationId === 'OP-BRAVO-005') {
      await prisma.operationObjective.createMany({
        data: [
          { operationId: operation.id, title: 'Assess compromise', order: 1, isCompleted: true, completedAt: new Date() },
          { operationId: operation.id, title: 'Extract personnel', order: 2, isCompleted: false },
          { operationId: operation.id, title: 'Damage control', order: 3, isCompleted: false },
        ],
      })
    }
  }

  console.log('✅ Created operation objectives')
}

export async function seedOperationAssignments(prisma: PrismaClient) {
  console.log('🔗 Seeding operation assignments...')

  const createdAgents = await prisma.agent.findMany()
  const createdOperations = await prisma.operation.findMany()

  // Create Operation Assignments (link agents to operations)
  const shadowProtocol = createdOperations.find(op => op.operationId === 'OP-OMEGA-001')
  const ghostFire = createdOperations.find(op => op.operationId === 'OP-DELTA-002')
  const crimsonTide = createdOperations.find(op => op.operationId === 'OP-ALPHA-004')

  if (shadowProtocol && ghostFire && crimsonTide) {
    await prisma.operationAssignment.createMany({
      data: [
        // Shadow Protocol agents
        { agentId: createdAgents[0].id, operationId: shadowProtocol.id, role: 'lead' },
        { agentId: createdAgents[2].id, operationId: shadowProtocol.id, role: 'support' },
        { agentId: createdAgents[6].id, operationId: shadowProtocol.id, role: 'surveillance' },
        
        // Ghost Fire agents
        { agentId: createdAgents[1].id, operationId: ghostFire.id, role: 'lead' },
        { agentId: createdAgents[4].id, operationId: ghostFire.id, role: 'infiltration' },
        
        // Crimson Tide agents
        { agentId: createdAgents[2].id, operationId: crimsonTide.id, role: 'extraction' },
        { agentId: createdAgents[7].id, operationId: crimsonTide.id, role: 'support' },
      ],
    })

    console.log('✅ Created operation assignments')
  }
}

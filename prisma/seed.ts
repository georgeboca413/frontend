import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Clear existing data
  await prisma.chatMessage.deleteMany()
  await prisma.activityLog.deleteMany()
  await prisma.systemMaintenance.deleteMany()
  await prisma.systemMetric.deleteMany()
  await prisma.intelligenceReport.deleteMany()
  await prisma.operationStatusUpdate.deleteMany()
  await prisma.operationObjective.deleteMany()
  await prisma.operationAssignment.deleteMany()
  await prisma.system.deleteMany()
  await prisma.operation.deleteMany()
  await prisma.agent.deleteMany()

  // Create Agents
  const agents = await prisma.agent.createMany({
    data: [
      {
        agentId: 'G-078W',
        name: 'VENGEFUL SPIRIT',
        status: 'active',
        location: 'Berlin',
        missions: 47,
        riskLevel: 'high',
        lastSeen: new Date(Date.now() - 2 * 60 * 1000), // 2 minutes ago
      },
      {
        agentId: 'G-079X',
        name: 'OBSIDIAN SENTINEL',
        status: 'standby',
        location: 'Tokyo',
        missions: 32,
        riskLevel: 'medium',
        lastSeen: new Date(Date.now() - 15 * 60 * 1000), // 15 minutes ago
      },
      {
        agentId: 'G-080Y',
        name: 'GHOSTLY FURY',
        status: 'active',
        location: 'Cairo',
        missions: 63,
        riskLevel: 'high',
        lastSeen: new Date(Date.now() - 1 * 60 * 1000), // 1 minute ago
      },
      {
        agentId: 'G-081Z',
        name: 'CURSED REVENANT',
        status: 'compromised',
        location: 'Moscow',
        missions: 28,
        riskLevel: 'critical',
        lastSeen: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
      },
      {
        agentId: 'G-082A',
        name: 'VENOMOUS SHADE',
        status: 'active',
        location: 'London',
        missions: 41,
        riskLevel: 'medium',
        lastSeen: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
      },
      {
        agentId: 'G-083B',
        name: 'MYSTIC ENIGMA',
        status: 'training',
        location: 'Base Alpha',
        missions: 12,
        riskLevel: 'low',
        lastSeen: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
      },
      {
        agentId: 'G-084C',
        name: 'WRAITH AVENGER',
        status: 'active',
        location: 'Paris',
        missions: 55,
        riskLevel: 'high',
        lastSeen: new Date(Date.now() - 8 * 60 * 1000), // 8 minutes ago
      },
      {
        agentId: 'G-085D',
        name: 'SPECTRAL FURY',
        status: 'standby',
        location: 'Sydney',
        missions: 38,
        riskLevel: 'medium',
        lastSeen: new Date(Date.now() - 22 * 60 * 1000), // 22 minutes ago
      },
    ],
  })

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

  // Get created agents and operations for relationships
  const createdAgents = await prisma.agent.findMany()
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
    }
  }

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
  }

  // Create Intelligence Reports
  await prisma.intelligenceReport.createMany({
    data: [
      {
        reportId: 'INT-2025-001',
        title: 'CYBERCRIME NETWORK ANALYSIS',
        classification: 'TOP SECRET',
        source: 'SIGINT',
        location: 'Eastern Europe',
        status: 'verified',
        threatLevel: 'high',
        summary: 'Detailed analysis of emerging cybercrime syndicate operating across multiple jurisdictions',
        tags: JSON.stringify(['cybercrime', 'international', 'financial']),
        agentId: createdAgents[0].id,
      },
      {
        reportId: 'INT-2025-002',
        title: 'ROGUE AGENT COMMUNICATIONS',
        classification: 'SECRET',
        source: 'HUMINT',
        location: 'Berlin',
        status: 'pending',
        threatLevel: 'critical',
        summary: 'Intercepted communications suggesting potential security breach in European operations',
        tags: JSON.stringify(['internal', 'security', 'communications']),
        agentId: createdAgents[3].id,
      },
      {
        reportId: 'INT-2025-003',
        title: 'ARMS TRAFFICKING ROUTES',
        classification: 'CONFIDENTIAL',
        source: 'OSINT',
        location: 'Middle East',
        status: 'verified',
        threatLevel: 'medium',
        summary: 'Updated intelligence on weapons smuggling corridors through Mediterranean region',
        tags: JSON.stringify(['trafficking', 'weapons', 'maritime']),
        agentId: createdAgents[2].id,
      },
      {
        reportId: 'INT-2025-004',
        title: 'TERRORIST CELL SURVEILLANCE',
        classification: 'TOP SECRET',
        source: 'HUMINT',
        location: 'North Africa',
        status: 'active',
        threatLevel: 'critical',
        summary: 'Ongoing surveillance of suspected terrorist cell planning coordinated attacks',
        tags: JSON.stringify(['terrorism', 'surveillance', 'coordinated']),
        agentId: createdAgents[6].id,
      },
      {
        reportId: 'INT-2025-005',
        title: 'DIPLOMATIC INTELLIGENCE BRIEF',
        classification: 'SECRET',
        source: 'DIPLOMATIC',
        location: 'Asia Pacific',
        status: 'verified',
        threatLevel: 'low',
        summary: 'Political developments affecting regional security and operational considerations',
        tags: JSON.stringify(['diplomatic', 'political', 'regional']),
        agentId: createdAgents[1].id,
      },
    ],
  })

  // Create Systems
  await prisma.system.createMany({
    data: [
      {
        systemId: 'SYS-001',
        name: 'COMMAND SERVER ALPHA',
        type: 'Primary Server',
        status: 'online',
        health: 98,
        location: 'Data Center 1',
        uptime: '247 days',
        lastMaintenance: new Date('2025-05-15'),
      },
      {
        systemId: 'SYS-002',
        name: 'DATABASE CLUSTER BETA',
        type: 'Database',
        status: 'online',
        health: 95,
        location: 'Data Center 2',
        uptime: '189 days',
        lastMaintenance: new Date('2025-06-01'),
      },
      {
        systemId: 'SYS-003',
        name: 'SECURITY GATEWAY',
        type: 'Firewall',
        status: 'warning',
        health: 87,
        location: 'DMZ',
        uptime: '156 days',
        lastMaintenance: new Date('2025-04-20'),
      },
      {
        systemId: 'SYS-004',
        name: 'COMMUNICATION HUB',
        type: 'Network',
        status: 'online',
        health: 92,
        location: 'Network Core',
        uptime: '203 days',
        lastMaintenance: new Date('2025-05-28'),
      },
      {
        systemId: 'SYS-005',
        name: 'BACKUP STORAGE ARRAY',
        type: 'Storage',
        status: 'maintenance',
        health: 76,
        location: 'Backup Facility',
        uptime: '0 days',
        lastMaintenance: new Date('2025-06-17'),
      },
      {
        systemId: 'SYS-006',
        name: 'ANALYTICS ENGINE',
        type: 'Processing',
        status: 'online',
        health: 94,
        location: 'Data Center 1',
        uptime: '134 days',
        lastMaintenance: new Date('2025-05-10'),
      },
    ],
  })

  // Create System Metrics (recent performance data)
  const systems = await prisma.system.findMany()
  for (const system of systems) {
    const baseTime = new Date()
    for (let i = 0; i < 24; i++) {
      const timestamp = new Date(baseTime.getTime() - i * 60 * 60 * 1000) // Every hour for 24 hours
      await prisma.systemMetric.create({
        data: {
          systemId: system.id,
          cpu: Math.floor(Math.random() * 100),
          memory: Math.floor(Math.random() * 100),
          storage: Math.floor(Math.random() * 100),
          timestamp,
        },
      })
    }
  }

  // Create Activity Logs
  await prisma.activityLog.createMany({
    data: [
      {
        agentId: createdAgents[0].id,
        action: 'completed mission in',
        location: 'Berlin',
        target: 'zer0_Nigh',
        timestamp: new Date('2025-06-25T09:29:00'),
      },
      {
        agentId: createdAgents[2].id,
        action: 'extracted high-value target in',
        location: 'Cairo',
        timestamp: new Date('2025-06-25T08:12:00'),
      },
      {
        agentId: createdAgents[4].id,
        action: 'lost communication in',
        location: 'Havana',
        timestamp: new Date('2025-06-24T22:55:00'),
      },
      {
        agentId: createdAgents[6].id,
        action: 'initiated surveillance in',
        location: 'Tokyo',
        timestamp: new Date('2025-06-24T21:33:00'),
      },
      {
        agentId: createdAgents[1].id,
        action: 'completed infiltration in',
        location: 'Moscow',
        timestamp: new Date('2025-06-24T19:45:00'),
      },
    ],
  })

  // Create Chat Messages
  await prisma.chatMessage.createMany({
    data: [
      {
        agentId: createdAgents[0].id,
        channel: 'COMMAND',
        message: 'Target acquired. Proceeding with extraction.',
        timestamp: new Date(Date.now() - 10 * 60 * 1000),
      },
      {
        agentId: createdAgents[2].id,
        channel: 'COMMAND',
        message: 'Surveillance established. No hostile contacts detected.',
        timestamp: new Date(Date.now() - 15 * 60 * 1000),
      },
      {
        channel: 'SYSTEM',
        message: 'System maintenance scheduled for 02:00 UTC',
        isSystem: true,
        timestamp: new Date(Date.now() - 20 * 60 * 1000),
      },
      {
        agentId: createdAgents[6].id,
        channel: 'TACTICAL',
        message: 'Requesting immediate backup. Situation compromised.',
        timestamp: new Date(Date.now() - 25 * 60 * 1000),
      },
    ],
  })

  console.log('✅ Database seeded successfully!')
  console.log(`Created ${createdAgents.length} agents`)
  console.log(`Created ${createdOperations.length} operations`)
  console.log(`Created ${systems.length} systems`)
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

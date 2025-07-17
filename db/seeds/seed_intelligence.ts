import { PrismaClient } from '@prisma/client'

export async function seedIntelligence(prisma: PrismaClient) {
  console.log('📊 Seeding intelligence reports...')

  // Get created agents for relationships
  const createdAgents = await prisma.agent.findMany()

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
        agentId: createdAgents[0]?.id,
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
        agentId: createdAgents[3]?.id,
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
        agentId: createdAgents[2]?.id,
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
        agentId: createdAgents[6]?.id,
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
        agentId: createdAgents[1]?.id,
      },
      {
        reportId: 'INT-2025-006',
        title: 'FINANCIAL CRIME SYNDICATE',
        classification: 'SECRET',
        source: 'FININT',
        location: 'Switzerland',
        status: 'verified',
        threatLevel: 'high',
        summary: 'Money laundering operation traced through multiple offshore accounts',
        tags: JSON.stringify(['financial', 'laundering', 'offshore']),
        agentId: createdAgents[4]?.id,
      },
      {
        reportId: 'INT-2025-007',
        title: 'CYBER ATTACK INFRASTRUCTURE',
        classification: 'TOP SECRET',
        source: 'TECHINT',
        location: 'Global',
        status: 'active',
        threatLevel: 'critical',
        summary: 'Advanced persistent threat group establishing command and control infrastructure',
        tags: JSON.stringify(['cyber', 'APT', 'infrastructure']),
        agentId: createdAgents[5]?.id,
      },
    ],
  })

  const intelligenceCount = await prisma.intelligenceReport.count()
  console.log(`✅ Created ${intelligenceCount} intelligence reports`)
}

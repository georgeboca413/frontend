import { PrismaClient } from '@prisma/client'

export async function seedActivityLogs(prisma: PrismaClient) {
  console.log('📝 Seeding activity logs...')

  // Get created agents for relationships
  const createdAgents = await prisma.agent.findMany()

  if (createdAgents.length === 0) {
    console.log('⚠️ No agents found, skipping activity logs')
    return
  }

  // Create Activity Logs
  const activityData = [
    {
      agentId: createdAgents[0].id,
      action: 'completed mission in',
      location: 'Berlin',
      target: 'zer0_Nigh',
      timestamp: new Date('2025-06-25T09:29:00'),
      details: 'High-value target successfully neutralized. No casualties.',
    },
    {
      agentId: createdAgents[2].id,
      action: 'extracted high-value target in',
      location: 'Cairo',
      timestamp: new Date('2025-06-25T08:12:00'),
      details: 'Extraction completed under cover of diplomatic immunity.',
    },
    {
      agentId: createdAgents[4].id,
      action: 'lost communication in',
      location: 'Havana',
      timestamp: new Date('2025-06-24T22:55:00'),
      details: 'Last known position compromised. Emergency protocols activated.',
    },
    {
      agentId: createdAgents[6].id,
      action: 'initiated surveillance in',
      location: 'Tokyo',
      timestamp: new Date('2025-06-24T21:33:00'),
      details: 'Long-term surveillance operation commenced. Cover identity established.',
    },
    {
      agentId: createdAgents[1].id,
      action: 'completed infiltration in',
      location: 'Moscow',
      timestamp: new Date('2025-06-24T19:45:00'),
      details: 'Successfully penetrated target organization. Intelligence gathering phase initiated.',
    },
    {
      agentId: createdAgents[7].id,
      action: 'established contact with asset in',
      location: 'London',
      timestamp: new Date('2025-06-24T16:30:00'),
      details: 'Asset recruitment successful. Handler protocols established.',
    },
    {
      agentId: createdAgents[3].id,
      action: 'compromised during operation in',
      location: 'Moscow',
      timestamp: new Date('2025-06-24T14:15:00'),
      details: 'Cover blown during data exfiltration. Emergency extraction required.',
    },
    {
      agentId: createdAgents[5].id,
      action: 'completed training exercise in',
      location: 'Base Alpha',
      timestamp: new Date('2025-06-24T12:00:00'),
      details: 'Advanced combat training completed with honors. Ready for field deployment.',
    },
    {
      agentId: createdAgents[0].id,
      action: 'intercepted communications in',
      location: 'Berlin',
      timestamp: new Date('2025-06-24T10:45:00'),
      details: 'Enemy communications intercepted and decoded. Intelligence forwarded to command.',
    },
    {
      agentId: createdAgents[2].id,
      action: 'neutralized security threat in',
      location: 'Cairo',
      timestamp: new Date('2025-06-24T08:20:00'),
      details: 'Hostile surveillance team eliminated. Operation security maintained.',
    },
    {
      agentId: createdAgents[4].id,
      action: 'gathered intelligence on',
      location: 'Havana',
      target: 'Crime Syndicate',
      timestamp: new Date('2025-06-23T20:15:00'),
      details: 'Critical intelligence on financial operations obtained through HUMINT sources.',
    },
    {
      agentId: createdAgents[6].id,
      action: 'established safe house in',
      location: 'Tokyo',
      timestamp: new Date('2025-06-23T18:00:00'),
      details: 'Operational base established. Communications equipment installed and tested.',
    },
  ]

  await prisma.activityLog.createMany({
    data: activityData,
  })

  const activityCount = await prisma.activityLog.count()
  console.log(`✅ Created ${activityCount} activity logs`)
}

export async function seedChatMessages(prisma: PrismaClient) {
  console.log('💬 Seeding chat messages...')

  // Get created agents for relationships
  const createdAgents = await prisma.agent.findMany()

  if (createdAgents.length === 0) {
    console.log('⚠️ No agents found, skipping chat messages')
    return
  }

  // Create Chat Messages
  const chatData = [
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
    {
      agentId: createdAgents[1].id,
      channel: 'INTELLIGENCE',
      message: 'Package delivered. Awaiting further instructions.',
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
    },
    {
      channel: 'SYSTEM',
      message: 'Security alert: Unauthorized access attempt detected on SYS-003',
      isSystem: true,
      timestamp: new Date(Date.now() - 35 * 60 * 1000),
    },
    {
      agentId: createdAgents[4].id,
      channel: 'EMERGENCY',
      message: 'MAYDAY MAYDAY - Cover blown, requesting immediate extraction',
      timestamp: new Date(Date.now() - 40 * 60 * 1000),
    },
    {
      agentId: createdAgents[7].id,
      channel: 'TACTICAL',
      message: 'Objective complete. Returning to base.',
      timestamp: new Date(Date.now() - 45 * 60 * 1000),
    },
    {
      channel: 'SYSTEM',
      message: 'Database backup completed successfully',
      isSystem: true,
      timestamp: new Date(Date.now() - 50 * 60 * 1000),
    },
    {
      agentId: createdAgents[3].id,
      channel: 'INTELLIGENCE',
      message: 'High-value intelligence obtained. Uploading to secure server.',
      timestamp: new Date(Date.now() - 55 * 60 * 1000),
    },
  ]

  await prisma.chatMessage.createMany({
    data: chatData,
  })

  const chatCount = await prisma.chatMessage.count()
  console.log(`✅ Created ${chatCount} chat messages`)
}

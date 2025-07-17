import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function seedAgents(prisma: PrismaClient) {
  console.log('🕵️ Seeding agents...')

  // Clear existing agent data
  await prisma.activityLog.deleteMany()
  await prisma.intelligenceReport.deleteMany()
  await prisma.operationAssignment.deleteMany()
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

  console.log(`✅ Created ${agents.count} agents`)
  return agents
}

// Run if executed directly
if (require.main === module) {
  seedAgents(prisma)
    .then(() => {
      console.log('✅ Agents seeding completed successfully!')
      return prisma.$disconnect()
    })
    .catch((error) => {
      console.error('❌ Error seeding agents:', error)
      return prisma.$disconnect()
    })
}

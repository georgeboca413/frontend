import { PrismaClient } from '@prisma/client'
import { seedAgents } from './seeds/seed_agents'
import { seedOperations, seedOperationObjectives, seedOperationAssignments } from './seeds/seed_operations'
import { seedIntelligence } from './seeds/seed_intelligence'
import { seedSystems, seedSystemMetrics, seedSystemMaintenance } from './seeds/seed_systems'
import { seedActivityLogs, seedChatMessages } from './seeds/seed_activity'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seeding...\n')

  try {
    // Clear all data first (in correct order to respect foreign key constraints)
    console.log('🧹 Clearing existing data...')
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
    console.log('✅ Database cleared\n')

    // Seed core entities first
    await seedAgents(prisma)
    await seedOperations(prisma)
    await seedSystems(prisma)
    
    console.log() // Empty line for better readability
    
    // Seed dependent entities
    await seedOperationObjectives(prisma)
    await seedOperationAssignments(prisma)
    await seedIntelligence(prisma)
    
    console.log() // Empty line for better readability
    
    // Seed metrics and activity data
    await seedSystemMetrics(prisma)
    await seedSystemMaintenance(prisma)
    await seedActivityLogs(prisma)
    await seedChatMessages(prisma)

    console.log('\n🎉 Database seeding completed successfully!')
    
    // Show final statistics
    console.log('\n📊 Final Statistics:')
    const stats = await Promise.all([
      prisma.agent.count(),
      prisma.operation.count(),
      prisma.operationObjective.count(),
      prisma.operationAssignment.count(),
      prisma.intelligenceReport.count(),
      prisma.system.count(),
      prisma.systemMetric.count(),
      prisma.systemMaintenance.count(),
      prisma.activityLog.count(),
      prisma.chatMessage.count(),
    ])

    console.log(`   Agents: ${stats[0]}`)
    console.log(`   Operations: ${stats[1]}`)
    console.log(`   Operation Objectives: ${stats[2]}`)
    console.log(`   Operation Assignments: ${stats[3]}`)
    console.log(`   Intelligence Reports: ${stats[4]}`)
    console.log(`   Systems: ${stats[5]}`)
    console.log(`   System Metrics: ${stats[6]}`)
    console.log(`   System Maintenance: ${stats[7]}`)
    console.log(`   Activity Logs: ${stats[8]}`)
    console.log(`   Chat Messages: ${stats[9]}`)
    
    console.log(`\n   Total Records: ${stats.reduce((sum, count) => sum + count, 0)}`)

  } catch (error) {
    console.error('💥 Error during seeding:', error)
    throw error
  }
}

// Individual seed functions for targeted seeding
export async function seedAgentsOnly() {
  console.log('🕵️ Seeding agents only...')
  try {
    await seedAgents(prisma)
    console.log('✅ Agents seeding completed')
  } catch (error) {
    console.error('❌ Error seeding agents:', error)
  } finally {
    await prisma.$disconnect()
  }
}

export async function seedOperationsOnly() {
  console.log('🎯 Seeding operations only...')
  try {
    await seedOperations(prisma)
    await seedOperationObjectives(prisma)
    await seedOperationAssignments(prisma)
    console.log('✅ Operations seeding completed')
  } catch (error) {
    console.error('❌ Error seeding operations:', error)
  } finally {
    await prisma.$disconnect()
  }
}

export async function seedIntelligenceOnly() {
  console.log('📊 Seeding intelligence only...')
  try {
    await seedIntelligence(prisma)
    console.log('✅ Intelligence seeding completed')
  } catch (error) {
    console.error('❌ Error seeding intelligence:', error)
  } finally {
    await prisma.$disconnect()
  }
}

export async function seedSystemsOnly() {
  console.log('🖥️ Seeding systems only...')
  try {
    await seedSystems(prisma)
    await seedSystemMetrics(prisma)
    await seedSystemMaintenance(prisma)
    console.log('✅ Systems seeding completed')
  } catch (error) {
    console.error('❌ Error seeding systems:', error)
  } finally {
    await prisma.$disconnect()
  }
}

export async function seedActivityOnly() {
  console.log('📝 Seeding activity only...')
  try {
    await seedActivityLogs(prisma)
    await seedChatMessages(prisma)
    console.log('✅ Activity seeding completed')
  } catch (error) {
    console.error('❌ Error seeding activity:', error)
  } finally {
    await prisma.$disconnect()
  }
}

// Run main function if this file is executed directly
if (require.main === module) {
  main()
    .catch((e) => {
      console.error('Error seeding database:', e)
      process.exit(1)
    })
    .finally(async () => {
      await prisma.$disconnect()
    })
}

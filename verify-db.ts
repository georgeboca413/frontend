import { prisma } from './lib/db'

async function verifyDatabase() {
  try {
    console.log('🔍 Verifying database setup...\n')

    // Count records in each table
    const agentCount = await prisma.agent.count()
    const operationCount = await prisma.operation.count()
    const intelligenceCount = await prisma.intelligenceReport.count()
    const systemCount = await prisma.system.count()
    const activityCount = await prisma.activityLog.count()

    console.log('📊 Database Statistics:')
    console.log(`   Agents: ${agentCount}`)
    console.log(`   Operations: ${operationCount}`)
    console.log(`   Intelligence Reports: ${intelligenceCount}`)
    console.log(`   Systems: ${systemCount}`)
    console.log(`   Activity Logs: ${activityCount}\n`)

    // Test a complex query with relations
    const agentWithRelations = await prisma.agent.findFirst({
      include: {
        operationAssignments: {
          include: {
            operation: {
              select: { name: true, status: true }
            }
          }
        },
        intelligenceReports: {
          select: { title: true, classification: true }
        },
        activityLogs: {
          select: { action: true, location: true, timestamp: true },
          orderBy: { timestamp: 'desc' },
          take: 3
        }
      }
    })

    if (agentWithRelations) {
      console.log('🕵️ Sample Agent Data:')
      console.log(`   Agent: ${agentWithRelations.agentId} - ${agentWithRelations.name}`)
      console.log(`   Status: ${agentWithRelations.status}`)
      console.log(`   Location: ${agentWithRelations.location}`)
      console.log(`   Risk Level: ${agentWithRelations.riskLevel}`)
      console.log(`   Active Operations: ${agentWithRelations.operationAssignments.length}`)
      console.log(`   Intelligence Reports: ${agentWithRelations.intelligenceReports.length}`)
      console.log(`   Recent Activities: ${agentWithRelations.activityLogs.length}\n`)
    }

    // Test operation with objectives
    const operationWithObjectives = await prisma.operation.findFirst({
      include: {
        objectives: true,
        assignments: {
          include: {
            agent: {
              select: { agentId: true, name: true }
            }
          }
        }
      }
    })

    if (operationWithObjectives) {
      console.log('🎯 Sample Operation Data:')
      console.log(`   Operation: ${operationWithObjectives.operationId} - ${operationWithObjectives.name}`)
      console.log(`   Status: ${operationWithObjectives.status}`)
      console.log(`   Priority: ${operationWithObjectives.priority}`)
      console.log(`   Progress: ${operationWithObjectives.progress}%`)
      console.log(`   Assigned Agents: ${operationWithObjectives.assignments.length}`)
      console.log(`   Objectives: ${operationWithObjectives.objectives.length}\n`)
    }

    console.log('✅ Database verification completed successfully!')
    console.log('🌐 Prisma Studio is available at: http://localhost:5555')
    
  } catch (error) {
    console.error('❌ Database verification failed:', error)
  } finally {
    await prisma.$disconnect()
  }
}

verifyDatabase()

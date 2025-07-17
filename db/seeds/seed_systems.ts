import { PrismaClient } from '@prisma/client'

export async function seedSystems(prisma: PrismaClient) {
  console.log('🖥️ Seeding systems...')

  // Clear existing system data
  await prisma.systemMaintenance.deleteMany()
  await prisma.systemMetric.deleteMany()
  await prisma.system.deleteMany()

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
      {
        systemId: 'SYS-007',
        name: 'SATELLITE UPLINK',
        type: 'Communication',
        status: 'online',
        health: 89,
        location: 'Remote Station',
        uptime: '78 days',
        lastMaintenance: new Date('2025-04-30'),
      },
      {
        systemId: 'SYS-008',
        name: 'QUANTUM ENCRYPTION',
        type: 'Security',
        status: 'online',
        health: 99,
        location: 'Secure Vault',
        uptime: '312 days',
        lastMaintenance: new Date('2024-09-15'),
      },
    ],
  })

  const systemCount = await prisma.system.count()
  console.log(`✅ Created ${systemCount} systems`)
}

export async function seedSystemMetrics(prisma: PrismaClient) {
  console.log('📈 Seeding system metrics...')

  // Create System Metrics (recent performance data)
  const systems = await prisma.system.findMany()
  
  for (const system of systems) {
    const baseTime = new Date()
    const metricsData = []
    
    // Create 24 hours of metrics (every hour)
    for (let i = 0; i < 24; i++) {
      const timestamp = new Date(baseTime.getTime() - i * 60 * 60 * 1000)
      
      // Generate realistic metrics based on system type and status
      let baseCpu = 30
      let baseMemory = 40
      let baseStorage = 35
      
      if (system.type === 'Database') {
        baseCpu = 60
        baseMemory = 70
        baseStorage = 80
      } else if (system.type === 'Processing') {
        baseCpu = 80
        baseMemory = 65
        baseStorage = 45
      } else if (system.status === 'warning') {
        baseCpu += 20
        baseMemory += 15
      }
      
      metricsData.push({
        systemId: system.id,
        cpu: Math.max(0, Math.min(100, baseCpu + Math.floor(Math.random() * 20) - 10)),
        memory: Math.max(0, Math.min(100, baseMemory + Math.floor(Math.random() * 20) - 10)),
        storage: Math.max(0, Math.min(100, baseStorage + Math.floor(Math.random() * 15) - 7)),
        timestamp,
      })
    }
    
    await prisma.systemMetric.createMany({
      data: metricsData
    })
  }

  const metricsCount = await prisma.systemMetric.count()
  console.log(`✅ Created ${metricsCount} system metrics`)
}

export async function seedSystemMaintenance(prisma: PrismaClient) {
  console.log('🔧 Seeding system maintenance records...')

  const systems = await prisma.system.findMany()
  
  for (const system of systems) {
    // Create some historical maintenance records
    const maintenanceData = [
      {
        systemId: system.id,
        title: 'Routine Maintenance',
        description: 'Regular system health check and updates',
        scheduledAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Next week
        status: 'scheduled',
        performedBy: 'System Admin Team',
      },
      {
        systemId: system.id,
        title: 'Security Patch',
        description: 'Applied latest security patches and updates',
        scheduledAt: system.lastMaintenance || new Date('2025-06-01'),
        completedAt: system.lastMaintenance || new Date('2025-06-01'),
        status: 'completed',
        performedBy: 'Security Team',
        notes: 'All patches applied successfully. System restarted.',
      },
    ]
    
    // Add emergency maintenance for systems with issues
    if (system.status === 'warning' || system.status === 'maintenance') {
      maintenanceData.push({
        systemId: system.id,
        title: 'Emergency Maintenance',
        description: 'Addressing system performance issues',
        scheduledAt: new Date(Date.now() + 2 * 60 * 60 * 1000), // In 2 hours
        status: 'scheduled',
        performedBy: 'Emergency Response Team',
      })
    }
    
    await prisma.systemMaintenance.createMany({
      data: maintenanceData
    })
  }

  const maintenanceCount = await prisma.systemMaintenance.count()
  console.log(`✅ Created ${maintenanceCount} maintenance records`)
}

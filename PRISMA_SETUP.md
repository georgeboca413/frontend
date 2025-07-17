# Prisma Database Setup Documentation

## Overview

This document explains the Prisma database setup for the Tactical Operations Dashboard. The database uses SQLite for development and contains comprehensive schemas for managing agents, operations, intelligence reports, systems, and activity logs.

## Database Schema

### Core Models

#### 1. Agent Model
- **Purpose**: Manages field operatives and their information
- **Key Fields**: 
  - `agentId`: Unique tactical identifier (e.g., G-078W)
  - `name`: Codename (e.g., VENGEFUL SPIRIT)
  - `status`: active, standby, compromised, training
  - `location`: Current operational location
  - `riskLevel`: low, medium, high, critical
  - `missions`: Total mission count
- **Relations**: 
  - Operation assignments (many-to-many)
  - Intelligence reports (one-to-many)
  - Activity logs (one-to-many)
  - Chat messages (one-to-many)

#### 2. Operation Model
- **Purpose**: Manages tactical operations and missions
- **Key Fields**:
  - `operationId`: Unique operation identifier (e.g., OP-OMEGA-001)
  - `name`: Operation codename (e.g., SHADOW PROTOCOL)
  - `status`: active, planning, completed, compromised
  - `priority`: low, medium, high, critical
  - `progress`: Completion percentage (0-100)
- **Relations**:
  - Agent assignments (many-to-many via OperationAssignment)
  - Objectives (one-to-many)
  - Status updates (one-to-many)

#### 3. IntelligenceReport Model
- **Purpose**: Manages intelligence reports and analysis
- **Key Fields**:
  - `reportId`: Unique report identifier (e.g., INT-2025-001)
  - `classification`: TOP SECRET, SECRET, CONFIDENTIAL
  - `source`: SIGINT, HUMINT, OSINT, DIPLOMATIC
  - `threatLevel`: low, medium, high, critical
  - `tags`: JSON array of categorization tags
- **Relations**:
  - Linked to agents (optional)

#### 4. System Model
- **Purpose**: Infrastructure and server monitoring
- **Key Fields**:
  - `systemId`: Unique system identifier (e.g., SYS-001)
  - `type`: Primary Server, Database, Firewall, etc.
  - `status`: online, warning, maintenance, offline
  - `health`: Health percentage (0-100)
  - `uptime`: System uptime duration
- **Relations**:
  - Performance metrics (one-to-many)
  - Maintenance records (one-to-many)

#### 5. ActivityLog Model
- **Purpose**: Tracks agent activities and system events
- **Key Fields**:
  - `action`: Description of the activity
  - `location`: Where the activity occurred
  - `target`: Optional target information
- **Relations**:
  - Linked to agents

## Database Setup Commands

### Initial Setup
```bash
# Install Prisma packages
npm install prisma @prisma/client --legacy-peer-deps

# Initialize Prisma with SQLite
npx prisma init --datasource-provider sqlite

# Generate Prisma client
npx prisma generate

# Create database and apply schema
npx prisma db push

# Seed database with sample data
npm run db:seed
```

### Development Commands
```bash
# Reset database and reseed
npm run db:reset

# View database in Prisma Studio
npx prisma studio

# Generate client after schema changes
npx prisma generate

# Push schema changes to database
npx prisma db push
```

## API Routes

The following API routes are available for database operations:

### Agents
- `GET /api/agents` - List agents with optional filtering
- `POST /api/agents` - Create new agent

### Operations
- `GET /api/operations` - List operations with optional filtering
- `POST /api/operations` - Create new operation

### Intelligence Reports
- `GET /api/intelligence` - List reports with optional filtering
- `POST /api/intelligence` - Create new intelligence report

### Systems
- `GET /api/systems` - List systems with optional filtering
- `POST /api/systems` - Create new system

### Activity Logs
- `GET /api/activity-logs` - List activity logs
- `POST /api/activity-logs` - Create new activity log

### Dashboard Statistics
- `GET /api/dashboard/stats` - Get comprehensive dashboard statistics

## Usage Examples

### Fetching Agents with Relations
```typescript
import { prisma } from '@/lib/db'

const agents = await prisma.agent.findMany({
  include: {
    operationAssignments: {
      include: {
        operation: true
      }
    },
    intelligenceReports: true,
    activityLogs: {
      orderBy: { timestamp: 'desc' },
      take: 5
    }
  }
})
```

### Creating a New Operation
```typescript
const operation = await prisma.operation.create({
  data: {
    operationId: 'OP-DELTA-003',
    name: 'NIGHT HAWK',
    status: 'planning',
    priority: 'high',
    location: 'London',
    description: 'Urban surveillance operation',
    startDate: new Date(),
    estimatedCompletion: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
    objectives: {
      create: [
        { title: 'Establish surveillance', order: 1 },
        { title: 'Identify targets', order: 2 },
        { title: 'Gather intelligence', order: 3 }
      ]
    }
  }
})
```

### Assigning Agents to Operations
```typescript
await prisma.operationAssignment.create({
  data: {
    agentId: 'agent-id',
    operationId: 'operation-id',
    role: 'lead'
  }
})
```

## Data Types and Interfaces

TypeScript interfaces are available in `/lib/types.ts` for type-safe database operations:

- `AgentWithRelations`
- `OperationWithRelations`
- `IntelligenceReportWithAgent`
- `SystemWithMetrics`
- `ActivityLogWithAgent`
- `DashboardStats`

## Database File Location

The SQLite database file is located at:
```
./prisma/dev.db
```

This file contains all your application data and should be backed up regularly in production.

## Environment Variables

Database configuration is managed through the `.env` file:

```env
DATABASE_URL="file:./dev.db"
```

## Best Practices

1. **Always use transactions** for operations that modify multiple related records
2. **Include relations** only when needed to avoid over-fetching
3. **Use proper filtering** with WHERE clauses to limit data transfer
4. **Implement pagination** for large datasets
5. **Handle errors gracefully** with try-catch blocks in API routes
6. **Use TypeScript interfaces** for type safety

## Troubleshooting

### Common Issues

1. **Prisma Client not generated**: Run `npx prisma generate`
2. **Database out of sync**: Run `npx prisma db push`
3. **Schema changes not applied**: Delete `dev.db` and run `npx prisma db push`
4. **TypeScript errors**: Ensure Prisma client is generated and imported correctly

### Useful Debugging Commands

```bash
# Check database schema
npx prisma db pull

# Inspect database
npx prisma studio

# Validate schema
npx prisma validate

# Format schema file
npx prisma format
```

This setup provides a robust foundation for your Tactical Operations Dashboard with real database persistence and comprehensive data relationships.

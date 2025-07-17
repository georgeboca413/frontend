# Database Structure and Seeding Guide

## Overview
The database has been successfully restructured from `prisma/` to `db/` with modular seed files organized by functionality.

## Directory Structure
```
db/
├── schema.prisma          # Main Prisma schema
├── .env                   # Database configuration
├── seed.ts               # Main orchestrator seed file
└── seeds/                # Individual seed modules
    ├── seed_agents.ts     # Agent network data
    ├── seed_operations.ts # Operations and assignments
    ├── seed_intelligence.ts # Intelligence reports
    ├── seed_systems.ts    # System monitoring data
    └── seed_activity.ts   # Activity logs and chat messages
```

## Database Schema

### Core Entities
- **Agent** - Field operatives with status, location, risk levels
- **Operation** - Missions with progress tracking and objectives
- **IntelligenceReport** - Classified reports linked to agents
- **System** - Infrastructure monitoring with health metrics
- **ActivityLog** - Agent activity tracking
- **ChatMessage** - Encrypted communications

### Relationship Models
- **OperationAssignment** - Many-to-many between agents and operations
- **OperationObjective** - Mission goals and completion tracking
- **OperationStatusUpdate** - Historical status changes
- **SystemMetric** - Historical performance data
- **SystemMaintenance** - Maintenance scheduling and records

## Seeding Commands

### Complete Database Seeding
```bash
npm run db:seed          # Seed entire database with all data
npm run db:reset         # Reset database and reseed everything
```

### Individual Entity Seeding
```bash
npm run db:seed:agents       # Seed only agents (clears related data)
npm run db:seed:operations   # Seed operations, objectives, assignments
npm run db:seed:intelligence # Seed intelligence reports
npm run db:seed:systems      # Seed systems, metrics, maintenance
npm run db:seed:activity     # Seed activity logs and chat messages
```

### Database Management
```bash
npm run db:verify        # Verify database setup and show statistics
npm run db:studio        # Open Prisma Studio (database GUI)
```

## Seeding Order and Dependencies

### 1. Core Entities (Independent)
- Agents (8 tactical operatives)
- Operations (5 missions with varying status)
- Systems (8 infrastructure components)

### 2. Dependent Entities
- Operation Objectives (linked to operations)
- Operation Assignments (links agents to operations)
- Intelligence Reports (linked to agents)

### 3. Metrics and Activity
- System Metrics (24 hours of performance data per system)
- System Maintenance (scheduled and historical records)
- Activity Logs (agent activities with timestamps)
- Chat Messages (encrypted communications)

## Sample Data Overview

### Agents (8 total)
- **Active**: 4 agents (Berlin, Cairo, London, Paris)
- **Standby**: 2 agents (Tokyo, Sydney)
- **Training**: 1 agent (Base Alpha)
- **Compromised**: 1 agent (Moscow)

### Operations (5 total)
- **Active**: 2 operations (SHADOW PROTOCOL, CRIMSON TIDE)
- **Planning**: 1 operation (GHOST FIRE)
- **Completed**: 1 operation (NIGHT STALKER)
- **Compromised**: 1 operation (SILENT BLADE)

### Intelligence Reports (7 total)
- **Classifications**: TOP SECRET (3), SECRET (3), CONFIDENTIAL (1)
- **Threat Levels**: Critical (3), High (2), Medium (1), Low (1)
- **Sources**: SIGINT, HUMINT, OSINT, DIPLOMATIC, FININT, TECHINT

### Systems (8 total)
- **Online**: 6 systems with health 89-99%
- **Warning**: 1 system (Security Gateway - 87% health)
- **Maintenance**: 1 system (Backup Storage Array - 76% health)

## File Structure Details

### Main Seed File (`db/seed.ts`)
- Orchestrates all seeding operations
- Handles proper dependency order
- Provides individual seed exports
- Includes comprehensive error handling
- Shows final statistics

### Individual Seed Files
Each seed file in `db/seeds/` is:
- **Modular**: Can be run independently when possible
- **Documented**: Clear console output showing progress
- **Resilient**: Proper error handling and cleanup
- **Data-rich**: Realistic tactical operations data

### Environment Configuration
- `db/.env`: Database URL for schema operations
- `.env`: Main environment variables for application

## API Integration
The database structure supports all existing API routes:
- `/api/agents` - Agent management with relationships
- `/api/operations` - Operations with assignments and objectives
- `/api/intelligence` - Intelligence reports with agent links
- `/api/systems` - System monitoring with metrics
- `/api/activity-logs` - Activity tracking
- `/api/dashboard/stats` - Comprehensive statistics

## Development Workflow

### Daily Development
```bash
npm run db:verify        # Check current database state
npm run db:studio        # Browse data visually
```

### Data Reset During Development
```bash
npm run db:reset         # Complete reset and reseed
```

### Targeted Data Updates
```bash
npm run db:seed:agents   # Update only agent data
npm run db:seed:systems  # Update only system data
```

## Performance Notes
- **Total Records**: ~282 records across all tables
- **System Metrics**: 24 hours × 8 systems = 192 metric records
- **Seeding Time**: ~2-3 seconds for complete database
- **Database Size**: ~1-2MB SQLite file

This modular structure allows for flexible development and testing while maintaining data integrity and realistic operational scenarios for your Tactical Operations Dashboard.

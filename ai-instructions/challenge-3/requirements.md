# Project Requirements - Tactical Operations Dashboard

## Project Overview

The **Tactical Operations Dashboard** is a sophisticated cybersecurity mission management web application designed for tactical command and control operations. This is a front-end only application built with modern web technologies to simulate a classified operations center interface for managing agents, missions, intelligence, and systems.

## Technical Stack

### Core Framework
- **Next.js 15.2.4** - React-based framework for production-ready applications
- **React 19** - Latest React version with improved performance and features
- **TypeScript 5** - Type-safe JavaScript for enhanced development experience

### Styling & UI
- **Tailwind CSS 3.4.17** - Utility-first CSS framework for rapid styling
- **Shadcn/ui** - High-quality, accessible component library
- **Radix UI** - Primitive components for building design systems
- **Lucide React** - Beautiful SVG icon library
- **Next Themes** - Dark mode support

### Additional Libraries
- **React Hook Form** - Form state management and validation
- **Zod** - TypeScript-first schema validation
- **Recharts** - Chart library for data visualization
- **Class Variance Authority** - CSS-in-JS utility for component variants
- **Tailwind Merge** - Utility for merging Tailwind classes
- **Sonner** - Toast notifications
- **Date-fns** - Date manipulation utilities

## Design System

### Color Palette
- **Primary Background**: `#000000` (pure black)
- **Card Background**: `bg-neutral-900` (dark gray)
- **Accent Color**: `text-orange-500` / `bg-orange-500` (orange highlights)
- **Primary Text**: `text-white` (white)
- **Secondary Text**: `text-neutral-400` (gray)
- **Borders**: `border-neutral-700` (dark gray borders)

### Typography
- **Base Font**: Monospace (`font-mono`) for technical/tactical appearance
- **Tracking**: Wide letter spacing (`tracking-wider`) for headers
- **Hierarchy**: Consistent heading structure with proper contrast

### Visual Theme
- **Dark Mode**: Exclusively dark interface simulating command center environment
- **Military/Tactical Aesthetic**: Monospace fonts, structured layouts, status indicators
- **High Contrast**: Clear visual hierarchy with orange accents for important elements

## Application Structure

### Layout Components
- **Root Layout**: (`app/layout.tsx`) - Global layout with metadata
- **Main Dashboard**: (`app/page.tsx`) - Central navigation hub
- **Sidebar Navigation**: Collapsible menu with 5 main sections
- **Top Navigation Bar**: Status information and user controls

### Page Sections

#### 1. Command Center (`/command-center`)
- **Agent Allocation Card**: Statistics on active, undercover, and training agents
- **Activity Log Card**: Scrollable list of recent agent activities
- **Encrypted Chat Activity Card**: Simulated secure communication interface
- **Mission Activity Overview Card**: Data visualization with charts
- **Mission Information Card**: Success/failure statistics by risk level

#### 2. Agent Network (`/agent-network`)
- **Agent Management Interface**: Search, filter, and deploy agents
- **Agent Roster Table**: Comprehensive agent information display
- **Agent Details Modal**: Individual agent information and actions
- **Status Indicators**: Visual status representation with colored dots
- **Risk Assessment**: Color-coded risk levels (Low to Critical)

#### 3. Operations (`/operations`)
- **Operations Center**: Mission planning and execution oversight
- **Operation Cards**: Individual mission information and progress
- **Status Tracking**: Active, completed, and compromised operations
- **Progress Visualization**: Progress bars and completion metrics
- **Mission Details Modal**: Extended operation information

#### 4. Intelligence (`/intelligence`)
- **Intelligence Center**: Report management and analysis
- **Report Search**: Advanced filtering and search capabilities
- **Threat Assessment**: Critical threats monitoring
- **Source Management**: Active intelligence sources tracking
- **Report Cards**: Structured intelligence report display

#### 5. Systems (`/systems`)
- **Systems Monitor**: Infrastructure and server monitoring
- **Server Status Cards**: Individual server health and metrics
- **Maintenance Scheduling**: System maintenance management
- **Log Viewing**: System logs and diagnostics
- **Performance Metrics**: Real-time system performance data

## Key Features

### Navigation
- **Responsive Sidebar**: Collapsible navigation with icons and labels
- **Section Routing**: Client-side routing between dashboard sections
- **Breadcrumb Navigation**: Current location indicator
- **Mobile Responsive**: Adaptive layout for different screen sizes

### Data Visualization
- **Charts and Graphs**: Mission activity trends and statistics
- **Progress Indicators**: Visual progress bars for operations
- **Status Indicators**: Color-coded status dots and badges
- **Real-time Updates**: Simulated live data updates

### User Interface
- **Modal Windows**: Detailed views for agents, operations, and systems
- **Search Functionality**: Real-time search across different sections
- **Filtering Options**: Advanced filtering for data management
- **Responsive Design**: Mobile-first approach with desktop optimization

### Security Simulation
- **Classified Interface**: Military-style command center design
- **Agent Codenames**: Tactical naming conventions
- **Secure Communications**: Encrypted chat simulation
- **Risk Assessment**: Multi-level security risk indicators

## Development Configuration

### Build Configuration
- **ESLint**: Disabled during builds for development speed
- **TypeScript**: Build errors ignored for rapid prototyping
- **Image Optimization**: Disabled for static deployment
- **CSS Processing**: PostCSS with Tailwind compilation

### Component Architecture
- **Shadcn/ui Integration**: Pre-configured component library
- **Custom Hooks**: Reusable logic for mobile detection and toasts
- **TypeScript Strict Mode**: Type safety throughout the application
- **Component Composition**: Modular, reusable component structure

## Project Structure

```
frontend/
├── app/                     # Next.js app router pages
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Main dashboard
│   ├── command-center/     # Command center page
│   ├── agent-network/      # Agent management page
│   ├── operations/         # Operations page
│   ├── intelligence/       # Intelligence page
│   └── systems/            # Systems page
├── components/             # Reusable UI components
│   ├── ui/                 # Shadcn/ui components
│   └── theme-provider.tsx  # Theme configuration
├── lib/                    # Utility functions
├── hooks/                  # Custom React hooks
├── public/                 # Static assets
└── ai-instructions/        # Development documentation
```

## Current Status

The application is currently in **Challenge 3** phase, with the following implementation status:

### Completed Features
- ✅ Basic application structure and routing
- ✅ Sidebar navigation with collapsible functionality
- ✅ Command center page with all required cards
- ✅ Agent network page with search and filtering
- ✅ Operations page with mission management
- ✅ Intelligence page with report system
- ✅ Systems page with server monitoring
- ✅ Responsive design implementation
- ✅ Dark theme with orange accents

### Mock Data
- All data displayed is **simulated/mock data** for demonstration purposes
- No backend integration or real API connections
- Designed as a **front-end only** application for presentation

## Development Notes

### Design Constraints
- **No Real Backend**: All data is hardcoded for demonstration
- **Art Project**: Focus on visual design and user experience
- **Classified Theme**: Military/tactical aesthetic throughout
- **Performance**: Optimized for smooth animations and interactions

### Browser Compatibility
- Modern browsers supporting ES6+ features
- Mobile-responsive design for tablets and phones
- Optimized for both desktop and mobile viewing

### Future Considerations
- Potential for backend integration
- Real-time data streaming capabilities
- User authentication and authorization
- Advanced data visualization features
- Multi-language support (currently Spanish locale configured)

## Conclusion

This Tactical Operations Dashboard represents a sophisticated front-end application designed to simulate a classified command center environment. Built with cutting-edge web technologies and following modern development practices, it provides an immersive experience for managing tactical operations, agent networks, intelligence reports, and system monitoring in a visually striking and user-friendly interface.

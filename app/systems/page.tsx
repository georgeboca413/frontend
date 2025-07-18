"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Server, Database, Shield, Wifi, HardDrive, Cpu } from "lucide-react"

export default function SystemsPage() {
  const systems = [
    {
      id: "1",
      systemId: "SYS-MAIN-001",
      name: "Primary Operations Server",
      type: "Primary Server",
      status: "online",
      health: 98,
      location: "Data Center Alpha",
      uptime: "99.9%",
    },
    {
      id: "2", 
      systemId: "SYS-DB-002",
      name: "Intelligence Database Cluster",
      type: "Database",
      status: "online",
      health: 95,
      location: "Data Center Beta",
      uptime: "99.7%",
    },
    {
      id: "3",
      systemId: "SYS-FW-003",
      name: "Perimeter Security Firewall",
      type: "Firewall", 
      status: "warning",
      health: 87,
      location: "Network Edge",
      uptime: "98.5%",
    },
    {
      id: "4",
      systemId: "SYS-NET-004",
      name: "Secure Communication Network",
      type: "Network",
      status: "online", 
      health: 92,
      location: "Global Infrastructure",
      uptime: "99.2%",
    },
    {
      id: "5",
      systemId: "SYS-STR-005",
      name: "Encrypted Storage Array",
      type: "Storage",
      status: "maintenance",
      health: 78,
      location: "Data Center Gamma", 
      uptime: "97.8%",
    },
    {
      id: "6",
      systemId: "SYS-CPU-006",
      name: "Analytics Processing Unit",
      type: "Processing",
      status: "online",
      health: 89,
      location: "Compute Cluster",
      uptime: "98.9%",
    }
  ]

  const getIcon = (type: string) => {
    switch (type) {
      case 'Primary Server': return Server
      case 'Database': return Database
      case 'Firewall': return Shield
      case 'Network': return Wifi
      case 'Storage': return HardDrive
      case 'Processing': return Cpu
      default: return Server
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-wider">SYSTEMS MONITORING</h1>
          <p className="text-sm text-neutral-400">Infrastructure and system health oversight</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {systems.map((system) => {
          const Icon = getIcon(system.type)
          return (
            <Card key={system.id} className="bg-neutral-900 border-neutral-700 hover:border-neutral-600 transition-colors cursor-pointer">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Icon className="w-4 h-4 text-neutral-400" />
                    <CardTitle className="text-sm font-medium text-white">
                      {system.name}
                    </CardTitle>
                  </div>
                  <Badge 
                    variant="outline" 
                    className={`text-xs ${
                      system.status === 'online' ? 'bg-white/20 text-white border-white' :
                      system.status === 'warning' ? 'bg-orange-500/20 text-orange-500 border-orange-500' :
                      system.status === 'maintenance' ? 'bg-neutral-500/20 text-neutral-300 border-neutral-500' :
                      'bg-red-500/20 text-red-500 border-red-500'
                    }`}
                  >
                    {system.status}
                  </Badge>
                </div>
                <div className="text-xs text-neutral-500 font-mono">{system.systemId}</div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Type</span>
                    <span className="text-white">{system.type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Location</span>
                    <span className="text-white">{system.location}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Uptime</span>
                    <span className="text-white font-mono">{system.uptime}</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-neutral-400">Health</span>
                    <span className="text-white font-mono">{system.health}%</span>
                  </div>
                  <Progress 
                    value={system.health} 
                    className="h-2"
                  />
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

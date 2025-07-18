import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Server,
  Database,
  Shield,
  Wifi,
  HardDrive,
  Cpu,
  Activity,
  AlertTriangle,
  CheckCircle,
  Settings,
} from "lucide-react"
import type { SystemWithMetrics } from "../types/sys-types"
import { 
  SYSTEM_STATUS_COLORS_CONFIG,
  SYSTEM_STATUS_ICONS_CONFIG,
  SYSTEM_TYPE_ICONS_CONFIG 
} from "../config/sys-config"

interface SysSystemCardProps {
  system: SystemWithMetrics
  onSystemClick: (system: SystemWithMetrics) => void
  formatDate: (date: Date | null) => string
}

export function SysSystemCard({ system, onSystemClick, formatDate }: SysSystemCardProps) {
  const statusColor = SYSTEM_STATUS_COLORS_CONFIG[system.status as keyof typeof SYSTEM_STATUS_COLORS_CONFIG]
  
  const getStatusIcon = (status: string) => {
    const iconName = SYSTEM_STATUS_ICONS_CONFIG[status as keyof typeof SYSTEM_STATUS_ICONS_CONFIG]
    switch (iconName) {
      case "CheckCircle": return <CheckCircle className="w-4 h-4" />
      case "AlertTriangle": return <AlertTriangle className="w-4 h-4" />
      case "Settings": return <Settings className="w-4 h-4" />
      default: return <Activity className="w-4 h-4" />
    }
  }

  const getSystemIcon = (type: string) => {
    const iconName = SYSTEM_TYPE_ICONS_CONFIG[type as keyof typeof SYSTEM_TYPE_ICONS_CONFIG]
    switch (iconName) {
      case "Server": return <Server className="w-6 h-6" />
      case "Database": return <Database className="w-6 h-6" />
      case "Shield": return <Shield className="w-6 h-6" />
      case "Wifi": return <Wifi className="w-6 h-6" />
      case "HardDrive": return <HardDrive className="w-6 h-6" />
      case "Cpu": return <Cpu className="w-6 h-6" />
      default: return <Server className="w-6 h-6" />
    }
  }

  const getHealthColor = (health: number) => {
    if (health >= 90) return "text-white"
    if (health >= 70) return "text-orange-500"
    return "text-red-500"
  }

  const latestMetric = system.metrics[0] // Assuming metrics are sorted by timestamp desc

  return (
    <Card 
      className="bg-neutral-900 border-neutral-700 hover:bg-neutral-800 transition-colors cursor-pointer"
      onClick={() => onSystemClick(system)}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="text-neutral-400">
              {getSystemIcon(system.type)}
            </div>
            <div>
              <CardTitle className="text-sm font-bold text-white tracking-wider">{system.name}</CardTitle>
              <p className="text-xs text-neutral-400 font-mono">{system.systemId}</p>
            </div>
          </div>
          <Badge className={statusColor}>
            {getStatusIcon(system.status)}
            <span className="ml-1 uppercase text-xs">{system.status}</span>
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Health Overview */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs text-neutral-400 tracking-wider">HEALTH</p>
            <span className={`text-sm font-mono font-bold ${getHealthColor(system.health)}`}>
              {system.health}%
            </span>
          </div>
          <Progress value={system.health} className="h-2" />
        </div>

        {/* System Metrics */}
        {latestMetric && (
          <div className="grid grid-cols-3 gap-3">
            <div>
              <p className="text-xs text-neutral-400 tracking-wider mb-1">CPU</p>
              <div className="flex items-center gap-1">
                <div className="flex-1 bg-neutral-800 rounded-full h-1">
                  <div 
                    className={`h-1 rounded-full transition-all ${
                      latestMetric.cpu > 80 ? 'bg-red-500' : 
                      latestMetric.cpu > 60 ? 'bg-orange-500' : 'bg-white'
                    }`}
                    style={{ width: `${latestMetric.cpu}%` }}
                  />
                </div>
                <span className="text-xs text-neutral-300 font-mono w-8">{latestMetric.cpu}%</span>
              </div>
            </div>
            <div>
              <p className="text-xs text-neutral-400 tracking-wider mb-1">MEM</p>
              <div className="flex items-center gap-1">
                <div className="flex-1 bg-neutral-800 rounded-full h-1">
                  <div 
                    className={`h-1 rounded-full transition-all ${
                      latestMetric.memory > 80 ? 'bg-red-500' : 
                      latestMetric.memory > 60 ? 'bg-orange-500' : 'bg-white'
                    }`}
                    style={{ width: `${latestMetric.memory}%` }}
                  />
                </div>
                <span className="text-xs text-neutral-300 font-mono w-8">{latestMetric.memory}%</span>
              </div>
            </div>
            <div>
              <p className="text-xs text-neutral-400 tracking-wider mb-1">DISK</p>
              <div className="flex items-center gap-1">
                <div className="flex-1 bg-neutral-800 rounded-full h-1">
                  <div 
                    className={`h-1 rounded-full transition-all ${
                      latestMetric.storage > 80 ? 'bg-red-500' : 
                      latestMetric.storage > 60 ? 'bg-orange-500' : 'bg-white'
                    }`}
                    style={{ width: `${latestMetric.storage}%` }}
                  />
                </div>
                <span className="text-xs text-neutral-300 font-mono w-8">{latestMetric.storage}%</span>
              </div>
            </div>
          </div>
        )}

        {/* System Info */}
        <div className="grid grid-cols-2 gap-3 pt-2 border-t border-neutral-800">
          <div>
            <p className="text-xs text-neutral-400 tracking-wider mb-1">LOCATION</p>
            <p className="text-xs text-neutral-300">{system.location}</p>
          </div>
          <div>
            <p className="text-xs text-neutral-400 tracking-wider mb-1">UPTIME</p>
            <p className="text-xs text-neutral-300 font-mono">{system.uptime}</p>
          </div>
        </div>

        <div>
          <p className="text-xs text-neutral-400 tracking-wider mb-1">LAST MAINTENANCE</p>
          <p className="text-xs text-neutral-300 font-mono">{formatDate(system.lastMaintenance)}</p>
        </div>
      </CardContent>
    </Card>
  )
}

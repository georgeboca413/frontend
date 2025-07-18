"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Server, Database, Shield, Wifi, HardDrive, Cpu } from "lucide-react"
import { System } from "../types/sys-types"
import { SYSTEM_STATUS_COLORS_CONFIG, SYSTEM_TYPE_ICONS_CONFIG } from "../config/sys-config"

interface SysSystemDetailModalProps {
  system: System | null
  isOpen: boolean
  onClose: () => void
}

const iconMap = {
  Server,
  Database, 
  Shield,
  Wifi,
  HardDrive,
  Cpu,
}

export function SysSystemDetailModal({ system, isOpen, onClose }: SysSystemDetailModalProps) {
  if (!system) return null

  const statusColors = SYSTEM_STATUS_COLORS_CONFIG[system.status as keyof typeof SYSTEM_STATUS_COLORS_CONFIG] || SYSTEM_STATUS_COLORS_CONFIG.offline
  const iconName = SYSTEM_TYPE_ICONS_CONFIG[system.type as keyof typeof SYSTEM_TYPE_ICONS_CONFIG] || 'Server'
  const Icon = iconMap[iconName as keyof typeof iconMap]

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-neutral-900 border-neutral-700 text-white w-full max-w-2xl max-h-[70vh] overflow-y-auto m-4">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-white">
            <Icon className="w-5 h-5" />
            {system.name}
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Left Column - Basic Info */}
          <div className="space-y-3">
            {/* Basic Info */}
            <div className="grid grid-cols-1 gap-2">
              <div>
                <div className="text-xs text-neutral-400 mb-1">System ID</div>
                <div className="text-sm font-mono text-white">{system.systemId}</div>
              </div>
              <div>
                <div className="text-xs text-neutral-400 mb-1">Type</div>
                <div className="text-sm text-white capitalize">{system.type}</div>
              </div>
              <div>
                <div className="text-xs text-neutral-400 mb-1">Status</div>
                <Badge
                  variant="outline"
                  className={`${statusColors} border-current`}
                >
                  {system.status}
                </Badge>
              </div>
              <div>
                <div className="text-xs text-neutral-400 mb-1">Health</div>
                <div className="flex items-center gap-2">
                  <Progress
                    value={system.health}
                    className="flex-1 h-2"
                  />
                  <span className="text-sm font-mono text-white w-10">{system.health}%</span>
                </div>
              </div>
            </div>

            {/* Location & Uptime */}
            <div className="space-y-2">
              <div>
                <div className="text-xs text-neutral-400 mb-1">Location</div>
                <div className="text-sm text-white">{system.location}</div>
              </div>
              <div>
                <div className="text-xs text-neutral-400 mb-1">Uptime</div>
                <div className="text-sm text-white font-mono">{system.uptime}</div>
              </div>
              <div>
                <div className="text-xs text-neutral-400 mb-1">Last Maintenance</div>
                <div className="text-sm font-mono text-white">
                  {system.lastMaintenance 
                    ? new Date(system.lastMaintenance).toLocaleString()
                    : "No maintenance scheduled"
                  }
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Metrics & Activity */}
          <div className="space-y-3">
            {/* System Metrics */}
            <div className="bg-neutral-800 rounded-lg p-3">
              <div className="text-sm font-medium text-white mb-2">System Metrics</div>
              <div className="grid grid-cols-1 gap-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-neutral-400">Response Time</span>
                  <span className="text-white font-mono">45ms</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">CPU Usage</span>
                  <span className="text-white font-mono">23%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">Memory Usage</span>
                  <span className="text-white font-mono">67%</span>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-neutral-800 rounded-lg p-3">
              <div className="text-sm font-medium text-white mb-2">Recent Activity</div>
              <div className="space-y-1 text-xs">
                <div className="flex justify-between">
                  <span className="text-neutral-400">System check completed</span>
                  <span className="text-neutral-500 font-mono">2 min ago</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">Health status updated</span>
                  <span className="text-neutral-500 font-mono">15 min ago</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">Maintenance scheduled</span>
                  <span className="text-neutral-500 font-mono">1 hour ago</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

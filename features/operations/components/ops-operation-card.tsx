import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Target, MapPin, Clock, Users, AlertTriangle, CheckCircle, XCircle } from "lucide-react"
import type { OperationWithRelations } from "../types/ops-types"
import { 
  OPERATION_STATUS_COLORS_CONFIG, 
  OPERATION_PRIORITY_COLORS_CONFIG,
  OPERATION_STATUS_ICONS_CONFIG 
} from "../config/ops-config"

interface OpsOperationCardProps {
  operation: OperationWithRelations
  onOperationClick: (operation: OperationWithRelations) => void
  formatDate: (date: Date) => string
}

export function OpsOperationCard({ operation, onOperationClick, formatDate }: OpsOperationCardProps) {
  const statusColor = OPERATION_STATUS_COLORS_CONFIG[operation.status as keyof typeof OPERATION_STATUS_COLORS_CONFIG]
  const priorityColor = OPERATION_PRIORITY_COLORS_CONFIG[operation.priority as keyof typeof OPERATION_PRIORITY_COLORS_CONFIG]
  
  const getStatusIcon = (status: string) => {
    const iconName = OPERATION_STATUS_ICONS_CONFIG[status as keyof typeof OPERATION_STATUS_ICONS_CONFIG]
    switch (iconName) {
      case "Target": return <Target className="w-4 h-4" />
      case "Clock": return <Clock className="w-4 h-4" />
      case "CheckCircle": return <CheckCircle className="w-4 h-4" />
      case "XCircle": return <XCircle className="w-4 h-4" />
      default: return <AlertTriangle className="w-4 h-4" />
    }
  }

  return (
    <Card 
      className="bg-neutral-900 border-neutral-700 hover:bg-neutral-800 transition-colors cursor-pointer"
      onClick={() => onOperationClick(operation)}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-sm font-bold text-white tracking-wider">{operation.name}</CardTitle>
            <p className="text-xs text-neutral-400 font-mono">{operation.operationId}</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge className={statusColor}>
              {getStatusIcon(operation.status)}
              <span className="ml-1 uppercase text-xs">{operation.status}</span>
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-neutral-400 tracking-wider mb-1">PRIORITY</p>
            <Badge className={priorityColor}>
              <span className="uppercase text-xs">{operation.priority}</span>
            </Badge>
          </div>
          <div>
            <p className="text-xs text-neutral-400 tracking-wider mb-1">PROGRESS</p>
            <div className="flex items-center gap-2">
              <div className="flex-1 bg-neutral-800 rounded-full h-2">
                <div 
                  className="bg-orange-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${operation.progress}%` }}
                />
              </div>
              <span className="text-xs text-white font-mono">{operation.progress}%</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-neutral-400 tracking-wider mb-1">LOCATION</p>
            <div className="flex items-center gap-2">
              <MapPin className="w-3 h-3 text-neutral-400" />
              <span className="text-xs text-neutral-300">{operation.location}</span>
            </div>
          </div>
          <div>
            <p className="text-xs text-neutral-400 tracking-wider mb-1">AGENTS</p>
            <div className="flex items-center gap-2">
              <Users className="w-3 h-3 text-neutral-400" />
              <span className="text-xs text-neutral-300 font-mono">{operation._count.assignments}</span>
            </div>
          </div>
        </div>

        <div>
          <p className="text-xs text-neutral-400 tracking-wider mb-1">TIMELINE</p>
          <div className="flex items-center gap-2 text-xs text-neutral-300">
            <Clock className="w-3 h-3 text-neutral-400" />
            <span>{formatDate(operation.startDate)} → {formatDate(operation.estimatedCompletion)}</span>
          </div>
        </div>

        <div className="pt-2 border-t border-neutral-800">
          <p className="text-xs text-neutral-300 line-clamp-2">{operation.description}</p>
        </div>
      </CardContent>
    </Card>
  )
}

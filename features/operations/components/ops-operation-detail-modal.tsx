import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { OperationWithRelations } from "../types/ops-types"
import { 
  OPERATION_STATUS_COLORS_CONFIG, 
  OPERATION_PRIORITY_COLORS_CONFIG 
} from "../config/ops-config"

interface OpsOperationDetailModalProps {
  operation: OperationWithRelations | null
  onClose: () => void
  formatDate: (date: Date) => string
}

export function OpsOperationDetailModal({ operation, onClose, formatDate }: OpsOperationDetailModalProps) {
  if (!operation) return null

  const statusColor = OPERATION_STATUS_COLORS_CONFIG[operation.status as keyof typeof OPERATION_STATUS_COLORS_CONFIG]
  const priorityColor = OPERATION_PRIORITY_COLORS_CONFIG[operation.priority as keyof typeof OPERATION_PRIORITY_COLORS_CONFIG]

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="bg-neutral-900 border-neutral-700 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-lg font-bold text-white tracking-wider">{operation.name}</CardTitle>
            <p className="text-sm text-neutral-400 font-mono">{operation.operationId}</p>
          </div>
          <Button
            variant="ghost"
            onClick={onClose}
            className="text-neutral-400 hover:text-white"
          >
            ✕
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Basic Info */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-xs text-neutral-400 tracking-wider mb-1">STATUS</p>
              <span className={`text-xs px-2 py-1 rounded uppercase tracking-wider ${statusColor}`}>
                {operation.status}
              </span>
            </div>
            <div>
              <p className="text-xs text-neutral-400 tracking-wider mb-1">PRIORITY</p>
              <span className={`text-xs px-2 py-1 rounded uppercase tracking-wider ${priorityColor}`}>
                {operation.priority}
              </span>
            </div>
            <div>
              <p className="text-xs text-neutral-400 tracking-wider mb-1">PROGRESS</p>
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-neutral-800 rounded-full h-2">
                  <div 
                    className="bg-orange-500 h-2 rounded-full"
                    style={{ width: `${operation.progress}%` }}
                  />
                </div>
                <span className="text-xs text-white font-mono">{operation.progress}%</span>
              </div>
            </div>
            <div>
              <p className="text-xs text-neutral-400 tracking-wider mb-1">LOCATION</p>
              <p className="text-sm text-white">{operation.location}</p>
            </div>
          </div>

          {/* Description */}
          <div>
            <p className="text-xs text-neutral-400 tracking-wider mb-2">MISSION BRIEF</p>
            <p className="text-sm text-neutral-300">{operation.description}</p>
          </div>

          {/* Timeline */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-xs text-neutral-400 tracking-wider mb-1">START DATE</p>
              <p className="text-sm text-white font-mono">{formatDate(operation.startDate)}</p>
            </div>
            <div>
              <p className="text-xs text-neutral-400 tracking-wider mb-1">ESTIMATED COMPLETION</p>
              <p className="text-sm text-white font-mono">{formatDate(operation.estimatedCompletion)}</p>
            </div>
            {operation.actualCompletion && (
              <div>
                <p className="text-xs text-neutral-400 tracking-wider mb-1">ACTUAL COMPLETION</p>
                <p className="text-sm text-white font-mono">{formatDate(operation.actualCompletion)}</p>
              </div>
            )}
          </div>

          {/* Assigned Agents */}
          <div>
            <p className="text-xs text-neutral-400 tracking-wider mb-2">ASSIGNED AGENTS ({operation._count.assignments})</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {operation.assignments.map((assignment) => (
                <div key={assignment.id} className="bg-neutral-800 p-3 rounded">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-white font-mono">{assignment.agent.agentId}</p>
                      <p className="text-xs text-neutral-400">{assignment.agent.name}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-neutral-400">Role</p>
                      <p className="text-xs text-white uppercase">{assignment.role || 'Operative'}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Objectives */}
          <div>
            <p className="text-xs text-neutral-400 tracking-wider mb-2">OBJECTIVES ({operation._count.objectives})</p>
            <div className="space-y-2">
              {operation.objectives.map((objective) => (
                <div key={objective.id} className="bg-neutral-800 p-3 rounded">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="text-sm text-white">{objective.title}</p>
                      {objective.description && (
                        <p className="text-xs text-neutral-400 mt-1">{objective.description}</p>
                      )}
                    </div>
                    <div className={`w-2 h-2 rounded-full mt-2 ${objective.isCompleted ? 'bg-white' : 'bg-neutral-600'}`}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-4 border-t border-neutral-800">
            <Button className="bg-orange-500 hover:bg-orange-600 text-white">Update Status</Button>
            <Button
              variant="outline"
              className="border-neutral-700 text-neutral-400 hover:bg-neutral-800 hover:text-neutral-300 bg-transparent"
            >
              Assign Agent
            </Button>
            <Button
              variant="outline"
              className="border-neutral-700 text-neutral-400 hover:bg-neutral-800 hover:text-neutral-300 bg-transparent"
            >
              View Reports
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

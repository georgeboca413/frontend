import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { AgentWithRelations } from "../types/agent-types"
import { AGENT_STATUS_COLORS_CONFIG, AGENT_RISK_COLORS_CONFIG } from "../config/agent-config"

interface AgentDetailModalProps {
  agent: AgentWithRelations | null
  onClose: () => void
}

export function AgentDetailModal({ agent, onClose }: AgentDetailModalProps) {
  if (!agent) return null

  const statusColor = AGENT_STATUS_COLORS_CONFIG[agent.status as keyof typeof AGENT_STATUS_COLORS_CONFIG]
  const riskColor = AGENT_RISK_COLORS_CONFIG[agent.riskLevel as keyof typeof AGENT_RISK_COLORS_CONFIG]

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="bg-neutral-900 border-neutral-700 w-full max-w-2xl">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-lg font-bold text-white tracking-wider">{agent.name}</CardTitle>
            <p className="text-sm text-neutral-400 font-mono">{agent.agentId}</p>
          </div>
          <Button
            variant="ghost"
            onClick={onClose}
            className="text-neutral-400 hover:text-white"
          >
            ✕
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-neutral-400 tracking-wider mb-1">STATUS</p>
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${statusColor?.dot || 'bg-neutral-500'}`}></div>
                <span className="text-sm text-white uppercase tracking-wider">{agent.status}</span>
              </div>
            </div>
            <div>
              <p className="text-xs text-neutral-400 tracking-wider mb-1">LOCATION</p>
              <p className="text-sm text-white">{agent.location}</p>
            </div>
            <div>
              <p className="text-xs text-neutral-400 tracking-wider mb-1">MISSIONS COMPLETED</p>
              <p className="text-sm text-white font-mono">{agent.missions}</p>
            </div>
            <div>
              <p className="text-xs text-neutral-400 tracking-wider mb-1">RISK LEVEL</p>
              <span className={`text-xs px-2 py-1 rounded uppercase tracking-wider ${riskColor}`}>
                {agent.riskLevel}
              </span>
            </div>
          </div>
          <div className="flex gap-2 pt-4">
            <Button className="bg-orange-500 hover:bg-orange-600 text-white">Assign Mission</Button>
            <Button
              variant="outline"
              className="border-neutral-700 text-neutral-400 hover:bg-neutral-800 hover:text-neutral-300 bg-transparent"
            >
              View History
            </Button>
            <Button
              variant="outline"
              className="border-neutral-700 text-neutral-400 hover:bg-neutral-800 hover:text-neutral-300 bg-transparent"
            >
              Send Message
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

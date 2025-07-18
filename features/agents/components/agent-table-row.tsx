import { Button } from "@/components/ui/button"
import { MoreHorizontal, MapPin, Clock } from "lucide-react"
import type { AgentWithRelations } from "../types/agent-types"
import { AGENT_STATUS_COLORS_CONFIG, AGENT_RISK_COLORS_CONFIG } from "../config/agent-config"

interface AgentTableRowProps {
  agent: AgentWithRelations
  index: number
  onAgentClick: (agent: AgentWithRelations) => void
  formatLastSeen: (lastSeen: Date) => string
}

export function AgentTableRow({ agent, index, onAgentClick, formatLastSeen }: AgentTableRowProps) {
  const statusColor = AGENT_STATUS_COLORS_CONFIG[agent.status as keyof typeof AGENT_STATUS_COLORS_CONFIG]
  const riskColor = AGENT_RISK_COLORS_CONFIG[agent.riskLevel as keyof typeof AGENT_RISK_COLORS_CONFIG]

  return (
    <tr
      key={agent.id}
      className={`border-b border-neutral-800 hover:bg-neutral-800 transition-colors cursor-pointer ${
        index % 2 === 0 ? "bg-neutral-900" : "bg-neutral-850"
      }`}
      onClick={() => onAgentClick(agent)}
    >
      <td className="py-3 px-4 text-sm text-white font-mono">{agent.agentId}</td>
      <td className="py-3 px-4 text-sm text-white">{agent.name}</td>
      <td className="py-3 px-4">
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${statusColor?.dot || 'bg-neutral-500'}`}></div>
          <span className="text-xs text-neutral-300 uppercase tracking-wider">{agent.status}</span>
        </div>
      </td>
      <td className="py-3 px-4">
        <div className="flex items-center gap-2">
          <MapPin className="w-3 h-3 text-neutral-400" />
          <span className="text-sm text-neutral-300">{agent.location}</span>
        </div>
      </td>
      <td className="py-3 px-4">
        <div className="flex items-center gap-2">
          <Clock className="w-3 h-3 text-neutral-400" />
          <span className="text-sm text-neutral-300 font-mono">{formatLastSeen(agent.lastSeen)}</span>
        </div>
      </td>
      <td className="py-3 px-4 text-sm text-white font-mono">{agent.missions}</td>
      <td className="py-3 px-4">
        <span className={`text-xs px-2 py-1 rounded uppercase tracking-wider ${riskColor}`}>
          {agent.riskLevel}
        </span>
      </td>
      <td className="py-3 px-4">
        <Button variant="ghost" size="icon" className="text-neutral-400 hover:text-orange-500">
          <MoreHorizontal className="w-4 h-4" />
        </Button>
      </td>
    </tr>
  )
}

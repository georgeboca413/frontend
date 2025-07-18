import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { AgentWithRelations } from "../types/agent-types"
import { AgentTableHeader } from "./agent-table-header"
import { AgentTableRow } from "./agent-table-row"

interface AgentTableProps {
  agents: AgentWithRelations[]
  loading: boolean
  error: string | null
  onAgentClick: (agent: AgentWithRelations) => void
  formatLastSeen: (lastSeen: Date) => string
}

export function AgentTable({ agents, loading, error, onAgentClick, formatLastSeen }: AgentTableProps) {
  if (loading) {
    return (
      <Card className="bg-neutral-900 border-neutral-700">
        <CardHeader>
          <CardTitle className="text-sm font-medium text-neutral-300 tracking-wider">AGENT ROSTER</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <div className="text-neutral-400">Loading agents...</div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card className="bg-neutral-900 border-neutral-700">
        <CardHeader>
          <CardTitle className="text-sm font-medium text-neutral-300 tracking-wider">AGENT ROSTER</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <div className="text-red-400">Error: {error}</div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-neutral-900 border-neutral-700">
      <CardHeader>
        <CardTitle className="text-sm font-medium text-neutral-300 tracking-wider">AGENT ROSTER</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <AgentTableHeader />
            <tbody>
              {agents.map((agent, index) => (
                <AgentTableRow
                  key={agent.id}
                  agent={agent}
                  index={index}
                  onAgentClick={onAgentClick}
                  formatLastSeen={formatLastSeen}
                />
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}

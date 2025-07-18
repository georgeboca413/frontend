"use client"

import { useState } from "react"
import { Shield } from "lucide-react"
import { useAgentList } from "@/features/agents/hooks/use-agent-list"
import { AgentPageHeader } from "@/features/agents/components/agent-page-header"
import { AgentSearch } from "@/features/agents/components/agent-search"
import { AgentStatsCard } from "@/features/agents/components/agent-stats-card"
import { AgentTable } from "@/features/agents/components/agent-table"
import { AgentDetailModal } from "@/features/agents/components/agent-detail-modal"
import { formatLastSeen, filterAgents } from "@/features/agents/components/agent-utils"
import type { AgentWithRelations } from "@/features/agents/types/agent-types"

export default function AgentNetworkPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedAgent, setSelectedAgent] = useState<AgentWithRelations | null>(null)
  
  const { agents, isLoading, isError } = useAgentList(searchTerm)
  
  const filteredAgents = filterAgents(agents, searchTerm)

  const handleDeployAgent = () => {
    // TODO: Implement deploy agent functionality
    console.log("Deploy agent clicked")
  }

  const handleFilter = () => {
    // TODO: Implement filter functionality
    console.log("Filter clicked")
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <AgentPageHeader 
        onDeployAgent={handleDeployAgent}
        onFilter={handleFilter}
      />

      {/* Search and Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <AgentSearch 
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />

        <AgentStatsCard
          title="ACTIVE AGENTS"
          count="847"
          icon={<Shield className="w-8 h-8 text-white" />}
          color="text-white"
        />

        <AgentStatsCard
          title="COMPROMISED"
          count="3"
          icon={<Shield className="w-8 h-8 text-red-500" />}
          color="text-red-500"
        />

        <AgentStatsCard
          title="IN TRAINING"
          count="23"
          icon={<Shield className="w-8 h-8 text-orange-500" />}
          color="text-orange-500"
        />
      </div>

      {/* Agent Table */}
      <AgentTable
        agents={filteredAgents}
        loading={isLoading}
        error={isError?.message || null}
        onAgentClick={setSelectedAgent}
        formatLastSeen={formatLastSeen}
      />

      {/* Agent Detail Modal */}
      <AgentDetailModal
        agent={selectedAgent}
        onClose={() => setSelectedAgent(null)}
      />
    </div>
  )
}

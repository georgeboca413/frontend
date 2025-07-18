import useSWR from 'swr'
import { fetchAgents } from '@/lib/api'
import type { AgentWithRelations } from '../types/agent-types'

export function useAgentList(searchTerm?: string) {
  const { data, error, isLoading, mutate } = useSWR(
    searchTerm ? `/api/agents?search=${searchTerm}` : '/api/agents',
    () => fetchAgents(searchTerm),
    {
      refreshInterval: 30000, // Refresh every 30 seconds
      revalidateOnFocus: true,
      dedupingInterval: 5000,
    }
  )

  return {
    agents: data || [],
    isLoading,
    isError: error,
    mutate,
  }
}

export function useAgentById(agentId: string | null) {
  const { data, error, isLoading } = useSWR(
    agentId ? `/api/agents/${agentId}` : null,
    agentId ? () => fetchAgents().then((agents: AgentWithRelations[]) => 
      agents.find((agent: AgentWithRelations) => agent.id === agentId)
    ) : null
  )

  return {
    agent: data,
    isLoading,
    isError: error,
  }
}

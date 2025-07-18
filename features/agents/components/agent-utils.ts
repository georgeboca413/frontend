export function formatLastSeen(lastSeen: Date): string {
  const now = new Date()
  const diff = now.getTime() - new Date(lastSeen).getTime()
  const minutes = Math.floor(diff / (1000 * 60))
  const hours = Math.floor(diff / (1000 * 60 * 60))
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))

  if (minutes < 60) return `${minutes} min ago`
  if (hours < 24) return `${hours} hours ago`
  return `${days} days ago`
}

export function filterAgents(agents: any[], searchTerm: string) {
  if (!searchTerm) return agents
  
  return agents.filter(
    (agent) =>
      agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent.agentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent.location.toLowerCase().includes(searchTerm.toLowerCase())
  )
}

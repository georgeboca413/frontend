"use client"

import { ActAgentAllocation } from "@/features/activity/components/act-agent-allocation"
import { ActActivityLog } from "@/features/activity/components/act-activity-log"
import { ActChatActivity } from "@/features/activity/components/act-chat-activity"
import { ActMissionChart } from "@/features/activity/components/act-mission-chart"
import { ActMissionInfo } from "@/features/activity/components/act-mission-info"
import { useActDashboardStats } from "@/features/activity/hooks/use-act-dashboard-stats"
import { useActActivityLogs } from "@/features/activity/hooks/use-act-activity-logs"

export default function CommandCenterPage() {
  const { stats, isLoading: statsLoading } = useActDashboardStats()
  const { logs, isLoading: logsLoading } = useActActivityLogs()

  if (statsLoading || logsLoading) {
    return (
      <div className="p-6 space-y-6">
        <div className="text-center text-neutral-400">Loading command center...</div>
      </div>
    )
  }

  if (!stats) {
    return (
      <div className="p-6 space-y-6">
        <div className="text-center text-red-400">Failed to load dashboard data</div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* First Row: Agent Allocation + Activity Log + Chat Activity */}
        <ActAgentAllocation stats={stats} />
        <ActActivityLog logs={logs} />
        <ActChatActivity />
        
        {/* Second Row: Mission Chart + Mission Information */}
        <ActMissionChart />
        <ActMissionInfo stats={stats} />
      </div>
    </div>
  )
}

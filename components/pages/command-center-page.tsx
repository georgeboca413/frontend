"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useActDashboardStats } from "@/features/activity/hooks/use-act-dashboard-stats"
import { useActActivityLogs } from "@/features/activity/hooks/use-act-activity-logs"
import { useAgentList } from "@/features/agents/hooks/use-agent-list"

export default function CommandCenterPage() {
  const { stats, isLoading: statsLoading } = useActDashboardStats()
  const { logs, isLoading: logsLoading } = useActActivityLogs()
  const { agents, isLoading: agentsLoading } = useAgentList("")

  // Count agents by status
  const agentStats = agents?.reduce((acc: any, agent: any) => {
    acc[agent.status] = (acc[agent.status] || 0) + 1
    return acc
  }, {}) || {}

  return (
    <div className="p-6 space-y-6">
      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Agent Status Overview */}
        <Card className="lg:col-span-4 bg-neutral-900 border-neutral-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-neutral-300 tracking-wider">
              AGENT ALLOCATION
            </CardTitle>
          </CardHeader>
          <CardContent>
            {agentsLoading ? (
              <div className="space-y-3">
                <div className="h-4 bg-neutral-700 rounded animate-pulse"></div>
                <div className="h-4 bg-neutral-700 rounded animate-pulse w-3/4"></div>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white font-mono">
                      {agentStats.active || 0}
                    </div>
                    <div className="text-xs text-neutral-500">Active Field</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white font-mono">
                      {agentStats.standby || 0}
                    </div>
                    <div className="text-xs text-neutral-500">Standby</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white font-mono">
                      {agentStats.training || 0}
                    </div>
                    <div className="text-xs text-neutral-500">Training</div>
                  </div>
                </div>

                <div className="space-y-2">
                  {agents?.slice(0, 4).map((agent: any) => (
                    <div
                      key={agent.id}
                      className="flex items-center justify-between p-2 bg-neutral-800 rounded hover:bg-neutral-700 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-2 h-2 rounded-full ${
                            agent.status === "active"
                              ? "bg-white"
                              : agent.status === "standby"
                                ? "bg-neutral-500"
                                : "bg-red-500"
                          }`}
                        />
                        <div>
                          <div className="text-xs text-white font-mono">{agent.agentId}</div>
                          <div className="text-xs text-neutral-500">{agent.name}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Activity Log */}
        <Card className="lg:col-span-4 bg-neutral-900 border-neutral-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-neutral-300 tracking-wider">
              ACTIVITY LOG
            </CardTitle>
          </CardHeader>
          <CardContent>
            {logsLoading ? (
              <div className="space-y-3">
                <div className="h-4 bg-neutral-700 rounded animate-pulse"></div>
                <div className="h-4 bg-neutral-700 rounded animate-pulse w-3/4"></div>
                <div className="h-4 bg-neutral-700 rounded animate-pulse"></div>
              </div>
            ) : (
              <div className="space-y-3 max-h-80 overflow-y-auto">
                {logs?.slice(0, 6).map((log: any, index: number) => (
                  <div
                    key={log.id}
                    className="text-xs border-l-2 border-orange-500 pl-3 hover:bg-neutral-800 p-2 rounded transition-colors"
                  >
                    <div className="text-neutral-500 font-mono">
                      {new Date(log.timestamp).toLocaleString()}
                    </div>
                    <div className="text-white">
                      Agent <span className="text-orange-500 font-mono">{log.agent?.agentId}</span> {log.action}{" "}
                      <span className="text-white font-mono">{log.location}</span>
                      {log.target && (
                        <span>
                          {" "}
                          with target <span className="text-orange-500 font-mono">{log.target}</span>
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Encrypted Chat Activity */}
        <Card className="lg:col-span-4 bg-neutral-900 border-neutral-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-neutral-300 tracking-wider">
              ENCRYPTED CHAT ACTIVITY
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            {/* Wireframe Sphere */}
            <div className="relative w-32 h-32 mb-4">
              <div className="absolute inset-0 border-2 border-white rounded-full opacity-60 animate-pulse"></div>
              <div className="absolute inset-2 border border-white rounded-full opacity-40"></div>
              <div className="absolute inset-4 border border-white rounded-full opacity-20"></div>
              {/* Grid lines */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-full h-px bg-white opacity-30"></div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-px h-full bg-white opacity-30"></div>
              </div>
            </div>

            <div className="text-xs text-neutral-500 space-y-1 w-full font-mono">
              <div className="flex justify-between">
                <span># 2025-07-18 14:23:00 UTC</span>
              </div>
              <div className="text-white">{"> [AGT:gh0stfire] ::: INIT >> ^^^ loading secure channel"}</div>
              <div className="text-orange-500">{"> CH#2 | 1231.9082464.500...xR3"}</div>
              <div className="text-white">{"> KEY LOCKED"}</div>
              <div className="text-neutral-400">
                {'> MSG >> "...mission override initiated... awaiting delta node clearance"'}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Mission Activity Chart */}
        <Card className="lg:col-span-8 bg-neutral-900 border-neutral-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-neutral-300 tracking-wider">
              MISSION ACTIVITY OVERVIEW
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-48 relative">
              {/* Chart Grid */}
              <div className="absolute inset-0 grid grid-cols-8 grid-rows-6 opacity-20">
                {Array.from({ length: 48 }).map((_, i) => (
                  <div key={i} className="border border-neutral-700"></div>
                ))}
              </div>

              {/* Chart Line */}
              <svg className="absolute inset-0 w-full h-full">
                <polyline
                  points="0,120 50,100 100,110 150,90 200,95 250,85 300,100 350,80"
                  fill="none"
                  stroke="#f97316"
                  strokeWidth="2"
                />
                <polyline
                  points="0,140 50,135 100,130 150,125 200,130 250,135 300,125 350,120"
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="2"
                  strokeDasharray="5,5"
                />
              </svg>

              {/* Y-axis labels */}
              <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-neutral-500 -ml-5 font-mono">
                <span>500</span>
                <span>400</span>
                <span>300</span>
                <span>200</span>
              </div>

              {/* X-axis labels */}
              <div className="absolute bottom-0 left-0 w-full flex justify-between text-xs text-neutral-500 -mb-6 font-mono">
                <span>Jan 28, 2025</span>
                <span>Feb 28, 2025</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Mission Information */}
        <Card className="lg:col-span-4 bg-neutral-900 border-neutral-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-neutral-300 tracking-wider">
              MISSION INFORMATION
            </CardTitle>
          </CardHeader>
          <CardContent>
            {statsLoading ? (
              <div className="space-y-3">
                <div className="h-4 bg-neutral-700 rounded animate-pulse"></div>
                <div className="h-4 bg-neutral-700 rounded animate-pulse w-3/4"></div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <span className="text-xs text-white font-medium">Successful Missions</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-neutral-400">High Risk Missions</span>
                      <span className="text-white font-bold font-mono">{stats?.missionStats?.successful?.highRisk || 0}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-neutral-400">Medium Risk Missions</span>
                      <span className="text-white font-bold font-mono">{stats?.missionStats?.successful?.mediumRisk || 0}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-neutral-400">Low Risk Missions</span>
                      <span className="text-white font-bold font-mono">{stats?.missionStats?.successful?.lowRisk || 0}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span className="text-xs text-red-500 font-medium">Agent Status</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-neutral-400">Active Agents</span>
                      <span className="text-white font-bold font-mono">{agentStats.active || 0}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-neutral-400">Standby Agents</span>
                      <span className="text-white font-bold font-mono">{agentStats.standby || 0}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-neutral-400">Total Agents</span>
                      <span className="text-white font-bold font-mono">{agents?.length || 0}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

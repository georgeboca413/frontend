"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ActivityStats } from "../types/act-types"

interface ActMissionInfoProps {
  stats: ActivityStats
}

export function ActMissionInfo({ stats }: ActMissionInfoProps) {
  return (
    <Card className="lg:col-span-4 bg-neutral-900 border-neutral-700">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium text-neutral-300 tracking-wider">
          MISSION INFORMATION
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <span className="text-xs text-white font-medium">Successful Missions</span>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-neutral-400">High Risk Mission</span>
                <span className="text-white font-bold font-mono">
                  {stats.missionStats.successful.highRisk}
                </span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-neutral-400">Medium Risk Mission</span>
                <span className="text-white font-bold font-mono">
                  {stats.missionStats.successful.mediumRisk}
                </span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-neutral-400">Low Risk Mission</span>
                <span className="text-white font-bold font-mono">
                  {stats.missionStats.successful.lowRisk}
                </span>
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <span className="text-xs text-red-500 font-medium">Failed Missions</span>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-neutral-400">High Risk Mission</span>
                <span className="text-white font-bold font-mono">
                  {stats.missionStats.failed.highRisk}
                </span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-neutral-400">Medium Risk Mission</span>
                <span className="text-white font-bold font-mono">
                  {stats.missionStats.failed.mediumRisk}
                </span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-neutral-400">Low Risk Mission</span>
                <span className="text-white font-bold font-mono">
                  {stats.missionStats.failed.lowRisk}
                </span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

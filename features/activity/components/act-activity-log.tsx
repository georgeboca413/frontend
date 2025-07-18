"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ActivityLog } from "../types/act-types"

interface ActActivityLogProps {
  logs: (ActivityLog & { agent?: { callsign: string } })[]
}

export function ActActivityLog({ logs }: ActActivityLogProps) {
  return (
    <Card className="lg:col-span-4 bg-neutral-900 border-neutral-700">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium text-neutral-300 tracking-wider">
          ACTIVITY LOG
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 max-h-80 overflow-y-auto">
          {logs.map((log) => (
            <div
              key={log.id}
              className="text-xs border-l-2 border-orange-500 pl-3 hover:bg-neutral-800 p-2 rounded transition-colors"
            >
              <div className="text-neutral-500 font-mono">
                {new Date(log.timestamp).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit',
                  hour: '2-digit',
                  minute: '2-digit',
                  timeZone: 'UTC'
                })}
              </div>
              <div className="text-white">
                Agent <span className="text-orange-500 font-mono">{log.agent?.callsign || log.agentId}</span> {log.action}{" "}
                <span className="text-white font-mono">{log.location}</span>
                {log.target && (
                  <span>
                    {" "}
                    with agent <span className="text-orange-500 font-mono">{log.target}</span>
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

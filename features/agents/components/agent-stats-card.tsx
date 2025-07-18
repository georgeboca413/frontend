import { Card, CardContent } from "@/components/ui/card"
import { Shield } from "lucide-react"

interface AgentStatsCardProps {
  title: string
  count: number | string
  icon?: React.ReactNode
  color?: string
}

export function AgentStatsCard({ title, count, icon = <Shield className="w-8 h-8" />, color = "text-white" }: AgentStatsCardProps) {
  return (
    <Card className="bg-neutral-900 border-neutral-700">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-neutral-400 tracking-wider">{title}</p>
            <p className={`text-2xl font-bold font-mono ${color}`}>{count}</p>
          </div>
          <div className={color}>
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

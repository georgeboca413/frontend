import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FileText, Eye, Download, Globe, Shield, AlertTriangle } from "lucide-react"
import type { IntelligenceReportWithAgent } from "../types/intel-types"
import { 
  INTELLIGENCE_CLASSIFICATION_COLORS_CONFIG,
  INTELLIGENCE_THREAT_COLORS_CONFIG,
  INTELLIGENCE_STATUS_COLORS_CONFIG 
} from "../config/intel-config"

interface IntelReportCardProps {
  report: IntelligenceReportWithAgent
  onReportClick: (report: IntelligenceReportWithAgent) => void
  formatDate: (date: Date) => string
}

export function IntelReportCard({ report, onReportClick, formatDate }: IntelReportCardProps) {
  const classificationColor = INTELLIGENCE_CLASSIFICATION_COLORS_CONFIG[report.classification as keyof typeof INTELLIGENCE_CLASSIFICATION_COLORS_CONFIG]
  const threatColor = INTELLIGENCE_THREAT_COLORS_CONFIG[report.threatLevel as keyof typeof INTELLIGENCE_THREAT_COLORS_CONFIG]
  const statusColor = INTELLIGENCE_STATUS_COLORS_CONFIG[report.status as keyof typeof INTELLIGENCE_STATUS_COLORS_CONFIG]

  const getSourceIcon = (source: string) => {
    switch (source) {
      case "SIGINT": return <AlertTriangle className="w-4 h-4" />
      case "HUMINT": return <Shield className="w-4 h-4" />
      case "OSINT": return <Globe className="w-4 h-4" />
      case "DIPLOMATIC": return <FileText className="w-4 h-4" />
      default: return <FileText className="w-4 h-4" />
    }
  }

  const tags = JSON.parse(report.tags || '[]') as string[]

  return (
    <Card 
      className="bg-neutral-900 border-neutral-700 hover:bg-neutral-800 transition-colors cursor-pointer"
      onClick={() => onReportClick(report)}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-sm font-bold text-white tracking-wider line-clamp-2">
              {report.title}
            </CardTitle>
            <p className="text-xs text-neutral-400 font-mono mt-1">{report.reportId}</p>
          </div>
          <div className="flex items-center gap-2 ml-2">
            <Badge className={classificationColor}>
              <span className="text-xs font-bold">{report.classification}</span>
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-neutral-400 tracking-wider mb-1">THREAT LEVEL</p>
            <Badge className={threatColor}>
              <span className="uppercase text-xs">{report.threatLevel}</span>
            </Badge>
          </div>
          <div>
            <p className="text-xs text-neutral-400 tracking-wider mb-1">STATUS</p>
            <Badge className={statusColor}>
              <span className="uppercase text-xs">{report.status}</span>
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-neutral-400 tracking-wider mb-1">SOURCE</p>
            <div className="flex items-center gap-2">
              {getSourceIcon(report.source)}
              <span className="text-xs text-neutral-300">{report.source}</span>
            </div>
          </div>
          <div>
            <p className="text-xs text-neutral-400 tracking-wider mb-1">LOCATION</p>
            <span className="text-xs text-neutral-300">{report.location}</span>
          </div>
        </div>

        <div>
          <p className="text-xs text-neutral-400 tracking-wider mb-1">DATE</p>
          <span className="text-xs text-neutral-300 font-mono">{formatDate(report.createdAt)}</span>
        </div>

        {report.agent && (
          <div>
            <p className="text-xs text-neutral-400 tracking-wider mb-1">REPORTING AGENT</p>
            <div className="bg-neutral-800 p-2 rounded">
              <p className="text-xs text-white font-mono">{report.agent.agentId}</p>
              <p className="text-xs text-neutral-400">{report.agent.name}</p>
            </div>
          </div>
        )}

        <div className="pt-2 border-t border-neutral-800">
          <p className="text-xs text-neutral-300 line-clamp-3">{report.summary}</p>
        </div>

        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1 pt-2">
            {tags.slice(0, 3).map((tag: string, index: number) => (
              <span 
                key={index}
                className="text-xs px-2 py-1 bg-neutral-800 text-neutral-400 rounded"
              >
                {tag}
              </span>
            ))}
            {tags.length > 3 && (
              <span className="text-xs px-2 py-1 bg-neutral-800 text-neutral-400 rounded">
                +{tags.length - 3}
              </span>
            )}
          </div>
        )}

        <div className="flex gap-2 pt-2">
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-neutral-400 hover:text-orange-500 p-1 h-6"
            onClick={(e) => {
              e.stopPropagation()
              // TODO: Implement view functionality
            }}
          >
            <Eye className="w-3 h-3" />
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-neutral-400 hover:text-orange-500 p-1 h-6"
            onClick={(e) => {
              e.stopPropagation()
              // TODO: Implement download functionality
            }}
          >
            <Download className="w-3 h-3" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

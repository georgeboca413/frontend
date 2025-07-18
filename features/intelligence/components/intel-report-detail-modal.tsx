import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Globe, Shield, AlertTriangle, FileText, Download, Eye, Share2 } from "lucide-react"
import type { IntelligenceReportWithAgent } from "../types/intel-types"
import { 
  INTELLIGENCE_CLASSIFICATION_COLORS_CONFIG,
  INTELLIGENCE_THREAT_COLORS_CONFIG,
  INTELLIGENCE_STATUS_COLORS_CONFIG 
} from "../config/intel-config"

interface IntelReportDetailModalProps {
  report: IntelligenceReportWithAgent | null
  onClose: () => void
  formatDate: (date: Date) => string
}

export function IntelReportDetailModal({ report, onClose, formatDate }: IntelReportDetailModalProps) {
  if (!report) return null

  const classificationColor = INTELLIGENCE_CLASSIFICATION_COLORS_CONFIG[report.classification as keyof typeof INTELLIGENCE_CLASSIFICATION_COLORS_CONFIG]
  const threatColor = INTELLIGENCE_THREAT_COLORS_CONFIG[report.threatLevel as keyof typeof INTELLIGENCE_THREAT_COLORS_CONFIG]
  const statusColor = INTELLIGENCE_STATUS_COLORS_CONFIG[report.status as keyof typeof INTELLIGENCE_STATUS_COLORS_CONFIG]

  const getSourceIcon = (source: string) => {
    switch (source) {
      case "SIGINT": return <AlertTriangle className="w-5 h-5" />
      case "HUMINT": return <Shield className="w-5 h-5" />
      case "OSINT": return <Globe className="w-5 h-5" />
      case "DIPLOMATIC": return <FileText className="w-5 h-5" />
      default: return <FileText className="w-5 h-5" />
    }
  }

  const tags = JSON.parse(report.tags || '[]') as string[]

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="bg-neutral-900 border-neutral-700 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-start justify-between">
          <div className="flex-1">
            <div className="flex items-start gap-3 mb-2">
              <Badge className={classificationColor}>
                <span className="text-sm font-bold">{report.classification}</span>
              </Badge>
              <Badge className={threatColor}>
                <AlertTriangle className="w-3 h-3 mr-1" />
                <span className="uppercase text-xs">{report.threatLevel}</span>
              </Badge>
              <Badge className={statusColor}>
                <span className="uppercase text-xs">{report.status}</span>
              </Badge>
            </div>
            <CardTitle className="text-xl font-bold text-white tracking-wider">{report.title}</CardTitle>
            <p className="text-sm text-neutral-400 font-mono mt-1">{report.reportId}</p>
          </div>
          <Button
            variant="ghost"
            onClick={onClose}
            className="text-neutral-400 hover:text-white ml-4"
          >
            ✕
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Report Metadata */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-xs text-neutral-400 tracking-wider mb-1">SOURCE</p>
              <div className="flex items-center gap-2">
                {getSourceIcon(report.source)}
                <span className="text-sm text-white">{report.source}</span>
              </div>
            </div>
            <div>
              <p className="text-xs text-neutral-400 tracking-wider mb-1">LOCATION</p>
              <p className="text-sm text-white">{report.location}</p>
            </div>
            <div>
              <p className="text-xs text-neutral-400 tracking-wider mb-1">CREATED</p>
              <p className="text-sm text-white font-mono">{formatDate(report.createdAt)}</p>
            </div>
            <div>
              <p className="text-xs text-neutral-400 tracking-wider mb-1">UPDATED</p>
              <p className="text-sm text-white font-mono">{formatDate(report.updatedAt)}</p>
            </div>
          </div>

          {/* Reporting Agent */}
          {report.agent && (
            <div>
              <p className="text-xs text-neutral-400 tracking-wider mb-2">REPORTING AGENT</p>
              <div className="bg-neutral-800 p-4 rounded">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-white font-mono">{report.agent.agentId}</p>
                    <p className="text-sm text-neutral-400">{report.agent.name}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-neutral-400">Status</p>
                    <p className="text-sm text-white uppercase">{report.agent.status}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Summary */}
          <div>
            <p className="text-xs text-neutral-400 tracking-wider mb-2">EXECUTIVE SUMMARY</p>
            <div className="bg-neutral-800 p-4 rounded">
              <p className="text-sm text-neutral-300 leading-relaxed">{report.summary}</p>
            </div>
          </div>

          {/* Full Content */}
          {report.content && (
            <div>
              <p className="text-xs text-neutral-400 tracking-wider mb-2">DETAILED REPORT</p>
              <div className="bg-neutral-800 p-4 rounded max-h-64 overflow-y-auto">
                <p className="text-sm text-neutral-300 leading-relaxed whitespace-pre-wrap">{report.content}</p>
              </div>
            </div>
          )}

          {/* Tags */}
          {tags.length > 0 && (
            <div>
              <p className="text-xs text-neutral-400 tracking-wider mb-2">TAGS</p>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag: string, index: number) => (
                  <span 
                    key={index}
                    className="text-xs px-3 py-1 bg-neutral-800 text-neutral-300 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-2 pt-4 border-t border-neutral-800">
            <Button className="bg-orange-500 hover:bg-orange-600 text-white">
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
            <Button
              variant="outline"
              className="border-neutral-700 text-neutral-400 hover:bg-neutral-800 hover:text-neutral-300 bg-transparent"
            >
              <Eye className="w-4 h-4 mr-2" />
              Full Analysis
            </Button>
            <Button
              variant="outline"
              className="border-neutral-700 text-neutral-400 hover:bg-neutral-800 hover:text-neutral-300 bg-transparent"
            >
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

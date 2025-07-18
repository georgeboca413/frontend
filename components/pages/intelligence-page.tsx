"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { useIntelReportList } from "@/features/intelligence/hooks/use-intel-report-list"
import { IntelReportCard } from "@/features/intelligence/components/intel-report-card"
import { IntelReportDetailModal } from "@/features/intelligence/components/intel-report-detail-modal"
import { IntelPageHeader } from "@/features/intelligence/components/intel-page-header"
import type { IntelligenceReportWithAgent } from "@/features/intelligence/types/intel-types"

export default function IntelligencePage() {
  const { reports, isLoading, isError } = useIntelReportList()
  const [selectedReport, setSelectedReport] = useState<IntelligenceReportWithAgent | null>(null)

  const formatDate = (date: Date | string) => {
    if (!date) return 'Unknown'
    
    const dateObj = typeof date === 'string' ? new Date(date) : date
    
    // Check if the date is valid
    if (isNaN(dateObj.getTime())) {
      return 'Invalid date'
    }
    
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(dateObj)
  }

  const handleReportClick = (report: IntelligenceReportWithAgent) => {
    setSelectedReport(report)
  }

  const handleCloseModal = () => {
    setSelectedReport(null)
  }

  if (isLoading) {
    return (
      <div className="p-6">
        <IntelPageHeader />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="bg-neutral-900 border-neutral-700 animate-pulse">
              <CardContent className="p-6">
                <div className="h-4 bg-neutral-700 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-neutral-700 rounded w-1/2 mb-4"></div>
                <div className="h-3 bg-neutral-700 rounded mb-2"></div>
                <div className="h-3 bg-neutral-700 rounded w-2/3"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="p-6">
        <IntelPageHeader />
        <Card className="bg-red-900/20 border-red-500">
          <CardContent className="pt-6">
            <p className="text-red-400">Failed to load intelligence reports</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="p-6">
      <IntelPageHeader />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reports?.map((report: IntelligenceReportWithAgent) => (
          <IntelReportCard
            key={report.id}
            report={report}
            onReportClick={handleReportClick}
            formatDate={formatDate}
          />
        ))}
      </div>

      {selectedReport && (
        <IntelReportDetailModal
          report={selectedReport}
          onClose={handleCloseModal}
          formatDate={formatDate}
        />
      )}
    </div>
  )
}

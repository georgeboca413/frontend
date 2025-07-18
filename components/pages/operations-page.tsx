"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Target, TrendingUp, CheckCircle, Clock } from "lucide-react"
import { useOpsOperationList } from "@/features/operations/hooks/use-ops-operation-list"
import { OpsOperationCard } from "@/features/operations/components/ops-operation-card"
import { OpsOperationDetailModal } from "@/features/operations/components/ops-operation-detail-modal"
import { OpsPageHeader } from "@/features/operations/components/ops-page-header"
import { useDashboardStats } from "@/hooks/use-dashboard-stats"
import type { OperationWithRelations } from "@/features/operations/types/ops-types"

export default function OperationsPage() {
  const { operations, isLoading, isError } = useOpsOperationList()
  const { stats, isLoading: statsLoading } = useDashboardStats()
  const [selectedOperation, setSelectedOperation] = useState<OperationWithRelations | null>(null)

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

  const handleOperationClick = (operation: OperationWithRelations) => {
    setSelectedOperation(operation)
  }

  const handleCloseModal = () => {
    setSelectedOperation(null)
  }

  if (isLoading) {
    return (
      <div className="p-6">
        <OpsPageHeader />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="bg-neutral-900 border-neutral-700 animate-pulse">
              <CardContent className="p-6">
                <div className="h-4 bg-neutral-700 rounded w-3/4 mb-2"></div>
                <div className="h-8 bg-neutral-700 rounded w-1/2"></div>
              </CardContent>
            </Card>
          ))}
        </div>
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
        <OpsPageHeader />
        <Card className="bg-red-900/20 border-red-500">
          <CardContent className="pt-6">
            <p className="text-red-400">Failed to load operations data</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  const operationStats = stats?.operations || {}

  return (
    <div className="p-6">
      <OpsPageHeader />
      
      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <Card className="bg-neutral-900 border-neutral-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-neutral-300">Total Operations</CardTitle>
            <Target className="h-4 w-4 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {statsLoading ? '-' : operationStats.total || 0}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-neutral-900 border-neutral-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-neutral-300">Active Missions</CardTitle>
            <Clock className="h-4 w-4 text-yellow-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {statsLoading ? '-' : operationStats.active || 0}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-neutral-900 border-neutral-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-neutral-300">Completed</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {statsLoading ? '-' : operationStats.completed || 0}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-neutral-900 border-neutral-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-neutral-300">Success Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-purple-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {statsLoading ? '-' : `${Math.round(operationStats.completionRate || 0)}%`}
            </div>
            {!statsLoading && (
              <Progress 
                value={operationStats.completionRate || 0} 
                className="mt-2 h-1"
              />
            )}
          </CardContent>
        </Card>
      </div>

      {/* Operations List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {operations?.map((operation: OperationWithRelations) => (
          <OpsOperationCard
            key={operation.id}
            operation={operation}
            onOperationClick={handleOperationClick}
            formatDate={formatDate}
          />
        ))}
      </div>

      {selectedOperation && (
        <OpsOperationDetailModal
          operation={selectedOperation}
          onClose={handleCloseModal}
          formatDate={formatDate}
        />
      )}
    </div>
  )
}

"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { useSysSystemList } from "@/features/systems/hooks/use-sys-system-list"
import { SysSystemCard } from "@/features/systems/components/sys-system-card"
import { SysSystemDetailModal } from "@/features/systems/components/sys-system-detail-modal"
import { SysPageHeader } from "@/features/systems/components/sys-page-header"
import type { SystemWithMetrics } from "@/features/systems/types/sys-types"

export default function SystemsPage() {
  const { systems, isLoading, isError } = useSysSystemList()
  const [selectedSystem, setSelectedSystem] = useState<SystemWithMetrics | null>(null)

  const formatDate = (date: Date | string | null) => {
    if (!date) return 'Never'
    
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

  const handleSystemClick = (system: SystemWithMetrics) => {
    setSelectedSystem(system)
  }

  const handleCloseModal = () => {
    setSelectedSystem(null)
  }

  if (isLoading) {
    return (
      <div className="p-6">
        <SysPageHeader />
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
        <SysPageHeader />
        <Card className="bg-red-900/20 border-red-500">
          <CardContent className="pt-6">
            <p className="text-red-400">Failed to load systems data</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="p-6">
      <SysPageHeader />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {systems?.map((system: SystemWithMetrics) => (
          <SysSystemCard
            key={system.id}
            system={system}
            onSystemClick={handleSystemClick}
            formatDate={formatDate}
          />
        ))}
      </div>

      <SysSystemDetailModal
        system={selectedSystem}
        isOpen={selectedSystem !== null}
        onClose={handleCloseModal}
      />
    </div>
  )
}

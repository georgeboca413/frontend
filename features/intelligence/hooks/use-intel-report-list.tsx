import useSWR from 'swr'
import { fetchIntelligenceReports } from '@/lib/api'
import type { IntelligenceReportWithAgent } from '../types/intel-types'

export function useIntelReportList(searchTerm?: string) {
  const { data, error, isLoading, mutate } = useSWR(
    searchTerm ? `/api/intelligence?search=${searchTerm}` : '/api/intelligence',
    () => fetchIntelligenceReports(searchTerm),
    {
      refreshInterval: 30000, // Refresh every 30 seconds
      revalidateOnFocus: true,
      dedupingInterval: 5000,
    }
  )

  return {
    reports: data || [],
    isLoading,
    isError: error,
    mutate,
  }
}

export function useIntelReportById(reportId: string | null) {
  const { data, error, isLoading } = useSWR(
    reportId ? `/api/intelligence/${reportId}` : null,
    reportId ? () => fetchIntelligenceReports().then((reports: IntelligenceReportWithAgent[]) => 
      reports.find((report: IntelligenceReportWithAgent) => report.id === reportId)
    ) : null
  )

  return {
    report: data,
    isLoading,
    isError: error,
  }
}

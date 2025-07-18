import useSWR from 'swr'
import { fetchSystems } from '@/lib/api'
import type { SystemWithMetrics } from '../types/sys-types'

export function useSysSystemList() {
  const { data, error, isLoading, mutate } = useSWR(
    '/api/systems',
    () => fetchSystems(),
    {
      refreshInterval: 30000, // Refresh every 30 seconds
      revalidateOnFocus: true,
      dedupingInterval: 5000,
    }
  )

  return {
    systems: data || [],
    isLoading,
    isError: error,
    mutate,
  }
}

export function useSysSystemById(systemId: string | null) {
  const { data, error, isLoading } = useSWR(
    systemId ? `/api/systems/${systemId}` : null,
    systemId ? () => fetchSystems().then((systems: SystemWithMetrics[]) => 
      systems.find((system: SystemWithMetrics) => system.id === systemId)
    ) : null
  )

  return {
    system: data,
    isLoading,
    isError: error,
  }
}

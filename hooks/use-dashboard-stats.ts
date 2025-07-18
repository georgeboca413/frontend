import useSWR from 'swr'

const fetchDashboardStats = async () => {
  const response = await fetch('/api/dashboard/stats')
  if (!response.ok) {
    throw new Error('Failed to fetch dashboard stats')
  }
  return response.json()
}

export function useDashboardStats() {
  const { data, error, isLoading } = useSWR('/api/dashboard/stats', () => fetchDashboardStats())

  return {
    stats: data?.stats || null,
    isLoading,
    isError: !!error,
  }
}

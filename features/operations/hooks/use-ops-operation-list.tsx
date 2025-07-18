import useSWR from 'swr'
import { fetchOperations } from '@/lib/api'
import type { OperationWithRelations } from '../types/ops-types'

export function useOpsOperationList() {
  const { data, error, isLoading, mutate } = useSWR(
    '/api/operations',
    () => fetchOperations(),
    {
      refreshInterval: 30000, // Refresh every 30 seconds
      revalidateOnFocus: true,
      dedupingInterval: 5000,
    }
  )

  return {
    operations: data || [],
    isLoading,
    isError: error,
    mutate,
  }
}

export function useOpsOperationById(operationId: string | null) {
  const { data, error, isLoading } = useSWR(
    operationId ? `/api/operations/${operationId}` : null,
    operationId ? () => fetchOperations().then((operations: OperationWithRelations[]) => 
      operations.find((operation: OperationWithRelations) => operation.id === operationId)
    ) : null
  )

  return {
    operation: data,
    isLoading,
    isError: error,
  }
}

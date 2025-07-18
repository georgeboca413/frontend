"use client"

import useSWR from "swr"
import { ActivityStats, RecentAgent } from "../types/act-types"

const ACT_DASHBOARD_STATS_CONFIG = {
  refreshInterval: 30000, // 30 seconds
  revalidateOnFocus: true,
}

// Mock data for development
const MOCK_DATA: ActivityStats = {
  agentStats: {
    activeField: 190,
    undercover: 990,
    training: 290,
  },
  recentAgents: [
    { id: "G-078W", name: "VENGEFUL SPIRIT", status: "active" },
    { id: "G-079X", name: "OBSIDIAN SENTINEL", status: "standby" },
    { id: "G-080Y", name: "GHOSTLY FURY", status: "active" },
    { id: "G-081Z", name: "CURSED REVENANT", status: "compromised" },
  ] as RecentAgent[],
  missionStats: {
    successful: {
      highRisk: 190,
      mediumRisk: 426,
      lowRisk: 920,
    },
    failed: {
      highRisk: 45,
      mediumRisk: 89,
      lowRisk: 120,
    },
  },
}

async function fetchDashboardStats(): Promise<ActivityStats> {
  // For now, return mock data
  // TODO: Replace with actual API call when backend is ready
  return new Promise((resolve) => {
    setTimeout(() => resolve(MOCK_DATA), 100)
  })
}

export function useActDashboardStats() {
  const { data, error, isLoading, mutate } = useSWR(
    "/api/dashboard/activity-stats",
    fetchDashboardStats,
    ACT_DASHBOARD_STATS_CONFIG
  )

  return {
    stats: data,
    isLoading,
    isError: error,
    refresh: mutate,
  }
}

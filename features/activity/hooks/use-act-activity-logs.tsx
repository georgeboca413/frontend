"use client"

import useSWR from "swr"
import { ActivityLog } from "../types/act-types"

const ACT_ACTIVITY_LOG_CONFIG = {
  refreshInterval: 10000, // 10 seconds
  revalidateOnFocus: true,
}

// Mock data for development
const MOCK_LOGS: (ActivityLog & { agent?: { callsign: string } })[] = [
  {
    id: "1",
    agentId: "agent1",
    action: "completed mission in",
    location: "Berlin",
    target: "zer0_Nigh",
    timestamp: new Date("2025-06-25T09:29:00Z"),
    details: null,
    agent: { callsign: "gh0st_Fire" },
  },
  {
    id: "2",
    agentId: "agent2",
    action: "extracted high-value target in",
    location: "Cairo",
    target: null,
    timestamp: new Date("2025-06-25T08:12:00Z"),
    details: null,
    agent: { callsign: "dr4g0n_V3in" },
  },
  {
    id: "3",
    agentId: "agent3",
    action: "lost communication in",
    location: "Havana",
    target: null,
    timestamp: new Date("2025-06-24T22:55:00Z"),
    details: null,
    agent: { callsign: "sn4ke_Sh4de" },
  },
  {
    id: "4",
    agentId: "agent4",
    action: "initiated surveillance in",
    location: "Tokyo",
    target: null,
    timestamp: new Date("2025-06-24T21:33:00Z"),
    details: null,
    agent: { callsign: "ph4nt0m_R4ven" },
  },
  {
    id: "5",
    agentId: "agent5",
    action: "compromised security in",
    location: "Moscow",
    target: "d4rk_M4trix",
    timestamp: new Date("2025-06-24T19:45:00Z"),
    details: null,
    agent: { callsign: "v0id_Walk3r" },
  },
]

async function fetchActivityLogs(): Promise<(ActivityLog & { agent?: { callsign: string } })[]> {
  // For now, return mock data
  // TODO: Replace with actual API call when backend is ready
  return new Promise((resolve) => {
    setTimeout(() => resolve(MOCK_LOGS), 100)
  })
}

export function useActActivityLogs() {
  const { data, error, isLoading, mutate } = useSWR(
    "/api/activity-logs",
    fetchActivityLogs,
    ACT_ACTIVITY_LOG_CONFIG
  )

  return {
    logs: data || [],
    isLoading,
    isError: error,
    refresh: mutate,
  }
}

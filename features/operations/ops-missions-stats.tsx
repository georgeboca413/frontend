"use client";

import { useState, useEffect } from "react";
import { fetchOperations } from "@/lib/api";
import type { OperationWithRelations } from "@/lib/types";
import { OpsMissionsStatsCards } from "./ops-missions-stats-cards";

type MissionStats = {
  activeOps: number;
  completed: number;
  compromised: number;
  successRate: number;
};

export function OpsMissionsStats() {
  const [stats, setStats] = useState<MissionStats>({
    activeOps: 0,
    completed: 0,
    compromised: 0,
    successRate: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        setLoading(true);
        const operations = await fetchOperations();

        const activeOps = operations.filter((op: OperationWithRelations) => op.status === "active").length;
        const completed = operations.filter((op: OperationWithRelations) => op.status === "completed").length;
        const compromised = operations.filter(
          (op: OperationWithRelations) => op.status === "compromised"
        ).length;
        const total = operations.length;
        const successRate = total > 0 ? Math.round((completed / total) * 100) : 0;

        setStats({
          activeOps,
          completed,
          compromised,
          successRate,
        });
      } catch (error) {
        console.error("Failed to load operation stats:", error);
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-neutral-900 border border-neutral-700 rounded-lg p-4 animate-pulse">
            <div className="h-4 bg-neutral-700 rounded mb-2"></div>
            <div className="h-8 bg-neutral-700 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  return <OpsMissionsStatsCards stats={stats} />;
}

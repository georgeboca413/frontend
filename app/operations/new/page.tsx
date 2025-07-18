"use client";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { PageTitle, PageSubtitle } from "@/components/layout";
import { OpsMissionsStats, OpsMissionsStatsList, OpsOperationDetails } from "@/features/operations";
import type { OperationWithRelations } from "@/lib/types";

export default function OperationsPage() {
  const [selectedOperation, setSelectedOperation] = useState<OperationWithRelations | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleRefresh = useCallback(() => {
    setRefreshKey((prev) => prev + 1);
  }, []);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <PageTitle>OPERATIONS CENTER</PageTitle>
          <PageSubtitle>Mission planning and execution oversight</PageSubtitle>
        </div>
        <div className="flex gap-2">
          <Button className="bg-orange-500 hover:bg-orange-600 text-white">New Operation</Button>
          <Button className="bg-orange-500 hover:bg-orange-600 text-white">Mission Brief</Button>
        </div>
      </div>

      {/* Stats Overview */}
      <OpsMissionsStats />

      {/* Operations List */}
      <OpsMissionsStatsList key={refreshKey} onOperationSelect={setSelectedOperation} />

      {/* Operation Detail Modal */}
      {selectedOperation && (
        <OpsOperationDetails
          operation={selectedOperation}
          onClose={() => setSelectedOperation(null)}
          onDelete={handleRefresh}
        />
      )}
    </div>
  );
}

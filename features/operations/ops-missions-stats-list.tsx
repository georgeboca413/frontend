"use client";

import { useState, useEffect } from "react";
import { fetchOperations } from "@/lib/api";
import type { OperationWithRelations } from "@/lib/types";
import { OpsOperationThumbnail } from "./ops-operation-thumbnail";

type Props = {
  onOperationSelect?: (operation: OperationWithRelations) => void;
};

export function OpsMissionsStatsList({ onOperationSelect }: Props) {
  const [operations, setOperations] = useState<OperationWithRelations[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadOperations = async () => {
      try {
        setLoading(true);
        const operationsData = await fetchOperations();
        setOperations(operationsData);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load operations");
      } finally {
        setLoading(false);
      }
    };

    loadOperations();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-neutral-400">Loading operations...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-red-400">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {operations.map((operation) => (
        <OpsOperationThumbnail key={operation.id} operation={operation} onClick={onOperationSelect} />
      ))}
    </div>
  );
}

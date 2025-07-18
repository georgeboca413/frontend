"use client";

import { Button } from "@/components/ui/button";
import { Bell, RefreshCw } from "lucide-react";

type Props = {
  title?: string;
  subtitle?: string;
  onNotificationClick?: () => void;
  onRefreshClick?: () => void;
};

export function TopBar({ title = "OVERVIEW", subtitle, onNotificationClick, onRefreshClick }: Props) {
  const currentTime = new Date().toLocaleString("en-US", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "UTC",
    timeZoneName: "short",
  });

  return (
    <div className="h-16 bg-neutral-800 border-b border-neutral-700 flex items-center justify-between px-6">
      <div className="flex items-center gap-4">
        <div className="text-sm text-neutral-400">
          TACTICAL COMMAND / <span className="text-orange-500">{title}</span>
          {subtitle && <span className="text-neutral-500"> / {subtitle}</span>}
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="text-xs text-neutral-500">LAST UPDATE: {currentTime}</div>
        <Button
          variant="ghost"
          size="icon"
          className="text-neutral-400 hover:text-orange-500"
          onClick={onNotificationClick}
        >
          <Bell className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="text-neutral-400 hover:text-orange-500"
          onClick={onRefreshClick}
        >
          <RefreshCw className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}

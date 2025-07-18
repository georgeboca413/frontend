"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { Sidebar, TopBar } from "@/components/layout";

const sectionTitles: Record<string, string> = {
  "/": "COMMAND CENTER",
  "/agent-network": "AGENT NETWORK",
  "/operations": "OPERATIONS",
  "/intelligence": "INTELLIGENCE",
  "/systems": "SYSTEMS",
  "/command-center": "COMMAND CENTER",
};

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const pathname = usePathname();

  const handleRefresh = () => {
    window.location.reload();
  };

  const handleNotificationClick = () => {
    console.log("Notifications clicked");
  };

  const getCurrentTitle = () => {
    return sectionTitles[pathname] || "TACTICAL OPERATIONS";
  };

  return (
    <div className="flex h-screen">
      <Sidebar
        activeSection={pathname}
        onSectionChange={() => {}} // Navigation will be handled by Next.js router
        collapsed={sidebarCollapsed}
        onCollapsedChange={setSidebarCollapsed}
      />

      {/* Main Content */}
      <div className={`flex-1 flex flex-col ${!sidebarCollapsed ? "md:ml-0" : ""}`}>
        <TopBar
          title={getCurrentTitle()}
          onNotificationClick={handleNotificationClick}
          onRefreshClick={handleRefresh}
        />

        {/* Page Content */}
        <div className="flex-1 overflow-auto">{children}</div>
      </div>
    </div>
  );
}

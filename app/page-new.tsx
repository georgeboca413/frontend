"use client";

import { useState } from "react";
import { Sidebar, TopBar } from "@/components/layout";
import CommandCenterPage from "./command-center/page";
import AgentNetworkPage from "./agent-network/page";
import OperationsPage from "./operations/page";
import IntelligencePage from "./intelligence/page";
import SystemsPage from "./systems/page";

const sectionTitles: Record<string, string> = {
  overview: "COMMAND CENTER",
  agents: "AGENT NETWORK",
  operations: "OPERATIONS",
  intelligence: "INTELLIGENCE",
  systems: "SYSTEMS",
};

export default function TacticalDashboard() {
  const [activeSection, setActiveSection] = useState("overview");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const handleRefresh = () => {
    // Refresh logic here
    window.location.reload();
  };

  const handleNotificationClick = () => {
    // Notification logic here
    console.log("Notifications clicked");
  };

  return (
    <div className="flex h-screen">
      <Sidebar
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        collapsed={sidebarCollapsed}
        onCollapsedChange={setSidebarCollapsed}
      />

      {/* Main Content */}
      <div className={`flex-1 flex flex-col ${!sidebarCollapsed ? "md:ml-0" : ""}`}>
        <TopBar
          title={sectionTitles[activeSection]}
          onNotificationClick={handleNotificationClick}
          onRefreshClick={handleRefresh}
        />

        {/* Dashboard Content */}
        <div className="flex-1 overflow-auto">
          {activeSection === "overview" && <CommandCenterPage />}
          {activeSection === "agents" && <AgentNetworkPage />}
          {activeSection === "operations" && <OperationsPage />}
          {activeSection === "intelligence" && <IntelligencePage />}
          {activeSection === "systems" && <SystemsPage />}
        </div>
      </div>
    </div>
  );
}

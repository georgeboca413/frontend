"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronRight, Monitor, Settings, Shield, Target, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

type SidebarItem = {
  id: string;
  href: string;
  icon: typeof Monitor;
  label: string;
};

type Props = {
  activeSection: string;
  onSectionChange: (section: string) => void;
  collapsed?: boolean;
  onCollapsedChange?: (collapsed: boolean) => void;
};

const defaultItems: SidebarItem[] = [
  { id: "overview", href: "/", icon: Monitor, label: "COMMAND CENTER" },
  { id: "agents", href: "/agent-network", icon: Users, label: "AGENT NETWORK" },
  { id: "operations", href: "/operations", icon: Target, label: "OPERATIONS" },
  { id: "intelligence", href: "/intelligence", icon: Shield, label: "INTELLIGENCE" },
  { id: "systems", href: "/systems", icon: Settings, label: "SYSTEMS" },
];

export function Sidebar({ activeSection, onSectionChange, collapsed = false, onCollapsedChange }: Props) {
  const [isCollapsed, setIsCollapsed] = useState(collapsed);

  const handleToggleCollapsed = () => {
    const newCollapsed = !isCollapsed;
    setIsCollapsed(newCollapsed);
    onCollapsedChange?.(newCollapsed);
  };

  const isActiveItem = (item: SidebarItem) => {
    return (
      activeSection === item.href ||
      (item.id === "overview" && activeSection === "/") ||
      (activeSection.startsWith(item.href) && item.href !== "/")
    );
  };

  return (
    <>
      <div
        className={`${
          isCollapsed ? "w-16" : "w-70"
        } bg-neutral-900 border-r border-neutral-700 transition-all duration-300 fixed md:relative z-50 md:z-auto h-full md:h-auto ${
          !isCollapsed ? "md:block" : ""
        }`}
      >
        <div className="p-4">
          <div className="flex items-center justify-between mb-8">
            <div className={`${isCollapsed ? "hidden" : "block"}`}>
              <h1 className="text-orange-500 font-bold text-lg tracking-wider">TACTICAL OPS</h1>
              <p className="text-neutral-500 text-xs">v2.1.7 CLASSIFIED</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleToggleCollapsed}
              className="text-neutral-400 hover:text-orange-500"
            >
              <ChevronRight
                className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform ${isCollapsed ? "" : "rotate-180"}`}
              />
            </Button>
          </div>

          <nav className="space-y-2">
            {defaultItems.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className={`w-full flex items-center gap-3 p-3 rounded transition-colors ${
                  isActiveItem(item)
                    ? "bg-orange-500 text-white"
                    : "text-neutral-400 hover:text-white hover:bg-neutral-800"
                }`}
              >
                <item.icon className="w-5 h-5 md:w-5 md:h-5 sm:w-6 sm:h-6" />
                {!isCollapsed && <span className="text-sm font-medium">{item.label}</span>}
              </Link>
            ))}
          </nav>

          {!isCollapsed && (
            <div className="mt-8 p-4 bg-neutral-800 border border-neutral-700 rounded">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                <span className="text-xs text-white">SYSTEM ONLINE</span>
              </div>
              <div className="text-xs text-neutral-500">
                <div>UPTIME: 72:14:33</div>
                <div>AGENTS: 847 ACTIVE</div>
                <div>MISSIONS: 23 ONGOING</div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Overlay */}
      {!isCollapsed && (
        <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={handleToggleCollapsed} />
      )}
    </>
  );
}

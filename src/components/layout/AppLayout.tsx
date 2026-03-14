import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../ui/Sidebar";
import Topbar from "../ui/Topbar";

/**
 * The Shell component for the authenticated part of the app.
 * It manages the Sidebar state and provides a scrollable main area.
 */
export default function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* 1. Permanent Sidebar (Desktop) / Sliding Sidebar (Mobile) */}
      <Sidebar 
        open={sidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
      />

      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        {/* 2. Horizontal Header with Menu Toggle and User Info */}
        <Topbar onMenuClick={() => setSidebarOpen(true)} />

        {/* 3. Main Content Area - This scrolls independently */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
"use client";

import { useEffect, useState } from "react";

import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";

export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setSidebarOpen(false);
      }
    };

    if (sidebarOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [sidebarOpen]);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#faf8f7]">
      <div
        aria-hidden={!sidebarOpen}
        className={`fixed inset-x-0 bottom-0 top-20 z-30 bg-black/30 transition-opacity duration-300 lg:hidden ${
          sidebarOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setSidebarOpen(false)}
      />

      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="min-w-0 pt-20 lg:pl-60">
        <Header
          sidebarOpen={sidebarOpen}
          onSidebarToggle={() => setSidebarOpen((current) => !current)}
        />

        <main className="min-w-0">{children}</main>
      </div>
    </div>
  );
}
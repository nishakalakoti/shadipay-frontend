"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Search, Bell, ChevronDown, LogOut, Settings, User, Menu } from "lucide-react";

import { useAuth } from "@/components/auth/AuthProvider";
import { logoutUser } from "@/lib/auth";

function getInitials(name) {
  const source = name || "";
  const parts = source.trim().split(/\s+/).filter(Boolean);

  if (parts.length === 0) {
    return "S";
  }

  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase();
  }

  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
}

export default function Header({ sidebarOpen, onSidebarToggle }) {
  const router = useRouter();
  const { user } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const displayName = user?.displayName || user?.email || "ShadiPay User";
  const initials = getInitials(user?.displayName || user?.email || "ShadiPay User");

  const handleLogout = async () => {
    try {
      await logoutUser();
      router.push("/login");
    } catch (error) {
      console.error("Logout failed", error);
    } finally {
      setIsMenuOpen(false);
    }
  };

  return (
    <header className="fixed left-0 top-0 z-50 flex h-20 w-full items-center justify-between gap-3 border-b border-[#eee8e8] bg-[#faf8f7]/95 px-4 backdrop-blur-md sm:px-6 lg:left-60 lg:w-[calc(100%-15rem)] lg:px-8">
      <div className="flex min-w-0 flex-1 items-center gap-3">
        <button
          type="button"
          aria-label="Open sidebar"
          aria-expanded={Boolean(sidebarOpen)}
          onClick={() => onSidebarToggle?.()}
          className="flex h-10 w-10 items-center justify-center rounded-full text-[#625b59] transition hover:bg-white hover:text-[#7a0719] lg:hidden"
        >
          <Menu size={19} strokeWidth={1.8} />
        </button>

        <div className="relative w-full max-w-[380px]">
          <Search
            size={18}
            strokeWidth={1.8}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-[#99908e]"
          />

          <input
            type="text"
            placeholder="Search weddings, guests, or payments..."
            className="
              h-11
              w-full
              rounded-full
              border
              border-[#eee8e8]
              bg-white
              pl-11
              pr-4
              text-sm
              text-[#333]
              outline-none
              transition
              placeholder:text-[#aaa]
              focus:border-[#7a0719]
              focus:ring-2
              focus:ring-[#7a0719]/10
            "
          />
        </div>
      </div>

      <div className="flex items-center gap-5">
        <button
          type="button"
          aria-label="Notifications"
          className="
            relative
            hidden
            h-10
            w-10
            items-center
            justify-center
            rounded-full
            text-[#625b59]
            transition
            hover:bg-white
            hover:text-[#7a0719]
            sm:flex
          "
        >
          <Bell size={19} strokeWidth={1.8} />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[#7a0719]" />
        </button>

        <div className="relative flex items-center gap-3">
          <div className="hidden text-right sm:block">
            <p className="text-sm font-semibold text-[#292323]">{displayName}</p>
            <p className="text-xs text-[#938b89]">{user?.email ? "Premium Member" : "User"}</p>
          </div>

          <button
            type="button"
            aria-label="User profile menu"
            onClick={() => setIsMenuOpen((current) => !current)}
            className="flex items-center gap-2"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#7a0719] text-sm font-semibold text-white transition hover:bg-[#650515]">
              {initials}
            </div>
            <ChevronDown className="h-4 w-4 text-[#625b59]" />
          </button>

          {isMenuOpen ? (
            <div className="absolute right-0 top-14 w-52 overflow-hidden rounded-2xl border border-[#eee8e8] bg-white shadow-[0_18px_36px_rgba(32,18,18,0.08)]">
              <div className="border-b border-[#f0e8e8] px-3 py-2.5 text-sm font-medium text-[#171717]">
                {displayName}
              </div>

              <Link
                href="/settings"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 text-sm text-[#5f5755] transition hover:bg-[#faf8f7] hover:text-[#7a0719]"
              >
                <User className="h-4 w-4" />
                Profile
              </Link>

              <Link
                href="/settings"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 text-sm text-[#5f5755] transition hover:bg-[#faf8f7] hover:text-[#7a0719]"
              >
                <Settings className="h-4 w-4" />
                Settings
              </Link>

              <button
                type="button"
                onClick={handleLogout}
                className="flex w-full items-center gap-3 border-t border-[#f0e8e8] px-3 py-2.5 text-left text-sm text-[#5f5755] transition hover:bg-[#faf8f7] hover:text-[#7a0719]"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </header>
  );
}

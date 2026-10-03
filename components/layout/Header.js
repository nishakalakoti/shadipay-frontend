"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  Bell,
  ChevronDown,
  LogOut,
  Menu,
  Settings,
} from "lucide-react";

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

  const menuRef = useRef(null);

  const displayName =
    user?.displayName || user?.email || "ShadiPay User";

  const initials = getInitials(
    user?.displayName || user?.email || "ShadiPay User"
  );

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleOutsideClick(event) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {
        setIsMenuOpen(false);
      }
    }

    function handleEscape(event) {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

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
    <header
      className="
        fixed
        left-0
        top-0
        z-50
        flex
        h-20
        w-full
        items-center
        justify-between
        border-b
        border-[#eee8e8]
        bg-[#faf8f7]/95
        px-3
        backdrop-blur-md
        sm:px-6
        lg:left-60
        lg:w-[calc(100%-15rem)]
        lg:px-8
      "
    >
    {/* Left side */}
<div className="flex min-w-0 items-center gap-3">
  {/* Mobile sidebar button */}
  <button
    type="button"
    aria-label="Open sidebar"
    aria-expanded={Boolean(sidebarOpen)}
    onClick={() => onSidebarToggle?.()}
    className="
      flex
      h-10
      w-10
      shrink-0
      items-center
      justify-center
      rounded-full
      text-[#625b59]
      transition
      hover:bg-white
      hover:text-[#7a0719]
      lg:hidden
    "
  >
    <Menu
      size={20}
      strokeWidth={1.8}
    />
  </button>

  {/* Mobile Brand Logo */}
  <Link
    href="/wedding"
    aria-label="ShadiPay Home"
    className="
      flex
      items-center
      gap-2.5
      lg:hidden
    "
  >
    {/* Logo Mark */}
    <span
      className="
        relative
        flex
        h-9
        w-9
        shrink-0
        items-center
        justify-center
        overflow-hidden
        rounded-xl
        bg-[#7a0719]
        shadow-[0_4px_12px_rgba(122,7,25,0.18)]
      "
    >
      {/* Decorative ring */}
      <span
        className="
          absolute
          h-5
          w-5
          rounded-full
          border-[1.5px]
          border-white/90
        "
      />

      <span
        className="
          absolute
          h-5
          w-5
          translate-x-1.5
          rounded-full
          border-[1.5px]
          border-white/45
        "
      />

      {/* Center S */}
      <span
        className="
          relative
          z-10
          text-[13px]
          font-semibold
          leading-none
          text-white
        "
      >
        S
      </span>

      {/* Small sparkle */}
      <span
        className="
          absolute
          right-1
          top-1
          h-1.5
          w-1.5
          rounded-full
          bg-white
        "
      />
    </span>

    {/* Brand Name */}
    <span
      className="
        text-[21px]
        font-semibold
        tracking-[-0.04em]
        text-[#7a0719]
      "
    >
      Shadi
      <span className="font-normal text-[#342c2c]">
        Pay
      </span>
    </span>
  </Link>
</div>

      {/* Right side */}
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Notifications */}
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
          <Bell
            size={19}
            strokeWidth={1.8}
          />

          <span
            className="
              absolute
              right-2
              top-2
              h-2
              w-2
              rounded-full
              bg-[#7a0719]
            "
          />
        </button>

        {/* User Menu */}
        <div
          ref={menuRef}
          className="relative flex items-center"
        >
          {/* User information */}
          <div className="mr-2 hidden text-right md:block">
            <p className="text-sm font-semibold text-[#292323]">
              {displayName}
            </p>

            <p className="text-xs text-[#938b89]">
              {user?.email ? "Premium Member" : "User"}
            </p>
          </div>

          {/* Avatar + dropdown button */}
          <button
            type="button"
            aria-label="User menu"
            aria-expanded={isMenuOpen}
            onClick={() =>
              setIsMenuOpen((current) => !current)
            }
            className="
              flex
              items-center
              gap-1.5
              rounded-full
              outline-none
            "
          >
            <div
              className="
                flex
                h-10
                w-10
                shrink-0
                items-center
                justify-center
                rounded-full
                bg-[#7a0719]
                text-sm
                font-semibold
                text-white
                transition
                hover:bg-[#650515]
              "
            >
              {initials}
            </div>

            <ChevronDown
              className={`
                h-4
                w-4
                text-[#625b59]
                transition-transform
                duration-200
                ${isMenuOpen ? "rotate-180" : ""}
              `}
            />
          </button>

          {/* Dropdown */}
          {isMenuOpen && (
            <div
              className="
                absolute
                right-0
                top-12
                z-[60]
                w-56
                max-w-[calc(100vw-1rem)]
                overflow-hidden
                rounded-2xl
                border
                border-[#eee8e8]
                bg-white
                shadow-[0_18px_36px_rgba(32,18,18,0.08)]
              "
            >
              {/* User name */}
              <div
                className="
                  border-b
                  border-[#f0e8e8]
                  px-4
                  py-3
                  text-sm
                  font-semibold
                  text-[#171717]
                "
              >
                {displayName}
              </div>

              {/* Settings */}
              <Link
                href="/settings"
                onClick={() => setIsMenuOpen(false)}
                className="
                  flex
                  items-center
                  gap-3
                  px-4
                  py-3
                  text-sm
                  text-[#5f5755]
                  transition
                  hover:bg-[#faf8f7]
                  hover:text-[#7a0719]
                "
              >
                <Settings className="h-4 w-4" />
                <span>Settings</span>
              </Link>

              {/* Logout */}
              <button
                type="button"
                onClick={handleLogout}
                className="
                  flex
                  w-full
                  items-center
                  gap-3
                  border-t
                  border-[#f0e8e8]
                  px-4
                  py-3
                  text-left
                  text-sm
                  text-[#5f5755]
                  transition
                  hover:bg-[#faf8f7]
                  hover:text-[#7a0719]
                "
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
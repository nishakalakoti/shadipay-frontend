"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Heart,
  Users,
  Gift,
  CreditCard,
  Mail,
  QrCode,
  BarChart3,
  Download,
  Settings,
  X,
} from "lucide-react";

const menuSections = [
  {
    title: "MAIN",
    items: [
      {
        label: "My Wedding",
        href: "/wedding",
        icon: Heart,
      },
    ],
  },

  {
    title: "WEDDING",
    items: [
      {
        label: "Guests",
        href: "/guests",
        icon: Users,
      },
      {
        label: "Gifts",
        href: "/gifts",
        icon: Gift,
      },
      {
        label: "Payments",
        href: "/payments",
        icon: CreditCard,
      },
      {
        label: "Invitations",
        href: "/invitations",
        icon: Mail,
      },
      {
        label: "QR Code",
        href: "/qr",
        icon: QrCode,
      },
    ],
  },

  {
    title: "INSIGHTS",
    items: [
      {
        label: "Analytics",
        href: "/analytics",
        icon: BarChart3,
      },
      {
        label: "Reports & Export",
        href: "/reports",
        icon: Download,
      },
    ],
  },

  {
    title: "SYSTEM",
    items: [
      {
        label: "Settings",
        href: "/settings",
        icon: Settings,
      },
    ],
  },
];

export default function Sidebar({ isOpen = false, onClose = () => {} }) {
  const pathname = usePathname();

  const handleNavClick = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <aside
      className={`fixed left-0 top-20 z-40 flex h-[calc(100vh-5rem)] w-60 flex-col border-r border-[#eee8e8] bg-[#faf8f7] shadow-[0_0_24px_rgba(28,18,18,0.06)] transition-transform duration-300 ease-out ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } lg:top-0 lg:h-screen lg:translate-x-0 lg:shadow-none`}
    >
      <div className="flex h-[72px] shrink-0 items-center justify-between px-5">
        <h1 className="text-[22px] font-semibold tracking-tight text-[#7a0719]">
          ShadiPay
        </h1>

        <button
          type="button"
          aria-label="Close sidebar"
          onClick={onClose}
          className="flex h-9 w-9 items-center justify-center rounded-full text-[#625b59] transition hover:bg-white hover:text-[#7a0719] lg:hidden"
        >
          <X size={18} strokeWidth={2} />
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 pb-4 scrollbar-none">
        {menuSections.map((section) => (
          <div key={section.title} className="mb-5">
            <p className="mb-2 px-3 text-[9px] font-semibold tracking-[0.18em] text-[#a29a98]">
              {section.title}
            </p>

            <div className="space-y-0.5">
              {section.items.map((item) => {
                const Icon = item.icon;

                const isActive =
                  pathname === item.href ||
                  pathname.startsWith(`${item.href}/`);

                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={handleNavClick}
                    className={`
                      group
                      flex
                      items-center
                      gap-3
                      rounded-[10px]
                      px-3
                      py-2.5
                      text-[13px]
                      font-medium
                      transition-all
                      duration-200

                      ${
                        isActive
                          ? "bg-[#7a0719] text-white shadow-sm"
                          : "text-[#5f5755] hover:bg-white hover:text-[#7a0719]"
                      }
                    `}
                  >
                    <Icon size={16} strokeWidth={1.8} className="shrink-0" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>
    </aside>
  );
}
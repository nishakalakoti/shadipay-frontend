"use client";

import {
  CreditCard,
  Gift,
  Users,
  Mail,
} from "lucide-react";

const notificationOptions = [
  {
    key: "payments",
    title: "Payment Notifications",
    description: "Get notified when a guest sends a payment.",
    icon: CreditCard,
  },
  {
    key: "gifts",
    title: "Gift Notifications",
    description: "Get notified when a new gift is added.",
    icon: Gift,
  },
  {
    key: "guests",
    title: "Guest & RSVP Notifications",
    description: "Get notified when guests respond to your invitation.",
    icon: Users,
  },
  {
    key: "invitations",
    title: "Invitation Notifications",
    description: "Get notified about invitation activity.",
    icon: Mail,
  },
];

export default function NotificationSettings({
  settings,
  onChange,
}) {
  return (
    <div className="space-y-2">

      {notificationOptions.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.key}
            className="flex items-center justify-between rounded-xl p-4 transition hover:bg-[#faf8f7]"
          >

            <div className="flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f5eeee]">
                <Icon
                  size={17}
                  className="text-[#7a0719]"
                />
              </div>

              <div>

                <p className="text-sm font-semibold text-[#403a38]">
                  {item.title}
                </p>

                <p className="mt-1 text-xs text-[#817976]">
                  {item.description}
                </p>

              </div>

            </div>

            {/* Toggle */}
            <button
              type="button"
              onClick={() =>
                onChange(
                  item.key,
                  !settings[item.key]
                )
              }
              className={`relative h-6 w-11 shrink-0 rounded-full transition ${
                settings[item.key]
                  ? "bg-[#7a0719]"
                  : "bg-[#d9d2d0]"
              }`}
            >

              <span
                className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition ${
                  settings[item.key]
                    ? "left-6"
                    : "left-1"
                }`}
              />

            </button>

          </div>
        );
      })}

    </div>
  );
}
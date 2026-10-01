"use client";

import { useState } from "react";
import { LockKeyhole } from "lucide-react";

export default function SecuritySettings() {
  const [showPasswordForm, setShowPasswordForm] =
    useState(false);

  return (
    <div>

      <div className="flex items-center justify-between">

        <div className="flex items-center gap-3">

          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f5eeee]">
            <LockKeyhole
              size={17}
              className="text-[#7a0719]"
            />
          </div>

          <div>

            <p className="text-sm font-semibold text-[#403a38]">
              Password & Security
            </p>

            <p className="mt-1 text-xs text-[#817976]">
              Keep your ShadiPay account secure.
            </p>

          </div>

        </div>

        <button
          type="button"
          onClick={() =>
            setShowPasswordForm(
              (previous) => !previous
            )
          }
          className="rounded-xl border border-[#e8dfdd] px-4 py-2.5 text-sm font-semibold text-[#625b59] hover:border-[#7a0719] hover:text-[#7a0719]"
        >
          Change Password
        </button>

      </div>

      {showPasswordForm && (
        <div className="mt-6 grid gap-4 border-t border-[#eee8e8] pt-6">

          <input
            type="password"
            placeholder="Current password"
            className="rounded-xl border border-[#e8dfdd] px-4 py-3 text-sm outline-none focus:border-[#7a0719]"
          />

          <input
            type="password"
            placeholder="New password"
            className="rounded-xl border border-[#e8dfdd] px-4 py-3 text-sm outline-none focus:border-[#7a0719]"
          />

          <input
            type="password"
            placeholder="Confirm new password"
            className="rounded-xl border border-[#e8dfdd] px-4 py-3 text-sm outline-none focus:border-[#7a0719]"
          />

          <div className="flex justify-end">

            <button
              type="button"
              className="rounded-xl bg-[#7a0719] px-5 py-3 text-sm font-semibold text-white hover:bg-[#650515]"
            >
              Update Password
            </button>

          </div>

        </div>
      )}

    </div>
  );
}
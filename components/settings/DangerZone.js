"use client";

import { useState } from "react";
import { AlertTriangle, Trash2 } from "lucide-react";

export default function DangerZone() {
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <section className="overflow-hidden rounded-[22px] border border-[#f0d5d7] bg-white">

      <div className="border-b border-[#f0d5d7] bg-[#fff8f8] px-6 py-5">

        <div className="flex items-center gap-3">

          <AlertTriangle
            size={19}
            className="text-[#9b2635]"
          />

          <div>

            <h2 className="text-lg font-semibold text-[#9b2635]">
              Danger Zone
            </h2>

            <p className="mt-1 text-sm text-[#9b6b70]">
              These actions cannot be easily undone.
            </p>

          </div>

        </div>

      </div>

      <div className="p-6">

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          <div>

            <p className="text-sm font-semibold text-[#403a38]">
              Delete Wedding
            </p>

            <p className="mt-1 max-w-xl text-xs leading-5 text-[#817976]">
              Permanently delete your wedding registry and
              associated wedding data.
            </p>

          </div>

          <button
            type="button"
            onClick={() =>
              setShowConfirm(true)
            }
            className="flex w-fit items-center gap-2 rounded-xl border border-[#e5bfc2] px-4 py-2.5 text-sm font-semibold text-[#9b2635] hover:bg-[#fff4f4]"
          >
            <Trash2 size={15} />
            Delete Wedding
          </button>

        </div>

        {showConfirm && (
          <div className="mt-5 rounded-xl bg-[#fff4f4] p-4">

            <p className="text-sm font-semibold text-[#9b2635]">
              Are you sure you want to delete this wedding?
            </p>

            <p className="mt-1 text-xs text-[#9b6b70]">
              This will eventually remove the wedding,
              guests, gifts, payments and registry data.
            </p>

            <div className="mt-4 flex gap-2">

              <button
                type="button"
                onClick={() =>
                  setShowConfirm(false)
                }
                className="rounded-lg border border-[#e5bfc2] bg-white px-4 py-2 text-xs font-semibold text-[#625b59]"
              >
                Cancel
              </button>

              <button
                type="button"
                className="rounded-lg bg-[#9b2635] px-4 py-2 text-xs font-semibold text-white"
              >
                Confirm Delete
              </button>

            </div>

          </div>
        )}

      </div>

    </section>
  );
}
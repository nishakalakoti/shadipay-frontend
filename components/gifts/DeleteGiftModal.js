"use client";

import {
  AlertTriangle,
  Trash2,
  X,
} from "lucide-react";

export default function DeleteGiftModal({
  isOpen,
  onClose,
  gift,
  onConfirm,
  isLoading = false,
}) {
  if (!isOpen || !gift) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/40 px-4 backdrop-blur-[2px]">

      {/* =================================================
          MODAL
      ================================================== */}

      <div className="w-full max-w-[440px] overflow-hidden rounded-[24px] bg-white shadow-[0_20px_60px_rgba(0,0,0,0.18)]">

        {/* =================================================
            HEADER
        ================================================== */}

        <div className="flex items-start justify-between px-6 py-5">

          <div className="flex items-start gap-3">

            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#fdf0ef]">

              <AlertTriangle
                size={18}
                className="text-[#b42318]"
              />

            </div>

            <div>

              <h2 className="text-lg font-semibold text-[#171717]">
                Delete Gift
              </h2>

              <p className="mt-1 text-sm text-[#817976]">
                This action cannot be undone.
              </p>

            </div>

          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="flex h-9 w-9 items-center justify-center rounded-full text-[#817976] transition hover:bg-[#f7f3f2] hover:text-[#7a0719] disabled:cursor-not-allowed disabled:opacity-50"
          >
            <X size={18} />
          </button>

        </div>

        {/* =================================================
            CONTENT
        ================================================== */}

        <div className="px-6 pb-6">

          <div className="rounded-xl border border-[#eee8e8] bg-[#faf8f7] p-4">

            <p className="text-sm leading-6 text-[#625b59]">

              Are you sure you want to delete the{" "}

              <span className="font-semibold text-[#171717]">
                {gift.gift || "gift"}
              </span>

              {" "}received from{" "}

              <span className="font-semibold text-[#171717]">
                {gift.guest_name || "this guest"}
              </span>
              ?

            </p>

          </div>

        </div>

        {/* =================================================
            FOOTER
        ================================================== */}

        <div className="flex items-center justify-end gap-3 border-t border-[#eee8e8] bg-[#fcfaf9] px-6 py-4">

          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="rounded-xl border border-[#e8dfdd] bg-white px-5 py-2.5 text-sm font-semibold text-[#625b59] transition hover:border-[#7a0719] hover:text-[#7a0719] disabled:cursor-not-allowed disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={isLoading}
            className="inline-flex items-center gap-2 rounded-xl bg-[#b42318] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#941b13] disabled:cursor-not-allowed disabled:opacity-60"
          >

            <Trash2 size={16} />

            {isLoading
              ? "Deleting..."
              : "Delete Gift"}

          </button>

        </div>

      </div>

    </div>
  );
}
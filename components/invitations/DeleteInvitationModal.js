"use client";

import { AlertTriangle, X } from "lucide-react";

export default function DeleteInvitationModal({
  isOpen,
  onClose,
  invitation,
  onConfirm,
  isLoading = false,
}) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 px-4 backdrop-blur-sm">

      <div className="w-full max-w-md overflow-hidden rounded-[24px] bg-white shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#eee8e8] px-6 py-5">

          <h2 className="text-lg font-semibold text-[#171717]">
            Delete Invitation
          </h2>

          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="flex h-9 w-9 items-center justify-center rounded-full text-[#817976] transition hover:bg-[#f5eeee] hover:text-[#7a0719] disabled:cursor-not-allowed disabled:opacity-50"
          >
            <X size={19} />
          </button>

        </div>

        {/* Content */}
        <div className="px-6 py-6">

          <div className="flex items-start gap-4">

            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#f9e8e9]">
              <AlertTriangle
                size={20}
                className="text-[#9b2635]"
              />
            </div>

            <div>

              <p className="text-sm font-semibold text-[#302b29]">
                Are you sure you want to delete this invitation?
              </p>

              <p className="mt-2 text-sm leading-6 text-[#817976]">
                This action will permanently remove the invitation
                from this wedding.
              </p>

              {invitation && (
                <div className="mt-4 rounded-xl bg-[#faf8f7] px-4 py-3">

                  <p className="text-sm font-semibold text-[#302b29]">
                    {invitation.title}
                  </p>

                  <p className="mt-1 text-xs text-[#817976]">
                    {invitation.theme}
                  </p>

                </div>
              )}

            </div>

          </div>

          {/* Actions */}
          <div className="mt-6 flex justify-end gap-3">

            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="rounded-xl border border-[#e8dfdd] px-5 py-3 text-sm font-semibold text-[#625b59] transition hover:bg-[#faf8f7] disabled:cursor-not-allowed disabled:opacity-60"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={onConfirm}
              disabled={isLoading}
              className="rounded-xl bg-[#9b2635] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#821f2d] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoading
                ? "Deleting..."
                : "Delete Invitation"}
            </button>

          </div>

        </div>
      </div>
    </div>
  );
}
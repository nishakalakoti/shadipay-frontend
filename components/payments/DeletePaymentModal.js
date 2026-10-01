"use client";

import { AlertTriangle, X } from "lucide-react";

export default function DeletePaymentModal({
  isOpen,
  onClose,
  payment,
  onConfirm,
  isLoading = false,
}) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">

      <div className="w-full max-w-md rounded-[22px] bg-white shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#eee8e8] px-6 py-5">

          <h2 className="text-lg font-semibold text-[#171717]">
            Delete Payment
          </h2>

          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="rounded-lg p-2 text-[#817976] transition hover:bg-[#f5eeee] hover:text-[#7a0719]"
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
                Delete this payment?
              </p>

              <p className="mt-2 text-sm leading-6 text-[#817976]">
                This payment is linked to the online gift.
                Deleting it will also delete the underlying
                online gift record.
              </p>

              {payment && (
                <div className="mt-4 rounded-xl bg-[#faf8f7] px-4 py-3">

                  <p className="text-sm font-semibold text-[#302b29]">
                    {payment.guestName}
                  </p>

                  <p className="mt-1 text-sm text-[#817976]">
                    ₹{Number(payment.amount || 0).toLocaleString("en-IN")}
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
              className="rounded-xl border border-[#e8dfdd] bg-white px-5 py-3 text-sm font-semibold text-[#625b59] transition hover:border-[#7a0719] hover:text-[#7a0719]"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={onConfirm}
              disabled={isLoading}
              className="rounded-xl bg-[#9b2635] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#821f2d] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoading ? "Deleting..." : "Delete Payment"}
            </button>

          </div>

        </div>

      </div>
    </div>
  );
}
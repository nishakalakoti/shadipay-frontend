"use client";

import {
  AlertTriangle,
  Trash2,
  X,
} from "lucide-react";

export default function DeleteQRCodeModal({
  isOpen,
  onClose,
  onConfirm,
  isDeleting = false,
  wedding,
}) {
  if (!isOpen) {
    return null;
  }


  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-4 py-5">

      {/* =================================================
          MODAL
      ================================================== */}

      <div
        className="
          w-full
          max-w-md
          rounded-[22px]
          bg-white
          shadow-2xl
        "
      >

        {/* =================================================
            HEADER
        ================================================== */}

        <div className="flex items-start justify-between border-b border-[#eee8e8] px-5 py-5 sm:px-6">

          <div className="flex items-start gap-3">

            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#fff1f2]">

              <AlertTriangle
                size={18}
                className="text-[#9a2639]"
              />

            </div>

            <div>

              <h2 className="text-lg font-semibold text-[#171717]">
                Delete QR Code
              </h2>

              <p className="mt-1 text-sm leading-5 text-[#817976]">
                This action cannot be undone.
              </p>

            </div>

          </div>


          <button
            type="button"
            onClick={onClose}
            disabled={isDeleting}
            aria-label="Close"
            className="
              flex
              h-8
              w-8
              shrink-0
              items-center
              justify-center
              rounded-full
              text-[#817976]
              transition
              hover:bg-[#f5eeee]
              hover:text-[#7a0719]
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            <X size={18} />
          </button>

        </div>


        {/* =================================================
            CONTENT
        ================================================== */}

        <div className="px-5 py-6 sm:px-6">

          <div className="rounded-2xl border border-[#f1e4e6] bg-[#fff9fa] p-4">

            <p className="text-sm leading-6 text-[#5f5755]">
              Are you sure you want to delete the QR code for
              <span className="font-semibold text-[#403a38]">
                {" "}
                {wedding?.coupleNames || "this wedding"}
              </span>
              ?
            </p>

          </div>


          <p className="mt-4 text-sm leading-6 text-[#817976]">
            The saved QR image will be removed. Your wedding
            information will remain unchanged.
          </p>

        </div>


        {/* =================================================
            FOOTER
        ================================================== */}

        <div
          className="
            flex
            flex-col-reverse
            gap-2
            border-t
            border-[#eee8e8]
            px-5
            py-4
            sm:flex-row
            sm:justify-end
            sm:gap-3
            sm:px-6
            sm:py-5
          "
        >

          <button
            type="button"
            onClick={onClose}
            disabled={isDeleting}
            className="
              w-full
              rounded-xl
              border
              border-[#e8dfdd]
              px-5
              py-3
              text-sm
              font-semibold
              text-[#625b59]
              transition
              hover:border-[#7a0719]
              hover:text-[#7a0719]
              disabled:cursor-not-allowed
              disabled:opacity-50
              sm:w-auto
            "
          >
            Cancel
          </button>


          <button
            type="button"
            onClick={onConfirm}
            disabled={isDeleting}
            className="
              flex
              w-full
              items-center
              justify-center
              gap-2
              rounded-xl
              bg-[#9a2639]
              px-5
              py-3
              text-sm
              font-semibold
              text-white
              transition
              hover:bg-[#7f1e2f]
              disabled:cursor-not-allowed
              disabled:opacity-50
              sm:w-auto
            "
          >

            <Trash2 size={16} />

            {isDeleting
              ? "Deleting..."
              : "Delete QR"}

          </button>

        </div>

      </div>

    </div>
  );
}
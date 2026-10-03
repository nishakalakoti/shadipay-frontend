"use client";

import { X, Trash2, AlertTriangle } from "lucide-react";

export default function DeleteWeddingModal({
  isOpen,
  onClose,
  wedding,
  onDelete,
  isLoading = false,
}) {
  if (!isOpen || !wedding) {
    return null;
  }

  const coupleNames =
    `${wedding.first_partner} & ${wedding.second_partner}`;

  const handleDelete = () => {
    onDelete?.(wedding);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm">

      {/* Modal */}

      <div className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl">

        {/* Header */}

        <div className="flex items-center justify-between border-b border-[#eee8e8] px-5 py-4">

          <h2 className="text-lg font-semibold text-[#171717]">
            Delete Wedding
          </h2>

          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-full
              text-[#817976]
              transition
              hover:bg-[#f5eeee]
              hover:text-[#7a0719]
            "
          >
            <X size={20} />
          </button>

        </div>

        {/* Content */}

        <div className="px-5 py-6">

          {/* Warning Icon */}

          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-50">

            <AlertTriangle
              size={28}
              className="text-red-600"
            />

          </div>

          {/* Message */}

          <div className="mt-5 text-center">

            <h3 className="text-base font-semibold text-[#171717]">
              Delete this wedding?
            </h3>

            <p className="mt-2 text-sm leading-6 text-[#817976]">
              Are you sure you want to delete
              <span className="font-semibold text-[#171717]">
                {" "}{coupleNames}
              </span>
              ?
            </p>

            <p className="mt-2 text-xs leading-5 text-red-500">
              This action cannot be undone.
            </p>

          </div>

        </div>

        {/* Footer */}

        <div className="flex flex-col gap-3 border-t border-[#eee8e8] bg-[#faf8f7] px-5 py-4 sm:flex-row sm:justify-end">

          {/* Cancel */}

          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="
              inline-flex
              items-center
              justify-center
              rounded-xl
              border
              border-[#e8dfdd]
              px-5
              py-2.5
              text-sm
              font-semibold
              text-[#5f5755]
              transition
              hover:border-[#7a0719]
              hover:text-[#7a0719]
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            Cancel
          </button>

          {/* Delete */}

          <button
            type="button"
            onClick={handleDelete}
            disabled={isLoading}
            className="
              inline-flex
              items-center
              justify-center
              gap-2
              rounded-xl
              bg-red-600
              px-5
              py-2.5
              text-sm
              font-semibold
              text-white
              transition
              hover:bg-red-700
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >

            <Trash2 size={16} />

            {isLoading ? "Deleting..." : "Delete Wedding"}

          </button>

        </div>

      </div>

    </div>
  );
}
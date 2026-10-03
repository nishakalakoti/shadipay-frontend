"use client";

import { useState } from "react";

import {
  AlertTriangle,
  Trash2,
  CalendarDays,
  MapPin,
} from "lucide-react";


export default function DangerZone({
  wedding,
  isLoading = false,
  isDeletePending = false,
  isError = false,
  error = null,
  onDelete,
}) {

  const [showConfirm, setShowConfirm] =
    useState(false);


  // =====================================================
  // FORMAT DATE
  // =====================================================

  const formattedDate =
    wedding?.wedding_date
      ? new Date(
          `${wedding.wedding_date}T00:00:00`
        ).toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })
      : "-";


  // =====================================================
  // COUPLE NAME
  // =====================================================

  const coupleNames = wedding
    ? `${wedding.first_partner} & ${wedding.second_partner}`
    : "No wedding found";


  // =====================================================
  // OPEN CONFIRMATION
  // =====================================================

  const handleOpenConfirm = () => {

    if (!wedding) {
      return;
    }

    setShowConfirm(true);

  };


  // =====================================================
  // CLOSE CONFIRMATION
  // =====================================================

  const handleCancel = () => {

    if (isDeletePending) {
      return;
    }

    setShowConfirm(false);

  };


  // =====================================================
  // CONFIRM DELETE
  // =====================================================

  const handleConfirmDelete = () => {

    if (!wedding?.id) {
      return;
    }

    onDelete?.(wedding);

  };


  return (
    <section className="overflow-hidden rounded-[22px] border border-[#f0d5d7] bg-white">


      {/* =================================================
          DANGER HEADER
      ================================================== */}

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


      {/* =================================================
          CONTENT
      ================================================== */}

      <div className="p-6">


        {/* =================================================
            WEDDING INFO
        ================================================== */}

        {isLoading ? (

          <div className="rounded-xl bg-[#faf8f7] p-4">

            <p className="text-sm text-[#817976]">
              Loading wedding...
            </p>

          </div>

        ) : isError ? (

          <div className="rounded-xl bg-red-50 p-4">

            <p className="text-sm text-red-600">
              {error?.message ||
                "Failed to load wedding."}
            </p>

          </div>

        ) : wedding ? (

          <div className="mb-5 rounded-xl border border-[#eee8e8] bg-[#faf8f7] p-4">

            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-[#9b2635]">
              Wedding to be deleted
            </p>


            {/* COUPLE */}

            <p className="text-lg font-semibold text-[#171717]">
              {coupleNames}
            </p>


            {/* DATE + VENUE */}

            <div className="mt-3 flex flex-col gap-2 text-xs text-[#817976] sm:flex-row sm:flex-wrap sm:gap-5">

              <div className="flex items-center gap-2">

                <CalendarDays size={14} />

                <span>
                  {formattedDate}
                </span>

              </div>


              <div className="flex items-center gap-2">

                <MapPin size={14} />

                <span>
                  {wedding.wedding_venue || "-"}
                </span>

              </div>

            </div>

          </div>

        ) : (

          <div className="mb-5 rounded-xl bg-[#faf8f7] p-4">

            <p className="text-sm text-[#817976]">
              No wedding found.
            </p>

          </div>

        )}


        {/* =================================================
            DELETE ROW
        ================================================== */}

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          <div>

            <p className="text-sm font-semibold text-[#403a38]">
              Delete Wedding
            </p>

            <p className="mt-1 max-w-xl text-xs leading-5 text-[#817976]">
              Permanently delete this wedding registry
              and associated wedding data.
            </p>

          </div>


          {/* DELETE BUTTON */}

          <button
            type="button"
            onClick={handleOpenConfirm}
            disabled={
              !wedding ||
              isLoading ||
              isDeletePending
            }
            className="
              flex
              w-fit
              items-center
              gap-2
              rounded-xl
              border
              border-[#e5bfc2]
              px-4
              py-2.5
              text-sm
              font-semibold
              text-[#9b2635]
              hover:bg-[#fff4f4]
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >

            <Trash2 size={15} />

            Delete Wedding

          </button>

        </div>


        {/* =================================================
            CONFIRM DELETE
        ================================================== */}

        {showConfirm && wedding && (

          <div className="mt-5 rounded-xl bg-[#fff4f4] p-5">

            <p className="text-sm font-semibold text-[#9b2635]">
              Are you sure you want to delete this wedding?
            </p>


            {/* WEDDING NAME */}

            <div className="mt-3 rounded-lg border border-[#f0d5d7] bg-white p-3">

              <p className="text-sm font-semibold text-[#171717]">
                {coupleNames}
              </p>

              <p className="mt-1 text-xs text-[#817976]">
                {formattedDate}
                {" • "}
                {wedding.wedding_venue || "-"}
              </p>

            </div>


            <p className="mt-3 text-xs leading-5 text-[#9b6b70]">
              This action cannot be undone. The wedding
              and its associated data will be permanently
              deleted.
            </p>


            {/* BUTTONS */}

            <div className="mt-4 flex flex-col gap-2 sm:flex-row">

              {/* CANCEL */}

              <button
                type="button"
                onClick={handleCancel}
                disabled={isDeletePending}
                className="
                  rounded-lg
                  border
                  border-[#e5bfc2]
                  bg-white
                  px-4
                  py-2
                  text-xs
                  font-semibold
                  text-[#625b59]
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                "
              >
                Cancel
              </button>


              {/* CONFIRM DELETE */}

              <button
                type="button"
                onClick={handleConfirmDelete}
                disabled={isDeletePending}
                className="
                  rounded-lg
                  bg-[#9b2635]
                  px-4
                  py-2
                  text-xs
                  font-semibold
                  text-white
                  hover:bg-[#7f1e2b]
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                "
              >

                {isDeletePending
                  ? "Deleting..."
                  : "Confirm Delete"}

              </button>

            </div>

          </div>

        )}

      </div>

    </section>
  );
}
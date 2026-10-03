import Link from "next/link";

import {
  CalendarDays,
  MapPin,
  Users,
  Gift,
  CreditCard,
  QrCode,
  Pencil,
  Trash2,
} from "lucide-react";

export default function WeddingOverview({
  wedding,
  overview,
  isOverviewLoading,
  isOverviewError,
  overviewError,
  onEdit,
  onDelete,
}) {
  if (!wedding) {
    return null;
  }

  // =====================================================
  // BACKEND DATA
  // =====================================================

  const coupleNames =
    `${wedding.first_partner} & ${wedding.second_partner}`;

  const formattedDate = wedding.wedding_date
    ? new Date(
        `${wedding.wedding_date}T00:00:00`
      ).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "-";

  const registryUrl =
    `shadipay.com/r/${wedding.id}`;

  // =====================================================
  // WEDDING OVERVIEW DATA
  // =====================================================

  const totalGuests =
    overview?.total_guests ?? 0;

  const totalGifts =
    overview?.total_gifts ?? 0;

  const onlinePayments =
    overview?.online_payments ?? 0;

  return (
    <div className="space-y-5 sm:space-y-6">

      {/* =====================================================
          MAIN WEDDING CARD
      ====================================================== */}

      <section className="overflow-hidden rounded-[22px] border border-[#eee8e8] bg-white shadow-[0_2px_12px_rgba(60,30,30,0.03)] sm:rounded-[24px]">

        {/* Cover */}

        <div className="relative min-h-[170px] overflow-hidden bg-gradient-to-r from-[#f5e9e7] via-[#ead8d5] to-[#f7eeee] sm:h-[190px] sm:min-h-0">

          {/* Decorative background */}

          <div className="absolute -right-10 -top-20 h-56 w-56 rounded-full bg-white/30 blur-2xl" />

          <div className="absolute -bottom-24 left-[35%] h-48 w-96 rounded-full bg-[#d8bfc0]/30 blur-2xl" />

          {/* Status */}

          <div className="absolute left-4 top-4 sm:left-6 sm:top-6">

            <span className="inline-flex items-center gap-2 rounded-full bg-[#f3dfe2] px-3 py-1.5 text-[9px] font-semibold uppercase tracking-wide text-[#7a0719] sm:text-[10px]">

              <span className="h-2 w-2 rounded-full bg-[#7a0719]" />

              Active Wedding

            </span>

          </div>

          {/* View QR */}

          <div className="absolute bottom-4 left-4 right-4 sm:bottom-auto sm:left-auto sm:right-6 sm:top-6">

            <Link
              href="/qr"
              className="
                inline-flex
                h-10
                w-full
                items-center
                justify-center
                gap-2
                rounded-xl
                bg-white
                px-4
                text-xs
                font-semibold
                text-[#5f5755]
                shadow-sm
                transition
                hover:text-[#7a0719]
                sm:w-auto
                sm:py-2.5
              "
            >
              <QrCode size={16} />

              <span>View QR</span>
            </Link>

          </div>

        </div>

        {/* =====================================================
            WEDDING DETAILS
        ====================================================== */}

        <div className="p-5 sm:p-7">

          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between lg:gap-6">

            <div className="min-w-0">

              {/* Couple Names */}

              <h1 className="font-serif text-[30px] font-semibold leading-tight tracking-[-0.8px] text-[#171717] sm:text-[38px] sm:tracking-[-1px]">
                {coupleNames}
              </h1>

              {/* Date + Venue */}

              <div className="mt-4 flex flex-col gap-3 text-sm text-[#817976] sm:flex-row sm:flex-wrap sm:items-center sm:gap-5">

                <div className="flex min-w-0 items-center gap-2">

                  <CalendarDays
                    size={16}
                    className="shrink-0"
                  />

                  <span>
                    {formattedDate}
                  </span>

                </div>

                <div className="flex min-w-0 items-start gap-2">

                  <MapPin
                    size={16}
                    className="mt-0.5 shrink-0"
                  />

                  <span className="break-words">
                    {wedding.wedding_venue || "-"}
                  </span>

                </div>

              </div>

            </div>

            {/* =====================================================
                EDIT + DELETE WEDDING
            ====================================================== */}

            <div className="flex w-full flex-col gap-3 sm:w-fit sm:flex-row">

              {/* Edit Wedding */}

              <button
                type="button"
                onClick={onEdit}
                className="
                  inline-flex
                  w-full
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  border
                  border-[#e8dfdd]
                  px-4
                  py-2.5
                  text-sm
                  font-semibold
                  text-[#5f5755]
                  transition
                  hover:border-[#7a0719]
                  hover:text-[#7a0719]
                  sm:w-fit
                "
              >
                <Pencil size={16} />

                Edit Wedding
              </button>

              {/* Delete Wedding */}

              <button
                type="button"
                onClick={onDelete}
                className="
                  inline-flex
                  w-full
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  border
                  border-red-200
                  px-4
                  py-2.5
                  text-sm
                  font-semibold
                  text-red-600
                  transition
                  hover:border-red-600
                  hover:bg-red-50
                  hover:text-red-700
                  sm:w-fit
                "
              >
                <Trash2 size={16} />

                Delete Wedding
              </button>

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          WEDDING STATS
      ====================================================== */}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">

        {/* Guests */}

        <Stat
          icon={Users}
          label="Total Guests"
          value={
            isOverviewLoading
              ? "..."
              : isOverviewError
                ? "-"
                : totalGuests
          }
        />

        {/* Gifts */}

        <Stat
          icon={Gift}
          label="Total Gifts"
          value={
            isOverviewLoading
              ? "..."
              : isOverviewError
                ? "-"
                : `₹${totalGifts}`
          }
        />

        {/* Payments */}

        <Stat
          icon={CreditCard}
          label="Online Payments"
          value={
            isOverviewLoading
              ? "..."
              : isOverviewError
                ? "-"
                : `₹${onlinePayments}`
          }
        />

      </div>

      {/* =====================================================
          OVERVIEW ERROR
      ====================================================== */}

      {isOverviewError && (
        <p className="text-sm text-red-600">
          {overviewError?.message ||
            "Failed to load wedding overview."}
        </p>
      )}

      {/* =====================================================
          REGISTRY LINK
      ====================================================== */}

      <section className="rounded-[20px] border border-[#eee8e8] bg-white p-5 shadow-[0_2px_12px_rgba(60,30,30,0.03)] sm:rounded-[22px] sm:p-6">

        <h2 className="text-lg font-semibold text-[#171717]">
          Wedding Registry
        </h2>

        <p className="mt-1 text-sm leading-6 text-[#817976]">
          Share this link with your guests to receive gifts and payments.
        </p>

        <div className="mt-5 flex flex-col gap-3 sm:flex-row">

          {/* Registry URL */}

          <div className="min-w-0 flex-1 overflow-hidden rounded-xl border border-[#eee8e8] bg-[#faf8f7] px-4 py-3 text-sm text-[#625b59]">

            <p className="truncate">
              {registryUrl}
            </p>

          </div>

          {/* Copy Link */}

          <button
            type="button"
            className="
              inline-flex
              items-center
              justify-center
              rounded-xl
              bg-[#7a0719]
              px-5
              py-3
              text-sm
              font-semibold
              text-white
              transition
              hover:bg-[#650515]
              sm:shrink-0
            "
          >
            Copy Link
          </button>

        </div>

      </section>

    </div>
  );
}


/* =========================================================
   REUSABLE STAT COMPONENT
========================================================= */

function Stat({
  icon: Icon,
  label,
  value,
}) {
  return (
    <div className="rounded-[20px] border border-[#eee8e8] bg-white p-5 shadow-[0_2px_12px_rgba(60,30,30,0.03)]">

      <div className="flex items-center gap-3">

        {/* Icon */}

        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f5eeee]">

          <Icon
            size={17}
            className="text-[#7a0719]"
          />

        </div>

        {/* Label */}

        <p className="text-sm text-[#817976]">
          {label}
        </p>

      </div>

      {/* Value */}

      <p className="mt-4 font-serif text-2xl font-semibold text-[#171717]">
        {value}
      </p>

    </div>
  );
}
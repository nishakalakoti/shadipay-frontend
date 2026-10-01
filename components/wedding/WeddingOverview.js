import {
  CalendarDays,
  MapPin,
  Users,
  Gift,
  CreditCard,
  QrCode,
  Share2,
  Pencil,
} from "lucide-react";


export default function WeddingOverview({
  wedding,
  overview,
  isOverviewLoading,
  isOverviewError,
  overviewError,
  onEdit,
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
    <div className="space-y-6">

      {/* =====================================================
          MAIN WEDDING CARD
      ====================================================== */}

      <section className="overflow-hidden rounded-[24px] border border-[#eee8e8] bg-white shadow-[0_2px_12px_rgba(60,30,30,0.03)]">

        {/* Cover */}

        <div className="relative h-[190px] overflow-hidden bg-gradient-to-r from-[#f5e9e7] via-[#ead8d5] to-[#f7eeee]">

          <div className="absolute -right-10 -top-20 h-56 w-56 rounded-full bg-white/30 blur-2xl" />

          <div className="absolute -bottom-24 left-[35%] h-48 w-96 rounded-full bg-[#d8bfc0]/30 blur-2xl" />


          {/* Status */}

          <div className="absolute left-6 top-6">

            <span className="inline-flex items-center gap-2 rounded-full bg-[#f3dfe2] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wide text-[#7a0719]">

              <span className="h-2 w-2 rounded-full bg-[#7a0719]" />

              Active Wedding

            </span>

          </div>


          {/* Actions */}

          <div className="absolute right-6 top-6 flex gap-2">

            {/* View QR */}

            <button
              type="button"
              className="flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-xs font-semibold text-[#5f5755] shadow-sm transition hover:text-[#7a0719]"
            >

              <QrCode size={16} />

              View QR

            </button>


            {/* Share Registry */}

            <button
              type="button"
              className="flex items-center gap-2 rounded-xl bg-[#7a0719] px-4 py-2.5 text-xs font-semibold text-white shadow-sm transition hover:bg-[#650515]"
            >

              <Share2 size={16} />

              Share Registry

            </button>

          </div>

        </div>


        {/* =====================================================
            WEDDING DETAILS
        ====================================================== */}

        <div className="p-7">

          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">

            <div>

              {/* Couple Names */}

              <h1 className="font-serif text-[38px] font-semibold tracking-[-1px] text-[#171717]">
                {coupleNames}
              </h1>


              {/* Date + Venue */}

              <div className="mt-4 flex flex-wrap gap-5 text-sm text-[#817976]">

                <div className="flex items-center gap-2">

                  <CalendarDays size={16} />

                  <span>
                    {formattedDate}
                  </span>

                </div>


                <div className="flex items-center gap-2">

                  <MapPin size={16} />

                  <span>
                    {wedding.wedding_venue}
                  </span>

                </div>

              </div>

            </div>


            {/* Edit Wedding */}

            <button
              type="button"
              onClick={onEdit}
              className="flex items-center gap-2 rounded-xl border border-[#e8dfdd] px-4 py-2.5 text-sm font-semibold text-[#5f5755] transition hover:border-[#7a0719] hover:text-[#7a0719]"
            >

              <Pencil size={16} />

              Edit Wedding

            </button>

          </div>

        </div>

      </section>


      {/* =====================================================
          WEDDING STATS
      ====================================================== */}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

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

      <section className="rounded-[22px] border border-[#eee8e8] bg-white p-6 shadow-[0_2px_12px_rgba(60,30,30,0.03)]">

        <h2 className="text-lg font-semibold text-[#171717]">
          Wedding Registry
        </h2>

        <p className="mt-1 text-sm text-[#817976]">
          Share this link with your guests to receive gifts and payments.
        </p>


        <div className="mt-5 flex flex-col gap-3 sm:flex-row">

          {/* Registry URL */}

          <div className="flex-1 rounded-xl border border-[#eee8e8] bg-[#faf8f7] px-4 py-3 text-sm text-[#625b59]">

            {registryUrl}

          </div>


          {/* Copy Link */}

          <button
            type="button"
            className="rounded-xl bg-[#7a0719] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#650515]"
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

        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f5eeee]">

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
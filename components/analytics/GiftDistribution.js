import {
  CreditCard,
  Package,
} from "lucide-react";

export default function GiftDistribution({ data }) {

  const online = Number(data?.online) || 0;
  const physical = Number(data?.physical) || 0;

  return (
    <section className="rounded-[22px] border border-[#eee8e8] bg-white p-6 shadow-[0_2px_12px_rgba(60,30,30,0.03)]">

      {/* Header */}
      <div>
        <h2 className="text-lg font-semibold text-[#171717]">
          Gift Distribution
        </h2>

        <p className="mt-1 text-sm text-[#817976]">
          Online vs physical gifts.
        </p>
      </div>


      {/* =================================================
          DONUT CHART
      ================================================== */}

      <div className="mx-auto mt-8 flex h-52 w-52 items-center justify-center">

        <div
          className="flex h-52 w-52 items-center justify-center rounded-full"
          style={{
            background: `conic-gradient(
              #7a0719 0% ${online}%,
              #d5ad63 ${online}% 100%
            )`,
          }}
        >

          {/* Inner Circle */}
          <div className="flex h-32 w-32 flex-col items-center justify-center rounded-full bg-white">

            <p className="font-serif text-3xl font-semibold text-[#171717]">
              {online}%
            </p>

            <p className="text-xs text-[#817976]">
              Online
            </p>

          </div>

        </div>

      </div>


      {/* =================================================
          LEGEND
      ================================================== */}

      <div className="mt-8 space-y-4">

        {/* Online Gifts */}
        <div className="flex items-center justify-between">

          <div className="flex items-center gap-3">

            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f5eeee]">

              <CreditCard
                size={16}
                className="text-[#7a0719]"
              />

            </div>

            <div className="flex items-center gap-2">

              <span className="h-2.5 w-2.5 rounded-full bg-[#7a0719]" />

              <span className="text-sm text-[#625b59]">
                Online Gifts
              </span>

            </div>

          </div>

          <span className="text-sm font-semibold text-[#302b29]">
            {online}%
          </span>

        </div>


        {/* Physical Gifts */}
        <div className="flex items-center justify-between">

          <div className="flex items-center gap-3">

            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f7edd9]">

              <Package
                size={16}
                className="text-[#a26d13]"
              />

            </div>

            <div className="flex items-center gap-2">

              <span className="h-2.5 w-2.5 rounded-full bg-[#d5ad63]" />

              <span className="text-sm text-[#625b59]">
                Physical Gifts
              </span>

            </div>

          </div>

          <span className="text-sm font-semibold text-[#302b29]">
            {physical}%
          </span>

        </div>

      </div>

    </section>
  );
}
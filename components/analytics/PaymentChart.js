import { TrendingUp } from "lucide-react";

export default function PaymentChart({ data }) {
  const maxAmount = Math.max(
    ...data.map((item) => item.amount)
  );

  const total = data.reduce(
    (sum, item) => sum + item.amount,
    0
  );

  return (
    <section className="rounded-[22px] border border-[#eee8e8] bg-white p-6 shadow-[0_2px_12px_rgba(60,30,30,0.03)]">

      {/* Header */}
      <div className="flex items-start justify-between">

        <div>
          <h2 className="text-lg font-semibold text-[#171717]">
            Payment Overview
          </h2>

          <p className="mt-1 text-sm text-[#817976]">
            Payment activity over the selected period.
          </p>
        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f5eeee]">
          <TrendingUp
            size={18}
            className="text-[#7a0719]"
          />
        </div>

      </div>

      {/* Total */}
      <div className="mt-6">

        <p className="text-xs text-[#a29a98]">
          Total Received
        </p>

        <p className="mt-1 font-serif text-3xl font-semibold text-[#171717]">
          ₹{total.toLocaleString("en-IN")}
        </p>

      </div>

      {/* Chart */}
      <div className="mt-8 flex h-64 items-end gap-3 border-b border-[#eee8e8] px-2">

        {data.map((item) => {

          const height =
            (item.amount / maxAmount) * 100;

          return (
            <div
              key={item.day}
              className="flex h-full flex-1 flex-col items-center justify-end gap-2"
            >

              <div className="text-[10px] font-medium text-[#817976]">
                ₹{(item.amount / 1000).toFixed(1)}k
              </div>

              <div
                className="w-full max-w-[42px] rounded-t-lg bg-[#7a0719] transition-all hover:bg-[#650515]"
                style={{
                  height: `${height}%`,
                }}
              />

              <span className="mb-[-22px] text-xs text-[#817976]">
                {item.day}
              </span>

            </div>
          );
        })}

      </div>

    </section>
  );
}
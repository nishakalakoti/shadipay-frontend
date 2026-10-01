import {
  Users,
  CheckCircle2,
  Clock3,
  XCircle,
} from "lucide-react";

export default function GuestAnalytics({ data }) {
  const attendingPercentage =
    Math.round((data.attending / data.total) * 100);

  const pendingPercentage =
    Math.round((data.pending / data.total) * 100);

  const declinedPercentage =
    Math.round((data.declined / data.total) * 100);

  const guestStats = [
    {
      label: "Attending",
      value: data.attending,
      percentage: attendingPercentage,
      icon: CheckCircle2,
      className: "text-[#237342] bg-[#eaf6ee]",
    },
    {
      label: "Pending",
      value: data.pending,
      percentage: pendingPercentage,
      icon: Clock3,
      className: "text-[#a26d13] bg-[#fff5df]",
    },
    {
      label: "Declined",
      value: data.declined,
      percentage: declinedPercentage,
      icon: XCircle,
      className: "text-[#9b2635] bg-[#f9e8e9]",
    },
  ];

  return (
    <section className="rounded-[22px] border border-[#eee8e8] bg-white p-6 shadow-[0_2px_12px_rgba(60,30,30,0.03)]">

      {/* Header */}
      <div className="flex items-start justify-between">

        <div>
          <h2 className="text-lg font-semibold text-[#171717]">
            Guest Activity
          </h2>

          <p className="mt-1 text-sm text-[#817976]">
            Overview of your wedding guest responses.
          </p>
        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f5eeee]">
          <Users
            size={18}
            className="text-[#7a0719]"
          />
        </div>

      </div>

      {/* Total */}
      <div className="mt-6">

        <p className="text-xs text-[#a29a98]">
          Total Guests
        </p>

        <p className="mt-1 font-serif text-3xl font-semibold text-[#171717]">
          {data.total}
        </p>

      </div>

      {/* Guest Stats */}
      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">

        {guestStats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.label}
              className="rounded-2xl bg-[#faf8f7] p-5"
            >

              <div className="flex items-center justify-between">

                <div
                  className={`flex h-9 w-9 items-center justify-center rounded-full ${stat.className}`}
                >
                  <Icon size={16} />
                </div>

                <span className="text-xs font-semibold text-[#817976]">
                  {stat.percentage}%
                </span>

              </div>

              <p className="mt-4 text-sm text-[#817976]">
                {stat.label}
              </p>

              <p className="mt-1 font-serif text-2xl font-semibold text-[#171717]">
                {stat.value}
              </p>

            </div>
          );
        })}

      </div>

    </section>
  );
}
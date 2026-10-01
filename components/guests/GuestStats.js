import {
  Users,
  UserCheck,
  Clock3,
  UserX,
} from "lucide-react";

export default function GuestStats({ guests = [] }) {
  const total = guests.length;

  const attending = guests.filter(
    (guest) =>
      guest.rsvp === "Attending" ||
      guest.rsvp_status === "Attending"
  ).length;

  const pending = guests.filter(
    (guest) =>
      guest.rsvp === "Pending" ||
      guest.rsvp_status === "Pending"
  ).length;

  const declined = guests.filter(
    (guest) =>
      guest.rsvp === "Declined" ||
      guest.rsvp_status === "Declined"
  ).length;

  const stats = [
    {
      label: "Total Guests",
      value: total,
      icon: Users,
    },
    {
      label: "Attending",
      value: attending,
      icon: UserCheck,
    },
    {
      label: "Pending RSVP",
      value: pending,
      icon: Clock3,
    },
    {
      label: "Declined",
      value: declined,
      icon: UserX,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.label}
            className="rounded-[20px] border border-[#eee8e8] bg-white p-5 shadow-[0_2px_12px_rgba(60,30,30,0.03)]"
          >

            <div className="flex items-center justify-between">

              <p className="text-sm text-[#817976]">
                {stat.label}
              </p>

              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f5eeee]">
                <Icon
                  size={18}
                  className="text-[#7a0719]"
                />
              </div>

            </div>

            <p className="mt-4 font-serif text-3xl font-semibold text-[#171717]">
              {stat.value}
            </p>

          </div>
        );
      })}

    </div>
  );
}
import {
  Heart,
  ShieldCheck,
  Smartphone,
  Gift,
} from "lucide-react";

export default function QRInfo({ wedding }) {
  const items = [
    {
      icon: Smartphone,
      title: "Easy to Scan",
      description:
        "Guests can scan the QR code directly from their phone.",
    },
    {
      icon: Gift,
      title: "Send Gifts",
      description:
        "Guests can send monetary gifts through your wedding registry.",
    },
    {
      icon: ShieldCheck,
      title: "Secure Payments",
      description:
        "Payments will be recorded securely in your wedding account.",
    },
    {
      icon: Heart,
      title: "Wedding Registry",
      description:
        "All gifts and payments stay connected to your wedding.",
    },
  ];

  return (
    <div className="space-y-5">

      {/* Wedding Info */}
      <section className="rounded-[22px] border border-[#eee8e8] bg-white p-6">

        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#a29a98]">
          Wedding
        </p>

        <h2 className="mt-2 font-serif text-2xl font-semibold text-[#171717]">
          {wedding.coupleNames}
        </h2>

        <div className="mt-4 space-y-2 text-sm text-[#817976]">

          <p>
            <span className="font-medium text-[#403a38]">
              Date:
            </span>{" "}
            {wedding.date}
          </p>

          <p>
            <span className="font-medium text-[#403a38]">
              Venue:
            </span>{" "}
            {wedding.venue}
          </p>

        </div>

      </section>

      {/* How it works */}
      <section className="rounded-[22px] border border-[#eee8e8] bg-white p-6">

        <h2 className="text-lg font-semibold text-[#171717]">
          How it works
        </h2>

        <div className="mt-5 space-y-5">

          {items.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="flex gap-3"
              >

                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#f5eeee]">
                  <Icon
                    size={16}
                    className="text-[#7a0719]"
                  />
                </div>

                <div>

                  <p className="text-sm font-semibold text-[#403a38]">
                    {item.title}
                  </p>

                  <p className="mt-1 text-xs leading-5 text-[#817976]">
                    {item.description}
                  </p>

                </div>

              </div>
            );
          })}

        </div>

      </section>

    </div>
  );
}
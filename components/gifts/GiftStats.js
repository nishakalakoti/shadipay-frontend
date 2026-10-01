import {
  Gift,
  CreditCard,
  Package,
  Receipt,
} from "lucide-react";

export default function GiftStats({
  gifts = [],
}) {
  // =====================================================
  // TOTAL GIFT AMOUNT
  // =====================================================

  const totalAmount = gifts.reduce(
    (sum, gift) =>
      sum + Number(gift.amount || 0),
    0
  );


  // =====================================================
  // ONLINE GIFT AMOUNT
  // =====================================================

  const onlineAmount = gifts
    .filter(
      (gift) =>
        String(gift.gift_type || "").toLowerCase() ===
        "online"
    )
    .reduce(
      (sum, gift) =>
        sum + Number(gift.amount || 0),
      0
    );


  // =====================================================
  // PHYSICAL GIFT COUNT
  // =====================================================

  const physicalCount = gifts.filter(
    (gift) =>
      String(gift.gift_type || "").toLowerCase() ===
      "physical"
  ).length;


  // =====================================================
  // ONLINE TRANSACTIONS COUNT
  // =====================================================

  const onlineCount = gifts.filter(
    (gift) =>
      String(gift.gift_type || "").toLowerCase() ===
      "online"
  ).length;


  const stats = [
    {
      label: "Total Gifts",
      value: `₹${totalAmount.toLocaleString("en-IN")}`,
      icon: Gift,
    },

    {
      label: "Online Gifts",
      value: `₹${onlineAmount.toLocaleString("en-IN")}`,
      icon: CreditCard,
    },

    {
      label: "Physical Gifts",
      value: physicalCount,
      icon: Package,
    },

    {
      label: "Transactions",
      value: onlineCount,
      icon: Receipt,
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
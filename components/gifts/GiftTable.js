"use client";

import { useState } from "react";
import {
  Gift,
  CreditCard,
  Package,
  MoreVertical,
  Pencil,
  Trash2,
} from "lucide-react";


export default function GiftTable({
  gifts = [],
  onEditGift,
  onDeleteGift,
}) {
  const [openActionId, setOpenActionId] = useState(null);


  return (
    <div className="overflow-hidden rounded-[22px] border border-[#eee8e8] bg-white shadow-[0_2px_12px_rgba(60,30,30,0.03)]">

      {/* Header */}

      <div className="border-b border-[#eee8e8] px-6 py-5">

        <div className="flex items-center justify-between">

          <div>

            <h2 className="text-lg font-semibold text-[#171717]">
              Gift Registry
            </h2>

            <p className="mt-1 text-sm text-[#817976]">
              All gifts received for your wedding.
            </p>

          </div>

          <span className="text-sm text-[#817976]">
            {gifts.length} records
          </span>

        </div>

      </div>


      {/* Table */}

      <div className="overflow-x-auto">

        <table className="w-full min-w-[800px]">

          <thead>

            <tr className="border-b border-[#eee8e8] bg-[#faf8f7]">

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-[#8d8582]">
                Guest
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-[#8d8582]">
                Gift
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-[#8d8582]">
                Type
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-[#8d8582]">
                Amount
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-[#8d8582]">
                Date
              </th>

              <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wide text-[#8d8582]">
                Action
              </th>

            </tr>

          </thead>


          <tbody>

            {gifts.map((gift) => {

              const isActionOpen =
                openActionId === gift.id;

              return (

                <tr
                  key={gift.id}
                  className="border-b border-[#f0ebea] last:border-b-0 hover:bg-[#fffafa]"
                >

                  {/* Guest */}

                  <td className="px-6 py-5">

                    <div className="flex items-center gap-3">

                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f5eeee]">

                        <Gift
                          size={17}
                          className="text-[#7a0719]"
                        />

                      </div>

                      <span className="text-sm font-semibold text-[#302b29]">
                        {gift.guest_name || "Unknown Guest"}
                      </span>

                    </div>

                  </td>


                  {/* Gift */}

                  <td className="px-6 py-5 text-sm text-[#625b59]">
                    {gift.gift || "—"}
                  </td>


                  {/* Type */}

                  <td className="px-6 py-5">

                    <TypeBadge
                      type={gift.gift_type}
                    />

                  </td>


                  {/* Amount */}

                  <td className="px-6 py-5">

                    {Number(gift.amount || 0) > 0 ? (

                      <span className="text-sm font-semibold text-[#302b29]">

                        ₹
                        {Number(
                          gift.amount
                        ).toLocaleString("en-IN")}

                      </span>

                    ) : (

                      <span className="text-sm text-[#aaa19e]">
                        —
                      </span>

                    )}

                  </td>


                  {/* Date */}

                  <td className="px-6 py-5 text-sm text-[#817976]">
                    {formatGiftDate(
                      gift.gift_date
                    )}
                  </td>


                  {/* Action */}

                  <td className="relative px-6 py-5 text-right">

                    <button
                      type="button"
                      onClick={() =>
                        setOpenActionId(
                          isActionOpen
                            ? null
                            : gift.id
                        )
                      }
                      className="rounded-lg p-2 text-[#817976] transition hover:bg-[#f5eeee] hover:text-[#7a0719]"
                    >
                      <MoreVertical size={18} />
                    </button>


                    {/* Action Menu */}

                    {isActionOpen && (

                      <div className="absolute right-6 top-[58px] z-20 w-[170px] overflow-hidden rounded-xl border border-[#eee8e8] bg-white p-1.5 text-left shadow-[0_8px_30px_rgba(60,30,30,0.12)]">

                        {/* Edit Gift */}

                        <button
                          type="button"
                          onClick={() => {

                            setOpenActionId(null);

                            if (onEditGift) {
                              onEditGift(gift);
                            }

                          }}
                          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-[#4f4947] transition hover:bg-[#f8f2f1] hover:text-[#7a0719]"
                        >

                          <Pencil size={15} />

                          Edit Gift

                        </button>


                        {/* Delete Gift */}

                        <button
                          type="button"
                          onClick={() => {

                            setOpenActionId(null);

                            if (onDeleteGift) {
                              onDeleteGift(gift);
                            }

                          }}
                          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-[#b42318] transition hover:bg-[#fdf0ef]"
                        >

                          <Trash2 size={15} />

                          Delete Gift

                        </button>

                      </div>

                    )}

                  </td>

                </tr>

              );

            })}

          </tbody>

        </table>

      </div>


      {/* Empty */}

      {gifts.length === 0 && (

        <div className="px-6 py-16 text-center">

          <p className="text-sm font-semibold text-[#302b29]">
            No gifts found
          </p>

          <p className="mt-1 text-sm text-[#817976]">
            Try changing your search or filter.
          </p>

        </div>

      )}

    </div>
  );
}


/* =========================================================
   TYPE BADGE
========================================================= */

function TypeBadge({
  type,
}) {
  const isOnline =
    String(type || "").toLowerCase() ===
    "online";

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold ${
        isOnline
          ? "bg-[#f9e5e8] text-[#7a0719]"
          : "bg-[#f7edd9] text-[#9a6814]"
      }`}
    >

      {isOnline ? (
        <CreditCard size={13} />
      ) : (
        <Package size={13} />
      )}

      {type || "Physical"}

    </span>
  );
}


/* =========================================================
   DATE FORMAT
========================================================= */

function formatGiftDate(dateValue) {

  if (!dateValue) {
    return "—";
  }

  const date = new Date(
    `${dateValue}T00:00:00`
  );

  if (Number.isNaN(date.getTime())) {
    return "—";
  }

  const today = new Date();

  const todayDate = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );

  const giftDate = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate()
  );

  const differenceInDays =
    Math.round(
      (todayDate - giftDate) /
        (1000 * 60 * 60 * 24)
    );

  if (differenceInDays === 0) {
    return "Today";
  }

  if (differenceInDays === 1) {
    return "Yesterday";
  }

  if (
    differenceInDays > 1 &&
    differenceInDays < 7
  ) {
    return `${differenceInDays} days ago`;
  }

  return date.toLocaleDateString(
    "en-IN",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  );
}
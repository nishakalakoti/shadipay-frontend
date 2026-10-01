"use client";

import { useState } from "react";
import {
  MoreVertical,
  Phone,
  Mail,
  Pencil,
  Trash2,
} from "lucide-react";

export default function GuestTable({
  guests = [],
  onEditGuest,
  onDeleteGuest,
}) {
  const [openActionId, setOpenActionId] = useState(null);

  return (
    <div className="overflow-hidden rounded-[22px] border border-[#eee8e8] bg-white shadow-[0_2px_12px_rgba(60,30,30,0.03)]">

      {/* Header */}
      <div className="border-b border-[#eee8e8] px-6 py-5">
        <div className="flex items-center justify-between">

          <div>
            <h2 className="text-lg font-semibold text-[#171717]">
              Guest List
            </h2>

            <p className="mt-1 text-sm text-[#817976]">
              Your wedding guests and RSVP status.
            </p>
          </div>

          <p className="text-sm text-[#817976]">
            {guests.length} guests
          </p>

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
                Contact
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-[#8d8582]">
                Relation
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-[#8d8582]">
                RSVP
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-[#8d8582]">
                Gift
              </th>

              <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wide text-[#8d8582]">
                Action
              </th>

            </tr>
          </thead>

          <tbody>

            {guests.map((guest) => {

              const guestName =
                guest.name ||
                guest.guest_name ||
                "";

              const rsvpStatus =
                guest.rsvp ||
                guest.rsvp_status ||
                "Pending";

              const giftAmount =
                guest.gift_amount ??
                guest.gift ??
                0;

              const isActionOpen =
                openActionId === guest.id;

              return (
                <tr
                  key={guest.id}
                  className="border-b border-[#f0ebea] last:border-b-0 hover:bg-[#fffafa]"
                >

                  {/* Guest */}
                  <td className="px-6 py-5">

                    <div className="flex items-center gap-3">

                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f5eeee] text-sm font-semibold text-[#7a0719]">

                        {guestName
                          ? guestName
                              .charAt(0)
                              .toUpperCase()
                          : "G"}

                      </div>

                      <div>

                        <p className="text-sm font-semibold text-[#302b29]">
                          {guestName || "Unknown Guest"}
                        </p>

                      </div>

                    </div>

                  </td>


                  {/* Contact */}
                  <td className="px-6 py-5">

                    <div className="space-y-1">

                      <div className="flex items-center gap-2 text-xs text-[#817976]">

                        <Phone size={13} />

                        {guest.phone || "—"}

                      </div>

                      <div className="flex items-center gap-2 text-xs text-[#817976]">

                        <Mail size={13} />

                        {guest.email || "—"}

                      </div>

                    </div>

                  </td>


                  {/* Relation */}
                  <td className="px-6 py-5 text-sm text-[#625b59]">
                    {guest.relation || "—"}
                  </td>


                  {/* RSVP */}
                  <td className="px-6 py-5">

                    <RSVPBadge
                      status={rsvpStatus}
                    />

                  </td>


                  {/* Gift */}
                  <td className="px-6 py-5 text-sm font-semibold text-[#302b29]">
                    {formatGift(giftAmount)}
                  </td>


                  {/* Action */}
                  <td className="relative px-6 py-5 text-right">

                    <button
                      type="button"
                      onClick={() =>
                        setOpenActionId(
                          isActionOpen
                            ? null
                            : guest.id
                        )
                      }
                      className="rounded-lg p-2 text-[#817976] transition hover:bg-[#f5eeee] hover:text-[#7a0719]"
                    >
                      <MoreVertical size={18} />
                    </button>


                    {/* Action Menu */}

                    {isActionOpen && (
                      <div className="absolute right-6 top-[58px] z-20 w-[170px] overflow-hidden rounded-xl border border-[#eee8e8] bg-white p-1.5 text-left shadow-[0_8px_30px_rgba(60,30,30,0.12)]">

                        {/* Edit */}

                        <button
                          type="button"
                          onClick={() => {
                            setOpenActionId(null);

                            if (onEditGuest) {
                              onEditGuest(guest);
                            }
                          }}
                          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-[#4f4947] transition hover:bg-[#f8f2f1] hover:text-[#7a0719]"
                        >
                          <Pencil size={15} />
                          Edit Guest
                        </button>


                        {/* Delete */}

                        <button
                          type="button"
                          onClick={() => {
                            setOpenActionId(null);

                            if (onDeleteGuest) {
                              onDeleteGuest(guest);
                            }
                          }}
                          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-[#b42318] transition hover:bg-[#fdf0ef]"
                        >
                          <Trash2 size={15} />
                          Delete Guest
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

      {guests.length === 0 && (
        <div className="px-6 py-16 text-center">

          <p className="text-sm font-medium text-[#302b29]">
            No guests found
          </p>

          <p className="mt-1 text-sm text-[#817976]">
            Try changing your search or filter.
          </p>

        </div>
      )}

    </div>
  );
}


/* =====================================================
   Gift Format
===================================================== */

function formatGift(amount) {
  if (
    amount === null ||
    amount === undefined ||
    amount === "" ||
    Number(amount) <= 0
  ) {
    return "—";
  }

  return `₹${Number(amount).toLocaleString("en-IN")}`;
}


/* =====================================================
   RSVP Badge
===================================================== */

function RSVPBadge({ status }) {
  const styles = {
    Attending:
      "bg-[#eaf6ee] text-[#237342]",

    Pending:
      "bg-[#fff5df] text-[#a26d13]",

    Declined:
      "bg-[#f9e8e9] text-[#9b2635]",
  };

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1.5 text-xs font-semibold ${
        styles[status] ||
        "bg-gray-100 text-gray-600"
      }`}
    >
      {status}
    </span>
  );
}
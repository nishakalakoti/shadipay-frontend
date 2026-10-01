"use client";

import { useState } from "react";

import {
  CreditCard,
  MoreVertical,
  CheckCircle2,
  Clock3,
  XCircle,
  Pencil,
  Trash2,
} from "lucide-react";


export default function PaymentTable({
  payments,
  onEditPayment,
  onDeletePayment,
}) {
  return (
    <div className="overflow-hidden rounded-[22px] border border-[#eee8e8] bg-white shadow-[0_2px_12px_rgba(60,30,30,0.03)]">

      {/* Header */}
      <div className="border-b border-[#eee8e8] px-6 py-5">

        <div className="flex items-center justify-between">

          <div>
            <h2 className="text-lg font-semibold text-[#171717]">
              Payment Transactions
            </h2>

            <p className="mt-1 text-sm text-[#817976]">
              All online payment transactions for your wedding.
            </p>
          </div>

          <span className="text-sm text-[#817976]">
            {payments.length} transactions
          </span>

        </div>

      </div>


      {/* Table */}
      <div className="overflow-x-auto">

        <table className="w-full min-w-[900px]">

          <thead>

            <tr className="border-b border-[#eee8e8] bg-[#faf8f7]">

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-[#8d8582]">
                Transaction
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-[#8d8582]">
                Guest
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-[#8d8582]">
                Amount
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-[#8d8582]">
                Method
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-[#8d8582]">
                Status
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

            {payments.map((payment) => (

              <PaymentRow
                key={payment.id}
                payment={payment}
                onEditPayment={onEditPayment}
                onDeletePayment={onDeletePayment}
              />

            ))}

          </tbody>

        </table>

      </div>


      {/* Empty */}
      {payments.length === 0 && (

        <div className="px-6 py-16 text-center">

          <p className="text-sm font-semibold text-[#302b29]">
            No payments found
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
   PAYMENT ROW
===================================================== */

function PaymentRow({
  payment,
  onEditPayment,
  onDeletePayment,
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleEdit = () => {
    setIsMenuOpen(false);

    if (onEditPayment) {
      onEditPayment(payment);
    }
  };

  const handleDelete = () => {
    setIsMenuOpen(false);

    if (onDeletePayment) {
      onDeletePayment(payment);
    }
  };

  return (
    <tr
      className="border-b border-[#f0ebea] last:border-b-0 hover:bg-[#fffafa]"
    >

      {/* Transaction */}
      <td className="px-6 py-5">

        <div className="flex items-center gap-3">

          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f5eeee]">

            <CreditCard
              size={17}
              className="text-[#7a0719]"
            />

          </div>

          <span className="text-sm font-semibold text-[#302b29]">
            {payment.transactionId}
          </span>

        </div>

      </td>


      {/* Guest */}
      <td className="px-6 py-5 text-sm font-medium text-[#403a38]">
        {payment.guestName}
      </td>


      {/* Amount */}
      <td className="px-6 py-5 text-sm font-semibold text-[#171717]">
        ₹
        {Number(payment.amount || 0).toLocaleString(
          "en-IN"
        )}
      </td>


      {/* Method */}
      <td className="px-6 py-5">

        <span className="rounded-full bg-[#f5eeee] px-3 py-1.5 text-xs font-semibold text-[#7a0719]">
          {payment.method}
        </span>

      </td>


      {/* Status */}
      <td className="px-6 py-5">

        <StatusBadge
          status={payment.status}
        />

      </td>


      {/* Date */}
      <td className="px-6 py-5 text-sm text-[#817976]">
        {payment.date}
      </td>


      {/* Action */}
      <td className="relative px-6 py-5 text-right">

        <button
          type="button"
          onClick={() =>
            setIsMenuOpen((prev) => !prev)
          }
          className="rounded-lg p-2 text-[#817976] transition hover:bg-[#f5eeee] hover:text-[#7a0719]"
          aria-label="Payment actions"
        >
          <MoreVertical size={18} />
        </button>


        {/* Action Menu */}
        {isMenuOpen && (

          <div className="absolute right-6 top-14 z-30 w-44 overflow-hidden rounded-xl border border-[#eee8e8] bg-white p-1.5 text-left shadow-[0_10px_30px_rgba(50,30,30,0.12)]">

            {/* Edit */}
            <button
              type="button"
              onClick={handleEdit}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-[#403a38] transition hover:bg-[#faf5f4] hover:text-[#7a0719]"
            >

              <Pencil size={15} />

              <span>
                Edit Payment
              </span>

            </button>


            {/* Delete */}
            <button
              type="button"
              onClick={handleDelete}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-[#9b2635] transition hover:bg-[#fdf0f1]"
            >

              <Trash2 size={15} />

              <span>
                Delete Payment
              </span>

            </button>

          </div>

        )}

      </td>

    </tr>
  );
}


/* =====================================================
   STATUS BADGE
===================================================== */

function StatusBadge({ status }) {

  const config = {
    Success: {
      icon: CheckCircle2,
      className: "bg-[#eaf6ee] text-[#237342]",
    },

    Pending: {
      icon: Clock3,
      className: "bg-[#fff5df] text-[#a26d13]",
    },

    Failed: {
      icon: XCircle,
      className: "bg-[#f9e8e9] text-[#9b2635]",
    },
  };


  const current =
    config[status] ||
    config.Pending;


  const Icon = current.icon;


  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ${current.className}`}
    >

      <Icon size={13} />

      {status}

    </span>
  );
}
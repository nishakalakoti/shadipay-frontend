"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";

export default function EditPaymentModal({
  isOpen,
  onClose,
  payment,
  onSave,
  isLoading = false,
}) {
  const [formData, setFormData] = useState({
    guestName: "",
    amount: "",
    date: "",
  });

  const [error, setError] = useState("");

  useEffect(() => {
    if (payment) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFormData({
        guestName: payment.guestName || "",
        amount: payment.amount ?? "",
        date: payment.paymentDate
          ? payment.paymentDate.split("T")[0]
          : "",
      });

      // eslint-disable-next-line react-hooks/set-state-in-effect
      setError("");
    }
  }, [payment]);

  if (!isOpen) {
    return null;
  }

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setError("");

    const guestName = formData.guestName.trim();
    const amount = Number(formData.amount);

    if (!guestName) {
      setError("Guest name is required.");
      return;
    }

    if (!formData.date) {
      setError("Payment date is required.");
      return;
    }

    if (Number.isNaN(amount) || amount < 0) {
      setError("Please enter a valid amount.");
      return;
    }

    onSave({
      guest_name: guestName,
      amount,
      payment_date: `${formData.date}T00:00:00Z`,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-lg rounded-[22px] bg-white shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#eee8e8] px-6 py-5">
          <div>
            <h2 className="text-lg font-semibold text-[#171717]">
              Edit Payment
            </h2>

            <p className="mt-1 text-sm text-[#817976]">
              Update the payment details.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="rounded-lg p-2 text-[#817976] transition hover:bg-[#f5eeee] hover:text-[#7a0719]"
          >
            <X size={19} />
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-5 px-6 py-6"
        >

          {/* Guest Name */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-[#403a38]">
              Guest Name
            </label>

            <input
              type="text"
              name="guestName"
              value={formData.guestName}
              onChange={handleChange}
              placeholder="Enter guest name"
              disabled={isLoading}
              className="w-full rounded-xl border border-[#e8dfdd] bg-white px-4 py-3 text-sm text-[#302b29] outline-none transition focus:border-[#7a0719]"
            />
          </div>

          {/* Amount */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-[#403a38]">
              Amount
            </label>

            <input
              type="number"
              name="amount"
              min="0"
              value={formData.amount}
              onChange={handleChange}
              placeholder="Enter amount"
              disabled={isLoading}
              className="w-full rounded-xl border border-[#e8dfdd] bg-white px-4 py-3 text-sm text-[#302b29] outline-none transition focus:border-[#7a0719]"
            />
          </div>

          {/* Date */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-[#403a38]">
              Payment Date
            </label>

            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              disabled={isLoading}
              className="w-full rounded-xl border border-[#e8dfdd] bg-white px-4 py-3 text-sm text-[#302b29] outline-none transition focus:border-[#7a0719]"
            />
          </div>

          {/* Error */}
          {error && (
            <div className="rounded-xl bg-[#f9e8e9] px-4 py-3 text-sm font-medium text-[#9b2635]">
              {error}
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-2">

            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="rounded-xl border border-[#e8dfdd] bg-white px-5 py-3 text-sm font-semibold text-[#625b59] transition hover:border-[#7a0719] hover:text-[#7a0719]"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isLoading}
              className="rounded-xl bg-[#7a0719] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#620515] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoading ? "Updating..." : "Update Payment"}
            </button>

          </div>

        </form>
      </div>
    </div>
  );
}
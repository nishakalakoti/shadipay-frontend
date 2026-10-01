"use client";

import { useState } from "react";
import { X } from "lucide-react";

export default function AddPhysicalGiftModal({
  isOpen,
  onClose,
  onAdd,
  isLoading = false,
}) {
  const [form, setForm] = useState({
    guestName: "",
    giftName: "",
    type: "Physical",
    amount: 0,
    date: new Date().toISOString().split("T")[0],
  });

  const [errors, setErrors] = useState({});

  if (!isOpen) {
    return null;
  }

  // =====================================================
  // HANDLE CHANGE
  // =====================================================

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: "",
    }));
  };

  // =====================================================
  // VALIDATE FORM
  // =====================================================

  const validateForm = () => {
    const newErrors = {};

    if (!form.guestName.trim()) {
      newErrors.guestName =
        "Please enter guest name.";
    }

    if (!form.giftName.trim()) {
      newErrors.giftName =
        "Please enter gift name.";
    }

    if (!form.type) {
      newErrors.type =
        "Please select gift type.";
    }

    if (
      form.amount === "" ||
      Number(form.amount) < 0
    ) {
      newErrors.amount =
        "Amount cannot be negative.";
    }

    if (!form.date) {
      newErrors.date =
        "Please select gift date.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // =====================================================
  // HANDLE SUBMIT
  // =====================================================

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    // ===================================================
    // BACKEND GIFT DATA
    // ===================================================

    const giftData = {
      guest_name: form.guestName.trim(),
      gift: form.giftName.trim(),
      gift_type: form.type,
      amount: Number(form.amount),
      gift_date: form.date,
    };

    onAdd(giftData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 backdrop-blur-[2px]">

      {/* =================================================
          MODAL
      ================================================== */}

      <div className="w-full max-w-[560px] overflow-hidden rounded-[24px] bg-white shadow-[0_20px_60px_rgba(0,0,0,0.18)]">

        {/* =================================================
            HEADER
        ================================================== */}

        <div className="flex items-center justify-between border-b border-[#eee8e8] px-6 py-5">

          <div>

            <h2 className="text-xl font-semibold text-[#171717]">
              Add Gift
            </h2>

            <p className="mt-1 text-sm text-[#817976]">
              Record a gift received for your wedding.
            </p>

          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="rounded-lg p-2 text-[#817976] transition hover:bg-[#f5eeee] hover:text-[#7a0719] disabled:cursor-not-allowed disabled:opacity-50"
          >
            <X size={20} />
          </button>

        </div>

        {/* =================================================
            FORM
        ================================================== */}

        <form
          onSubmit={handleSubmit}
          className="space-y-5 p-6"
        >

          {/* =================================================
              GUEST NAME
          ================================================== */}

          <div>

            <label className="mb-2 block text-sm font-medium text-[#403a38]">
              Guest Name
            </label>

            <input
              type="text"
              name="guestName"
              value={form.guestName}
              onChange={handleChange}
              disabled={isLoading}
              placeholder="Who gave the gift?"
              className="h-11 w-full rounded-xl border border-[#e8dfdd] px-4 text-sm text-[#302b29] outline-none transition placeholder:text-[#aaa19e] focus:border-[#7a0719] disabled:bg-[#faf8f7]"
            />

            {errors.guestName && (
              <p className="mt-1.5 text-xs text-[#b42318]">
                {errors.guestName}
              </p>
            )}

          </div>


          {/* =================================================
              GIFT
          ================================================== */}

          <div>

            <label className="mb-2 block text-sm font-medium text-[#403a38]">
              Gift
            </label>

            <input
              type="text"
              name="giftName"
              value={form.giftName}
              onChange={handleChange}
              disabled={isLoading}
              placeholder="e.g. Silver Platter, Dinner Set..."
              className="h-11 w-full rounded-xl border border-[#e8dfdd] px-4 text-sm text-[#302b29] outline-none transition placeholder:text-[#aaa19e] focus:border-[#7a0719] disabled:bg-[#faf8f7]"
            />

            {errors.giftName && (
              <p className="mt-1.5 text-xs text-[#b42318]">
                {errors.giftName}
              </p>
            )}

          </div>


          {/* =================================================
              TYPE
          ================================================== */}

          <div>

            <label className="mb-2 block text-sm font-medium text-[#403a38]">
              Type
            </label>

            <select
              name="type"
              value={form.type}
              onChange={handleChange}
              disabled={isLoading}
              className="h-11 w-full rounded-xl border border-[#e8dfdd] bg-white px-4 text-sm text-[#302b29] outline-none transition focus:border-[#7a0719] disabled:bg-[#faf8f7]"
            >
              <option value="Physical">
                Physical
              </option>

              <option value="Online">
                Online
              </option>
            </select>

            {errors.type && (
              <p className="mt-1.5 text-xs text-[#b42318]">
                {errors.type}
              </p>
            )}

          </div>


          {/* =================================================
              AMOUNT + DATE
          ================================================== */}

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

            {/* Amount */}

            <div>

              <label className="mb-2 block text-sm font-medium text-[#403a38]">
                Amount
              </label>

              <input
                type="number"
                name="amount"
                min="0"
                value={form.amount}
                onChange={handleChange}
                disabled={isLoading}
                placeholder="0"
                className="h-11 w-full rounded-xl border border-[#e8dfdd] px-4 text-sm text-[#302b29] outline-none transition focus:border-[#7a0719] disabled:bg-[#faf8f7]"
              />

              {errors.amount && (
                <p className="mt-1.5 text-xs text-[#b42318]">
                  {errors.amount}
                </p>
              )}

            </div>


            {/* Date */}

            <div>

              <label className="mb-2 block text-sm font-medium text-[#403a38]">
                Date
              </label>

              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                disabled={isLoading}
                className="h-11 w-full rounded-xl border border-[#e8dfdd] bg-white px-4 text-sm text-[#302b29] outline-none transition focus:border-[#7a0719] disabled:bg-[#faf8f7]"
              />

              {errors.date && (
                <p className="mt-1.5 text-xs text-[#b42318]">
                  {errors.date}
                </p>
              )}

            </div>

          </div>


          {/* =================================================
              ACTIONS
          ================================================== */}

          <div className="flex justify-end gap-3 border-t border-[#eee8e8] pt-5">

            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="rounded-xl border border-[#e8dfdd] px-5 py-3 text-sm font-semibold text-[#625b59] transition hover:bg-[#faf8f7] disabled:cursor-not-allowed disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isLoading}
              className="rounded-xl bg-[#7a0719] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#650515] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoading
                ? "Saving..."
                : "Save Gift"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}
"use client";

import { useEffect, useState } from "react";
import { X, Gift } from "lucide-react";

export default function EditGiftModal({
  isOpen,
  onClose,
  gift,
  onSave,
  isLoading = false,
}) {
  const [form, setForm] = useState({
    guestName: "",
    giftName: "",
    type: "Physical",
    amount: 0,
    date: "",
  });

  const [errors, setErrors] = useState({});

  // =====================================================
  // LOAD SELECTED GIFT
  // =====================================================

  useEffect(() => {
    if (gift) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setForm({
        guestName: gift.guest_name || "",
        giftName: gift.gift || "",
        type: gift.gift_type || "Physical",
        amount: gift.amount ?? 0,
        date: gift.gift_date || "",
      });

      // eslint-disable-next-line react-hooks/set-state-in-effect
      setErrors({});
    }
  }, [gift]);

  if (!isOpen || !gift) {
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
  // VALIDATE
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
  // SUBMIT
  // =====================================================

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    const updatedGift = {
      guest_name: form.guestName.trim(),
      gift: form.giftName.trim(),
      gift_type: form.type,
      amount: Number(form.amount),
      gift_date: form.date,
    };

    onSave(updatedGift);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-4 backdrop-blur-[2px]">

      {/* =================================================
          MODAL
      ================================================== */}

      <div className="w-full max-w-[560px] overflow-hidden rounded-[24px] bg-white shadow-[0_20px_60px_rgba(0,0,0,0.18)]">

        {/* =================================================
            HEADER
        ================================================== */}

        <div className="flex items-start justify-between border-b border-[#eee8e8] px-6 py-5">

          <div>

            <div className="flex items-center gap-2">

              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f5eeee]">

                <Gift
                  size={17}
                  className="text-[#7a0719]"
                />

              </div>

              <h2 className="text-lg font-semibold text-[#171717]">
                Edit Gift
              </h2>

            </div>

            <p className="mt-2 text-sm text-[#817976]">
              Update gift details and information.
            </p>

          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="flex h-9 w-9 items-center justify-center rounded-full text-[#817976] transition hover:bg-[#f7f3f2] hover:text-[#7a0719] disabled:cursor-not-allowed disabled:opacity-50"
          >
            <X size={18} />
          </button>

        </div>

        {/* =================================================
            FORM
        ================================================== */}

        <form onSubmit={handleSubmit}>

          <div className="space-y-5 px-6 py-6">

            {/* Guest Name */}

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
                className="h-11 w-full rounded-xl border border-[#e8dfdd] bg-white px-4 text-sm text-[#302b29] outline-none transition placeholder:text-[#aaa19e] focus:border-[#7a0719] disabled:bg-[#faf8f7]"
              />

              {errors.guestName && (
                <p className="mt-1.5 text-xs text-[#b42318]">
                  {errors.guestName}
                </p>
              )}

            </div>

            {/* Gift */}

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
                className="h-11 w-full rounded-xl border border-[#e8dfdd] bg-white px-4 text-sm text-[#302b29] outline-none transition placeholder:text-[#aaa19e] focus:border-[#7a0719] disabled:bg-[#faf8f7]"
              />

              {errors.giftName && (
                <p className="mt-1.5 text-xs text-[#b42318]">
                  {errors.giftName}
                </p>
              )}

            </div>

            {/* Type */}

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

            {/* Amount + Date */}

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

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
                  className="h-11 w-full rounded-xl border border-[#e8dfdd] bg-white px-4 text-sm text-[#302b29] outline-none transition focus:border-[#7a0719] disabled:bg-[#faf8f7]"
                />

                {errors.amount && (
                  <p className="mt-1.5 text-xs text-[#b42318]">
                    {errors.amount}
                  </p>
                )}

              </div>

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

          </div>

          {/* =================================================
              FOOTER
          ================================================== */}

          <div className="flex items-center justify-end gap-3 border-t border-[#eee8e8] bg-[#fcfaf9] px-6 py-4">

            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="rounded-xl border border-[#e8dfdd] bg-white px-5 py-2.5 text-sm font-semibold text-[#625b59] transition hover:border-[#7a0719] hover:text-[#7a0719] disabled:cursor-not-allowed disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isLoading}
              className="rounded-xl bg-[#7a0719] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#650515] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoading
                ? "Saving..."
                : "Save Changes"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}
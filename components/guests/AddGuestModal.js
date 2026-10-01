"use client";

import { useState } from "react";
import { X } from "lucide-react";

export default function AddGuestModal({
  isOpen,
  onClose,
  onAdd,
  isLoading = false,
}) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    relation: "Friend",
    rsvp: "Pending",
  });

  if (!isOpen) {
    return null;
  }

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!form.name.trim() || !form.phone.trim()) {
      return;
    }

    const guestData = {
      guest_name: form.name.trim(),
      phone: form.phone.trim(),
      email: form.email.trim(),
      relation: form.relation,
      rsvp_status: form.rsvp,
      gift_amount: 0,
    };

    onAdd(guestData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">

      <div className="w-full max-w-lg rounded-[24px] bg-white shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#eee8e8] px-6 py-5">

          <div>
            <h2 className="text-xl font-semibold text-[#171717]">
              Add Guest
            </h2>

            <p className="mt-1 text-sm text-[#817976]">
              Add a guest to your wedding registry.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="rounded-lg p-2 text-[#817976] hover:bg-[#f5eeee] disabled:cursor-not-allowed disabled:opacity-50"
          >
            <X size={20} />
          </button>

        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-5 p-6"
        >

          {/* Name */}
          <div>
            <label className="mb-2 block text-sm font-medium text-[#403a38]">
              Guest Name
            </label>

            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter guest name"
              disabled={isLoading}
              className="w-full rounded-xl border border-[#e8dfdd] px-4 py-3 text-sm outline-none focus:border-[#7a0719] disabled:bg-[#faf8f7]"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="mb-2 block text-sm font-medium text-[#403a38]">
              Phone Number
            </label>

            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Enter phone number"
              disabled={isLoading}
              className="w-full rounded-xl border border-[#e8dfdd] px-4 py-3 text-sm outline-none focus:border-[#7a0719] disabled:bg-[#faf8f7]"
            />
          </div>

          {/* Email */}
          <div>
            <label className="mb-2 block text-sm font-medium text-[#403a38]">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="guest@example.com"
              disabled={isLoading}
              className="w-full rounded-xl border border-[#e8dfdd] px-4 py-3 text-sm outline-none focus:border-[#7a0719] disabled:bg-[#faf8f7]"
            />
          </div>

          {/* Relation */}
          <div>
            <label className="mb-2 block text-sm font-medium text-[#403a38]">
              Relation
            </label>

            <select
              name="relation"
              value={form.relation}
              onChange={handleChange}
              disabled={isLoading}
              className="w-full rounded-xl border border-[#e8dfdd] bg-white px-4 py-3 text-sm outline-none focus:border-[#7a0719] disabled:bg-[#faf8f7]"
            >
              <option>Friend</option>
              <option>Family</option>
              <option>Colleague</option>
              <option>Relative</option>
              <option>Other</option>
            </select>
          </div>

          {/* RSVP */}
          <div>
            <label className="mb-2 block text-sm font-medium text-[#403a38]">
              RSVP Status
            </label>

            <select
              name="rsvp"
              value={form.rsvp}
              onChange={handleChange}
              disabled={isLoading}
              className="w-full rounded-xl border border-[#e8dfdd] bg-white px-4 py-3 text-sm outline-none focus:border-[#7a0719] disabled:bg-[#faf8f7]"
            >
              <option>Pending</option>
              <option>Attending</option>
              <option>Declined</option>
            </select>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-2">

            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="rounded-xl border border-[#e8dfdd] px-5 py-3 text-sm font-semibold text-[#625b59] hover:bg-[#faf8f7] disabled:cursor-not-allowed disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isLoading}
              className="rounded-xl bg-[#7a0719] px-5 py-3 text-sm font-semibold text-white hover:bg-[#650515] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoading ? "Adding..." : "Add Guest"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}
"use client";

import { useState } from "react";
import {
  Heart,
  CalendarDays,
  MapPin,
  Link as LinkIcon,
} from "lucide-react";

export default function WeddingSettings({
  wedding,
  onSave,
}) {
  const [form, setForm] = useState(wedding);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    onSave(form);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5"
    >

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

        {/* Couple Names */}
        <div>

          <label className="mb-2 block text-sm font-medium text-[#403a38]">
            Couple Names
          </label>

          <div className="relative">

            <Heart
              size={16}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#a29a98]"
            />

            <input
              name="coupleNames"
              value={form.coupleNames}
              onChange={handleChange}
              className="w-full rounded-xl border border-[#e8dfdd] py-3 pl-11 pr-4 text-sm outline-none focus:border-[#7a0719]"
            />

          </div>

        </div>

        {/* Date */}
        <div>

          <label className="mb-2 block text-sm font-medium text-[#403a38]">
            Wedding Date
          </label>

          <div className="relative">

            <CalendarDays
              size={16}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#a29a98]"
            />

            <input
              name="date"
              value={form.date}
              onChange={handleChange}
              className="w-full rounded-xl border border-[#e8dfdd] py-3 pl-11 pr-4 text-sm outline-none focus:border-[#7a0719]"
            />

          </div>

        </div>

        {/* Venue */}
        <div>

          <label className="mb-2 block text-sm font-medium text-[#403a38]">
            Venue
          </label>

          <div className="relative">

            <MapPin
              size={16}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#a29a98]"
            />

            <input
              name="venue"
              value={form.venue}
              onChange={handleChange}
              className="w-full rounded-xl border border-[#e8dfdd] py-3 pl-11 pr-4 text-sm outline-none focus:border-[#7a0719]"
            />

          </div>

        </div>

        {/* Registry URL */}
        <div>

          <label className="mb-2 block text-sm font-medium text-[#403a38]">
            Registry URL
          </label>

          <div className="relative">

            <LinkIcon
              size={16}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#a29a98]"
            />

            <input
              value={form.registryUrl}
              readOnly
              className="w-full rounded-xl border border-[#e8dfdd] bg-[#faf8f7] py-3 pl-11 pr-4 text-sm text-[#817976] outline-none"
            />

          </div>

        </div>

      </div>

      <div className="flex justify-end">

        <button
          type="submit"
          className="rounded-xl bg-[#7a0719] px-5 py-3 text-sm font-semibold text-white hover:bg-[#650515]"
        >
          Save Wedding Details
        </button>

      </div>

    </form>
  );
}
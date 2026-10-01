"use client";

import { Plus } from "lucide-react";

export default function CreateWeddingButton({ onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center gap-2 rounded-xl bg-[#7a0719] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#650515] active:scale-[0.98]"
    >
      <Plus size={17} strokeWidth={2} />

      <span>Create Wedding</span>
    </button>
  );
}
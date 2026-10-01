"use client";

import { Copy, Link as LinkIcon } from "lucide-react";
import { useState } from "react";

export default function InvitationLink({ url }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error("Copy failed:", error);
    }
  };

  return (
    <section className="rounded-[22px] border border-[#eee8e8] bg-white p-6 shadow-[0_2px_12px_rgba(60,30,30,0.03)]">

      <div className="flex items-start gap-4">

        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#f5eeee]">
          <LinkIcon
            size={18}
            className="text-[#7a0719]"
          />
        </div>

        <div className="flex-1">

          <h2 className="text-lg font-semibold text-[#171717]">
            Invitation Link
          </h2>

          <p className="mt-1 text-sm text-[#817976]">
            Share this link with your guests.
          </p>

        </div>

      </div>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row">

        <div className="flex-1 rounded-xl border border-[#eee8e8] bg-[#faf8f7] px-4 py-3 text-sm text-[#625b59]">
          {url}
        </div>

        <button
          type="button"
          onClick={handleCopy}
          className="flex items-center justify-center gap-2 rounded-xl bg-[#7a0719] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#650515]"
        >
          <Copy size={16} />

          {copied ? "Copied!" : "Copy Link"}
        </button>

      </div>

    </section>
  );
}
"use client";

import { useState } from "react";
import { Check, Copy, ExternalLink } from "lucide-react";

export default function RegistryLink({ url }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error("Failed to copy registry link:", error);
    }
  };

  return (
    <section className="rounded-[22px] border border-[#eee8e8] bg-white p-6 shadow-[0_2px_12px_rgba(60,30,30,0.03)]">

      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">

        <div>
          <h2 className="text-lg font-semibold text-[#171717]">
            Wedding Registry
          </h2>

          <p className="mt-1 text-sm text-[#817976]">
            Share this link with your guests.
          </p>
        </div>

        <a
          href={`https://${url}`}
          target="_blank"
          rel="noreferrer"
          className="flex w-fit items-center gap-2 text-xs font-semibold text-[#7a0719] hover:underline"
        >
          Open Registry
          <ExternalLink size={14} />
        </a>

      </div>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row">

        <div className="flex min-h-11 flex-1 items-center rounded-xl border border-[#eee8e8] bg-[#faf8f7] px-4 text-sm text-[#625b59]">
          {url}
        </div>

        <button
          type="button"
          onClick={handleCopy}
          className="flex items-center justify-center gap-2 rounded-xl bg-[#7a0719] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#650515]"
        >
          {copied ? (
            <>
              <Check size={16} />
              Copied
            </>
          ) : (
            <>
              <Copy size={16} />
              Copy Link
            </>
          )}
        </button>

      </div>

    </section>
  );
}
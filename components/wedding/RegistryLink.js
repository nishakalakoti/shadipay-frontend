"use client";

import { useState } from "react";
import {
  Check,
  Copy,
  ExternalLink,
} from "lucide-react";

export default function RegistryLink({
  weddingId,
}) {
  const [copied, setCopied] = useState(false);

  // =====================================================
  // REGISTRY PATH
  // =====================================================

  const registryPath = weddingId
    ? `/r/${weddingId}`
    : "";

  // =====================================================
  // FULL REGISTRY URL
  // =====================================================

  const registryUrl =
    typeof window !== "undefined" && registryPath
      ? `${window.location.origin}${registryPath}`
      : "";

  // =====================================================
  // COPY LINK
  // =====================================================

  const handleCopy = async () => {
    if (!registryUrl) {
      return;
    }

    try {
      await navigator.clipboard.writeText(
        registryUrl
      );

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error(
        "Failed to copy registry link:",
        error
      );
    }
  };

  // =====================================================
  // NO WEDDING ID
  // =====================================================

  if (!weddingId) {
    return null;
  }

  // =====================================================
  // UI
  // =====================================================

  return (
    <section className="rounded-[22px] border border-[#eee8e8] bg-white p-6 shadow-[0_2px_12px_rgba(60,30,30,0.03)]">

      {/* =================================================
          HEADER
      ================================================== */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">

        {/* TITLE */}

        <div>

          <h2 className="text-lg font-semibold text-[#171717]">
            Wedding Registry
          </h2>

          <p className="mt-1 text-sm text-[#817976]">
            Share this link with your guests to receive gifts and payments.
          </p>

        </div>

        {/* OPEN REGISTRY */}

        <a
          href={registryPath}
          target="_blank"
          rel="noreferrer"
          className="
            flex
            w-fit
            items-center
            gap-2
            text-xs
            font-semibold
            text-[#7a0719]
            hover:underline
          "
        >
          Open Registry

          <ExternalLink size={14} />

        </a>

      </div>

      {/* =================================================
          LINK + COPY
      ================================================== */}

      <div className="mt-5 flex flex-col gap-3 sm:flex-row">

        {/* REGISTRY URL */}

        <div
          className="
            flex
            min-h-11
            min-w-0
            flex-1
            items-center
            overflow-hidden
            rounded-xl
            border
            border-[#eee8e8]
            bg-[#faf8f7]
            px-4
            text-sm
            text-[#625b59]
          "
        >

          <span className="truncate">
            {registryUrl}
          </span>

        </div>

        {/* COPY LINK BUTTON */}

        <button
          type="button"
          onClick={handleCopy}
          disabled={!registryUrl}
          className="
            flex
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-[#7a0719]
            px-5
            py-3
            text-sm
            font-semibold
            text-white
            transition
            hover:bg-[#650515]
            disabled:cursor-not-allowed
            disabled:opacity-50
          "
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
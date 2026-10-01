"use client";

import { useState } from "react";

import {
  Download,
  Copy,
  Share2,
  Check,
  Pencil,
  Trash2,
} from "lucide-react";


const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "http://127.0.0.1:8000";


export default function QRActions({
  wedding,
  onEdit,
  onDelete,
}) {
  const [copied, setCopied] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);


  // =====================================================
  // GET ABSOLUTE IMAGE URL
  // =====================================================

  const getQrImageUrl = () => {
    if (!wedding?.qrImageUrl) {
      return "";
    }

    if (
      wedding.qrImageUrl.startsWith("http")
    ) {
      return wedding.qrImageUrl;
    }

    return `${API_BASE_URL}${wedding.qrImageUrl}`;
  };


  // =====================================================
  // COPY LINK
  // =====================================================

  const handleCopy = async () => {
    if (!wedding?.registryUrl) {
      return;
    }

    try {
      await navigator.clipboard.writeText(
        wedding.registryUrl
      );

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error(
        "Copy failed:",
        error
      );
    }
  };


  // =====================================================
  // DOWNLOAD FILE
  // =====================================================

  const downloadBlob = (
    blob,
    fileName
  ) => {
    const blobUrl =
      URL.createObjectURL(blob);

    const link =
      document.createElement("a");

    link.href = blobUrl;
    link.download = fileName;

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(blobUrl);
  };


  // =====================================================
  // DOWNLOAD QR
  // =====================================================

  const handleDownload = async () => {
    if (isDownloading) {
      return;
    }

    setIsDownloading(true);

    try {
      const coupleName =
        wedding?.coupleNames ||
        "wedding";

      const fileName = `${coupleName
        .replace(/&/g, "and")
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-")
        .toLowerCase()}-qr.png`;


      // -------------------------------------------------
      // BACKEND UPLOADED IMAGE
      // -------------------------------------------------

      const qrImageUrl =
        getQrImageUrl();

      if (qrImageUrl) {
        const response =
          await fetch(qrImageUrl);

        if (!response.ok) {
          throw new Error(
            "Unable to download QR image."
          );
        }

        const blob =
          await response.blob();

        downloadBlob(
          blob,
          fileName
        );

        return;
      }


      // -------------------------------------------------
      // FALLBACK CANVAS
      // -------------------------------------------------

      const canvas =
        document.getElementById(
          "wedding-qr-code"
        );

      if (!canvas) {
        throw new Error(
          "QR code is not available."
        );
      }

      canvas.toBlob((blob) => {
        if (!blob) {
          throw new Error(
            "Unable to generate QR image."
          );
        }

        downloadBlob(
          blob,
          fileName
        );
      });

    } catch (error) {
      console.error(
        "QR download failed:",
        error
      );
    } finally {
      setIsDownloading(false);
    }
  };


  // =====================================================
  // SHARE QR
  // =====================================================

  const handleShare = async () => {
    if (!wedding?.registryUrl) {
      return;
    }

    const shareData = {
      title: `${wedding.coupleNames} Wedding Registry`,
      text:
        "Send your gifts and blessings through our wedding registry.",
      url: wedding.registryUrl,
    };

    if (navigator.share) {
      try {
        await navigator.share(
          shareData
        );
      } catch (error) {
        // User closed the share dialog.
      }
    } else {
      await handleCopy();
    }
  };


  // =====================================================
  // COMMON SECONDARY BUTTON
  // =====================================================

  const secondaryButtonClass = `
    flex
    w-full
    items-center
    justify-center
    gap-2
    rounded-xl
    border
    border-[#e8dfdd]
    bg-white
    px-4
    py-3
    text-sm
    font-semibold
    text-[#5f5755]
    transition-all
    duration-200
    hover:border-[#7a0719]
    hover:bg-[#fffafa]
    hover:text-[#7a0719]
    active:scale-[0.98]
    sm:w-auto
    sm:px-5
  `;


  return (
    <div
      className="
        mt-6
        grid
        grid-cols-2
        gap-2.5
        sm:flex
        sm:flex-wrap
        sm:justify-center
        sm:gap-3
      "
    >

      {/* =================================================
          DOWNLOAD
      ================================================== */}

      <button
        type="button"
        onClick={handleDownload}
        disabled={isDownloading}
        className="
          col-span-2
          flex
          w-full
          items-center
          justify-center
          gap-2
          rounded-xl
          bg-[#7a0719]
          px-4
          py-3
          text-sm
          font-semibold
          text-white
          shadow-sm
          transition-all
          duration-200
          hover:bg-[#650515]
          active:scale-[0.98]
          disabled:cursor-not-allowed
          disabled:opacity-60
          sm:col-span-1
          sm:w-auto
          sm:px-5
        "
      >
        <Download size={16} />

        {isDownloading
          ? "Downloading..."
          : "Download QR"}
      </button>


      {/* =================================================
          COPY LINK
      ================================================== */}

      <button
        type="button"
        onClick={handleCopy}
        disabled={!wedding?.registryUrl}
        className={`
          ${secondaryButtonClass}
          disabled:cursor-not-allowed
          disabled:opacity-50
        `}
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


      {/* =================================================
          SHARE
      ================================================== */}

      <button
        type="button"
        onClick={handleShare}
        disabled={!wedding?.registryUrl}
        className={`
          ${secondaryButtonClass}
          disabled:cursor-not-allowed
          disabled:opacity-50
        `}
      >
        <Share2 size={16} />
        Share QR
      </button>


      {/* =================================================
          EDIT
      ================================================== */}

      <button
        type="button"
        onClick={() => onEdit?.()}
        className={secondaryButtonClass}
      >
        <Pencil size={16} />
        Edit QR
      </button>


      {/* =================================================
          DELETE
      ================================================== */}

      <button
        type="button"
        onClick={() => onDelete?.()}
        className="
          flex
          w-full
          items-center
          justify-center
          gap-2
          rounded-xl
          border
          border-[#ead9dc]
          bg-white
          px-4
          py-3
          text-sm
          font-semibold
          text-[#9a2639]
          transition-all
          duration-200
          hover:border-[#9a2639]
          hover:bg-[#fff7f8]
          active:scale-[0.98]
          sm:w-auto
          sm:px-5
        "
      >
        <Trash2 size={16} />
        Delete QR
      </button>

    </div>
  );
}
"use client";

import { QRCodeCanvas } from "qrcode.react";

import QRActions from "./QRActions";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "http://127.0.0.1:8000";


export default function WeddingQRCode({
  wedding,
  onEdit,
  onDelete,
}) {
  const qrImageUrl = wedding?.qrImageUrl
    ? wedding.qrImageUrl.startsWith("http")
      ? wedding.qrImageUrl
      : `${API_BASE_URL}${wedding.qrImageUrl}`
    : "";


  return (
    <section className="rounded-[24px] border border-[#eee8e8] bg-white p-8 shadow-[0_2px_12px_rgba(60,30,30,0.03)]">

      {/* =================================================
          HEADER
      ================================================== */}

      <div className="text-center">

        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#7a0719]">
          Wedding Registry
        </p>

        <h2 className="mt-2 font-serif text-3xl font-semibold text-[#171717]">
          {wedding?.coupleNames || "-"}
        </h2>

        <p className="mt-2 text-sm text-[#817976]">
          {wedding?.description ||
            "Scan this QR code to send gifts and payments."}
        </p>

      </div>


      {/* =================================================
          QR CODE
      ================================================== */}

      <div className="mx-auto mt-8 flex w-fit items-center justify-center rounded-[24px] border border-[#eee8e8] bg-white p-6 shadow-sm">

        {qrImageUrl ? (
          <img
            src={qrImageUrl}
            alt="Wedding QR Code"
            className="h-[260px] w-[260px] object-contain"
          />
        ) : (
          <QRCodeCanvas
            id="wedding-qr-code"
            value={wedding?.registryUrl || ""}
            size={260}
            level="H"
            includeMargin
          />
        )}

      </div>


      {/* =================================================
          REGISTRY URL
      ================================================== */}

      <div className="mx-auto mt-6 max-w-xl">

        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-[#a29a98]">
          Registry Link
        </p>

        <div className="rounded-xl border border-[#eee8e8] bg-[#faf8f7] px-4 py-3">

          <p className="truncate text-sm text-[#625b59]">
            {wedding?.registryUrl || "-"}
          </p>

        </div>

      </div>


      {/* =================================================
          QR ACTIONS
      ================================================== */}

      <QRActions
        wedding={wedding}
        onEdit={onEdit}
        onDelete={onDelete}
      />

    </section>
  );
}
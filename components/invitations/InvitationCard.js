"use client";

import { useState } from "react";

import {
  CalendarDays,
  MapPin,
  Clock3,
  Eye,
  Pencil,
  Share2,
  Trash2,
} from "lucide-react";

import InvitationPreview from "./InvitationPreview";


export default function InvitationCard({
  wedding,
  invitation,
  onEdit,
  onDelete,
}) {
  const [showPreview, setShowPreview] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const [shareStatus, setShareStatus] = useState("");


  // =====================================================
  // SHARE INVITATION
  // =====================================================

  const handleShare = async () => {
    const invitationUrl =
      invitation?.invitation_url;

    if (!invitationUrl) {
      setShareStatus("Link unavailable");

      setTimeout(() => {
        setShareStatus("");
      }, 2000);

      return;
    }

    setIsSharing(true);
    setShareStatus("");


    try {

      // -------------------------------------------------
      // NATIVE SHARE
      // -------------------------------------------------

      if (
        navigator.share
      ) {

        await navigator.share({
          title:
            invitation?.title ||
            "Wedding Invitation",

          text:
            invitation?.message ||
            `You're invited to celebrate with ${wedding.coupleNames}.`,

          url: invitationUrl,
        });

        setShareStatus("Shared!");

      } else {

        // -------------------------------------------------
        // FALLBACK COPY
        // -------------------------------------------------

        await navigator.clipboard.writeText(
          invitationUrl
        );

        setShareStatus("Link Copied!");

      }

    } catch (error) {

      // User closed native share popup
      if (
        error?.name ===
        "AbortError"
      ) {
        return;
      }

      // -------------------------------------------------
      // FINAL FALLBACK
      // -------------------------------------------------

      try {

        await navigator.clipboard.writeText(
          invitationUrl
        );

        setShareStatus("Link Copied!");

      } catch {
        setShareStatus("Unable to share");
      }

    } finally {

      setIsSharing(false);

      setTimeout(() => {
        setShareStatus("");
      }, 2000);

    }
  };


  return (
    <>
      <section className="overflow-hidden rounded-[24px] border border-[#eee8e8] bg-white shadow-[0_2px_12px_rgba(60,30,30,0.03)]">

        {/* Top */}
        <div className="border-b border-[#eee8e8] px-6 py-5">

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

            <div>

              <h2 className="text-lg font-semibold text-[#171717]">
                {invitation?.title ||
                  "Wedding Invitation"}
              </h2>

              <p className="mt-1 text-sm text-[#817976]">
                Digital invitation for your wedding guests.
              </p>

            </div>


            {/* Status */}
            <span className="inline-flex w-fit items-center gap-2 rounded-full bg-[#eaf6ee] px-3 py-1.5 text-xs font-semibold text-[#237342]">

              <span className="h-2 w-2 rounded-full bg-[#237342]" />

              {wedding.status}

            </span>

          </div>

        </div>


        {/* Invitation Preview */}
        <div className="grid grid-cols-1 gap-8 p-6 lg:grid-cols-[360px_1fr]">

          {/* Preview Card */}
          <div className="overflow-hidden rounded-[20px] border border-[#e8dfdd] bg-gradient-to-b from-[#f8e9e7] via-white to-[#f8eeee]">

            <div className="flex min-h-[460px] flex-col items-center justify-center px-8 text-center">

              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#7a0719]">
                Wedding Invitation
              </p>

              <div className="my-6 h-px w-16 bg-[#c9a06b]" />


              <h3 className="font-serif text-4xl font-semibold text-[#171717]">
                {wedding.coupleNames}
              </h3>


              <p className="mt-5 text-sm text-[#817976]">
                {invitation?.message ||
                  "Together with their families"}
              </p>


              <p className="mt-6 font-serif text-xl font-semibold text-[#7a0719]">
                {wedding.date}
              </p>


              <div className="mt-3 flex items-center gap-2 text-sm text-[#817976]">

                <Clock3 size={15} />

                {wedding.time}

              </div>


              <div className="mt-3 flex items-center gap-2 text-sm text-[#817976]">

                <MapPin size={15} />

                {wedding.venue}

              </div>

            </div>

          </div>


          {/* Details */}
          <div className="flex flex-col justify-center">

            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#a29a98]">
              Your Invitation
            </p>


            <h2 className="mt-2 font-serif text-3xl font-semibold text-[#171717]">
              {wedding.coupleNames}
            </h2>


            <p className="mt-3 max-w-xl text-sm leading-6 text-[#817976]">
              {invitation?.message ||
                "Share your beautiful digital wedding invitation with your family and friends. Guests can view the invitation and access your wedding registry."}
            </p>


            {/* Details */}
            <div className="mt-7 space-y-4">

              {/* Date */}
              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f5eeee]">

                  <CalendarDays
                    size={17}
                    className="text-[#7a0719]"
                  />

                </div>


                <div>

                  <p className="text-xs text-[#a29a98]">
                    Date
                  </p>

                  <p className="text-sm font-semibold text-[#403a38]">
                    {wedding.date}
                  </p>

                </div>

              </div>


              {/* Venue */}
              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f5eeee]">

                  <MapPin
                    size={17}
                    className="text-[#7a0719]"
                  />

                </div>


                <div>

                  <p className="text-xs text-[#a29a98]">
                    Venue
                  </p>

                  <p className="text-sm font-semibold text-[#403a38]">
                    {wedding.venue}
                  </p>

                </div>

              </div>

            </div>


            {/* Actions */}
            <div className="mt-8 flex flex-wrap gap-3">

              {/* Preview */}
              <button
                type="button"
                onClick={() =>
                  setShowPreview(true)
                }
                className="flex items-center gap-2 rounded-xl border border-[#e8dfdd] px-5 py-3 text-sm font-semibold text-[#5f5755] transition hover:border-[#7a0719] hover:text-[#7a0719]"
              >
                <Eye size={16} />
                Preview
              </button>


              {/* Edit */}
              <button
                type="button"
                onClick={() => {

                  if (onEdit) {
                    onEdit(invitation);
                  }

                }}
                className="flex items-center gap-2 rounded-xl border border-[#e8dfdd] px-5 py-3 text-sm font-semibold text-[#5f5755] transition hover:border-[#7a0719] hover:text-[#7a0719]"
              >
                <Pencil size={16} />
                Edit
              </button>


              {/* Delete */}
              <button
                type="button"
                onClick={() => {

                  if (onDelete) {
                    onDelete(invitation);
                  }

                }}
                className="flex items-center gap-2 rounded-xl border border-[#ead9da] px-5 py-3 text-sm font-semibold text-[#9b2635] transition hover:border-[#9b2635] hover:bg-[#fdf3f4]"
              >
                <Trash2 size={16} />
                Delete
              </button>


              {/* Share */}
              <button
                type="button"
                onClick={handleShare}
                disabled={isSharing}
                className="flex items-center gap-2 rounded-xl bg-[#7a0719] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#650515] disabled:cursor-not-allowed disabled:opacity-60"
              >

                <Share2 size={16} />

                {isSharing
                  ? "Sharing..."
                  : shareStatus || "Share"}

              </button>

            </div>

          </div>

        </div>

      </section>


      {/* Preview Modal */}
      {showPreview && (

        <InvitationPreview
          wedding={wedding}
          invitation={invitation}
          onClose={() =>
            setShowPreview(false)
          }
        />

      )}

    </>
  );
}
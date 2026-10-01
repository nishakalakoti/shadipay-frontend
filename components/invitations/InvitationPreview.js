"use client";

import {
  CalendarDays,
  Clock3,
  MapPin,
  Heart,
  X,
} from "lucide-react";

export default function InvitationPreview({ wedding, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">

      {/* Modal */}
      <div className="relative flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-[28px] bg-white shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#eee8e8] px-6 py-4">

          <div>
            <h2 className="text-lg font-semibold text-[#171717]">
              Invitation Preview
            </h2>

            <p className="mt-0.5 text-xs text-[#817976]">
              This is how your invitation will appear to guests.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f7f3f2] text-[#625b59] transition hover:bg-[#f0e8e6] hover:text-[#7a0719]"
          >
            <X size={18} />
          </button>

        </div>

        {/* Preview Area */}
        <div className="overflow-y-auto bg-[#f7f3f2] p-6">

          <div className="mx-auto max-w-2xl overflow-hidden rounded-[24px] bg-white shadow-[0_8px_40px_rgba(60,30,30,0.10)]">

            {/* Invitation Hero */}
            <div className="relative overflow-hidden bg-gradient-to-br from-[#f8e8e6] via-[#fffafa] to-[#f2dddd] px-8 py-16 text-center sm:px-16">

              {/* Decorative circles */}
              <div className="absolute -left-20 -top-20 h-48 w-48 rounded-full bg-[#d8bfc0]/30 blur-2xl" />

              <div className="absolute -bottom-24 -right-16 h-56 w-56 rounded-full bg-[#e5c5c7]/40 blur-2xl" />

              <div className="relative">

                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm">
                  <Heart
                    size={20}
                    className="text-[#7a0719]"
                    fill="currentColor"
                  />
                </div>

                <p className="mt-6 text-xs font-semibold uppercase tracking-[0.3em] text-[#7a0719]">
                  Wedding Invitation
                </p>

                <div className="mx-auto my-6 h-px w-20 bg-[#c9a06b]" />

                <p className="text-sm text-[#817976]">
                  Together with their families
                </p>

                <h1 className="mt-5 font-serif text-4xl font-semibold tracking-tight text-[#171717] sm:text-5xl">
                  {wedding.coupleNames}
                </h1>

                <p className="mx-auto mt-5 max-w-md text-sm leading-6 text-[#817976]">
                  We invite you to celebrate this beautiful occasion
                  and share our happiness with us.
                </p>

              </div>

            </div>

            {/* Details */}
            <div className="px-8 py-10 text-center sm:px-16">

              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#a29a98]">
                Save The Date
              </p>

              <h2 className="mt-3 font-serif text-2xl font-semibold text-[#7a0719]">
                {wedding.date}
              </h2>

              <div className="mx-auto mt-7 grid max-w-md gap-4 sm:grid-cols-2">

                {/* Time */}
                <div className="rounded-2xl bg-[#faf8f7] p-5">

                  <Clock3
                    size={20}
                    className="mx-auto text-[#7a0719]"
                  />

                  <p className="mt-2 text-xs text-[#a29a98]">
                    Time
                  </p>

                  <p className="mt-1 text-sm font-semibold text-[#403a38]">
                    {wedding.time}
                  </p>

                </div>

                {/* Venue */}
                <div className="rounded-2xl bg-[#faf8f7] p-5">

                  <MapPin
                    size={20}
                    className="mx-auto text-[#7a0719]"
                  />

                  <p className="mt-2 text-xs text-[#a29a98]">
                    Venue
                  </p>

                  <p className="mt-1 text-sm font-semibold text-[#403a38]">
                    {wedding.venue}
                  </p>

                </div>

              </div>

              {/* Message */}
              <div className="mx-auto mt-10 max-w-lg border-t border-[#eee8e8] pt-8">

                <p className="font-serif text-lg italic text-[#625b59]">
                  &quot;Your presence is the greatest gift we could ask for.&quot;
                </p>

                <p className="mt-4 text-xs font-semibold uppercase tracking-[0.15em] text-[#7a0719]">
                  With Love
                </p>

                <p className="mt-2 font-serif text-xl font-semibold text-[#171717]">
                  {wedding.coupleNames}
                </p>

              </div>

            </div>

            {/* Registry */}
            <div className="border-t border-[#eee8e8] bg-[#faf8f7] px-8 py-8 text-center">

              <p className="text-sm font-semibold text-[#403a38]">
                Wedding Registry
              </p>

              <p className="mx-auto mt-2 max-w-md text-xs leading-5 text-[#817976]">
                You can send your blessings, gifts and contributions
                through our wedding registry.
              </p>

              <button
                type="button"
                className="mt-5 rounded-xl bg-[#7a0719] px-5 py-3 text-xs font-semibold text-white"
              >
                View Wedding Registry
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
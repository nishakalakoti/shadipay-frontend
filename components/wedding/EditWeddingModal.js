"use client";

import { useEffect, useState } from "react";
import {
  X,
  CalendarDays,
  MapPin,
} from "lucide-react";

import { useUpdateWedding } from "@/hooks/useWeddings";


export default function EditWeddingModal({
  isOpen,
  onClose,
  wedding,
  onSave,
}) {

  // =====================================================
  // FORM STATE
  // =====================================================

  const [formData, setFormData] = useState({
    partnerOne: "",
    partnerTwo: "",
    weddingDate: "",
    venue: "",
  });


  // =====================================================
  // UPDATE WEDDING API
  // PATCH /api/weddings/{wedding_id}
  // =====================================================

  const {
    mutate: updateWedding,
    isPending: isUpdating,
    isError: isUpdateError,
    error: updateError,
  } = useUpdateWedding();


  // =====================================================
  // SET FORM DATA
  // =====================================================

  useEffect(() => {
    if (!wedding) {
      return;
    }

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setFormData({
      partnerOne: wedding.first_partner || "",
      partnerTwo: wedding.second_partner || "",
      weddingDate: wedding.wedding_date || "",
      venue: wedding.wedding_venue || "",
    });

  }, [wedding]);


  // =====================================================
  // CLOSE MODAL
  // =====================================================

  if (!isOpen || !wedding) {
    return null;
  }


  // =====================================================
  // HANDLE INPUT CHANGE
  // =====================================================

  const handleChange = (e) => {
    const {
      name,
      value,
    } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  // =====================================================
  // HANDLE SUBMIT
  // PATCH /api/weddings/{wedding_id}
  // =====================================================

  const handleSubmit = (e) => {
    e.preventDefault();

    const weddingData = {
      first_partner: formData.partnerOne,
      second_partner: formData.partnerTwo,
      wedding_date: formData.weddingDate,
      wedding_venue: formData.venue,
    };


    updateWedding(
      {
        weddingId: wedding.id,
        weddingData,
      },
      {
        onSuccess: (updatedWedding) => {

          // Send updated wedding back to parent
          onSave(updatedWedding);

        },
      }
    );
  };


  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-4 backdrop-blur-[2px]">

      <div className="w-full max-w-[520px] overflow-hidden rounded-[24px] bg-white shadow-[0_20px_60px_rgba(0,0,0,0.18)]">

        {/* =================================================
            HEADER
        ================================================== */}

        <div className="flex items-center justify-between border-b border-[#eee8e8] px-6 py-5">

          <div>

            <h2 className="text-lg font-semibold text-[#171717]">
              Edit Wedding
            </h2>

            <p className="mt-1 text-sm text-[#817976]">
              Update your wedding details.
            </p>

          </div>


          <button
            type="button"
            onClick={onClose}
            disabled={isUpdating}
            className="flex h-9 w-9 items-center justify-center rounded-full text-[#817976] hover:bg-[#f7f3f2] hover:text-[#7a0719] disabled:cursor-not-allowed disabled:opacity-50"
          >

            <X size={18} />

          </button>

        </div>


        {/* =================================================
            FORM
        ================================================== */}

        <form onSubmit={handleSubmit}>

          <div className="space-y-5 px-6 py-6">

            {/* =================================================
                NAMES
            ================================================== */}

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

              {/* First Partner */}

              <div>

                <label className="mb-2 block text-sm font-medium text-[#403a38]">
                  First Partner
                </label>

                <input
                  type="text"
                  name="partnerOne"
                  value={formData.partnerOne}
                  onChange={handleChange}
                  disabled={isUpdating}
                  className="h-11 w-full rounded-xl border border-[#e8dfdd] px-4 text-sm outline-none focus:border-[#7a0719] disabled:cursor-not-allowed disabled:bg-[#f7f4f3]"
                />

              </div>


              {/* Second Partner */}

              <div>

                <label className="mb-2 block text-sm font-medium text-[#403a38]">
                  Second Partner
                </label>

                <input
                  type="text"
                  name="partnerTwo"
                  value={formData.partnerTwo}
                  onChange={handleChange}
                  disabled={isUpdating}
                  className="h-11 w-full rounded-xl border border-[#e8dfdd] px-4 text-sm outline-none focus:border-[#7a0719] disabled:cursor-not-allowed disabled:bg-[#f7f4f3]"
                />

              </div>

            </div>


            {/* =================================================
                WEDDING DATE
            ================================================== */}

            <div>

              <label className="mb-2 block text-sm font-medium text-[#403a38]">
                Wedding Date
              </label>

              <div className="relative">

                <CalendarDays
                  size={17}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#928a87]"
                />

                <input
                  type="date"
                  name="weddingDate"
                  value={formData.weddingDate}
                  onChange={handleChange}
                  disabled={isUpdating}
                  className="h-11 w-full rounded-xl border border-[#e8dfdd] pl-11 pr-4 text-sm outline-none focus:border-[#7a0719] disabled:cursor-not-allowed disabled:bg-[#f7f4f3]"
                />

              </div>

            </div>


            {/* =================================================
                VENUE
            ================================================== */}

            <div>

              <label className="mb-2 block text-sm font-medium text-[#403a38]">
                Wedding Venue
              </label>

              <div className="relative">

                <MapPin
                  size={17}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#928a87]"
                />

                <input
                  type="text"
                  name="venue"
                  value={formData.venue}
                  onChange={handleChange}
                  disabled={isUpdating}
                  className="h-11 w-full rounded-xl border border-[#e8dfdd] pl-11 pr-4 text-sm outline-none focus:border-[#7a0719] disabled:cursor-not-allowed disabled:bg-[#f7f4f3]"
                />

              </div>

            </div>


            {/* =================================================
                API ERROR
            ================================================== */}

            {isUpdateError && (

              <p className="text-sm text-red-600">
                {updateError?.message ||
                  "Failed to update wedding."}
              </p>

            )}

          </div>


          {/* =================================================
              FOOTER
          ================================================== */}

          <div className="flex justify-end gap-3 border-t border-[#eee8e8] bg-[#fcfaf9] px-6 py-4">

            {/* Cancel */}

            <button
              type="button"
              onClick={onClose}
              disabled={isUpdating}
              className="rounded-xl border border-[#e8dfdd] bg-white px-5 py-2.5 text-sm font-semibold text-[#625b59] disabled:cursor-not-allowed disabled:opacity-50"
            >
              Cancel
            </button>


            {/* Save Changes */}

            <button
              type="submit"
              disabled={isUpdating}
              className="rounded-xl bg-[#7a0719] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#650515] disabled:cursor-not-allowed disabled:opacity-60"
            >

              {isUpdating
                ? "Saving..."
                : "Save Changes"}

            </button>

          </div>

        </form>

      </div>

    </div>
  );
}
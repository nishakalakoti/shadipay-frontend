"use client";

import { useState } from "react";
import {
  X,
  CalendarDays,
  MapPin,
  Heart,
} from "lucide-react";

import { useCreateWedding } from "@/hooks/useWeddings";


export default function CreateWeddingModal({
  isOpen,
  onClose,
  onCreate,
}) {
  const [formData, setFormData] = useState({
    partnerOne: "",
    partnerTwo: "",
    weddingDate: "",
    venue: "",
  });

  const [errors, setErrors] = useState({});


  // =====================================================
  // CREATE WEDDING MUTATION
  // =====================================================

  const {
    mutateAsync: createWedding,
    isPending,
    isError,
    error,
  } = useCreateWedding();


  if (!isOpen) {
    return null;
  }


  // =====================================================
  // HANDLE INPUT CHANGE
  // =====================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };


  // =====================================================
  // VALIDATE FORM
  // =====================================================

  const validateForm = () => {
    const newErrors = {};

    if (!formData.partnerOne.trim()) {
      newErrors.partnerOne =
        "Please enter first partner name.";
    }

    if (!formData.partnerTwo.trim()) {
      newErrors.partnerTwo =
        "Please enter second partner name.";
    }

    if (!formData.weddingDate) {
      newErrors.weddingDate =
        "Please select wedding date.";
    }

    if (!formData.venue.trim()) {
      newErrors.venue =
        "Please enter wedding venue.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };


  // =====================================================
  // HANDLE SUBMIT
  // =====================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValid = validateForm();

    if (!isValid) {
      return;
    }


    // ===================================================
    // DATA FOR BACKEND
    // ===================================================

    const weddingData = {
      first_partner: formData.partnerOne.trim(),
      second_partner: formData.partnerTwo.trim(),
      wedding_date: formData.weddingDate,
      wedding_venue: formData.venue.trim(),
    };


    try {
      // ================================================
      // POST /api/weddings
      // ================================================

      const createdWedding =
        await createWedding(weddingData);


      // ================================================
      // SEND CREATED WEDDING TO PARENT
      // ================================================

      onCreate(createdWedding);


      // ================================================
      // RESET FORM
      // ================================================

      setFormData({
        partnerOne: "",
        partnerTwo: "",
        weddingDate: "",
        venue: "",
      });

      setErrors({});

    } catch (submitError) {
      console.error(
        "Failed to create wedding:",
        submitError
      );
    }
  };


  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-4 backdrop-blur-[2px]">

      {/* =================================================
          MODAL
      ================================================== */}

      <div className="w-full max-w-[520px] overflow-hidden rounded-[24px] bg-white shadow-[0_20px_60px_rgba(0,0,0,0.18)]">

        {/* =================================================
            HEADER
        ================================================== */}

        <div className="flex items-start justify-between border-b border-[#eee8e8] px-6 py-5">

          <div>

            <div className="flex items-center gap-2">

              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f5eeee]">

                <Heart
                  size={17}
                  className="text-[#7a0719]"
                />

              </div>

              <h2 className="text-lg font-semibold text-[#171717]">
                Create Wedding
              </h2>

            </div>

            <p className="mt-2 text-sm text-[#817976]">
              Create your wedding registry and start receiving gifts.
            </p>

          </div>


          <button
            type="button"
            onClick={onClose}
            disabled={isPending}
            className="flex h-9 w-9 items-center justify-center rounded-full text-[#817976] transition hover:bg-[#f7f3f2] hover:text-[#7a0719] disabled:cursor-not-allowed disabled:opacity-50"
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
                PARTNER NAMES
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
                  placeholder="e.g. Rahul"
                  disabled={isPending}
                  className="h-11 w-full rounded-xl border border-[#e8dfdd] bg-white px-4 text-sm text-[#302b29] outline-none transition placeholder:text-[#aaa19e] focus:border-[#7a0719] disabled:cursor-not-allowed disabled:bg-[#faf8f7]"
                />

                {errors.partnerOne && (
                  <p className="mt-1.5 text-xs text-[#b42318]">
                    {errors.partnerOne}
                  </p>
                )}

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
                  placeholder="e.g. Priya"
                  disabled={isPending}
                  className="h-11 w-full rounded-xl border border-[#e8dfdd] bg-white px-4 text-sm text-[#302b29] outline-none transition placeholder:text-[#aaa19e] focus:border-[#7a0719] disabled:cursor-not-allowed disabled:bg-[#faf8f7]"
                />

                {errors.partnerTwo && (
                  <p className="mt-1.5 text-xs text-[#b42318]">
                    {errors.partnerTwo}
                  </p>
                )}

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
                  disabled={isPending}
                  className="h-11 w-full rounded-xl border border-[#e8dfdd] bg-white pl-11 pr-4 text-sm text-[#302b29] outline-none transition focus:border-[#7a0719] disabled:cursor-not-allowed disabled:bg-[#faf8f7]"
                />

              </div>

              {errors.weddingDate && (
                <p className="mt-1.5 text-xs text-[#b42318]">
                  {errors.weddingDate}
                </p>
              )}

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
                  placeholder="e.g. Grand Palace, Dehradun"
                  disabled={isPending}
                  className="h-11 w-full rounded-xl border border-[#e8dfdd] bg-white pl-11 pr-4 text-sm text-[#302b29] outline-none transition placeholder:text-[#aaa19e] focus:border-[#7a0719] disabled:cursor-not-allowed disabled:bg-[#faf8f7]"
                />

              </div>

              {errors.venue && (
                <p className="mt-1.5 text-xs text-[#b42318]">
                  {errors.venue}
                </p>
              )}

            </div>


            {/* =================================================
                API ERROR
            ================================================== */}

            {isError && (
              <p className="text-sm text-[#b42318]">
                {error?.message ||
                  "Failed to create wedding."}
              </p>
            )}

          </div>


          {/* =================================================
              FOOTER
          ================================================== */}

          <div className="flex items-center justify-end gap-3 border-t border-[#eee8e8] bg-[#fcfaf9] px-6 py-4">

            <button
              type="button"
              onClick={onClose}
              disabled={isPending}
              className="rounded-xl border border-[#e8dfdd] bg-white px-5 py-2.5 text-sm font-semibold text-[#625b59] transition hover:border-[#7a0719] hover:text-[#7a0719] disabled:cursor-not-allowed disabled:opacity-50"
            >
              Cancel
            </button>


            <button
              type="submit"
              disabled={isPending}
              className="rounded-xl bg-[#7a0719] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#650515] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isPending
                ? "Creating..."
                : "Create Wedding"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}
"use client";

import { useEffect, useState } from "react";
import {
  X,
  UserRound,
  Phone,
  Mail,
  Users,
  CalendarCheck,
} from "lucide-react";

export default function EditGuestModal({
  isOpen,
  onClose,
  guest,
  onSave,
  isLoading = false,
}) {
  const [formData, setFormData] = useState({
    guest_name: "",
    phone: "",
    email: "",
    relation: "",
    rsvp_status: "Pending",
  });

  const [errors, setErrors] = useState({});

  // =====================================================
  // LOAD SELECTED GUEST DATA
  // =====================================================

  useEffect(() => {
    if (guest) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFormData({
        guest_name: guest.guest_name || "",
        phone: guest.phone || "",
        email: guest.email || "",
        relation: guest.relation || "",
        rsvp_status: guest.rsvp_status || "Pending",
      });

      // eslint-disable-next-line react-hooks/set-state-in-effect
      setErrors({});
    }
  }, [guest]);

  if (!isOpen || !guest) {
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

    if (!formData.guest_name.trim()) {
      newErrors.guest_name =
        "Please enter guest name.";
    }

    if (!formData.phone.trim()) {
      newErrors.phone =
        "Please enter phone number.";
    } else if (
      formData.phone.trim().length < 7
    ) {
      newErrors.phone =
        "Please enter a valid phone number.";
    }

    if (!formData.email.trim()) {
      newErrors.email =
        "Please enter email.";
    }

    if (!formData.relation.trim()) {
      newErrors.relation =
        "Please enter relation.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // =====================================================
  // HANDLE SUBMIT
  // =====================================================

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const updatedGuest = {
      guest_name: formData.guest_name.trim(),
      phone: formData.phone.trim(),
      email: formData.email.trim(),
      relation: formData.relation.trim(),
      rsvp_status: formData.rsvp_status,
    };

    onSave(updatedGuest);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-4 backdrop-blur-[2px]">

      {/* =================================================
          MODAL
      ================================================== */}

      <div className="w-full max-w-[560px] overflow-hidden rounded-[24px] bg-white shadow-[0_20px_60px_rgba(0,0,0,0.18)]">

        {/* =================================================
            HEADER
        ================================================== */}

        <div className="flex items-start justify-between border-b border-[#eee8e8] px-6 py-5">

          <div>

            <div className="flex items-center gap-2">

              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f5eeee]">

                <UserRound
                  size={17}
                  className="text-[#7a0719]"
                />

              </div>

              <h2 className="text-lg font-semibold text-[#171717]">
                Edit Guest
              </h2>

            </div>

            <p className="mt-2 text-sm text-[#817976]">
              Update guest details and RSVP information.
            </p>

          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
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
                GUEST NAME
            ================================================== */}

            <div>

              <label className="mb-2 block text-sm font-medium text-[#403a38]">
                Guest Name
              </label>

              <div className="relative">

                <UserRound
                  size={17}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#928a87]"
                />

                <input
                  type="text"
                  name="guest_name"
                  value={formData.guest_name}
                  onChange={handleChange}
                  disabled={isLoading}
                  className="h-11 w-full rounded-xl border border-[#e8dfdd] bg-white pl-11 pr-4 text-sm text-[#302b29] outline-none transition placeholder:text-[#aaa19e] focus:border-[#7a0719] disabled:bg-[#faf8f7]"
                />

              </div>

              {errors.guest_name && (
                <p className="mt-1.5 text-xs text-[#b42318]">
                  {errors.guest_name}
                </p>
              )}

            </div>

            {/* =================================================
                PHONE + EMAIL
            ================================================== */}

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

              <div>

                <label className="mb-2 block text-sm font-medium text-[#403a38]">
                  Phone
                </label>

                <div className="relative">

                  <Phone
                    size={17}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#928a87]"
                  />

                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    disabled={isLoading}
                    className="h-11 w-full rounded-xl border border-[#e8dfdd] bg-white pl-11 pr-4 text-sm text-[#302b29] outline-none transition focus:border-[#7a0719] disabled:bg-[#faf8f7]"
                  />

                </div>

                {errors.phone && (
                  <p className="mt-1.5 text-xs text-[#b42318]">
                    {errors.phone}
                  </p>
                )}

              </div>

              <div>

                <label className="mb-2 block text-sm font-medium text-[#403a38]">
                  Email
                </label>

                <div className="relative">

                  <Mail
                    size={17}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#928a87]"
                  />

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={isLoading}
                    className="h-11 w-full rounded-xl border border-[#e8dfdd] bg-white pl-11 pr-4 text-sm text-[#302b29] outline-none transition focus:border-[#7a0719] disabled:bg-[#faf8f7]"
                  />

                </div>

                {errors.email && (
                  <p className="mt-1.5 text-xs text-[#b42318]">
                    {errors.email}
                  </p>
                )}

              </div>

            </div>

            {/* =================================================
                RELATION + RSVP
            ================================================== */}

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

              <div>

                <label className="mb-2 block text-sm font-medium text-[#403a38]">
                  Relation
                </label>

                <div className="relative">

                  <Users
                    size={17}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#928a87]"
                  />

                  <input
                    type="text"
                    name="relation"
                    value={formData.relation}
                    onChange={handleChange}
                    disabled={isLoading}
                    className="h-11 w-full rounded-xl border border-[#e8dfdd] bg-white pl-11 pr-4 text-sm text-[#302b29] outline-none transition focus:border-[#7a0719] disabled:bg-[#faf8f7]"
                  />

                </div>

                {errors.relation && (
                  <p className="mt-1.5 text-xs text-[#b42318]">
                    {errors.relation}
                  </p>
                )}

              </div>

              <div>

                <label className="mb-2 block text-sm font-medium text-[#403a38]">
                  RSVP Status
                </label>

                <div className="relative">

                  <CalendarCheck
                    size={17}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#928a87]"
                  />

                  <select
                    name="rsvp_status"
                    value={formData.rsvp_status}
                    onChange={handleChange}
                    disabled={isLoading}
                    className="h-11 w-full appearance-none rounded-xl border border-[#e8dfdd] bg-white pl-11 pr-4 text-sm text-[#302b29] outline-none transition focus:border-[#7a0719] disabled:bg-[#faf8f7]"
                  >
                    <option value="Pending">
                      Pending
                    </option>

                    <option value="Attending">
                      Attending
                    </option>

                    <option value="Declined">
                      Declined
                    </option>
                  </select>

                </div>

              </div>

            </div>

          </div>

          {/* =================================================
              FOOTER
          ================================================== */}

          <div className="flex items-center justify-end gap-3 border-t border-[#eee8e8] bg-[#fcfaf9] px-6 py-4">

            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="rounded-xl border border-[#e8dfdd] bg-white px-5 py-2.5 text-sm font-semibold text-[#625b59] transition hover:border-[#7a0719] hover:text-[#7a0719] disabled:cursor-not-allowed disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isLoading}
              className="rounded-xl bg-[#7a0719] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#650515] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoading
                ? "Saving..."
                : "Save Changes"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}
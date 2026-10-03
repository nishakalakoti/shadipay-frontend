"use client";

import { useEffect, useState } from "react";

import { UserRound } from "lucide-react";


export default function ProfileSettings({
  profile,
  onSave,
}) {

  const [form, setForm] = useState(profile);


  // =====================================================
  // UPDATE WHEN FIREBASE PROFILE LOADS
  // =====================================================

  useEffect(() => {

    setForm(profile);

  }, [profile]);


  // =====================================================
  // INPUT CHANGE
  // =====================================================

  const handleChange = (event) => {

    const {
      name,
      value,
    } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

  };


  // =====================================================
  // SUBMIT
  // =====================================================

  const handleSubmit = (event) => {

    event.preventDefault();

    onSave(form);

  };


  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5"
    >

      {/* =================================================
          PROFILE HEADER
      ================================================== */}

      <div className="flex items-center gap-4">

        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#f5eeee]">

          <UserRound
            size={23}
            className="text-[#7a0719]"
          />

        </div>


        <div>

          <p className="text-sm font-semibold text-[#403a38]">
            Profile Information
          </p>

          <p className="mt-1 text-xs text-[#817976]">
            This information belongs to your ShadiPay account.
          </p>

        </div>

      </div>


      {/* =================================================
          FORM
      ================================================== */}

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">


        {/* NAME */}

        <div>

          <label className="mb-2 block text-sm font-medium text-[#403a38]">
            Full Name
          </label>

          <input
            name="name"
            value={form.name || ""}
            onChange={handleChange}
            placeholder="Your name"
            className="
              w-full
              rounded-xl
              border
              border-[#e8dfdd]
              px-4
              py-3
              text-sm
              outline-none
              focus:border-[#7a0719]
            "
          />

        </div>


        {/* EMAIL */}

        <div>

          <label className="mb-2 block text-sm font-medium text-[#403a38]">
            Email
          </label>

          <input
            type="email"
            name="email"
            value={form.email || ""}
            readOnly
            className="
              w-full
              cursor-not-allowed
              rounded-xl
              border
              border-[#e8dfdd]
              bg-[#faf8f7]
              px-4
              py-3
              text-sm
              text-[#625b59]
              outline-none
            "
          />

          <p className="mt-1 text-xs text-[#9a9290]">
            Email is managed by Firebase Authentication.
          </p>

        </div>


        {/* PHONE */}

        <div>

          <label className="mb-2 block text-sm font-medium text-[#403a38]">
            Phone Number
          </label>

          <input
            name="phone"
            value={form.phone || ""}
            onChange={handleChange}
            placeholder="Phone number"
            className="
              w-full
              rounded-xl
              border
              border-[#e8dfdd]
              px-4
              py-3
              text-sm
              outline-none
              focus:border-[#7a0719]
            "
          />

        </div>

      </div>


      {/* =================================================
          SAVE
      ================================================== */}

      <div className="flex justify-end">

        <button
          type="submit"
          className="
            rounded-xl
            bg-[#7a0719]
            px-5
            py-3
            text-sm
            font-semibold
            text-white
            hover:bg-[#650515]
          "
        >
          Save Changes
        </button>

      </div>

    </form>
  );
}
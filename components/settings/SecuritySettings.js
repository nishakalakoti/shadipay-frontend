"use client";

import { useState } from "react";

import {
  LockKeyhole,
  Eye,
  EyeOff,
} from "lucide-react";

import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
} from "firebase/auth";

import { auth } from "@/lib/firebase";


export default function SecuritySettings() {

  const [showPasswordForm, setShowPasswordForm] =
    useState(false);

  const [showCurrentPassword, setShowCurrentPassword] =
    useState(false);

  const [showNewPassword, setShowNewPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);


  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });


  const [isLoading, setIsLoading] =
    useState(false);

  const [error, setError] =
    useState("");


  // =====================================================
  // INPUT CHANGE
  // =====================================================

  const handleChange = (event) => {

    const {
      name,
      value,
    } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setError("");

  };


  // =====================================================
  // CHANGE PASSWORD
  // =====================================================

  const handleSubmit = async (event) => {

    event.preventDefault();

    setError("");


    const {
      currentPassword,
      newPassword,
      confirmPassword,
    } = formData;


    // ===================================================
    // VALIDATION
    // ===================================================

    if (!currentPassword) {

      setError(
        "Please enter your current password."
      );

      return;
    }


    if (!newPassword) {

      setError(
        "Please enter a new password."
      );

      return;
    }


    if (newPassword.length < 6) {

      setError(
        "New password must be at least 6 characters."
      );

      return;
    }


    if (newPassword !== confirmPassword) {

      setError(
        "New password and confirm password do not match."
      );

      return;
    }


    if (currentPassword === newPassword) {

      setError(
        "New password must be different from your current password."
      );

      return;
    }


    // ===================================================
    // CURRENT USER
    // ===================================================

    const user = auth.currentUser;


    if (!user) {

      setError(
        "User is not logged in."
      );

      return;
    }


    if (!user.email) {

      setError(
        "Email authentication is not available for this account."
      );

      return;
    }


    try {

      setIsLoading(true);


      // =================================================
      // RE-AUTHENTICATE USER
      // =================================================

      const credential =
        EmailAuthProvider.credential(
          user.email,
          currentPassword
        );


      await reauthenticateWithCredential(
        user,
        credential
      );


      // =================================================
      // UPDATE FIREBASE PASSWORD
      // =================================================

      await updatePassword(
        user,
        newPassword
      );


      // =================================================
      // SUCCESS
      // =================================================

      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

      setShowPasswordForm(false);

      setError("");

      alert(
        "Password updated successfully!"
      );


    } catch (error) {

      console.error(
        "Failed to update password:",
        error
      );


      // Firebase errors
      if (
        error?.code ===
        "auth/invalid-credential"
      ) {

        setError(
          "Current password is incorrect."
        );

      } else if (
        error?.code ===
        "auth/wrong-password"
      ) {

        setError(
          "Current password is incorrect."
        );

      } else if (
        error?.code ===
        "auth/weak-password"
      ) {

        setError(
          "New password is too weak."
        );

      } else if (
        error?.code ===
        "auth/requires-recent-login"
      ) {

        setError(
          "Please login again and then change your password."
        );

      } else {

        setError(
          error?.message ||
          "Failed to update password."
        );

      }

    } finally {

      setIsLoading(false);

    }

  };


  // =====================================================
  // PASSWORD EYE BUTTON
  // =====================================================

  const PasswordToggle = ({
    show,
    setShow,
  }) => {

    return (
      <button
        type="button"
        onClick={() => setShow((previous) => !previous)}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-[#817976] hover:text-[#7a0719]"
      >

        {show ? (
          <EyeOff size={18} />
        ) : (
          <Eye size={18} />
        )}

      </button>
    );

  };


  return (
    <div>

      {/* =================================================
          SECURITY HEADER
      ================================================== */}

      <div className="flex items-center justify-between">

        <div className="flex items-center gap-3">

          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f5eeee]">

            <LockKeyhole
              size={17}
              className="text-[#7a0719]"
            />

          </div>


          <div>

            <p className="text-sm font-semibold text-[#403a38]">
              Password & Security
            </p>

            <p className="mt-1 text-xs text-[#817976]">
              Keep your ShadiPay account secure.
            </p>

          </div>

        </div>


        {/* CHANGE PASSWORD BUTTON */}

        <button
          type="button"
          onClick={() =>
            setShowPasswordForm(
              (previous) => !previous
            )
          }
          className="
            rounded-xl
            border
            border-[#e8dfdd]
            px-4
            py-2.5
            text-sm
            font-semibold
            text-[#625b59]
            hover:border-[#7a0719]
            hover:text-[#7a0719]
          "
        >
          {showPasswordForm
            ? "Cancel"
            : "Change Password"}
        </button>

      </div>


      {/* =================================================
          PASSWORD FORM
      ================================================== */}

      {showPasswordForm && (

        <form
          onSubmit={handleSubmit}
          className="mt-6 grid gap-4 border-t border-[#eee8e8] pt-6"
        >


          {/* CURRENT PASSWORD */}

          <div className="relative">

            <input
              type={
                showCurrentPassword
                  ? "text"
                  : "password"
              }
              name="currentPassword"
              value={
                formData.currentPassword
              }
              onChange={handleChange}
              placeholder="Current password"
              disabled={isLoading}
              className="
                w-full
                rounded-xl
                border
                border-[#e8dfdd]
                px-4
                py-3
                pr-12
                text-sm
                outline-none
                focus:border-[#7a0719]
                disabled:bg-gray-50
              "
            />

            <PasswordToggle
              show={showCurrentPassword}
              setShow={setShowCurrentPassword}
            />

          </div>


          {/* NEW PASSWORD */}

          <div className="relative">

            <input
              type={
                showNewPassword
                  ? "text"
                  : "password"
              }
              name="newPassword"
              value={
                formData.newPassword
              }
              onChange={handleChange}
              placeholder="New password"
              disabled={isLoading}
              className="
                w-full
                rounded-xl
                border
                border-[#e8dfdd]
                px-4
                py-3
                pr-12
                text-sm
                outline-none
                focus:border-[#7a0719]
                disabled:bg-gray-50
              "
            />

            <PasswordToggle
              show={showNewPassword}
              setShow={setShowNewPassword}
            />

          </div>


          {/* CONFIRM PASSWORD */}

          <div className="relative">

            <input
              type={
                showConfirmPassword
                  ? "text"
                  : "password"
              }
              name="confirmPassword"
              value={
                formData.confirmPassword
              }
              onChange={handleChange}
              placeholder="Confirm new password"
              disabled={isLoading}
              className="
                w-full
                rounded-xl
                border
                border-[#e8dfdd]
                px-4
                py-3
                pr-12
                text-sm
                outline-none
                focus:border-[#7a0719]
                disabled:bg-gray-50
              "
            />

            <PasswordToggle
              show={showConfirmPassword}
              setShow={setShowConfirmPassword}
            />

          </div>


          {/* ERROR */}

          {error && (

            <div className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>

          )}


          {/* UPDATE BUTTON */}

          <div className="flex justify-end">

            <button
              type="submit"
              disabled={isLoading}
              className="
                rounded-xl
                bg-[#7a0719]
                px-5
                py-3
                text-sm
                font-semibold
                text-white
                hover:bg-[#650515]
                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >

              {isLoading
                ? "Updating..."
                : "Update Password"}

            </button>

          </div>

        </form>

      )}

    </div>
  );
}
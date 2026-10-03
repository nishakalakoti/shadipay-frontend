"use client";

import { useEffect, useState } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import SettingsSection from "@/components/settings/SettingsSection";
import ProfileSettings from "@/components/settings/ProfileSettings";
import SecuritySettings from "@/components/settings/SecuritySettings";
import DangerZone from "@/components/settings/DangerZone";

import { useWeddings, useDeleteWedding } from "@/hooks/useWeddings";

import { auth } from "@/lib/firebase";


export default function SettingsPage() {

  // =====================================================
  // PROFILE
  // =====================================================

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
  });


  // =====================================================
  // NOTIFICATIONS
  // =====================================================

  const [notifications, setNotifications] = useState({
    payments: true,
    gifts: true,
    guests: true,
    invitations: true,
  });


  // =====================================================
  // GET WEDDINGS
  // =====================================================

  const {
    data: weddings = [],
    isLoading: isWeddingsLoading,
    isError: isWeddingsError,
    error: weddingsError,
  } = useWeddings();


  // =====================================================
  // DELETE WEDDING
  // =====================================================

  const {
    mutate: deleteWedding,
    isPending: isDeletePending,
  } = useDeleteWedding();


  // =====================================================
  // GET FIREBASE USER
  // =====================================================

  useEffect(() => {

    const user = auth.currentUser;

    if (!user) {
      return;
    }

    setProfile({
      name: user.displayName || "",
      email: user.email || "",
      phone: user.phoneNumber || "",
    });

  }, []);


  // =====================================================
  // SELECT WEDDING
  // =====================================================

  const selectedWedding =
    weddings.length > 0
      ? weddings[0]
      : null;


  // =====================================================
  // PROFILE SAVE
  // =====================================================

  const handleProfileSave = (data) => {

    setProfile(data);

    toast.success(
      "Profile updated successfully!"
    );

  };


  // =====================================================
  // NOTIFICATION CHANGE
  // =====================================================

  const handleNotificationChange = (
    name,
    value
  ) => {

    setNotifications((previous) => ({
      ...previous,
      [name]: value,
    }));

  };


  // =====================================================
  // DELETE WEDDING
  // =====================================================

  const handleDeleteWedding = (
    wedding
  ) => {

    if (!wedding?.id) {
      toast.error(
        "Wedding ID not found."
      );

      return;
    }


    deleteWedding(wedding.id, {

      onSuccess: () => {

        toast.success(
          "Wedding deleted successfully!"
        );

      },

      onError: (error) => {

        toast.error(
          error?.message ||
          "Failed to delete wedding."
        );

      },

    });

  };


  return (
    <main className="p-8">

      {/* =================================================
          PAGE HEADER
      ================================================== */}

      <div className="mb-8">

        <h1 className="text-3xl font-semibold text-[#171717]">
          Settings
        </h1>

        <p className="mt-1 text-sm text-[#77706e]">
          Manage your account, wedding and preferences.
        </p>

      </div>


      {/* =================================================
          SETTINGS CONTENT
      ================================================== */}

      <div className="max-w-5xl space-y-6">


        {/* =================================================
            PROFILE
        ================================================== */}

        <SettingsSection
          title="Profile"
          description="Manage your personal account information."
        >

          <ProfileSettings
            profile={profile}
            onSave={handleProfileSave}
          />

        </SettingsSection>


        {/* =================================================
            SECURITY
        ================================================== */}

        <SettingsSection
          title="Security"
          description="Manage your password and account security."
        >

          <SecuritySettings />

        </SettingsSection>


        {/* =================================================
            DANGER ZONE
        ================================================== */}

        <DangerZone
          wedding={selectedWedding}
          isLoading={isWeddingsLoading}
          isDeletePending={isDeletePending}
          isError={isWeddingsError}
          error={weddingsError}
          onDelete={handleDeleteWedding}
        />


      </div>


      {/* =================================================
          TOAST
      ================================================== */}

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
      />

    </main>
  );
}
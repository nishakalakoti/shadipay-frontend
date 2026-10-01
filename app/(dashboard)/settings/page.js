"use client";

import { useState } from "react";

import SettingsSection from "@/components/settings/SettingsSection";
import ProfileSettings from "@/components/settings/ProfileSettings";
import WeddingSettings from "@/components/settings/WeddingSettings";
import NotificationSettings from "@/components/settings/NotificationSettings";
import SecuritySettings from "@/components/settings/SecuritySettings";
import DangerZone from "@/components/settings/DangerZone";


const initialProfile = {
  name: "Rahul Sharma",
  email: "rahul@example.com",
  phone: "+91 98765 43210",
};


const initialWedding = {
  coupleNames: "Rahul & Priya",
  date: "25 December 2026",
  venue: "Dehradun, Uttarakhand",
  registryUrl: "shadipay.com/r/rahul-priya",
};


export default function SettingsPage() {
  const [profile, setProfile] =
    useState(initialProfile);

  const [wedding, setWedding] =
    useState(initialWedding);

  const [notifications, setNotifications] =
    useState({
      payments: true,
      gifts: true,
      guests: true,
      invitations: true,
    });


  // =====================================================
  // PROFILE SAVE
  // =====================================================

  const handleProfileSave = (data) => {
    setProfile(data);
  };


  // =====================================================
  // WEDDING SAVE
  // =====================================================

  const handleWeddingSave = (data) => {
    setWedding(data);
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
            WEDDING
        ================================================== */}

        <SettingsSection
          title="Wedding Details"
          description="Update the information displayed on your wedding registry."
        >
          <WeddingSettings
            wedding={wedding}
            onSave={handleWeddingSave}
          />
        </SettingsSection>


        {/* =================================================
            NOTIFICATIONS
        ================================================== */}

        <SettingsSection
          title="Notifications"
          description="Choose which wedding activities you want to be notified about."
        >
          <NotificationSettings
            settings={notifications}
            onChange={
              handleNotificationChange
            }
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

        <DangerZone />

      </div>

    </main>
  );
}
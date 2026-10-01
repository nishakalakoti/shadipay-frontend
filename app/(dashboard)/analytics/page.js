"use client";

import { useEffect, useMemo, useState } from "react";

import AnalyticsStats from "@/components/analytics/AnalyticsStats";
import PaymentChart from "@/components/analytics/PaymentChart";
import GiftDistribution from "@/components/analytics/GiftDistribution";
import GuestAnalytics from "@/components/analytics/GuestAnalytics";

import { useAnalytics } from "@/hooks/useAnalytics";

// =====================================================
// ANALYTICS PAGE
// =====================================================

export default function AnalyticsPage() {
  // ===================================================
  // SELECTED WEDDING
  // ===================================================

  const [selectedWeddingId, setSelectedWeddingId] = useState(null);

  // ===================================================
  // GET SELECTED WEDDING ID
  // ===================================================

  useEffect(() => {
    const weddingId = localStorage.getItem("selectedWeddingId");

    if (weddingId) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSelectedWeddingId(Number(weddingId));
    }
  }, []);

  // ===================================================
  // GET ANALYTICS
  // ===================================================

  const {
    data: analyticsData,
    isLoading,
    isError,
    error,
  } = useAnalytics(selectedWeddingId);

  // ===================================================
  // CONVERT BACKEND DATA → UI DATA
  // ===================================================

  const formattedAnalytics = useMemo(() => {
    if (!analyticsData) {
      return null;
    }

    return {
      // Stats
      totalGifts: Number(analyticsData.total_gifts) || 0,

      onlinePayments:
        Number(analyticsData.online_payments) || 0,

      physicalGifts:
        Number(analyticsData.physical_gifts) || 0,

      totalGuests:
        Number(analyticsData.total_guests) || 0,

      // Payment chart
      paymentsByDay: Array.isArray(
        analyticsData.payment_overview
      )
        ? analyticsData.payment_overview.map((item) => ({
            day: new Date(
              `${item.date}T00:00:00`
            ).toLocaleDateString("en-IN", {
              weekday: "short",
            }),

            amount: Number(item.amount) || 0,
          }))
        : [],

      // Gift distribution
      giftDistribution: {
        online:
          Number(
            analyticsData.gift_distribution
              ?.online_percentage
          ) || 0,

        physical:
          Number(
            analyticsData.gift_distribution
              ?.physical_percentage
          ) || 0,
      },

      // Guest analytics
      guests: {
        total:
          Number(
            analyticsData.guest_activity
              ?.total_guests
          ) || 0,

        attending:
          Number(
            analyticsData.guest_activity
              ?.attending
          ) || 0,

        pending:
          Number(
            analyticsData.guest_activity
              ?.pending
          ) || 0,

        declined:
          Number(
            analyticsData.guest_activity
              ?.declined
          ) || 0,
      },
    };
  }, [analyticsData]);

  // ===================================================
  // NO WEDDING SELECTED
  // ===================================================

  if (!selectedWeddingId) {
    return (
      <main className="p-8">
        <div className="rounded-[20px] border border-[#eee8e8] bg-white px-6 py-10 text-center">
          <p className="text-sm font-semibold text-[#302b29]">
            No wedding selected
          </p>

          <p className="mt-2 text-sm text-[#817976]">
            Please select a wedding first.
          </p>
        </div>
      </main>
    );
  }

  // ===================================================
  // LOADING
  // ===================================================

  if (isLoading) {
    return (
      <main className="p-8">
        <div className="flex min-h-[400px] items-center justify-center">
          <p className="text-sm font-medium text-[#817976]">
            Loading analytics...
          </p>
        </div>
      </main>
    );
  }

  // ===================================================
  // ERROR
  // ===================================================

  if (isError) {
    return (
      <main className="p-8">
        <div className="rounded-[20px] border border-[#f0d7d7] bg-white px-6 py-10 text-center">
          <p className="text-sm font-semibold text-[#9b2635]">
            Failed to load analytics
          </p>

          <p className="mt-2 text-sm text-[#817976]">
            {error?.message ||
              "Something went wrong while loading analytics."}
          </p>
        </div>
      </main>
    );
  }

  // ===================================================
  // NO ANALYTICS DATA
  // ===================================================

  if (!formattedAnalytics) {
    return (
      <main className="p-8">
        <div className="rounded-[20px] border border-[#eee8e8] bg-white px-6 py-10 text-center">
          <p className="text-sm font-semibold text-[#302b29]">
            No analytics data found
          </p>
        </div>
      </main>
    );
  }

  // ===================================================
  // MAIN UI
  // ===================================================

  return (
    <main className="p-8">
      {/* Page Header */}
      <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-[#171717]">
            Analytics
          </h1>

          <p className="mt-1 text-sm text-[#77706e]">
            Understand your wedding activity, gifts and payments.
          </p>
        </div>

        {/* Period */}
        <select
          defaultValue="7"
          className="rounded-xl border border-[#e8dfdd] bg-white px-4 py-3 text-sm font-medium text-[#625b59] outline-none focus:border-[#7a0719]"
        >
          <option value="7">Last 7 Days</option>
          <option value="30">Last 30 Days</option>
          <option value="90">Last 3 Months</option>
        </select>
      </div>

      {/* Stats */}
      <AnalyticsStats data={formattedAnalytics} />

      {/* Main Charts */}
      <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-[1.5fr_1fr]">
        <PaymentChart
          data={formattedAnalytics.paymentsByDay}
        />

        <GiftDistribution
          data={formattedAnalytics.giftDistribution}
        />
      </div>

      {/* Guest Analytics */}
      <div className="mt-6">
        <GuestAnalytics data={formattedAnalytics.guests} />
      </div>
    </main>
  );
}
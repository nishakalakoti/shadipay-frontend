"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import ReportCard from "@/components/reports/ReportCard";
import ReportFilters from "@/components/reports/ReportFilters";
import RecentExports from "@/components/reports/RecentExports";

import {
  usePaymentReport,
  useGiftReport,
  useGuestReport,
  useWeddingSummary,
} from "@/hooks/useReports";

import {
  exportReportAsCSV,
} from "@/lib/reportExport";


const reportTypes = [
  {
    id: "payments",
    title: "Payment Report",
    description:
      "Export all online payment transactions received for your wedding.",
    type: "CSV",
  },
  {
    id: "gifts",
    title: "Gift Report",
    description:
      "Export all online and physical gifts recorded for your wedding.",
    type: "CSV",
  },
  {
    id: "guests",
    title: "Guest Report",
    description:
      "Export your guest list along with RSVP and attendance information.",
    type: "CSV",
  },
  {
    id: "summary",
    title: "Wedding Summary",
    description:
      "Download a complete summary of your wedding activity and contributions.",
    type: "CSV",
  },
];


// =====================================================
// FRONTEND PERIOD → BACKEND PERIOD
// =====================================================

const periodMap = {
  all: "all_time",
  7: "last_7_days",
  30: "last_30_days",
  90: "last_3_months",
};


export default function ReportsPage() {

  // =====================================================
  // STATE
  // =====================================================

  const [
    dateRange,
    setDateRange,
  ] = useState("all");

  const [
    selectedWeddingId,
    setSelectedWeddingId,
  ] = useState(null);

  const [
    recentExports,
    setRecentExports,
  ] = useState([]);


  // =====================================================
  // GET SELECTED WEDDING
  // =====================================================

  useEffect(() => {
    const weddingId =
      window.localStorage.getItem(
        "selectedWeddingId"
      );

    if (weddingId) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSelectedWeddingId(
        weddingId
      );
    }
  }, []);


  // =====================================================
  // BACKEND PERIOD
  // =====================================================

  const backendPeriod = useMemo(() => {
    return (
      periodMap[dateRange] ||
      "all_time"
    );
  }, [dateRange]);


  // =====================================================
  // REPORT HOOKS
  // =====================================================

  const paymentReportQuery =
    usePaymentReport(
      selectedWeddingId,
      backendPeriod
    );

  const giftReportQuery =
    useGiftReport(
      selectedWeddingId,
      backendPeriod
    );

  const guestReportQuery =
    useGuestReport(
      selectedWeddingId,
      backendPeriod
    );

  const weddingSummaryQuery =
    useWeddingSummary(
      selectedWeddingId,
      backendPeriod
    );


  // =====================================================
  // REPORT DATA
  // =====================================================

  const paymentReport =
    paymentReportQuery.data || null;

  const giftReport =
    giftReportQuery.data || null;

  const guestReport =
    guestReportQuery.data || null;

  const weddingSummary =
    weddingSummaryQuery.data || null;


  // =====================================================
  // LOADING
  // =====================================================

  const isLoading =
    paymentReportQuery.isLoading ||
    giftReportQuery.isLoading ||
    guestReportQuery.isLoading ||
    weddingSummaryQuery.isLoading;


  // =====================================================
  // ERROR
  // =====================================================

  const hasError =
    paymentReportQuery.isError ||
    giftReportQuery.isError ||
    guestReportQuery.isError ||
    weddingSummaryQuery.isError;


  // =====================================================
  // REPORT DATA MAP
  // =====================================================

  const reportDataMap = {
    payments: paymentReport,
    gifts: giftReport,
    guests: guestReport,
    summary: weddingSummary,
  };


  // =====================================================
  // EXPORT REPORT
  // =====================================================

  const handleExport = (report) => {
    const reportData =
      reportDataMap[report.id];

    if (!reportData) {
      return;
    }

    try {

      // Download CSV
      exportReportAsCSV(
        report.id,
        reportData
      );


      // Add to recent exports
      const newExport = {
        id: Date.now(),
        name: report.title,
        type: report.type,
        date: "Just now",
        reportId: report.id,
        reportData,
      };


      setRecentExports(
        (previous) => [
          newExport,
          ...previous,
        ]
      );

    } catch (error) {

      console.error(
        "Report export failed:",
        error
      );

    }
  };


  // =====================================================
  // DOWNLOAD RECENT EXPORT
  // =====================================================

  const handleDownloadRecent = (
    item
  ) => {

    if (
      !item?.reportId ||
      !item?.reportData
    ) {
      return;
    }

    try {

      exportReportAsCSV(
        item.reportId,
        item.reportData
      );

    } catch (error) {

      console.error(
        "Recent report download failed:",
        error
      );

    }
  };


  // =====================================================
  // RENDER
  // =====================================================

  return (
    <main className="p-8">

      {/* =================================================
          PAGE HEADER
      ================================================== */}

      <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

        <div>

          <h1 className="text-3xl font-semibold text-[#171717]">
            Reports & Export
          </h1>

          <p className="mt-1 text-sm text-[#77706e]">
            Download and manage your wedding data.
          </p>

        </div>

      </div>


      {/* =================================================
          FILTERS
      ================================================== */}

      <ReportFilters
        dateRange={dateRange}
        setDateRange={setDateRange}
      />


      {/* =================================================
          REPORT STATUS
      ================================================== */}

      {selectedWeddingId &&
        isLoading && (

          <div className="mt-4 rounded-xl border border-[#eee8e8] bg-white px-4 py-3 text-sm text-[#77706e]">
            Loading report data...
          </div>

        )}


      {selectedWeddingId &&
        hasError && (

          <div className="mt-4 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600">
            Unable to load report data. Please try again.
          </div>

        )}


      {!selectedWeddingId && (

        <div className="mt-4 rounded-xl border border-[#eee8e8] bg-white px-4 py-3 text-sm text-[#77706e]">
          Please select a wedding first.
        </div>

      )}


      {/* =================================================
          REPORT CARDS
      ================================================== */}

      <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">

        {reportTypes.map(
          (report) => (

            <ReportCard
              key={report.id}
              report={report}
              onExport={handleExport}
              disabled={
                !selectedWeddingId ||
                isLoading ||
                !reportDataMap[
                  report.id
                ]
              }
            />

          )
        )}

      </div>


      {/* =================================================
          RECENT EXPORTS
      ================================================== */}

      <div className="mt-6">

        <RecentExports
          exports={recentExports}
          onDownload={
            handleDownloadRecent
          }
        />

      </div>

    </main>
  );
}
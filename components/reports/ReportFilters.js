"use client";

import { CalendarDays } from "lucide-react";

export default function ReportFilters({
  dateRange,
  setDateRange,
}) {
  return (
    <section className="rounded-[20px] border border-[#eee8e8] bg-white p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        {/* Left Content */}
        <div className="flex items-center gap-3">

          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f5eeee]">
            <CalendarDays
              size={17}
              className="text-[#7a0719]"
            />
          </div>

          <div>
            <p className="text-sm font-semibold text-[#403a38]">
              Report Period
            </p>

            <p className="mt-1 text-xs text-[#817976]">
              Choose the data period for your export.
            </p>
          </div>

        </div>

        {/* Select */}
        <select
          value={dateRange}
          onChange={(event) =>
            setDateRange(event.target.value)
          }
          className="
            rounded-xl
            border
            border-[#e8dfdd]
            bg-[#faf8f7]
            px-4
            py-3
            text-sm
            font-medium
            text-[#625b59]
            outline-none
            transition
            focus:border-[#7a0719]
          "
        >
          <option value="all">
            All Time
          </option>

          <option value="7">
            Last 7 Days
          </option>

          <option value="30">
            Last 30 Days
          </option>

          <option value="90">
            Last 3 Months
          </option>
        </select>

      </div>
    </section>
  );
}
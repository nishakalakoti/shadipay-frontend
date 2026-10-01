import {
  CreditCard,
  Gift,
  Users,
  FileText,
  Download,
} from "lucide-react";

const iconMap = {
  payments: CreditCard,
  gifts: Gift,
  guests: Users,
  summary: FileText,
};

export default function ReportCard({
  report,
  onExport,
  disabled = false,
}) {
  const Icon = iconMap[report.id] || FileText;

  return (
    <section className="rounded-[22px] border border-[#eee8e8] bg-white p-6 shadow-[0_2px_12px_rgba(60,30,30,0.03)]">

      {/* Header */}
      <div className="flex items-start justify-between">

        {/* Icon */}
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#f5eeee]">
          <Icon
            size={19}
            className="text-[#7a0719]"
          />
        </div>

        {/* File Type */}
        <span className="rounded-full bg-[#faf8f7] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wide text-[#817976]">
          {report.type}
        </span>

      </div>

      {/* Content */}
      <h2 className="mt-5 text-lg font-semibold text-[#171717]">
        {report.title}
      </h2>

      <p className="mt-2 min-h-[48px] text-sm leading-6 text-[#817976]">
        {report.description}
      </p>

      {/* Export Button */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => onExport(report)}
        className={`
          mt-6
          flex
          w-full
          items-center
          justify-center
          gap-2
          rounded-xl
          px-5
          py-3
          text-sm
          font-semibold
          text-white
          transition

          ${
            disabled
              ? "cursor-not-allowed bg-[#bfaeb0]"
              : "bg-[#7a0719] hover:bg-[#650515]"
          }
        `}
      >
        <Download size={16} />

        {disabled
          ? "Preparing..."
          : `Export ${report.type}`}
      </button>

    </section>
  );
}
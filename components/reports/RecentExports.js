import {
  FileSpreadsheet,
  Download,
} from "lucide-react";

export default function RecentExports({
  exports,
  onDownload,
}) {
  return (
    <section className="overflow-hidden rounded-[22px] border border-[#eee8e8] bg-white shadow-[0_2px_12px_rgba(60,30,30,0.03)]">

      {/* Header */}
      <div className="border-b border-[#eee8e8] px-6 py-5">

        <h2 className="text-lg font-semibold text-[#171717]">
          Recent Exports
        </h2>

        <p className="mt-1 text-sm text-[#817976]">
          Your recently generated reports.
        </p>

      </div>

      {/* List */}
      <div>

        {exports.length > 0 ? (
          exports.map((item) => (

            <div
              key={item.id}
              className="
                flex
                flex-col
                gap-4
                border-b
                border-[#f0ebea]
                px-6
                py-5
                last:border-b-0
                sm:flex-row
                sm:items-center
                sm:justify-between
              "
            >

              {/* Report Info */}
              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f5eeee]">
                  <FileSpreadsheet
                    size={17}
                    className="text-[#7a0719]"
                  />
                </div>

                <div>

                  <p className="text-sm font-semibold text-[#403a38]">
                    {item.name}
                  </p>

                  <p className="mt-1 text-xs text-[#a29a98]">
                    {item.type} • {item.date}
                  </p>

                </div>

              </div>

              {/* Download */}
              <button
                type="button"
                onClick={() => onDownload?.(item)}
                disabled={!onDownload}
                className={`
                  flex
                  w-fit
                  items-center
                  gap-2
                  rounded-lg
                  border
                  border-[#e8dfdd]
                  px-3
                  py-2
                  text-xs
                  font-semibold
                  transition

                  ${
                    onDownload
                      ? "text-[#625b59] hover:border-[#7a0719] hover:text-[#7a0719]"
                      : "cursor-not-allowed text-[#b9b0ae]"
                  }
                `}
              >
                <Download size={14} />
                Download
              </button>

            </div>

          ))
        ) : (

          <div className="px-6 py-12 text-center">

            <p className="text-sm font-semibold text-[#403a38]">
              No exports yet
            </p>

            <p className="mt-1 text-sm text-[#817976]">
              Generate a report to see it here.
            </p>

          </div>

        )}

      </div>

    </section>
  );
}
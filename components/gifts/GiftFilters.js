import { Search } from "lucide-react";

const filters = [
  "All",
  "Online",
  "Physical",
];

export default function GiftFilters({
  search,
  setSearch,
  activeFilter,
  setActiveFilter,
}) {
  return (
    <div className="rounded-[20px] border border-[#eee8e8] bg-white p-4">

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

        {/* Search */}
        <div className="relative w-full lg:max-w-md">

          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-[#aaa19e]"
          />

          <input
            type="text"
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
            placeholder="Search guest or gift..."
            className="w-full rounded-xl border border-[#eee8e8] bg-[#faf8f7] py-3 pl-11 pr-4 text-sm outline-none transition focus:border-[#7a0719]"
          />

        </div>

        {/* Filter */}
        <div className="flex gap-2">

          {filters.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setActiveFilter(filter)}
              className={`rounded-lg px-4 py-2.5 text-sm font-medium transition ${
                activeFilter === filter
                  ? "bg-[#7a0719] text-white"
                  : "bg-[#faf8f7] text-[#665f5c] hover:bg-[#f3eeee]"
              }`}
            >
              {filter}
            </button>
          ))}

        </div>

      </div>

    </div>
  );
}
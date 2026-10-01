export default function SettingsSection({
  title,
  description,
  children,
}) {
  return (
    <section className="overflow-hidden rounded-[22px] border border-[#eee8e8] bg-white shadow-[0_2px_12px_rgba(60,30,30,0.03)]">

      {/* Section Header */}
      <div className="border-b border-[#eee8e8] px-6 py-5">

        <h2 className="text-lg font-semibold text-[#171717]">
          {title}
        </h2>

        <p className="mt-1 text-sm text-[#817976]">
          {description}
        </p>

      </div>

      {/* Content */}
      <div className="p-6">
        {children}
      </div>

    </section>
  );
}
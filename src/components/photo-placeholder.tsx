export default function PhotoPlaceholder({
  label = "Photo",
  aspect = "aspect-square",
  className = "",
}: {
  label?: string;
  aspect?: string;
  className?: string;
}) {
  return (
    <div
      className={`flex ${aspect} w-full items-center justify-center rounded-2xl border border-dashed border-brand-200 bg-brand-50 ${className}`}
    >
      <div className="flex flex-col items-center gap-2 text-brand-400">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-8 w-8">
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <circle cx="9" cy="10.5" r="1.75" />
          <path d="m4 17 5-4 3 2.5 4-3.5 4 3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span className="text-xs font-medium uppercase tracking-wide">{label}</span>
      </div>
    </div>
  );
}

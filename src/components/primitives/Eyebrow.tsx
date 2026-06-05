/** Small section label with the brand square — editorial section marker */
export function Eyebrow({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-2.5 text-xs font-semibold tracking-[0.18em] uppercase text-ink-muted ${className}`}
    >
      <span aria-hidden className="size-2 rounded-[2px] bg-brand" />
      {children}
    </span>
  );
}

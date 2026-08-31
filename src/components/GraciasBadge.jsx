export default function GraciasBadge({ className = 'h-28 w-28' }) {
  return (
    <div
      className={`relative shrink-0 rotate-[-8deg] select-none ${className}`}
      aria-hidden="true"
    >
      <div className="absolute inset-0 rounded-full bg-[#F5E9CE] shadow-lg shadow-black/30" />
      {/* "bite" cut, matches the footer background so it reads as a bitten cookie */}
      <div className="absolute -right-2.5 -top-3 h-9 w-9 rounded-full bg-[#3C1A1A]" />
      {/* chocolate chips */}
      <span className="absolute left-5 top-8 h-2 w-2 rounded-full bg-[#3C1A1A]/60" />
      <span className="absolute right-7 bottom-8 h-2.5 w-2.5 rounded-full bg-[#3C1A1A]/50" />
      <span className="absolute left-8 bottom-6 h-1.5 w-1.5 rounded-full bg-[#3C1A1A]/45" />
      <span className="absolute right-9 top-10 h-1.5 w-1.5 rounded-full bg-[#3C1A1A]/45" />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="font-display text-xl leading-none text-[#3C1A1A]">¡Gracias!</span>
        <span className="mt-1.5 text-[9px] font-bold uppercase tracking-wide text-[#3C1A1A]/80">
          por elegirnos
        </span>
      </div>
    </div>
  )
}

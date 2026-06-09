export default function LogoMark({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Flower-of-life interlocking circles logo mark */}
      <circle cx="50" cy="22" r="18" fill="none" stroke="#D9A441" strokeWidth="5" />
      <circle cx="50" cy="78" r="18" fill="none" stroke="#D9A441" strokeWidth="5" />
      <circle cx="22" cy="36" r="18" fill="none" stroke="#D9A441" strokeWidth="5" />
      <circle cx="78" cy="36" r="18" fill="none" stroke="#D9A441" strokeWidth="5" />
      <circle cx="22" cy="64" r="18" fill="none" stroke="#D9A441" strokeWidth="5" />
      <circle cx="78" cy="64" r="18" fill="none" stroke="#D9A441" strokeWidth="5" />
      <circle cx="50" cy="50" r="18" fill="none" stroke="#D9A441" strokeWidth="5" />
    </svg>
  )
}

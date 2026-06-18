export function Skeleton({ className = '' }) {
  return (
    <div className={`relative overflow-hidden rounded-lg bg-slate-200 dark:bg-slate-800 ${className}`}>
      <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/60 to-transparent animate-shimmer dark:via-white/10" />
    </div>
  );
}

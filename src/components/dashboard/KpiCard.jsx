export default function KpiCard({ title, value, helper, icon: Icon, tone = 'blue' }) {
  const tones = {
    blue: 'bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-200',
    green: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-200',
    slate: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200',
  };

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{title}</p>
          <p className="mt-3 text-3xl font-bold tracking-normal">{value}</p>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{helper}</p>
        </div>
        <div className={`grid h-12 w-12 place-items-center rounded-lg ${tones[tone]}`}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </div>
  );
}

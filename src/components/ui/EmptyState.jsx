import { SearchX } from 'lucide-react';

export default function EmptyState({ title = 'No results found', message = 'Try adjusting your search or filters.' }) {
  return (
    <div className="flex min-h-80 flex-col items-center justify-center rounded-lg border border-dashed border-slate-300 bg-white px-6 py-12 text-center dark:border-slate-700 dark:bg-slate-900">
      <div className="grid h-14 w-14 place-items-center rounded-lg bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-300">
        <SearchX className="h-7 w-7" />
      </div>
      <h3 className="mt-4 text-base font-semibold">{title}</h3>
      <p className="mt-2 max-w-md text-sm text-slate-500 dark:text-slate-400">{message}</p>
    </div>
  );
}

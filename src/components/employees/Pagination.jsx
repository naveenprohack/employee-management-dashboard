import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Pagination({ page, pageCount, onPageChange }) {
  if (pageCount <= 1) return null;

  return (
    <div className="flex flex-col items-center justify-between gap-3 rounded-lg border border-slate-200 bg-white px-4 py-3 dark:border-slate-800 dark:bg-slate-900 sm:flex-row">
      <p className="text-sm text-slate-500 dark:text-slate-400">
        Page <span className="font-semibold text-slate-900 dark:text-white">{page}</span> of{' '}
        <span className="font-semibold text-slate-900 dark:text-white">{pageCount}</span>
      </p>
      <div className="flex flex-wrap items-center justify-center gap-2">
        <button
          type="button"
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}
          className="inline-flex h-9 items-center gap-2 rounded-lg border border-slate-200 px-3 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700"
        >
          <ChevronLeft className="h-4 w-4" />
          Previous
        </button>
        {Array.from({ length: pageCount }, (_, index) => index + 1).map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => onPageChange(item)}
            className={`h-9 min-w-9 rounded-lg px-3 text-sm font-semibold ${
              item === page
                ? 'bg-brand-600 text-white'
                : 'border border-slate-200 text-slate-600 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800'
            }`}
          >
            {item}
          </button>
        ))}
        <button
          type="button"
          onClick={() => onPageChange(page + 1)}
          disabled={page === pageCount}
          className="inline-flex h-9 items-center gap-2 rounded-lg border border-slate-200 px-3 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700"
        >
          Next
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

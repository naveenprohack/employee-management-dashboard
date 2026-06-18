import { RefreshCw, TriangleAlert } from 'lucide-react';

export default function ErrorMessage({ message, onRetry }) {
  return (
    <div className="rounded-lg border border-rose-200 bg-rose-50 p-5 text-rose-900 dark:border-rose-900/70 dark:bg-rose-950/40 dark:text-rose-100">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <TriangleAlert className="mt-0.5 h-5 w-5 flex-none" />
          <div>
            <p className="font-semibold">Unable to load employee data</p>
            <p className="mt-1 text-sm opacity-80">{message}</p>
          </div>
        </div>
        {onRetry ? (
          <button
            type="button"
            onClick={onRetry}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-rose-600 px-4 py-2 text-sm font-semibold text-white hover:bg-rose-700"
          >
            <RefreshCw className="h-4 w-4" />
            Retry
          </button>
        ) : null}
      </div>
    </div>
  );
}

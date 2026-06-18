import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <main className="grid min-h-screen place-items-center bg-ink-50 px-4 text-center dark:bg-slate-950 dark:text-white">
      <div>
        <p className="text-sm font-bold uppercase tracking-wide text-brand-600">404</p>
        <h1 className="mt-3 text-3xl font-bold">Page not found</h1>
        <p className="mt-2 text-slate-500 dark:text-slate-400">The route you requested does not exist.</p>
        <Link
          to="/dashboard"
          className="mt-6 inline-flex rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-bold text-white hover:bg-brand-700"
        >
          Back to dashboard
        </Link>
      </div>
    </main>
  );
}

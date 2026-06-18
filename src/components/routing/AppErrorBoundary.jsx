import { Component } from 'react';
import { AlertTriangle } from 'lucide-react';

export default class AppErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="grid min-h-screen place-items-center bg-ink-50 px-4 dark:bg-slate-950 dark:text-white">
          <section className="max-w-md rounded-lg border border-rose-200 bg-white p-6 text-center shadow-soft dark:border-rose-900 dark:bg-slate-900">
            <div className="mx-auto grid h-14 w-14 place-items-center rounded-lg bg-rose-50 text-rose-600 dark:bg-rose-950 dark:text-rose-200">
              <AlertTriangle className="h-7 w-7" />
            </div>
            <h1 className="mt-4 text-xl font-bold">Something went wrong</h1>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              Refresh the page or sign in again if the problem continues.
            </p>
          </section>
        </main>
      );
    }

    return this.props.children;
  }
}

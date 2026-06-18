import { Activity, UsersRound, UserX } from 'lucide-react';
import { useMemo } from 'react';
import AnalyticsCharts from '../components/dashboard/AnalyticsCharts.jsx';
import KpiCard from '../components/dashboard/KpiCard.jsx';
import ErrorMessage from '../components/ui/ErrorMessage.jsx';
import { Skeleton } from '../components/ui/Skeleton.jsx';
import { useEmployees } from '../hooks/useEmployees.js';
import { buildEmployeeAnalytics } from '../utils/analytics.js';

export default function DashboardPage() {
  const { employees, isLoading, error, reload } = useEmployees();
  const analytics = useMemo(() => buildEmployeeAnalytics(employees), [employees]);

  if (isLoading) {
    return (
      <div className="space-y-5">
        <div className="grid gap-5 md:grid-cols-3">
          <Skeleton className="h-36" />
          <Skeleton className="h-36" />
          <Skeleton className="h-36" />
        </div>
        <Skeleton className="h-96" />
      </div>
    );
  }

  if (error) return <ErrorMessage message={error} onRetry={reload} />;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-normal">Analytics Dashboard</h2>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Workforce health and hiring momentum.</p>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        <KpiCard title="Total Employees" value={analytics.totalEmployees} helper="Current employee records" icon={UsersRound} />
        <KpiCard title="Active Employees" value={analytics.activeEmployees} helper="Available workforce" icon={Activity} tone="green" />
        <KpiCard title="Inactive Employees" value={analytics.inactiveEmployees} helper="Archived or inactive users" icon={UserX} tone="slate" />
      </div>

      <AnalyticsCharts analytics={analytics} />
    </div>
  );
}

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const chartColors = ['#2563eb', '#10b981', '#f97316', '#8b5cf6', '#06b6d4', '#f43f5e', '#64748b'];

export default function AnalyticsCharts({ analytics }) {
  return (
    <div className="grid gap-5 xl:grid-cols-3">
      <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 xl:col-span-2">
        <div className="mb-5">
          <h2 className="text-base font-bold">Department Distribution</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">Headcount split across business units</p>
        </div>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={analytics.departmentDistribution}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="department" tickLine={false} axisLine={false} tick={{ fontSize: 12 }} />
              <YAxis allowDecimals={false} tickLine={false} axisLine={false} tick={{ fontSize: 12 }} />
              <Tooltip cursor={{ fill: 'rgba(37, 99, 235, 0.08)' }} />
              <Bar dataKey="count" radius={[8, 8, 0, 0]} fill="#2563eb" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="mb-5">
          <h2 className="text-base font-bold">Status Distribution</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">Active and inactive employee mix</p>
        </div>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={analytics.statusDistribution} dataKey="value" nameKey="name" innerRadius={70} outerRadius={105}>
                {analytics.statusDistribution.map((entry, index) => (
                  <Cell key={entry.name} fill={chartColors[index]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 xl:col-span-3">
        <div className="mb-5">
          <h2 className="text-base font-bold">Monthly Onboarding Trend</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">New hires grouped by joining month</p>
        </div>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={analytics.monthlyJoined}>
              <defs>
                <linearGradient id="onboardingGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563eb" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fontSize: 12 }} />
              <YAxis allowDecimals={false} tickLine={false} axisLine={false} tick={{ fontSize: 12 }} />
              <Tooltip />
              <Area type="monotone" dataKey="count" stroke="#2563eb" strokeWidth={3} fill="url(#onboardingGradient)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </section>
    </div>
  );
}

import { Search } from 'lucide-react';
import { departments, statuses } from '../../services/mockData.js';

export default function EmployeeFilters({ query, department, status, onQueryChange, onDepartmentChange, onStatusChange }) {
  return (
    <div className="grid gap-3 rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900 lg:grid-cols-[1fr_220px_180px]">
      <label className="relative block">
        <span className="sr-only">Search employees</span>
        <Search className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
        <input
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="Search by name or email"
          className="h-11 w-full rounded-lg border border-slate-200 bg-white pl-10 pr-4 text-sm outline-none transition focus:border-brand-500 focus:ring-4 focus:ring-blue-100 dark:border-slate-700 dark:bg-slate-950 dark:focus:ring-blue-950"
        />
      </label>
      <select
        value={department}
        onChange={(event) => onDepartmentChange(event.target.value)}
        className="h-11 rounded-lg border border-slate-200 bg-white px-3 text-sm outline-none focus:border-brand-500 focus:ring-4 focus:ring-blue-100 dark:border-slate-700 dark:bg-slate-950 dark:focus:ring-blue-950"
        aria-label="Filter by department"
      >
        <option value="All">All departments</option>
        {departments.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
      <select
        value={status}
        onChange={(event) => onStatusChange(event.target.value)}
        className="h-11 rounded-lg border border-slate-200 bg-white px-3 text-sm outline-none focus:border-brand-500 focus:ring-4 focus:ring-blue-100 dark:border-slate-700 dark:bg-slate-950 dark:focus:ring-blue-950"
        aria-label="Filter by status"
      >
        <option value="All">All statuses</option>
        {statuses.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
}

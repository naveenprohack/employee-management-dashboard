import { Edit3, Trash2 } from 'lucide-react';
import { formatDate } from '../../utils/date.js';

export default function EmployeeTable({ employees, onEdit, onDelete }) {
  return (
    <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-800">
          <thead className="bg-slate-50 dark:bg-slate-900">
            <tr>
              {['Employee', 'Department', 'Designation', 'Status', 'Joining Date', 'Actions'].map((heading) => (
                <th
                  key={heading}
                  scope="col"
                  className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400"
                >
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {employees.map((employee) => (
              <tr key={employee.id} className="transition hover:bg-slate-50 dark:hover:bg-slate-800/55">
                <td className="whitespace-nowrap px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="grid h-10 w-10 place-items-center rounded-lg bg-slate-100 text-sm font-bold text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                      {employee.name.slice(0, 1)}
                    </div>
                    <div>
                      <p className="font-semibold capitalize">{employee.name}</p>
                      <p className="text-sm text-slate-500 dark:text-slate-400">{employee.email}</p>
                    </div>
                  </div>
                </td>
                <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-600 dark:text-slate-300">
                  {employee.department}
                </td>
                <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-600 dark:text-slate-300">
                  {employee.designation}
                </td>
                <td className="whitespace-nowrap px-5 py-4">
                  <span
                    className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ${
                      employee.status === 'Active'
                        ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-200'
                        : 'bg-rose-50 text-rose-700 dark:bg-rose-950/50 dark:text-rose-200'
                    }`}
                  >
                    {employee.status}
                  </span>
                </td>
                <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-600 dark:text-slate-300">
                  {formatDate(employee.joiningDate)}
                </td>
                <td className="whitespace-nowrap px-5 py-4">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => onEdit(employee)}
                      className="rounded-lg border border-slate-200 p-2 text-slate-600 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                      aria-label={`Edit ${employee.name}`}
                    >
                      <Edit3 className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => onDelete(employee)}
                      className="rounded-lg border border-rose-200 p-2 text-rose-600 hover:bg-rose-50 dark:border-rose-900 dark:text-rose-300 dark:hover:bg-rose-950/40"
                      aria-label={`Delete ${employee.name}`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

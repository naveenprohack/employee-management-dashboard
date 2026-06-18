import { Plus } from 'lucide-react';
import { useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import DeleteEmployeeModal from '../components/employees/DeleteEmployeeModal.jsx';
import EmployeeFilters from '../components/employees/EmployeeFilters.jsx';
import EmployeeFormModal from '../components/employees/EmployeeFormModal.jsx';
import EmployeeTable from '../components/employees/EmployeeTable.jsx';
import Pagination from '../components/employees/Pagination.jsx';
import EmptyState from '../components/ui/EmptyState.jsx';
import ErrorMessage from '../components/ui/ErrorMessage.jsx';
import { Skeleton } from '../components/ui/Skeleton.jsx';
import { useDebouncedValue } from '../hooks/useDebouncedValue.js';
import { useEmployees } from '../hooks/useEmployees.js';
import { filterEmployees } from '../utils/employeeFilters.js';

const PAGE_SIZE = 7;

export default function EmployeesPage() {
  const { employees, isLoading, error, reload, createEmployee, updateEmployee, deleteEmployee } = useEmployees();
  const [query, setQuery] = useState('');
  const [department, setDepartment] = useState('All');
  const [status, setStatus] = useState('All');
  const [page, setPage] = useState(1);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [deletingEmployee, setDeletingEmployee] = useState(null);
  const debouncedQuery = useDebouncedValue(query);

  const filteredEmployees = useMemo(
    () => filterEmployees(employees, { query: debouncedQuery, department, status }),
    [debouncedQuery, department, employees, status],
  );

  const pageCount = Math.max(1, Math.ceil(filteredEmployees.length / PAGE_SIZE));
  const currentPage = Math.min(page, pageCount);
  const paginatedEmployees = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredEmployees.slice(start, start + PAGE_SIZE);
  }, [currentPage, filteredEmployees]);

  const handleQueryChange = (value) => {
    setQuery(value);
    setPage(1);
  };

  const handleDepartmentChange = (value) => {
    setDepartment(value);
    setPage(1);
  };

  const handleStatusChange = (value) => {
    setStatus(value);
    setPage(1);
  };

  const handleSubmit = async (values) => {
    try {
      if (editingEmployee) {
        await updateEmployee(editingEmployee.id, values);
        toast.success(`${values.name} has been updated.`);
      } else {
        await createEmployee(values);
        toast.success(`${values.name} has been added.`);
      }
      setEditingEmployee(null);
      setIsFormOpen(false);
    } catch (submitError) {
      toast.error(`Save failed. ${submitError.message}`);
      throw submitError;
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteEmployee(id);
      toast.warn('Employee deleted. The record was removed.');
    } catch (deleteError) {
      toast.error(`Delete failed. ${deleteError.message}`);
      throw deleteError;
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-5">
        <Skeleton className="h-20" />
        <Skeleton className="h-[520px]" />
      </div>
    );
  }

  if (error) return <ErrorMessage message={error} onRetry={reload} />;

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-normal">Employees</h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Manage employee records, departments, status, and joining dates.
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            setEditingEmployee(null);
            setIsFormOpen(true);
          }}
          className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-brand-600 px-4 text-sm font-bold text-white shadow-soft hover:bg-brand-700"
        >
          <Plus className="h-5 w-5" />
          Add Employee
        </button>
      </div>

      <EmployeeFilters
        query={query}
        department={department}
        status={status}
        onQueryChange={handleQueryChange}
        onDepartmentChange={handleDepartmentChange}
        onStatusChange={handleStatusChange}
      />

      {filteredEmployees.length === 0 ? (
        <EmptyState />
      ) : (
        <>
          <EmployeeTable
            employees={paginatedEmployees}
            onEdit={(employee) => {
              setEditingEmployee(employee);
              setIsFormOpen(true);
            }}
            onDelete={setDeletingEmployee}
          />
          <Pagination page={currentPage} pageCount={pageCount} onPageChange={setPage} />
        </>
      )}

      {isFormOpen ? (
        <EmployeeFormModal
          employee={editingEmployee}
          onClose={() => {
            setIsFormOpen(false);
            setEditingEmployee(null);
          }}
          onSubmit={handleSubmit}
        />
      ) : null}

      {deletingEmployee ? (
        <DeleteEmployeeModal
          employee={deletingEmployee}
          onClose={() => setDeletingEmployee(null)}
          onConfirm={handleDelete}
        />
      ) : null}
    </div>
  );
}

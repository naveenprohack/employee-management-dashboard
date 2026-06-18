import { useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import Modal from '../ui/Modal.jsx';
import { departments, statuses } from '../../services/mockData.js';
import { validateEmployee } from '../../utils/validation.js';

const emptyEmployee = {
  name: '',
  email: '',
  department: 'Engineering',
  designation: '',
  status: 'Active',
  joiningDate: new Date().toISOString().slice(0, 10),
};

export default function EmployeeFormModal({ employee, onClose, onSubmit }) {
  const [values, setValues] = useState(employee || emptyEmployee);
  const [errors, setErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const isEditing = Boolean(employee);

  const title = useMemo(() => (isEditing ? 'Edit Employee' : 'Create Employee'), [isEditing]);

  const updateValue = (field, value) => {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const nextErrors = validateEmployee(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      toast.error('Please fix the highlighted employee fields.');
      return;
    }

    setIsSaving(true);
    try {
      await onSubmit(values);
      onClose();
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Modal title={title} onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-4 px-6 py-5">
        <Field label="Employee Name" error={errors.name}>
          <input value={values.name} onChange={(event) => updateValue('name', event.target.value)} className="form-input" />
        </Field>
        <Field label="Email" error={errors.email}>
          <input
            type="email"
            value={values.email}
            onChange={(event) => updateValue('email', event.target.value)}
            className="form-input"
          />
        </Field>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Department" error={errors.department}>
            <select value={values.department} onChange={(event) => updateValue('department', event.target.value)} className="form-input">
              {departments.map((department) => (
                <option key={department} value={department}>
                  {department}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Status" error={errors.status}>
            <select value={values.status} onChange={(event) => updateValue('status', event.target.value)} className="form-input">
              {statuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </Field>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Designation" error={errors.designation}>
            <input
              value={values.designation}
              onChange={(event) => updateValue('designation', event.target.value)}
              className="form-input"
            />
          </Field>
          <Field label="Joining Date" error={errors.joiningDate}>
            <input
              type="date"
              value={values.joiningDate}
              onChange={(event) => updateValue('joiningDate', event.target.value)}
              className="form-input"
            />
          </Field>
        </div>

        <div className="flex flex-col-reverse gap-3 border-t border-slate-200 pt-5 dark:border-slate-800 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-semibold hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSaving}
            className="rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSaving ? 'Saving...' : isEditing ? 'Save Changes' : 'Create Employee'}
          </button>
        </div>
      </form>
    </Modal>
  );
}

function Field({ label, error, children }) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">{label}</span>
      <div className="mt-2">{children}</div>
      {error ? <p className="mt-1 text-sm text-rose-600 dark:text-rose-300">{error}</p> : null}
    </label>
  );
}

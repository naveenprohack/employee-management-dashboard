import { useState } from 'react';
import Modal from '../ui/Modal.jsx';

export default function DeleteEmployeeModal({ employee, onClose, onConfirm }) {
  const [confirmation, setConfirmation] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const canDelete = confirmation === employee.name;

  const handleDelete = async () => {
    if (!canDelete) return;
    setIsDeleting(true);
    try {
      await onConfirm(employee.id);
      onClose();
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Modal title="Delete Employee" onClose={onClose} widthClass="max-w-lg">
      <div className="space-y-4 px-6 py-5">
        <div className="rounded-lg border border-rose-200 bg-rose-50 p-4 text-rose-900 dark:border-rose-900 dark:bg-rose-950/40 dark:text-rose-100">
          <p className="font-semibold">This action permanently removes {employee.name}.</p>
          <p className="mt-1 text-sm opacity-80">Type the employee name below to confirm deletion.</p>
        </div>
        <label className="block">
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">Confirm name</span>
          <input
            value={confirmation}
            onChange={(event) => setConfirmation(event.target.value)}
            className="form-input mt-2"
            placeholder={employee.name}
          />
        </label>
        <div className="flex flex-col-reverse gap-3 border-t border-slate-200 pt-5 dark:border-slate-800 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-semibold hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={!canDelete || isDeleting}
            onClick={handleDelete}
            className="rounded-lg bg-rose-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-rose-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isDeleting ? 'Deleting...' : 'Delete Employee'}
          </button>
        </div>
      </div>
    </Modal>
  );
}

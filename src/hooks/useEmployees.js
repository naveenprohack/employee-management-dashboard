import { useCallback, useEffect, useReducer } from 'react';
import { employeeService } from '../services/employeeService.js';

const initialState = {
  employees: [],
  isLoading: true,
  error: null,
};

function reducer(state, action) {
  switch (action.type) {
    case 'LOAD_START':
      return { ...state, isLoading: true, error: null };
    case 'LOAD_SUCCESS':
      return { ...state, isLoading: false, employees: action.payload };
    case 'LOAD_ERROR':
      return { ...state, isLoading: false, error: action.payload };
    case 'CREATE':
      return { ...state, employees: [action.payload, ...state.employees] };
    case 'UPDATE':
      return {
        ...state,
        employees: state.employees.map((employee) =>
          employee.id === action.payload.id ? action.payload : employee,
        ),
      };
    case 'DELETE':
      return { ...state, employees: state.employees.filter((employee) => employee.id !== action.payload) };
    default:
      return state;
  }
}

export function useEmployees() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const loadEmployees = useCallback(async () => {
    dispatch({ type: 'LOAD_START' });
    try {
      const employees = await employeeService.list();
      dispatch({ type: 'LOAD_SUCCESS', payload: employees });
    } catch (error) {
      dispatch({ type: 'LOAD_ERROR', payload: error.message });
    }
  }, []);

  useEffect(() => {
    loadEmployees();
  }, [loadEmployees]);

  const createEmployee = useCallback(async (payload) => {
    const created = await employeeService.create(payload);
    dispatch({ type: 'CREATE', payload: created });
    return created;
  }, []);

  const updateEmployee = useCallback(async (id, payload) => {
    const updated = await employeeService.update(id, payload);
    dispatch({ type: 'UPDATE', payload: updated });
    return updated;
  }, []);

  const deleteEmployee = useCallback(async (id) => {
    await employeeService.remove(id);
    dispatch({ type: 'DELETE', payload: id });
  }, []);

  return {
    ...state,
    reload: loadEmployees,
    createEmployee,
    updateEmployee,
    deleteEmployee,
  };
}

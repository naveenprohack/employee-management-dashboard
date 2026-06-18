import api from './api.js';

const normalizeEmployee = (employee) => ({
  ...employee,
  id: employee.id || employee._id,
  joiningDate: employee.joiningDate?.slice(0, 10) || '',
});

export const employeeService = {
  async list() {
    const response = await api.get('/employees');
    return response.data.map(normalizeEmployee);
  },

  async create(payload) {
    const response = await api.post('/employees', payload);
    return normalizeEmployee(response.data);
  },

  async update(id, payload) {
    const response = await api.put(`/employees/${id}`, payload);
    return normalizeEmployee(response.data);
  },

  async remove(id) {
    await api.delete(`/employees/${id}`);
    return { id };
  },
};

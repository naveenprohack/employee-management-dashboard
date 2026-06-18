import api from './api.js';

export const authService = {
  async login({ email, password }) {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },
};

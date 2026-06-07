import { api } from './index';

export const login = (credentials: any) => api.post('/auth/login', credentials);
export const register = (data: any) => api.post('/auth/register', data);

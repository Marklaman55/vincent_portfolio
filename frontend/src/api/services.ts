import { api } from './index';

export const getServicesList = () => api.get('/services');
export const saveService = (data: any) => api.post('/services', data);
export const updateService = (id: string | number, data: any) => api.put(`/services/${id}`, data);
export const deleteService = (id: string | number) => api.delete(`/services/${id}`);

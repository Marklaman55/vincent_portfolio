import { api } from './index';

export const getMessages = () => api.get('/messages');
export const saveMessage = (data: any) => api.post('/messages', data);
export const updateMessageStatus = (id: string | number, status: string) => api.put(`/messages/${id}/status`, { status });
export const deleteMessage = (id: string | number) => api.delete(`/messages/${id}`);

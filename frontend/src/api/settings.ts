import { api } from './index';

export const getSettingsData = () => api.get('/settings');
export const saveSettingsData = (data: any) => api.put('/settings', data);

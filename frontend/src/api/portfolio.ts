import { api } from './index';

export const getProjects = () => api.get('/projects');
export const saveProject = (data: any) => api.post('/projects', data);
export const deleteProject = (id: string | number) => api.delete(`/projects/${id}`);

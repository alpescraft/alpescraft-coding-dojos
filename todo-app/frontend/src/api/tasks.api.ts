import axios from 'axios';
import type { Task, CreateTaskRequest, UpdateTaskRequest } from '../types/task.types';

const api = axios.create({
  baseURL: 'http://localhost:3001/api',
});

export const tasksApi = {
  getAll: async (): Promise<Task[]> => {
    const response = await api.get<Task[]>('/tasks');
    return response.data;
  },

  getById: async (id: string): Promise<Task> => {
    const response = await api.get<Task>(`/tasks/${id}`);
    return response.data;
  },

  create: async (data: CreateTaskRequest): Promise<Task> => {
    const response = await api.post<Task>('/tasks', data);
    return response.data;
  },

  update: async (id: string, data: UpdateTaskRequest): Promise<Task> => {
    const response = await api.patch<Task>(`/tasks/${id}`, data);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/tasks/${id}`);
  },

  deleteAll: async (): Promise<void> => {
    await api.delete('/tasks');
  },
};

import React, { createContext, useState, useCallback, type ReactNode } from 'react';
import type { Task } from '../types/task.types';
import { tasksApi } from '../api/tasks.api';

interface TaskContextType {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  fetchTasks: () => Promise<void>;
  addTask: (title: string) => Promise<void>;
  updateTask: (id: string, updates: Partial<Task>) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  deleteAllTasks: () => Promise<void>;
}

export const TaskContext = createContext<TaskContextType | undefined>(undefined);

interface TaskProviderProps {
  children: ReactNode;
}

export const TaskProvider: React.FC<TaskProviderProps> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await tasksApi.getAll();
      setTasks(data);
    } catch (err) {
      setError('Failed to fetch tasks');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const addTask = useCallback(async (title: string) => {
    try {
      setError(null);
      const newTask = await tasksApi.create({ title });
      setTasks((prev) => [newTask, ...prev]);
    } catch (err) {
      setError('Failed to add task');
      console.error(err);
      throw err;
    }
  }, []);

  const updateTask = useCallback(async (id: string, updates: Partial<Task>) => {
    try {
      setError(null);
      const updated = await tasksApi.update(id, {
        title: updates.title,
        completed: updates.completed,
      });
      setTasks((prev) =>
        prev.map((task) => (task.id === id ? updated : task))
      );
    } catch (err) {
      setError('Failed to update task');
      console.error(err);
      throw err;
    }
  }, []);

  const deleteTask = useCallback(async (id: string) => {
    try {
      setError(null);
      await tasksApi.delete(id);
      setTasks((prev) => prev.filter((task) => task.id !== id));
    } catch (err) {
      setError('Failed to delete task');
      console.error(err);
      throw err;
    }
  }, []);

  const deleteAllTasks = useCallback(async () => {
    try {
      setError(null);
      await tasksApi.deleteAll();
      setTasks([]);
    } catch (err) {
      setError('Failed to delete all tasks');
      console.error(err);
      throw err;
    }
  }, []);

  return (
    <TaskContext.Provider
      value={{
        tasks,
        loading,
        error,
        fetchTasks,
        addTask,
        updateTask,
        deleteTask,
        deleteAllTasks,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

import { Request, Response } from 'express';
import { taskStorage } from '../storage/tasks.storage.js';
import { CreateTaskRequest, UpdateTaskRequest, TaskResponse } from '../models/task.model.js';

const convertToResponse = (task: any): TaskResponse => ({
  id: task.id,
  title: task.title,
  completed: task.completed,
  createdAt: task.createdAt.toISOString(),
  updatedAt: task.updatedAt.toISOString(),
});

export const getTasks = (req: Request, res: Response): void => {
  try {
    const tasks = taskStorage.getAll();
    res.json(tasks.map(convertToResponse));
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
};

export const getTask = (req: Request, res: Response): void => {
  try {
    const id = req.params.id as string;
    const task = taskStorage.getById(id);

    if (!task) {
      res.status(404).json({ error: 'Task not found' });
      return;
    }

    res.json(convertToResponse(task));
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch task' });
  }
};

export const createTask = (req: Request, res: Response): void => {
  try {
    const { title } = req.body as CreateTaskRequest;

    if (!title || typeof title !== 'string') {
      res.status(400).json({ error: 'Title is required and must be a string' });
      return;
    }

    const trimmedTitle = title.trim();
    if (trimmedTitle.length === 0) {
      res.status(400).json({ error: 'Title cannot be empty' });
      return;
    }

    if (trimmedTitle.length > 500) {
      res.status(400).json({ error: 'Title must be 500 characters or less' });
      return;
    }

    const task = taskStorage.create(trimmedTitle);
    res.status(201).json(convertToResponse(task));
  } catch (error) {
    res.status(500).json({ error: 'Failed to create task' });
  }
};

export const updateTask = (req: Request, res: Response): void => {
  try {
    const id = req.params.id as string;
    const { title, completed } = req.body as UpdateTaskRequest;

    const task = taskStorage.getById(id);
    if (!task) {
      res.status(404).json({ error: 'Task not found' });
      return;
    }

    const updates: any = {};

    if (title !== undefined) {
      if (typeof title !== 'string') {
        res.status(400).json({ error: 'Title must be a string' });
        return;
      }
      const trimmedTitle = title.trim();
      if (trimmedTitle.length === 0) {
        res.status(400).json({ error: 'Title cannot be empty' });
        return;
      }
      if (trimmedTitle.length > 500) {
        res.status(400).json({ error: 'Title must be 500 characters or less' });
        return;
      }
      updates.title = trimmedTitle;
    }

    if (completed !== undefined) {
      if (typeof completed !== 'boolean') {
        res.status(400).json({ error: 'Completed must be a boolean' });
        return;
      }
      updates.completed = completed;
    }

    if (Object.keys(updates).length === 0) {
      res.status(400).json({ error: 'No updates provided' });
      return;
    }

    const updatedTask = taskStorage.update(id, updates);
    if (!updatedTask) {
      res.status(404).json({ error: 'Task not found' });
      return;
    }

    res.json(convertToResponse(updatedTask));
  } catch (error) {
    res.status(500).json({ error: 'Failed to update task' });
  }
};

export const deleteTask = (req: Request, res: Response): void => {
  try {
    const id = req.params.id as string;
    const task = taskStorage.getById(id);

    if (!task) {
      res.status(404).json({ error: 'Task not found' });
      return;
    }

    taskStorage.delete(id);
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete task' });
  }
};

export const deleteAllTasks = (req: Request, res: Response): void => {
  try {
    taskStorage.deleteAll();
    res.json({ message: 'All tasks deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete tasks' });
  }
};

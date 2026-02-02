import { v4 as uuidv4 } from 'uuid';
import { Task } from '../models/task.model.js';

class TaskStorage {
  private tasks: Map<string, Task> = new Map();

  getAll(): Task[] {
    return Array.from(this.tasks.values()).sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  getById(id: string): Task | undefined {
    return this.tasks.get(id);
  }

  create(title: string): Task {
    const id = uuidv4();
    const now = new Date();
    const task: Task = {
      id,
      title,
      completed: false,
      createdAt: now,
      updatedAt: now,
    };
    this.tasks.set(id, task);
    return task;
  }

  update(id: string, updates: Partial<Omit<Task, 'id' | 'createdAt'>>): Task | undefined {
    const task = this.tasks.get(id);
    if (!task) return undefined;

    const updatedTask: Task = {
      ...task,
      ...updates,
      id: task.id,
      createdAt: task.createdAt,
      updatedAt: new Date(),
    };
    this.tasks.set(id, updatedTask);
    return updatedTask;
  }

  delete(id: string): boolean {
    return this.tasks.delete(id);
  }

  deleteAll(): void {
    this.tasks.clear();
  }
}

export const taskStorage = new TaskStorage();

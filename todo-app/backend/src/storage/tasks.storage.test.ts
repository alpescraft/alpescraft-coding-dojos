import { describe, it, expect, beforeEach } from 'vitest';
import { taskStorage } from './tasks.storage.js';

describe('TaskStorage', () => {
  beforeEach(() => {
    taskStorage.deleteAll();
  });

  describe('create()', () => {
    it('should create a task with id, title, completed=false, and dates', () => {
      const task = taskStorage.create('My task');

      expect(task.id).toBeDefined();
      expect(task.title).toBe('My task');
      expect(task.completed).toBe(false);
      expect(task.createdAt).toBeInstanceOf(Date);
      expect(task.updatedAt).toBeInstanceOf(Date);
    });
  });

  describe('getAll()', () => {
    it('should return all tasks sorted by createdAt descending', () => {
      const task1 = taskStorage.create('First');
      const task2 = taskStorage.create('Second');
      const task3 = taskStorage.create('Third');

      // Force distinct createdAt to guarantee sort order
      (task1 as any).createdAt = new Date('2025-01-01');
      (task2 as any).createdAt = new Date('2025-01-02');
      (task3 as any).createdAt = new Date('2025-01-03');

      const all = taskStorage.getAll();

      expect(all).toHaveLength(3);
      expect(all[0].id).toBe(task3.id);
      expect(all[1].id).toBe(task2.id);
      expect(all[2].id).toBe(task1.id);
    });

    it('should return an empty array when no tasks exist', () => {
      expect(taskStorage.getAll()).toEqual([]);
    });
  });

  describe('getById()', () => {
    it('should return the task when it exists', () => {
      const created = taskStorage.create('Find me');
      const found = taskStorage.getById(created.id);

      expect(found).toBeDefined();
      expect(found!.title).toBe('Find me');
    });

    it('should return undefined when task does not exist', () => {
      expect(taskStorage.getById('nonexistent')).toBeUndefined();
    });
  });

  describe('update()', () => {
    it('should update title and set new updatedAt', () => {
      const task = taskStorage.create('Original');
      const originalUpdatedAt = task.updatedAt;

      const updated = taskStorage.update(task.id, { title: 'Updated' });

      expect(updated).toBeDefined();
      expect(updated!.title).toBe('Updated');
      expect(updated!.updatedAt.getTime()).toBeGreaterThanOrEqual(originalUpdatedAt.getTime());
    });

    it('should update completed status', () => {
      const task = taskStorage.create('Toggle me');

      const updated = taskStorage.update(task.id, { completed: true });

      expect(updated).toBeDefined();
      expect(updated!.completed).toBe(true);
    });

    it('should preserve id and createdAt', () => {
      const task = taskStorage.create('Protected');

      const updated = taskStorage.update(task.id, { title: 'Changed' });

      expect(updated!.id).toBe(task.id);
      expect(updated!.createdAt).toEqual(task.createdAt);
    });

    it('should return undefined for nonexistent id', () => {
      expect(taskStorage.update('nonexistent', { title: 'Nope' })).toBeUndefined();
    });
  });

  describe('delete()', () => {
    it('should delete an existing task and return true', () => {
      const task = taskStorage.create('Delete me');

      expect(taskStorage.delete(task.id)).toBe(true);
      expect(taskStorage.getById(task.id)).toBeUndefined();
    });

    it('should return false for nonexistent id', () => {
      expect(taskStorage.delete('nonexistent')).toBe(false);
    });
  });

  describe('deleteAll()', () => {
    it('should remove all tasks', () => {
      taskStorage.create('One');
      taskStorage.create('Two');
      taskStorage.create('Three');

      taskStorage.deleteAll();

      expect(taskStorage.getAll()).toEqual([]);
    });
  });
});

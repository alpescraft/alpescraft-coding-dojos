import { describe, it, expect, beforeEach } from 'vitest';
import request from 'supertest';
import app from '../app.js';
import { taskStorage } from '../storage/tasks.storage.js';

describe('Tasks API', () => {
  beforeEach(() => {
    taskStorage.deleteAll();
  });

  describe('POST /api/tasks', () => {
    it('should create a task and return 201', async () => {
      const res = await request(app)
        .post('/api/tasks')
        .send({ title: 'New task' });

      expect(res.status).toBe(201);
      expect(res.body.title).toBe('New task');
      expect(res.body.completed).toBe(false);
      expect(res.body.id).toBeDefined();
      expect(res.body.createdAt).toBeDefined();
      expect(res.body.updatedAt).toBeDefined();
    });

    it('should return 400 when title is missing', async () => {
      const res = await request(app)
        .post('/api/tasks')
        .send({});

      expect(res.status).toBe(400);
    });

    it('should return 400 when title is empty', async () => {
      const res = await request(app)
        .post('/api/tasks')
        .send({ title: '   ' });

      expect(res.status).toBe(400);
    });

    it('should return 400 when title is too long', async () => {
      const res = await request(app)
        .post('/api/tasks')
        .send({ title: 'a'.repeat(501) });

      expect(res.status).toBe(400);
    });
  });

  describe('GET /api/tasks', () => {
    it('should return all tasks', async () => {
      taskStorage.create('Task 1');
      taskStorage.create('Task 2');

      const res = await request(app).get('/api/tasks');

      expect(res.status).toBe(200);
      expect(res.body).toHaveLength(2);
    });

    it('should return empty array when no tasks', async () => {
      const res = await request(app).get('/api/tasks');

      expect(res.status).toBe(200);
      expect(res.body).toEqual([]);
    });
  });

  describe('GET /api/tasks/:id', () => {
    it('should return a task by id', async () => {
      const task = taskStorage.create('Find me');

      const res = await request(app).get(`/api/tasks/${task.id}`);

      expect(res.status).toBe(200);
      expect(res.body.title).toBe('Find me');
    });

    it('should return 404 for nonexistent task', async () => {
      const res = await request(app).get('/api/tasks/nonexistent');

      expect(res.status).toBe(404);
    });
  });

  describe('PATCH /api/tasks/:id', () => {
    it('should update the title', async () => {
      const task = taskStorage.create('Original');

      const res = await request(app)
        .patch(`/api/tasks/${task.id}`)
        .send({ title: 'Updated' });

      expect(res.status).toBe(200);
      expect(res.body.title).toBe('Updated');
    });

    it('should update the completed status', async () => {
      const task = taskStorage.create('Toggle');

      const res = await request(app)
        .patch(`/api/tasks/${task.id}`)
        .send({ completed: true });

      expect(res.status).toBe(200);
      expect(res.body.completed).toBe(true);
    });

    it('should return 400 for empty title', async () => {
      const task = taskStorage.create('Valid');

      const res = await request(app)
        .patch(`/api/tasks/${task.id}`)
        .send({ title: '   ' });

      expect(res.status).toBe(400);
    });

    it('should return 400 for title too long', async () => {
      const task = taskStorage.create('Valid');

      const res = await request(app)
        .patch(`/api/tasks/${task.id}`)
        .send({ title: 'a'.repeat(501) });

      expect(res.status).toBe(400);
    });

    it('should return 400 when no updates provided', async () => {
      const task = taskStorage.create('Valid');

      const res = await request(app)
        .patch(`/api/tasks/${task.id}`)
        .send({});

      expect(res.status).toBe(400);
    });

    it('should return 404 for nonexistent task', async () => {
      const res = await request(app)
        .patch('/api/tasks/nonexistent')
        .send({ title: 'Nope' });

      expect(res.status).toBe(404);
    });
  });

  describe('DELETE /api/tasks/:id', () => {
    it('should delete an existing task', async () => {
      const task = taskStorage.create('Delete me');

      const res = await request(app).delete(`/api/tasks/${task.id}`);

      expect(res.status).toBe(200);
      expect(taskStorage.getById(task.id)).toBeUndefined();
    });

    it('should return 404 for nonexistent task', async () => {
      const res = await request(app).delete('/api/tasks/nonexistent');

      expect(res.status).toBe(404);
    });
  });

  describe('DELETE /api/tasks', () => {
    it('should delete all tasks', async () => {
      taskStorage.create('Task 1');
      taskStorage.create('Task 2');

      const res = await request(app).delete('/api/tasks');

      expect(res.status).toBe(200);
      expect(taskStorage.getAll()).toEqual([]);
    });
  });
});

import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { TaskStats } from './TaskStats';
import { TaskContext } from '../context/TaskContext';
import type { Task } from '../types/task.types';

const createMockContext = (tasks: Task[]) => ({
  tasks,
  loading: false,
  error: null,
  fetchTasks: vi.fn(),
  addTask: vi.fn(),
  updateTask: vi.fn(),
  deleteTask: vi.fn(),
  deleteAllTasks: vi.fn(),
});

const renderWithTasks = (tasks: Task[]) => {
  const mockContext = createMockContext(tasks);
  return render(
    <TaskContext.Provider value={mockContext}>
      <TaskStats />
    </TaskContext.Provider>
  );
};

const makeTask = (id: string, completed: boolean): Task => ({
  id,
  title: `Task ${id}`,
  completed,
  createdAt: '2025-01-15T10:00:00.000Z',
  updatedAt: '2025-01-15T10:00:00.000Z',
});

describe('TaskStats', () => {
  it('should display total, completed, and pending counts', () => {
    renderWithTasks([
      makeTask('1', false),
      makeTask('2', true),
      makeTask('3', false),
    ]);

    expect(screen.getByText('Total')).toBeInTheDocument();
    expect(screen.getByText('Completed')).toBeInTheDocument();
    expect(screen.getByText('Pending')).toBeInTheDocument();

    expect(screen.getByText('3')).toBeInTheDocument(); // total
    expect(screen.getByText('1')).toBeInTheDocument(); // completed
    expect(screen.getByText('2')).toBeInTheDocument(); // pending
  });

  it('should display all zeros when no tasks', () => {
    renderWithTasks([]);

    const zeros = screen.getAllByText('0');
    expect(zeros).toHaveLength(3);
  });

  it('should count all as completed when all done', () => {
    renderWithTasks([
      makeTask('1', true),
      makeTask('2', true),
    ]);

    // total=2, completed=2, pending=0
    const twos = screen.getAllByText('2');
    expect(twos).toHaveLength(2); // total and completed both show 2
    const zeros = screen.getAllByText('0');
    expect(zeros).toHaveLength(1); // only pending is 0
  });
});

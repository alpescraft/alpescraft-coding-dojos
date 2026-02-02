import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TaskItem } from './TaskItem';
import { TaskContext } from '../context/TaskContext';
import type { Task } from '../types/task.types';

const mockTask: Task = {
  id: '1',
  title: 'Test task',
  completed: false,
  createdAt: '2025-01-15T10:00:00.000Z',
  updatedAt: '2025-01-15T10:00:00.000Z',
};

const createMockContext = (overrides = {}) => ({
  tasks: [] as Task[],
  loading: false,
  error: null,
  fetchTasks: vi.fn(),
  addTask: vi.fn(),
  updateTask: vi.fn(),
  deleteTask: vi.fn(),
  deleteAllTasks: vi.fn(),
  ...overrides,
});

const renderWithContext = (task: Task, contextOverrides = {}) => {
  const mockContext = createMockContext(contextOverrides);
  return {
    ...render(
      <TaskContext.Provider value={mockContext}>
        <TaskItem task={task} />
      </TaskContext.Provider>
    ),
    mockContext,
  };
};

describe('TaskItem', () => {
  it('should display the task title', () => {
    renderWithContext(mockTask);

    expect(screen.getByText('Test task')).toBeInTheDocument();
  });

  it('should display the creation date', () => {
    renderWithContext(mockTask);

    expect(screen.getByText(/15 janvier 2025/)).toBeInTheDocument();
  });

  it('should show checkbox unchecked for incomplete task', () => {
    renderWithContext(mockTask);

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();
  });

  it('should show checkbox checked for completed task', () => {
    renderWithContext({ ...mockTask, completed: true });

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeChecked();
  });

  it('should call updateTask when toggling checkbox', async () => {
    const user = userEvent.setup();
    const updateTask = vi.fn().mockResolvedValue(undefined);
    const { mockContext } = renderWithContext(mockTask, { updateTask });

    await user.click(screen.getByRole('checkbox'));

    expect(mockContext.updateTask).toHaveBeenCalledWith('1', { completed: true });
  });

  it('should call deleteTask when clicking delete button', async () => {
    const user = userEvent.setup();
    const deleteTask = vi.fn().mockResolvedValue(undefined);
    vi.spyOn(window, 'confirm').mockReturnValue(true);

    const { mockContext } = renderWithContext(mockTask, { deleteTask });

    const deleteButton = screen.getByTitle('Supprimer');
    await user.click(deleteButton);

    expect(mockContext.deleteTask).toHaveBeenCalledWith('1');

    vi.restoreAllMocks();
  });

  it('should not delete when user cancels confirmation', async () => {
    const user = userEvent.setup();
    const deleteTask = vi.fn().mockResolvedValue(undefined);
    vi.spyOn(window, 'confirm').mockReturnValue(false);

    const { mockContext } = renderWithContext(mockTask, { deleteTask });

    const deleteButton = screen.getByTitle('Supprimer');
    await user.click(deleteButton);

    expect(mockContext.deleteTask).not.toHaveBeenCalled();

    vi.restoreAllMocks();
  });
});

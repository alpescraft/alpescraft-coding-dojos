import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TaskForm } from './TaskForm';
import { TaskContext } from '../context/TaskContext';
import type { Task } from '../types/task.types';

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

const renderWithContext = (ui: React.ReactElement, contextOverrides = {}) => {
  const mockContext = createMockContext(contextOverrides);
  return {
    ...render(
      <TaskContext.Provider value={mockContext}>{ui}</TaskContext.Provider>
    ),
    mockContext,
  };
};

describe('TaskForm', () => {
  it('should render the input and submit button', () => {
    renderWithContext(<TaskForm />);

    expect(screen.getByPlaceholderText('What needs to be done?')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Add' })).toBeInTheDocument();
  });

  it('should call addTask on valid submission and clear input', async () => {
    const user = userEvent.setup();
    const addTask = vi.fn().mockResolvedValue(undefined);
    const { mockContext } = renderWithContext(<TaskForm />, { addTask });

    const input = screen.getByPlaceholderText('What needs to be done?');
    await user.type(input, 'New task');
    await user.click(screen.getByRole('button', { name: 'Add' }));

    expect(mockContext.addTask).toHaveBeenCalledWith('New task');
    expect(input).toHaveValue('');
  });

  it('should show error when submitting empty title', async () => {
    const user = userEvent.setup();
    renderWithContext(<TaskForm />);

    await user.click(screen.getByRole('button', { name: 'Add' }));

    expect(screen.getByText('Title cannot be empty')).toBeInTheDocument();
  });

  it('should show error when title exceeds 500 characters', async () => {
    const user = userEvent.setup();
    renderWithContext(<TaskForm />);

    const input = screen.getByPlaceholderText('What needs to be done?');
    // Use fireEvent.change to bypass maxLength=500 HTML constraint
    fireEvent.change(input, { target: { value: 'a'.repeat(501) } });
    await user.click(screen.getByRole('button', { name: 'Add' }));

    expect(screen.getByText('Title must be 500 characters or less')).toBeInTheDocument();
  });

  it('should show character count when typing', async () => {
    const user = userEvent.setup();
    renderWithContext(<TaskForm />);

    const input = screen.getByPlaceholderText('What needs to be done?');
    await user.type(input, 'Hello');

    expect(screen.getByText('5/500 characters')).toBeInTheDocument();
  });
});

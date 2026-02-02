import React, { useState } from 'react';
import type { Task } from '../types/task.types';
import { useTasks } from '../hooks/useTasks';

interface TaskItemProps {
  task: Task;
}

export const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editError, setEditError] = useState<string | null>(null);
  const { updateTask, deleteTask } = useTasks();

  const handleToggleComplete = async () => {
    try {
      await updateTask(task.id, { completed: !task.completed });
    } catch (err) {
      console.error('Failed to update task');
    }
  };

  const handleSaveEdit = async () => {
    setEditError(null);

    if (!editTitle.trim()) {
      setEditError('Title cannot be empty');
      return;
    }

    if (editTitle.length > 500) {
      setEditError('Title must be 500 characters or less');
      return;
    }

    if (editTitle === task.title) {
      setIsEditing(false);
      return;
    }

    try {
      await updateTask(task.id, { title: editTitle });
      setIsEditing(false);
    } catch (err) {
      setEditError('Failed to save changes');
    }
  };

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this task?')) {
      try {
        await deleteTask(task.id);
      } catch (err) {
        console.error('Failed to delete task');
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSaveEdit();
    } else if (e.key === 'Escape') {
      setIsEditing(false);
      setEditTitle(task.title);
      setEditError(null);
    }
  };

  return (
    <div className={`bg-white rounded-2xl border shadow-sm hover:shadow-md transition-all p-5 mb-3 group ${
      task.completed ? 'border-emerald-100 bg-emerald-50/30' : 'border-gray-100'
    }`}>
      <div className="flex items-start gap-4">
        <label className="relative mt-0.5 cursor-pointer">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={handleToggleComplete}
            className="sr-only peer"
          />
          <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${
            task.completed
              ? 'bg-emerald-500 border-emerald-500'
              : 'border-gray-300 hover:border-indigo-400'
          }`}>
            {task.completed && (
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
            )}
          </div>
        </label>
        <div className="flex-1 min-w-0">
          {isEditing ? (
            <div>
              <input
                type="text"
                value={editTitle}
                onChange={(e) => {
                  setEditTitle(e.target.value);
                  setEditError(null);
                }}
                onKeyDown={handleKeyDown}
                onBlur={handleSaveEdit}
                autoFocus
                maxLength={500}
                className="w-full px-3 py-1.5 border-2 border-indigo-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-200 transition-all"
              />
              {editError && (
                <p className="text-red-500 text-sm mt-1.5">{editError}</p>
              )}
              {editTitle.length > 0 && (
                <p className="text-gray-400 text-xs mt-1.5">
                  {editTitle.length}/500 characters
                </p>
              )}
            </div>
          ) : (
            <p
              onDoubleClick={() => setIsEditing(true)}
              className={`cursor-text select-none text-base leading-relaxed transition-colors ${
                task.completed
                  ? 'line-through text-gray-400'
                  : 'text-gray-800'
              }`}
            >
              {task.title}
            </p>
          )}
          <p className="text-gray-400 text-xs mt-1.5">
            {new Date(task.createdAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
        </div>
        <button
          onClick={handleDelete}
          className="opacity-0 group-hover:opacity-100 px-3 py-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all text-sm font-medium"
          title="Supprimer"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </div>
  );
};

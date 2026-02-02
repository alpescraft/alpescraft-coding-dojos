import React, { useState } from 'react';
import { useTasks } from '../hooks/useTasks';

export const TaskForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const [error, setError] = useState<string | null>(null);
  const { addTask } = useTasks();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!title.trim()) {
      setError('Title cannot be empty');
      return;
    }

    if (title.length > 500) {
      setError('Title must be 500 characters or less');
      return;
    }

    try {
      await addTask(title);
      setTitle('');
    } catch (err) {
      setError('Failed to add task');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <div className="flex gap-3">
        <input
          type="text"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            setError(null);
          }}
          placeholder="What needs to be done?"
          maxLength={500}
          className="flex-1 px-5 py-3 bg-white border border-gray-200 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent text-gray-700 placeholder-gray-400 transition-all"
        />
        <button
          type="submit"
          className="px-7 py-3 bg-gradient-to-r from-indigo-500 to-cyan-500 text-white rounded-2xl hover:from-indigo-600 hover:to-cyan-600 transition-all font-semibold shadow-md shadow-indigo-200 hover:shadow-lg hover:shadow-indigo-300 active:scale-95"
        >
          Add
        </button>
      </div>
      {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
      {title.length > 0 && (
        <p className="text-gray-500 text-sm mt-1">
          {title.length}/500 characters
        </p>
      )}
    </form>
  );
};

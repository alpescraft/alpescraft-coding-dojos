import React from 'react';
import { useTasks } from '../hooks/useTasks';

export const TaskStats: React.FC = () => {
  const { tasks } = useTasks();

  const total = tasks.length;
  const completed = tasks.filter((task) => task.completed).length;
  const pending = total - completed;

  return (
    <div className="grid grid-cols-3 gap-4 mb-8">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow p-5">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
          <p className="text-gray-500 text-sm font-medium uppercase tracking-wide">Total</p>
        </div>
        <p className="text-3xl font-bold text-gray-900">{total}</p>
      </div>
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow p-5">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
          <p className="text-gray-500 text-sm font-medium uppercase tracking-wide">Completed</p>
        </div>
        <p className="text-3xl font-bold text-emerald-600">{completed}</p>
      </div>
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow p-5">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-2 h-2 rounded-full bg-amber-500"></div>
          <p className="text-gray-500 text-sm font-medium uppercase tracking-wide">Pending</p>
        </div>
        <p className="text-3xl font-bold text-amber-600">{pending}</p>
      </div>
    </div>
  );
};

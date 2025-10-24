import React, { useEffect, useState } from 'react';
import { TaskItem } from './types';
import { getTasks, addTask, updateTask, deleteTask } from './api';

export default function App() {
  const [tasks, setTasks] = useState<TaskItem[]>([]);
  const [desc, setDesc] = useState('');
  const [filter, setFilter] = useState<'all'|'active'|'completed'>('all');

  useEffect(() => {
    fetchTasks();
    // hydrate from localStorage if available
    const saved = localStorage.getItem('tasks');
    if (saved) {
      try { setTasks(JSON.parse(saved)); } catch {}
    }
  }, []);

  const fetchTasks = async () => {
    try {
      const data = await getTasks();
      setTasks(data);
      localStorage.setItem('tasks', JSON.stringify(data));
    } catch (err) {
      console.error(err);
    }
  };

  const onAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!desc.trim()) return;
    const newTask = await addTask(desc.trim());
    const next = [...tasks, newTask];
    setTasks(next);
    setDesc('');
    localStorage.setItem('tasks', JSON.stringify(next));
  };

  const onToggle = async (t: TaskItem) => {
    const updated = { ...t, isCompleted: !t.isCompleted };
    await updateTask(updated);
    const next = tasks.map(x => x.id === t.id ? updated : x);
    setTasks(next);
    localStorage.setItem('tasks', JSON.stringify(next));
  };

  const onDelete = async (id: string) => {
    await deleteTask(id);
    const next = tasks.filter(t => t.id !== id);
    setTasks(next);
    localStorage.setItem('tasks', JSON.stringify(next));
  };

  const filtered = tasks.filter(t =>
    filter === 'all' ? true :
    filter === 'active' ? !t.isCompleted : t.isCompleted
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow">
        <h1 className="text-2xl font-bold mb-4">Tasks</h1>

        <form onSubmit={onAdd} className="flex gap-2 mb-4">
          <input
            value={desc}
            onChange={e => setDesc(e.target.value)}
            placeholder="Add new task..."
            className="flex-1 p-2 border rounded"
          />
          <button className="px-4 py-2 border rounded bg-blue-500 text-white">Add</button>
        </form>

        <div className="mb-3 flex gap-2">
          <button onClick={() => setFilter('all')} className="px-2 py-1 border rounded">All</button>
          <button onClick={() => setFilter('active')} className="px-2 py-1 border rounded">Active</button>
          <button onClick={() => setFilter('completed')} className="px-2 py-1 border rounded">Completed</button>
        </div>

        <ul>
          {filtered.map(t => (
            <li key={t.id} className="flex items-center justify-between py-2 border-b">
              <div className="flex items-center gap-3">
                <input type="checkbox" checked={t.isCompleted} onChange={() => onToggle(t)} />
                <span className={t.isCompleted ? 'line-through' : ''}>{t.description}</span>
              </div>
              <button onClick={() => onDelete(t.id)} className="text-sm text-red-600">Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

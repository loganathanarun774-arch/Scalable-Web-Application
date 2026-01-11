import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import Sidebar from '../components/Sidebar';
import { taskService } from '../services/task.service';
import {
    Plus,
    Search,
    Filter,
    Trash2,
    Edit3,
    Calendar,
    Clock,
    CheckCircle2,
    Loader2,
    X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Dashboard = () => {
    const { user } = useAuth();
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [filter, setFilter] = useState('all');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentTask, setCurrentTask] = useState(null);
    const [formData, setFormData] = useState({ title: '', description: '', status: 'todo' });

    useEffect(() => {
        fetchTasks();
    }, [user.id]);

    const fetchTasks = async () => {
        try {
            const resp = await taskService.getTasks(user.id);
            setTasks(resp.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateOrUpdate = async (e) => {
        e.preventDefault();
        try {
            if (currentTask) {
                await taskService.updateTask(currentTask.id, formData);
            } else {
                await taskService.createTask({ ...formData, userId: user.id });
            }
            setIsModalOpen(false);
            setCurrentTask(null);
            setFormData({ title: '', description: '', status: 'todo' });
            fetchTasks();
        } catch (err) {
            console.error(err);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this task?')) {
            try {
                await taskService.deleteTask(id);
                fetchTasks();
            } catch (err) {
                console.error(err);
            }
        }
    };

    const openModal = (task = null) => {
        if (task) {
            setCurrentTask(task);
            setFormData({ title: task.title, description: task.description, status: task.status });
        } else {
            setCurrentTask(null);
            setFormData({ title: '', description: '', status: 'todo' });
        }
        setIsModalOpen(true);
    };

    const filteredTasks = tasks.filter(task => {
        const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            task.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesFilter = filter === 'all' || task.status === filter;
        return matchesSearch && matchesFilter;
    });

    return (
        <div className="pl-72 min-h-screen">
            <Sidebar />

            <main className="p-10">
                <header className="flex items-center justify-between mb-10">
                    <div>
                        <h1 className="text-4xl font-bold tracking-tight mb-2">My Tasks</h1>
                        <p className="text-dark-muted">Manage your projects and stay productive.</p>
                    </div>
                    <button
                        onClick={() => openModal()}
                        className="bg-primary-600 hover:bg-primary-500 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 transition-all shadow-lg shadow-primary-500/20"
                    >
                        <Plus size={20} />
                        Add Task
                    </button>
                </header>

                {/* Filters and Search */}
                <div className="flex flex-col md:flex-row gap-4 mb-8">
                    <div className="relative flex-1">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-dark-muted" size={20} />
                        <input
                            type="text"
                            placeholder="Search tasks..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full glass bg-white/5 border-white/10 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all text-sm"
                        />
                    </div>
                    <div className="flex gap-2">
                        {['all', 'todo', 'in-progress', 'completed'].map(f => (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                className={twMerge(
                                    "px-4 py-2 rounded-xl text-sm font-medium transition-all capitalize",
                                    filter === f
                                        ? "bg-primary-500 text-white shadow-lg shadow-primary-500/25"
                                        : "glass hover:bg-white/10 text-dark-muted"
                                )}
                            >
                                {f.replace('-', ' ')}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Tasks Grid */}
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20 gap-4">
                        <Loader2 className="animate-spin text-primary-500" size={48} />
                        <p className="text-dark-muted animate-pulse">Loading your workspace...</p>
                    </div>
                ) : filteredTasks.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <AnimatePresence mode="popLayout">
                            {filteredTasks.map(task => (
                                <motion.div
                                    key={task.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    className="glass-dark rounded-2xl p-6 border border-white/5 hover:border-primary-500/30 transition-all group"
                                >
                                    <div className="flex justify-between items-start mb-4">
                                        <span className={twMerge(
                                            "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
                                            task.status === 'completed' ? "bg-green-500/10 text-green-400" :
                                                task.status === 'in-progress' ? "bg-blue-500/10 text-blue-400" :
                                                    "bg-yellow-500/10 text-yellow-400"
                                        )}>
                                            {task.status.replace('-', ' ')}
                                        </span>
                                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button onClick={() => openModal(task)} className="p-2 hover:bg-white/5 rounded-lg text-dark-muted hover:text-white transition-colors">
                                                <Edit3 size={16} />
                                            </button>
                                            <button onClick={() => handleDelete(task.id)} className="p-2 hover:bg-red-500/10 rounded-lg text-dark-muted hover:text-red-400 transition-colors">
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </div>
                                    <h3 className="text-lg font-bold mb-2 line-clamp-1">{task.title}</h3>
                                    <p className="text-dark-muted text-sm mb-6 line-clamp-2 min-h-[2.5rem]">{task.description}</p>

                                    <div className="flex items-center justify-between pt-4 border-t border-white/5">
                                        <div className="flex items-center gap-2 text-xs text-dark-muted">
                                            <Calendar size={14} />
                                            {new Date(task.createdAt).toLocaleDateString()}
                                        </div>
                                        {task.status === 'completed' && <CheckCircle2 size={16} className="text-green-500" />}
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                ) : (
                    <div className="text-center py-20 glass rounded-3xl">
                        <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-white/5 text-dark-muted mb-6">
                            <Clock size={40} />
                        </div>
                        <h3 className="text-xl font-bold mb-2">No tasks found</h3>
                        <p className="text-dark-muted">Try adjusting your filters or create a new task!</p>
                    </div>
                )}
            </main>

            {/* Task Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsModalOpen(false)}
                            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="glass-dark w-full max-w-lg rounded-3xl p-8 relative z-10 shadow-2xl border border-white/10"
                        >
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="absolute right-6 top-6 text-dark-muted hover:text-white transition-colors"
                            >
                                <X size={24} />
                            </button>

                            <h2 className="text-2xl font-bold mb-8">
                                {currentTask ? 'Edit Task' : 'Create New Task'}
                            </h2>

                            <form onSubmit={handleCreateOrUpdate} className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-dark-muted ml-1">Task Title</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all"
                                        placeholder="e.g. Design System"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-dark-muted ml-1">Description</label>
                                    <textarea
                                        rows={4}
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all resize-none"
                                        placeholder="Describe the task details..."
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-dark-muted ml-1">Status</label>
                                    <div className="grid grid-cols-3 gap-3">
                                        {['todo', 'in-progress', 'completed'].map(s => (
                                            <button
                                                key={s}
                                                type="button"
                                                onClick={() => setFormData({ ...formData, status: s })}
                                                className={twMerge(
                                                    "py-2 rounded-xl text-xs font-semibold uppercase tracking-wider border transition-all",
                                                    formData.status === s
                                                        ? "bg-primary-500/10 border-primary-500 text-primary-400"
                                                        : "border-white/5 bg-white/5 text-dark-muted hover:border-white/10"
                                                )}
                                            >
                                                {s.replace('-', ' ')}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-primary-600 hover:bg-primary-500 text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-primary-500/25 mt-4"
                                >
                                    {currentTask ? 'Update Task' : 'Create Task'}
                                </button>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

const twMerge = (...inputs) => inputs.filter(Boolean).join(' ');

export default Dashboard;

import { mockApi } from './api';

const TASKS_KEY = 'app_tasks';

export const taskService = {
    getTasks: async (userId) => {
        const allTasks = JSON.parse(localStorage.getItem(TASKS_KEY) || '[]');
        const userTasks = allTasks.filter(t => t.userId === userId);
        return mockApi(userTasks);
    },

    createTask: async (taskData) => {
        const allTasks = JSON.parse(localStorage.getItem(TASKS_KEY) || '[]');
        const newTask = {
            ...taskData,
            id: Math.random().toString(36).substr(2, 9),
            createdAt: new Date().toISOString()
        };
        allTasks.push(newTask);
        localStorage.setItem(TASKS_KEY, JSON.stringify(allTasks));
        return mockApi(newTask);
    },

    updateTask: async (id, updates) => {
        const allTasks = JSON.parse(localStorage.getItem(TASKS_KEY) || '[]');
        const index = allTasks.findIndex(t => t.id === id);
        if (index === -1) throw new Error('Task not found');

        allTasks[index] = { ...allTasks[index], ...updates };
        localStorage.setItem(TASKS_KEY, JSON.stringify(allTasks));
        return mockApi(allTasks[index]);
    },

    deleteTask: async (id) => {
        const allTasks = JSON.parse(localStorage.getItem(TASKS_KEY) || '[]');
        const filteredTasks = allTasks.filter(t => t.id !== id);
        localStorage.setItem(TASKS_KEY, JSON.stringify(filteredTasks));
        return mockApi({ success: true });
    }
};

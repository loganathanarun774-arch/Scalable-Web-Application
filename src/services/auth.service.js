import { mockApi } from './api';

const USERS_KEY = 'app_users';
const CURRENT_USER_KEY = 'current_user';
const TOKEN_KEY = 'auth_token';

export const authService = {
    login: async (email, password) => {
        const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
        const user = users.find(u => u.email === email && u.password === password);

        if (user) {
            const token = btoa(JSON.stringify({ id: user.id, email: user.email, exp: Date.now() + 86400000 }));
            localStorage.setItem(TOKEN_KEY, token);
            localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
            return mockApi({ user, token });
        }

        throw new Error('Invalid email or password');
    },

    register: async (userData) => {
        const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
        if (users.find(u => u.email === userData.email)) {
            throw new Error('Email already exists');
        }

        const newUser = {
            ...userData,
            id: Math.random().toString(36).substr(2, 9),
            createdAt: new Date().toISOString()
        };

        users.push(newUser);
        localStorage.setItem(USERS_KEY, JSON.stringify(users));

        return mockApi(newUser);
    },

    logout: () => {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(CURRENT_USER_KEY);
    },

    getCurrentUser: () => {
        const user = localStorage.getItem(CURRENT_USER_KEY);
        return user ? JSON.parse(user) : null;
    },

    updateProfile: async (updates) => {
        const currentUser = JSON.parse(localStorage.getItem(CURRENT_USER_KEY));
        const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');

        const updatedUser = { ...currentUser, ...updates };
        const updatedUsers = users.map(u => u.id === currentUser.id ? updatedUser : u);

        localStorage.setItem(USERS_KEY, JSON.stringify(updatedUsers));
        localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(updatedUser));

        return mockApi(updatedUser);
    },

    seed: () => {
        const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
        if (users.length === 0) {
            const demoUser = {
                id: 'demo-user',
                name: 'Demo User',
                email: 'demo@example.com',
                password: 'password123',
                createdAt: new Date().toISOString()
            };
            localStorage.setItem(USERS_KEY, JSON.stringify([demoUser]));

            const demoTasks = [
                { id: '1', userId: 'demo-user', title: 'Complete Project Architecture', description: 'Define the core components and state management strategy.', status: 'completed', createdAt: new Date().toISOString() },
                { id: '2', userId: 'demo-user', title: 'Implement Authentication', description: 'Build login and registration flows with mock backend.', status: 'in-progress', createdAt: new Date().toISOString() },
                { id: '3', userId: 'demo-user', title: 'Design System Polish', description: 'Fine-tune glassmorphism and animations for premium feel.', status: 'todo', createdAt: new Date().toISOString() },
            ];
            localStorage.setItem('app_tasks', JSON.stringify(demoTasks));
        }
    }
};

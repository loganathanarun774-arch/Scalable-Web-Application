import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Sidebar from '../components/Sidebar';
import { User, Mail, Save, Camera, Loader2, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

const Profile = () => {
    const { user, updateProfile } = useAuth();
    const [formData, setFormData] = useState({ name: user?.name || '', email: user?.email || '' });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');
        try {
            await updateProfile(formData);
            setMessage('Profile updated successfully!');
            setTimeout(() => setMessage(''), 3000);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="pl-72 min-h-screen">
            <Sidebar />

            <main className="p-10 flex justify-center">
                <div className="w-full max-w-2xl">
                    <header className="mb-10">
                        <h1 className="text-4xl font-bold tracking-tight mb-2">Profile Settings</h1>
                        <p className="text-dark-muted">Manage your personal information and account security.</p>
                    </header>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="glass-dark rounded-3xl p-8 border border-white/5"
                    >
                        <div className="flex flex-col items-center mb-10">
                            <div className="relative group">
                                <div className="h-32 w-32 rounded-full bg-primary-500/10 border-2 border-primary-500/30 flex items-center justify-center text-primary-400 text-4xl font-bold overflow-hidden">
                                    {user?.name?.[0] || 'U'}
                                </div>
                                <button className="absolute bottom-1 right-1 p-2 bg-primary-600 rounded-full text-white shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Camera size={18} />
                                </button>
                            </div>
                            <h2 className="mt-4 text-xl font-bold">{user?.name}</h2>
                            <div className="flex items-center gap-1.5 text-green-400 text-xs font-semibold mt-1 bg-green-400/10 px-3 py-1 rounded-full uppercase tracking-wider">
                                <ShieldCheck size={12} />
                                Verified Account
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {message && (
                                <div className="bg-green-500/10 border border-green-500/20 text-green-400 p-4 rounded-2xl text-sm text-center font-medium">
                                    {message}
                                </div>
                            )}

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-dark-muted ml-1">Full Name</label>
                                    <div className="relative">
                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-dark-muted" size={18} />
                                        <input
                                            type="text"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-11 pr-4 focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-dark-muted ml-1">Email Address</label>
                                    <div className="relative">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-dark-muted" size={18} />
                                        <input
                                            type="email"
                                            disabled
                                            value={formData.email}
                                            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-11 pr-4 focus:outline-none cursor-not-allowed opacity-60"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="pt-6 border-t border-white/5">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full md:w-auto bg-primary-600 hover:bg-primary-500 text-white font-bold py-4 px-10 rounded-2xl transition-all shadow-lg shadow-primary-500/20 flex items-center justify-center gap-2"
                                >
                                    {loading ? <Loader2 className="animate-spin" size={18} /> : (
                                        <>
                                            <Save size={18} />
                                            Save Changes
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="mt-8 glass-dark rounded-3xl p-8 border border-white/5"
                    >
                        <h3 className="text-lg font-bold mb-4">Account Security</h3>
                        <p className="text-sm text-dark-muted mb-6">Password was last changed 3 months ago. We recommend refreshing it regularly for better security.</p>
                        <button className="text-sm font-bold text-primary-400 hover:text-primary-300 transition-colors uppercase tracking-widest">
                            Update Password →
                        </button>
                    </motion.div>
                </div>
            </main>
        </div>
    );
};

export default Profile;

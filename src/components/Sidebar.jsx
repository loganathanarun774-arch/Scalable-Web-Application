import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LayoutDashboard, User, LogOut, CheckCircle2 } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const cn = (...inputs) => twMerge(clsx(inputs));

const NavItem = ({ to, icon: Icon, label, active }) => (
    <Link
        to={to}
        className={cn(
            "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group",
            active
                ? "bg-primary-500/10 text-primary-400"
                : "text-dark-muted hover:bg-white/5 hover:text-white"
        )}
    >
        <Icon size={20} className={cn("transition-transform", active ? "scale-110" : "group-hover:scale-110")} />
        <span className="font-medium">{label}</span>
        {active && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary-500 shadow-lg shadow-primary-500/50" />}
    </Link>
);

const Sidebar = () => {
    const { logout, user } = useAuth();
    const location = useLocation();

    return (
        <div className="fixed inset-y-0 left-0 w-72 glass-dark border-r border-white/5 flex flex-col p-6 z-50">
            <div className="flex items-center gap-3 px-2 mb-10">
                <div className="h-10 w-10 bg-primary-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary-500/20">
                    <CheckCircle2 size={24} />
                </div>
                <span className="text-xl font-bold tracking-tight">StatusPro</span>
            </div>

            <nav className="flex-1 space-y-2">
                <NavItem to="/dashboard" icon={LayoutDashboard} label="Dashboard" active={location.pathname === '/dashboard'} />
                <NavItem to="/profile" icon={User} label="Profile" active={location.pathname === '/profile'} />
            </nav>

            <div className="mt-auto pt-6 border-t border-white/5">
                <div className="flex items-center gap-3 px-4 py-3 mb-4 rounded-2xl bg-white/5">
                    <div className="h-10 w-10 rounded-full bg-primary-500/20 flex items-center justify-center text-primary-400 font-bold uppercase">
                        {user?.name?.[0] || 'U'}
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold truncate">{user?.name}</p>
                        <p className="text-xs text-dark-muted truncate">{user?.email}</p>
                    </div>
                </div>
                <button
                    onClick={logout}
                    className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-red-400 hover:bg-red-500/10 transition-colors group"
                >
                    <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" />
                    <span className="font-medium">Logout</span>
                </button>
            </div>
        </div>
    );
};

export default Sidebar;

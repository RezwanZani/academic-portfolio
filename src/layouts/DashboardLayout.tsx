import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  User, GraduationCap, Briefcase, Mic, Map, Folder, 
  BookOpen, Lightbulb, Code, LogOut, LayoutDashboard, Database
} from 'lucide-react';

export const DashboardLayout: React.FC = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const navItems = [
    { name: 'Dashboard Home', path: '/dashboard', icon: LayoutDashboard, exact: true },
    { name: 'Personal Info', path: '/dashboard/personal-info', icon: User },
    { name: 'Education', path: '/dashboard/education', icon: GraduationCap },
    { name: 'Experience', path: '/dashboard/experience', icon: Briefcase },
    { name: 'Conferences', path: '/dashboard/conferences', icon: Mic },
    { name: 'Journey', path: '/dashboard/journey', icon: Map },
    { name: 'Projects & Fundings', path: '/dashboard/projects', icon: Folder },
    { name: 'Publications', path: '/dashboard/publications', icon: BookOpen },
    { name: 'Research Interests', path: '/dashboard/research-interests', icon: Lightbulb },
    { name: 'Skills', path: '/dashboard/skills', icon: Code },
    { name: 'Data Setup', path: '/dashboard/setup', icon: Database },
  ];

  return (
    <div className="flex h-screen bg-[#0a0a0a] text-white overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-white/5 border-r border-white/10 flex flex-col">
        <div className="p-6 border-b border-white/10">
          <h2 className="text-xl font-bold">Portfolio Admin</h2>
          <p className="text-xs text-gray-400 mt-1 truncate">{user?.email}</p>
        </div>
        
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.name}
                to={item.path}
                end={item.exact}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                    isActive 
                      ? 'bg-primary/20 text-primary' 
                      : 'text-gray-400 hover:bg-white/5 hover:text-white'
                  }`
                }
              >
                <Icon className="w-5 h-5" />
                <span className="text-sm font-medium">{item.name}</span>
              </NavLink>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-3 py-2 text-red-400 hover:bg-red-500/10 hover:text-red-500 rounded-lg transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className="text-sm font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

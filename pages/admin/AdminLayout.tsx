import React from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useCMS } from '../../context/CMSContext';
import { LayoutDashboard, FileText, Settings, Globe, Package, MessageSquare, LogOut } from 'lucide-react';

const AdminLayout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useCMS();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: <LayoutDashboard size={20} /> },
    { name: 'Pages', path: '/admin/pages', icon: <FileText size={20} /> },
    { name: 'Blog Posts', path: '/admin/posts', icon: <MessageSquare size={20} /> },
    { name: 'Packages', path: '/admin/packages', icon: <Package size={20} /> },
    { name: 'Settings', path: '/admin/settings', icon: <Settings size={20} /> },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex-shrink-0 hidden md:flex flex-col">
        <div className="p-6 border-b border-slate-800">
          <h1 className="text-2xl font-serif font-bold">WC Admin</h1>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                location.pathname === item.path 
                  ? 'bg-primary text-white' 
                  : 'text-gray-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              {item.icon}
              <span className="font-medium">{item.name}</span>
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-slate-800">
          <Link to="/" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white transition-colors">
            <Globe size={20} />
            <span>View Site</span>
          </Link>
           <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:text-red-300 transition-colors mt-2 text-left">
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm h-16 flex items-center justify-between px-6 md:hidden">
             <span className="font-bold text-gray-800">Admin Panel</span>
             <Link to="/" className="text-sm text-primary">Back to Site</Link>
        </header>
        <main className="flex-1 overflow-y-auto p-6 md:p-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;


import React from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { SIDEBAR_ITEMS } from '../constants';
import { useAuth } from '../contexts/AuthContext';
import { Sparkles, LogOut } from 'lucide-react';

const Layout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/login');
    } catch (error) {
      console.error("Failed to sign out", error);
    }
  };

  const isActive = (path: string) => {
    if (path === '/dashboard' && location.pathname === '/dashboard') return true;
    // Add other active checks if needed
    return false;
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <Link to="/" className="p-6 flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity">
          <div className="bg-emerald-500 p-1.5 rounded-lg text-white">
            <Sparkles size={16} fill="currentColor" />
          </div>
          <h1 className="text-xl font-bold text-gray-900 tracking-tight">WeAISO</h1>
        </Link>

        <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
          <Link
            to="/dashboard"
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${location.pathname.startsWith('/dashboard') || location.pathname.startsWith('/result') || location.pathname.startsWith('/wizard')
                ? 'bg-emerald-50 text-emerald-700'
                : 'text-gray-500 hover:bg-gray-100'
              }`}
          >
            {SIDEBAR_ITEMS[0]?.icon}
            <span>Overview</span>
          </Link>
          {/* We can map other items if they have routes, for now just Overview/Dashboard is main */}
        </nav>

        <div className="p-4 border-t border-gray-100">
          <div className="bg-orange-50 rounded-xl p-4 mb-4">
            <p className="text-xs font-semibold text-orange-800 uppercase tracking-wider mb-1">Suggest Feature</p>
            <p className="text-xs text-orange-700 leading-relaxed">Have an idea to improve our AI tracking?</p>
          </div>
          <div className="flex items-center gap-3 px-2">
            <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold uppercase">
              {user?.email?.substring(0, 2) || "U"}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900 truncate">{user?.user_metadata?.full_name || "User"}</p>
              <p className="text-xs text-gray-500 truncate">{user?.email}</p>
            </div>
          </div>

          <button
            onClick={handleSignOut}
            className="w-full mt-4 flex items-center gap-2 px-2 py-2 text-sm text-gray-500 hover:text-red-600 transition-colors"
          >
            <LogOut size={16} />
            Sign out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;

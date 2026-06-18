import { Bell, Building2, LayoutDashboard, LogOut, Menu, Moon, Sun, UsersRound, X } from 'lucide-react';
import { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import { useTheme } from '../../context/ThemeContext.jsx';

const navigation = [
  { label: 'Dashboard', to: '/dashboard', icon: LayoutDashboard, end: true },
  { label: 'Employees', to: '/dashboard/employees', icon: UsersRound },
];

export default function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  return (
    <div className="min-h-screen bg-ink-50 text-ink-900 dark:bg-slate-950 dark:text-slate-100">
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-72 transform border-r border-slate-200 bg-white transition-transform duration-300 dark:border-slate-800 dark:bg-slate-900 lg:translate-x-0 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-full flex-col">
          <div className="flex h-20 items-center justify-between px-6">
            <div className="flex items-center gap-3">
              <div className="grid h-11 w-11 place-items-center rounded-lg bg-brand-600 text-white">
                <Building2 className="h-6 w-6" />
              </div>
              <div>
                <p className="text-base font-bold">WorkforceOS</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">Employee management</p>
              </div>
            </div>
            <button
              type="button"
              className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 lg:hidden"
              onClick={() => setIsSidebarOpen(false)}
              aria-label="Close navigation"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <nav className="flex-1 space-y-1 px-4">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  onClick={() => setIsSidebarOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition ${
                      isActive
                        ? 'bg-brand-600 text-white shadow-soft'
                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white'
                    }`
                  }
                >
                  <Icon className="h-5 w-5" />
                  {item.label}
                </NavLink>
              );
            })}
          </nav>

          <div className="border-t border-slate-200 p-4 dark:border-slate-800">
            <button
              type="button"
              onClick={handleLogout}
              className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-semibold text-rose-600 hover:bg-rose-50 dark:text-rose-300 dark:hover:bg-rose-950/40"
            >
              <LogOut className="h-5 w-5" />
              Logout
            </button>
          </div>
        </div>
      </aside>

      {isSidebarOpen ? (
        <button
          type="button"
          className="fixed inset-0 z-30 bg-slate-950/45 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
          aria-label="Close navigation overlay"
        />
      ) : null}

      <div className="lg:pl-72">
        <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/88 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/82">
          <div className="flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3">
              <button
                type="button"
                className="rounded-lg border border-slate-200 p-2 text-slate-600 dark:border-slate-700 dark:text-slate-300 lg:hidden"
                onClick={() => setIsSidebarOpen(true)}
                aria-label="Open navigation"
              >
                <Menu className="h-5 w-5" />
              </button>
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">Admin console</p>
                <h1 className="text-lg font-bold sm:text-xl">Employee Management</h1>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <button
                type="button"
                onClick={toggleTheme}
                className="rounded-lg border border-slate-200 p-2.5 text-slate-600 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>

              <div className="hidden items-center gap-3 rounded-lg border border-slate-200 px-3 py-2 dark:border-slate-700 sm:flex">
                <div className="grid h-9 w-9 place-items-center rounded-lg bg-slate-900 text-sm font-bold text-white dark:bg-white dark:text-slate-900">
                  {user?.name?.slice(0, 1) || 'A'}
                </div>
                <div>
                  <p className="text-sm font-semibold">{user?.name || 'Admin User'}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{user?.role || 'HR Manager'}</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="px-4 py-6 sm:px-6 lg:px-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

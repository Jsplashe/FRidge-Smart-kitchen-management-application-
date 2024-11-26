import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Refrigerator, ChefHat, Calendar, Settings, LogOut } from 'lucide-react';
import NotificationsPanel from '../notifications/NotificationsPanel';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="hidden md:flex md:flex-col md:w-64 bg-white border-r border-gray-200">
        <div className="flex items-center space-x-2 px-6 py-4 border-b">
          <Refrigerator className="h-8 w-8 text-emerald-600" />
          <span className="text-xl font-bold text-gray-900">FRiDGE</span>
        </div>
        
        <nav className="flex-1 px-4 py-6 space-y-1">
          <NavItem
            to="/dashboard"
            icon={<Refrigerator className="h-5 w-5" />}
            isActive={isActive('/dashboard')}
          >
            Inventory
          </NavItem>
          <NavItem
            to="/recipes"
            icon={<ChefHat className="h-5 w-5" />}
            isActive={isActive('/recipes')}
          >
            Recipes
          </NavItem>
          <NavItem
            to="/planner"
            icon={<Calendar className="h-5 w-5" />}
            isActive={isActive('/planner')}
          >
            Meal Planner
          </NavItem>
        </nav>

        <div className="border-t border-gray-200 p-4">
          <NavItem
            to="/settings"
            icon={<Settings className="h-5 w-5" />}
            isActive={isActive('/settings')}
          >
            Settings
          </NavItem>
          <button className="w-full mt-2 flex items-center space-x-2 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
            <LogOut className="h-5 w-5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Navigation Bar */}
        <header className="bg-white border-b border-gray-200 h-16">
          <div className="h-full px-4 flex items-center justify-end space-x-4">
            <NotificationsPanel />
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

function NavItem({ to, icon, children, isActive }: {
  to: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  isActive: boolean;
}) {
  return (
    <Link
      to={to}
      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
        isActive
          ? 'bg-emerald-50 text-emerald-600'
          : 'text-gray-600 hover:bg-gray-100'
      }`}
    >
      {icon}
      <span>{children}</span>
    </Link>
  );
}
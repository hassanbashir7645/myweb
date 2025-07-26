import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Building2, 
  UserPlus, 
  Brain, 
  CheckSquare, 
  ClipboardList, 
  Megaphone, 
  Award, 
  Truck, 
  BarChart3, 
  Settings, 
  LogOut 
} from 'lucide-react';

interface SidebarProps {
  currentPage: string;
  onPageChange: (page: string) => void;
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentPage, onPageChange, onLogout }) => {
  const menuItems = [
    { id: 'dashboard', name: 'Dashboard', icon: LayoutDashboard },
    { id: 'employees', name: 'Employee Management', icon: Users },
    { id: 'departments', name: 'Departments', icon: Building2 },
    { id: 'onboarding', name: 'Onboarding', icon: UserPlus },
    { id: 'psychometric', name: 'Psychometric Tests', icon: Brain },
    { id: 'tasks', name: 'Task Management', icon: CheckSquare },
    { id: 'task-requests', name: 'Task Requests', icon: ClipboardList },
    { id: 'announcements', name: 'Announcements', icon: Megaphone },
    { id: 'recognition', name: 'Recognition', icon: Award },
    { id: 'logistics', name: 'Logistics', icon: Truck },
    { id: 'analytics', name: 'Analytics', icon: BarChart3 },
    { id: 'settings', name: 'Settings', icon: Settings },
  ];

  return (
    <div className="bg-gradient-to-b from-blue-900 via-blue-800 to-blue-900 text-white w-64 min-h-screen shadow-2xl">
      <div className="p-6 border-b border-blue-700">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
          HR Management
        </h1>
        <p className="text-blue-200 text-sm mt-1">Professional Dashboard</p>
      </div>
      
      <nav className="mt-6">
        <ul className="space-y-1 px-3">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.id}>
                <button
                  onClick={() => onPageChange(item.id)}
                  className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-all duration-200 hover:bg-blue-700 hover:shadow-lg group ${
                    currentPage === item.id 
                      ? 'bg-gradient-to-r from-blue-600 to-blue-500 shadow-lg border-l-4 border-white' 
                      : 'hover:bg-blue-700'
                  }`}
                >
                  <Icon className={`mr-3 h-5 w-5 transition-transform duration-200 group-hover:scale-110 ${
                    currentPage === item.id ? 'text-white' : 'text-blue-200'
                  }`} />
                  <span className={`font-medium ${
                    currentPage === item.id ? 'text-white' : 'text-blue-100'
                  }`}>
                    {item.name}
                  </span>
                      </button>
              </li>
            );
          })}
        </ul>
      </nav>
      
      <div className="absolute bottom-0 w-64 p-3">
        <button
          onClick={onLogout}
          className="w-full flex items-center px-4 py-3 text-left rounded-lg transition-all duration-200 hover:bg-red-600 hover:shadow-lg group text-blue-200 hover:text-white"
        >
          <LogOut className="mr-3 h-5 w-5 transition-transform duration-200 group-hover:scale-110" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
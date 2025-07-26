import React, { useState } from 'react';
import { HRProvider } from './contexts/HRContext';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import EmployeeManagement from './pages/EmployeeManagement';
import Departments from './pages/Departments';
import Onboarding from './pages/Onboarding';
import PsychometricTests from './pages/PsychometricTests';
import TaskManagement from './pages/TaskManagement';
import TaskRequests from './pages/TaskRequests';
import Announcements from './pages/Announcements';
import Recognition from './pages/Recognition';
import Logistics from './pages/Logistics';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const handleLogout = () => {
    setIsLoggedIn(false);
    // In a real app, you would handle authentication here
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'employees':
        return <EmployeeManagement />;
      case 'departments':
        return <Departments />;
      case 'onboarding':
        return <Onboarding />;
      case 'psychometric':
        return <PsychometricTests />;
      case 'tasks':
        return <TaskManagement />;
      case 'task-requests':
        return <TaskRequests />;
      case 'announcements':
        return <Announcements />;
      case 'recognition':
        return <Recognition />;
      case 'logistics':
        return <Logistics />;
      case 'analytics':
        return <Analytics />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">HR Management</h1>
            <p className="text-gray-600">Professional Dashboard</p>
          </div>
          <button
            onClick={() => setIsLoggedIn(true)}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 font-medium"
          >
            Login to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <HRProvider>
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar 
          currentPage={currentPage} 
          onPageChange={setCurrentPage}
          onLogout={handleLogout}
        />
        <div className="flex-1 overflow-auto">
          {renderPage()}
        </div>
      </div>
    </HRProvider>
  );
};

export default App;
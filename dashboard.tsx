import React from 'react';
import { Users, Building2, CheckSquare, TrendingUp, Calendar, Award, AlertCircle, Activity } from 'lucide-react';
import { useHR } from '../contexts/HRContext';
import Card from '../components/Card';

const Dashboard: React.FC = () => {
  const { employees, departments, tasks, announcements, recognitions, onboarding } = useHR();

  const stats = [
    {
      title: 'Total Employees',
      value: employees.length,
      icon: Users,
      color: 'bg-gradient-to-r from-blue-500 to-blue-600',
      textColor: 'text-blue-600',
    },
    {
      title: 'Departments',
      value: departments.length,
      icon: Building2,
      color: 'bg-gradient-to-r from-green-500 to-green-600',
      textColor: 'text-green-600',
    },
    {
      title: 'Active Tasks',
      value: tasks.filter(task => task.status !== 'Completed').length,
      icon: CheckSquare,
      color: 'bg-gradient-to-r from-orange-500 to-orange-600',
      textColor: 'text-orange-600',
    },
    {
      title: 'Recognitions',
      value: recognitions.length,
      icon: Award,
      color: 'bg-gradient-to-r from-purple-500 to-purple-600',
      textColor: 'text-purple-600',
    },
  ];

  const recentActivities = [
    { action: 'New employee onboarded', time: '2 hours ago', type: 'success' },
    { action: 'Task deadline approaching', time: '4 hours ago', type: 'warning' },
    { action: 'Department meeting scheduled', time: '6 hours ago', type: 'info' },
    { action: 'Performance review completed', time: '1 day ago', type: 'success' },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">HR Dashboard</h1>
        <p className="text-blue-100">Welcome back! Here's what's happening in your organization today.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">{stat.title}</p>
                  <p className={`text-3xl font-bold ${stat.textColor} mt-1`}>{stat.value}</p>
                </div>
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <Card className="p-6">
          <div className="flex items-center mb-4">
            <Activity className="h-5 w-5 text-blue-600 mr-2" />
            <h2 className="text-xl font-semibold text-gray-800">Recent Activities</h2>
          </div>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  activity.type === 'success' ? 'bg-green-500' : 
                  activity.type === 'warning' ? 'bg-orange-500' : 'bg-blue-500'
                }`}></div>
                <div className="flex-1">
                  <p className="text-gray-800 font-medium">{activity.action}</p>
                  <p className="text-gray-500 text-sm">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Quick Actions */}
        <Card className="p-6">
          <div className="flex items-center mb-4">
            <TrendingUp className="h-5 w-5 text-green-600 mr-2" />
            <h2 className="text-xl font-semibold text-gray-800">Quick Actions</h2>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <button className="p-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 transform hover:scale-105 shadow-lg">
              <Users className="h-6 w-6 mx-auto mb-2" />
              <span className="text-sm font-medium">Add Employee</span>
            </button>
            <button className="p-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 transform hover:scale-105 shadow-lg">
              <CheckSquare className="h-6 w-6 mx-auto mb-2" />
              <span className="text-sm font-medium">Create Task</span>
            </button>
            <button className="p-4 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg hover:from-purple-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg">
              <Award className="h-6 w-6 mx-auto mb-2" />
              <span className="text-sm font-medium">Add Recognition</span>
            </button>
            <button className="p-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-200 transform hover:scale-105 shadow-lg">
              <Calendar className="h-6 w-6 mx-auto mb-2" />
              <span className="text-sm font-medium">Schedule Meeting</span>
            </button>
          </div>
        </Card>
      </div>

      {/* Recent Announcements */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <AlertCircle className="h-5 w-5 text-orange-600 mr-2" />
            <h2 className="text-xl font-semibold text-gray-800">Recent Announcements</h2>
          </div>
          <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">View All</button>
        </div>
        {announcements.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <AlertCircle className="h-12 w-12 mx-auto mb-3 text-gray-300" />
            <p>No announcements yet. Create your first announcement to get started.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {announcements.slice(0, 3).map((announcement) => (
              <div key={announcement.id} className="border-l-4 border-blue-500 pl-4 py-2">
                <h3 className="font-semibold text-gray-800">{announcement.title}</h3>
                <p className="text-gray-600 text-sm mt-1">{announcement.content.substring(0, 100)}...</p>
                <p className="text-gray-400 text-xs mt-2">By {announcement.author} • {announcement.date}</p>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
};

export default Dashboard;
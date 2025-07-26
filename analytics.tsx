import React from 'react';
import { TrendingUp, Users, CheckSquare, Building2, Award, BarChart3 } from 'lucide-react';
import { useHR } from '../contexts/HRContext';
import Card from '../components/Card';

const Analytics: React.FC = () => {
  const { employees, departments, tasks, recognitions, onboarding } = useHR();

  // Calculate analytics data
  const totalEmployees = employees.length;
  const activeTasks = tasks.filter(task => task.status !== 'Completed').length;
  const completedTasks = tasks.filter(task => task.status === 'Completed').length;
  const taskCompletionRate = tasks.length > 0 ? Math.round((completedTasks / tasks.length) * 100) : 0;

  const departmentStats = departments.map(dept => ({
    name: dept.name,
    employeeCount: employees.filter(emp => emp.department === dept.name).length,
    activeTasks: tasks.filter(task => 
      employees.find(emp => emp.name === task.assignedTo)?.department === dept.name && 
      task.status !== 'Completed'
    ).length,
  }));

  const tasksByPriority = {
    High: tasks.filter(task => task.priority === 'High').length,
    Medium: tasks.filter(task => task.priority === 'Medium').length,
    Low: tasks.filter(task => task.priority === 'Low').length,
  };

  const tasksByStatus = {
    Pending: tasks.filter(task => task.status === 'Pending').length,
    'In Progress': tasks.filter(task => task.status === 'In Progress').length,
    Completed: tasks.filter(task => task.status === 'Completed').length,
  };

  const onboardingProgress = onboarding.length > 0 
    ? Math.round(onboarding.reduce((sum, item) => sum + item.completionPercentage, 0) / onboarding.length)
    : 0;

  const recentRecognitions = recognitions.slice(0, 5);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">Analytics Dashboard</h1>
        <p className="text-purple-100">Get insights into your organization's performance and trends</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Total Employees</p>
              <p className="text-3xl font-bold text-blue-600 mt-1">{totalEmployees}</p>
              <p className="text-green-500 text-sm mt-1">Active workforce</p>
            </div>
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-3 rounded-lg">
              <Users className="h-6 w-6 text-white" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Task Completion</p>
              <p className="text-3xl font-bold text-green-600 mt-1">{taskCompletionRate}%</p>
              <p className="text-gray-500 text-sm mt-1">{completedTasks}/{tasks.length} tasks</p>
            </div>
            <div className="bg-gradient-to-r from-green-500 to-green-600 p-3 rounded-lg">
              <CheckSquare className="h-6 w-6 text-white" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Departments</p>
              <p className="text-3xl font-bold text-purple-600 mt-1">{departments.length}</p>
              <p className="text-gray-500 text-sm mt-1">Active departments</p>
            </div>
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-3 rounded-lg">
              <Building2 className="h-6 w-6 text-white" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Recognitions</p>
              <p className="text-3xl font-bold text-orange-600 mt-1">{recognitions.length}</p>
              <p className="text-gray-500 text-sm mt-1">This month</p>
            </div>
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-3 rounded-lg">
              <Award className="h-6 w-6 text-white" />
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Department Overview */}
        <Card className="p-6">
          <div className="flex items-center mb-4">
            <BarChart3 className="h-5 w-5 text-blue-600 mr-2" />
            <h2 className="text-xl font-semibold text-gray-800">Department Overview</h2>
          </div>
          <div className="space-y-4">
            {departmentStats.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No departments created yet</p>
            ) : (
              departmentStats.map((dept, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-medium text-gray-800">{dept.name}</h3>
                    <p className="text-gray-600 text-sm">{dept.employeeCount} employees</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-800">{dept.activeTasks}</p>
                    <p className="text-gray-600 text-sm">active tasks</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </Card>

        {/* Task Priority Distribution */}
        <Card className="p-6">
          <div className="flex items-center mb-4">
            <TrendingUp className="h-5 w-5 text-red-600 mr-2" />
            <h2 className="text-xl font-semibold text-gray-800">Task Priority Distribution</h2>
          </div>
          <div className="space-y-4">
            {Object.entries(tasksByPriority).map(([priority, count]) => {
              const percentage = tasks.length > 0 ? Math.round((count / tasks.length) * 100) : 0;
              const color = priority === 'High' ? 'bg-red-500' : priority === 'Medium' ? 'bg-orange-500' : 'bg-green-500';
              
              return (
                <div key={priority} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium text-gray-700">{priority} Priority</span>
                    <span className="text-gray-600">{count} tasks ({percentage}%)</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${color} transition-all duration-300`}
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Task Status Overview */}
        <Card className="p-6">
          <div className="flex items-center mb-4">
            <CheckSquare className="h-5 w-5 text-green-600 mr-2" />
            <h2 className="text-xl font-semibold text-gray-800">Task Status Overview</h2>
          </div>
          <div className="space-y-3">
            {Object.entries(tasksByStatus).map(([status, count]) => {
              const color = status === 'Completed' ? 'text-green-600 bg-green-100' : 
                           status === 'In Progress' ? 'text-blue-600 bg-blue-100' : 'text-orange-600 bg-orange-100';
              
              return (
                <div key={status} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                  <span className="font-medium text-gray-800">{status}</span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${color}`}>
                    {count} tasks
                  </span>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Recent Recognitions */}
        <Card className="p-6">
          <div className="flex items-center mb-4">
            <Award className="h-5 w-5 text-yellow-600 mr-2" />
            <h2 className="text-xl font-semibold text-gray-800">Recent Recognitions</h2>
          </div>
          <div className="space-y-3">
            {recentRecognitions.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No recognitions yet</p>
            ) : (
              recentRecognitions.map((recognition) => (
                <div key={recognition.id} className="p-3 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border-l-4 border-yellow-400">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-gray-800">{recognition.employeeName}</h3>
                      <p className="text-gray-600 text-sm">{recognition.achievement}</p>
                    </div>
                    <span className="text-xs text-gray-500">{recognition.date}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </Card>
      </div>

      {/* Onboarding Progress */}
      {onboarding.length > 0 && (
        <Card className="p-6">
          <div className="flex items-center mb-4">
            <Users className="h-5 w-5 text-blue-600 mr-2" />
            <h2 className="text-xl font-semibold text-gray-800">Onboarding Progress</h2>
          </div>
          <div className="flex items-center justify-between mb-4">
            <span className="text-gray-700">Overall Progress</span>
            <span className="font-semibold text-blue-600">{onboardingProgress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="h-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-300"
              style={{ width: `${onboardingProgress}%` }}
            ></div>
          </div>
          <p className="text-gray-600 text-sm mt-2">{onboarding.length} employees in onboarding process</p>
        </Card>
      )}
    </div>
  );
};

export default Analytics;
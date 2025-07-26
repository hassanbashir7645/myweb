import React, { useState } from 'react';
import { Save, User, Bell, Shield, Palette, Globe, Download, Upload } from 'lucide-react';
import Card from '../components/Card';

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [settings, setSettings] = useState({
    profile: {
      name: 'HR Administrator',
      email: 'admin@company.com',
      role: 'HR Manager',
      phone: '+1 (555) 123-4567',
      department: 'Human Resources',
    },
    notifications: {
      emailNotifications: true,
      pushNotifications: true,
      taskReminders: true,
      weeklyReports: false,
      systemAlerts: true,
    },
    security: {
      twoFactorAuth: false,
      sessionTimeout: '30',
      passwordExpiry: '90',
      loginAttempts: '5',
    },
    appearance: {
      theme: 'light',
      language: 'en',
      timezone: 'UTC-5',
      dateFormat: 'MM/DD/YYYY',
    },
    system: {
      autoBackup: true,
      backupFrequency: 'daily',
      dataRetention: '365',
      auditLogs: true,
    },
  });

  const handleSave = (section: string) => {
    // In a real app, this would save to a backend
    console.log(`Saving ${section} settings:`, settings[section as keyof typeof settings]);
    alert(`${section.charAt(0).toUpperCase() + section.slice(1)} settings saved successfully!`);
  };

  const tabs = [
    { id: 'profile', name: 'Profile', icon: User },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'security', name: 'Security', icon: Shield },
    { id: 'appearance', name: 'Appearance', icon: Palette },
    { id: 'system', name: 'System', icon: Globe },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">Settings</h1>
        <p className="text-gray-300">Manage your application preferences and configurations</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar Navigation */}
        <Card className="p-4 h-fit">
          <nav className="space-y-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="mr-3 h-5 w-5" />
                  <span className="font-medium">{tab.name}</span>
                </button>
              );
            })}
          </nav>
        </Card>

        {/* Settings Content */}
        <div className="lg:col-span-3">
          {/* Profile Settings */}
          {activeTab === 'profile' && (
            <Card className="p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">Profile Settings</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    value={settings.profile.name}
                    onChange={(e) => setSettings({
                      ...settings,
                      profile: { ...settings.profile, name: e.target.value }
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    value={settings.profile.email}
                    onChange={(e) => setSettings({
                      ...settings,
                      profile: { ...settings.profile, email: e.target.value }
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                  <input
                    type="text"
                    value={settings.profile.role}
                    onChange={(e) => setSettings({
                      ...settings,
                      profile: { ...settings.profile, role: e.target.value }
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                  <input
                    type="tel"
                    value={settings.profile.phone}
                    onChange={(e) => setSettings({
                      ...settings,
                      profile: { ...settings.profile, phone: e.target.value }
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                  <input
                    type="text"
                    value={settings.profile.department}
                    onChange={(e) => setSettings({
                      ...settings,
                      profile: { ...settings.profile, department: e.target.value }
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div className="mt-6">
                <button
                  onClick={() => handleSave('profile')}
                  className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 flex items-center space-x-2"
                >
                  <Save className="h-4 w-4" />
                  <span>Save Profile</span>
                </button>
              </div>
            </Card>
          )}

          {/* Notifications Settings */}
          {activeTab === 'notifications' && (
            <Card className="p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">Notification Settings</h2>
              <div className="space-y-4">
                {Object.entries(settings.notifications).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h3 className="font-medium text-gray-800 capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {key === 'emailNotifications' && 'Receive notifications via email'}
                        {key === 'pushNotifications' && 'Show push notifications in browser'}
                        {key === 'taskReminders' && 'Get reminders for upcoming tasks'}
                        {key === 'weeklyReports' && 'Receive weekly summary reports'}
                        {key === 'systemAlerts' && 'Important system notifications'}
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={value}
                        onChange={(e) => setSettings({
                          ...settings,
                          notifications: {
                            ...settings.notifications,
                            [key]: e.target.checked
                          }
                        })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                ))}
              </div>
              <div className="mt-6">
                <button
                  onClick={() => handleSave('notifications')}
                  className="bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-2 rounded-lg hover:from-green-700 hover:to-green-800 transition-all duration-200 flex items-center space-x-2"
                >
                  <Save className="h-4 w-4" />
                  <span>Save Notifications</span>
                </button>
              </div>
            </Card>
          )}

          {/* Security Settings */}
          {activeTab === 'security' && (
            <Card className="p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">Security Settings</h2>
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-medium text-gray-800">Two-Factor Authentication</h3>
                    <p className="text-gray-600 text-sm">Add an extra layer of security to your account</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.security.twoFactorAuth}
                      onChange={(e) => setSettings({
                        ...settings,
                        security: { ...settings.security, twoFactorAuth: e.target.checked }
                      })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Session Timeout (minutes)</label>
                    <select
                      value={settings.security.sessionTimeout}
                      onChange={(e) => setSettings({
                        ...settings,
                        security: { ...settings.security, sessionTimeout: e.target.value }
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="15">15 minutes</option>
                      <option value="30">30 minutes</option>
                      <option value="60">1 hour</option>
                      <option value="120">2 hours</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Password Expiry (days)</label>
                    <select
                      value={settings.security.passwordExpiry}
                      onChange={(e) => setSettings({
                        ...settings,
                        security: { ...settings.security, passwordExpiry: e.target.value }
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="30">30 days</option>
                      <option value="60">60 days</option>
                      <option value="90">90 days</option>
                      <option value="180">180 days</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Max Login Attempts</label>
                    <select
                      value={settings.security.loginAttempts}
                      onChange={(e) => setSettings({
                        ...settings,
                        security: { ...settings.security, loginAttempts: e.target.value }
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="3">3 attempts</option>
                      <option value="5">5 attempts</option>
                      <option value="10">10 attempts</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <button
                  onClick={() => handleSave('security')}
                  className="bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-2 rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-200 flex items-center space-x-2"
                >
                  <Save className="h-4 w-4" />
                  <span>Save Security</span>
                </button>
              </div>
            </Card>
          )}

          {/* Appearance Settings */}
          {activeTab === 'appearance' && (
            <Card className="p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">Appearance Settings</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Theme</label>
                  <select
                    value={settings.appearance.theme}
                    onChange={(e) => setSettings({
                      ...settings,
                      appearance: { ...settings.appearance, theme: e.target.value }
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                    <option value="auto">Auto</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
                  <select
                    value={settings.appearance.language}
                    onChange={(e) => setSettings({
                      ...settings,
                      appearance: { ...settings.appearance, language: e.target.value }
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                    <option value="de">German</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Timezone</label>
                  <select
                    value={settings.appearance.timezone}
                    onChange={(e) => setSettings({
                      ...settings,
                      appearance: { ...settings.appearance, timezone: e.target.value }
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="UTC-8">Pacific Time (UTC-8)</option>
                    <option value="UTC-5">Eastern Time (UTC-5)</option>
                    <option value="UTC+0">GMT (UTC+0)</option>
                    <option value="UTC+1">Central European Time (UTC+1)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date Format</label>
                  <select
                    value={settings.appearance.dateFormat}
                    onChange={(e) => setSettings({
                      ...settings,
                      appearance: { ...settings.appearance, dateFormat: e.target.value }
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                    <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                    <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                  </select>
                </div>
              </div>
              <div className="mt-6">
                <button
                  onClick={() => handleSave('appearance')}
                  className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-6 py-2 rounded-lg hover:from-purple-700 hover:to-purple-800 transition-all duration-200 flex items-center space-x-2"
                >
                  <Save className="h-4 w-4" />
                  <span>Save Appearance</span>
                </button>
              </div>
            </Card>
          )}

          {/* System Settings */}
          {activeTab === 'system' && (
            <Card className="p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">System Settings</h2>
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-medium text-gray-800">Automatic Backups</h3>
                    <p className="text-gray-600 text-sm">Automatically backup system data</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.system.autoBackup}
                      onChange={(e) => setSettings({
                        ...settings,
                        system: { ...settings.system, autoBackup: e.target.checked }
                      })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Backup Frequency</label>
                    <select
                      value={settings.system.backupFrequency}
                      onChange={(e) => setSettings({
                        ...settings,
                        system: { ...settings.system, backupFrequency: e.target.value }
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="hourly">Hourly</option>
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                      <option value="monthly">Monthly</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Data Retention (days)</label>
                    <select
                      value={settings.system.dataRetention}
                      onChange={(e) => setSettings({
                        ...settings,
                        system: { ...settings.system, dataRetention: e.target.value }
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="90">90 days</option>
                      <option value="180">180 days</option>
                      <option value="365">1 year</option>
                      <option value="730">2 years</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-medium text-gray-800">Audit Logs</h3>
                    <p className="text-gray-600 text-sm">Keep detailed logs of user activities</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.system.auditLogs}
                      onChange={(e) => setSettings({
                        ...settings,
                        system: { ...settings.system, auditLogs: e.target.checked }
                      })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className="flex space-x-4">
                  <button className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 flex items-center justify-center space-x-2">
                    <Download className="h-4 w-4" />
                    <span>Export Data</span>
                  </button>
                  <button className="flex-1 bg-gradient-to-r from-green-600 to-green-700 text-white px-4 py-2 rounded-lg hover:from-green-700 hover:to-green-800 transition-all duration-200 flex items-center justify-center space-x-2">
                    <Upload className="h-4 w-4" />
                    <span>Import Data</span>
                  </button>
                </div>
              </div>
              <div className="mt-6">
                <button
                  onClick={() => handleSave('system')}
                  className="bg-gradient-to-r from-gray-600 to-gray-700 text-white px-6 py-2 rounded-lg hover:from-gray-700 hover:to-gray-800 transition-all duration-200 flex items-center space-x-2"
                >
                  <Save className="h-4 w-4" />
                  <span>Save System Settings</span>
                </button>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;
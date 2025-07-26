import React, { useState } from 'react';
import { Plus, Search, Edit, Trash2, UserPlus, Calendar, CheckCircle } from 'lucide-react';
import { useHR } from '../contexts/HRContext';
import Card from '../components/Card';
import Modal from '../components/Modal';

const Onboarding: React.FC = () => {
  const { onboarding, addOnboardingItem, updateOnboardingItem, deleteOnboardingItem, departments } = useHR();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  const [formData, setFormData] = useState({
    employeeName: '',
    position: '',
    department: '',
    startDate: '',
    status: 'Pending' as 'Pending' | 'In Progress' | 'Completed',
    completionPercentage: 0,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingItem) {
      updateOnboardingItem(editingItem.id, formData);
    } else {
      addOnboardingItem(formData);
    }
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      employeeName: '',
      position: '',
      department: '',
      startDate: '',
      status: 'Pending',
      completionPercentage: 0,
    });
    setEditingItem(null);
    setIsModalOpen(false);
  };

  const handleEdit = (item: any) => {
    setEditingItem(item);
    setFormData({
      employeeName: item.employeeName,
      position: item.position,
      department: item.department,
      startDate: item.startDate,
      status: item.status,
      completionPercentage: item.completionPercentage,
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this onboarding item?')) {
      deleteOnboardingItem(id);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'In Progress': return 'bg-blue-100 text-blue-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getProgressColor = (percentage: number) => {
    if (percentage >= 80) return 'bg-green-500';
    if (percentage >= 50) return 'bg-blue-500';
    if (percentage >= 25) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const filteredItems = onboarding.filter(item => {
    const matchesSearch = item.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !filterStatus || item.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Onboarding</h1>
          <p className="text-gray-600 mt-1">Track new employee onboarding progress</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-gradient-to-r from-teal-600 to-teal-700 text-white px-6 py-3 rounded-lg hover:from-teal-700 hover:to-teal-800 transition-all duration-200 flex items-center space-x-2 shadow-lg transform hover:scale-105"
        >
          <Plus className="h-5 w-5" />
          <span>Add Onboarding</span>
        </button>
      </div>

      {/* Filters */}
      <Card className="p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search onboarding items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          >
            <option value="">All Status</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
      </Card>

      {/* Onboarding Items */}
      {filteredItems.length === 0 ? (
        <Card className="p-12 text-center">
          <UserPlus className="h-16 w-16 mx-auto text-gray-300 mb-4" />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">No Onboarding Items Found</h3>
          <p className="text-gray-600 mb-6">Start tracking onboarding progress for new employees.</p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-gradient-to-r from-teal-600 to-teal-700 text-white px-6 py-3 rounded-lg hover:from-teal-700 hover:to-teal-800 transition-all duration-200 flex items-center space-x-2 mx-auto shadow-lg"
          >
            <Plus className="h-5 w-5" />
            <span>Add First Onboarding</span>
          </button>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <Card key={item.id} className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{item.employeeName}</h3>
                  <p className="text-gray-600">{item.position}</p>
                  <p className="text-gray-500 text-sm">{item.department}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                  {item.status}
                </span>
              </div>
              
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-600 text-sm">Progress</span>
                  <span className="text-gray-800 font-medium text-sm">{item.completionPercentage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(item.completionPercentage)}`}
                    style={{ width: `${item.completionPercentage}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-gray-600">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span className="text-sm">Started: {item.startDate}</span>
                </div>
                {item.completionPercentage === 100 && (
                  <div className="flex items-center text-green-600">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    <span className="text-sm">Completed</span>
                  </div>
                )}
              </div>
              
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(item)}
                  className="flex-1 bg-teal-50 text-teal-600 px-3 py-2 rounded-lg hover:bg-teal-100 transition-colors duration-200 flex items-center justify-center space-x-1"
                >
                  <Edit className="h-4 w-4" />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="flex-1 bg-red-50 text-red-600 px-3 py-2 rounded-lg hover:bg-red-100 transition-colors duration-200 flex items-center justify-center space-x-1"
                >
                  <Trash2 className="h-4 w-4" />
                  <span>Delete</span>
                </button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Add/Edit Onboarding Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={resetForm}
        title={editingItem ? 'Edit Onboarding' : 'Add New Onboarding'}
        size="md"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Employee Name</label>
            <input
              type="text"
              value={formData.employeeName}
              onChange={(e) => setFormData({ ...formData, employeeName: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
            <input
              type="text"
              value={formData.position}
              onChange={(e) => setFormData({ ...formData, position: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
            <select
              value={formData.department}
              onChange={(e) => setFormData({ ...formData, department: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              required
            >
              <option value="">Select Department</option>
              {departments.map(dept => (
                <option key={dept.id} value={dept.name}>{dept.name}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
            <input
              type="date"
              value={formData.startDate}
              onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              required
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as 'Pending' | 'In Progress' | 'Completed' })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              >
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Completion %</label>
              <input
                type="number"
                min="0"
                max="100"
                value={formData.completionPercentage}
                onChange={(e) => setFormData({ ...formData, completionPercentage: parseInt(e.target.value) || 0 })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={resetForm}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-teal-600 to-teal-700 text-white px-4 py-2 rounded-lg hover:from-teal-700 hover:to-teal-800 transition-all duration-200"
            >
              {editingItem ? 'Update Onboarding' : 'Add Onboarding'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Onboarding;
import React, { useState } from 'react';
import { Plus, Search, Edit, Trash2, Building2, Users } from 'lucide-react';
import { useHR } from '../contexts/HRContext';
import Card from '../components/Card';
import Modal from '../components/Modal';

const Departments: React.FC = () => {
  const { departments, addDepartment, updateDepartment, deleteDepartment, employees } = useHR();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDepartment, setEditingDepartment] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    manager: '',
    employeeCount: 0,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingDepartment) {
      updateDepartment(editingDepartment.id, formData);
    } else {
      addDepartment(formData);
    }
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      manager: '',
      employeeCount: 0,
    });
    setEditingDepartment(null);
    setIsModalOpen(false);
  };

  const handleEdit = (department: any) => {
    setEditingDepartment(department);
    setFormData({
      name: department.name,
      description: department.description,
      manager: department.manager,
      employeeCount: department.employeeCount,
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this department?')) {
      deleteDepartment(id);
    }
  };

  const filteredDepartments = departments.filter(department =>
    department.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    department.manager.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Departments</h1>
          <p className="text-gray-600 mt-1">Organize your company structure</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-3 rounded-lg hover:from-green-700 hover:to-green-800 transition-all duration-200 flex items-center space-x-2 shadow-lg transform hover:scale-105"
        >
          <Plus className="h-5 w-5" />
          <span>Add Department</span>
        </button>
      </div>

      {/* Search */}
      <Card className="p-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search departments..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>
      </Card>

      {/* Departments Grid */}
      {filteredDepartments.length === 0 ? (
        <Card className="p-12 text-center">
          <Building2 className="h-16 w-16 mx-auto text-gray-300 mb-4" />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">No Departments Found</h3>
          <p className="text-gray-600 mb-6">Create your first department to organize your workforce.</p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-3 rounded-lg hover:from-green-700 hover:to-green-800 transition-all duration-200 flex items-center space-x-2 mx-auto shadow-lg"
          >
            <Plus className="h-5 w-5" />
            <span>Add First Department</span>
          </button>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDepartments.map((department) => (
            <Card key={department.id} className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  <div className="bg-gradient-to-r from-green-500 to-green-600 p-2 rounded-lg mr-3">
                    <Building2 className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{department.name}</h3>
                    <p className="text-gray-600 text-sm">{department.manager}</p>
                  </div>
                </div>
              </div>
              
              <p className="text-gray-600 mb-4 text-sm leading-relaxed">{department.description}</p>
              
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center text-gray-600">
                  <Users className="h-4 w-4 mr-2" />
                  <span className="text-sm">{department.employeeCount} employees</span>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(department)}
                  className="flex-1 bg-green-50 text-green-600 px-3 py-2 rounded-lg hover:bg-green-100 transition-colors duration-200 flex items-center justify-center space-x-1"
                >
                  <Edit className="h-4 w-4" />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => handleDelete(department.id)}
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

      {/* Add/Edit Department Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={resetForm}
        title={editingDepartment ? 'Edit Department' : 'Add New Department'}
        size="md"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Department Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              rows={3}
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Department Manager</label>
            <input
              type="text"
              value={formData.manager}
              onChange={(e) => setFormData({ ...formData, manager: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Employee Count</label>
            <input
              type="number"
              value={formData.employeeCount}
              onChange={(e) => setFormData({ ...formData, employeeCount: parseInt(e.target.value) || 0 })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              min="0"
            />
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
              className="flex-1 bg-gradient-to-r from-green-600 to-green-700 text-white px-4 py-2 rounded-lg hover:from-green-700 hover:to-green-800 transition-all duration-200"
            >
              {editingDepartment ? 'Update Department' : 'Add Department'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Departments;
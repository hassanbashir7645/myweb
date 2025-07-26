import React, { useState } from 'react';
import { Plus, Search, Edit, Trash2, Truck, Package, User, Calendar } from 'lucide-react';
import { useHR } from '../contexts/HRContext';
import Card from '../components/Card';
import Modal from '../components/Modal';

const Logistics: React.FC = () => {
  const { logistics, addLogisticsItem, updateLogisticsItem, deleteLogisticsItem, employees } = useHR();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterCategory, setFilterCategory] = useState('');

  const [formData, setFormData] = useState({
    item: '',
    category: '',
    quantity: 1,
    status: 'Available' as 'Available' | 'In Use' | 'Maintenance' | 'Unavailable',
    assignedTo: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingItem) {
      updateLogisticsItem(editingItem.id, formData);
    } else {
      addLogisticsItem(formData);
    }
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      item: '',
      category: '',
      quantity: 1,
      status: 'Available',
      assignedTo: '',
    });
    setEditingItem(null);
    setIsModalOpen(false);
  };

  const handleEdit = (item: any) => {
    setEditingItem(item);
    setFormData({
      item: item.item,
      category: item.category,
      quantity: item.quantity,
      status: item.status,
      assignedTo: item.assignedTo || '',
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this logistics item?')) {
      deleteLogisticsItem(id);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Available': return 'bg-green-100 text-green-800';
      case 'In Use': return 'bg-blue-100 text-blue-800';
      case 'Maintenance': return 'bg-orange-100 text-orange-800';
      case 'Unavailable': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Available': return '✅';
      case 'In Use': return '🔄';
      case 'Maintenance': return '🔧';
      case 'Unavailable': return '❌';
      default: return '📦';
    }
  };

  const filteredItems = logistics.filter(item => {
    const matchesSearch = item.item.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (item.assignedTo && item.assignedTo.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = !filterStatus || item.status === filterStatus;
    const matchesCategory = !filterCategory || item.category === filterCategory;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const categories = [...new Set(logistics.map(item => item.category))].filter(Boolean);

  const logisticsCategories = [
    'Office Equipment',
    'IT Hardware',
    'Furniture',
    'Vehicles',
    'Tools',
    'Supplies',
    'Safety Equipment',
    'Other'
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Logistics Management</h1>
          <p className="text-gray-600 mt-1">Track and manage company assets and resources</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white px-6 py-3 rounded-lg hover:from-emerald-700 hover:to-emerald-800 transition-all duration-200 flex items-center space-x-2 shadow-lg transform hover:scale-105"
        >
          <Plus className="h-5 w-5" />
          <span>Add Item</span>
        </button>
      </div>

      {/* Filters */}
      <Card className="p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search logistics items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          >
            <option value="">All Status</option>
            <option value="Available">Available</option>
            <option value="In Use">In Use</option>
            <option value="Maintenance">Maintenance</option>
            <option value="Unavailable">Unavailable</option>
          </select>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          >
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
      </Card>

      {/* Logistics Items */}
      {filteredItems.length === 0 ? (
        <Card className="p-12 text-center">
          <Truck className="h-16 w-16 mx-auto text-gray-300 mb-4" />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">No Logistics Items Found</h3>
          <p className="text-gray-600 mb-6">Start managing your company assets by adding the first logistics item.</p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white px-6 py-3 rounded-lg hover:from-emerald-700 hover:to-emerald-800 transition-all duration-200 flex items-center space-x-2 mx-auto shadow-lg"
          >
            <Plus className="h-5 w-5" />
            <span>Add First Item</span>
          </button>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <Card key={item.id} className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 p-2 rounded-lg mr-3">
                    <Package className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{item.item}</h3>
                    <p className="text-gray-600 text-sm">{item.category}</p>
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl mb-1">{getStatusIcon(item.status)}</div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                    {item.status}
                  </span>
                </div>
              </div>
              
              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 text-sm">Quantity:</span>
                  <span className="text-gray-800 font-medium">{item.quantity}</span>
                </div>
                
                {item.assignedTo && (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-gray-600">
                      <User className="h-4 w-4 mr-1" />
                      <span className="text-sm">Assigned to:</span>
                    </div>
                    <span className="text-gray-800 text-sm font-medium">{item.assignedTo}</span>
                  </div>
                )}
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-gray-600">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span className="text-sm">Last updated:</span>
                  </div>
                  <span className="text-gray-800 text-sm">{item.lastUpdated}</span>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(item)}
                  className="flex-1 bg-emerald-50 text-emerald-600 px-3 py-2 rounded-lg hover:bg-emerald-100 transition-colors duration-200 flex items-center justify-center space-x-1"
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

      {/* Add/Edit Logistics Item Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={resetForm}
        title={editingItem ? 'Edit Logistics Item' : 'Add New Logistics Item'}
        size="md"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Item Name</label>
            <input
              type="text"
              value={formData.item}
              onChange={(e) => setFormData({ ...formData, item: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              placeholder="e.g., Laptop, Office Chair, Company Vehicle"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              required
            >
              <option value="">Select Category</option>
              {logisticsCategories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
              <input
                type="number"
                min="1"
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) || 1 })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as typeof formData.status })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              >
                <option value="Available">Available</option>
                <option value="In Use">In Use</option>
                <option value="Maintenance">Maintenance</option>
                <option value="Unavailable">Unavailable</option>
              </select>
            </div>
          </div>
          
          {(formData.status === 'In Use' || formData.status === 'Maintenance') && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Assigned To</label>
              <select
                value={formData.assignedTo}
                onChange={(e) => setFormData({ ...formData, assignedTo: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              >
                <option value="">Select Employee</option>
                {employees.map(emp => (
                  <option key={emp.id} value={emp.name}>{emp.name}</option>
                ))}
              </select>
            </div>
          )}
          
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
              className="flex-1 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white px-4 py-2 rounded-lg hover:from-emerald-700 hover:to-emerald-800 transition-all duration-200"
            >
              {editingItem ? 'Update Item' : 'Add Item'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Logistics;
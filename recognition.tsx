import React, { useState } from 'react';
import { Plus, Search, Edit, Trash2, Award, Calendar, User, Star } from 'lucide-react';
import { useHR } from '../contexts/HRContext';
import Card from '../components/Card';
import Modal from '../components/Modal';

const Recognition: React.FC = () => {
  const { recognitions, addRecognition, updateRecognition, deleteRecognition, employees } = useHR();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRecognition, setEditingRecognition] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('');

  const [formData, setFormData] = useState({
    employeeName: '',
    recognizedBy: '',
    achievement: '',
    description: '',
    type: 'Outstanding Performance' as 'Employee of the Month' | 'Outstanding Performance' | 'Team Player' | 'Innovation',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingRecognition) {
      updateRecognition(editingRecognition.id, formData);
    } else {
      addRecognition(formData);
    }
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      employeeName: '',
      recognizedBy: '',
      achievement: '',
      description: '',
      type: 'Outstanding Performance',
    });
    setEditingRecognition(null);
    setIsModalOpen(false);
  };

  const handleEdit = (recognition: any) => {
    setEditingRecognition(recognition);
    setFormData({
      employeeName: recognition.employeeName,
      recognizedBy: recognition.recognizedBy,
      achievement: recognition.achievement,
      description: recognition.description,
      type: recognition.type,
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this recognition?')) {
      deleteRecognition(id);
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Employee of the Month': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Outstanding Performance': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Team Player': return 'bg-green-100 text-green-800 border-green-200';
      case 'Innovation': return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Employee of the Month': return '🏆';
      case 'Outstanding Performance': return '⭐';
      case 'Team Player': return '🤝';
      case 'Innovation': return '💡';
      default: return '🎉';
    }
  };

  const filteredRecognitions = recognitions.filter(recognition => {
    const matchesSearch = recognition.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         recognition.recognizedBy.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         recognition.achievement.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = !filterType || recognition.type === filterType;
    return matchesSearch && matchesType;
  });

  const recognitionTypes = [
    'Employee of the Month',
    'Outstanding Performance',
    'Team Player',
    'Innovation'
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Employee Recognition</h1>
          <p className="text-gray-600 mt-1">Celebrate and acknowledge outstanding achievements</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-gradient-to-r from-yellow-600 to-yellow-700 text-white px-6 py-3 rounded-lg hover:from-yellow-700 hover:to-yellow-800 transition-all duration-200 flex items-center space-x-2 shadow-lg transform hover:scale-105"
        >
          <Plus className="h-5 w-5" />
          <span>Add Recognition</span>
        </button>
      </div>

      {/* Filters */}
      <Card className="p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search recognitions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            />
          </div>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
          >
            <option value="">All Types</option>
            {recognitionTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
      </Card>

      {/* Recognition Cards */}
      {filteredRecognitions.length === 0 ? (
        <Card className="p-12 text-center">
          <Award className="h-16 w-16 mx-auto text-gray-300 mb-4" />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">No Recognitions Found</h3>
          <p className="text-gray-600 mb-6">Start celebrating your team's achievements by adding the first recognition.</p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-gradient-to-r from-yellow-600 to-yellow-700 text-white px-6 py-3 rounded-lg hover:from-yellow-700 hover:to-yellow-800 transition-all duration-200 flex items-center space-x-2 mx-auto shadow-lg"
          >
            <Plus className="h-5 w-5" />
            <span>Add First Recognition</span>
          </button>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRecognitions.map((recognition) => (
            <Card key={recognition.id} className="p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="text-center mb-4">
                <div className="text-6xl mb-3">
                  {getTypeIcon(recognition.type)}
                </div>
                <span className={`px-4 py-2 rounded-full text-sm font-medium border ${getTypeColor(recognition.type)}`}>
                  {recognition.type}
                </span>
              </div>
              
              <div className="text-center mb-4">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{recognition.employeeName}</h3>
                <h4 className="text-lg font-semibold text-yellow-600 mb-2">{recognition.achievement}</h4>
                <p className="text-gray-600 text-sm leading-relaxed">{recognition.description}</p>
              </div>
              
              <div className="border-t pt-4 space-y-2">
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-1" />
                    <span>Recognized by:</span>
                  </div>
                  <span className="font-medium text-gray-800">{recognition.recognizedBy}</span>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>Date:</span>
                  </div>
                  <span className="font-medium text-gray-800">{recognition.date}</span>
                </div>
              </div>
              
              <div className="flex space-x-2 mt-4 pt-4 border-t">
                <button
                  onClick={() => handleEdit(recognition)}
                  className="flex-1 bg-yellow-50 text-yellow-600 px-3 py-2 rounded-lg hover:bg-yellow-100 transition-colors duration-200 flex items-center justify-center space-x-1"
                >
                  <Edit className="h-4 w-4" />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => handleDelete(recognition.id)}
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

      {/* Add/Edit Recognition Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={resetForm}
        title={editingRecognition ? 'Edit Recognition' : 'Add New Recognition'}
        size="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Employee Name</label>
              <select
                value={formData.employeeName}
                onChange={(e) => setFormData({ ...formData, employeeName: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                required
              >
                <option value="">Select Employee</option>
                {employees.map(emp => (
                  <option key={emp.id} value={emp.name}>{emp.name}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Recognized By</label>
              <select
                value={formData.recognizedBy}
                onChange={(e) => setFormData({ ...formData, recognizedBy: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                required
              >
                <option value="">Select Recognizer</option>
                {employees.map(emp => (
                  <option key={emp.id} value={emp.name}>{emp.name}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Achievement Title</label>
            <input
              type="text"
              value={formData.achievement}
              onChange={(e) => setFormData({ ...formData, achievement: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              placeholder="e.g., Exceeded quarterly targets by 150%"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              rows={4}
              placeholder="Describe the achievement and its impact..."
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Recognition Type</label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value as typeof formData.type })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            >
              {recognitionTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
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
              className="flex-1 bg-gradient-to-r from-yellow-600 to-yellow-700 text-white px-4 py-2 rounded-lg hover:from-yellow-700 hover:to-yellow-800 transition-all duration-200"
            >
              {editingRecognition ? 'Update Recognition' : 'Add Recognition'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Recognition;
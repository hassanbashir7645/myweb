import React, { useState } from 'react';
import { Plus, Search, Edit, Trash2, ClipboardList, Calendar, User, CheckCircle, XCircle, Clock } from 'lucide-react';
import { useHR } from '../contexts/HRContext';
import Card from '../components/Card';
import Modal from '../components/Modal';

const TaskRequests: React.FC = () => {
  const { taskRequests, addTaskRequest, updateTaskRequest, deleteTaskRequest, employees } = useHR();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRequest, setEditingRequest] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterPriority, setFilterPriority] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    requestedBy: '',
    priority: 'Medium' as 'High' | 'Medium' | 'Low',
    status: 'Pending' as 'Pending' | 'Approved' | 'Rejected',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingRequest) {
      updateTaskRequest(editingRequest.id, formData);
    } else {
      addTaskRequest(formData);
    }
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      requestedBy: '',
      priority: 'Medium',
      status: 'Pending',
    });
    setEditingRequest(null);
    setIsModalOpen(false);
  };

  const handleEdit = (request: any) => {
    setEditingRequest(request);
    setFormData({
      title: request.title,
      description: request.description,
      requestedBy: request.requestedBy,
      priority: request.priority,
      status: request.status,
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this task request?')) {
      deleteTaskRequest(id);
    }
  };

  const handleStatusChange = (id: string, newStatus: 'Approved' | 'Rejected') => {
    updateTaskRequest(id, { status: newStatus });
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-orange-100 text-orange-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved': return 'bg-green-100 text-green-800';
      case 'Rejected': return 'bg-red-100 text-red-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Approved': return CheckCircle;
      case 'Rejected': return XCircle;
      case 'Pending': return Clock;
      default: return Clock;
    }
  };

  const filteredRequests = taskRequests.filter(request => {
    const matchesSearch = request.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.requestedBy.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !filterStatus || request.status === filterStatus;
    const matchesPriority = !filterPriority || request.priority === filterPriority;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Task Requests</h1>
          <p className="text-gray-600 mt-1">Manage and approve task requests from team members</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-gradient-to-r from-cyan-600 to-cyan-700 text-white px-6 py-3 rounded-lg hover:from-cyan-700 hover:to-cyan-800 transition-all duration-200 flex items-center space-x-2 shadow-lg transform hover:scale-105"
        >
          <Plus className="h-5 w-5" />
          <span>Add Request</span>
        </button>
      </div>

      {/* Filters */}
      <Card className="p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search task requests..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
          >
            <option value="">All Status</option>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>
          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
          >
            <option value="">All Priorities</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>
      </Card>

      {/* Task Requests */}
      {filteredRequests.length === 0 ? (
        <Card className="p-12 text-center">
          <ClipboardList className="h-16 w-16 mx-auto text-gray-300 mb-4" />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">No Task Requests Found</h3>
          <p className="text-gray-600 mb-6">Create your first task request or wait for team members to submit requests.</p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-gradient-to-r from-cyan-600 to-cyan-700 text-white px-6 py-3 rounded-lg hover:from-cyan-700 hover:to-cyan-800 transition-all duration-200 flex items-center space-x-2 mx-auto shadow-lg"
          >
            <Plus className="h-5 w-5" />
            <span>Add First Request</span>
          </button>
        </Card>
      ) : (
        <div className="space-y-4">
          {filteredRequests.map((request) => {
            const StatusIcon = getStatusIcon(request.status);
            return (
              <Card key={request.id} className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-xl font-semibold text-gray-800">{request.title}</h3>
                      <div className="flex items-center space-x-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(request.priority)}`}>
                          {request.priority} Priority
                        </span>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${getStatusColor(request.status)}`}>
                          <StatusIcon className="h-3 w-3" />
                          <span>{request.status}</span>
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-1" />
                        <span>Requested by: {request.requestedBy}</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>{request.requestDate}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <p className="text-gray-700 leading-relaxed mb-4">{request.description}</p>
                
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(request)}
                      className="bg-cyan-50 text-cyan-600 px-4 py-2 rounded-lg hover:bg-cyan-100 transition-colors duration-200 flex items-center space-x-1"
                    >
                      <Edit className="h-4 w-4" />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => handleDelete(request.id)}
                      className="bg-red-50 text-red-600 px-4 py-2 rounded-lg hover:bg-red-100 transition-colors duration-200 flex items-center space-x-1"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span>Delete</span>
                    </button>
                  </div>
                  
                  {request.status === 'Pending' && (
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleStatusChange(request.id, 'Rejected')}
                        className="bg-red-50 text-red-600 px-4 py-2 rounded-lg hover:bg-red-100 transition-colors duration-200 flex items-center space-x-1"
                      >
                        <XCircle className="h-4 w-4" />
                        <span>Reject</span>
                      </button>
                      <button
                        onClick={() => handleStatusChange(request.id, 'Approved')}
                        className="bg-green-50 text-green-600 px-4 py-2 rounded-lg hover:bg-green-100 transition-colors duration-200 flex items-center space-x-1"
                      >
                        <CheckCircle className="h-4 w-4" />
                        <span>Approve</span>
                      </button>
                    </div>
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {/* Add/Edit Task Request Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={resetForm}
        title={editingRequest ? 'Edit Task Request' : 'Add New Task Request'}
        size="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              rows={4}
              required
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Requested By</label>
              <select
                value={formData.requestedBy}
                onChange={(e) => setFormData({ ...formData, requestedBy: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                required
              >
                <option value="">Select Employee</option>
                {employees.map(emp => (
                  <option key={emp.id} value={emp.name}>{emp.name}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
              <select
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value as 'High' | 'Medium' | 'Low' })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              >
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as 'Pending' | 'Approved' | 'Rejected' })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              >
                <option value="Pending">Pending</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
              </select>
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
              className="flex-1 bg-gradient-to-r from-cyan-600 to-cyan-700 text-white px-4 py-2 rounded-lg hover:from-cyan-700 hover:to-cyan-800 transition-all duration-200"
            >
              {editingRequest ? 'Update Request' : 'Add Request'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default TaskRequests;
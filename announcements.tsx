import React, { useState } from 'react';
import { Plus, Search, Edit, Trash2, Megaphone, Calendar, User } from 'lucide-react';
import { useHR } from '../contexts/HRContext';
import Card from '../components/Card';
import Modal from '../components/Modal';

const Announcements: React.FC = () => {
  const { announcements, addAnnouncement, updateAnnouncement, deleteAnnouncement } = useHR();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAnnouncement, setEditingAnnouncement] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPriority, setFilterPriority] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    author: '',
    priority: 'Medium' as 'High' | 'Medium' | 'Low',
    category: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingAnnouncement) {
      updateAnnouncement(editingAnnouncement.id, formData);
    } else {
      addAnnouncement(formData);
    }
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      title: '',
      content: '',
      author: '',
      priority: 'Medium',
      category: '',
    });
    setEditingAnnouncement(null);
    setIsModalOpen(false);
  };

  const handleEdit = (announcement: any) => {
    setEditingAnnouncement(announcement);
    setFormData({
      title: announcement.title,
      content: announcement.content,
      author: announcement.author,
      priority: announcement.priority,
      category: announcement.category,
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this announcement?')) {
      deleteAnnouncement(id);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800 border-red-200';
      case 'Medium': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const filteredAnnouncements = announcements.filter(announcement => {
    const matchesSearch = announcement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         announcement.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         announcement.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPriority = !filterPriority || announcement.priority === filterPriority;
    return matchesSearch && matchesPriority;
  });

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Announcements</h1>
          <p className="text-gray-600 mt-1">Keep your team informed and engaged</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-gradient-to-r from-orange-600 to-orange-700 text-white px-6 py-3 rounded-lg hover:from-orange-700 hover:to-orange-800 transition-all duration-200 flex items-center space-x-2 shadow-lg transform hover:scale-105"
        >
          <Plus className="h-5 w-5" />
          <span>Add Announcement</span>
        </button>
      </div>

      {/* Filters */}
      <Card className="p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search announcements..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>
          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          >
            <option value="">All Priorities</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>
      </Card>

      {/* Announcements List */}
      {filteredAnnouncements.length === 0 ? (
        <Card className="p-12 text-center">
          <Megaphone className="h-16 w-16 mx-auto text-gray-300 mb-4" />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">No Announcements Found</h3>
          <p className="text-gray-600 mb-6">Create your first announcement to share important updates with your team.</p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-gradient-to-r from-orange-600 to-orange-700 text-white px-6 py-3 rounded-lg hover:from-orange-700 hover:to-orange-800 transition-all duration-200 flex items-center space-x-2 mx-auto shadow-lg"
          >
            <Plus className="h-5 w-5" />
            <span>Add First Announcement</span>
          </button>
        </Card>
      ) : (
        <div className="space-y-4">
          {filteredAnnouncements.map((announcement) => (
            <Card key={announcement.id} className={`p-6 border-l-4 ${getPriorityColor(announcement.priority).includes('red') ? 'border-red-500' : 
              getPriorityColor(announcement.priority).includes('orange') ? 'border-orange-500' : 'border-green-500'}`}>
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-xl font-semibold text-gray-800">{announcement.title}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(announcement.priority)}`}>
                      {announcement.priority} Priority
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-1" />
                      <span>{announcement.author}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>{announcement.date}</span>
                    </div>
                    {announcement.category && (
                      <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs">
                        {announcement.category}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              
              <p className="text-gray-700 leading-relaxed mb-4">{announcement.content}</p>
              
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => handleEdit(announcement)}
                  className="bg-orange-50 text-orange-600 px-4 py-2 rounded-lg hover:bg-orange-100 transition-colors duration-200 flex items-center space-x-1"
                >
                  <Edit className="h-4 w-4" />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => handleDelete(announcement.id)}
                  className="bg-red-50 text-red-600 px-4 py-2 rounded-lg hover:bg-red-100 transition-colors duration-200 flex items-center space-x-1"
                >
                  <Trash2 className="h-4 w-4" />
                  <span>Delete</span>
                </button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Add/Edit Announcement Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={resetForm}
        title={editingAnnouncement ? 'Edit Announcement' : 'Add New Announcement'}
        size="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
            <textarea
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              rows={6}
              required
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Author</label>
              <input
                type="text"
                value={formData.author}
                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
              <select
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value as 'High' | 'Medium' | 'Low' })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <input
                type="text"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="e.g., General, HR, IT"
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
              className="flex-1 bg-gradient-to-r from-orange-600 to-orange-700 text-white px-4 py-2 rounded-lg hover:from-orange-700 hover:to-orange-800 transition-all duration-200"
            >
              {editingAnnouncement ? 'Update Announcement' : 'Add Announcement'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Announcements;
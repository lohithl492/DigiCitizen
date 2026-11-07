import React, { useState, useEffect } from 'react';
import { moduleService } from '../../services/moduleService';
import { BookOpen, Plus, Edit2, Trash2, Check, X, AlertCircle } from 'lucide-react';

export default function AdminModulesPage() {
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [showAddModal, setShowAddModal] = useState(false);
  const [newModule, setNewModule] = useState({
    title: '',
    slug: '',
    description: '',
    estimated_time: '25 mins',
    order_index: 7
  });

  const loadModules = async () => {
    setLoading(true);
    try {
      const data = await moduleService.getAllModules();
      setModules(data || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadModules();
  }, []);

  const handleStartEdit = (mod) => {
    setEditingId(mod.id);
    setEditForm({
      title: mod.title,
      description: mod.description,
      estimated_time: mod.estimated_time
    });
  };

  const handleSaveEdit = async (id) => {
    try {
      await moduleService.updateModule(id, editForm);
      setEditingId(null);
      await loadModules();
    } catch (e) {
      alert('Error updating module: ' + e.message);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this module? Associated quiz questions may also be affected.')) {
      try {
        await moduleService.deleteModule(id);
        await loadModules();
      } catch (e) {
        alert('Error deleting module: ' + e.message);
      }
    }
  };

  const handleCreateModule = async (e) => {
    e.preventDefault();
    try {
      await moduleService.createModule({
        ...newModule,
        slug: newModule.slug || newModule.title.toLowerCase().replace(/[^a-z0-9]/g, '-'),
        content: `# ${newModule.title}\n\nEducational content for ${newModule.title}.`,
        learning_objectives: ['Master the foundational principles of this topic.']
      });
      setShowAddModal(false);
      setNewModule({ title: '', slug: '', description: '', estimated_time: '25 mins', order_index: modules.length + 1 });
      await loadModules();
    } catch (e) {
      alert('Error creating module: ' + e.message);
    }
  };

  return (
    <div className="admin-modules" style={{ maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <span style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#2563eb' }}>
            Curriculum Administration
          </span>
          <h1 style={{ fontSize: '1.85rem', color: '#0f172a', margin: '2px 0 6px 0' }}>
            Manage Learning Modules ({modules.length})
          </h1>
          <p style={{ color: '#64748b', fontSize: '0.925rem', margin: 0 }}>
            Create, update syllabus content, and adjust module sequence.
          </p>
        </div>

        <button onClick={() => setShowAddModal(true)} className="btn btn-primary btn-sm">
          <Plus size={16} /> Add New Module
        </button>
      </div>

      {/* Modules Table Card */}
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#64748b', fontSize: '0.8rem', textTransform: 'uppercase' }}>
              <th style={{ padding: '0.85rem 1.5rem', width: '60px' }}>Order</th>
              <th style={{ padding: '0.85rem 1.5rem' }}>Title & Description</th>
              <th style={{ padding: '0.85rem 1.5rem', width: '120px' }}>Time</th>
              <th style={{ padding: '0.85rem 1.5rem', textAlign: 'right', width: '140px' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {modules.map((mod, idx) => {
              const isEditing = editingId === mod.id;

              return (
                <tr key={mod.id} style={{ borderBottom: '1px solid #f1f5f9', backgroundColor: isEditing ? '#eff6ff' : '#ffffff' }}>
                  <td style={{ padding: '1rem 1.5rem', fontWeight: 700, color: '#64748b' }}>
                    0{idx + 1}
                  </td>

                  <td style={{ padding: '1rem 1.5rem' }}>
                    {isEditing ? (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <input
                          type="text"
                          className="form-input"
                          value={editForm.title}
                          onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                        />
                        <textarea
                          className="form-textarea"
                          style={{ minHeight: '60px' }}
                          value={editForm.description}
                          onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                        />
                      </div>
                    ) : (
                      <div>
                        <strong style={{ fontSize: '0.95rem', color: '#0f172a' }}>{mod.title}</strong>
                        <p style={{ margin: '4px 0 0 0', fontSize: '0.825rem', color: '#64748b' }}>{mod.description}</p>
                      </div>
                    )}
                  </td>

                  <td style={{ padding: '1rem 1.5rem', color: '#64748b' }}>
                    {isEditing ? (
                      <input
                        type="text"
                        className="form-input"
                        value={editForm.estimated_time}
                        onChange={(e) => setEditForm({ ...editForm, estimated_time: e.target.value })}
                      />
                    ) : (
                      mod.estimated_time || '25 mins'
                    )}
                  </td>

                  <td style={{ padding: '1rem 1.5rem', textAlign: 'right' }}>
                    {isEditing ? (
                      <div style={{ display: 'flex', gap: '0.35rem', justifyContent: 'flex-end' }}>
                        <button onClick={() => handleSaveEdit(mod.id)} className="btn btn-primary btn-sm" style={{ padding: '0.35rem 0.6rem' }}>
                          <Check size={14} />
                        </button>
                        <button onClick={() => setEditingId(null)} className="btn btn-secondary btn-sm" style={{ padding: '0.35rem 0.6rem' }}>
                          <X size={14} />
                        </button>
                      </div>
                    ) : (
                      <div style={{ display: 'flex', gap: '0.35rem', justifyContent: 'flex-end' }}>
                        <button onClick={() => handleStartEdit(mod)} className="btn btn-secondary btn-sm" style={{ padding: '0.35rem 0.6rem' }} title="Edit module">
                          <Edit2 size={14} />
                        </button>
                        <button onClick={() => handleDelete(mod.id)} className="btn btn-danger btn-sm" style={{ padding: '0.35rem 0.6rem' }} title="Delete module">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(15, 23, 42, 0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000, padding: '1rem' }}>
          <div className="card animate-fade-in" style={{ maxWidth: '520px', width: '100%', padding: '2rem' }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1.25rem' }}>Create New Learning Module</h3>
            <form onSubmit={handleCreateModule}>
              <div className="form-group">
                <label className="form-label">Module Title</label>
                <input
                  type="text"
                  className="form-input"
                  required
                  placeholder="e.g. AI Literacy & Ethics"
                  value={newModule.title}
                  onChange={(e) => setNewModule({ ...newModule, title: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Description</label>
                <textarea
                  className="form-textarea"
                  required
                  placeholder="Brief summary of topics covered..."
                  value={newModule.description}
                  onChange={(e) => setNewModule({ ...newModule, description: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Estimated Completion Time</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. 25 mins"
                  value={newModule.estimated_time}
                  onChange={(e) => setNewModule({ ...newModule, estimated_time: e.target.value })}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
                <button type="button" onClick={() => setShowAddModal(false)} className="btn btn-secondary btn-sm">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary btn-sm">
                  Create Module
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

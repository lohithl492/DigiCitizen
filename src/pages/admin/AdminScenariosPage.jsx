import React, { useState, useEffect } from 'react';
import { scenarioService } from '../../services/scenarioService';
import { HeartHandshake, Plus, Trash2, CheckCircle2 } from 'lucide-react';

export default function AdminScenariosPage() {
  const [scenarios, setScenarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);

  const [newScen, setNewScen] = useState({
    title: '',
    category: 'Cybersecurity Awareness',
    description: '',
    context_story: '',
    options: [
      { id: 'opt-new-1', text: 'Option A: Recommended safe response', is_recommended: true, points: 50, consequence: 'Threat averted safely.', safety_lesson: 'Verify through official out-of-band channels.' },
      { id: 'opt-new-2', text: 'Option B: Risky response', is_recommended: false, points: 0, consequence: 'You fell for the scam.', safety_lesson: 'Never provide sensitive credentials.' }
    ]
  });

  const loadScenarios = async () => {
    setLoading(true);
    try {
      const data = await scenarioService.getAllScenarios();
      setScenarios(data || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadScenarios();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Delete this interactive scenario?')) {
      try {
        await scenarioService.deleteScenario(id);
        await loadScenarios();
      } catch (e) {
        alert('Failed to delete scenario: ' + e.message);
      }
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await scenarioService.createScenario(newScen);
      setShowAddModal(false);
      setNewScen({
        title: '',
        category: 'Cybersecurity Awareness',
        description: '',
        context_story: '',
        options: [
          { id: 'opt-new-1', text: 'Option A: Recommended safe response', is_recommended: true, points: 50, consequence: 'Threat averted safely.', safety_lesson: 'Verify through official out-of-band channels.' },
          { id: 'opt-new-2', text: 'Option B: Risky response', is_recommended: false, points: 0, consequence: 'You fell for the scam.', safety_lesson: 'Never provide sensitive credentials.' }
        ]
      });
      await loadScenarios();
    } catch (e) {
      alert('Error creating scenario: ' + e.message);
    }
  };

  return (
    <div className="admin-scenarios" style={{ maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <span style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#2563eb' }}>
            Scenario Simulation Oversight
          </span>
          <h1 style={{ fontSize: '1.85rem', color: '#0f172a', margin: '2px 0 6px 0' }}>
            Interactive Decision Scenarios ({scenarios.length})
          </h1>
          <p style={{ color: '#64748b', fontSize: '0.925rem', margin: 0 }}>
            Manage branching decision trees, dilemma contexts, and educational takeaways.
          </p>
        </div>

        <button onClick={() => setShowAddModal(true)} className="btn btn-primary btn-sm">
          <Plus size={16} /> Author Scenario
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {scenarios.map((scen, idx) => (
          <div key={scen.id} className="card" style={{ padding: '1.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span className="badge badge-primary">Scenario 0{idx + 1}</span>
                <span className="badge badge-neutral">{scen.category}</span>
              </div>
              <button
                onClick={() => handleDelete(scen.id)}
                className="btn btn-secondary btn-sm"
                style={{ padding: '0.3rem 0.5rem', color: '#ef4444' }}
                title="Delete scenario"
              >
                <Trash2 size={14} />
              </button>
            </div>

            <h3 style={{ fontSize: '1.25rem', color: '#0f172a', marginBottom: '0.5rem' }}>
              {scen.title}
            </h3>

            <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '1rem' }}>
              {scen.description}
            </p>

            <div style={{ backgroundColor: '#f8fafc', padding: '1rem', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '0.85rem', color: '#334155', marginBottom: '1rem', whiteSpace: 'pre-line' }}>
              {scen.context_story}
            </div>

            <div>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', color: '#64748b', marginBottom: '0.5rem' }}>
                Decisions & Feedback ({(scen.options || []).length} Choices):
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {(scen.options || []).map((opt) => (
                  <div
                    key={opt.id}
                    style={{
                      padding: '0.65rem 0.85rem',
                      borderRadius: '6px',
                      border: `1px solid ${opt.is_recommended ? '#a7f3d0' : '#e2e8f0'}`,
                      backgroundColor: opt.is_recommended ? '#ecfdf5' : '#ffffff',
                      fontSize: '0.85rem'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontWeight: 600, color: opt.is_recommended ? '#065f46' : '#0f172a' }}>
                      <span>{opt.text}</span>
                      <span className={`badge ${opt.is_recommended ? 'badge-success' : 'badge-neutral'}`} style={{ fontSize: '0.7rem' }}>
                        {opt.is_recommended ? 'Recommended (+50 pts)' : 'Suboptimal (0 pts)'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(15, 23, 42, 0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000, padding: '1rem', overflowY: 'auto' }}>
          <div className="card animate-fade-in" style={{ maxWidth: '600px', width: '100%', padding: '2rem', maxHeight: '90vh', overflowY: 'auto' }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1.25rem' }}>Author Scenario Dilemma</h3>
            <form onSubmit={handleCreate}>
              <div className="form-group">
                <label className="form-label">Scenario Title</label>
                <input
                  type="text"
                  className="form-input"
                  required
                  placeholder="e.g. Suspicious Tax Refund Call"
                  value={newScen.title}
                  onChange={(e) => setNewScen({ ...newScen, title: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Category</label>
                <input
                  type="text"
                  className="form-input"
                  required
                  placeholder="e.g. Social Engineering"
                  value={newScen.category}
                  onChange={(e) => setNewScen({ ...newScen, category: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Short Description</label>
                <input
                  type="text"
                  className="form-input"
                  required
                  placeholder="Brief synopsis..."
                  value={newScen.description}
                  onChange={(e) => setNewScen({ ...newScen, description: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Context Narrative Story</label>
                <textarea
                  className="form-textarea"
                  style={{ minHeight: '100px' }}
                  required
                  placeholder="Detailed situation narrative the student must evaluate..."
                  value={newScen.context_story}
                  onChange={(e) => setNewScen({ ...newScen, context_story: e.target.value })}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
                <button type="button" onClick={() => setShowAddModal(false)} className="btn btn-secondary btn-sm">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary btn-sm">
                  Create Scenario
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

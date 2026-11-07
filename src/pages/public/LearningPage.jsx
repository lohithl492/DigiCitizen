import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Compass, Shield, EyeOff, HeartHandshake, Scale, AlertTriangle, 
  ArrowRight, Clock, CheckCircle2, Search, BookOpen 
} from 'lucide-react';
import { moduleService } from '../../services/moduleService';
import { useAuth } from '../../context/AuthContext';

const ICON_MAP = {
  Compass: Compass,
  ShieldAlert: Shield,
  EyeOff: EyeOff,
  HeartHandshake: HeartHandshake,
  Scale: Scale,
  AlertTriangle: AlertTriangle
};

export default function LearningPage() {
  const { user } = useAuth();
  const [modules, setModules] = useState([]);
  const [userProgress, setUserProgress] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  useEffect(() => {
    async function load() {
      try {
        const [modList, progList] = await Promise.all([
          moduleService.getAllModules(),
          user ? moduleService.getUserProgress(user.id) : []
        ]);
        setModules(modList || []);
        setUserProgress(progList || []);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [user]);

  const completedModuleIds = new Set(
    userProgress.filter((p) => p.completed).map((p) => p.module_id)
  );

  const filteredModules = modules.filter((mod) => {
    const matchesSearch =
      mod.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mod.description.toLowerCase().includes(searchQuery.toLowerCase());

    if (selectedCategory === 'ALL') return matchesSearch;
    return matchesSearch && mod.category_id === selectedCategory;
  });

  return (
    <div className="learning-page">
      {/* Header Banner */}
      <section className="hero-navy" style={{ padding: '3.5rem 0' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '800px' }}>
          <div className="hero-badge" style={{ margin: '0 auto 1rem auto' }}>
            <BookOpen size={16} /> Accredited Curriculum
          </div>
          <h1 className="hero-title" style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
            Digital Citizenship Curriculum
          </h1>
          <p className="hero-description" style={{ margin: '0 auto', fontSize: '1.05rem' }}>
            Six comprehensive educational modules designed to build critical online judgment, defensive cyber habits, and ethical digital leadership.
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="section-py" style={{ backgroundColor: 'var(--bg-main)' }}>
        <div className="container">
          {/* Controls: Search & Category Filter */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '2.5rem' }}>
            <div style={{ position: 'relative', width: '100%', maxWidth: '360px' }}>
              <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
              <input
                type="text"
                className="form-input"
                style={{ paddingLeft: '38px' }}
                placeholder="Search modules or keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <button
                className={`btn btn-sm ${selectedCategory === 'ALL' ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setSelectedCategory('ALL')}
              >
                All Modules ({modules.length})
              </button>
            </div>
          </div>

          {/* Module Cards Grid */}
          <div className="grid-3">
            {filteredModules.map((mod, index) => {
              const IconComponent = ICON_MAP[mod.icon] || Shield;
              const isCompleted = completedModuleIds.has(mod.id);

              return (
                <div key={mod.id} className="module-card">
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                    <div className="module-icon-wrap" style={{ margin: 0 }}>
                      <IconComponent size={26} />
                    </div>
                    {isCompleted ? (
                      <span className="badge badge-success">
                        <CheckCircle2 size={12} /> Completed
                      </span>
                    ) : (
                      <span className="badge badge-neutral">Module 0{index + 1}</span>
                    )}
                  </div>

                  <h3 className="module-card-title">{mod.title}</h3>
                  <p className="module-card-desc">{mod.description}</p>

                  <div style={{ marginBottom: '1.25rem' }}>
                    <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                      Learning Objectives:
                    </div>
                    <ul style={{ paddingLeft: '1.2rem', fontSize: '0.825rem', color: '#64748b', margin: 0, lineHeight: 1.5 }}>
                      {(mod.learning_objectives || []).slice(0, 3).map((obj, idx) => (
                        <li key={idx} style={{ marginBottom: '4px' }}>{obj}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="module-card-footer">
                    <span className="module-time-chip">
                      <Clock size={14} /> {mod.estimated_time || '25 mins'}
                    </span>
                    <Link to={`/learn/${mod.slug}`} className="btn btn-primary btn-sm">
                      {isCompleted ? 'Review Content' : 'Start Learning'} <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredModules.length === 0 && (
            <div className="card" style={{ textAlign: 'center', padding: '3rem 1.5rem' }}>
              <p style={{ color: '#64748b', fontSize: '1rem' }}>No modules match your search query.</p>
              <button onClick={() => setSearchQuery('')} className="btn btn-secondary btn-sm" style={{ marginTop: '0.75rem' }}>
                Clear Search
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

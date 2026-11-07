import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { adminService } from '../../services/adminService';
import {
  Users, BookOpen, HelpCircle, HeartHandshake,
  TrendingUp, ShieldCheck, Activity, ArrowRight, BarChart3
} from 'lucide-react';

export default function AdminOverviewPage() {
  const [stats, setStats] = useState(null);
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const [statsData, logsData] = await Promise.all([
          adminService.getAdminStats(),
          adminService.getActivityLogs(8)
        ]);
        setStats(statsData);
        setLogs(logsData || []);
      } catch (err) {
        console.error('Failed to load admin metrics', err);
      } finally {
        setLoading(false);
      }
    }
    loadStats();
  }, []);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem 0' }}>
        <p style={{ color: '#64748b' }}>Aggregating platform metrics from database...</p>
      </div>
    );
  }

  return (
    <div className="admin-overview" style={{ maxWidth: '1100px', margin: '0 auto' }}>
      {/* Title */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
        <div>
          <span style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#2563eb' }}>
            Administrative Console
          </span>
          <h1 style={{ fontSize: '1.85rem', color: '#0f172a', margin: '2px 0 6px 0' }}>
            Platform Overview & Real-Time Metrics
          </h1>
          <p style={{ color: '#64748b', fontSize: '0.925rem', margin: 0 }}>
            Live analytics derived directly from PostgreSQL database records.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <Link to="/admin/modules" className="btn btn-primary btn-sm">
            Manage Modules
          </Link>
          <Link to="/admin/quizzes" className="btn btn-secondary btn-sm">
            Question Bank
          </Link>
        </div>
      </div>

      {/* METRIC STATS GRID */}
      <div className="grid-4" style={{ marginBottom: '2.5rem' }}>
        {/* Total Students */}
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#64748b' }}>Registered Students</span>
            <div style={{ width: '36px', height: '36px', borderRadius: '8px', backgroundColor: '#eff6ff', color: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Users size={18} />
            </div>
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.25rem' }}>
            {stats?.totalStudents || 0}
          </div>
          <span style={{ fontSize: '0.75rem', color: '#059669', display: 'flex', alignItems: 'center', gap: '3px' }}>
            <TrendingUp size={12} /> {stats?.activeStudents || 0} Active Learners
          </span>
        </div>

        {/* Module Completions */}
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#64748b' }}>Module Completions</span>
            <div style={{ width: '36px', height: '36px', borderRadius: '8px', backgroundColor: '#ecfdf5', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <BookOpen size={18} />
            </div>
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.25rem' }}>
            {stats?.totalModuleCompletions || 0}
          </div>
          <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
            Across 6 Core Curriculum Tracks
          </span>
        </div>

        {/* Quiz Pass Rate */}
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#64748b' }}>Quiz Pass Rate</span>
            <div style={{ width: '36px', height: '36px', borderRadius: '8px', backgroundColor: '#fef3c7', color: '#d97706', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <HelpCircle size={18} />
            </div>
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.25rem' }}>
            {stats?.quizPassRate || 0}%
          </div>
          <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
            {stats?.totalQuizAttempts || 0} Total Submissions ({stats?.averageQuizScore || 0}% avg)
          </span>
        </div>

        {/* Scenarios Completed */}
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#64748b' }}>Scenario Decisions</span>
            <div style={{ width: '36px', height: '36px', borderRadius: '8px', backgroundColor: '#f3e8ff', color: '#7e22ce', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <HeartHandshake size={18} />
            </div>
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.25rem' }}>
            {stats?.totalScenariosCompleted || 0}
          </div>
          <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
            Practical dilemmas tested
          </span>
        </div>
      </div>

      {/* TWO COLUMN AREA: SHORTCUTS & ACTIVITY LOGS */}
      <div className="grid-3" style={{ gridTemplateColumns: '1.2fr 1.8fr', gap: '2rem' }}>
        {/* Quick Management Shortcuts */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="card">
            <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', color: '#0f172a' }}>
              Quick Management Shortcuts
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              <Link to="/admin/modules" className="btn btn-secondary btn-sm" style={{ justifyContent: 'space-between' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <BookOpen size={16} /> Edit Learning Modules
                </span>
                <ArrowRight size={14} />
              </Link>
              <Link to="/admin/quizzes" className="btn btn-secondary btn-sm" style={{ justifyContent: 'space-between' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <HelpCircle size={16} /> Manage 54 MCQ Questions
                </span>
                <ArrowRight size={14} />
              </Link>
              <Link to="/admin/scenarios" className="btn btn-secondary btn-sm" style={{ justifyContent: 'space-between' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <HeartHandshake size={16} /> Manage Safety Scenarios
                </span>
                <ArrowRight size={14} />
              </Link>
              <Link to="/admin/students" className="btn btn-secondary btn-sm" style={{ justifyContent: 'space-between' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Users size={16} /> Student Directory & Audit
                </span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>

          <div className="card" style={{ backgroundColor: '#0f172a', color: '#ffffff' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem', color: '#38bdf8' }}>
              <ShieldCheck size={20} />
              <strong style={{ fontSize: '0.9rem' }}>Database RLS Security Active</strong>
            </div>
            <p style={{ fontSize: '0.825rem', color: '#94a3b8', lineHeight: 1.5, margin: 0 }}>
              All administrative operations are safeguarded by PostgreSQL Row Level Security. Student accounts cannot query or mutate records without valid credentials.
            </p>
          </div>
        </div>

        {/* Recent Activity Stream */}
        <div className="card">
          <div className="card-header" style={{ marginBottom: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Activity size={18} className="text-primary" />
              <h3 style={{ fontSize: '1.1rem', margin: 0 }}>Recent Platform Activities</h3>
            </div>
            <Link to="/admin/analytics" style={{ fontSize: '0.8rem', color: '#2563eb' }}>View All Logs</Link>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {logs.map((log) => (
              <div
                key={log.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.75rem 0.85rem',
                  borderRadius: '8px',
                  backgroundColor: '#f8fafc',
                  border: '1px solid #f1f5f9',
                  fontSize: '0.85rem'
                }}
              >
                <div>
                  <div style={{ fontWeight: 600, color: '#0f172a' }}>
                    {log.profiles?.full_name || 'Student'}{' '}
                    <span style={{ fontWeight: 400, color: '#64748b' }}>
                      ({log.action})
                    </span>
                  </div>
                  <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                    {log.details?.module_title || log.details?.quiz_title || log.details?.scenario_title || log.details?.badge_title || 'Completed task'}
                  </span>
                </div>

                <span style={{ fontSize: '0.75rem', color: '#94a3b8', whiteSpace: 'nowrap' }}>
                  {new Date(log.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

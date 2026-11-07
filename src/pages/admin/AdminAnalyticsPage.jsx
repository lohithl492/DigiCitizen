import React, { useState, useEffect } from 'react';
import { adminService } from '../../services/adminService';
import { BarChart3, Activity, ShieldCheck, Download, Filter } from 'lucide-react';

export default function AdminAnalyticsPage() {
  const [logs, setLogs] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionFilter, setActionFilter] = useState('ALL');

  useEffect(() => {
    async function loadData() {
      try {
        const [statsData, logsData] = await Promise.all([
          adminService.getAdminStats(),
          adminService.getActivityLogs(50)
        ]);
        setStats(statsData);
        setLogs(logsData || []);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const filteredLogs = logs.filter((l) => {
    if (actionFilter === 'ALL') return true;
    return l.action === actionFilter;
  });

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem 0' }}>
        <p style={{ color: '#64748b' }}>Compiling activity logs & telemetry records...</p>
      </div>
    );
  }

  return (
    <div className="admin-analytics" style={{ maxWidth: '1050px', margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <span style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#2563eb' }}>
            System Audit & Analytics
          </span>
          <h1 style={{ fontSize: '1.85rem', color: '#0f172a', margin: '2px 0 6px 0' }}>
            Platform Activity Logs & Audit Trail
          </h1>
          <p style={{ color: '#64748b', fontSize: '0.925rem', margin: 0 }}>
            Chronological audit stream recording security events, assessment completions, and credential issuances.
          </p>
        </div>

        <div>
          <select
            className="form-select"
            style={{ width: '220px' }}
            value={actionFilter}
            onChange={(e) => setActionFilter(e.target.value)}
          >
            <option value="ALL">All Actions ({logs.length})</option>
            <option value="MODULE_COMPLETED">Module Completed</option>
            <option value="QUIZ_SUBMITTED">Quiz Submitted</option>
            <option value="SCENARIO_COMPLETED">Scenario Completed</option>
            <option value="BADGE_EARNED">Badge Earned</option>
            <option value="CERTIFICATE_GENERATED">Certificate Generated</option>
          </select>
        </div>
      </div>

      {/* Aggregate Metrics Bar */}
      <div className="grid-3" style={{ marginBottom: '2rem' }}>
        <div className="card" style={{ padding: '1.25rem' }}>
          <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>Active Learners Audited</span>
          <div style={{ fontSize: '1.65rem', fontWeight: 800, color: '#0f172a', marginTop: '4px' }}>
            {stats?.activeStudents || 0}
          </div>
        </div>

        <div className="card" style={{ padding: '1.25rem' }}>
          <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>Average Quiz Proficiency</span>
          <div style={{ fontSize: '1.65rem', fontWeight: 800, color: '#2563eb', marginTop: '4px' }}>
            {stats?.averageQuizScore || 0}%
          </div>
        </div>

        <div className="card" style={{ padding: '1.25rem' }}>
          <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>Total Curriculum Completions</span>
          <div style={{ fontSize: '1.65rem', fontWeight: 800, color: '#059669', marginTop: '4px' }}>
            {stats?.totalModuleCompletions || 0}
          </div>
        </div>
      </div>

      {/* Logs Table */}
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Activity size={18} className="text-primary" />
            <span style={{ fontWeight: 700, fontSize: '0.95rem', color: '#0f172a' }}>
              Historical Audit Trail ({filteredLogs.length} events)
            </span>
          </div>
          <span style={{ fontSize: '0.8rem', color: '#64748b' }}>UTC Synchronized</span>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
          <thead>
            <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#64748b', fontSize: '0.775rem', textTransform: 'uppercase' }}>
              <th style={{ padding: '0.75rem 1.5rem' }}>Timestamp</th>
              <th style={{ padding: '0.75rem 1.5rem' }}>Action Type</th>
              <th style={{ padding: '0.75rem 1.5rem' }}>Learner Identity</th>
              <th style={{ padding: '0.75rem 1.5rem' }}>Event Metadata</th>
            </tr>
          </thead>
          <tbody>
            {filteredLogs.map((log) => (
              <tr key={log.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: '0.85rem 1.5rem', color: '#64748b', whiteSpace: 'nowrap' }}>
                  {new Date(log.created_at).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}
                </td>
                <td style={{ padding: '0.85rem 1.5rem' }}>
                  <span className="badge badge-primary" style={{ fontSize: '0.7rem' }}>
                    {log.action}
                  </span>
                </td>
                <td style={{ padding: '0.85rem 1.5rem', fontWeight: 600, color: '#0f172a' }}>
                  {log.profiles?.full_name || 'Student'}{' '}
                  <span style={{ fontWeight: 400, color: '#64748b', fontSize: '0.8rem' }}>
                    ({log.profiles?.email || 'authenticated'})
                  </span>
                </td>
                <td style={{ padding: '0.85rem 1.5rem', color: '#475569', fontSize: '0.825rem', fontFamily: 'monospace' }}>
                  {JSON.stringify(log.details || {})}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredLogs.length === 0 && (
          <div style={{ padding: '3rem', textAlign: 'center', color: '#64748b' }}>
            No platform activity matches the selected filter.
          </div>
        )}
      </div>
    </div>
  );
}

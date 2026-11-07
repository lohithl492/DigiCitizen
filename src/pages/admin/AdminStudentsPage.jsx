import React, { useState, useEffect } from 'react';
import { adminService } from '../../services/adminService';
import { Users, Search, Mail, Sparkles, BookOpen, ShieldCheck } from 'lucide-react';

export default function AdminStudentsPage() {
  const [students, setStudents] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStudents() {
      try {
        const data = await adminService.getAllStudents();
        setStudents(data || []);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    loadStudents();
  }, []);

  const filtered = students.filter((s) => {
    const q = searchQuery.toLowerCase();
    return (
      (s.full_name || '').toLowerCase().includes(q) ||
      (s.email || '').toLowerCase().includes(q)
    );
  });

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem 0' }}>
        <p style={{ color: '#64748b' }}>Loading student directory from database...</p>
      </div>
    );
  }

  return (
    <div className="admin-students" style={{ maxWidth: '1050px', margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <span style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#2563eb' }}>
            Learner Directory
          </span>
          <h1 style={{ fontSize: '1.85rem', color: '#0f172a', margin: '2px 0 6px 0' }}>
            Student Learning Progress ({students.length})
          </h1>
          <p style={{ color: '#64748b', fontSize: '0.925rem', margin: 0 }}>
            Audit individual student engagement, points standing, and enrollment status.
          </p>
        </div>

        <div style={{ position: 'relative', width: '280px' }}>
          <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
          <input
            type="text"
            className="form-input"
            style={{ paddingLeft: '36px' }}
            placeholder="Search by student name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#64748b', fontSize: '0.8rem', textTransform: 'uppercase' }}>
              <th style={{ padding: '0.85rem 1.5rem' }}>Student Learner</th>
              <th style={{ padding: '0.85rem 1.5rem' }}>Registered Email</th>
              <th style={{ padding: '0.85rem 1.5rem' }}>Role</th>
              <th style={{ padding: '0.85rem 1.5rem' }}>Total Points</th>
              <th style={{ padding: '0.85rem 1.5rem', textAlign: 'right' }}>Joined</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((student) => (
              <tr key={student.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: '1rem 1.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ width: '34px', height: '34px', borderRadius: '50%', backgroundColor: '#eff6ff', color: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.85rem' }}>
                      {(student.full_name || 'S').charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <strong style={{ color: '#0f172a' }}>{student.full_name || 'Anonymous Student'}</strong>
                    </div>
                  </div>
                </td>

                <td style={{ padding: '1rem 1.5rem', color: '#475569' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Mail size={14} className="text-muted" /> {student.email}
                  </span>
                </td>

                <td style={{ padding: '1rem 1.5rem' }}>
                  <span className={`badge ${student.role === 'admin' ? 'badge-danger' : 'badge-primary'}`}>
                    {student.role || 'student'}
                  </span>
                </td>

                <td style={{ padding: '1rem 1.5rem', fontWeight: 700, color: '#0f172a' }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                    <Sparkles size={14} className="points-sparkle" />
                    {student.points || 0} pts
                  </span>
                </td>

                <td style={{ padding: '1rem 1.5rem', textAlign: 'right', color: '#64748b', fontSize: '0.85rem' }}>
                  {new Date(student.created_at || Date.now()).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <div style={{ padding: '3rem', textAlign: 'center', color: '#64748b' }}>
            No registered students match the search criteria.
          </div>
        )}
      </div>
    </div>
  );
}

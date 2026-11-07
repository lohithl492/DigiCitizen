import React, { useState, useEffect } from 'react';
import { achievementService } from '../../services/achievementService';
import { Trophy, Medal, Award, Sparkles, Shield, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function LeaderboardPage() {
  const { user } = useAuth();
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await achievementService.getLeaderboard(25);
        setLeaderboard(data || []);
      } catch (err) {
        console.error('Failed to load leaderboard', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [user]);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem 0' }}>
        <p style={{ color: '#64748b' }}>Computing real-time student honor roll rankings...</p>
      </div>
    );
  }

  return (
    <div className="leaderboard-page" style={{ maxWidth: '900px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <div style={{ width: '56px', height: '56px', borderRadius: '50%', backgroundColor: '#fef3c7', color: '#d97706', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem auto' }}>
          <Trophy size={28} />
        </div>
        <h1 style={{ fontSize: '2.25rem', color: '#0f172a', marginBottom: '0.5rem' }}>
          Student Honor Roll & Leaderboard
        </h1>
        <p style={{ color: '#64748b', fontSize: '1rem', maxWidth: '600px', margin: '0 auto' }}>
          Celebrating learners who have demonstrated exemplary dedication to digital ethics, threat awareness, and proactive cyber hygiene.
        </p>
      </div>

      {/* Top 3 Podium Highlights */}
      {leaderboard.length >= 3 && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.25rem', marginBottom: '2.5rem', alignItems: 'flex-end' }}>
          {/* Rank 2 */}
          <div className="card" style={{ textAlign: 'center', padding: '1.5rem 1rem', borderTop: '4px solid #94a3b8' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#f1f5f9', color: '#64748b', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 0.75rem auto', fontWeight: 800 }}>
              2
            </div>
            <div style={{ fontWeight: 700, fontSize: '1.05rem', color: '#0f172a', marginBottom: '2px' }}>
              {leaderboard[1].name}
            </div>
            <span style={{ fontSize: '0.85rem', color: '#2563eb', fontWeight: 600 }}>
              {leaderboard[1].points} pts
            </span>
          </div>

          {/* Rank 1 (Gold) */}
          <div className="card" style={{ textAlign: 'center', padding: '2rem 1rem', borderTop: '4px solid #f59e0b', backgroundColor: '#fffdfa', transform: 'scale(1.05)', boxShadow: 'var(--shadow-lg)' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: '#fef3c7', color: '#d97706', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 0.75rem auto', fontWeight: 800 }}>
              <Medal size={28} />
            </div>
            <span className="badge badge-warning" style={{ marginBottom: '0.5rem' }}>Platform Champion</span>
            <div style={{ fontWeight: 800, fontSize: '1.2rem', color: '#0f172a', marginBottom: '2px' }}>
              {leaderboard[0].name}
            </div>
            <span style={{ fontSize: '1rem', color: '#d97706', fontWeight: 700 }}>
              {leaderboard[0].points} pts
            </span>
          </div>

          {/* Rank 3 */}
          <div className="card" style={{ textAlign: 'center', padding: '1.5rem 1rem', borderTop: '4px solid #b45309' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#fdf2e9', color: '#b45309', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 0.75rem auto', fontWeight: 800 }}>
              3
            </div>
            <div style={{ fontWeight: 700, fontSize: '1.05rem', color: '#0f172a', marginBottom: '2px' }}>
              {leaderboard[2].name}
            </div>
            <span style={{ fontSize: '0.85rem', color: '#2563eb', fontWeight: 600 }}>
              {leaderboard[2].points} pts
            </span>
          </div>
        </div>
      )}

      {/* Leaderboard Table */}
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontWeight: 700, fontSize: '0.95rem', color: '#0f172a' }}>All Ranked Learners</span>
          <span style={{ fontSize: '0.8rem', color: '#64748b' }}>Privacy Protected: Emails Suppressed</span>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.925rem' }}>
          <thead>
            <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#64748b', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              <th style={{ padding: '0.85rem 1.5rem', width: '80px' }}>Rank</th>
              <th style={{ padding: '0.85rem 1.5rem' }}>Student Name</th>
              <th style={{ padding: '0.85rem 1.5rem', textAlign: 'right' }}>Total Points</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((student) => {
              const isCurrentUser = user && student.id === user.id;

              return (
                <tr
                  key={student.id}
                  style={{
                    borderBottom: '1px solid #f1f5f9',
                    backgroundColor: isCurrentUser ? '#eff6ff' : 'transparent',
                    transition: 'background-color 0.15s ease'
                  }}
                >
                  <td style={{ padding: '1rem 1.5rem', fontWeight: 700, color: student.rank <= 3 ? '#2563eb' : '#64748b' }}>
                    #{student.rank}
                  </td>
                  <td style={{ padding: '1rem 1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <div
                        style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '50%',
                          backgroundColor: isCurrentUser ? '#2563eb' : '#e2e8f0',
                          color: isCurrentUser ? '#ffffff' : '#475569',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 700,
                          fontSize: '0.8rem'
                        }}
                      >
                        {student.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <span style={{ fontWeight: 600, color: '#0f172a' }}>{student.name}</span>
                        {isCurrentUser && (
                          <span className="badge badge-primary" style={{ marginLeft: '0.5rem', fontSize: '0.65rem' }}>
                            You
                          </span>
                        )}
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '1rem 1.5rem', textAlign: 'right', fontWeight: 700, color: '#0f172a' }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                      <Sparkles size={14} className="points-sparkle" />
                      {student.points} pts
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

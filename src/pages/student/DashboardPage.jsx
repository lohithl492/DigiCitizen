import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { moduleService } from '../../services/moduleService';
import { quizService } from '../../services/quizService';
import { achievementService } from '../../services/achievementService';
import {
  BookOpen, Award, CheckCircle2, Trophy, ArrowRight,
  Sparkles, Clock, HelpCircle, Shield, TrendingUp, AlertTriangle
} from 'lucide-react';

export default function DashboardPage() {
  const { user } = useAuth();
  const [modules, setModules] = useState([]);
  const [userProgress, setUserProgress] = useState([]);
  const [userAttempts, setUserAttempts] = useState([]);
  const [userBadges, setUserBadges] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboardData() {
      if (!user) return;
      try {
        const [modList, progList, attemptsList, badgesList] = await Promise.all([
          moduleService.getAllModules(),
          moduleService.getUserProgress(user.id),
          quizService.getUserAttempts(user.id),
          achievementService.getUserBadges(user.id)
        ]);

        setModules(modList || []);
        setUserProgress(progList || []);
        setUserAttempts(attemptsList || []);
        setUserBadges(badgesList || []);
      } catch (err) {
        console.error('Failed to load student dashboard statistics', err);
      } finally {
        setLoading(false);
      }
    }

    loadDashboardData();
  }, [user]);

  // Dynamic calculations from real database records
  const totalModules = modules.length || 6;
  const completedProgress = userProgress.filter((p) => p.completed);
  const completedCount = completedProgress.length;
  const overallPercentage = totalModules > 0 ? Math.round((completedCount / totalModules) * 100) : 0;

  // Unique completed modules set
  const completedSet = new Set(completedProgress.map((p) => p.module_id));

  // Quiz statistics
  const totalQuizzesAttempted = userAttempts.length;
  const passedQuizzesCount = userAttempts.filter((a) => a.passed).length;
  const averageScore = totalQuizzesAttempted > 0
    ? Math.round(userAttempts.reduce((acc, curr) => acc + (curr.percentage || 0), 0) / totalQuizzesAttempted)
    : 0;

  // Recommended next module: the first uncompleted module
  const recommendedModule = modules.find((m) => !completedSet.has(m.id)) || modules[0];

  if (loading) {
    return (
      <div style={{ padding: '3rem 0', textAlign: 'center' }}>
        <p style={{ color: '#64748b' }}>Calculating real-time academic records...</p>
      </div>
    );
  }

  return (
    <div className="student-dashboard">
      {/* 1. WELCOME HEADER */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
        <div>
          <span style={{ fontSize: '0.825rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#2563eb' }}>
            Academic Overview
          </span>
          <h1 style={{ fontSize: '1.85rem', color: '#0f172a', margin: '2px 0 6px 0' }}>
            Welcome back, {user?.full_name || 'Student Learner'}!
          </h1>
          <p style={{ color: '#64748b', fontSize: '0.95rem', margin: 0 }}>
            Track your digital citizenship milestones, assess cyber defense skills, and monitor certificate progress.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <Link to="/simulator" className="btn btn-secondary btn-sm">
            Launch Labs
          </Link>
          <Link to="/learn" className="btn btn-primary btn-sm">
            Continue Learning <ArrowRight size={14} />
          </Link>
        </div>
      </div>

      {/* 2. REAL-TIME STAT CARDS */}
      <div className="grid-4" style={{ marginBottom: '2.5rem' }}>
        {/* Stat 1: Completed Modules */}
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#64748b' }}>Modules Finished</span>
            <div style={{ width: '36px', height: '36px', borderRadius: '8px', backgroundColor: '#eff6ff', color: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <BookOpen size={18} />
            </div>
          </div>
          <div style={{ fontSize: '1.85rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.25rem' }}>
            {completedCount} <span style={{ fontSize: '1.1rem', color: '#94a3b8', fontWeight: 500 }}>/ {totalModules}</span>
          </div>
          <div className="progress-container" style={{ marginTop: '0.75rem', height: '6px' }}>
            <div className="progress-bar" style={{ width: `${overallPercentage}%` }} />
          </div>
          <span style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '6px', display: 'block' }}>
            {overallPercentage}% Curriculum Completed
          </span>
        </div>

        {/* Stat 2: Total Points */}
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#64748b' }}>Citizenship Points</span>
            <div style={{ width: '36px', height: '36px', borderRadius: '8px', backgroundColor: '#fef3c7', color: '#d97706', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Sparkles size={18} />
            </div>
          </div>
          <div style={{ fontSize: '1.85rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.25rem' }}>
            {user?.points || 0}
          </div>
          <span style={{ fontSize: '0.75rem', color: '#059669', display: 'flex', alignItems: 'center', gap: '3px', marginTop: '0.75rem' }}>
            <TrendingUp size={12} /> Earned via quizzes & modules
          </span>
        </div>

        {/* Stat 3: Quiz Average */}
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#64748b' }}>Quiz Performance</span>
            <div style={{ width: '36px', height: '36px', borderRadius: '8px', backgroundColor: '#ecfdf5', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <HelpCircle size={18} />
            </div>
          </div>
          <div style={{ fontSize: '1.85rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.25rem' }}>
            {totalQuizzesAttempted > 0 ? `${averageScore}%` : 'N/A'}
          </div>
          <span style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.75rem', display: 'block' }}>
            {passedQuizzesCount} of {totalQuizzesAttempted} attempts passed
          </span>
        </div>

        {/* Stat 4: Earned Badges */}
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#64748b' }}>Unlocked Badges</span>
            <div style={{ width: '36px', height: '36px', borderRadius: '8px', backgroundColor: '#f3e8ff', color: '#7e22ce', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Award size={18} />
            </div>
          </div>
          <div style={{ fontSize: '1.85rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.25rem' }}>
            {userBadges.length} <span style={{ fontSize: '1.1rem', color: '#94a3b8', fontWeight: 500 }}>/ 6</span>
          </div>
          <Link to="/achievements" style={{ fontSize: '0.75rem', color: '#2563eb', fontWeight: 600, marginTop: '0.75rem', display: 'block' }}>
            View badge collection →
          </Link>
        </div>
      </div>

      {/* 3. TWO COLUMN MAIN SECTION */}
      <div className="grid-3" style={{ gridTemplateColumns: '2fr 1fr', gap: '2rem', marginBottom: '2.5rem' }}>
        {/* Left Column: Recommended Module & Learning Progression */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {/* Recommended Next Module Hero Card */}
          {recommendedModule && (
            <div className="card" style={{ background: 'linear-gradient(135deg, #eff6ff 0%, #ffffff 100%)', borderColor: '#bfdbfe', padding: '1.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                <span className="badge badge-primary">Recommended Next Action</span>
                <span style={{ fontSize: '0.8rem', color: '#64748b' }}>⏱️ {recommendedModule.estimated_time}</span>
              </div>
              <h3 style={{ fontSize: '1.35rem', marginBottom: '0.5rem', color: '#0f172a' }}>
                {recommendedModule.title}
              </h3>
              <p style={{ color: '#475569', fontSize: '0.925rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                {recommendedModule.description}
              </p>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <Link to={`/learn/${recommendedModule.slug}`} className="btn btn-primary btn-sm">
                  Start Module <ArrowRight size={14} />
                </Link>
                <Link to={`/quiz/${recommendedModule.id}`} className="btn btn-secondary btn-sm">
                  Jump to Quiz
                </Link>
              </div>
            </div>
          )}

          {/* Module Progress Checklist */}
          <div className="card">
            <div className="card-header" style={{ marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1.15rem' }}>Curriculum Completion Tracker</h3>
              <span style={{ fontSize: '0.85rem', color: '#64748b' }}>{completedCount} of {totalModules} Completed</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {modules.map((m, idx) => {
                const done = completedSet.has(m.id);
                return (
                  <div
                    key={m.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0.85rem 1rem',
                      borderRadius: '8px',
                      backgroundColor: done ? '#f8fafc' : '#ffffff',
                      border: '1px solid var(--border-light)'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                      {done ? (
                        <CheckCircle2 size={20} className="text-success" />
                      ) : (
                        <div style={{ width: '20px', height: '20px', borderRadius: '50%', border: '2px solid #cbd5e1' }} />
                      )}
                      <div>
                        <div style={{ fontWeight: 600, fontSize: '0.925rem', color: '#0f172a' }}>
                          0{idx + 1}. {m.title}
                        </div>
                        <span style={{ fontSize: '0.775rem', color: '#64748b' }}>{m.estimated_time}</span>
                      </div>
                    </div>

                    <div>
                      <Link to={`/learn/${m.slug}`} className="btn btn-secondary btn-sm" style={{ padding: '0.3rem 0.65rem', fontSize: '0.8rem' }}>
                        {done ? 'Review' : 'Study'}
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Badges & Recent Quiz Activity */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {/* Certificate Readiness Card */}
          <div className="card" style={{ borderColor: completedCount >= 6 ? '#a7f3d0' : 'var(--border-light)', backgroundColor: completedCount >= 6 ? '#ecfdf5' : '#ffffff' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <Award size={20} style={{ color: completedCount >= 6 ? '#059669' : '#2563eb' }} />
              <h3 style={{ fontSize: '1.05rem', margin: 0 }}>Certificate Readiness</h3>
            </div>
            <p style={{ fontSize: '0.875rem', color: '#64748b', lineHeight: 1.5, marginBottom: '1rem' }}>
              {completedCount >= 6
                ? 'All 6 modules completed! Your verifiable certificate is ready to generate.'
                : `Complete ${6 - completedCount} more module(s) to unlock your verified PDF certificate.`}
            </p>
            <Link to="/certificate" className={`btn ${completedCount >= 6 ? 'btn-primary' : 'btn-secondary'} btn-sm`} style={{ width: '100%' }}>
              {completedCount >= 6 ? 'Claim Digital Certificate' : 'Check Requirements'}
            </Link>
          </div>

          {/* Earned Badges Mini Showcase */}
          <div className="card">
            <div className="card-header" style={{ marginBottom: '0.85rem' }}>
              <h3 style={{ fontSize: '1.05rem' }}>Recent Badges</h3>
              <Link to="/achievements" style={{ fontSize: '0.8rem', color: '#2563eb' }}>All Badges</Link>
            </div>

            {userBadges.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {userBadges.slice(0, 3).map((badge, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.5rem 0', borderBottom: idx < 2 ? '1px solid #f1f5f9' : 'none' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#eff6ff', color: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Award size={18} />
                    </div>
                    <div>
                      <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#0f172a' }}>{badge.title}</div>
                      <span style={{ fontSize: '0.75rem', color: '#64748b' }}>+{badge.points_reward || 50} pts earned</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p style={{ color: '#94a3b8', fontSize: '0.85rem', margin: 0 }}>
                No badges earned yet. Sign in or complete your first module to earn badges!
              </p>
            )}
          </div>

          {/* Previous Quiz Attempts Log */}
          <div className="card">
            <div className="card-header" style={{ marginBottom: '0.85rem' }}>
              <h3 style={{ fontSize: '1.05rem' }}>Recent Quiz Attempts</h3>
            </div>

            {userAttempts.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                {userAttempts.slice(0, 4).map((att) => (
                  <div key={att.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.85rem', padding: '0.4rem 0', borderBottom: '1px solid #f1f5f9' }}>
                    <div style={{ overflow: 'hidden', paddingRight: '0.5rem' }}>
                      <div style={{ fontWeight: 600, color: '#0f172a', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                        {att.quizzes?.title || 'Module Quiz'}
                      </div>
                      <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                        {new Date(att.completed_at).toLocaleDateString()}
                      </span>
                    </div>
                    <span className={`badge ${att.passed ? 'badge-success' : 'badge-danger'}`} style={{ fontSize: '0.7rem' }}>
                      {att.score}/{att.total_questions} ({att.percentage}%)
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p style={{ color: '#94a3b8', fontSize: '0.85rem', margin: 0 }}>
                No quiz attempts recorded yet.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

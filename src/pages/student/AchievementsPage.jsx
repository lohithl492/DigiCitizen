import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { achievementService } from '../../services/achievementService';
import {
  Award, Lock, CheckCircle2, Sparkles, Crown,
  LogIn, BookOpenCheck, Shield, ArrowRight
} from 'lucide-react';

const ICON_MAP = {
  LogIn: LogIn,
  BookOpenCheck: BookOpenCheck,
  Shield: Shield,
  Lock: Lock,
  Award: Award,
  Crown: Crown
};

export default function AchievementsPage() {
  const { user } = useAuth();
  const [allBadges, setAllBadges] = useState([]);
  const [earnedBadges, setEarnedBadges] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadBadges() {
      if (!user) return;
      try {
        const [badges, userEarned] = await Promise.all([
          achievementService.getAllBadges(),
          achievementService.getUserBadges(user.id)
        ]);
        setAllBadges(badges || []);
        setEarnedBadges(userEarned || []);
      } catch (err) {
        console.error('Failed to load achievements', err);
      } finally {
        setLoading(false);
      }
    }
    loadBadges();
  }, [user]);

  const earnedCodes = new Set(earnedBadges.map((b) => b.code));

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem 0' }}>
        <p style={{ color: '#64748b' }}>Loading digital badges and achievements...</p>
      </div>
    );
  }

  return (
    <div className="achievements-page" style={{ maxWidth: '960px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '2.5rem' }}>
        <div>
          <span style={{ fontSize: '0.825rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#2563eb' }}>
            Accreditation & Badges
          </span>
          <h1 style={{ fontSize: '2rem', color: '#0f172a', margin: '2px 0 6px 0' }}>
            Earned Achievements & Milestones
          </h1>
          <p style={{ color: '#64748b', fontSize: '0.95rem', margin: 0 }}>
            Unlocked credentials demonstrating verified digital citizenship competencies.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div className="card" style={{ padding: '0.5rem 1rem', display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <Award size={20} className="text-primary" />
            <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#0f172a' }}>
              {earnedBadges.length} of {allBadges.length} Unlocked
            </span>
          </div>
        </div>
      </div>

      {/* Badges Grid */}
      <div className="grid-3" style={{ marginBottom: '3rem' }}>
        {allBadges.map((badge) => {
          const isEarned = earnedCodes.has(badge.code);
          const earnedInfo = earnedBadges.find((b) => b.code === badge.code);
          const IconComp = ICON_MAP[badge.icon] || Award;

          return (
            <div
              key={badge.id}
              className="card card-hover"
              style={{
                borderColor: isEarned ? '#bfdbfe' : 'var(--border-light)',
                backgroundColor: isEarned ? '#ffffff' : '#f8fafc',
                opacity: isEarned ? 1 : 0.75,
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                <div
                  style={{
                    width: '52px',
                    height: '52px',
                    borderRadius: '50%',
                    backgroundColor: isEarned ? '#eff6ff' : '#e2e8f0',
                    color: isEarned ? '#2563eb' : '#94a3b8',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: `2px solid ${isEarned ? '#bfdbfe' : '#cbd5e1'}`
                  }}
                >
                  <IconComp size={26} />
                </div>

                {isEarned ? (
                  <span className="badge badge-success">
                    <CheckCircle2 size={12} /> Unlocked
                  </span>
                ) : (
                  <span className="badge badge-neutral">
                    <Lock size={12} /> Locked
                  </span>
                )}
              </div>

              <h3 style={{ fontSize: '1.15rem', color: isEarned ? '#0f172a' : '#64748b', marginBottom: '0.35rem' }}>
                {badge.title}
              </h3>

              <p style={{ color: '#64748b', fontSize: '0.85rem', lineHeight: 1.5, marginBottom: '1rem', flexGrow: 1 }}>
                {badge.description}
              </p>

              <div style={{ backgroundColor: isEarned ? '#f0f7ff' : '#f1f5f9', padding: '0.65rem 0.85rem', borderRadius: '8px', fontSize: '0.775rem', marginBottom: '1rem' }}>
                <strong style={{ color: '#0f172a' }}>Requirement: </strong>
                <span style={{ color: '#475569' }}>{badge.criteria}</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #f1f5f9', paddingTop: '0.75rem', marginTop: 'auto', fontSize: '0.8rem' }}>
                <span style={{ color: '#d97706', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '3px' }}>
                  <Sparkles size={12} /> +{badge.points_reward} pts
                </span>
                {isEarned && earnedInfo?.awarded_at && (
                  <span style={{ color: '#94a3b8', fontSize: '0.75rem' }}>
                    Earned {new Date(earnedInfo.awarded_at).toLocaleDateString()}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Certificate CTA Banner */}
      <div className="card" style={{ background: 'linear-gradient(135deg, #1e3a8a 0%, #0f172a 100%)', color: '#ffffff', padding: '2.5rem', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.5rem' }}>
        <div>
          <span style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', color: '#93c5fd', letterSpacing: '0.05em' }}>
            Official Accreditation
          </span>
          <h2 style={{ fontSize: '1.65rem', color: '#ffffff', margin: '4px 0 8px 0' }}>
            Digital Citizen PDF Certificate
          </h2>
          <p style={{ color: '#cbd5e1', fontSize: '0.925rem', margin: 0, maxWidth: '550px' }}>
            Once you complete all 6 learning modules, your official verifiable PDF Certificate of Digital Citizenship becomes available for instant download.
          </p>
        </div>

        <Link to="/certificate" className="btn btn-hero">
          Inspect Certificate Status <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}

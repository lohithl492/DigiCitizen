import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import ShieldLogo from '../../components/common/ShieldLogo';
import { Lock, Mail, User, AlertCircle, CheckCircle2, ShieldCheck } from 'lucide-react';
import { checkPasswordStrength } from '../../utils/passwordChecker';

export default function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Live client-side password strength preview
  const strength = checkPasswordStrength(password);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!fullName.trim()) {
      setError('Please provide your full legal or preferred student name.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Password entries do not match. Please re-enter carefully.');
      return;
    }

    if (password.length < 8) {
      setError('Password must contain at least 8 characters for baseline security.');
      return;
    }

    setSubmitting(true);
    try {
      // Role is strictly locked to 'student'
      await register({
        email: email.trim(),
        password,
        fullName: fullName.trim()
      });
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Registration failed. Please check information and try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="auth-page section-py" style={{ minHeight: '85vh', display: 'flex', alignItems: 'center' }}>
      <div className="container" style={{ maxWidth: '500px' }}>
        <div className="card" style={{ padding: '2.5rem', boxShadow: 'var(--shadow-xl)' }}>
          {/* Logo Header */}
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <Link to="/" style={{ display: 'inline-block', marginBottom: '1rem' }}>
              <ShieldLogo size={32} />
            </Link>
            <h2 style={{ fontSize: '1.65rem', color: '#0f172a', marginBottom: '0.35rem' }}>Create Student Account</h2>
            <p style={{ color: '#64748b', fontSize: '0.9rem' }}>
              Begin your journey to become an accredited digital citizen.
            </p>
          </div>

          {/* Enforced Role Notice */}
          <div style={{ backgroundColor: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '8px', padding: '0.65rem 0.85rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.825rem', color: '#1e40af' }}>
            <ShieldCheck size={16} style={{ flexShrink: 0 }} />
            <span>Role Assigned: <strong>Verified Student</strong> (Administrative access is governed at database level).</span>
          </div>

          {/* Error Alert */}
          {error && (
            <div className="alert alert-danger animate-fade-in">
              <AlertCircle size={18} style={{ flexShrink: 0 }} />
              <div>{error}</div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label" htmlFor="fullName">Full Name</label>
              <div style={{ position: 'relative' }}>
                <User size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                <input
                  id="fullName"
                  type="text"
                  className="form-input"
                  style={{ paddingLeft: '38px' }}
                  placeholder="e.g. Maya Lin"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="email">Email Address</label>
              <div style={{ position: 'relative' }}>
                <Mail size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                <input
                  id="email"
                  type="email"
                  className="form-input"
                  style={{ paddingLeft: '38px' }}
                  placeholder="maya.lin@university.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="password">Password</label>
              <div style={{ position: 'relative' }}>
                <Lock size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                <input
                  id="password"
                  type="password"
                  className="form-input"
                  style={{ paddingLeft: '38px' }}
                  placeholder="At least 8 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="new-password"
                  required
                />
              </div>

              {/* Password Strength Indicator */}
              {password && (
                <div style={{ marginTop: '0.65rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '4px' }}>
                    <span style={{ color: '#64748b' }}>Password Strength:</span>
                    <strong style={{ color: strength.color }}>{strength.strengthLabel}</strong>
                  </div>
                  <div style={{ height: '4px', backgroundColor: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ width: `${strength.percentage}%`, height: '100%', backgroundColor: strength.color, transition: 'all 0.3s ease' }} />
                  </div>
                </div>
              )}
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="confirmPassword">Confirm Password</label>
              <div style={{ position: 'relative' }}>
                <Lock size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                <input
                  id="confirmPassword"
                  type="password"
                  className="form-input"
                  style={{ paddingLeft: '38px' }}
                  placeholder="Re-enter password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  autoComplete="new-password"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="btn btn-primary"
              style={{ width: '100%', marginTop: '0.5rem', padding: '0.75rem' }}
            >
              {submitting ? 'Creating Secure Account...' : 'Complete Registration'}
            </button>
          </form>

          {/* Footer note */}
          <div style={{ textAlign: 'center', marginTop: '1.75rem', fontSize: '0.9rem', color: '#64748b' }}>
            Already have an account?{' '}
            <Link to="/login" style={{ fontWeight: 600, color: '#2563eb' }}>
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import ShieldLogo from '../../components/common/ShieldLogo';
import { Lock, Mail, AlertCircle, ArrowRight, ShieldCheck, User } from 'lucide-react';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const from = location.state?.from?.pathname || '/dashboard';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please provide both your registered email address and password.');
      return;
    }

    setSubmitting(true);
    try {
      const user = await login({ email, password });
      if (user?.role === 'admin' && from === '/dashboard') {
        navigate('/admin');
      } else {
        navigate(from, { replace: true });
      }
    } catch (err) {
      setError(err.message || 'Failed to authenticate. Please check your credentials.');
    } finally {
      setSubmitting(false);
    }
  };

  // Quick-fill credentials helper for evaluation
  const fillDemoStudent = () => {
    setEmail('student@digicitizen.edu');
    setPassword('CyberStudent2026!');
  };

  const fillDemoAdmin = () => {
    setEmail('admin@digicitizen.edu');
    setPassword('AdminMaster2026!');
  };

  return (
    <div className="auth-page section-py" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center' }}>
      <div className="container" style={{ maxWidth: '460px' }}>
        <div className="card" style={{ padding: '2.5rem', boxShadow: 'var(--shadow-xl)' }}>
          {/* Logo Header */}
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <Link to="/" style={{ display: 'inline-block', marginBottom: '1rem' }}>
              <ShieldLogo size={32} />
            </Link>
            <h2 style={{ fontSize: '1.65rem', color: '#0f172a', marginBottom: '0.35rem' }}>Welcome Back</h2>
            <p style={{ color: '#64748b', fontSize: '0.9rem' }}>
              Sign in to your DigiCitizen student or faculty account.
            </p>
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
              <label className="form-label" htmlFor="email">Email Address</label>
              <div style={{ position: 'relative' }}>
                <Mail size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                <input
                  id="email"
                  type="email"
                  className="form-input"
                  style={{ paddingLeft: '38px' }}
                  placeholder="name@school.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                <label className="form-label" htmlFor="password" style={{ margin: 0 }}>Password</label>
                <Link to="/forgot-password" style={{ fontSize: '0.825rem', color: '#2563eb' }}>
                  Forgot password?
                </Link>
              </div>
              <div style={{ position: 'relative' }}>
                <Lock size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                <input
                  id="password"
                  type="password"
                  className="form-input"
                  style={{ paddingLeft: '38px' }}
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
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
              {submitting ? 'Verifying Credentials...' : 'Sign In'}
            </button>
          </form>

          {/* Quick Demo Fill Buttons for frictionless evaluation */}
          <div style={{ marginTop: '1.75rem', paddingTop: '1.25rem', borderTop: '1px solid #e2e8f0' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: '#94a3b8', textAlign: 'center', letterSpacing: '0.05em', marginBottom: '0.75rem' }}>
              Quick Evaluation Credentials
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
              <button
                type="button"
                onClick={fillDemoStudent}
                className="btn btn-secondary btn-sm"
                style={{ fontSize: '0.8rem', justifyContent: 'center' }}
              >
                <User size={14} /> Student Demo
              </button>
              <button
                type="button"
                onClick={fillDemoAdmin}
                className="btn btn-secondary btn-sm"
                style={{ fontSize: '0.8rem', justifyContent: 'center' }}
              >
                <ShieldCheck size={14} /> Admin Demo
              </button>
            </div>
          </div>

          {/* Footer note */}
          <div style={{ textAlign: 'center', marginTop: '1.75rem', fontSize: '0.9rem', color: '#64748b' }}>
            New to DigiCitizen?{' '}
            <Link to="/register" style={{ fontWeight: 600, color: '#2563eb' }}>
              Create a free student account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

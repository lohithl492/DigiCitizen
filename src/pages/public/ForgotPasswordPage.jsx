import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { authService } from '../../services/authService';
import ShieldLogo from '../../components/common/ShieldLogo';
import { Mail, AlertCircle, CheckCircle2, ArrowLeft } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (!email) {
      setError('Please enter your account email.');
      return;
    }

    setSubmitting(true);
    try {
      await authService.resetPasswordForEmail(email);
      setMessage('Password reset instructions have been dispatched to your email.');
    } catch (err) {
      setError(err.message || 'Unable to process reset request. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="auth-page section-py" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center' }}>
      <div className="container" style={{ maxWidth: '460px' }}>
        <div className="card" style={{ padding: '2.5rem', boxShadow: 'var(--shadow-xl)' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <Link to="/" style={{ display: 'inline-block', marginBottom: '1rem' }}>
              <ShieldLogo size={32} />
            </Link>
            <h2 style={{ fontSize: '1.65rem', color: '#0f172a', marginBottom: '0.35rem' }}>Reset Password</h2>
            <p style={{ color: '#64748b', fontSize: '0.9rem' }}>
              Enter your email and we'll send you a secure recovery link.
            </p>
          </div>

          {error && (
            <div className="alert alert-danger animate-fade-in">
              <AlertCircle size={18} style={{ flexShrink: 0 }} />
              <div>{error}</div>
            </div>
          )}

          {message && (
            <div className="alert alert-success animate-fade-in">
              <CheckCircle2 size={18} style={{ flexShrink: 0 }} />
              <div>{message}</div>
            </div>
          )}

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
                  placeholder="name@university.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
              {submitting ? 'Sending Link...' : 'Send Recovery Link'}
            </button>
          </form>

          <div style={{ textAlign: 'center', marginTop: '1.75rem' }}>
            <Link to="/login" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: '#64748b', fontSize: '0.9rem' }}>
              <ArrowLeft size={16} /> Back to Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

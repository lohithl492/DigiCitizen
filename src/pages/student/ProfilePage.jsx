import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { authService } from '../../services/authService';
import { User, Mail, Shield, Sparkles, Lock, CheckCircle2, AlertCircle } from 'lucide-react';

export default function ProfilePage() {
  const { user, updateProfile, refreshUser } = useAuth();

  const [fullName, setFullName] = useState(user?.full_name || '');
  const [profileMessage, setProfileMessage] = useState('');
  const [profileError, setProfileError] = useState('');
  const [savingProfile, setSavingProfile] = useState(false);

  // Password state
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [savingPassword, setSavingPassword] = useState(false);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setProfileMessage('');
    setProfileError('');

    if (!fullName.trim()) {
      setProfileError('Full name cannot be blank.');
      return;
    }

    setSavingProfile(true);
    try {
      await updateProfile({ full_name: fullName.trim() });
      setProfileMessage('Profile information saved successfully.');
      await refreshUser();
    } catch (err) {
      setProfileError(err.message || 'Failed to update profile.');
    } finally {
      setSavingProfile(false);
    }
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    setPasswordMessage('');
    setPasswordError('');

    if (newPassword !== confirmPassword) {
      setPasswordError('Passwords do not match.');
      return;
    }

    if (newPassword.length < 8) {
      setPasswordError('Password must be at least 8 characters long.');
      return;
    }

    setSavingPassword(true);
    try {
      await authService.updatePassword(newPassword);
      setPasswordMessage('Password changed successfully.');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      setPasswordError(err.message || 'Failed to update password.');
    } finally {
      setSavingPassword(false);
    }
  };

  return (
    <div className="profile-page" style={{ maxWidth: '820px', margin: '0 auto' }}>
      <div style={{ marginBottom: '2rem' }}>
        <span style={{ fontSize: '0.825rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#2563eb' }}>
          Account Settings
        </span>
        <h1 style={{ fontSize: '2rem', color: '#0f172a', margin: '2px 0 6px 0' }}>
          Student Profile
        </h1>
        <p style={{ color: '#64748b', fontSize: '0.95rem', margin: 0 }}>
          Manage your personal identity credentials and security preferences.
        </p>
      </div>

      {/* Profile Overview Card */}
      <div className="card" style={{ padding: '2rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.65rem',
              fontWeight: 800
            }}
          >
            {user?.full_name ? user.full_name.charAt(0).toUpperCase() : 'U'}
          </div>

          <div>
            <h2 style={{ fontSize: '1.35rem', color: '#0f172a', marginBottom: '4px' }}>
              {user?.full_name || 'Student Learner'}
            </h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: '#64748b', fontSize: '0.875rem' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Mail size={14} /> {user?.email}
              </span>
              <span>•</span>
              <span className="badge badge-primary">
                Role: {user?.role || 'student'}
              </span>
            </div>
          </div>
        </div>

        <div style={{ textAlign: 'right' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#d97706', fontSize: '1.4rem', fontWeight: 800 }}>
            <Sparkles size={20} />
            <span>{user?.points || 0} pts</span>
          </div>
          <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Accredited Points</span>
        </div>
      </div>

      {/* Edit Details Form */}
      <div className="card" style={{ padding: '2rem', marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.2rem', marginBottom: '1.25rem', color: '#0f172a' }}>
          Personal Details
        </h3>

        {profileMessage && (
          <div className="alert alert-success animate-fade-in">
            <CheckCircle2 size={18} style={{ flexShrink: 0 }} />
            <div>{profileMessage}</div>
          </div>
        )}
        {profileError && (
          <div className="alert alert-danger animate-fade-in">
            <AlertCircle size={18} style={{ flexShrink: 0 }} />
            <div>{profileError}</div>
          </div>
        )}

        <form onSubmit={handleUpdateProfile}>
          <div className="form-group">
            <label className="form-label" htmlFor="fullName">Full Name</label>
            <input
              id="fullName"
              type="text"
              className="form-input"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Email Address (Registered)</label>
            <input
              type="email"
              className="form-input"
              value={user?.email || ''}
              disabled
              style={{ backgroundColor: '#f8fafc', color: '#64748b', cursor: 'not-allowed' }}
            />
            <span className="form-helper">Email is bound to your Supabase Auth session and cannot be changed directly.</span>
          </div>

          <button
            type="submit"
            disabled={savingProfile}
            className="btn btn-primary btn-sm"
          >
            {savingProfile ? 'Saving...' : 'Save Profile Changes'}
          </button>
        </form>
      </div>

      {/* Change Password Form */}
      <div className="card" style={{ padding: '2rem' }}>
        <h3 style={{ fontSize: '1.2rem', marginBottom: '1.25rem', color: '#0f172a' }}>
          Change Account Password
        </h3>

        {passwordMessage && (
          <div className="alert alert-success animate-fade-in">
            <CheckCircle2 size={18} style={{ flexShrink: 0 }} />
            <div>{passwordMessage}</div>
          </div>
        )}
        {passwordError && (
          <div className="alert alert-danger animate-fade-in">
            <AlertCircle size={18} style={{ flexShrink: 0 }} />
            <div>{passwordError}</div>
          </div>
        )}

        <form onSubmit={handleUpdatePassword}>
          <div className="form-group">
            <label className="form-label" htmlFor="newPass">New Password</label>
            <input
              id="newPass"
              type="password"
              className="form-input"
              placeholder="At least 8 characters"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="confirmPass">Confirm New Password</label>
            <input
              id="confirmPass"
              type="password"
              className="form-input"
              placeholder="Re-enter new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={savingPassword}
            className="btn btn-secondary btn-sm"
          >
            {savingPassword ? 'Updating...' : 'Update Password'}
          </button>
        </form>
      </div>
    </div>
  );
}

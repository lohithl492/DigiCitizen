import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import ShieldLogo from '../common/ShieldLogo';
import { 
  Menu, X, User, LogOut, LayoutDashboard, Award, 
  Shield, CheckCircle2, ChevronDown, Sparkles 
} from 'lucide-react';

export default function Navbar() {
  const { user, isAdmin, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    setUserDropdownOpen(false);
    navigate('/');
  };

  const navLinkClass = ({ isActive }) =>
    `nav-item ${isActive ? 'nav-item-active' : ''}`;

  return (
    <header className="site-header">
      <div className="container site-header-inner">
        {/* Brand Logo */}
        <Link to="/" className="site-brand" onClick={() => setMobileMenuOpen(false)}>
          <ShieldLogo size={24} />
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="desktop-nav">
          <NavLink to="/" className={navLinkClass}>Home</NavLink>
          <NavLink to="/about" className={navLinkClass}>About</NavLink>
          <NavLink to="/learn" className={navLinkClass}>Learning Modules</NavLink>
          <NavLink to="/simulator" className={navLinkClass}>Phishing Detector</NavLink>
          <NavLink to="/scenarios" className={navLinkClass}>Safety Scenarios</NavLink>
          <NavLink to="/leaderboard" className={navLinkClass}>Leaderboard</NavLink>
        </nav>

        {/* Auth / Action Area */}
        <div className="header-actions">
          {user ? (
            <div className="user-menu-wrap">
              {/* Points badge */}
              <div className="user-points-pill" title="Total digital citizenship points earned">
                <Sparkles size={14} className="points-sparkle" />
                <span>{user.points || 0} pts</span>
              </div>

              {/* User Dropdown Trigger */}
              <div 
                className="user-avatar-btn"
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
              >
                <div className="avatar-circle">
                  {user.full_name ? user.full_name.charAt(0).toUpperCase() : 'U'}
                </div>
                <span className="user-name-text">{user.full_name || 'My Account'}</span>
                <ChevronDown size={14} style={{ opacity: 0.7 }} />
              </div>

              {/* Dropdown Menu */}
              {userDropdownOpen && (
                <div className="user-dropdown-menu animate-fade-in" onClick={() => setUserDropdownOpen(false)}>
                  <div className="dropdown-header">
                    <strong>{user.full_name}</strong>
                    <span className="dropdown-email">{user.email}</span>
                    <span className={`dropdown-role-badge ${isAdmin ? 'badge-admin' : 'badge-student'}`}>
                      {isAdmin ? 'Platform Administrator' : 'Verified Student'}
                    </span>
                  </div>

                  <hr className="dropdown-divider" />

                  {isAdmin && (
                    <Link to="/admin" className="dropdown-item admin-highlight">
                      <Shield size={16} /> Admin Portal
                    </Link>
                  )}

                  <Link to="/dashboard" className="dropdown-item">
                    <LayoutDashboard size={16} /> Student Dashboard
                  </Link>

                  <Link to="/profile" className="dropdown-item">
                    <User size={16} /> My Profile
                  </Link>

                  <Link to="/achievements" className="dropdown-item">
                    <Award size={16} /> Earned Badges
                  </Link>

                  <Link to="/certificate" className="dropdown-item">
                    <CheckCircle2 size={16} /> Digital Certificate
                  </Link>

                  <hr className="dropdown-divider" />

                  <button onClick={handleLogout} className="dropdown-item text-danger">
                    <LogOut size={16} /> Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="guest-actions">
              <Link to="/login" className="btn btn-secondary btn-sm">Log In</Link>
              <Link to="/register" className="btn btn-primary btn-sm">Get Started</Link>
            </div>
          )}

          {/* Mobile Menu Toggle Button */}
          <button 
            className="mobile-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-drawer animate-fade-in">
          <nav className="mobile-nav-links" onClick={() => setMobileMenuOpen(false)}>
            <NavLink to="/" className={navLinkClass}>Home</NavLink>
            <NavLink to="/about" className={navLinkClass}>About Platform</NavLink>
            <NavLink to="/learn" className={navLinkClass}>Learning Modules</NavLink>
            <NavLink to="/simulator" className={navLinkClass}>Phishing Detector</NavLink>
            <NavLink to="/scenarios" className={navLinkClass}>Safety Scenarios</NavLink>
            <NavLink to="/leaderboard" className={navLinkClass}>Leaderboard</NavLink>

            <hr style={{ margin: '1rem 0', borderColor: 'var(--border-light)' }} />

            {user ? (
              <>
                <NavLink to="/dashboard" className={navLinkClass}>Student Dashboard</NavLink>
                {isAdmin && <NavLink to="/admin" className={navLinkClass}>Admin Portal</NavLink>}
                <NavLink to="/achievements" className={navLinkClass}>Earned Badges</NavLink>
                <NavLink to="/certificate" className={navLinkClass}>Digital Certificate</NavLink>
                <NavLink to="/profile" className={navLinkClass}>Profile Settings</NavLink>
                <button 
                  onClick={handleLogout} 
                  className="btn btn-danger btn-sm" 
                  style={{ marginTop: '0.75rem', width: '100%' }}
                >
                  Log Out
                </button>
              </>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '0.5rem' }}>
                <Link to="/login" className="btn btn-secondary" style={{ width: '100%' }}>Log In</Link>
                <Link to="/register" className="btn btn-primary" style={{ width: '100%' }}>Create Free Account</Link>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}

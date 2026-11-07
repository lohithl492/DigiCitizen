import React, { useState } from 'react';
import { Outlet, NavLink, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ShieldLogo from '../components/common/ShieldLogo';
import {
  LayoutDashboard, BookOpen, ShieldAlert, HeartHandshake,
  Award, Trophy, User, CheckCircle2, LogOut, Menu, X, Sparkles, Shield
} from 'lucide-react';

export default function DashboardLayout() {
  const { user, isAdmin, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const navItemClass = ({ isActive }) =>
    `dashboard-nav-item ${isActive ? 'dashboard-nav-item-active' : ''}`;

  return (
    <div className="dashboard-wrapper">
      {/* Sidebar Overlay for Mobile */}
      {sidebarOpen && (
        <div className="sidebar-backdrop" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Student Portal Sidebar */}
      <aside className={`dashboard-sidebar ${sidebarOpen ? 'sidebar-open' : ''}`}>
        <div className="sidebar-header">
          <Link to="/" style={{ textDecoration: 'none' }}>
            <ShieldLogo size={24} />
          </Link>
          <button className="sidebar-close-btn" onClick={() => setSidebarOpen(false)}>
            <X size={20} />
          </button>
        </div>

        {/* User Identity Chip */}
        <div className="sidebar-user-card">
          <div className="sidebar-user-avatar">
            {user?.full_name ? user.full_name.charAt(0).toUpperCase() : 'S'}
          </div>
          <div className="sidebar-user-meta">
            <span className="sidebar-user-name">{user?.full_name || 'Student Learner'}</span>
            <div className="sidebar-points-row">
              <Sparkles size={12} className="text-warning" />
              <span>{user?.points || 0} Points</span>
            </div>
          </div>
        </div>

        {/* Sidebar Nav Items */}
        <nav className="sidebar-nav" onClick={() => setSidebarOpen(false)}>
          <div className="nav-group-label">Core Learning</div>
          <NavLink to="/dashboard" end className={navItemClass}>
            <LayoutDashboard size={18} />
            <span>Dashboard</span>
          </NavLink>
          <NavLink to="/learn" className={navItemClass}>
            <BookOpen size={18} />
            <span>Learning Modules</span>
          </NavLink>

          <div className="nav-group-label">Interactive Labs</div>
          <NavLink to="/simulator" className={navItemClass}>
            <ShieldAlert size={18} />
            <span>Phishing & Password Lab</span>
          </NavLink>
          <NavLink to="/scenarios" className={navItemClass}>
            <HeartHandshake size={18} />
            <span>Safety Scenarios</span>
          </NavLink>

          <div className="nav-group-label">Recognition & Community</div>
          <NavLink to="/achievements" className={navItemClass}>
            <Award size={18} />
            <span>Badges & Milestones</span>
          </NavLink>
          <NavLink to="/leaderboard" className={navItemClass}>
            <Trophy size={18} />
            <span>Honor Roll</span>
          </NavLink>
          <NavLink to="/certificate" className={navItemClass}>
            <CheckCircle2 size={18} />
            <span>Digital Certificate</span>
          </NavLink>

          <div className="nav-group-label">Settings</div>
          <NavLink to="/profile" className={navItemClass}>
            <User size={18} />
            <span>Profile Settings</span>
          </NavLink>

          {isAdmin && (
            <>
              <div className="nav-group-label">Administrative</div>
              <NavLink to="/admin" className={navItemClass}>
                <Shield size={18} style={{ color: '#2563eb' }} />
                <span style={{ color: '#2563eb', fontWeight: 600 }}>Admin Portal</span>
              </NavLink>
            </>
          )}
        </nav>

        {/* Sidebar Bottom */}
        <div className="sidebar-footer">
          <button onClick={handleLogout} className="sidebar-logout-btn">
            <LogOut size={16} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="dashboard-content-area">
        {/* Top Header */}
        <header className="dashboard-topbar">
          <button className="dashboard-menu-btn" onClick={() => setSidebarOpen(true)}>
            <Menu size={22} />
          </button>

          <div className="dashboard-breadcrumbs">
            <Link to="/" className="breadcrumb-link">Home</Link>
            <span className="breadcrumb-separator">/</span>
            <span className="breadcrumb-current">Student Portal</span>
          </div>

          <div className="dashboard-topbar-actions">
            <div className="topbar-points-chip">
              <Sparkles size={14} className="points-sparkle" />
              <strong>{user?.points || 0}</strong>
              <span className="points-label">Total Points</span>
            </div>

            <Link to="/profile" className="topbar-profile-link" title="Account settings">
              <div className="avatar-circle-sm">
                {user?.full_name ? user.full_name.charAt(0).toUpperCase() : 'U'}
              </div>
            </Link>
          </div>
        </header>

        {/* Dynamic Nested Content */}
        <main className="dashboard-main-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

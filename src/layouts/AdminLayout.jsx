import React, { useState } from 'react';
import { Outlet, NavLink, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ShieldLogo from '../components/common/ShieldLogo';
import {
  LayoutDashboard, BookOpen, HelpCircle, HeartHandshake,
  Users, BarChart3, LogOut, Menu, X, ArrowLeft, ShieldCheck
} from 'lucide-react';

export default function AdminLayout() {
  const { user, logout } = useAuth();
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
      {sidebarOpen && (
        <div className="sidebar-backdrop" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Admin Sidebar */}
      <aside className={`dashboard-sidebar admin-sidebar ${sidebarOpen ? 'sidebar-open' : ''}`}>
        <div className="sidebar-header">
          <Link to="/" style={{ textDecoration: 'none' }}>
            <ShieldLogo size={24} />
          </Link>
          <button className="sidebar-close-btn" onClick={() => setSidebarOpen(false)}>
            <X size={20} />
          </button>
        </div>

        {/* Admin Badge Banner */}
        <div className="admin-status-banner">
          <ShieldCheck size={16} />
          <span>Admin Command Center</span>
        </div>

        {/* Admin Navigation */}
        <nav className="sidebar-nav" onClick={() => setSidebarOpen(false)}>
          <div className="nav-group-label">Platform Oversight</div>
          <NavLink to="/admin" end className={navItemClass}>
            <LayoutDashboard size={18} />
            <span>Platform Overview</span>
          </NavLink>
          <NavLink to="/admin/analytics" className={navItemClass}>
            <BarChart3 size={18} />
            <span>Activity Logs & Analytics</span>
          </NavLink>

          <div className="nav-group-label">Curriculum Management</div>
          <NavLink to="/admin/modules" className={navItemClass}>
            <BookOpen size={18} />
            <span>Learning Modules</span>
          </NavLink>
          <NavLink to="/admin/quizzes" className={navItemClass}>
            <HelpCircle size={18} />
            <span>Quiz & Question Bank</span>
          </NavLink>
          <NavLink to="/admin/scenarios" className={navItemClass}>
            <HeartHandshake size={18} />
            <span>Safety Scenarios</span>
          </NavLink>

          <div className="nav-group-label">Learners</div>
          <NavLink to="/admin/students" className={navItemClass}>
            <Users size={18} />
            <span>Student Directory</span>
          </NavLink>

          <div className="nav-group-label">Portal Switcher</div>
          <Link to="/dashboard" className="dashboard-nav-item switch-portal-link">
            <ArrowLeft size={18} />
            <span>Back to Student Portal</span>
          </Link>
        </nav>

        <div className="sidebar-footer">
          <button onClick={handleLogout} className="sidebar-logout-btn">
            <LogOut size={16} />
            <span>Sign Out Admin</span>
          </button>
        </div>
      </aside>

      {/* Main Admin Area */}
      <div className="dashboard-content-area">
        <header className="dashboard-topbar">
          <button className="dashboard-menu-btn" onClick={() => setSidebarOpen(true)}>
            <Menu size={22} />
          </button>

          <div className="dashboard-breadcrumbs">
            <Link to="/admin" className="breadcrumb-link">Admin Console</Link>
            <span className="breadcrumb-separator">/</span>
            <span className="breadcrumb-current">Management</span>
          </div>

          <div className="dashboard-topbar-actions">
            <div className="admin-role-pill">
              <ShieldCheck size={14} />
              <span>Administrator</span>
            </div>
            <Link to="/dashboard" className="btn btn-secondary btn-sm">
              View as Student
            </Link>
          </div>
        </header>

        <main className="dashboard-main-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

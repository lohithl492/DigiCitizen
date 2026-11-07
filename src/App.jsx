import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute, AdminRoute } from './components/common/ProtectedRoute';

// Layouts
import MainLayout from './layouts/MainLayout';
import DashboardLayout from './layouts/DashboardLayout';
import AdminLayout from './layouts/AdminLayout';

// Public Pages
import HomePage from './pages/public/HomePage';
import AboutPage from './pages/public/AboutPage';
import LearningPage from './pages/public/LearningPage';
import ModuleDetailsPage from './pages/public/ModuleDetailsPage';
import LoginPage from './pages/public/LoginPage';
import RegisterPage from './pages/public/RegisterPage';
import ForgotPasswordPage from './pages/public/ForgotPasswordPage';
import ResetPasswordPage from './pages/public/ResetPasswordPage';

// Student Pages
import DashboardPage from './pages/student/DashboardPage';
import QuizPage from './pages/student/QuizPage';
import SimulatorPage from './pages/student/SimulatorPage';
import ScenariosPage from './pages/student/ScenariosPage';
import AchievementsPage from './pages/student/AchievementsPage';
import LeaderboardPage from './pages/student/LeaderboardPage';
import ProfilePage from './pages/student/ProfilePage';
import CertificatePage from './pages/student/CertificatePage';

// Admin Pages
import AdminOverviewPage from './pages/admin/AdminOverviewPage';
import AdminModulesPage from './pages/admin/AdminModulesPage';
import AdminQuizzesPage from './pages/admin/AdminQuizzesPage';
import AdminScenariosPage from './pages/admin/AdminScenariosPage';
import AdminStudentsPage from './pages/admin/AdminStudentsPage';
import AdminAnalyticsPage from './pages/admin/AdminAnalyticsPage';

// 404 Fallback
function NotFoundPage() {
  return (
    <div className="container section-py" style={{ textAlign: 'center', minHeight: '60vh' }}>
      <h1 style={{ fontSize: '3rem', color: '#0f172a', marginBottom: '1rem' }}>404</h1>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Page Not Found</h2>
      <p style={{ color: '#64748b', marginBottom: '2rem' }}>
        The requested digital citizenship resource does not exist or has moved.
      </p>
      <a href="/" className="btn btn-primary">Return to Homepage</a>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Public Website Routes */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/learn" element={<LearningPage />} />
          <Route path="/learn/:id" element={<ModuleDetailsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/leaderboard" element={<LeaderboardPage />} />
          <Route path="/simulator" element={<SimulatorPage />} />
          <Route path="/scenarios" element={<ScenariosPage />} />
        </Route>

        {/* Student Portal Protected Routes */}
        <Route
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/quiz/:id" element={<QuizPage />} />
          <Route path="/achievements" element={<AchievementsPage />} />
          <Route path="/certificate" element={<CertificatePage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>

        {/* Administrator Portal Protected Routes */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }
        >
          <Route index element={<AdminOverviewPage />} />
          <Route path="modules" element={<AdminModulesPage />} />
          <Route path="quizzes" element={<AdminQuizzesPage />} />
          <Route path="scenarios" element={<AdminScenariosPage />} />
          <Route path="students" element={<AdminStudentsPage />} />
          <Route path="analytics" element={<AdminAnalyticsPage />} />
        </Route>

        {/* Catch-all 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AuthProvider>
  );
}

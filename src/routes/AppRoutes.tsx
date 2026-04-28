import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import AdminRoute from './AdminRoute';

// Public Pages
import AdminLogin from '../pages/PublicPages/AdminLoginPage';
import Landing from '../pages/PublicPages/LandingPage';
import Registration from '../pages/PublicPages/RegistrationPage';
import ResetPassword from '../pages/PublicPages/ResetPasswordPage';
import UserLogin from '../pages/PublicPages/UserLoginPage';

// User Pages
import UserDashboard from '../pages/UserPages/UserDashboard';
import NewNote from '../pages/UserPages/NewNote';

// Admin Pages
import AdminDashboard from '../pages/AdminPages/AdminDashboard';
import NoteManagement from '../pages/AdminPages/NoteManagementPage';
import UserManagement from '../pages/AdminPages/UserManagementPage';

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/user-login" element={<UserLogin />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        {/* <Route path="/admin-dashboard" element={<AdminDashboard />} /> */}
        {/* <Route path="/admin/notes" element={<NoteManagement />} /> */}
        {/* <Route path="/admin/users" element={<UserManagement />} /> */}
        {/* <Route path="/user-dashboard" element={<UserDashboard />} /> */}
        {/* <Route path="/user/new-note" element={<NewNote />} /> */}

        {/* Authenticated User Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/user-dashboard" element={<UserDashboard />} />
          <Route path="/user/new-note" element={<NewNote />} />
          <Route path="/user/edit-note/:noteId" element={<NewNote />} />
        </Route>

        {/* Protected Admin Routes */}
        <Route element={<AdminRoute />}>
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/admin/notes" element={<NoteManagement />} />
          <Route path="/admin/users" element={<UserManagement />} />
        </Route>

        {/* Fallback Route */}
        <Route path="*" element={<div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
            <p className="text-gray-600">Page not found</p>
          </div>
        </div>} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
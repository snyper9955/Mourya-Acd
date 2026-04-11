import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ApiProvider } from './context/ApiContext';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';
import AdminLayout from './components/AdminLayout';
import StudentLayout from './components/StudentLayout';
import Dashboard from './pages/Dashboard';
import Students from './pages/Students';
import Courses from './pages/Courses';
import Inquiries from './pages/Inquiries';
import Payments from './pages/Payments';
import Notices from './pages/Notices';
import Toppers from './pages/Toppers';
import Home from './pages/Home';
import PublicCourses from './pages/PublicCourses';
import PublicNotices from './pages/PublicNotices';
import PublicToppers from './pages/PublicToppers';
import CourseDetail from './pages/CourseDetail';
import Checkout from './pages/Checkout';
import Profile from './pages/Profile';
import StudentDashboard from './pages/student/StudentDashboard';
import CourseContent from './pages/student/CourseContent';
import ProtectedRoute from './components/ProtectedRoute';
import PublicOnlyRoute from './components/PublicOnlyRoute';
import './App.css';

import { SocketProvider } from './context/SocketContext';
import { Toaster } from 'react-hot-toast';
import Header from './components/Header';

const AppContent = () => {
  const { loading, user } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-900"></div>
      </div>
    );
  }


  return (
    <ApiProvider>
      <SocketProvider>
        <Toaster />
        {!['/admin', '/student', '/login', '/register', '/dashboard'].some(path => location.pathname.startsWith(path)) && <Header />}
        <Routes>
          <Route path="/login" element={<PublicOnlyRoute><Login /></PublicOnlyRoute>} />
          <Route path="/register" element={<PublicOnlyRoute><Register /></PublicOnlyRoute>} />
          <Route path="/forgot-password" element={<PublicOnlyRoute><ForgotPassword /></PublicOnlyRoute>} />
          <Route path="/reset-password/:token" element={<PublicOnlyRoute><ResetPassword /></PublicOnlyRoute>} />
          
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<PublicCourses />} />
          <Route path="/notices" element={<PublicNotices />} />
          <Route path="/toppers" element={<PublicToppers />} />
          <Route path="/course/:id" element={<CourseDetail />} />
          <Route path="/checkout/:courseId" element={<Checkout />} />
          
          {/* Authenticated Admin Routes */}
          <Route path="/admin" element={<ProtectedRoute><AdminLayout><Dashboard /></AdminLayout></ProtectedRoute>} />
          <Route path="/admin/students" element={<ProtectedRoute><AdminLayout><Students /></AdminLayout></ProtectedRoute>} />
          <Route path="/admin/courses" element={<ProtectedRoute><AdminLayout><Courses /></AdminLayout></ProtectedRoute>} />
          <Route path="/admin/inquiries" element={<ProtectedRoute><AdminLayout><Inquiries /></AdminLayout></ProtectedRoute>} />
          <Route path="/admin/payments" element={<ProtectedRoute><AdminLayout><Payments /></AdminLayout></ProtectedRoute>} />
          <Route path="/admin/notices" element={<ProtectedRoute><AdminLayout><Notices /></AdminLayout></ProtectedRoute>} />
          <Route path="/admin/toppers" element={<ProtectedRoute><AdminLayout><Toppers /></AdminLayout></ProtectedRoute>} />
          <Route path="/admin/profile" element={<ProtectedRoute><AdminLayout><Profile /></AdminLayout></ProtectedRoute>} />

          {/* Authenticated Student Routes */}
          <Route path="/student/dashboard" element={<ProtectedRoute><StudentLayout><StudentDashboard /></StudentLayout></ProtectedRoute>} />
          <Route path="/student/profile" element={<ProtectedRoute><StudentLayout><Profile /></StudentLayout></ProtectedRoute>} />
          <Route path="/student/course/:courseId/learn" element={<ProtectedRoute><CourseContent /></ProtectedRoute>} />
          {/* These pages could be implemented as student-specific views later */}
          <Route path="/student/courses" element={<ProtectedRoute><StudentLayout><Courses /></StudentLayout></ProtectedRoute>} />
          <Route path="/student/notices" element={<ProtectedRoute><StudentLayout><Notices /></StudentLayout></ProtectedRoute>} />
          <Route path="/student/payments" element={<ProtectedRoute><StudentLayout><Payments /></StudentLayout></ProtectedRoute>} />

          {/* Role-based Redirect for /landing or authenticated users */}
          <Route path="/dashboard" element={
            <ProtectedRoute>
              {user?.role === 'admin' ? <Navigate to="/admin" /> : <Navigate to="/student/dashboard" />}
            </ProtectedRoute>
          } />

          {/* Catch-all redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </SocketProvider>
    </ApiProvider>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;

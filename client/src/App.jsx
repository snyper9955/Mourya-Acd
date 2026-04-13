import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ApiProvider } from './context/ApiContext';

// Layouts and components that should be loaded immediately
import AdminLayout from './components/AdminLayout';
import StudentLayout from './components/StudentLayout';
import ProtectedRoute from './components/ProtectedRoute';
import PublicOnlyRoute from './components/PublicOnlyRoute';
import Header from './components/Header';
import Footer from './components/Footer';
import { SocketProvider } from './context/SocketContext';
import { Toaster } from 'react-hot-toast';
import './App.css';

// Lazy load pages for code splitting
const Login = lazy(() => import('./pages/auth/Login'));
const Register = lazy(() => import('./pages/auth/Register'));
const ForgotPassword = lazy(() => import('./pages/auth/ForgotPassword'));
const ResetPassword = lazy(() => import('./pages/auth/ResetPassword'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Students = lazy(() => import('./pages/Students'));
const Courses = lazy(() => import('./pages/Courses'));
const Inquiries = lazy(() => import('./pages/Inquiries'));
const Payments = lazy(() => import('./pages/Payments'));
const Notices = lazy(() => import('./pages/Notices'));
const Toppers = lazy(() => import('./pages/Toppers'));
const Home = lazy(() => import('./pages/Home'));
const PublicCourses = lazy(() => import('./pages/PublicCourses'));
const PublicNotices = lazy(() => import('./pages/PublicNotices'));
const PublicToppers = lazy(() => import('./pages/PublicToppers'));
const CourseDetail = lazy(() => import('./pages/CourseDetail'));
const Checkout = lazy(() => import('./pages/Checkout'));
const Profile = lazy(() => import('./pages/Profile'));
const Gallery = lazy(() => import('./pages/Gallery'));
const StudentDashboard = lazy(() => import('./pages/student/StudentDashboard'));
const CourseContent = lazy(() => import('./pages/student/CourseContent'));

const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-[400px] bg-transparent">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-900"></div>
  </div>
);

const FullPageLoading = () => (
  <div className="flex items-center justify-center min-h-screen bg-slate-50">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-900"></div>
  </div>
);

const AppContent = () => {
  const { loading, user } = useAuth();
  const location = useLocation();

  React.useEffect(() => {
    // Scroll to top instantly on every route map redirect
    window.scrollTo(0, 0);
  }, [location.pathname]);

  if (loading) {
    return <FullPageLoading />;
  }

  return (
    <ApiProvider>
      <SocketProvider>
        <Toaster />
        {!['/admin', '/student', '/login', '/register', '/forgot-password', '/reset-password', '/dashboard'].some(path => location.pathname.startsWith(path)) && <Header />}
        <Suspense fallback={<LoadingSpinner />}>
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
          <Route path="/gallery" element={<Gallery />} />
          
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
        </Suspense>
        {!['/admin', '/student', '/login', '/register', '/forgot-password', '/reset-password', '/dashboard'].some(path => location.pathname.startsWith(path)) && <Footer />}
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

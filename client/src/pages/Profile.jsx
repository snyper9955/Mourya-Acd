import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useApi } from '../context/ApiContext';
import { 
  User, Mail, Lock, CheckCircle2, Save, UserCircle, Shield, 
  Calendar, AlertCircle, Edit2, X, Eye, EyeOff, Award, 
  BookOpen, Clock, TrendingUp, CreditCard, LogOut, 
  Settings, Bell, Key, Smartphone
} from 'lucide-react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const { user, setUser, logout } = useAuth();
    const api = useApi();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        phone: user?.phone || '',
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (user) {
            setFormData(prev => ({ 
                ...prev, 
                name: user.name, 
                email: user.email,
                phone: user?.phone || ''
            }));
        }
    }, [user]);

    const validateForm = () => {
        const newErrors = {};
        
        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }
        
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }
        
        if (formData.newPassword) {
            if (formData.newPassword.length < 6) {
                newErrors.newPassword = 'Password must be at least 6 characters';
            }
            if (formData.newPassword !== formData.confirmPassword) {
                newErrors.confirmPassword = 'Passwords do not match';
            }
            if (!formData.currentPassword) {
                newErrors.currentPassword = 'Current password is required to set new password';
            }
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            toast.error('Please fix the errors before submitting');
            return;
        }

        setLoading(true);
        try {
            const updateData = {
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
            };
            
            if (formData.newPassword) {
                updateData.currentPassword = formData.currentPassword;
                updateData.newPassword = formData.newPassword;
            }
            
            const { data } = await api.put('/api/auth/profile', updateData);
            
            // Update localStorage and auth context
            const updatedUser = { 
                ...user, 
                name: data.name, 
                email: data.email,
                phone: data.phone
            };
            localStorage.setItem('userInfo', JSON.stringify(updatedUser));
            if (setUser) setUser(updatedUser);
            
            toast.success('Profile updated successfully');
            
            // Reset password fields
            setFormData(prev => ({ 
                ...prev, 
                currentPassword: '',
                newPassword: '',
                confirmPassword: ''
            }));
            
            setIsEditModalOpen(false);
        } catch (error) {
            toast.error(error.response?.data?.message || 'Update failed');
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        if (logout) {
            logout();
            navigate('/login');
        }
    };

    // Get member since date
    const memberSince = user?.createdAt 
        ? new Date(user.createdAt).getFullYear()
        : new Date().getFullYear();

    // Stats data
    const stats = [
        { icon: BookOpen, label: 'Courses Enrolled', value: user?.enrolledCourses?.length || 0, color: 'emerald' },
        { icon: Clock, label: 'Hours Learned', value: '24', color: 'blue' },
        { icon: Award, label: 'Certificates', value: '3', color: 'purple' },
        { icon: TrendingUp, label: 'Completion Rate', value: '85%', color: 'orange' }
    ];

    const menuItems = [
        { icon: User, label: 'Personal Info', action: () => setIsEditModalOpen(true), color: 'emerald' },
        { icon: Lock, label: 'Security', action: () => setIsEditModalOpen(true), color: 'blue' },
        { icon: Bell, label: 'Notifications', action: () => toast.info('Coming soon'), color: 'purple' },
        { icon: CreditCard, label: 'Payments', action: () => toast.info('Coming soon'), color: 'orange' },
        { icon: LogOut, label: 'Logout', action: handleLogout, color: 'red' }
    ];

    return (
        <div className="min-h-screen bg-linear-to-br from-gray-50 via-white to-gray-50">
            {/* Edit Profile Modal */}
            {isEditModalOpen && (
                <div className="fixed inset-0 z-50 overflow-y-auto">
                    {/* Backdrop */}
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity" onClick={() => setIsEditModalOpen(false)}></div>
                    
                    {/* Modal */}
                    <div className="flex min-h-full items-center justify-center p-4">
                        <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full transform transition-all animate-in slide-in-from-bottom duration-300">
                            {/* Modal Header */}
                            <div className="flex items-center justify-between p-6 border-b border-gray-100">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
                                        <Edit2 className="w-5 h-5 text-emerald-600" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900">Edit Profile</h3>
                                        <p className="text-xs text-gray-500 mt-0.5">Update your personal information</p>
                                    </div>
                                </div>
                                <button 
                                    onClick={() => setIsEditModalOpen(false)}
                                    className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center transition-colors"
                                >
                                    <X className="w-4 h-4 text-gray-500" />
                                </button>
                            </div>

                            {/* Modal Body */}
                            <form onSubmit={handleSubmit} className="p-6 space-y-5">
                                {/* Name Field */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Full Name
                                    </label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                        <input
                                            type="text"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className={`w-full pl-9 pr-4 py-2.5 bg-gray-50 border rounded-xl text-gray-800 focus:bg-white focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 transition-all outline-none ${
                                                errors.name ? 'border-red-300 focus:border-red-400' : 'border-gray-200'
                                            }`}
                                            placeholder="Enter your full name"
                                        />
                                    </div>
                                    {errors.name && (
                                        <p className="text-xs text-red-500 mt-1">{errors.name}</p>
                                    )}
                                </div>

                                {/* Email Field */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Email Address
                                    </label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                        <input
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className={`w-full pl-9 pr-4 py-2.5 bg-gray-50 border rounded-xl text-gray-800 focus:bg-white focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 transition-all outline-none ${
                                                errors.email ? 'border-red-300 focus:border-red-400' : 'border-gray-200'
                                            }`}
                                            placeholder="Enter your email"
                                        />
                                    </div>
                                    {errors.email && (
                                        <p className="text-xs text-red-500 mt-1">{errors.email}</p>
                                    )}
                                </div>

                                {/* Phone Field */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Phone Number
                                    </label>
                                    <div className="relative">
                                        <Smartphone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                        <input
                                            type="tel"
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 focus:bg-white focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 transition-all outline-none"
                                            placeholder="Enter your phone number"
                                        />
                                    </div>
                                </div>

                                {/* Password Change Section */}
                                <div className="pt-2">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setFormData(prev => ({ ...prev, showPasswordFields: !prev.showPasswordFields }));
                                        }}
                                        className="text-sm text-emerald-600 hover:text-emerald-700 font-medium flex items-center gap-2"
                                    >
                                        <Key className="w-4 h-4" />
                                        Change Password
                                    </button>
                                </div>

                                {formData.showPasswordFields && (
                                    <div className="space-y-4 pt-2 border-t border-gray-100">
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                Current Password
                                            </label>
                                            <div className="relative">
                                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                                <input
                                                    type={showPassword ? "text" : "password"}
                                                    value={formData.currentPassword}
                                                    onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
                                                    className="w-full pl-9 pr-10 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 focus:bg-white focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 transition-all outline-none"
                                                    placeholder="Enter current password"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    className="absolute right-3 top-1/2 -translate-y-1/2"
                                                >
                                                    {showPassword ? <EyeOff className="w-4 h-4 text-gray-400" /> : <Eye className="w-4 h-4 text-gray-400" />}
                                                </button>
                                            </div>
                                            {errors.currentPassword && (
                                                <p className="text-xs text-red-500 mt-1">{errors.currentPassword}</p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                New Password
                                            </label>
                                            <div className="relative">
                                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                                <input
                                                    type={showConfirmPassword ? "text" : "password"}
                                                    value={formData.newPassword}
                                                    onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                                                    className="w-full pl-9 pr-10 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 focus:bg-white focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 transition-all outline-none"
                                                    placeholder="Enter new password (min 6 characters)"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                    className="absolute right-3 top-1/2 -translate-y-1/2"
                                                >
                                                    {showConfirmPassword ? <EyeOff className="w-4 h-4 text-gray-400" /> : <Eye className="w-4 h-4 text-gray-400" />}
                                                </button>
                                            </div>
                                            {errors.newPassword && (
                                                <p className="text-xs text-red-500 mt-1">{errors.newPassword}</p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                Confirm Password
                                            </label>
                                            <div className="relative">
                                                <CheckCircle2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                                <input
                                                    type={showConfirmPassword ? "text" : "password"}
                                                    value={formData.confirmPassword}
                                                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                                    className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 focus:bg-white focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 transition-all outline-none"
                                                    placeholder="Confirm new password"
                                                />
                                            </div>
                                            {errors.confirmPassword && (
                                                <p className="text-xs text-red-500 mt-1">{errors.confirmPassword}</p>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {/* Modal Actions */}
                                <div className="flex gap-3 pt-4">
                                    <button
                                        type="button"
                                        onClick={() => setIsEditModalOpen(false)}
                                        className="flex-1 px-4 py-2.5 bg-gray-100 text-gray-700 rounded-xl font-semibold text-sm hover:bg-gray-200 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="flex-1 px-4 py-2.5 bg-emerald-600 text-white rounded-xl font-semibold text-sm flex items-center justify-center gap-2 hover:bg-emerald-700 transition-all disabled:opacity-50"
                                    >
                                        {loading ? (
                                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        ) : (
                                            <>
                                                <Save className="w-4 h-4" />
                                                Save Changes
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
                {/* Header Section */}
                <div className="mb-8">
                    <div className="flex items-center justify-between flex-wrap gap-4">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-linear-to-br from-emerald-500 to-emerald-700 rounded-2xl flex items-center justify-center">
                                <UserCircle className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">My Profile</h1>
                                <p className="text-gray-500 text-sm mt-0.5">Manage your account settings and preferences</p>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsEditModalOpen(true)}
                            className="px-5 py-2.5 bg-emerald-600 text-white rounded-xl font-semibold text-sm flex items-center gap-2 hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200"
                        >
                            <Edit2 className="w-4 h-4" />
                            Edit Profile
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Column - Profile Info */}
                    <div className="lg:col-span-1 space-y-6">
                        {/* Profile Card */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="bg-linear-to-r from-emerald-600 to-emerald-700 px-6 py-8 text-center">
                                <div className="w-24 h-24 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                                    <span className="text-4xl font-bold text-emerald-600">
                                        {user?.name?.charAt(0).toUpperCase()}
                                    </span>
                                </div>
                                <h2 className="text-xl font-bold text-white">{user?.name}</h2>
                                <p className="text-emerald-100 text-sm mt-1 capitalize">{user?.role || 'Student'}</p>
                            </div>
                            <div className="p-6 space-y-4">
                                <div className="flex items-center gap-3 text-sm">
                                    <Mail className="w-4 h-4 text-emerald-500" />
                                    <span className="text-gray-600">{user?.email}</span>
                                </div>
                                {user?.phone && (
                                    <div className="flex items-center gap-3 text-sm">
                                        <Smartphone className="w-4 h-4 text-emerald-500" />
                                        <span className="text-gray-600">{user.phone}</span>
                                    </div>
                                )}
                                <div className="flex items-center gap-3 text-sm">
                                    <Calendar className="w-4 h-4 text-emerald-500" />
                                    <span className="text-gray-600">Member since {memberSince}</span>
                                </div>
                                <div className="pt-4 border-t border-gray-100">
                                    <div className="flex items-center gap-2">
                                        <Shield className="w-4 h-4 text-emerald-500" />
                                        <span className="text-xs text-gray-500">Account Status:</span>
                                        <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">Verified</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                            <h3 className="font-semibold text-gray-800 mb-4">Quick Actions</h3>
                            <div className="space-y-2">
                                {menuItems.map((item, idx) => (
                                    <button
                                        key={idx}
                                        onClick={item.action}
                                        className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all text-left ${
                                            item.label === 'Logout' 
                                                ? 'hover:bg-red-50 text-gray-700 hover:text-red-600' 
                                                : 'hover:bg-gray-50 text-gray-700'
                                        }`}
                                    >
                                        <item.icon className={`w-4 h-4 ${
                                            item.label === 'Logout' ? 'text-red-500' : `text-${item.color}-500`
                                        }`} />
                                        <span className="text-sm font-medium">{item.label}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Stats and Activity */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Stats Grid */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            {stats.map((stat, idx) => (
                                <div key={idx} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                                    <div className={`w-10 h-10 bg-${stat.color}-100 rounded-xl flex items-center justify-center mb-3`}>
                                        <stat.icon className={`w-5 h-5 text-${stat.color}-600`} />
                                    </div>
                                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                                    <p className="text-xs text-gray-500 mt-1">{stat.label}</p>
                                </div>
                            ))}
                        </div>

                        {/* Recent Activity */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="px-6 py-5 border-b border-gray-100">
                                <h3 className="font-semibold text-gray-800">Recent Activity</h3>
                            </div>
                            <div className="divide-y divide-gray-100">
                                {[
                                    { action: 'Completed Module 3', course: 'Web Development', time: '2 hours ago', icon: CheckCircle2 },
                                    { action: 'Submitted Assignment', course: 'React Masterclass', time: 'Yesterday', icon: Award },
                                    { action: 'Started New Course', course: 'Data Science', time: '2 days ago', icon: BookOpen }
                                ].map((activity, idx) => (
                                    <div key={idx} className="px-6 py-4 flex items-start gap-3 hover:bg-gray-50 transition-colors">
                                        <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center shrink-0">
                                            <activity.icon className="w-4 h-4 text-emerald-600" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm font-medium text-gray-800">{activity.action}</p>
                                            <p className="text-xs text-gray-500 mt-0.5">{activity.course}</p>
                                        </div>
                                        <p className="text-xs text-gray-400">{activity.time}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Security Tips */}
                        <div className="bg-amber-50 rounded-2xl p-5 border border-amber-100 flex items-start gap-3">
                            <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" />
                            <div>
                                <p className="text-sm font-semibold text-amber-900">Security Tip</p>
                                <p className="text-xs text-amber-700 mt-0.5">
                                    For better security, use a strong password that you don't use elsewhere. 
                                    Enable two-factor authentication for added protection.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
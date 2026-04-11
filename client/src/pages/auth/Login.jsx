import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, googleLoginByToken } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const token = params.get('token');
        if (token) {
            handleGoogleToken(token);
        }
    }, [location]);

    const handleGoogleToken = async (token) => {
        try {
            await googleLoginByToken(token);
            navigate('/dashboard');
        } catch (error) {
            alert('Google login failed. Please try again.');
            navigate('/login');
        }
    };

    const handleGoogleLogin = () => {
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        window.location.href = `${apiUrl}/api/auth/google`;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
            navigate('/dashboard');
        } catch (error) {
            alert(error.response?.data?.message || 'Login failed');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-white p-4 pt-20 relative overflow-hidden font-sans selection:bg-emerald-100 selection:text-emerald-900">
            {/* Soft background accents */}
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.05),transparent_50%)]"></div>
            <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_bottom_left,rgba(5,150,105,0.05),transparent_50%)]"></div>

            <div className="w-full max-w-md bg-white p-10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-slate-100 relative z-10 transition-all hover:shadow-[0_30px_60px_rgba(0,0,0,0.06)]">
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl mb-6 shadow-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-3.682A14.238 14.238 0 017.5 13H9m-2.5 0H5a2 2 0 00-2 2v2m2-2V6a2 2 0 012-2h10a2 2 0 012 2v11m-10 0h.01" />
                        </svg>
                    </div>
                    <h1 className="text-3xl font-bold font-heading text-slate-800 mb-3 tracking-tight">Access Your Portal</h1>
                    <p className="text-slate-500 font-medium">Welcome back to your coaching dashboard</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="group">
                        <label className="block text-sm font-semibold font-heading text-slate-700 mb-2 ml-1 group-focus-within:text-emerald-600 transition-colors">Email Address</label>
                        <input 
                            type="email" 
                            placeholder="name@example.com" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-slate-800 placeholder-slate-400 outline-none focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/5 transition-all"
                            required 
                        />
                    </div>
                    <div className="group">
                        <div className="flex justify-between items-center mb-2 ml-1">
                            <label className="text-sm font-semibold font-heading text-slate-700 group-focus-within:text-emerald-600 transition-colors">Password</label>
                            <Link to="/forgot-password" name="forgot-password" className="text-xs font-semibold text-emerald-600 hover:text-emerald-700">Forgot Password?</Link>
                        </div>
                        <input 
                            type="password" 
                            placeholder="Min. 8 characters" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-slate-800 placeholder-slate-400 outline-none focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/5 transition-all"
                            required 
                        />
                    </div>

                    <button 
                        type="submit" 
                        className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 rounded-2xl shadow-lg transform active:scale-[0.98] transition-all flex items-center justify-center gap-2 group"
                    >
                        <span className="font-heading">Login to Account</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                    </button>

                    <div className="relative my-8">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-slate-100"></div>
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-white px-4 text-slate-400 font-semibold tracking-wider">Or continue with</span>
                        </div>
                    </div>

                    <button 
                        type="button"
                        onClick={handleGoogleLogin}
                        className="w-full bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold py-4 rounded-2xl shadow-sm transform active:scale-[0.98] transition-all flex items-center justify-center gap-3 group"
                    >
                        <FcGoogle className="w-6 h-6" />
                        <span className="font-heading">Sign in with Google</span>
                    </button>
                </form>

                <div className="mt-10 pt-8 border-t border-slate-100 text-center">
                    <p className="text-slate-500 font-medium">
                        New to Coaching? 
                        <Link to="/register" className="text-emerald-600 hover:text-emerald-700 font-bold ml-2">Create an Account</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;

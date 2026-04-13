import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  BookOpen, 
  CreditCard, 
  Bell, 
  LogOut,
  ChevronRight,
  User,
  Globe,
  Menu,
  X,
  Megaphone,
  GraduationCap,
  ArrowLeft
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const StudentLayout = ({ children }) => {
    const { logout, user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    const menuItems = [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/student/dashboard' },

        { icon: User, label: 'My Profile', path: '/student/profile' },
        { icon: Globe, label: 'View Public Site', path: '/' },
    ];

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    return (
        <div className="  flex min-h-screen bg-slate-50/50 font-sans selection:bg-blue-100 selection:text-blue-900 ">
            {/* Sidebar */}
            <aside className="w-72 bg-white border-r border-slate-200/60 hidden lg:flex flex-col fixed top-0 bottom-0 left-0 z-40 shadow-[4px_0_24px_rgba(0,0,0,0.02)] ">
                <div className="p-8 flex items-center gap-3.5 mb-2">
                    <div className="w-10 h-10 bg-linear-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                        <Link to="/">
                        <BookOpen className="text-white w-5 h-5" />
                        </Link>
                    </div>
                    <Link to="/">
                    
                        <span className="text-xl font-extrabold font-heading text-slate-900 tracking-tight">Student Hub</span>
                    </Link>
                </div>

                <nav className="flex-1 px-6 space-y-1.5 overflow-y-auto custom-scrollbar">
                    {menuItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`flex items-center justify-between px-5 py-3.5 rounded-2xl transition-all group ${
                                location.pathname === item.path
                                    ? 'bg-slate-900 text-white shadow-xl shadow-slate-200'
                                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                            }`}
                        >
                            <div className="flex items-center gap-3.5">
                                <item.icon className={`w-5 h-5 transition-colors ${location.pathname === item.path ? 'text-white' : 'text-slate-400 group-hover:text-slate-600'}`} />
                                <span className="font-bold text-sm tracking-tight">{item.label}</span>
                            </div>
                            {location.pathname === item.path && <div className="w-1.5 h-1.5 bg-blue-400 rounded-full shadow-[0_0_8px_rgba(96,165,250,0.6)]" />}
                        </Link>
                    ))}
                </nav>

                <div className="mt-auto p-8 border-t border-slate-100">
                    <div className="flex items-center gap-4 mb-6 px-2">
                        <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-600 font-bold border-2 border-white shadow-sm">
                            {user?.name?.charAt(0) || 'S'}
                        </div>
                        <div className="flex-1 overflow-hidden">
                            <p className="font-bold text-sm text-slate-900 truncate">{user?.name || 'Student'}</p>
                            <p className="text-xs text-slate-500 truncate">Enrolled Student</p>
                        </div>
                    </div>
                    <button 
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3.5 text-slate-500 hover:bg-slate-50 hover:text-slate-900 rounded-2xl transition-all group"
                    >
                        <LogOut className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                        <span className="font-bold text-sm">Sign Out</span>
                    </button>
                </div>
            </aside>

            {/* Mobile Header */}
            <header className="fixed top-0 left-0 right-0 h-20 bg-white/80 backdrop-blur-xl border-b border-slate-200/60 flex items-center justify-between px-6 z-50 lg:hidden">
                <div className="flex items-center gap-3">
                    <Link to="/" className="p-2 hover:bg-slate-100 rounded-xl transition-colors shrink-0 -ml-2">
                        <ArrowLeft className="w-5 h-5 text-slate-600" />
                    </Link>
                    <div className="w-9 h-9 bg-linear-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/10">
                        <Link to="/">
                        <BookOpen className="text-white w-4.5 h-4.5" />
                        </Link>
                    </div>
                    <Link to="/">
                        <span className="text-lg font-extrabold text-slate-900 tracking-tight">Student Hub</span>
                    </Link>
                </div>
                <button 
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="p-2.5 text-slate-500 hover:bg-slate-100 rounded-xl transition-all"
                >
                    {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </header>

            {/* Mobile Menu Drawer */}
            {isMenuOpen && (
                <>
                    <div 
                        className="lg:hidden fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40 animate-in fade-in duration-300"
                        onClick={() => setIsMenuOpen(false)}
                    />
                    <div className="lg:hidden fixed top-0 right-0 bottom-0 w-[85%] sm:w-[60%] bg-white z-50 p-6 shadow-2xl animate-in slide-in-from-right duration-300 flex flex-col border-l border-slate-100">
                        <div className="flex items-center justify-between mb-10">
                            <span className="text-xl font-black text-slate-900">Student Hub</span>
                            <button 
                                onClick={() => setIsMenuOpen(false)}
                                className="p-2 hover:bg-slate-50 rounded-xl transition-all"
                            >
                                <X className="w-6 h-6 text-slate-400" />
                            </button>
                        </div>
                        
                        <nav className="flex-1 space-y-2">
                            {menuItems.map((item) => (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    onClick={() => setIsMenuOpen(false)}
                                    className={`flex items-center gap-4 px-5 py-4 rounded-2xl transition-all ${
                                        location.pathname === item.path
                                            ? 'bg-slate-900 text-white shadow-xl'
                                            : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                                    }`}
                                >
                                    <item.icon className="w-5 h-5" />
                                    <span className="font-bold text-sm tracking-tight">{item.label}</span>
                                </Link>
                            ))}
                        </nav>
                        
                        <div className="mt-auto pt-6 border-t border-slate-100">
                            <div className="flex items-center gap-4 mb-6 px-2">
                                <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-600 font-bold border-2 border-white shadow-sm text-sm">
                                    {user?.name?.charAt(0) || 'S'}
                                </div>
                                <div className="flex-1 overflow-hidden">
                                    <p className="font-bold text-sm text-slate-900 truncate">{user?.name || 'Student'}</p>
                                </div>
                            </div>
                            <button 
                                onClick={() => {
                                    setIsMenuOpen(false);
                                    handleLogout();
                                }}
                                className="w-full flex items-center gap-3 px-5 py-4 text-red-600 bg-red-50 hover:bg-red-100 rounded-2xl transition-all font-bold text-sm"
                            >
                                <LogOut className="w-5 h-5" />
                                <span>Sign Out</span>
                            </button>
                        </div>
                    </div>
                </>
            )}

            {/* Main Content */}
            <main className="flex-1 lg:ml-72 min-h-screen">
                {/* Desktop Top Bar */}
                <div className="hidden lg:flex items-center justify-between h-20 px-10 bg-white/50 backdrop-blur-md border-b border-slate-200/60 sticky top-0 z-30">
                    <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-widest">
                        <Link to="/" className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors mr-1 shrink-0" title="Back to Home">
                            <ArrowLeft className="w-4 h-4 text-slate-600" />
                        </Link>
                        <span>Student Hub</span>
                        <ChevronRight className="w-3 h-3" />
                        <span className="text-slate-900">{menuItems.find(i => location.pathname === i.path)?.label || 'Dashboard'}</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <nav className="hidden md:flex items-center gap-2 mr-4 bg-slate-100/50 p-1 rounded-lg">
                            <Link to="/student/dashboard" className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all ${location.pathname === '/student/dashboard' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>Dashboard</Link>
                            <Link to="/courses" className="px-3 py-1.5 text-xs font-bold text-slate-500 hover:text-slate-700 transition-all">Courses</Link>
                            <Link to="/notices" className="px-3 py-1.5 text-xs font-bold text-slate-500 hover:text-slate-700 transition-all">Notices</Link>
                        </nav>
                        <button className="p-2.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-all">
                            <Bell className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                <div className="px-4 sm:px-6 md:px-12 py-8 pt-28 lg:pt-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    {children}
                </div>
            </main>
        </div>
    );
};

export default StudentLayout;

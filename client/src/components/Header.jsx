import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  BookOpen,
  Menu,
  X,
  LogIn,
  ArrowRight,
  User,
  LayoutDashboard,
  GraduationCap,
  Megaphone,
  Trophy,
  Home,
  ChevronRight,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
    setActiveDropdown(null);
  }, [location.pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const navLinks = [
    { name: "Home", path: "/", icon: Home },
    ...(user ? [{ 
      name: "Dashboard", 
      path: user.role === 'admin' ? "/admin" : "/dashboard", 
      icon: LayoutDashboard 
    }] : []),
    { name: "Courses", path: "/courses", icon: GraduationCap },
    { name: "Toppers", path: "/toppers", icon: Trophy },
    { name: "Notices", path: "/notices", icon: Megaphone },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500  ${
          scrolled
            ? "bg-white/98 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.08)] border-b border-slate-200/50"
            : "bg-white/90 backdrop-blur-md border-b border-slate-100"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link
              to="/"
              className="group relative flex items-center gap-2.5 lg:gap-3"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-linear-to-r from-blue-600 to-indigo-600 rounded-xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-500" />
                <div className="relative w-9 h-9 lg:w-11 lg:h-11 bg-linear-to-br from-blue-600 via-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-all duration-500 group-hover:shadow-xl group-hover:shadow-blue-500/30">
                  <BookOpen className="text-white w-5 h-5 lg:w-6 lg:h-6" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-lg lg:text-xl font-bold bg-linear-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent tracking-tight">
                  EduManage
                </span>
                <span className="text-[10px] lg:text-xs text-slate-400 tracking-wider hidden sm:block">
                  EDUCATION PORTAL
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1 lg:gap-2 bg-slate-50/50 rounded-full p-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`relative px-4 lg:px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    isActive(link.path)
                      ? "text-white"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {isActive(link.path) && (
                    <span className="absolute inset-0 bg-linear-to-r from-slate-800 to-slate-700 rounded-full shadow-md animate-fade-in" />
                  )}
                  <span className="relative z-10 flex items-center gap-2">
                    <link.icon className="w-4 h-4" />
                    {link.name}
                  </span>
                </Link>
              ))}
            </nav>

            {/* Desktop Auth Actions */}
            <div className="hidden md:flex items-center gap-3">
              {user ? (
                <div className="flex items-center gap-2">
                  <div className="h-9 w-px bg-slate-200 mx-2" />
                  <button
                    onClick={() => navigate("/profile")}
                    className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-600 hover:bg-slate-200 transition-all active:scale-95"
                    title="Profile"
                  >
                    <User className="w-5 h-5" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Link
                    to="/login"
                    className="group flex items-center gap-2 text-slate-700 font-medium text-sm px-5 py-2.5 rounded-xl hover:bg-slate-100 transition-all duration-200 active:scale-95"
                  >
                    <LogIn className="w-4 h-4 text-emerald-500 transition-transform group-hover:scale-110" />
                    <span>Sign In</span>
                  </Link>
                  <Link
                    to="/signup"
                    className="group flex items-center gap-2 bg-linear-to-r from-emerald-600 to-teal-600 text-white px-5 py-2.5 rounded-xl font-medium text-sm hover:from-emerald-500 hover:to-teal-500 transition-all duration-300 shadow-lg shadow-emerald-200 hover:shadow-xl active:scale-95"
                  >
                    <User className="w-4 h-4" />
                    <span>Get Started</span>
                    <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden relative w-10 h-10 flex items-center justify-center rounded-xl text-slate-600 hover:bg-slate-100 transition-all duration-200 active:scale-95"
              aria-label="Toggle menu"
            >
              <div
                className={`absolute inset-0 rounded-xl bg-slate-100 transition-opacity duration-200 ${isMenuOpen ? "opacity-100" : "opacity-0"}`}
              />
              {isMenuOpen ? (
                <X className="w-5 h-5 relative z-10 animate-in zoom-in-50 duration-200" />
              ) : (
                <Menu className="w-5 h-5 relative z-10 animate-in fade-in duration-200" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 transition-all duration-500 z-500 ${
          isMenuOpen ? "visible" : "invisible"
        }`}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-linear-to-b from-slate-900/60 to-slate-900/40 backdrop-blur-md transition-opacity duration-500 ${
            isMenuOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setIsMenuOpen(false)}
        />

        {/* Drawer */}
        <div
          className={`absolute top-0 right-0 bottom-0 w-[320px] max-w-[85vw] bg-white shadow-2xl transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] flex flex-col ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Drawer Header */}
          <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-linear-to-r from-white to-slate-50/50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-linear-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                <BookOpen className="text-white w-5 h-5" />
              </div>
              <div>
                <span className="text-lg font-bold text-slate-800 block">
                  EduManage
                </span>
                <span className="text-[10px] text-slate-400 tracking-wider">
                  EDUCATION PORTAL
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="p-2 -mr-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all duration-200"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Navigation */}
          <nav className="flex-1 flex flex-col p-6 gap-3">
            {navLinks.map((link, index) => (
              <Link
                key={link.name}
                to={link.path}
                className={`group relative px-5 py-3.5 rounded-xl text-base font-medium transition-all duration-300 overflow-hidden ${
                  isActive(link.path)
                    ? "bg-linear-to-r from-slate-800 to-slate-700 text-white shadow-lg"
                    : "text-slate-700 hover:bg-slate-100"
                }`}
                style={{
                  transitionDelay: `${index * 50}ms`,
                }}
              >
                <span className="relative z-10 flex items-center gap-3">
                  <link.icon
                    className={`w-5 h-5 transition-all duration-300 ${isActive(link.path) ? "text-white" : "text-slate-400 group-hover:text-slate-600"}`}
                  />
                  {link.name}
                  {isActive(link.path) && (
                    <ChevronRight className="w-4 h-4 ml-auto" />
                  )}
                </span>
                {!isActive(link.path) && (
                  <span className="absolute inset-0 bg-linear-to-r from-slate-100 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                )}
              </Link>
            ))}
          </nav>

          {/* Drawer Divider */}
          <div className="px-6">
            <div className="h-px bg-linear-to-r from-transparent via-slate-200 to-transparent" />
          </div>

          {/* Drawer Footer */}
          <div className="p-6 space-y-3">
            {user ? (
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  navigate("/dashboard");
                }}
                className="w-full group flex items-center justify-between gap-2 bg-linear-to-r from-slate-800 to-slate-700 text-white font-medium py-4 px-5 rounded-xl shadow-lg active:scale-95 transition-all duration-300 hover:from-slate-700 hover:to-slate-600"
              >
                <span className="flex items-center gap-3">
                  <LayoutDashboard className="w-5 h-5" />
                  <span>Dashboard</span>
                </span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="w-full flex items-center justify-center gap-2 text-slate-700 font-medium py-4 rounded-xl border border-slate-200 hover:bg-slate-50 hover:border-slate-300 transition-all duration-200 active:scale-95"
                >
                  <LogIn className="w-5 h-5 text-emerald-500" />
                  <span>Sign In</span>
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setIsMenuOpen(false)}
                  className="w-full flex items-center justify-center gap-2 bg-linear-to-r from-emerald-600 to-teal-600 text-white font-medium py-4 rounded-xl shadow-lg shadow-emerald-200 active:scale-95 transition-all duration-300"
                >
                  <User className="w-5 h-5" />
                  <span>Get Started</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;

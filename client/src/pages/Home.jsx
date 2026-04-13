import React, { useState, useEffect } from "react";
import { useApi } from "../context/ApiContext";
import {
  BookOpen,
  Award,
  ArrowRight,
  Bell,
  Star,
  Users,
  Clock,
  GraduationCap,
  BarChart3,
  Sparkles,
  MessageCircle,
  Mail,
  MapPin,
  Phone,
  Play,
  ChevronRight,
  Calendar,
  TrendingUp,
  ChevronLeft,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  Pause,
  Play as PlayIcon,
  Camera,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Home = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const api = useApi();
  const [notices, setNotices] = useState([]);
  const [toppers, setToppers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Featured courses for carousel (use first 5 active courses)
  const featuredCourses = courses.filter(c => !c.isFinished).slice(0, 5);

  useEffect(() => {
    const fetchPublicData = async () => {
      try {
        const [noticesRes, toppersRes, coursesRes] = await Promise.all([
          api.get("/api/notices"),
          api.get("/api/toppers"),
          api.get("/api/courses"),
        ]);
        setNotices(noticesRes.data.data);
        setToppers(toppersRes.data.data);
        setCourses(coursesRes.data.data);
      } catch (err) {
        console.error("Error fetching public data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPublicData();
  }, [api]);

  // Auto-play carousel
  useEffect(() => {
    if (!isAutoPlaying || featuredCourses.length === 0) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredCourses.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, featuredCourses.length]);

  const nextSlide = () => {
    if (featuredCourses.length === 0) return;
    setCurrentSlide((prev) => (prev + 1) % featuredCourses.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 3000);
  };

  const prevSlide = () => {
    if (featuredCourses.length === 0) return;
    setCurrentSlide((prev) => (prev - 1 + featuredCourses.length) % featuredCourses.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 3000);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 3000);
  };

  // Features data
  const features = [
    {
      icon: BookOpen,
      title: "Expert Faculty",
      description: "Learn from industry professionals with years of teaching experience",
      gradient: "from-emerald-500 to-teal-600",
      bgGradient: "from-emerald-50/50 to-teal-50/50",
    },
    {
      icon: Clock,
      title: "Flexible Learning",
      description: "Online & offline classes to fit your schedule",
      gradient: "from-blue-500 to-indigo-600",
      bgGradient: "from-blue-50/50 to-indigo-50/50",
    },
    {
      icon: Users,
      title: "Small Batches",
      description: "Personalized attention with limited students per batch",
      gradient: "from-purple-500 to-fuchsia-600",
      bgGradient: "from-purple-50/50 to-fuchsia-50/50",
    },
    {
      icon: Award,
      title: "Proven Results",
      description: "Consistent track record of academic excellence",
      gradient: "from-amber-400 to-orange-500",
      bgGradient: "from-amber-50/50 to-orange-50/50",
    },
    {
      icon: BarChart3,
      title: "Regular Tests",
      description: "Weekly assessments to track your progress",
      gradient: "from-rose-500 to-pink-600",
      bgGradient: "from-rose-50/50 to-pink-50/50",
    },
    {
      icon: MessageCircle,
      title: "24/7 Support",
      description: "Doubt clearing sessions anytime you need",
      gradient: "from-cyan-500 to-blue-600",
      bgGradient: "from-cyan-50/50 to-blue-50/50",
    },
  ];

  return (
    <div className="min-h-screen bg-white font-sans text-gray-800 mt-25">
      {toppers.length > 0 && (
        <section className="w-full max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 mt-6 overflow-hidden mb-6">
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
            <div className="shrink-0 flex items-center gap-2 px-3 py-1.5 sm:py-2 bg-gradient-to-r from-amber-100 to-amber-50 border border-amber-200 rounded-full shadow-sm z-10 relative">
              <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-600 animate-pulse" />
              <span className="text-[10px] sm:text-xs font-bold text-amber-800 uppercase tracking-wider">Top Achievers</span>
            </div>
            
            <div className="marquee-container flex-1 w-full">
              <div className="marquee-content">
                {[...toppers, ...toppers, ...toppers, ...toppers].map((topper, idx) => (
                  <Link 
                    to="/toppers" 
                    key={`${topper._id}-${idx}`} 
                    className="shrink-0 flex items-center gap-3 bg-white border border-gray-100 rounded-full p-1.5 pr-5 shadow-[0_2px_10px_-3px_rgba(0,0,0,0.05)] hover:shadow-md hover:border-amber-200 transition-all cursor-pointer group"
                  >
                    <div className="w-9 h-9 rounded-full bg-gray-50 overflow-hidden shrink-0 border border-amber-200 shadow-inner">
                      {topper.image ? (
                        <img src={topper.image} alt={topper.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center font-bold text-sm text-gray-400 bg-gray-100">{topper.name.charAt(0)}</div>
                      )}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-gray-800 leading-none group-hover:text-amber-600 transition-colors">{topper.name}</h4>
                      <div className="flex items-center gap-1 mt-1">
                        <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                        <span className="text-[11px] font-medium text-gray-500">Rank {topper.rank}</span>
                        {topper.course && (
                           <>
                             <span className="w-1 h-1 rounded-full bg-gray-300 mx-0.5"></span>
                             <span className="text-[10px] text-gray-400 truncate max-w-[100px]">{topper.course}</span>
                           </>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
          
          <style dangerouslySetInnerHTML={{__html: `
            .marquee-container {
                display: flex;
                overflow: hidden;
                white-space: nowrap;
                width: 100%;
                mask-image: linear-gradient(to right, transparent, black 2%, black 98%, transparent);
                -webkit-mask-image: linear-gradient(to right, transparent, black 2%, black 98%, transparent);
            }
            .marquee-content {
                display: flex;
                gap: 1.5rem;
                animation: scrollMarquee 40s linear infinite;
            }
            .marquee-content:hover {
                animation-play-state: paused;
            }
            @keyframes scrollMarquee {
                0% { transform: translateX(0); }
                100% { transform: translateX(-50%); }
            }
          `}} />
        </section>
      )}
      {/* Hero Carousel Section - Pixabay Style */}
      <div className="text-center text-2xl font-extrabold">Our Courses</div>
     <section className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden">
  <div className="relative rounded-xl overflow-hidden bg-gray-900 min-h-[180px] sm:min-h-[320px] md:min-h-[320px] lg:min-h-[320px]">

    {featuredCourses.length > 0 ? (
      featuredCourses.map((course, index) => (
        <div
          key={course._id}
          className={`absolute inset-0 transition-opacity duration-700 ${
            index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <Link
            to={`/course/${course._id}`}
            className="absolute inset-0 cursor-pointer group"
          >
            {/* Background Image */}
            {course.image ? (
              <img
                src={course.image}
                alt={course.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-700 to-emerald-900 flex items-center justify-center">
                <BookOpen className="w-20 h-20 text-white/20" />
              </div>
            )}

            {/* Dark Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-l from-black/80 via-black/50 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 opacity-10 via-black/50 to-transparent" />

            {/* Content */}
            <div className="relative z-20 h-full flex flex-col items-end justify-end p-6 sm:p-10 md:p-14 text-right">
              <div className="max-w-2xl text-white">
                <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-3 leading-tight tracking-tight drop-shadow-md">
                  {course.title}
                </h2>

                <h3 className="text-sm sm:text-xl md:text-2xl lg:text-3xl font-medium text-white/90 mb-6 drop-shadow-sm">
                  {course.duration}
                </h3>

                <div className="inline-block font-medium bg-emerald-600 hover:bg-emerald-700 px-8 py-3 rounded-full text-sm sm:text-lg font-bold transition-all duration-300 shadow-xl hover:scale-105 active:scale-95">
                  View Details
                </div>
              </div>
            </div>
          </Link>
        </div>
      ))
    ) : (
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-700 to-blue-800 flex items-center justify-center">
        <div className="text-center text-white px-4">
          <BookOpen className="w-16 h-16 mx-auto mb-4 opacity-50" />
          <h2 className="text-2xl sm:text-3xl font-bold mb-2">Learn from the Best</h2>
          <p className="text-sm sm:text-lg opacity-80">Discover our amazing courses</p>
        </div>
      </div>
    )}

    {/* Navigation Arrows */}
    {featuredCourses.length > 1 && (
      <>
        <button
          onClick={prevSlide}
          className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-30 bg-black/40 hover:bg-black/60 text-white rounded-full p-2 backdrop-blur transition"
        >
          <ChevronLeftIcon className="w-5 h-5" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-30 bg-black/40 hover:bg-black/60 text-white rounded-full p-2 backdrop-blur transition"
        >
          <ChevronRightIcon className="w-5 h-5" />
        </button>
      </>
    )}

    {/* Indicators */}
    {featuredCourses.length > 1 && (
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex gap-2">
        {featuredCourses.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all rounded-full ${
              index === currentSlide
                ? "w-8 h-2 bg-white"
                : "w-2 h-2 bg-white/50"
            }`}
          />
        ))}
      </div>
    )}

  </div>
</section>

      {notices.length > 0 && (
        <section className="w-full max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 mt-6 overflow-hidden">
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
            <div className="shrink-0 flex items-center gap-2 px-3 py-1.5 sm:py-2 bg-gradient-to-r from-blue-100 to-blue-50 border border-blue-200 rounded-full shadow-sm z-10 relative">
              <Bell className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-600 animate-pulse" />
              <span className="text-[10px] sm:text-xs font-bold text-blue-800 uppercase tracking-wider">Latest Notices</span>
            </div>
            
            <div className="marquee-container flex-1 w-full">
              <div className="marquee-content" style={{ animationDuration: '35s' }}>
                {[...notices, ...notices, ...notices, ...notices].map((notice, idx) => (
                  <Link 
                    to="/notices" 
                    key={`${notice._id}-${idx}`} 
                    className="shrink-0 flex items-center gap-3 bg-white border border-gray-100 rounded-full p-1.5 pr-5 shadow-[0_2px_10px_-3px_rgba(0,0,0,0.05)] hover:shadow-md hover:border-blue-200 transition-all cursor-pointer group"
                  >
                    <span
                      className={`text-[10px] font-bold px-2.5 py-1 rounded-full shrink-0 ${
                        notice.category === "Urgent"
                          ? "bg-red-50 text-red-600 border border-red-100"
                          : notice.category === "Event"
                          ? "bg-emerald-50 text-emerald-600 border border-emerald-100"
                          : "bg-blue-50 text-blue-600 border border-blue-100"
                      }`}
                    >
                      {notice.category || "Notice"}
                    </span>
                    <h4 className="text-sm font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">{notice.content}</h4>
                    {notice.createdAt && (
                       <div className="flex items-center gap-1 shrink-0">
                         <span className="w-1 h-1 rounded-full bg-gray-300 mx-1"></span>
                         <span className="text-[11px] font-medium text-gray-500">
                            {new Date(notice.createdAt).toLocaleDateString("en-IN", {
                               day: "numeric",
                               month: "short",
                            })}
                         </span>
                       </div>
                    )}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Compact Toppers Marquee Slide */}
      
     <section className="relative w-full bg-white overflow-hidden">
  <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-100/20 rounded-full blur-3xl -mr-48 -mt-48" />

  <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
    
    <div className="grid md:grid-cols-2 gap-10 items-center">
      
      
      {/* LEFT SIDE - TEXT */}
      <div className="text-center md:text-left">
          <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => navigate("/courses")}
            className="bg-neutral-900 text-white px-8 py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2  transition-all shadow-sm hover:shadow-md"
          >
            Explore Courses <ArrowRight className="w-4 h-4" />
          </button>
         
          
          <Link
          to="tel:+919835958271"
            className="bg-emerald-600 text-white px-8 py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-emerald-700 transition-all shadow-sm hover:shadow-md"
          >
          <Phone className="w-4 h-4" />  call us 
          </Link>
         

          {!user && (
            <button
              onClick={() => navigate("/register")}
              className="bg-white text-gray-700 px-8 py-3.5 rounded-xl font-semibold border border-gray-200 hover:bg-gray-50 transition-all"
            >
              Get Started Free
            </button>
          )}
        </div>
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 rounded-full border border-emerald-100 mt-6">
          <Sparkles className="w-4 h-4 text-emerald-600" />
          <span className="text-sm font-semibold text-emerald-700">
            India's Leading Learning Platform
          </span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-gray-900 leading-tight mb-6">
          Learn from the{" "}
          <span className="text-emerald-600 relative inline-block">
            Best
            <svg
              className="absolute -bottom-2 left-0 w-full h-2 text-emerald-600/30"
              viewBox="0 0 100 8"
              preserveAspectRatio="none"
            >
              <path
                d="M0 4 Q 25 0, 50 4 T 100 4"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
          </span>{" "}
          Teachers.
        </h1>
      
        
     

        <p className="text-lg sm:text-xl text-gray-600 max-w-xl mb-8 leading-relaxed ">
          Join 10,000+ successful students mastering technology,
          management, and more with our industry-leading mentors.
        </p>

        
      </div>
      

      {/* RIGHT SIDE - IMAGE */}
      <div className="flex justify-center md:justify-end">
        <img
          className="w-72 md:w-96 lg:w-[420px] drop-shadow-xl"
          src="https://static.vecteezy.com/system/resources/previews/025/003/257/non_2x/3d-cute-cartoon-male-teacher-character-on-transparent-background-generative-ai-png.png"
          alt="Teacher"
        />
      </div>

    </div>
  </div>
</section>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 text-center">
            <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center mx-auto mb-2">
              <Users className="w-5 h-5 text-emerald-600" />
            </div>
            <p className="text-xl font-bold text-gray-900">1000+</p>
            <p className="text-xs text-gray-500">Active Students</p>
          </div>
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 text-center">
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-2">
              <BookOpen className="w-5 h-5 text-blue-600" />
            </div>
            <p className="text-xl font-bold text-gray-900">10+</p>
            <p className="text-xs text-gray-500">diffrent courses</p>
          </div>
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 text-center">
            <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center mx-auto mb-2">
              <Award className="w-5 h-5 text-amber-600" />
            </div>
            <p className="text-xl font-bold text-gray-900">98%</p>
            <p className="text-xs text-gray-500">Success Rate</p>
          </div>
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 text-center">
            <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-2">
              <Star className="w-5 h-5 text-purple-600" />
            </div>
            <p className="text-xl font-bold text-gray-900">4.9</p>
            <p className="text-xs text-gray-500">Student Rating</p>
          </div>
        </div>
      </div>

      {/* Information Hub - Notices, Courses, Toppers */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white rounded-full shadow-sm border border-gray-100 mb-4">
              <Bell className="w-3.5 h-3.5 text-emerald-500" />
              <span className="text-xs font-semibold text-emerald-600 uppercase tracking-wide">
                Stay Informed
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
              Information Hub
            </h2>
            <p className="mt-3 text-gray-500 max-w-2xl mx-auto">
              Stay updated with the latest announcements, programs, and
              achievements
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Column 1: Notices */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col h-[480px] transition-shadow hover:shadow-md">
              <div className="p-6 pb-4 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
                      <Bell className="w-5 h-5 text-amber-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 text-lg">
                        Notices
                      </h3>
                      <p className="text-xs text-gray-400 uppercase tracking-wide">
                        Latest Updates
                      </p>
                    </div>
                  </div>
                  <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-6 pt-4 space-y-4 scrollbar-thin scrollbar-thumb-gray-200">
                {loading ? (
                  <div className="h-full flex flex-col items-center justify-center text-gray-400">
                    <div className="w-8 h-8 border-3 border-gray-200 border-t-emerald-500 rounded-full animate-spin mb-3"></div>
                    <p className="text-xs font-medium">Loading notices...</p>
                  </div>
                ) : notices.length > 0 ? (
                  notices.map((notice) => (
                    <div
                      key={notice._id}
                      className="p-4 rounded-xl bg-gray-50 hover:bg-white hover:shadow-sm transition-all cursor-pointer border border-transparent hover:border-gray-100"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span
                          className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                            notice.category === "Urgent"
                              ? "bg-red-50 text-red-600"
                              : notice.category === "Event"
                              ? "bg-emerald-50 text-emerald-600"
                              : "bg-blue-50 text-blue-600"
                          }`}
                        >
                          {notice.category || "Notice"}
                        </span>
                        <span className="text-xs text-gray-400">
                          {new Date(notice.createdAt).toLocaleDateString(
                            "en-IN",
                            {
                              day: "numeric",
                              month: "short",
                            }
                          )}
                        </span>
                      </div>
                      <h4 className="font-semibold text-gray-800 line-clamp-2">
                        {notice.title}
                      </h4>
                      <p className="text-sm text-gray-500 line-clamp-2 mt-1">
                        {notice.content}
                      </p>
                    </div>
                  ))
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-gray-400">
                    <Bell className="w-12 h-12 mb-2 opacity-30" />
                    <p className="text-sm font-medium">No notices yet</p>
                  </div>
                )}
              </div>

              <div className="p-4 pt-0">
                <Link
                  to="/notices"
                  className="block w-full py-3 bg-gray-50 hover:bg-amber-50 text-amber-600 rounded-xl text-sm font-semibold text-center transition-colors"
                >
                  View All Notices
                </Link>
              </div>
            </div>

            {/* Column 2: Courses */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col h-[480px] transition-shadow hover:shadow-md">
              <div className="p-6 pb-4 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg">Courses</h3>
                    <p className="text-xs text-gray-400 uppercase tracking-wide">
                      Our Programs
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-6 pt-4">
                <div className="grid grid-cols-1 gap-4">
                  {(courses.filter(c => !c.isFinished).length > 0 ? courses.filter(c => !c.isFinished).slice(0, 4) : [1, 2, 3, 4]).map(
                    (course, idx) => (
                      <Link
                        to={course._id ? `/course/${course._id}` : "/courses"}
                        key={course._id || idx}
                        className="group flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors"
                      >
                        <div className="w-16 h-16 rounded-xl bg-linear-to-br from-emerald-50 to-blue-50 flex items-center justify-center overflow-hidden shrink-0">
                          {course.image ? (
                            <img
                              src={course.image}
                              alt={course.title}
                              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                            />
                          ) : (
                            <BookOpen className="w-6 h-6 text-emerald-500 transition-transform duration-300 group-hover:scale-110" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-gray-800 truncate ">
                            {course.title || "New Course"}
                          </h4>
                          <div className="flex items-center gap-3 mt-1">
                            <span className="text-sm font-bold text-emerald-600">
                              ₹{course.fee?.toLocaleString()}
                            </span>
                            <span className="text-xs text-gray-400">
                              {course.duration}
                            </span>
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-emerald-500 transition-colors" />
                      </Link>
                    )
                  )}
                </div>
              </div>

              <div className="p-4 pt-0">
                <Link
                  to="/courses"
                  className="block w-full py-3 bg-gray-50 hover:bg-blue-50 text-blue-600 rounded-xl text-sm font-semibold text-center transition-colors"
                >
                  Browse All Courses
                </Link>
              </div>
            </div>

            {/* Column 3: Toppers */}
            <div className="bg-linear-to-br from-gray-900 to-gray-800 rounded-2xl shadow-xl overflow-hidden flex flex-col h-[480px] text-white">
              <div className="p-6 pb-4 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-linear-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
                    <Award className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-lg">
                      Top Achievers
                    </h3>
                    <p className="text-xs text-amber-300/70 uppercase tracking-wide">
                      Academic Excellence
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-6 pt-4 space-y-3 scrollbar-thin scrollbar-thumb-white/10">
                {loading ? (
                  <div className="h-full flex flex-col items-center justify-center text-white/40">
                    <div className="w-8 h-8 border-3 border-white/20 border-t-amber-400 rounded-full animate-spin mb-3"></div>
                    <p className="text-xs font-medium">Loading toppers...</p>
                  </div>
                ) : toppers.length > 0 ? (
                  toppers.slice(0, 5).map((topper, index) => (
                    <div
                      key={topper._id}
                      className="flex items-center gap-4 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all"
                    >
                      <div className="relative">
                        <div className="w-12 h-12 bg-gray-700 rounded-xl flex items-center justify-center font-bold text-lg text-white overflow-hidden">
                          {topper.image ? (
                            <img
                              src={topper.image}
                              alt={topper.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            topper.name.charAt(0)
                          )}
                        </div>
                        <div className="absolute -top-1 -right-1 w-5 h-5 bg-amber-400 rounded-lg flex items-center justify-center text-gray-900 text-[10px] font-bold">
                          #{index + 1}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-white truncate">
                          {topper.name}
                        </h4>
                        <p className="text-xs text-amber-300/70 truncate">
                          {topper.course}
                        </p>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                        <span className="text-sm font-bold text-amber-400">
                          {topper.rank}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-white/40">
                    <Award className="w-12 h-12 mb-2 opacity-30" />
                    <p className="text-sm font-medium">No toppers yet</p>
                  </div>
                )}
              </div>

              <div className="p-4 pt-0">
                <Link
                  to="/toppers"
                  className="block w-full py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl text-sm font-semibold text-center transition-colors"
                >
                  View Hall of Fame
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Gallery Showcase */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-50 rounded-full mb-4 border border-emerald-100 shadow-sm">
                <Camera className="w-4 h-4 text-emerald-600" />
                <span className="text-sm font-semibold text-emerald-700 uppercase tracking-wide">Campus Life</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight">
                Explore Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600 tracking-tight">Gallery</span>
              </h2>
            </div>
            <Link to="/gallery" className="group hidden md:flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-xl font-medium hover:bg-slate-800 transition-all shadow-md hover:shadow-lg active:scale-95">
              <span>View Full Gallery</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            <div className="col-span-2 lg:row-span-2 rounded-3xl overflow-hidden relative group h-64 md:h-96 lg:h-full shadow-sm hover:shadow-xl transition-shadow duration-500 bg-slate-100">
              <img src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=800" alt="Campus Life" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 md:p-8">
                 <h3 className="text-white font-bold text-2xl md:text-3xl mb-1 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">Modern University</h3>
                 <p className="text-emerald-300 font-medium translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">Spacious & Vibrant</p>
              </div>
            </div>
            <div className="rounded-3xl overflow-hidden relative group h-32 md:h-44 lg:h-[220px] shadow-sm hover:shadow-xl transition-shadow duration-500 bg-slate-100">
               <img src="https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=400" alt="Classroom" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
               <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                 <span className="text-white font-bold">Classrooms</span>
               </div>
            </div>
            <div className="rounded-3xl overflow-hidden relative group h-32 md:h-44 lg:h-[220px] shadow-sm hover:shadow-xl transition-shadow duration-500 bg-slate-100">
               <img src="https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&q=80&w=400" alt="Students" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                 <span className="text-white font-bold">Group Studies</span>
               </div>
            </div>
             <div className="rounded-3xl overflow-hidden relative group h-32 md:h-44 lg:h-[220px] shadow-sm hover:shadow-xl transition-shadow duration-500 bg-slate-100">
               <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=400" alt="Activities" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                 <span className="text-white font-bold">Activities</span>
               </div>
            </div>
            <div className="rounded-3xl overflow-hidden relative group h-32 md:h-44 lg:h-[220px] shadow-sm hover:shadow-xl transition-shadow duration-500 bg-slate-100">
               <Link to="/gallery" className="absolute inset-0 bg-emerald-600/90 backdrop-blur-sm text-white flex flex-col items-center justify-center p-6 hover:bg-emerald-700 transition-colors z-10 group-hover:scale-105 duration-500">
                 <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mb-3">
                   <ArrowRight className="w-6 h-6" />
                 </div>
                 <span className="font-bold text-lg whitespace-nowrap">View All</span>
               </Link>
               <img src="https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&q=80&w=400" alt="More" className="w-full h-full object-cover" />
            </div>
          </div>
          
          <Link to="/gallery" className="mt-8 md:hidden w-full flex items-center justify-center gap-2 px-6 py-4 bg-slate-900 text-white rounded-2xl font-bold shadow-lg active:scale-95 transition-transform">
              <span>Explore Full Gallery</span>
              <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Features Section */}
   <section className="py-20 px-4 sm:px-6 lg:px-8 bg-linear-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 rounded-full mb-4">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span className="text-sm font-semibold text-emerald-700 uppercase tracking-wide">
                Why Choose Us
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              What Makes Us{" "}
              <span className="bg-linear-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Different
              </span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Comprehensive learning ecosystem designed for student success
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group relative p-6 rounded-2xl bg-white border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className={`absolute inset-0 bg-linear-to-r ${feature.bgGradient} opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-300`} />
                <div className="relative z-10">
                  <div className={`w-14 h-14 bg-linear-to-r ${feature.gradient} rounded-xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-linear-to-r from-emerald-50 to-blue-50">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Ready to Change Your Future?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of successful students who have achieved their
            academic goals with our platform. Start your journey today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {!user ? (
              <>
                <Link
                  to="/register"
                  className="bg-emerald-600 text-white px-8 py-3.5 rounded-xl font-semibold hover:bg-emerald-700 transition-colors shadow-sm"
                >
                  Get Started Free
                </Link>
                <Link
                  to="/login"
                  className="bg-white text-gray-700 px-8 py-3.5 rounded-xl font-semibold border border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  Student Login
                </Link>
              </>
            ) : (
              <Link
                to="/dashboard"
                className="bg-emerald-600 text-white px-8 py-3.5 rounded-xl font-semibold hover:bg-emerald-700 transition-colors shadow-sm"
              >
                Go to Dashboard
              </Link>
            )}
          </div>
        </div>
      </section>

      
    </div>
  );
};

export default Home;
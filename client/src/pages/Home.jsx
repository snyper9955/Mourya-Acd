import React, { useState, useEffect } from "react";
import { useApi } from "../context/ApiContext";
import {
  BookOpen,
  Award,
  Bell,
  ArrowRight,
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
    if (!isAutoPlaying || courses.length === 0) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % courses.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, courses.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % courses.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + courses.length) % courses.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
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

  // Featured courses for carousel (use first 5 active courses)
  const featuredCourses = courses.filter(c => !c.isFinished).slice(0, 5);

  return (
    <div className="min-h-screen bg-white font-sans text-gray-800 mt-25">
      {/* Hero Carousel Section - Pixabay Style */}
      <section className="relative w-[80%] mx-auto overflow-hidden bg-gray-900 rounded-lg ">
        {/* Carousel Container */}
        <div className="relative h-[20vh] sm:h-[30vh] md:h-[30vh] lg:h-[30vh] ">
          {featuredCourses.length > 0 ? (
            featuredCourses.map((course, index) => (
              <div
                key={course._id}
                className={`absolute inset-0  ${
                  index === currentSlide ? " z-10" : " z-0"
                }`}
              >
                <Link
                  to={`/course/${course._id}`}
                  className="absolute inset-0 z-10 cursor-pointer group"
                >
                  {/* Background Image */}
                  <div className="absolute inset-0 bg-linear-to-r from-black to-transparent "></div>
                  {course.image ? (
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-full h-full object-cover "
                    />
                  ) : (
                    <div className="w-full h-full bg-linear-to-br from-emerald-700 to-emerald-900 flex items-center justify-center">
                      <BookOpen className="w-24 h-24 text-white/20" />
                    </div>
                  )}
                  {/* Content Overlay */}
                  <div className="absolute inset-0 flex justify-end p-8 sm:p-12 lg:p-16 flex-col">
                    <div className="max-w-2xl text-white">
                      <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight opacity-100 transition-opacity duration-300 relative top-3">
                        {course.title}
                      </h2>
                      <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 leading-tight opacity-100 transition-opacity duration-300 ">
                        {course.duration}
                      </h3>
                      <div className="text-white/80 text-center w-fit mt-4 bg-blue-500 px-6 py-2.5 rounded-full font-semibold hover:bg-blue-600 transition-colors shadow-lg shadow-blue-500/30">
                        View Details
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))
          ) : (
            // Fallback slide when no courses
            <div className="absolute inset-0">
              <div className="w-full h-full bg-linear-to-br from-emerald-700 to-blue-800 flex items-center justify-center">
                <div className="text-center text-white">
                  <BookOpen className="w-20 h-20 mx-auto mb-4 opacity-50" />
                  <h2 className="text-3xl font-bold mb-2">Learn from the Best</h2>
                  <p className="text-lg opacity-80">Discover our amazing courses</p>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Arrows */}
          {featuredCourses.length > 1 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-black/30 hover:bg-black/50 text-white rounded-full p-2 backdrop-blur-sm transition-all"
                aria-label="Previous slide"
              >
                <ChevronLeftIcon className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-black/30 hover:bg-black/50 text-white rounded-full p-2 backdrop-blur-sm transition-all"
                aria-label="Next slide"
              >
                <ChevronRightIcon className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </>
          )}

          {/* Slide Indicators */}
          {featuredCourses.length > 1 && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-2">
              {featuredCourses.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`transition-all rounded-full ${
                    index === currentSlide
                      ? "w-8 h-2 bg-white"
                      : "w-2 h-2 bg-white/50 hover:bg-white/80"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          )}

          {/* Auto-play Toggle */}
          {featuredCourses.length > 1 && (
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className="absolute bottom-6 right-6 z-30 bg-black/30 hover:bg-black/50 text-white rounded-full p-2 backdrop-blur-sm transition-all"
              aria-label={isAutoPlaying ? "Pause slideshow" : "Play slideshow"}
            >
              {isAutoPlaying ? (
                <Pause className="w-4 h-4" />
              ) : (
                <PlayIcon className="w-4 h-4" />
              )}
            </button>
          )}
        </div>
      </section>

      {/* Info Banner */}
   

      {/* Hero Section - Original (simplified now) */}
     <section className="relative w-full bg-white overflow-hidden">
  <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-100/20 rounded-full blur-3xl -mr-48 -mt-48" />

  <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
    
    <div className="grid md:grid-cols-2 gap-10 items-center">
      
      {/* LEFT SIDE - TEXT */}
      <div className="text-center md:text-left">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 rounded-full border border-emerald-100 mb-6">
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
          Achievers.
        </h1>

        <p className="text-lg sm:text-xl text-gray-600 max-w-xl mb-8 leading-relaxed">
          Join 10,000+ successful students mastering technology,
          management, and more with our industry-leading mentors and
          comprehensive curriculum.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => navigate("/courses")}
            className="bg-emerald-600 text-white px-8 py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-emerald-700 transition-all shadow-sm hover:shadow-md"
          >
            Explore Courses <ArrowRight className="w-4 h-4" />
          </button>

          {!user && (
            <button
              onClick={() => navigate("/register")}
              className="bg-white text-gray-700 px-8 py-3.5 rounded-xl font-semibold border border-gray-200 hover:bg-gray-50 transition-all"
            >
              Get Started Free
            </button>
          )}
        </div>
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
            <p className="text-xl font-bold text-gray-900">10K+</p>
            <p className="text-xs text-gray-500">Active Students</p>
          </div>
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 text-center">
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-2">
              <BookOpen className="w-5 h-5 text-blue-600" />
            </div>
            <p className="text-xl font-bold text-gray-900">50+</p>
            <p className="text-xs text-gray-500">Expert Courses</p>
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
            Ready to Shape Your Future?
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

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 px-4 sm:px-6 lg:px-8 pt-12 pb-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <GraduationCap className="w-6 h-6 text-emerald-400" />
                <span className="font-bold text-lg text-white tracking-tight">
                  EduManage
                </span>
              </div>
              <p className="text-sm leading-relaxed">
                Empowering students with world-class education and personalized
                guidance since 2010.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-white text-sm uppercase tracking-wider mb-4">
                Quick Links
              </h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    to="/about"
                    className="hover:text-white transition-colors"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    to="/courses"
                    className="hover:text-white transition-colors"
                  >
                    Courses
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="hover:text-white transition-colors"
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <Link
                    to="/blog"
                    className="hover:text-white transition-colors"
                  >
                    Blog
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white text-sm uppercase tracking-wider mb-4">
                Support
              </h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    to="/faq"
                    className="hover:text-white transition-colors"
                  >
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link
                    to="/privacy"
                    className="hover:text-white transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    to="/terms"
                    className="hover:text-white transition-colors"
                  >
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link
                    to="/refund"
                    className="hover:text-white transition-colors"
                  >
                    Refund Policy
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white text-sm uppercase tracking-wider mb-4">
                Contact Info
              </h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4" /> +91 12345 67890
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4" /> support@edumanage.com
                </li>
                <li className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" /> 123 Education Hub, City
                </li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-gray-800 text-center">
            <p className="text-xs tracking-wider">
              © 2024 EduManage Coaching Hub • Built for Success
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
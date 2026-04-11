import React, { useState, useEffect } from 'react';
import { useApi } from '../context/ApiContext';
import { Award, Star, Search, GraduationCap, TrendingUp, Sparkles, User, Medal, Trophy, Crown, ChevronRight, Filter, X, Calendar, BookOpen, Users } from 'lucide-react';

const PublicToppers = () => {
    const api = useApi();
    const [toppers, setToppers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedYear, setSelectedYear] = useState('all');
    const [selectedCourse, setSelectedCourse] = useState('all');
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    useEffect(() => {
        const fetchToppers = async () => {
            try {
                const { data } = await api.get('/api/toppers');
                setToppers(data.data || []);
            } catch (error) {
                console.error('Failed to fetch toppers', error);
            } finally {
                setLoading(false);
            }
        };
        fetchToppers();
    }, [api]);

    // Get unique years and courses
    const years = ['all', ...new Set(toppers.map(topper => topper.year).filter(Boolean))];
    const courses = ['all', ...new Set(toppers.map(topper => topper.course).filter(Boolean))];

    const filteredToppers = toppers.filter(topper => {
        const matchesSearch = topper.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            topper.course?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            topper.rank?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesYear = selectedYear === 'all' || topper.year === selectedYear;
        const matchesCourse = selectedCourse === 'all' || topper.course === selectedCourse;
        return matchesSearch && matchesYear && matchesCourse;
    });

    // Get rank badge configuration
    const getRankConfig = (rank) => {
        const rankNum = parseInt(rank);
        if (rankNum === 1) return {
            color: 'from-amber-500 to-amber-600',
            bg: 'bg-amber-50',
            text: 'text-amber-700',
            border: 'border-amber-200',
            icon: <Crown className="w-4 h-4" />,
            label: 'Gold Medalist'
        };
        if (rankNum === 2) return {
            color: 'from-gray-400 to-gray-500',
            bg: 'bg-gray-50',
            text: 'text-gray-700',
            border: 'border-gray-200',
            icon: <Medal className="w-4 h-4" />,
            label: 'Silver Medalist'
        };
        if (rankNum === 3) return {
            color: 'from-orange-400 to-orange-500',
            bg: 'bg-orange-50',
            text: 'text-orange-700',
            border: 'border-orange-200',
            icon: <Award className="w-4 h-4" />,
            label: 'Bronze Medalist'
        };
        return {
            color: 'from-emerald-400 to-emerald-500',
            bg: 'bg-emerald-50',
            text: 'text-emerald-700',
            border: 'border-emerald-200',
            icon: <Star className="w-4 h-4" />,
            label: 'Top Achiever'
        };
    };

    // Calculate stats
    const totalAchievers = toppers.length;
    const uniqueCourses = new Set(toppers.map(t => t.course)).size;
    const topRankers = toppers.filter(t => parseInt(t.rank) <= 3).length;

    return (
        <div className="min-h-screen bg-linear-to-br from-gray-50 via-white to-gray-50 font-sans pt-24 pb-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Animated Background Elements */}
                <div className="fixed inset-0 pointer-events-none overflow-hidden">
                    <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
                    <div className="absolute bottom-20 right-10 w-96 h-96 bg-amber-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
                </div>

                {/* Page Header with Animation */}
                <div className="text-center mb-12 animate-fade-in-up">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-gray-100 mb-6 backdrop-blur-sm">
                        <Sparkles className="w-4 h-4 text-emerald-500 animate-pulse" />
                        <span className="text-xs font-semibold text-emerald-600 uppercase tracking-wider">
                            Hall of Fame
                        </span>
                    </div>
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight mb-4">
                        Academic{' '}
                        <span className="bg-linear-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                            Achievers
                        </span>
                    </h1>
                    <p className="text-gray-500 max-w-2xl mx-auto text-lg">
                        Celebrating the remarkable success and dedication of our top-performing students who have excelled in their academic pursuits.
                    </p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 animate-fade-in-up animation-delay-200">
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 group">
                        <div className="flex items-center justify-between mb-3">
                            <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                                <Trophy className="w-6 h-6 text-emerald-600" />
                            </div>
                            <TrendingUp className="w-5 h-5 text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <p className="text-3xl font-bold text-gray-900 mb-1">{totalAchievers}</p>
                        <p className="text-sm text-gray-500">Total Achievers</p>
                    </div>
                    
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 group">
                        <div className="flex items-center justify-between mb-3">
                            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                                <BookOpen className="w-6 h-6 text-purple-600" />
                            </div>
                        </div>
                        <p className="text-3xl font-bold text-gray-900 mb-1">{uniqueCourses}</p>
                        <p className="text-sm text-gray-500">Different Courses</p>
                    </div>
                    
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 group">
                        <div className="flex items-center justify-between mb-3">
                            <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                                <Crown className="w-6 h-6 text-amber-600" />
                            </div>
                        </div>
                        <p className="text-3xl font-bold text-gray-900 mb-1">{topRankers}</p>
                        <p className="text-sm text-gray-500">Top 3 Rankers</p>
                    </div>
                    
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 group">
                        <div className="flex items-center justify-between mb-3">
                            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                                <Users className="w-6 h-6 text-blue-600" />
                            </div>
                        </div>
                        <p className="text-3xl font-bold text-gray-900 mb-1">100%</p>
                        <p className="text-sm text-gray-500">Success Rate</p>
                    </div>
                </div>

                {/* Search and Filter Section */}
                <div className="max-w-4xl mx-auto mb-12 animate-fade-in-up animation-delay-400">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-2">
                        <div className="flex flex-col sm:flex-row gap-2">
                            <div className="flex-1 relative">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input 
                                    type="text" 
                                    placeholder="Search by name, course, or rank..." 
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3 bg-transparent border-0 rounded-xl outline-none focus:ring-2 focus:ring-emerald-100 transition-all text-gray-700 placeholder:text-gray-400"
                                />
                            </div>
                            
                            <button
                                onClick={() => setIsFilterOpen(!isFilterOpen)}
                                className="px-5 py-3 bg-gray-50 hover:bg-gray-100 rounded-xl transition-all duration-200 flex items-center gap-2 text-gray-700"
                            >
                                <Filter className="w-4 h-4" />
                                <span className="text-sm font-medium">Filters</span>
                                {(selectedYear !== 'all' || selectedCourse !== 'all') && (
                                    <span className="ml-1 w-5 h-5 bg-emerald-500 text-white rounded-full text-xs flex items-center justify-center">
                                        1
                                    </span>
                                )}
                            </button>
                        </div>
                        
                        {/* Expanded Filters */}
                        {isFilterOpen && (
                            <div className="mt-4 pt-4 border-t border-gray-100 animate-slide-down">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-medium text-gray-500 mb-2 flex items-center gap-1">
                                            <Calendar className="w-3 h-3" />
                                            Academic Year
                                        </label>
                                        <select
                                            value={selectedYear}
                                            onChange={(e) => setSelectedYear(e.target.value)}
                                            className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                        >
                                            {years.map(year => (
                                                <option key={year} value={year}>
                                                    {year === 'all' ? 'All Years' : year}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    
                                    <div>
                                        <label className="block text-xs font-medium text-gray-500 mb-2 flex items-center gap-1">
                                            <GraduationCap className="w-3 h-3" />
                                            Course
                                        </label>
                                        <select
                                            value={selectedCourse}
                                            onChange={(e) => setSelectedCourse(e.target.value)}
                                            className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                        >
                                            {courses.map(course => (
                                                <option key={course} value={course}>
                                                    {course === 'all' ? 'All Courses' : course}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                
                                {(selectedYear !== 'all' || selectedCourse !== 'all' || searchTerm) && (
                                    <button
                                        onClick={() => {
                                            setSearchTerm('');
                                            setSelectedYear('all');
                                            setSelectedCourse('all');
                                        }}
                                        className="mt-4 text-sm text-emerald-600 hover:text-emerald-700 flex items-center gap-1 mx-auto"
                                    >
                                        <X className="w-3 h-3" />
                                        Clear all filters
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* Results Info */}
                {!loading && filteredToppers.length > 0 && (
                    <div className="mb-6 flex justify-between items-center animate-fade-in">
                        <p className="text-sm text-gray-500">
                            Showing <span className="font-semibold text-gray-900">{filteredToppers.length}</span> of{' '}
                            <span className="font-semibold text-gray-900">{toppers.length}</span> achievers
                        </p>
                    </div>
                )}

                {/* Toppers Grid */}
                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {[...Array(8)].map((_, i) => (
                            <div key={i} className="bg-white rounded-2xl overflow-hidden border border-gray-100 animate-pulse">
                                <div className="p-6">
                                    <div className="w-32 h-32 bg-linear-to-br from-gray-100 to-gray-200 rounded-full mx-auto mb-4"></div>
                                    <div className="h-5 bg-gray-200 rounded w-3/4 mx-auto mb-3"></div>
                                    <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto mb-4"></div>
                                    <div className="h-8 bg-gray-200 rounded-full w-28 mx-auto"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : filteredToppers.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredToppers.map((topper, index) => {
                            const rankConfig = getRankConfig(topper.rank);
                            return (
                                <div 
                                    key={topper._id} 
                                    className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden animate-fade-in-up hover:-translate-y-1"
                                    style={{ animationDelay: `${index * 50}ms` }}
                                >
                                    <div className="relative">
                                        {/* Rank Banner */}
                                        <div className={`absolute top-4 right-4 z-10 px-3 py-1.5 ${rankConfig.bg} rounded-full text-xs font-bold flex items-center gap-1.5 shadow-sm border ${rankConfig.border}`}>
                                            {rankConfig.icon}
                                            <span className={rankConfig.text}>#{topper.rank}</span>
                                        </div>
                                        
                                        {/* Avatar Section */}
                                        <div className="pt-8 pb-4 px-6 flex flex-col items-center text-center">
                                            <div className="relative mb-4">
                                                <div className="w-32 h-32 rounded-full bg-linear-to-br from-gray-50 to-gray-100 flex items-center justify-center overflow-hidden shadow-md group-hover:shadow-lg transition-all duration-300">
                                                    {topper.image ? (
                                                        <img 
                                                            src={topper.image} 
                                                            alt={topper.name} 
                                                            className="w-full h-full object-cover"
                                                        />
                                                    ) : (
                                                        <div className="w-full h-full bg-linear-to-br from-emerald-100 to-teal-100 flex items-center justify-center">
                                                            <User className="w-12 h-12 text-emerald-600" />
                                                        </div>
                                                    )}
                                                </div>
                                                
                                                {/* Decorative Ring */}
                                                <div className={`absolute inset-0 rounded-full border-2 ${rankConfig.border} opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-110`}></div>
                                            </div>

                                            <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-emerald-600 transition-colors duration-300">
                                                {topper.name}
                                            </h3>
                                            
                                            <div className="flex items-center gap-1.5 mb-3">
                                                <GraduationCap className="w-3.5 h-3.5 text-gray-400" />
                                                <span className="text-sm text-gray-600 font-medium">{topper.course}</span>
                                            </div>

                                            {/* Year Badge */}
                                            {topper.year && (
                                                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-gray-50 rounded-full text-xs text-gray-600 mb-4 border border-gray-100">
                                                    <Calendar className="w-3 h-3" />
                                                    {topper.year}
                                                </div>
                                            )}

                                            {/* Quote/Message */}
                                            {topper.message && (
                                                <div className="mt-3 pt-3 border-t border-gray-100 w-full">
                                                    <p className="text-xs text-gray-500 italic leading-relaxed">
                                                        "{topper.message.length > 80 ? topper.message.slice(0, 80) + '...' : topper.message}"
                                                    </p>
                                                </div>
                                            )}

                                            {/* View Details Button */}
                                            <button className="mt-4 px-4 py-2 text-xs font-medium text-emerald-600 hover:text-emerald-700 transition-colors flex items-center gap-1 group-hover:gap-2">
                                                View Profile
                                                <ChevronRight className="w-3 h-3" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    // Empty State with Animation
                    <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-gray-100 animate-fade-in">
                        <div className="w-24 h-24 bg-linear-to-br from-gray-50 to-gray-100 rounded-3xl flex items-center justify-center mx-auto mb-6 animate-bounce">
                            <Award className="w-12 h-12 text-gray-300" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-3">No Achievers Found</h3>
                        <p className="text-gray-500 max-w-md mx-auto mb-6">
                            {searchTerm || selectedYear !== 'all' || selectedCourse !== 'all'
                                ? "No achievers match your search criteria. Try adjusting your filters."
                                : "Achievers will be displayed here once they're added to the hall of fame."}
                        </p>
                        {(searchTerm || selectedYear !== 'all' || selectedCourse !== 'all') && (
                            <button 
                                onClick={() => {
                                    setSearchTerm('');
                                    setSelectedYear('all');
                                    setSelectedCourse('all');
                                }}
                                className="px-6 py-3 bg-linear-to-r from-emerald-500 to-teal-500 text-white rounded-xl text-sm font-medium hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
                            >
                                Clear All Filters
                            </button>
                        )}
                    </div>
                )}
            </div>

            {/* Custom Animations */}
            <style jsx>{`
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                @keyframes slideDown {
                    from {
                        opacity: 0;
                        transform: translateY(-10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                .animate-fade-in-up {
                    animation: fadeInUp 0.6s ease-out forwards;
                }
                
                .animate-fade-in {
                    animation: fadeInUp 0.4s ease-out forwards;
                }
                
                .animate-slide-down {
                    animation: slideDown 0.3s ease-out forwards;
                }
                
                .animation-delay-200 {
                    animation-delay: 200ms;
                    opacity: 0;
                    animation-fill-mode: forwards;
                }
                
                .animation-delay-400 {
                    animation-delay: 400ms;
                    opacity: 0;
                    animation-fill-mode: forwards;
                }
            `}</style>
        </div>
    );
};

export default PublicToppers;
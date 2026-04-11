import React, { useState, useEffect } from 'react';
import { useApi } from '../context/ApiContext';
import { Bell, Search, Tag, Calendar, Filter, ChevronDown, X } from 'lucide-react';

const PublicNotices = () => {
    const api = useApi();
    const [notices, setNotices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [showFilters, setShowFilters] = useState(false);

    // Get unique categories from notices
    const categories = ['all', ...new Set(notices.map(notice => notice.category).filter(Boolean))];

    useEffect(() => {
        const fetchNotices = async () => {
            try {
                const { data } = await api.get('/api/notices');
                setNotices(data.data || []);
            } catch (error) {
                console.error('Failed to fetch notices', error);
            } finally {
                setLoading(false);
            }
        };
        fetchNotices();
    }, [api]);

    const filteredNotices = notices.filter(notice => {
        const matchesSearch = notice.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            notice.content?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || notice.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    // Get category badge styles
    const getCategoryStyles = (category) => {
        switch(category) {
            case 'Urgent':
                return 'bg-red-50 text-red-700 border-red-100';
            case 'Event':
                return 'bg-emerald-50 text-emerald-700 border-emerald-100';
            case 'Exam':
                return 'bg-amber-50 text-amber-700 border-amber-100';
            default:
                return 'bg-blue-50 text-blue-700 border-blue-100';
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 font-sans pt-24 pb-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                {/* Page Header */}
                <div className="text-center mb-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-white rounded-full shadow-sm border border-gray-100 mb-4">
                        <Bell className="w-3.5 h-3.5 text-emerald-500" />
                        <span className="text-xs font-semibold text-emerald-600 uppercase tracking-wide">
                            Stay Updated
                        </span>
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight mb-3">
                        Notice <span className="text-emerald-600">Board</span>
                    </h1>
                    <p className="text-gray-500 max-w-md mx-auto">
                        Latest announcements, exam schedules, and important updates from management.
                    </p>
                </div>

                {/* Search and Filter Section */}
                <div className="mb-8">
                    {/* Search Bar */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-3">
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <input 
                                type="text" 
                                placeholder="Search notices by title or content..." 
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-11 pr-4 py-3 bg-white border-0 rounded-xl outline-none focus:ring-2 focus:ring-emerald-100 transition-all text-gray-700"
                            />
                        </div>
                    </div>

                    {/* Filter Toggle and Categories */}
                    <div className="flex flex-wrap items-center justify-between gap-3">
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            <Filter className="w-3.5 h-3.5" />
                            Filter
                            <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
                        </button>
                        
                        {searchTerm && (
                            <button
                                onClick={() => setSearchTerm('')}
                                className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-500 hover:text-gray-700"
                            >
                                <X className="w-3.5 h-3.5" />
                                Clear search
                            </button>
                        )}
                    </div>

                    {/* Category Filters */}
                    {showFilters && categories.length > 1 && (
                        <div className="mt-3 flex flex-wrap gap-2 pt-2">
                            {categories.map(category => (
                                <button
                                    key={category}
                                    onClick={() => setSelectedCategory(category)}
                                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                                        selectedCategory === category
                                            ? 'bg-emerald-600 text-white shadow-sm'
                                            : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                                    }`}
                                >
                                    {category === 'all' ? 'All Notices' : category}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Results Count */}
                {!loading && filteredNotices.length > 0 && (
                    <div className="mb-5 text-right">
                        <p className="text-xs text-gray-400">
                            Showing <span className="font-medium text-gray-600">{filteredNotices.length}</span> notices
                        </p>
                    </div>
                )}

                {/* Notices List */}
                <div className="space-y-4">
                    {loading ? (
                        // Skeleton Loading State
                        [1, 2, 3].map((i) => (
                            <div key={i} className="bg-white rounded-xl p-6 border border-gray-100 animate-pulse">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="h-6 bg-gray-100 rounded-full w-20"></div>
                                    <div className="h-4 bg-gray-100 rounded w-28"></div>
                                </div>
                                <div className="h-5 bg-gray-100 rounded w-3/4 mb-3"></div>
                                <div className="h-4 bg-gray-100 rounded w-full mb-2"></div>
                                <div className="h-4 bg-gray-100 rounded w-5/6"></div>
                            </div>
                        ))
                    ) : filteredNotices.length > 0 ? (
                        filteredNotices.map((notice) => (
                            <div 
                                key={notice._id} 
                                className="group bg-white rounded-xl p-5 sm:p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200"
                            >
                                <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                                    <div className="flex items-center gap-2">
                                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${getCategoryStyles(notice.category)}`}>
                                            {notice.category || 'General'}
                                        </span>
                                        {notice.category === 'Urgent' && (
                                            <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></div>
                                        )}
                                    </div>
                                    <div className="flex items-center gap-1.5 text-gray-400 text-xs">
                                        <Calendar className="w-3 h-3" />
                                        {new Date(notice.createdAt).toLocaleDateString('en-IN', { 
                                            day: 'numeric', 
                                            month: 'short', 
                                            year: 'numeric' 
                                        })}
                                    </div>
                                </div>

                                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors">
                                    {notice.title}
                                </h3>
                                
                                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                                    {notice.content}
                                </p>

                                <div className="flex items-center gap-1.5 text-gray-400 text-xs">
                                    <Tag className="w-3 h-3" />
                                    <span>Posted by Administration</span>
                                </div>
                            </div>
                        ))
                    ) : (
                        // Empty State
                        <div className="text-center py-16 bg-white rounded-xl shadow-sm border border-gray-100">
                            <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <Bell className="w-8 h-8 text-gray-300" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">No Notices Found</h3>
                            <p className="text-gray-500 max-w-sm mx-auto">
                                {searchTerm || selectedCategory !== 'all' 
                                    ? "No notices match your search criteria. Try adjusting your filters."
                                    : "There are currently no announcements available."}
                            </p>
                            {(searchTerm || selectedCategory !== 'all') && (
                                <button 
                                    onClick={() => {
                                        setSearchTerm('');
                                        setSelectedCategory('all');
                                    }}
                                    className="mt-5 px-4 py-2 bg-emerald-50 text-emerald-600 rounded-lg text-sm font-medium hover:bg-emerald-100 transition-colors"
                                >
                                    Clear All Filters
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PublicNotices;
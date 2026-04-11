import React, { useState, useEffect } from 'react';
import { useApi } from '../context/ApiContext';
import { 
  Award, 
  Plus, 
  Search, 
  Trash2, 
  User, 
  GraduationCap, 
  Star, 
  ArrowRight,
  TrendingUp,
  Image as ImageIcon
} from 'lucide-react';
import toast from 'react-hot-toast';

const Toppers = () => {
    const api = useApi();
    const [toppers, setToppers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const [formData, setFormData] = useState({
        name: '',
        course: '',
        rank: '',
        year: new Date().getFullYear().toString(),
        message: '',
        image: '',
        isFeatured: false
    });

    useEffect(() => {
        fetchToppers();
    }, [api]);

    const fetchToppers = async () => {
        try {
            const { data } = await api.get('/api/toppers');
            setToppers(data.data);
        } catch (error) {
            toast.error('Failed to fetch toppers');
        } finally {
            setLoading(false);
        }
    };

    const handleAddTopper = async (e) => {
        e.preventDefault();
        try {
            await api.post('/api/toppers', formData);
            toast.success('Topper added to the gallery');
            setIsAddModalOpen(false);
            setFormData({ name: '', course: '', rank: '', year: new Date().getFullYear().toString(), message: '', isFeatured: false });
            fetchToppers();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to add topper');
        }
    };

    const handleDeleteTopper = async (id) => {
        if (!window.confirm('Are you sure you want to remove this topper?')) return;
        try {
            await api.delete(`/api/toppers/${id}`);
            toast.success('Topper removed');
            fetchToppers();
        } catch (error) {
            toast.error('Failed to remove topper');
        }
    };

    const filteredToppers = toppers.filter(topper => 
        topper.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        topper.course.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Achievers Gallery</h1>
                    <p className="text-slate-500 font-medium mt-1">Showcase your top performing students</p>
                </div>
                <button 
                    onClick={() => setIsAddModalOpen(true)}
                    className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3.5 rounded-2xl font-bold shadow-lg shadow-emerald-200 transition-all active:scale-[0.98]"
                >
                    <Plus className="w-5 h-5" />
                    <span>Add Achiever</span>
                </button>
            </div>

            {/* Search Bar */}
            <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-sm relative group max-w-2xl">
                <Search className="absolute left-8 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
                <input 
                    type="text" 
                    placeholder="Search by name or course..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-14 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:bg-white focus:border-emerald-500 transition-all text-slate-800 font-medium"
                />
            </div>

            {/* Toppers Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredToppers.length > 0 ? filteredToppers.map((topper) => (
                    <div key={topper._id} className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden group hover:shadow-xl transition-all hover:-translate-y-2">
                        <div className="h-4 bg-emerald-600 w-full"></div>
                        <div className="p-8">
                            <div className="flex justify-between items-start mb-6">
                                <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center font-black text-2xl shadow-inner relative">
                                    {topper.name?.charAt(0) || 'T'}
                                    {topper.isFeatured && (
                                        <div className="absolute -top-2 -right-2 bg-amber-400 text-white p-1 rounded-full shadow-md">
                                            <Star className="w-3 h-3 fill-current" />
                                        </div>
                                    )}
                                </div>
                                <button onClick={() => handleDeleteTopper(topper._id)} className="p-2 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all opacity-0 group-hover:opacity-100">
                                    <Trash2 className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="space-y-1 mb-6">
                                <h3 className="text-xl font-black text-slate-900 tracking-tight">{topper.name}</h3>
                                <p className="text-emerald-600 font-bold text-sm flex items-center gap-1 uppercase tracking-wider">
                                    <GraduationCap className="w-4 h-4" /> {topper.course}
                                </p>
                            </div>
                            {topper.image && (
                                <div className="mb-6">
                                    <img 
                                        src={topper.image} 
                                        alt={topper.name} 
                                        className="w-full h-64 object-cover rounded-3xl shadow-lg"
                                    />
                                </div>
                            )}

                            <div className="bg-slate-50 rounded-4xl p-6 border border-slate-100 mb-6">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Achievement</span>
                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{topper.year}</span>
                                </div>
                                <p className="text-2xl font-black text-slate-900">{topper.rank}</p>
                            </div>

                            {topper.message && (
                                <p className="text-slate-500 text-sm italic font-medium line-clamp-2">"{topper.message}"</p>
                            )}
                        </div>
                    </div>
                )) : (
                    <div className="col-span-full py-20 text-center bg-white rounded-4xl border border-slate-200 border-dashed">
                        <Award className="w-16 h-16 text-slate-200 mx-auto mb-4" />
                        <p className="text-slate-400 font-bold italic">No achievers in your gallery yet</p>
                    </div>
                )}
            </div>

            {/* Add Topper Modal */}
            {isAddModalOpen && (
                <div className="fixed inset-0 z-60 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300" onClick={() => setIsAddModalOpen(false)}></div>
                    <div className="relative bg-white w-full max-w-xl rounded-[2.5rem] p-10 shadow-2xl animate-in zoom-in-95 duration-300">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-2xl font-bold text-slate-900">Add Achiever</h2>
                            <button onClick={() => setIsAddModalOpen(false)} className="p-2 text-slate-400 hover:text-slate-900 bg-slate-50 rounded-xl transition-all"><X /></button>
                        </div>

                        <form onSubmit={handleAddTopper} className="space-y-5">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700 ml-1">Student Name</label>
                                    <input 
                                        type="text" 
                                        placeholder="Full Name"
                                        value={formData.name}
                                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                                        className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 outline-none focus:bg-white focus:border-emerald-500 transition-all font-medium"
                                        required 
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700 ml-1">Course/Program</label>
                                    <input 
                                        type="text" 
                                        placeholder="e.g. IIT-JEE, NEET"
                                        value={formData.course}
                                        onChange={(e) => setFormData({...formData, course: e.target.value})}
                                        className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 outline-none focus:bg-white focus:border-emerald-500 transition-all font-medium"
                                        required 
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700 ml-1">Rank/Score</label>
                                    <input 
                                        type="text" 
                                        placeholder="e.g. AIR 15, 99.8%"
                                        value={formData.rank}
                                        onChange={(e) => setFormData({...formData, rank: e.target.value})}
                                        className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 outline-none focus:bg-white focus:border-emerald-500 transition-all font-medium"
                                        required 
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700 ml-1">Batch Year</label>
                                    <input 
                                        type="text" 
                                        placeholder="2024"
                                        value={formData.year}
                                        onChange={(e) => setFormData({...formData, year: e.target.value})}
                                        className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 outline-none focus:bg-white focus:border-emerald-500 transition-all font-medium"
                                        required 
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700 ml-1">Testimonial (Optional)</label>
                                <textarea 
                                    placeholder="Message from the student..."
                                    value={formData.message}
                                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 outline-none focus:bg-white focus:border-emerald-500 transition-all font-medium h-24 resize-none"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700 ml-1">Image URL (Optional)</label>
                                <input 
                                    type="text" 
                                    placeholder="https://example.com/image.jpg"
                                    value={formData.image}
                                    onChange={(e) => setFormData({...formData, image: e.target.value})}
                                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 outline-none focus:bg-white focus:border-emerald-500 transition-all font-medium"
                                />
                            </div>

                            <button 
                                type="submit" 
                                className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-5 rounded-4xl shadow-xl transform active:scale-[0.98] transition-all flex items-center justify-center gap-3 mt-6"
                            >
                                <span>Add to Hall of Fame</span>
                                <ArrowRight className="w-5 h-5" />
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

const X = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
);

export default Toppers;

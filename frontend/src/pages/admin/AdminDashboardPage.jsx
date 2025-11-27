import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { moduleService } from '../../services/moduleService';
import {
    Plus,
    Edit,
    Trash2,
    Search,
    BookOpen,
    BarChart,
    Clock,
    MoreVertical,
    AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ConfirmationModal from '../../components/ConfirmationModal';

const AdminDashboardPage = () => {
    const navigate = useNavigate();
    const { token } = useAuth();
    const [modules, setModules] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [deleteConfirm, setDeleteConfirm] = useState(null);

    useEffect(() => {
        fetchModules();
    }, []);

    const fetchModules = async () => {
        try {
            setLoading(true);
            const response = await moduleService.getAllModules();
            if (response.success) {
                setModules(response.data);
            }
        } catch (error) {
            console.error('Error fetching modules:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await moduleService.deleteModule(token, id);
            if (response.success) {
                setModules(modules.filter(m => m.id !== id));
                setDeleteConfirm(null);
            } else {
                alert('Failed to delete module: ' + response.message);
            }
        } catch (error) {
            console.error('Error deleting module:', error);
        }
    };

    const filteredModules = modules.filter(module =>
        module.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        module.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-slate-950 text-white p-6 md:p-12">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold mb-2">Module Management</h1>
                        <p className="text-slate-400">Create, update, and organize learning content</p>
                    </div>
                    <button
                        onClick={() => navigate('/admin/modules/new')}
                        className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-indigo-500/25"
                    >
                        <Plus size={20} /> Add New Module
                    </button>
                </div>

                {/* Search Bar */}
                <div className="relative mb-8">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search modules..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-12 pr-4 py-4 bg-slate-900 border border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white placeholder-slate-500 transition-all"
                    />
                </div>

                {/* Modules List */}
                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : (
                    <div className="grid gap-4">
                        <AnimatePresence>
                            {filteredModules.map((module) => (
                                <motion.div
                                    key={module._id || module.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex flex-col md:flex-row items-start md:items-center gap-6 group hover:border-slate-700 transition-all"
                                >
                                    <div className="w-12 h-12 bg-slate-800 rounded-lg flex items-center justify-center text-2xl">
                                        {module.icon}
                                    </div>

                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-1">
                                            <h3 className="text-xl font-bold text-white">{module.title}</h3>
                                            <span className={`text-xs px-2 py-0.5 rounded-full uppercase font-bold tracking-wider ${module.difficulty === 'beginner' ? 'bg-emerald-500/10 text-emerald-400' :
                                                module.difficulty === 'intermediate' ? 'bg-amber-500/10 text-amber-400' :
                                                    'bg-rose-500/10 text-rose-400'
                                                }`}>
                                                {module.difficulty}
                                            </span>
                                        </div>
                                        <p className="text-slate-400 text-sm line-clamp-1">{module.description}</p>

                                        <div className="flex items-center gap-4 mt-3 text-xs text-slate-500 font-medium uppercase tracking-wider">
                                            <span className="flex items-center gap-1"><Clock size={12} /> {module.duration}</span>
                                            <span className="flex items-center gap-1"><BookOpen size={12} /> {module.lessonsCount} Lessons</span>
                                            <span className="flex items-center gap-1">ID: {module.id}</span>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2 w-full md:w-auto mt-4 md:mt-0">
                                        <button
                                            onClick={() => navigate(`/admin/modules/edit/${module._id || module.id}`)}
                                            className="flex-1 md:flex-none px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                                        >
                                            <Edit size={16} /> Edit
                                        </button>

                                        <button
                                            onClick={() => setDeleteConfirm(module._id || module.id)}
                                            className="flex-1 md:flex-none px-4 py-2 bg-slate-800 hover:bg-red-900/30 text-slate-400 hover:text-red-400 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                                        >
                                            <Trash2 size={16} /> Delete
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                )}

                <ConfirmationModal
                    isOpen={!!deleteConfirm}
                    onClose={() => setDeleteConfirm(null)}
                    onConfirm={() => handleDelete(deleteConfirm)}
                    title="Delete Module"
                    message="Are you sure you want to delete this module? This action cannot be undone and will remove all associated lessons and content."
                    confirmText="Delete Module"
                    isDangerous={true}
                />
            </div>
        </div>
    );
};


export default AdminDashboardPage;

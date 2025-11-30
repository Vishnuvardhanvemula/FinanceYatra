import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { moduleService } from '../../services/moduleService';
import { ArrowLeft, Save, Plus, Trash2, GripVertical, Eye, Code } from 'lucide-react';
import ConfirmationModal from '../../components/ConfirmationModal';
import { toast } from 'react-hot-toast';
import LessonContentRenderer from '../../components/LessonContentRenderer';

const ModuleEditorPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { token } = useAuth();
    const isEditMode = !!id;

    const [loading, setLoading] = useState(false);
    const [deleteConfirmation, setDeleteConfirmation] = useState(null);
    const [navigationConfirm, setNavigationConfirm] = useState(false);
    const [isDirty, setIsDirty] = useState(false);
    const [formData, setFormData] = useState({
        id: '',
        title: '',
        description: '',
        icon: '📚',
        difficulty: 'beginner',
        duration: '30 mins',
        lessonsCount: 0,
        topics: [],
        prerequisites: [],
        learningOutcomes: [],
        order: 0,
        isActive: true
    });

    const [topicInput, setTopicInput] = useState('');
    const [outcomeInput, setOutcomeInput] = useState('');
    const [previewModes, setPreviewModes] = useState({}); // { lessonIndex: boolean }

    useEffect(() => {
        const handleBeforeUnload = (e) => {
            if (isDirty) {
                e.preventDefault();
                e.returnValue = '';
            }
        };
        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => window.removeEventListener('beforeunload', handleBeforeUnload);
    }, [isDirty]);

    useEffect(() => {
        if (isEditMode) {
            fetchModule();
        }
    }, [id]);

    const fetchModule = async () => {
        try {
            setLoading(true);
            const response = await moduleService.getAllModules();
            if (response.success) {
                const module = response.data.find(m => m.id === id || m._id === id);
                if (module) {
                    setFormData(module);
                } else {
                    alert('Module not found');
                    navigate('/admin/dashboard');
                }
            }
        } catch (error) {
            console.error('Error fetching module:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
        setIsDirty(true);
    };

    const handleAddItem = (field, value, setter) => {
        if (!value.trim()) return;
        setFormData(prev => ({
            ...prev,
            [field]: [...prev[field], value.trim()]
        }));
        setter('');
        setIsDirty(true);
    };

    const handleRemoveItem = (field, index) => {
        setFormData(prev => ({
            ...prev,
            [field]: prev[field].filter((_, i) => i !== index)
        }));
        setIsDirty(true);
    };

    const handleConfirmDelete = () => {
        if (!deleteConfirmation) return;

        const { type, index, field } = deleteConfirmation;

        if (type === 'lesson') {
            setFormData(prev => ({
                ...prev,
                lessons: prev.lessons.filter((_, i) => i !== index)
            }));
            toast.success('Lesson deleted');
            setIsDirty(true);
        } else if (type === 'item') {
            handleRemoveItem(field, index);
            toast.success('Item deleted');
        }
        setDeleteConfirmation(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Ensure lessonsCount is a number
            const dataToSubmit = {
                ...formData,
                lessonsCount: parseInt(formData.lessonsCount) || 0,
                order: parseInt(formData.order) || 0
            };

            let response;
            if (isEditMode) {
                response = await moduleService.updateModule(token, id, dataToSubmit);
            } else {
                response = await moduleService.createModule(token, dataToSubmit);
            }

            if (response.success) {
                navigate('/admin/dashboard');
            } else {
                alert('Error: ' + response.message);
            }
        } catch (error) {
            console.error('Error saving module:', error);
            alert('Failed to save module');
        } finally {
            setLoading(false);
        }
    };

    if (loading && isEditMode && !formData.id) {
        return (
            <div className="min-h-screen bg-slate-950 flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-950 text-white p-6 md:p-12 pb-32">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="flex items-center gap-4 mb-8">
                    <button
                        onClick={() => navigate('/admin/dashboard')}
                        className="p-2 bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors"
                    >
                        <ArrowLeft size={24} />
                    </button>
                    <h1 className="text-3xl font-bold">
                        {isEditMode ? 'Edit Module' : 'Create New Module'}
                    </h1>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Basic Info */}
                    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-6">
                        <h2 className="text-xl font-bold border-b border-slate-800 pb-4">Basic Information</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-400">Module ID (Unique)</label>
                                <input
                                    type="text"
                                    name="id"
                                    value={formData.id}
                                    onChange={handleChange}
                                    disabled={isEditMode}
                                    required
                                    className="w-full p-3 bg-slate-950 border border-slate-800 rounded-lg focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
                                    placeholder="e.g., module-1"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-400">Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    required
                                    className="w-full p-3 bg-slate-950 border border-slate-800 rounded-lg focus:ring-2 focus:ring-indigo-500"
                                    placeholder="Module Title"
                                />
                            </div>

                            <div className="space-y-2 md:col-span-2">
                                <label className="text-sm font-medium text-slate-400">Description</label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    required
                                    rows={3}
                                    className="w-full p-3 bg-slate-950 border border-slate-800 rounded-lg focus:ring-2 focus:ring-indigo-500"
                                    placeholder="Brief description of the module..."
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-400">Icon (Emoji)</label>
                                <input
                                    type="text"
                                    name="icon"
                                    value={formData.icon}
                                    onChange={handleChange}
                                    className="w-full p-3 bg-slate-950 border border-slate-800 rounded-lg focus:ring-2 focus:ring-indigo-500"
                                    placeholder="e.g., 📚"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-400">Difficulty</label>
                                <select
                                    name="difficulty"
                                    value={formData.difficulty}
                                    onChange={handleChange}
                                    className="w-full p-3 bg-slate-950 border border-slate-800 rounded-lg focus:ring-2 focus:ring-indigo-500"
                                >
                                    <option value="beginner">Beginner</option>
                                    <option value="intermediate">Intermediate</option>
                                    <option value="expert">Expert</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-400">Duration</label>
                                <input
                                    type="text"
                                    name="duration"
                                    value={formData.duration}
                                    onChange={handleChange}
                                    className="w-full p-3 bg-slate-950 border border-slate-800 rounded-lg focus:ring-2 focus:ring-indigo-500"
                                    placeholder="e.g., 30 mins"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-400">Lessons Count</label>
                                <input
                                    type="number"
                                    name="lessonsCount"
                                    value={formData.lessonsCount}
                                    onChange={handleChange}
                                    min="0"
                                    className="w-full p-3 bg-slate-950 border border-slate-800 rounded-lg focus:ring-2 focus:ring-indigo-500"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-400">Order</label>
                                <input
                                    type="number"
                                    name="order"
                                    value={formData.order}
                                    onChange={handleChange}
                                    className="w-full p-3 bg-slate-950 border border-slate-800 rounded-lg focus:ring-2 focus:ring-indigo-500"
                                />
                            </div>

                            <div className="flex items-center gap-3 pt-8">
                                <input
                                    type="checkbox"
                                    name="isActive"
                                    checked={formData.isActive}
                                    onChange={handleChange}
                                    id="isActive"
                                    className="w-5 h-5 rounded border-slate-700 bg-slate-950 text-indigo-600 focus:ring-indigo-500"
                                />
                                <label htmlFor="isActive" className="text-sm font-medium text-slate-300">
                                    Module is Active (Visible to users)
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Topics */}
                    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-6">
                        <h2 className="text-xl font-bold border-b border-slate-800 pb-4">Topics Covered</h2>

                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={topicInput}
                                onChange={(e) => setTopicInput(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddItem('topics', topicInput, setTopicInput))}
                                className="flex-1 p-3 bg-slate-950 border border-slate-800 rounded-lg focus:ring-2 focus:ring-indigo-500"
                                placeholder="Add a topic..."
                            />
                            <button
                                type="button"
                                onClick={() => handleAddItem('topics', topicInput, setTopicInput)}
                                className="bg-slate-800 hover:bg-slate-700 text-white px-4 rounded-lg"
                            >
                                <Plus size={20} />
                            </button>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            {formData.topics.map((topic, index) => (
                                <div key={index} className="bg-indigo-500/10 text-indigo-400 px-3 py-1.5 rounded-lg flex items-center gap-2">
                                    <span>{topic}</span>
                                    <button
                                        type="button"
                                        onClick={() => setDeleteConfirmation({ type: 'item', field: 'topics', index })}
                                        className="hover:text-red-400"
                                    >
                                        <Trash2 size={14} />
                                    </button>
                                </div>
                            ))}
                            {formData.topics.length === 0 && (
                                <p className="text-slate-500 text-sm italic">No topics added yet.</p>
                            )}
                        </div>
                    </div>

                    {/* Learning Outcomes */}
                    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-6">
                        <h2 className="text-xl font-bold border-b border-slate-800 pb-4">Learning Outcomes</h2>

                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={outcomeInput}
                                onChange={(e) => setOutcomeInput(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddItem('learningOutcomes', outcomeInput, setOutcomeInput))}
                                className="flex-1 p-3 bg-slate-950 border border-slate-800 rounded-lg focus:ring-2 focus:ring-indigo-500"
                                placeholder="Add a learning outcome..."
                            />
                            <button
                                type="button"
                                onClick={() => handleAddItem('learningOutcomes', outcomeInput, setOutcomeInput)}
                                className="bg-slate-800 hover:bg-slate-700 text-white px-4 rounded-lg"
                            >
                                <Plus size={20} />
                            </button>
                        </div>

                        <div className="space-y-2">
                            {formData.learningOutcomes.map((outcome, index) => (
                                <div key={index} className="bg-slate-950 border border-slate-800 p-2 rounded-lg flex items-center justify-between group">
                                    <input
                                        type="text"
                                        value={outcome}
                                        onChange={(e) => {
                                            const newOutcomes = [...formData.learningOutcomes];
                                            newOutcomes[index] = e.target.value;
                                            setFormData({ ...formData, learningOutcomes: newOutcomes });
                                            setIsDirty(true);
                                        }}
                                        className="bg-transparent border-none focus:ring-0 text-slate-300 w-full p-1"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setDeleteConfirmation({ type: 'item', field: 'learningOutcomes', index })}
                                        className="text-slate-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity p-2"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            ))}
                            {formData.learningOutcomes.length === 0 && (
                                <p className="text-slate-500 text-sm italic">No learning outcomes added yet.</p>
                            )}
                        </div>
                    </div>

                    {/* Lessons Editor */}
                    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-6">
                        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                            <h2 className="text-xl font-bold">Lessons Content</h2>
                            <button
                                type="button"
                                onClick={() => setFormData(prev => ({
                                    ...prev,
                                    lessons: [...(prev.lessons || []), {
                                        id: (prev.lessons?.length || 0),
                                        title: 'New Lesson',
                                        subtitle: '',
                                        duration: '5 mins',
                                        content: '<p>Start writing content...</p>',
                                        keyPoints: [],
                                        quiz: []
                                    }]
                                }))}
                                className="flex items-center gap-2 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm font-medium transition-colors"
                            >
                                <Plus size={16} /> Add Lesson
                            </button>
                        </div>

                        <div className="space-y-4">
                            {(formData.lessons || []).map((lesson, index) => (
                                <div key={index} className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden">
                                    <div className="p-4 bg-slate-900/50 flex items-center justify-between cursor-pointer" onClick={() => {
                                        const el = document.getElementById(`lesson-content-${index}`);
                                        if (el) el.classList.toggle('hidden');
                                    }}>
                                        <div className="flex items-center gap-3">
                                            <span className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-400">{index + 1}</span>
                                            <span className="font-medium">{lesson.title}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <GripVertical size={16} className="text-slate-600" />
                                            <button
                                                type="button"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setDeleteConfirmation({ type: 'lesson', index });
                                                }}
                                                className="p-1 hover:bg-red-500/10 text-slate-500 hover:text-red-400 rounded transition-colors"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </div>

                                    <div id={`lesson-content-${index}`} className="p-4 space-y-4 border-t border-slate-800 hidden">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <label className="text-xs font-medium text-slate-500">Title</label>
                                                <input
                                                    type="text"
                                                    value={lesson.title}
                                                    onChange={(e) => {
                                                        const newLessons = [...formData.lessons];
                                                        newLessons[index].title = e.target.value;
                                                        setFormData({ ...formData, lessons: newLessons });
                                                        setIsDirty(true);
                                                    }}
                                                    className="w-full p-2 bg-slate-900 border border-slate-700 rounded focus:ring-1 focus:ring-indigo-500 text-sm"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs font-medium text-slate-500">Subtitle</label>
                                                <input
                                                    type="text"
                                                    value={lesson.subtitle}
                                                    onChange={(e) => {
                                                        const newLessons = [...formData.lessons];
                                                        newLessons[index].subtitle = e.target.value;
                                                        setFormData({ ...formData, lessons: newLessons });
                                                        setIsDirty(true);
                                                    }}
                                                    className="w-full p-2 bg-slate-900 border border-slate-700 rounded focus:ring-1 focus:ring-indigo-500 text-sm"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs font-medium text-slate-500">Duration</label>
                                                <input
                                                    type="text"
                                                    value={lesson.duration}
                                                    onChange={(e) => {
                                                        const newLessons = [...formData.lessons];
                                                        newLessons[index].duration = e.target.value;
                                                        setFormData({ ...formData, lessons: newLessons });
                                                        setIsDirty(true);
                                                    }}
                                                    className="w-full p-2 bg-slate-900 border border-slate-700 rounded focus:ring-1 focus:ring-indigo-500 text-sm"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <div className="flex items-center justify-between">
                                                <label className="text-xs font-medium text-slate-500">Content</label>
                                                <div className="flex bg-slate-900 rounded-lg p-1 border border-slate-800">
                                                    <button
                                                        type="button"
                                                        onClick={() => setPreviewModes(prev => ({ ...prev, [index]: false }))}
                                                        className={`px-3 py-1 rounded text-xs font-medium flex items-center gap-1 transition-colors ${!previewModes[index] ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-slate-300'}`}
                                                    >
                                                        <Code size={12} /> Code
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() => setPreviewModes(prev => ({ ...prev, [index]: true }))}
                                                        className={`px-3 py-1 rounded text-xs font-medium flex items-center gap-1 transition-colors ${previewModes[index] ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-slate-300'}`}
                                                    >
                                                        <Eye size={12} /> Preview
                                                    </button>
                                                </div>
                                            </div>

                                            {previewModes[index] ? (
                                                <div className="border border-slate-700 rounded-xl overflow-hidden bg-slate-900/50 min-h-[200px]">
                                                    <div className="p-4">
                                                        <LessonContentRenderer content={lesson.content} />
                                                    </div>
                                                </div>
                                            ) : (
                                                <>
                                                    <textarea
                                                        rows={6}
                                                        value={lesson.content}
                                                        onChange={(e) => {
                                                            const newLessons = [...formData.lessons];
                                                            newLessons[index].content = e.target.value;
                                                            setFormData({ ...formData, lessons: newLessons });
                                                            setIsDirty(true);
                                                        }}
                                                        className="w-full p-2 bg-slate-900 border border-slate-700 rounded focus:ring-1 focus:ring-indigo-500 text-sm font-mono"
                                                    />
                                                    <p className="text-xs text-slate-500">Supports basic HTML tags like &lt;h3&gt;, &lt;p&gt;, &lt;ul&gt;, &lt;li&gt;, &lt;strong&gt;</p>
                                                </>
                                            )}
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-xs font-medium text-slate-500">Key Points (One per line)</label>
                                            <textarea
                                                rows={3}
                                                value={lesson.keyPoints?.join('\n') || ''}
                                                onChange={(e) => {
                                                    const newLessons = [...formData.lessons];
                                                    newLessons[index].keyPoints = e.target.value.split('\n').filter(line => line.trim());
                                                    setFormData({ ...formData, lessons: newLessons });
                                                    setIsDirty(true);
                                                }}
                                                className="w-full p-2 bg-slate-900 border border-slate-700 rounded focus:ring-1 focus:ring-indigo-500 text-sm"
                                                placeholder="Enter key points..."
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-xs font-medium text-slate-500">Quiz Data (JSON)</label>
                                            <textarea
                                                rows={6}
                                                value={JSON.stringify(lesson.quiz || [], null, 2)}
                                                onChange={(e) => {
                                                    const newLessons = [...formData.lessons];
                                                    try {
                                                        newLessons[index].quiz = JSON.parse(e.target.value);
                                                    } catch (err) {
                                                        // Allow typing invalid JSON temporarily
                                                    }
                                                }}
                                                onBlur={(e) => {
                                                    try {
                                                        const json = JSON.parse(e.target.value);
                                                        const newLessons = [...formData.lessons];
                                                        newLessons[index].quiz = json;
                                                        setFormData({ ...formData, lessons: newLessons });
                                                        setIsDirty(true);
                                                    } catch (err) {
                                                        toast.error('Invalid JSON in Quiz Data');
                                                    }
                                                }}
                                                className="w-full p-2 bg-slate-900 border border-slate-700 rounded focus:ring-1 focus:ring-indigo-500 text-sm font-mono"
                                            />
                                            <p className="text-xs text-slate-500">Edit the quiz questions in JSON format.</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {(formData.lessons || []).length === 0 && (
                                <div className="text-center py-8 text-slate-500 border-2 border-dashed border-slate-800 rounded-xl">
                                    <p>No lessons added yet.</p>
                                    <button
                                        type="button"
                                        onClick={() => setFormData(prev => ({
                                            ...prev,
                                            lessons: [{
                                                id: 0,
                                                title: 'Introduction',
                                                subtitle: 'Getting Started',
                                                duration: '5 mins',
                                                content: '<p>Welcome to this module!</p>',
                                                keyPoints: [],
                                                quiz: []
                                            }]
                                        }))}
                                        className="mt-2 text-indigo-400 hover:text-indigo-300 text-sm font-medium"
                                    >
                                        Add First Lesson
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Action Bar */}
                    <div className="fixed bottom-0 left-0 right-0 bg-slate-900/80 backdrop-blur-lg border-t border-slate-800 p-4 z-50">
                        <div className="max-w-4xl mx-auto flex justify-end gap-4">
                            <button
                                type="button"
                                onClick={() => {
                                    if (isDirty) {
                                        setNavigationConfirm(true);
                                    } else {
                                        navigate('/admin/dashboard');
                                    }
                                }}
                                className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-bold transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={loading}
                                className="px-8 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold transition-all shadow-lg shadow-indigo-500/25 flex items-center gap-2"
                            >
                                {loading ? (
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                ) : (
                                    <>
                                        <Save size={20} /> Save Module
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </form>

                <ConfirmationModal
                    isOpen={!!deleteConfirmation}
                    onClose={() => setDeleteConfirmation(null)}
                    onConfirm={handleConfirmDelete}
                    title={`Delete ${deleteConfirmation?.type === 'lesson' ? 'Lesson' : 'Item'}`}
                    message={`Are you sure you want to delete this ${deleteConfirmation?.type}? This action cannot be undone.`}
                    confirmText="Delete"
                    isDangerous={true}
                />

                <ConfirmationModal
                    isOpen={navigationConfirm}
                    onClose={() => setNavigationConfirm(false)}
                    onConfirm={() => navigate('/admin/dashboard')}
                    title="Unsaved Changes"
                    message="You have unsaved changes. Are you sure you want to leave? Your changes will be lost."
                    confirmText="Leave without Saving"
                    cancelText="Keep Editing"
                    isDangerous={true}
                />
            </div>
        </div>
    );
};

export default ModuleEditorPage;

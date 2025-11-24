import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Lock, Play, ChevronRight } from 'lucide-react';

const DataStreamList = ({
    module,
    currentLessonIndex,
    completedLessons,
    onSelectLesson
}) => {
    return (
        <div className="bg-gray-900/80 border border-cyan-500/30 rounded-xl overflow-hidden backdrop-blur-md flex flex-col h-full">
            {/* Header */}
            <div className="p-4 border-b border-gray-800 bg-gray-900/90 flex items-center justify-between">
                <div className="flex items-center gap-2 text-cyan-400 font-mono text-sm tracking-wider">
                    <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse"></div>
                    DATA_STREAM // INCOMING
                </div>
                <div className="text-xs text-gray-500 font-mono">
                    {completedLessons.length}/{module.lessons} SYNCED
                </div>
            </div>

            {/* List Container */}
            <div className="flex-1 overflow-y-auto p-2 space-y-1 custom-scrollbar">
                {Array.from({ length: module.lessons }).map((_, index) => {
                    const isCompleted = completedLessons.includes(index);
                    const isCurrent = currentLessonIndex === index;
                    const isLocked = !isCompleted && index !== 0 && !completedLessons.includes(index - 1);

                    // For demo purposes, let's unlock everything if the user is authenticated, 
                    // or just follow the logic: Locked if previous not completed (unless it's the first one)
                    // Actually, let's stick to the passed logic or simplify for better UX if needed.
                    // Using the logic: Locked if not completed AND not current AND previous not completed.
                    // But usually we allow clicking any lesson if we want, or enforce order.
                    // Let's assume strict order for "Mission" feel, but maybe allow peeking?
                    // For now, visual lock style but clickable if we want to allow jumping (or disable if strict).
                    // Let's keep it clickable but visually distinct, or disabled if strict.
                    // The original code didn't seem to strictly prevent clicking, so we'll keep it open but styled.

                    return (
                        <motion.button
                            key={index}
                            onClick={() => onSelectLesson(index)}
                            initial={false}
                            animate={{
                                backgroundColor: isCurrent
                                    ? 'rgba(6, 182, 212, 0.15)'
                                    : 'transparent',
                                borderColor: isCurrent
                                    ? 'rgba(6, 182, 212, 0.5)'
                                    : 'transparent'
                            }}
                            className={`w-full flex items-center gap-3 p-3 rounded-lg border transition-all group relative overflow-hidden ${isCurrent ? 'border-cyan-500/50' : 'border-transparent hover:bg-gray-800/50 hover:border-gray-700'
                                }`}
                        >
                            {/* Active Indicator Line */}
                            {isCurrent && (
                                <motion.div
                                    layoutId="activeIndicator"
                                    className="absolute left-0 top-0 bottom-0 w-1 bg-cyan-500"
                                />
                            )}

                            {/* Status Icon */}
                            <div className={`flex-shrink-0 ${isCompleted ? 'text-green-400' :
                                    isCurrent ? 'text-cyan-400' :
                                        'text-gray-600'
                                }`}>
                                {isCompleted ? (
                                    <CheckCircle size={18} />
                                ) : isCurrent ? (
                                    <Play size={18} className="fill-current opacity-50" />
                                ) : (
                                    <div className="w-4.5 h-4.5 rounded-full border-2 border-gray-700 flex items-center justify-center text-[10px] font-mono text-gray-500">
                                        {index + 1}
                                    </div>
                                )}
                            </div>

                            {/* Text Content */}
                            <div className="flex-1 text-left">
                                <div className={`text-xs font-mono mb-0.5 ${isCurrent ? 'text-cyan-400' : 'text-gray-500'
                                    }`}>
                                    UNIT_{String(index + 1).padStart(2, '0')}
                                </div>
                                <div className={`text-sm font-medium truncate ${isCurrent ? 'text-white' :
                                        isCompleted ? 'text-gray-300' : 'text-gray-400'
                                    }`}>
                                    {module.topics[index] || `Lesson ${index + 1}`}
                                </div>
                            </div>

                            {/* Chevron / Lock */}
                            <div className="text-gray-600">
                                {isCurrent ? (
                                    <ChevronRight size={16} className="text-cyan-500" />
                                ) : (
                                    <ChevronRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                                )}
                            </div>
                        </motion.button>
                    );
                })}
            </div>

            {/* Footer / Status Line */}
            <div className="p-2 bg-gray-900/50 border-t border-gray-800 text-[10px] font-mono text-gray-600 text-center">
                SYSTEM_READY // WAITING_FOR_INPUT
            </div>
        </div>
    );
};

export default DataStreamList;

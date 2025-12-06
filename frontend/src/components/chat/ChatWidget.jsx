import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, Sparkles, X, Minimize2, Maximize2, History } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../../services/api';

const ChatWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: 'model', text: 'Hi! I am your AI Financial Advisor. Ask me anything about finance!' }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);

    const [sessionId, setSessionId] = useState(null);

    // Refs for scrolling and focus
    const scrollContainerRef = useRef(null);
    const inputRef = useRef(null);

    // Scroll to bottom of chat safely
    const scrollToBottom = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollTo({
                top: scrollContainerRef.current.scrollHeight,
                behavior: 'smooth',
            });
        }
    };

    useEffect(() => {
        scrollToBottom();
        // Prevent page scroll when focusing input
        if (isOpen && inputRef.current) {
            inputRef.current.focus({ preventScroll: true });
        }
    }, [messages, isOpen]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage = input.trim();
        setInput('');
        setMessages((prev) => [...prev, { role: 'user', text: userMessage }]);
        setIsLoading(true);

        try {
            // We only need to send the current message and session ID relative to backend logic.
            // Backend handles history via DB if sessionId is present.
            const response = await api.post('/chat/message', {
                message: userMessage,
                sessionId: sessionId,
                language: 'en', // Default to English, can be enhanced later
            });

            if (response.data) {
                // Save session ID for context continuity
                if (response.data.sessionId) {
                    setSessionId(response.data.sessionId);
                }

                setMessages((prev) => [
                    ...prev,
                    {
                        role: 'model',
                        text: response.data.message || response.data.data?.message,
                        sources: response.data.sources || response.data.data?.sources,
                    },
                ]);
            }
        } catch (error) {
            console.error('Chat Error:', error);
            const errorMsg =
                error.response?.status === 429
                    ? 'You are sending messages too fast. Please wait a moment.'
                    : 'I am connecting to the server. Please try again in 5 seconds.';

            setMessages((prev) => [
                ...prev,
                {
                    role: 'model',
                    text: errorMsg,
                    isError: true,
                },
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-[50000] flex flex-col items-end gap-4 font-sans">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ type: "spring", bounce: 0.3, duration: 0.4 }}
                        className={`${isExpanded
                            ? 'w-[calc(100vw-2rem)] h-[600px] md:w-[600px] md:h-[700px]'
                            : 'w-[calc(100vw-3rem)] h-[500px] md:w-[380px] md:h-[600px] max-h-[70vh]'
                            } bg-[#0f172a] border border-white/10 rounded-3xl shadow-2xl flex flex-col overflow-hidden origin-bottom-right mb-20 md:mb-0`}
                        // Note: mb-20 on mobile to clear the FAB if we wanted to show it, 
                        // but here we just position it above the fab or replace it.
                        // Actually, let's keep the FAB always visible and separate.
                        style={{
                            position: 'fixed',
                            bottom: '5.5rem', // Above the FAB
                            right: '1.5rem',
                            maxWidth: '100vw'
                        }}
                    >
                        {/* Header */}
                        <div className="bg-slate-900/50 backdrop-blur-md p-4 border-b border-white/5 flex items-center justify-between sticky top-0 z-10">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-teal-500 to-blue-500 flex items-center justify-center shadow-lg shadow-teal-500/20">
                                    <Sparkles size={16} className="text-white" fill="white" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-bold text-white">FinanceYatra AI</h3>
                                    <div className="flex items-center gap-1.5">
                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                        <span className="text-[10px] uppercase font-bold text-emerald-500 tracking-wider">Online</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-1">
                                <button
                                    onClick={() => setIsExpanded(!isExpanded)}
                                    className="p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors hidden md:block"
                                    title={isExpanded ? "Collapse" : "Expand"}
                                >
                                    {isExpanded ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
                                </button>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                                >
                                    <X size={18} />
                                </button>
                            </div>
                        </div>

                        {/* Messages Area */}
                        <div
                            ref={scrollContainerRef}
                            className="flex-1 overflow-y-auto p-4 space-y-6 scroll-smooth custom-scrollbar bg-gradient-to-b from-[#0f172a] to-[#020617]"
                        >
                            {messages.map((msg, idx) => (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    key={idx}
                                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div
                                        className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed shadow-sm ${msg.role === 'user'
                                            ? 'bg-blue-600 text-white rounded-tr-sm'
                                            : `bg-slate-800/80 text-slate-200 border border-white/5 rounded-tl-sm ${msg.isError ? 'border-red-500/30 bg-red-900/20' : ''}`
                                            }`}
                                    >
                                        <div className="whitespace-pre-wrap">{msg.text}</div>

                                        {/* Sources/Citations */}
                                        {msg.sources && msg.sources.length > 0 && (
                                            <div className="mt-3 pt-3 border-t border-white/10 flex flex-wrap gap-2">
                                                <div className="flex items-center gap-1 text-[10px] text-slate-400 font-bold uppercase tracking-wider w-full mb-1">
                                                    <History size={10} /> Sources
                                                </div>
                                                {msg.sources.map((source, i) => (
                                                    <span key={i} className="text-[10px] px-2 py-1 rounded-md bg-black/30 text-teal-400 border border-teal-500/20 truncate max-w-[150px]">
                                                        {source}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            ))}

                            {isLoading && (
                                <div className="flex justify-start">
                                    <div className="bg-slate-800/50 rounded-2xl rounded-tl-sm p-4 border border-white/5">
                                        <div className="flex gap-1.5">
                                            {[0, 1, 2].map(i => (
                                                <motion.div
                                                    key={i}
                                                    animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                                                    transition={{ repeat: Infinity, duration: 1, delay: i * 0.2 }}
                                                    className="w-2 h-2 rounded-full bg-teal-400"
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Input Area */}
                        <form onSubmit={handleSubmit} className="p-3 bg-slate-900/80 backdrop-blur-md border-t border-white/5">
                            <div className="relative flex items-center">
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="Type your question..."
                                    className="w-full bg-slate-950/50 border border-white/10 text-white text-sm rounded-xl pl-4 pr-12 py-3.5 focus:outline-none focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/20 transition-all placeholder:text-slate-500"
                                />
                                <button
                                    type="submit"
                                    disabled={!input.trim() || isLoading}
                                    className="absolute right-2 p-2 bg-gradient-to-r from-teal-500 to-blue-500 text-white rounded-lg hover:scale-105 active:scale-95 disabled:opacity-50 disabled:grayscale disabled:pointer-events-none transition-all shadow-lg shadow-blue-500/20"
                                >
                                    <Send size={16} />
                                </button>
                            </div>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Toggle Button */}
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(!isOpen)}
                className="relative w-16 h-16 flex items-center justify-center group"
            >
                {/* Background & Effects Container (Clipped) */}
                <div className="absolute inset-0 rounded-2xl bg-slate-900/80 backdrop-blur-xl border border-indigo-500/30 shadow-[0_0_40px_rgba(99,102,241,0.3)] overflow-hidden transition-all duration-300 group-hover:border-indigo-400/50 group-hover:shadow-[0_0_50px_rgba(99,102,241,0.5)]">
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 via-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Inner glow */}
                    <div className="absolute inset-[2px] rounded-[14px] bg-gradient-to-br from-indigo-500/10 to-purple-500/5" />

                    {/* Shimmer effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                </div>

                {/* Icon (Above Background) */}
                <div className="relative z-10 flex items-center justify-center">
                    {isOpen ? (
                        <X size={24} className="text-indigo-300" />
                    ) : (
                        <MessageCircle size={24} className="text-indigo-400 fill-indigo-500/20" />
                    )}
                </div>

                {/* Notification badge (Outside Clipping) */}
                {!isOpen && (
                    <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 z-20">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-5 w-5 bg-gradient-to-br from-indigo-500 to-purple-600 border-2 border-slate-950 items-center justify-center shadow-lg shadow-indigo-500/50">
                            <span className="w-2 h-2 rounded-full bg-white"></span>
                        </span>
                    </span>
                )}
            </motion.button>
        </div>
    );
};

export default ChatWidget;

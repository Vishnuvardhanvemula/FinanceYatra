import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, Sparkles, ChevronDown, History, Maximize2, Minimize2 } from 'lucide-react';
import api from '../../services/api';

const ChatWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: 'model', text: 'Hi! I am your AI Financial Advisor. Ask me anything about finance!' }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
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
            const history = messages.slice(-5).map((m) => ({
                role: m.role,
                content: m.text,
            }));

            const response = await api.post('/chat/message', {
                message: userMessage,
                history,
            });

            if (response.data) {
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
        <div className="z-50">
            {isOpen && (
                <div
                    className={`${isExpanded
                            ? 'fixed inset-0 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-[800px] md:h-[600px] w-full h-full'
                            : 'fixed inset-0 md:inset-auto md:bottom-20 md:right-6 w-full h-full md:w-[350px] md:h-[600px] md:max-h-[80vh]'
                        } bg-[#0b101b]/95 backdrop-blur-xl md:rounded-3xl shadow-2xl flex flex-col overflow-hidden relative transition-all duration-300 z-50`}
                >
                    <div className="absolute top-0 left-1/4 w-32 h-32 bg-teal-500/20 blur-3xl rounded-full pointer-events-none" />
                    <div className="absolute bottom-0 right-1/4 w-32 h-32 bg-purple-500/20 blur-3xl rounded-full pointer-events-none" />

                    <div className="bg-white/5 border-b border-white/10 p-4 flex justify-between items-center text-white backdrop-blur-md sticky top-0 z-10">
                        <div className="flex items-center gap-3">
                            <div className="bg-gradient-to-br from-teal-400 to-blue-500 p-2.5 rounded-xl shadow-lg shadow-teal-500/20">
                                <MessageCircle size={20} className="text-white" />
                            </div>
                            <div>
                                <h3 className="font-bold text-sm text-white tracking-wide">FinanceYatra AI</h3>
                                <p className="text-[10px] text-teal-300 flex items-center gap-1.5 font-medium uppercase tracking-wider">
                                    <span className="w-1.5 h-1.5 bg-teal-400 rounded-full animate-pulse"></span>
                                    Online
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setIsExpanded(!isExpanded)}
                                className="p-2 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-colors"
                                title={isExpanded ? 'Collapse' : 'Expand'}
                            >
                                {isExpanded ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
                            </button>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-2 hover:bg-red-500/20 hover:text-red-400 rounded-lg text-gray-400 transition-colors"
                            >
                                <ChevronDown size={14} />
                            </button>
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
                        {messages.map((msg, idx) => (
                            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div
                                    className={`max-w-[85%] rounded-2xl p-4 text-sm relative group ${msg.role === 'user'
                                            ? 'bg-gradient-to-br from-teal-500 to-blue-600 text-white rounded-tr-sm shadow-lg shadow-teal-500/10'
                                            : 'bg-white/10 border border-white/10 text-gray-200 rounded-tl-sm backdrop-blur-md'
                                        } ${msg.isError ? 'border-red-500/50 bg-red-500/10 text-red-200' : ''}`}
                                >
                                    <div className="whitespace-pre-wrap leading-relaxed">{msg.text}</div>
                                    {msg.sources && msg.sources.length > 0 && (
                                        <div className="mt-3 pt-3 border-t border-white/10">
                                            <p className="text-[10px] text-gray-400 font-medium mb-1.5 flex items-center gap-1">
                                                <History className="w-3 h-3" /> SOURCES
                                            </p>
                                            <div className="flex flex-wrap gap-1.5">
                                                {msg.sources.map((source, i) => (
                                                    <span
                                                        key={i}
                                                        className="text-[10px] bg-black/20 px-2 py-1 rounded-md text-teal-300/80 border border-teal-500/10"
                                                    >
                                                        {source}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}

                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="bg-white/5 rounded-2xl rounded-tl-sm p-4 border border-white/10">
                                    <div className="flex gap-1.5">
                                        {[0, 1, 2].map((i) => (
                                            <span
                                                key={i}
                                                className="w-1.5 h-1.5 bg-teal-400 rounded-full animate-bounce"
                                                style={{ animationDelay: `${i * 0.2}s` }}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    <form onSubmit={handleSubmit} className="p-4 bg-[#0b101b]/95 border-t border-white/10">
                        <div className="relative group">
                            <div className="absolute inset-0 bg-gradient-to-r from-teal-500/20 to-blue-500/20 rounded-xl blur opacity-0 group-focus-within:opacity-100 transition-opacity" />
                            <input
                                ref={inputRef}
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Ask about crypto, savings, taxes..."
                                className="w-full pl-4 pr-12 py-3.5 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-teal-500/50 focus:bg-white/10 text-white placeholder-gray-500 text-sm transition-all relative z-10"
                            />
                            <button
                                type="submit"
                                disabled={!input.trim() || isLoading}
                                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-teal-500 hover:bg-teal-400 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-teal-500/20 z-10"
                            >
                                <Send size={14} />
                            </button>
                        </div>
                        <div className="text-center mt-2 text-[10px] text-gray-600">
                            AI can make mistakes. Check important info.
                        </div>
                    </form>
                </div>
            )}

            {!isOpen && (
                <div className="fixed bottom-6 right-6 z-50">
                    <button
                        onClick={() => setIsOpen(true)}
                        className="w-14 h-14 rounded-full shadow-[0_0_30px_rgba(45,212,191,0.3)] bg-gradient-to-br from-teal-500 to-blue-600 flex items-center justify-center text-white relative group overflow-hidden hover:scale-105 active:scale-95 transition-transform"
                    >
                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                        <Sparkles size={24} className="animate-pulse" />
                        <span className="absolute -top-1 -right-1 flex h-4 w-4">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500 text-[10px] font-bold items-center justify-center">
                                1
                            </span>
                        </span>
                    </button>
                </div>
            )}
        </div>
    );
};

export default ChatWidget;

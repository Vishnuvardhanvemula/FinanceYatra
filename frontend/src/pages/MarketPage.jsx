import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, TrendingDown, DollarSign, PieChart, Activity, Search, Briefcase, ArrowUpRight, ArrowDownRight, Trophy } from 'lucide-react';
import { getMarketPrices, getPortfolio, executeTrade } from '../services/marketService';
import MarketLeaderboard from '../components/market/MarketLeaderboard';
import { StockPriceChart, PortfolioPieChart } from '../components/market/StockChart';
import toast from 'react-hot-toast';

const MarketPage = () => {
    const [activeTab, setActiveTab] = useState('market'); // 'market' | 'leaderboard'
    const [stocks, setStocks] = useState([]);
    const [portfolio, setPortfolio] = useState(null);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedStock, setSelectedStock] = useState(null);
    const [tradeType, setTradeType] = useState('BUY');
    const [quantity, setQuantity] = useState(1);

    const fetchData = async () => {
        try {
            const [marketData, portfolioData] = await Promise.all([getMarketPrices(), getPortfolio()]);
            setStocks(marketData);
            setPortfolio(portfolioData);
        } catch (error) {
            console.error(error);
            // Don't toast on every poll
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
        const interval = setInterval(fetchData, 10000);
        return () => clearInterval(interval);
    }, []);

    const handleTrade = async (e) => {
        e.preventDefault();
        try {
            await executeTrade({
                symbol: selectedStock.symbol,
                type: tradeType,
                quantity: Number(quantity)
            });
            toast.success(`Successfully ${tradeType === 'BUY' ? 'bought' : 'sold'} ${selectedStock.symbol}`);
            setSelectedStock(null);
            setQuantity(1);
            fetchData();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Trade failed');
        }
    };

    const filteredStocks = stocks.filter(s =>
        s.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return (
        <div className="min-h-screen bg-[#020617] flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#020617] pt-24 pb-12 px-4 sm:px-6 lg:px-8 font-sans text-slate-200">
            <div className="max-w-7xl mx-auto space-y-8">

                {/* Header & Tabs */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div>
                        <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                            <Activity className="text-blue-500" />
                            Market Simulator
                        </h1>
                        <p className="text-slate-400 mt-1">Practice trading with virtual currency. Risk-free.</p>
                    </div>

                    <div className="flex bg-slate-900/50 backdrop-blur-md border border-white/10 p-1 rounded-xl">
                        <button
                            onClick={() => setActiveTab('market')}
                            className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'market' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
                        >
                            Market
                        </button>
                        <button
                            onClick={() => setActiveTab('leaderboard')}
                            className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'leaderboard' ? 'bg-purple-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
                        >
                            Leaderboard
                        </button>
                    </div>
                </div>

                {/* Portfolio Summary Bar */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-slate-900/50 backdrop-blur-md border border-white/10 p-6 rounded-2xl flex items-center gap-4">
                        <div className="p-3 bg-blue-500/10 rounded-xl text-blue-400">
                            <DollarSign size={24} />
                        </div>
                        <div>
                            <p className="text-xs text-slate-400 uppercase tracking-wider">Cash Balance</p>
                            <p className="text-2xl font-bold text-white">${portfolio?.balance?.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
                        </div>
                    </div>
                    <div className="bg-slate-900/50 backdrop-blur-md border border-white/10 p-6 rounded-2xl flex items-center gap-4">
                        <div className="p-3 bg-emerald-500/10 rounded-xl text-emerald-400">
                            <TrendingUp size={24} />
                        </div>
                        <div>
                            <p className="text-xs text-slate-400 uppercase tracking-wider">Net Worth</p>
                            <p className="text-2xl font-bold text-white">${portfolio?.totalValue?.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
                        </div>
                    </div>
                    <div className="bg-slate-900/50 backdrop-blur-md border border-white/10 p-6 rounded-2xl flex items-center gap-4">
                        <div className="p-3 bg-purple-500/10 rounded-xl text-purple-400">
                            <PieChart size={24} />
                        </div>
                        <div>
                            <p className="text-xs text-slate-400 uppercase tracking-wider">Holdings</p>
                            <p className="text-2xl font-bold text-white">{portfolio?.holdings?.length || 0} Stocks</p>
                        </div>
                    </div>
                </div>

                <AnimatePresence mode="wait">
                    {activeTab === 'market' ? (
                        <motion.div
                            key="market"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
                        >
                            {/* Stock Market List */}
                            <div className="lg:col-span-2 space-y-6">
                                <div className="flex justify-between items-center">
                                    <h2 className="text-xl font-bold text-white">Live Market</h2>
                                    <div className="relative">
                                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                                        <input
                                            type="text"
                                            placeholder="Search stocks..."
                                            value={searchTerm}
                                            onChange={e => setSearchTerm(e.target.value)}
                                            className="bg-slate-900 border border-slate-700 rounded-full pl-10 pr-4 py-2 text-sm text-white focus:border-blue-500 outline-none w-64 transition-all focus:w-72"
                                        />
                                    </div>
                                </div>

                                <div className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden">
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                            <tr className="border-b border-white/5 text-slate-400 text-sm uppercase tracking-wider">
                                                <th className="p-4 font-medium">Symbol</th>
                                                <th className="p-4 font-medium">Price</th>
                                                <th className="p-4 font-medium">Trend</th>
                                                <th className="p-4 font-medium text-right">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-white/5">
                                            {filteredStocks.map(stock => (
                                                <tr key={stock.symbol} className="hover:bg-white/5 transition-colors group">
                                                    <td className="p-4">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center font-bold text-white text-xs">
                                                                {stock.symbol[0]}
                                                            </div>
                                                            <div>
                                                                <p className="font-bold text-white">{stock.symbol}</p>
                                                                <p className="text-xs text-slate-500">{stock.name}</p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="p-4 font-mono text-white">
                                                        ${stock.currentPrice.toFixed(2)}
                                                        <span className={`block text-xs ${stock.change24h >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                                                            {stock.change24h >= 0 ? '+' : ''}{stock.change24h.toFixed(2)}%
                                                        </span>
                                                    </td>
                                                    <td className="p-4 w-32">
                                                        <StockPriceChart color={stock.change24h >= 0 ? '#10B981' : '#EF4444'} />
                                                    </td>
                                                    <td className="p-4 text-right">
                                                        <button
                                                            onClick={() => { setSelectedStock(stock); setTradeType('BUY'); }}
                                                            className="px-4 py-2 bg-blue-600/20 hover:bg-blue-600 text-blue-400 hover:text-white rounded-lg transition-all text-sm font-medium"
                                                        >
                                                            Trade
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* Portfolio Side Panel */}
                            <div className="space-y-6">
                                <h2 className="text-xl font-bold text-white">Your Portfolio</h2>
                                <div className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                                    <div className="mb-6">
                                        <PortfolioPieChart holdings={portfolio?.holdings} />
                                    </div>

                                    {portfolio?.holdings.length === 0 ? (
                                        <div className="text-center py-8 text-slate-500">
                                            <Briefcase size={48} className="mx-auto mb-4 opacity-50" />
                                            <p>Your portfolio is empty.</p>
                                        </div>
                                    ) : (
                                        <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                                            {portfolio?.holdings.map(holding => {
                                                const stock = stocks.find(s => s.symbol === holding.symbol);
                                                const currentPrice = stock ? stock.currentPrice : holding.averagePrice;
                                                const currentValue = currentPrice * holding.quantity;
                                                const pl = currentValue - (holding.averagePrice * holding.quantity);
                                                const plPercent = (pl / (holding.averagePrice * holding.quantity)) * 100;

                                                return (
                                                    <div key={holding.symbol} className="bg-slate-800/50 p-4 rounded-xl border border-white/5 hover:border-white/10 transition-colors">
                                                        <div className="flex justify-between items-start mb-2">
                                                            <div>
                                                                <h4 className="font-bold text-white">{holding.symbol}</h4>
                                                                <p className="text-xs text-slate-400">{holding.quantity} shares @ ${holding.averagePrice.toFixed(2)}</p>
                                                            </div>
                                                            <div className={`text-right text-sm font-bold ${pl >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                                                                {pl >= 0 ? '+' : ''}{plPercent.toFixed(2)}%
                                                            </div>
                                                        </div>
                                                        <div className="flex justify-between items-end">
                                                            <p className="text-lg font-mono text-white">${currentValue.toFixed(2)}</p>
                                                            <button
                                                                onClick={() => { setSelectedStock(stock); setTradeType('SELL'); }}
                                                                className="text-xs text-red-400 hover:text-red-300 underline"
                                                            >
                                                                Sell
                                                            </button>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="leaderboard"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                        >
                            <MarketLeaderboard />
                        </motion.div>
                    )}
                </AnimatePresence>

            </div>

            {/* Trade Modal */}
            <AnimatePresence>
                {selectedStock && (
                    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-slate-900 border border-white/10 p-6 rounded-2xl w-full max-w-md shadow-2xl"
                        >
                            <div className="flex justify-between items-center mb-6">
                                <div>
                                    <h2 className="text-2xl font-bold text-white">{selectedStock.symbol}</h2>
                                    <p className="text-slate-400">{selectedStock.name}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-xl font-mono font-bold text-white">${selectedStock.currentPrice.toFixed(2)}</p>
                                    <p className={`text-xs ${selectedStock.change24h >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                                        {selectedStock.change24h >= 0 ? '+' : ''}{selectedStock.change24h.toFixed(2)}%
                                    </p>
                                </div>
                            </div>

                            <div className="flex bg-slate-800 rounded-lg p-1 mb-6">
                                <button
                                    onClick={() => setTradeType('BUY')}
                                    className={`flex-1 py-2 rounded-md font-medium transition-all ${tradeType === 'BUY' ? 'bg-emerald-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
                                >
                                    Buy
                                </button>
                                <button
                                    onClick={() => setTradeType('SELL')}
                                    className={`flex-1 py-2 rounded-md font-medium transition-all ${tradeType === 'SELL' ? 'bg-red-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
                                >
                                    Sell
                                </button>
                            </div>

                            <div className="space-y-4 mb-6">
                                <div>
                                    <label className="block text-sm text-slate-400 mb-1">Quantity</label>
                                    <div className="flex items-center gap-4">
                                        <button
                                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                            className="w-10 h-10 rounded-lg bg-slate-800 border border-slate-700 text-white hover:bg-slate-700 flex items-center justify-center text-xl"
                                        >
                                            -
                                        </button>
                                        <input
                                            type="number"
                                            value={quantity}
                                            onChange={e => setQuantity(Math.max(1, Number(e.target.value)))}
                                            className="flex-1 bg-slate-800 border border-slate-700 rounded-lg h-10 text-center text-white font-mono focus:border-blue-500 outline-none"
                                        />
                                        <button
                                            onClick={() => setQuantity(quantity + 1)}
                                            className="w-10 h-10 rounded-lg bg-slate-800 border border-slate-700 text-white hover:bg-slate-700 flex items-center justify-center text-xl"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>

                                <div className="flex justify-between items-center py-3 border-t border-white/10">
                                    <span className="text-slate-400">Total Amount</span>
                                    <span className="text-xl font-bold text-white">${(selectedStock.currentPrice * quantity).toFixed(2)}</span>
                                </div>

                                {tradeType === 'BUY' && (
                                    <div className="flex justify-between items-center text-xs">
                                        <span className="text-slate-500">Available Cash</span>
                                        <span className={`${portfolio?.balance < (selectedStock.currentPrice * quantity) ? 'text-red-400' : 'text-emerald-400'}`}>
                                            ${portfolio?.balance?.toLocaleString()}
                                        </span>
                                    </div>
                                )}
                            </div>

                            <div className="flex gap-3">
                                <button
                                    onClick={() => { setSelectedStock(null); setQuantity(1); }}
                                    className="flex-1 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl transition-colors font-medium"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleTrade}
                                    className={`flex-1 py-3 text-white rounded-xl transition-colors font-bold shadow-lg ${tradeType === 'BUY' ? 'bg-emerald-600 hover:bg-emerald-500' : 'bg-red-600 hover:bg-red-500'}`}
                                >
                                    Confirm {tradeType}
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

        </div>
    );
};

export default MarketPage;

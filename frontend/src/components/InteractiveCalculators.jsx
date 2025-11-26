import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator, TrendingUp, DollarSign, RefreshCw, PenTool, Check, X, ShieldAlert, Smartphone, CreditCard, AlertCircle, Archive, Mail, Phone, MessageSquare, ShieldCheck, Ban } from 'lucide-react';

// --- Module 4: Compound Interest Calculator ---
export const CompoundInterestCalculator = () => {
    const [principal, setPrincipal] = useState(10000);
    const [rate, setRate] = useState(8);
    const [years, setYears] = useState(10);
    const [result, setResult] = useState(0);

    useEffect(() => {
        const amount = principal * Math.pow((1 + rate / 100), years);
        setResult(Math.round(amount));
    }, [principal, rate, years]);

    const formatCurrency = (val) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 0
        }).format(val);
    };

    return (
        <div className="my-8 relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-amber-500/20 to-purple-500/20 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-1000"></div>
            <div className="relative bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-xl p-6 md:p-8 overflow-hidden">

                {/* Header */}
                <div className="flex items-center gap-3 mb-8 border-b border-white/5 pb-4">
                    <div className="p-2 bg-amber-500/10 rounded-lg border border-amber-500/20">
                        <Calculator className="text-amber-400" size={20} />
                    </div>
                    <div>
                        <h4 className="text-lg font-bold text-white tracking-tight">Compound Interest Lab</h4>
                        <p className="text-xs text-slate-400 font-mono uppercase tracking-widest">Interactive Simulation</p>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Controls */}
                    <div className="space-y-6">
                        {/* Principal Slider */}
                        <div className="space-y-3">
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-400">Initial Investment</span>
                                <span className="text-amber-400 font-mono font-bold">{formatCurrency(principal)}</span>
                            </div>
                            <input
                                type="range"
                                min="1000"
                                max="100000"
                                step="1000"
                                value={principal}
                                onChange={(e) => setPrincipal(Number(e.target.value))}
                                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-500 hover:accent-amber-400 transition-all"
                            />
                        </div>

                        {/* Rate Slider */}
                        <div className="space-y-3">
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-400">Annual Return</span>
                                <span className="text-emerald-400 font-mono font-bold">{rate}%</span>
                            </div>
                            <input
                                type="range"
                                min="1"
                                max="20"
                                step="0.5"
                                value={rate}
                                onChange={(e) => setRate(Number(e.target.value))}
                                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500 hover:accent-emerald-400 transition-all"
                            />
                        </div>

                        {/* Years Slider */}
                        <div className="space-y-3">
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-400">Time Period</span>
                                <span className="text-blue-400 font-mono font-bold">{years} Years</span>
                            </div>
                            <input
                                type="range"
                                min="1"
                                max="40"
                                step="1"
                                value={years}
                                onChange={(e) => setYears(Number(e.target.value))}
                                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500 hover:accent-blue-400 transition-all"
                            />
                        </div>
                    </div>

                    {/* Results Display */}
                    <div className="relative bg-black/40 rounded-xl p-6 flex flex-col justify-center items-center border border-white/5">
                        <div className="absolute top-4 right-4">
                            <TrendingUp className="text-emerald-500/50" size={48} />
                        </div>

                        <div className="text-center space-y-2 relative z-10">
                            <p className="text-slate-500 text-xs uppercase tracking-widest font-bold">Future Value</p>
                            <motion.div
                                key={result}
                                initial={{ scale: 0.9, opacity: 0.5 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="text-4xl md:text-5xl font-bold text-white font-mono tracking-tighter"
                            >
                                {formatCurrency(result)}
                            </motion.div>
                            <div className="flex items-center justify-center gap-2 text-xs text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 mt-2">
                                <span>+ {formatCurrency(result - principal)} Profit</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Helper: Number to Words (Indian System)
const numberToWords = (num) => {
    const a = ['', 'One ', 'Two ', 'Three ', 'Four ', 'Five ', 'Six ', 'Seven ', 'Eight ', 'Nine ', 'Ten ', 'Eleven ', 'Twelve ', 'Thirteen ', 'Fourteen ', 'Fifteen ', 'Sixteen ', 'Seventeen ', 'Eighteen ', 'Nineteen '];
    const b = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

    if ((num = num.toString()).length > 9) return 'overflow';
    const n = ('000000000' + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
    if (!n) return;
    let str = '';
    str += (n[1] != 0) ? (a[Number(n[1])] || b[n[1][0]] + ' ' + a[n[1][1]]) + 'Crore ' : '';
    str += (n[2] != 0) ? (a[Number(n[2])] || b[n[2][0]] + ' ' + a[n[2][1]]) + 'Lakh ' : '';
    str += (n[3] != 0) ? (a[Number(n[3])] || b[n[3][0]] + ' ' + a[n[3][1]]) + 'Thousand ' : '';
    str += (n[4] != 0) ? (a[Number(n[4])] || b[n[4][0]] + ' ' + a[n[4][1]]) + 'Hundred ' : '';
    str += (n[5] != 0) ? ((str != '') ? 'and ' : '') + (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]]) : '';
    return str.trim();
};

// --- Module 1: Cheque Writer Simulation ---
import { useAuth } from '../contexts/AuthContext';

export const ChequeWriter = () => {
    const { user } = useAuth();
    const [payee, setPayee] = useState('');
    const [amount, setAmount] = useState('');
    const [amountWords, setAmountWords] = useState('');
    // const [signerName, setSignerName] = useState(''); // Removed: Account Holder Name
    const [isSigned, setIsSigned] = useState(false);
    const [isValid, setIsValid] = useState(false);
    const [errors, setErrors] = useState([]); // Store validation errors

    const signerName = user?.name || 'Authorized Signatory';

    useEffect(() => {
        const newErrors = [];

        // 1. Basic Field Validation
        if (!payee || payee.length < 3) newErrors.push("Payee name is too short.");
        if (!amount || amount <= 0) newErrors.push("Enter a valid amount.");
        // if (!signerName || signerName.length < 3) newErrors.push("Enter account holder name."); // Removed

        // 2. 'Only' Check
        const wordsTrimmed = amountWords.trim().toLowerCase();
        if (amountWords && !wordsTrimmed.endsWith('only')) {
            newErrors.push("Amount in words must end with 'Only'.");
        }

        // 3. Number vs Words Matching
        if (amount) {
            const correctWords = numberToWords(amount).toLowerCase();
            // Remove 'only' from user input for comparison
            const userWordsBase = wordsTrimmed.replace(/ only$/, '').replace(/\s+/g, ' ');

            // We compare loosely to be forgiving of minor spacing, but strict on words
            if (userWordsBase !== correctWords.toLowerCase()) {
                newErrors.push(`Words don't match amount. Expected: "${numberToWords(amount)} Only"`);
            }
        }

        // 4. Signature Check
        if (!isSigned) {
            newErrors.push("Cheque is not signed.");
        }

        setErrors(newErrors);
        setIsValid(newErrors.length === 0);

    }, [payee, amount, amountWords, isSigned]);

    const handleSign = () => {
        setIsSigned(!isSigned);
    };

    return (
        <div className="my-8 relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-1000"></div>
            <div className="relative bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-xl p-6 overflow-hidden">

                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-blue-500/10 rounded-lg border border-blue-500/20">
                        <PenTool className="text-blue-400" size={20} />
                    </div>
                    <div>
                        <h4 className="text-lg font-bold text-white">Cheque Writer Lab</h4>
                        <p className="text-xs text-slate-400 font-mono uppercase">Practice Banking</p>
                    </div>
                </div>

                {/* Cheque UI */}
                <div className="bg-[#f0f4f8] text-slate-900 p-6 rounded-lg shadow-lg relative font-serif border-l-8 border-blue-900">
                    <div className="absolute top-4 right-6 text-xs font-bold text-slate-500">IFSC: BANK0001234</div>
                    <div className="flex justify-between items-start mb-8">
                        <div className="font-bold text-xl tracking-wider text-blue-900">BANK NAME</div>
                        <div className="border border-slate-400 px-4 py-1 text-sm bg-white">Date: <span className="font-mono">{new Date().toLocaleDateString()}</span></div>
                    </div>

                    <div className="space-y-4 relative z-10">
                        <div className="flex items-end gap-2">
                            <span className="whitespace-nowrap font-semibold text-sm">Pay</span>
                            <input
                                type="text"
                                placeholder="Enter Payee Name"
                                className="w-full bg-transparent border-b-2 border-slate-300 focus:border-blue-600 outline-none px-2 font-handwriting text-lg text-blue-900 placeholder:text-slate-300"
                                value={payee}
                                onChange={(e) => setPayee(e.target.value)}
                            />
                        </div>

                        <div className="flex items-end gap-2">
                            <span className="whitespace-nowrap font-semibold text-sm">Rupees</span>
                            <input
                                type="text"
                                placeholder="Amount in words (must end with 'Only')"
                                className="w-full bg-transparent border-b-2 border-slate-300 focus:border-blue-600 outline-none px-2 font-handwriting text-lg text-blue-900 placeholder:text-slate-300"
                                value={amountWords}
                                onChange={(e) => setAmountWords(e.target.value)}
                            />
                        </div>

                        <div className="flex justify-between items-end mt-4">
                            <div className="border-2 border-slate-300 rounded px-2 py-1 flex items-center gap-1 bg-white">
                                <span className="font-bold text-lg">₹</span>
                                <input
                                    type="number"
                                    placeholder="0000"
                                    className="w-32 outline-none font-bold text-xl text-blue-900 placeholder:text-slate-200"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                />
                            </div>

                            <div className="flex flex-col items-end gap-2">
                                <button
                                    onClick={handleSign}
                                    className={`h-12 w-40 border-b-2 ${isSigned ? 'border-blue-600' : 'border-slate-300'} flex items-center justify-center text-2xl text-blue-900 hover:bg-blue-50 transition-colors`}
                                    style={{ fontFamily: '"Brush Script MT", cursive' }}
                                >
                                    {isSigned ? signerName : <span className="text-xs font-sans text-slate-400" style={{ fontFamily: 'sans-serif' }}>Click to Sign</span>}
                                </button>
                                <span className="text-[10px] text-slate-500 uppercase tracking-widest">Authorized Signatory</span>
                            </div>
                        </div>
                    </div>

                    {/* Watermark */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
                        <div className="text-6xl font-bold text-slate-900 -rotate-12">VOID</div>
                    </div>
                </div>

                {/* Validation Feedback */}
                <div className="mt-6 space-y-2">
                    {isValid ? (
                        <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-lg flex items-center gap-3">
                            <div className="bg-emerald-500/20 p-2 rounded-full">
                                <Check className="text-emerald-400" size={20} />
                            </div>
                            <div>
                                <h5 className="text-emerald-400 font-bold">Cheque is Valid!</h5>
                                <p className="text-slate-400 text-sm">All details are correct. Ready to process.</p>
                            </div>
                        </div>
                    ) : (
                        <div className="p-4 bg-slate-800/50 border border-slate-700 rounded-lg">
                            <h5 className="text-slate-300 font-bold mb-2 flex items-center gap-2">
                                <AlertCircle size={16} className="text-amber-400" />
                                Validation Pending:
                            </h5>
                            <ul className="space-y-1">
                                {errors.map((err, i) => (
                                    <li key={i} className="text-sm text-red-400 flex items-start gap-2">
                                        <span className="mt-1.5 w-1 h-1 rounded-full bg-red-500 shrink-0"></span>
                                        {err}
                                    </li>
                                ))}
                                {errors.length === 0 && <li className="text-sm text-slate-500">Fill all details to validate.</li>}
                            </ul>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};

// --- Module 2: UPI Security Scanner ---
export const UPIScanner = () => {
    const [status, setStatus] = useState('idle'); // idle, scanning, safe, danger

    const scanScenario = () => {
        setStatus('scanning');
        setTimeout(() => {
            // Randomly result in safe or danger
            setStatus(Math.random() > 0.5 ? 'safe' : 'danger');
        }, 2000);
    };

    const reset = () => setStatus('idle');

    return (
        <div className="my-8 relative group max-w-md mx-auto">
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 to-red-500/20 rounded-3xl blur opacity-75 group-hover:opacity-100 transition duration-1000"></div>
            <div className="relative bg-black border-4 border-slate-800 rounded-[2.5rem] p-4 overflow-hidden shadow-2xl">
                {/* Phone Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-900 rounded-b-xl z-20"></div>

                <div className="bg-slate-900 h-96 rounded-2xl relative overflow-hidden flex flex-col items-center justify-center p-6 text-center">

                    {status === 'idle' && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                            <ShieldAlert className="text-slate-500 mx-auto mb-4" size={48} />
                            <h4 className="text-white font-bold text-xl mb-2">UPI Guard</h4>
                            <p className="text-slate-400 text-sm mb-6">Scan incoming payment requests for fraud patterns.</p>
                            <button
                                onClick={scanScenario}
                                className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-full font-bold shadow-lg shadow-blue-500/25 transition-all active:scale-95"
                            >
                                Scan Request
                            </button>
                        </motion.div>
                    )}

                    {status === 'scanning' && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex flex-col items-center"
                        >
                            <div className="relative w-24 h-24 mb-6">
                                <motion.div
                                    className="absolute inset-0 border-4 border-blue-500 rounded-full border-t-transparent"
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                />
                                <Smartphone className="absolute inset-0 m-auto text-blue-400" size={32} />
                            </div>
                            <p className="text-blue-400 font-mono text-sm animate-pulse">Analyzing Sender...</p>
                        </motion.div>
                    )}

                    {status === 'safe' && (
                        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
                            <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-500/50">
                                <Check className="text-emerald-400" size={40} />
                            </div>
                            <h4 className="text-emerald-400 font-bold text-xl mb-2">Verified Safe</h4>
                            <p className="text-slate-400 text-xs mb-6">Sender ID matches known contact. No suspicious patterns detected.</p>
                            <button onClick={reset} className="text-slate-500 hover:text-white text-sm underline">Scan Another</button>
                        </motion.div>
                    )}

                    {status === 'danger' && (
                        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
                            <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-red-500/50">
                                <X className="text-red-400" size={40} />
                            </div>
                            <h4 className="text-red-400 font-bold text-xl mb-2">Fraud Alert!</h4>
                            <p className="text-slate-400 text-xs mb-6">Sender is asking for PIN to "receive" money. Never enter PIN to receive funds.</p>
                            <button onClick={reset} className="text-slate-500 hover:text-white text-sm underline">Scan Another</button>
                        </motion.div>
                    )}

                </div>
            </div>
        </div>
    );
};

// --- Module 3: EMI Master ---
export const EMICalculator = () => {
    const [loanAmount, setLoanAmount] = useState(500000);
    const [interestRate, setInterestRate] = useState(10);
    const [tenure, setTenure] = useState(5); // Years

    const calculateEMI = () => {
        const r = interestRate / 12 / 100;
        const n = tenure * 12;
        const emi = loanAmount * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1);
        return Math.round(emi);
    };

    const totalPayment = calculateEMI() * tenure * 12;
    const totalInterest = totalPayment - loanAmount;

    const formatCurrency = (val) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(val);
    };

    return (
        <div className="my-8 relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-1000"></div>
            <div className="relative bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-xl p-6 md:p-8 overflow-hidden">

                <div className="flex items-center gap-3 mb-8 border-b border-white/5 pb-4">
                    <div className="p-2 bg-purple-500/10 rounded-lg border border-purple-500/20">
                        <CreditCard className="text-purple-400" size={20} />
                    </div>
                    <div>
                        <h4 className="text-lg font-bold text-white">EMI Master</h4>
                        <p className="text-xs text-slate-400 font-mono uppercase">Loan Analyzer</p>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-400">Loan Amount</span>
                                <span className="text-white font-bold">{formatCurrency(loanAmount)}</span>
                            </div>
                            <input
                                type="range" min="100000" max="5000000" step="50000"
                                value={loanAmount} onChange={(e) => setLoanAmount(Number(e.target.value))}
                                className="w-full h-2 bg-slate-700 rounded-lg accent-purple-500"
                            />
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-400">Interest Rate</span>
                                <span className="text-white font-bold">{interestRate}%</span>
                            </div>
                            <input
                                type="range" min="5" max="20" step="0.1"
                                value={interestRate} onChange={(e) => setInterestRate(Number(e.target.value))}
                                className="w-full h-2 bg-slate-700 rounded-lg accent-pink-500"
                            />
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-400">Tenure (Years)</span>
                                <span className="text-white font-bold">{tenure} Years</span>
                            </div>
                            <input
                                type="range" min="1" max="30" step="1"
                                value={tenure} onChange={(e) => setTenure(Number(e.target.value))}
                                className="w-full h-2 bg-slate-700 rounded-lg accent-cyan-500"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col justify-center space-y-4">
                        <div className="bg-white/5 rounded-xl p-4 border border-white/10 text-center">
                            <p className="text-slate-400 text-xs uppercase mb-1">Monthly EMI</p>
                            <div className="text-3xl font-bold text-white tracking-tight">{formatCurrency(calculateEMI())}</div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-emerald-500/10 rounded-xl p-3 border border-emerald-500/20 text-center">
                                <p className="text-emerald-400 text-[10px] uppercase mb-1">Principal</p>
                                <div className="text-lg font-bold text-white">{formatCurrency(loanAmount)}</div>
                            </div>
                            <div className="bg-red-500/10 rounded-xl p-3 border border-red-500/20 text-center">
                                <p className="text-red-400 text-[10px] uppercase mb-1">Total Interest</p>
                                <div className="text-lg font-bold text-white">{formatCurrency(totalInterest)}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- Module 1: Interest Ladder (Savings vs FD) ---
export const InterestLadder = () => {
    const [amount, setAmount] = useState(100000);
    const [years, setYears] = useState(5);
    const savingsRate = 3.5;
    const fdRate = 7.0;

    const savingsTotal = amount * Math.pow((1 + savingsRate / 100), years);
    const fdTotal = amount * Math.pow((1 + fdRate / 100), years);

    const formatCurrency = (val) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(val);
    };

    return (
        <div className="my-8 relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-1000"></div>
            <div className="relative bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-xl p-6 md:p-8 overflow-hidden">

                <div className="flex items-center gap-3 mb-8 border-b border-white/5 pb-4">
                    <div className="p-2 bg-green-500/10 rounded-lg border border-green-500/20">
                        <TrendingUp className="text-green-400" size={20} />
                    </div>
                    <div>
                        <h4 className="text-lg font-bold text-white">The Interest Ladder</h4>
                        <p className="text-xs text-slate-400 font-mono uppercase">Savings vs Fixed Deposit</p>
                    </div>
                </div>

                <div className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-400">Investment Amount</span>
                                <span className="text-white font-bold">{formatCurrency(amount)}</span>
                            </div>
                            <input
                                type="range" min="10000" max="500000" step="10000"
                                value={amount} onChange={(e) => setAmount(Number(e.target.value))}
                                className="w-full h-2 bg-slate-700 rounded-lg accent-green-500"
                            />
                        </div>
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-400">Duration</span>
                                <span className="text-white font-bold">{years} Years</span>
                            </div>
                            <input
                                type="range" min="1" max="10" step="1"
                                value={years} onChange={(e) => setYears(Number(e.target.value))}
                                className="w-full h-2 bg-slate-700 rounded-lg accent-blue-500"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-8 h-64 items-end justify-items-center pb-4 relative">
                        {/* Savings Bar */}
                        <div className="w-full max-w-[120px] flex flex-col items-center gap-2 group/bar z-10">
                            <div className="text-xs text-slate-400 mb-1">Savings ({savingsRate}%)</div>
                            <div className="text-sm font-bold text-white mb-1">{formatCurrency(savingsTotal)}</div>
                            <motion.div
                                className="w-full bg-slate-700 rounded-t-lg relative overflow-hidden"
                                initial={{ height: 0 }}
                                animate={{ height: `${(savingsTotal / (fdTotal * 1.1)) * 100}%` }}
                                transition={{ type: "spring", stiffness: 100, damping: 20 }}
                            >
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-600 to-slate-500 opacity-50"></div>
                            </motion.div>
                            <div className="text-xs text-slate-500 mt-2 font-mono">PROFIT: {formatCurrency(savingsTotal - amount)}</div>
                        </div>

                        {/* FD Bar */}
                        <div className="w-full max-w-[120px] flex flex-col items-center gap-2 group/bar z-10">
                            <div className="text-xs text-emerald-400 mb-1 font-bold">FD ({fdRate}%)</div>
                            <div className="text-sm font-bold text-emerald-300 mb-1">{formatCurrency(fdTotal)}</div>
                            <motion.div
                                className="w-full bg-emerald-500 rounded-t-lg relative overflow-hidden shadow-[0_0_30px_rgba(16,185,129,0.4)]"
                                initial={{ height: 0 }}
                                animate={{ height: `${(fdTotal / (fdTotal * 1.1)) * 100}%` }}
                                transition={{ type: "spring", stiffness: 100, damping: 20 }}
                            >
                                <div className="absolute inset-0 bg-gradient-to-t from-emerald-600 to-emerald-400"></div>
                                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
                            </motion.div>
                            <div className="text-xs text-emerald-400 mt-2 font-mono font-bold">PROFIT: {formatCurrency(fdTotal - amount)}</div>
                        </div>

                        {/* Difference Line */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none opacity-20 md:opacity-100">
                            <div className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">Difference</div>
                            <div className="text-2xl font-bold text-emerald-500">+{formatCurrency(fdTotal - savingsTotal)}</div>
                        </div>
                    </div>

                    <div className="bg-white/5 rounded-lg p-4 text-center text-sm text-slate-300 border border-white/10 flex items-center justify-center gap-3">
                        <div className="p-2 bg-emerald-500/20 rounded-full">
                            <DollarSign className="text-emerald-400" size={16} />
                        </div>
                        <span>
                            Smart Move! You earn <span className="text-emerald-400 font-bold">{formatCurrency((fdTotal - amount) - (savingsTotal - amount))}</span> extra just by switching to FD.
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- Module 1: Scam Spotter (Cyber Security Cell) ---
export const ScamSpotter = () => {
    const [currentScenario, setCurrentScenario] = useState(0);
    const [score, setScore] = useState(0);
    const [feedback, setFeedback] = useState(null); // 'safe' | 'scammed'
    const [glitch, setGlitch] = useState(false);
    const [gameState, setGameState] = useState('playing'); // 'playing' | 'finished'

    const scenarios = [
        {
            id: 1,
            type: 'sms',
            sender: "HDFC-BNK",
            content: "Urgent: Your account ending 4455 is BLOCKED due to pending KYC. Click link to update immediately: http://bit.ly/kyc-update",
            isScam: true,
            loss: "₹50,000",
            reason: "Banks NEVER send shortlinks (bit.ly) or ask for KYC via SMS links."
        },
        {
            id: 2,
            type: 'email',
            sender: "Amazon Official",
            content: "Congratulations! You won an iPhone 15 Pro. Pay ₹999 shipping charges to claim your prize.",
            isScam: true,
            loss: "₹999 + Card Details Stolen",
            reason: "You can't win a contest you didn't enter. Asking for 'shipping fees' is a classic scam."
        },
        {
            id: 3,
            type: 'call',
            sender: "Bank Manager (Unknown Number)",
            content: "Hello, I am calling from your bank. I need your OTP to refund a wrong transaction.",
            isScam: true,
            loss: "Entire Account Balance",
            reason: "Bank officials NEVER ask for OTPs or PINs. Disconnect immediately."
        },
        {
            id: 4,
            type: 'sms',
            sender: "HDFC Bank",
            content: "₹5,000 debited from your A/c XX4455 via UPI. If this wasn't you, call 1800-258-6161.",
            isScam: false,
            loss: "₹0",
            reason: "This is a legitimate alert. The number provided is the official bank support line."
        }
    ];

    const handleDecision = (action) => {
        const scenario = scenarios[currentScenario];
        const isCorrect = (action === 'block' && scenario.isScam) || (action === 'trust' && !scenario.isScam);

        if (isCorrect) {
            setScore(prev => prev + 1);
            setFeedback('safe');
        } else {
            setFeedback('scammed');
            if (scenario.isScam) triggerGlitch();
        }

        setTimeout(() => {
            setFeedback(null);
            if (currentScenario < scenarios.length - 1) {
                setCurrentScenario(prev => prev + 1);
            } else {
                setGameState('finished');
            }
        }, 2500);
    };

    const triggerGlitch = () => {
        setGlitch(true);
        setTimeout(() => setGlitch(false), 500);
    };

    const restartGame = () => {
        setCurrentScenario(0);
        setScore(0);
        setGameState('playing');
        setFeedback(null);
    };

    const activeScenario = scenarios[currentScenario];

    return (
        <div className="my-8 relative group max-w-2xl mx-auto">
            <div className="absolute -inset-1 bg-gradient-to-r from-red-600/20 to-rose-500/20 rounded-xl blur opacity-75 group-hover:opacity-100 transition duration-1000"></div>
            <div className={`relative bg-slate-900 border border-red-500/30 rounded-xl p-6 overflow-hidden ${glitch ? 'animate-pulse' : ''}`}>

                {/* Glitch Overlay */}
                {glitch && (
                    <div className="absolute inset-0 bg-red-500/20 z-50 flex items-center justify-center pointer-events-none mix-blend-overlay">
                        <div className="text-6xl font-black text-red-600 tracking-tighter animate-bounce">HACKED</div>
                    </div>
                )}

                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-2">
                        <div className="bg-red-500/20 p-2 rounded-lg">
                            <ShieldAlert className="text-red-400" size={20} />
                        </div>
                        <div>
                            <h4 className="text-white font-bold">Cyber Cell: Scam Spotter</h4>
                            <p className="text-xs text-slate-400 uppercase">Identify Threats</p>
                        </div>
                    </div>
                    {gameState === 'playing' && (
                        <div className="bg-slate-800 px-4 py-2 rounded-full text-xs text-slate-300 border border-slate-700 shadow-inner">
                            Threats Neutralized: <span className="text-emerald-400 font-bold text-lg ml-1">{score}/{scenarios.length}</span>
                        </div>
                    )}
                </div>

                {gameState === 'playing' ? (
                    <div className="relative min-h-[300px] flex flex-col">
                        {/* Device Frame */}
                        <div className="bg-slate-800 rounded-2xl p-4 border border-slate-700 shadow-2xl mb-6 relative overflow-hidden">
                            {/* Status Bar */}
                            <div className="flex justify-between items-center text-[10px] text-slate-400 mb-4 border-b border-slate-700 pb-2">
                                <span>10:42 AM</span>
                                <div className="flex gap-1">
                                    <span className="w-3 h-3 bg-slate-600 rounded-full"></span>
                                    <span className="w-3 h-3 bg-slate-600 rounded-full"></span>
                                    <span className="w-3 h-3 bg-slate-600 rounded-full"></span>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="flex gap-4 items-start">
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl shrink-0 ${activeScenario.type === 'sms' ? 'bg-green-100 text-green-600' :
                                        activeScenario.type === 'email' ? 'bg-blue-100 text-blue-600' :
                                            'bg-purple-100 text-purple-600'
                                    }`}>
                                    {activeScenario.type === 'sms' && <MessageSquare size={20} />}
                                    {activeScenario.type === 'email' && <Mail size={20} />}
                                    {activeScenario.type === 'call' && <Phone size={20} />}
                                </div>
                                <div>
                                    <h5 className="font-bold text-white text-lg">{activeScenario.sender}</h5>
                                    <p className="text-xs text-slate-400 uppercase mb-2">{activeScenario.type} • Now</p>
                                    <div className="bg-slate-700/50 p-3 rounded-lg text-slate-200 text-sm leading-relaxed border-l-2 border-slate-500">
                                        "{activeScenario.content}"
                                    </div>
                                </div>
                            </div>

                            {/* Feedback Overlay */}
                            <AnimatePresence>
                                {feedback && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0 }}
                                        className={`absolute inset-0 z-20 flex flex-col items-center justify-center text-center p-4 backdrop-blur-md ${feedback === 'safe' ? 'bg-emerald-900/90' : 'bg-red-900/90'}`}
                                    >
                                        <div className="text-5xl mb-2">{feedback === 'safe' ? '🛡️' : '💸'}</div>
                                        <h3 className="text-2xl font-bold text-white mb-1">{feedback === 'safe' ? 'THREAT BLOCKED' : 'YOU GOT SCAMMED!'}</h3>
                                        <p className="text-white/80 text-sm max-w-xs">{feedback === 'scammed' ? `Loss: ${activeScenario.loss}` : 'Good eye! You spotted the scam.'}</p>
                                        <p className="mt-4 text-xs bg-black/30 px-3 py-2 rounded text-white border border-white/10">{activeScenario.reason}</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Controls */}
                        {!feedback && (
                            <div className="grid grid-cols-2 gap-4 mt-auto">
                                <button
                                    onClick={() => handleDecision('block')}
                                    className="bg-red-600 hover:bg-red-500 text-white py-4 rounded-xl font-bold shadow-lg shadow-red-900/50 active:scale-95 transition-all flex flex-col items-center gap-1 border-b-4 border-red-800 active:border-b-0 active:translate-y-1"
                                >
                                    <Ban size={24} />
                                    BLOCK / IGNORE
                                </button>
                                <button
                                    onClick={() => handleDecision('trust')}
                                    className="bg-emerald-600 hover:bg-emerald-500 text-white py-4 rounded-xl font-bold shadow-lg shadow-emerald-900/50 active:scale-95 transition-all flex flex-col items-center gap-1 border-b-4 border-emerald-800 active:border-b-0 active:translate-y-1"
                                >
                                    <ShieldCheck size={24} />
                                    TRUST / CLICK
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="bg-slate-800/50 rounded-lg p-8 mb-6 border border-slate-700 text-center flex flex-col items-center justify-center min-h-[300px]">
                        <div className="text-6xl mb-4">{score === scenarios.length ? '🕵️‍♂️' : '👮‍♂️'}</div>
                        <h4 className="text-2xl font-bold text-white mb-2">Simulation Complete</h4>
                        <p className="text-slate-400 mb-6">You identified <span className="text-emerald-400 font-bold">{score}</span> out of <span className="text-white font-bold">{scenarios.length}</span> threats correctly.</p>

                        <div className="w-full bg-slate-700 h-4 rounded-full overflow-hidden mb-8 max-w-xs">
                            <motion.div
                                className={`h-full ${score === scenarios.length ? 'bg-emerald-500' : 'bg-amber-500'}`}
                                initial={{ width: 0 }}
                                animate={{ width: `${(score / scenarios.length) * 100}%` }}
                                transition={{ duration: 1, delay: 0.5 }}
                            />
                        </div>

                        <button
                            onClick={restartGame}
                            className="bg-white text-slate-900 px-8 py-3 rounded-full font-bold hover:scale-105 transition-transform shadow-xl flex items-center gap-2"
                        >
                            <RefreshCw size={18} /> Replay Simulation
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

// --- Module 1: KYC Detective ---
export const KYCDetective = () => {
    const [currentCase, setCurrentCase] = useState(0);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(null); // 'correct' | 'wrong'
    const [stamp, setStamp] = useState(null); // 'approved' | 'rejected'
    const [gameState, setGameState] = useState('playing'); // 'playing' | 'finished'

    const cases = [
        {
            id: 1,
            name: "Rahul Sharma",
            occupation: "Student",
            docs: ["Aadhaar Card"],
            missing: "PAN Card",
            valid: false,
            reason: "PAN Card is mandatory for Savings Account!"
        },
        {
            id: 2,
            name: "Priya Singh",
            occupation: "Software Engineer",
            docs: ["Driving License", "PAN Card", "Photo"],
            valid: true,
            reason: "Driving License is a valid ID & Address proof. PAN is present."
        },
        {
            id: 3,
            name: "Amit Patel",
            occupation: "Freelancer",
            docs: ["College ID Card", "PAN Card"],
            valid: false,
            reason: "College ID is NOT an Officially Valid Document (OVD) for KYC."
        }
    ];

    const handleDecision = (approved) => {
        const isCorrect = approved === cases[currentCase].valid;
        if (isCorrect) setScore(prev => prev + 1);

        setStamp(approved ? 'approved' : 'rejected');

        setTimeout(() => {
            setShowResult(isCorrect ? 'correct' : 'wrong');
        }, 1000);
    };

    const nextCase = () => {
        setShowResult(null);
        setStamp(null);
        if (currentCase < cases.length - 1) {
            setCurrentCase(currentCase + 1);
        } else {
            setGameState('finished');
        }
    };

    const restartGame = () => {
        setCurrentCase(0);
        setScore(0);
        setGameState('playing');
        setShowResult(null);
        setStamp(null);
    };

    const activeCase = cases[currentCase];

    return (
        <div className="my-8 relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-amber-600/20 to-orange-500/20 rounded-xl blur opacity-75 group-hover:opacity-100 transition duration-1000"></div>
            <div className="relative bg-slate-900 border border-amber-500/30 rounded-xl p-6 overflow-hidden">

                <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-2">
                        <div className="bg-amber-500/20 p-2 rounded-lg">
                            <ShieldAlert className="text-amber-400" size={20} />
                        </div>
                        <div>
                            <h4 className="text-white font-bold">KYC Detective</h4>
                            <p className="text-xs text-slate-400 uppercase">Bank Manager Mode</p>
                        </div>
                    </div>
                    {gameState === 'playing' && (
                        <div className="bg-slate-800 px-4 py-2 rounded-full text-xs text-slate-300 border border-slate-700 shadow-inner">
                            Score: <span className="text-amber-400 font-bold text-lg ml-1">{score}/{cases.length}</span>
                        </div>
                    )}
                </div>

                {gameState === 'playing' ? (
                    <div className="bg-[#2a2a2a] rounded-lg p-6 mb-6 border-4 border-[#3a3a3a] relative shadow-2xl min-h-[300px] flex flex-col items-center">
                        {/* Wood Texture Overlay */}
                        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')] pointer-events-none"></div>

                        <div className="absolute top-4 right-4 text-[10px] text-slate-500 uppercase tracking-widest font-bold bg-black/20 px-2 py-1 rounded">Case File #{activeCase.id}</div>

                        {/* Profile Card */}
                        <div className="bg-white text-slate-900 p-4 rounded shadow-lg rotate-1 w-full max-w-sm mb-6 relative transform transition-transform hover:rotate-0 duration-300">
                            <div className="flex items-start gap-4 border-b-2 border-slate-200 pb-3 mb-3">
                                <div className="w-12 h-12 bg-slate-200 rounded-full flex items-center justify-center text-xl">👤</div>
                                <div>
                                    <h5 className="text-lg font-bold text-slate-800">{activeCase.name}</h5>
                                    <p className="text-xs text-slate-500 uppercase font-bold">{activeCase.occupation}</p>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <p className="text-xs text-slate-500 uppercase font-bold">Submitted Documents:</p>
                                <div className="grid grid-cols-2 gap-2">
                                    {activeCase.docs.map((doc, i) => (
                                        <div key={i} className="bg-blue-50 p-2 rounded border border-blue-100 text-xs font-bold text-blue-800 flex items-center gap-2 shadow-sm">
                                            <span className="text-lg">📄</span> {doc}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Stamps */}
                            <AnimatePresence>
                                {stamp === 'approved' && (
                                    <motion.div
                                        initial={{ scale: 2, opacity: 0, rotate: -20 }}
                                        animate={{ scale: 1, opacity: 1, rotate: -15 }}
                                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-4 border-emerald-600 text-emerald-600 font-black text-4xl px-4 py-2 rounded uppercase tracking-widest opacity-80 mix-blend-multiply pointer-events-none"
                                    >
                                        APPROVED
                                    </motion.div>
                                )}
                                {stamp === 'rejected' && (
                                    <motion.div
                                        initial={{ scale: 2, opacity: 0, rotate: 20 }}
                                        animate={{ scale: 1, opacity: 1, rotate: 15 }}
                                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-4 border-red-600 text-red-600 font-black text-4xl px-4 py-2 rounded uppercase tracking-widest opacity-80 mix-blend-multiply pointer-events-none"
                                    >
                                        REJECTED
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Action Buttons */}
                        {!stamp && (
                            <div className="flex gap-4 mt-auto z-10">
                                <button
                                    onClick={() => handleDecision(false)}
                                    className="bg-red-600 hover:bg-red-500 text-white px-6 py-2 rounded-lg font-bold shadow-lg shadow-red-900/50 active:scale-95 transition-all flex items-center gap-2"
                                >
                                    <X size={18} /> REJECT
                                </button>
                                <button
                                    onClick={() => handleDecision(true)}
                                    className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-2 rounded-lg font-bold shadow-lg shadow-emerald-900/50 active:scale-95 transition-all flex items-center gap-2"
                                >
                                    <Check size={18} /> APPROVE
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="bg-slate-800/50 rounded-lg p-8 mb-6 border border-slate-700 text-center flex flex-col items-center justify-center min-h-[300px]">
                        <div className="text-6xl mb-4">🏆</div>
                        <h4 className="text-2xl font-bold text-white mb-2">Shift Complete!</h4>
                        <p className="text-slate-400 mb-6">You correctly handled <span className="text-amber-400 font-bold">{score}</span> out of <span className="text-white font-bold">{cases.length}</span> cases.</p>

                        <div className="w-full bg-slate-700 h-4 rounded-full overflow-hidden mb-8 max-w-xs">
                            <motion.div
                                className="h-full bg-amber-500"
                                initial={{ width: 0 }}
                                animate={{ width: `${(score / cases.length) * 100}%` }}
                                transition={{ duration: 1, delay: 0.5 }}
                            />
                        </div>

                        <button
                            onClick={restartGame}
                            className="bg-white text-slate-900 px-8 py-3 rounded-full font-bold hover:scale-105 transition-transform shadow-xl flex items-center gap-2"
                        >
                            <RefreshCw size={18} /> Start New Shift
                        </button>
                    </div>
                )}

                {/* Result Feedback Overlay */}
                <AnimatePresence>
                    {showResult && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className={`absolute inset-0 ${showResult === 'correct' ? 'bg-emerald-900/95' : 'bg-red-900/95'} backdrop-blur-md flex flex-col items-center justify-center text-center p-6 z-20`}
                        >
                            <div className="text-6xl mb-4">{showResult === 'correct' ? '🎉' : '😓'}</div>
                            <h4 className="text-white font-bold text-2xl mb-2">{showResult === 'correct' ? 'Excellent Work!' : 'Incorrect Decision'}</h4>
                            <p className="text-white/80 mb-8 max-w-xs mx-auto leading-relaxed">{activeCase.reason}</p>
                            <button
                                onClick={nextCase}
                                className="bg-white text-slate-900 px-8 py-3 rounded-full font-bold text-sm hover:scale-105 transition-transform shadow-xl"
                            >
                                {currentCase < cases.length - 1 ? 'Next Case →' : 'Finish Shift →'}
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};


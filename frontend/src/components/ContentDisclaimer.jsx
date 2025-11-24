/**
 * Content Disclaimer Component
 * "Mission Briefing" Aesthetic
 */

import React from 'react';
import { AlertTriangle, X, ExternalLink, Info, Shield, FileWarning } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ContentDisclaimer = ({ onClose }) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-[#0b101b] border border-yellow-500/30 rounded-xl shadow-[0_0_50px_rgba(234,179,8,0.1)] max-w-2xl w-full max-h-[90vh] overflow-y-auto relative overflow-hidden"
        >
          {/* Background Effects */}
          <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(234,179,8,0.05)_50%,transparent_75%,transparent_100%)] bg-[length:250%_250%] animate-shimmer pointer-events-none" />
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-yellow-500 to-transparent opacity-50" />

          {/* Header */}
          <div className="relative p-6 border-b border-yellow-500/20 bg-yellow-950/10">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/20 shadow-[0_0_15px_rgba(234,179,8,0.2)]">
                  <AlertTriangle className="text-yellow-500" size={24} />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-yellow-500 font-mono tracking-wider flex items-center gap-2">
                    WARNING: SIMULATION_DATA
                  </h2>
                  <p className="text-yellow-500/60 text-xs font-mono mt-1">PROTOCOL_OVERRIDE_REQUIRED</p>
                </div>
              </div>
              {onClose && (
                <button
                  onClick={onClose}
                  className="text-gray-500 hover:text-yellow-500 transition-colors p-2 hover:bg-yellow-500/10 rounded-lg"
                >
                  <X size={24} />
                </button>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6 relative z-10">
            {/* Main Message */}
            <div className="bg-yellow-900/10 border border-yellow-500/20 p-4 rounded-lg">
              <div className="flex items-start gap-3">
                <Info className="text-yellow-500 flex-shrink-0 mt-1" size={20} />
                <div>
                  <p className="font-bold text-yellow-100 font-mono mb-2 text-sm">
                    EDUCATIONAL_PURPOSES_ONLY
                  </p>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    The content in this simulation is generated for <strong className="text-yellow-500">training purposes</strong> and
                    may not reflect current real-world rates, fees, or regulations as of {new Date().toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}.
                  </p>
                </div>
              </div>
            </div>

            {/* What to Verify */}
            <div>
              <h3 className="text-sm font-bold text-cyan-400 font-mono mb-4 flex items-center gap-2 uppercase tracking-wider">
                <Shield size={16} />
                Verification_Protocols
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  { label: 'Interest Rates', desc: 'Verify with bank' },
                  { label: 'Fees & Charges', desc: 'Check service terms' },
                  { label: 'Tax Limits', desc: 'Consult tax advisor' },
                  { label: 'Regulations', desc: 'Review official guidelines' }
                ].map((item, idx) => (
                  <div key={idx} className="bg-gray-900/50 border border-gray-800 p-3 rounded-lg flex items-center gap-3">
                    <div className="w-1 h-8 bg-cyan-500/50 rounded-full" />
                    <div>
                      <div className="text-cyan-100 font-mono text-xs">{item.label}</div>
                      <div className="text-gray-500 text-xs">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Official Sources */}
            <div>
              <h3 className="text-sm font-bold text-cyan-400 font-mono mb-4 flex items-center gap-2 uppercase tracking-wider">
                <ExternalLink size={16} />
                External_Data_Sources
              </h3>
              <div className="space-y-2">
                {[
                  { name: 'Reserve Bank of India (RBI)', desc: 'Banking regulations & guidelines', url: 'https://www.rbi.org.in' },
                  { name: 'DICGC', desc: 'Deposit insurance information', url: 'https://www.dicgc.org.in' },
                  { name: 'Income Tax Department', desc: 'Tax slabs, limits & ITR filing', url: 'https://www.incometax.gov.in' }
                ].map((source, idx) => (
                  <a
                    key={idx}
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 bg-gray-900/30 border border-gray-800 rounded-lg hover:border-cyan-500/50 hover:bg-cyan-950/10 transition-all group"
                  >
                    <div>
                      <div className="font-mono text-sm text-gray-300 group-hover:text-cyan-400 transition-colors">{source.name}</div>
                      <div className="text-xs text-gray-600">{source.desc}</div>
                    </div>
                    <ExternalLink className="text-gray-600 group-hover:text-cyan-500 transition-colors" size={16} />
                  </a>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4 border-t border-gray-800">
              {onClose && (
                <button
                  onClick={onClose}
                  className="flex-1 bg-yellow-600/20 hover:bg-yellow-600/30 text-yellow-500 border border-yellow-500/50 px-6 py-3 rounded-lg transition-all font-mono text-sm font-bold tracking-wider hover:shadow-[0_0_20px_rgba(234,179,8,0.2)]"
                >
                  ACKNOWLEDGE_WARNING
                </button>
              )}
              <a
                href="/CONTENT_ACCURACY_DISCLAIMER.md"
                target="_blank"
                className="flex-1 bg-gray-800 hover:bg-gray-700 text-gray-400 px-6 py-3 rounded-lg transition-colors font-mono text-sm font-bold tracking-wider text-center flex items-center justify-center gap-2"
              >
                <FileWarning size={16} />
                FULL_REPORT
              </a>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ContentDisclaimer;

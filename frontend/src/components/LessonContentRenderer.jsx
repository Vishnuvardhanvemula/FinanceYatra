import React from 'react';
import { motion } from 'framer-motion';
import {
    ChequeWriter,
    EMICalculator,
    InterestLadder,
    ScamSpotter,
    KYCDetective,
    UPIScanner,
    CompoundInterestCalculator
} from './InteractiveCalculators';

const LessonContentRenderer = ({ content }) => {
    if (!content) return null;

    // Map placeholders to components
    const componentMap = {
        '[CHEQUE_WRITER]': <ChequeWriter />,
        '[EMI_CALCULATOR]': <EMICalculator />,
        '[INTEREST_LADDER]': <InterestLadder />,
        '[ATM_SIMULATOR]': <ScamSpotter />,
        '[SCAM_SPOTTER]': <ScamSpotter />,
        '[KYC_DETECTIVE]': <KYCDetective />,
        '[UPI_SCANNER]': <UPIScanner />,
        '[COMPOUND_INTEREST]': <CompoundInterestCalculator />
    };

    // Split content by placeholders
    const parts = content.split(/(\[.*?\])/g);

    const processContent = (html) => {
        if (!html) return '';

        let processed = html;

        // 1. Enhance Headers with Gradients
        processed = processed.replace(
            /<h2>/g,
            '<h2 class="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-200 via-white to-slate-200 mb-6 mt-10 tracking-tight">'
        );
        processed = processed.replace(
            /<h3>/g,
            '<h3 class="text-xl font-bold text-white mb-4 mt-8 flex items-center gap-2"><span class="w-1 h-6 bg-indigo-500 rounded-full"></span>'
        );

        // 2. Style Paragraphs
        processed = processed.replace(
            /<p>/g,
            '<p class="text-slate-300 leading-relaxed mb-6 text-lg font-light">'
        );

        // 3. Custom List Styling
        processed = processed.replace(
            /<ul>/g,
            '<ul class="space-y-4 my-8 pl-2">'
        );

        // Replace list items to have custom checkmarks/bullets
        // We use a regex that matches the li content to wrap it safely if needed, 
        // but simple tag replacement is often enough for styling the container.
        // However, to add a custom icon *inside*, we need to prepend it.
        processed = processed.replace(
            /<li>/g,
            '<li class="flex items-start gap-4 text-slate-300 bg-slate-800/20 p-4 rounded-xl border border-slate-800/50 hover:border-indigo-500/30 transition-colors"><span class="mt-1 w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)] flex-shrink-0"></span><span>'
        ).replace(/<\/li>/g, '</span></li>');

        // 4. Upgrade "Pro Tip" / Callout Boxes
        // Target specific tailwind classes used in the data or common wrapper patterns
        // Replacing the specific old class string with a new premium one
        const oldBoxClass = 'class="bg-slate-800/50 p-4 rounded-xl border border-amber-500/20 my-4"';
        const newBoxClass = 'class="relative bg-gradient-to-br from-slate-900/80 to-slate-900/40 p-6 rounded-2xl border border-amber-500/20 my-8 backdrop-blur-md shadow-xl overflow-hidden group"';

        processed = processed.replace(new RegExp(oldBoxClass, 'g'), newBoxClass);

        // 5. Inject Icons & Styles for Keywords
        const iconMap = {
            'Did You Know': { icon: '💡', color: 'text-amber-400' },
            'Pro Tip': { icon: '🚀', color: 'text-cyan-400' },
            'Security Alert': { icon: '🛡️', color: 'text-rose-400' },
            'Key Concept': { icon: '🔑', color: 'text-emerald-400' }
        };

        for (const [key, config] of Object.entries(iconMap)) {
            const pattern = new RegExp(`(<strong>${key}:<\/strong>)`, 'g');
            processed = processed.replace(
                pattern,
                `<div class="flex items-center gap-3 mb-2 font-bold uppercase tracking-wider text-sm ${config.color}">
                    <span class="text-lg filter drop-shadow-md">${config.icon}</span> 
                    <span>${key}</span>
                 </div>
                 <div class="text-slate-300 pl-1">`
            );
            // We might need to close the div if we opened one, but regex replacement is tricky for structure.
            // Instead, let's just styling the strong tag itself to be a block component header
        }

        // Simpler approach for keywords: Make them stand out as badges
        for (const [key, config] of Object.entries(iconMap)) {
            // Look for the pattern <strong>Key:</strong> and style it
            const pattern = new RegExp(`<strong>${key}:<\/strong>`, 'g');
            processed = processed.replace(
                pattern,
                `<span class="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-slate-800 border border-slate-700 ${config.color} text-sm font-bold uppercase tracking-wide mb-2 shadow-lg hover:scale-105 transition-transform cursor-default">
                    <span>${config.icon}</span> ${key}
                  </span>`
            );
        }

        return processed;
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-4xl mx-auto"
        >
            {parts.map((part, index) => {
                if (componentMap[part]) {
                    return (
                        <div key={index} className="my-12 transform hover:scale-[1.01] transition-all duration-500 shadow-2xl rounded-2xl overflow-hidden ring-1 ring-white/10">
                            {componentMap[part]}
                        </div>
                    );
                }
                if (!part.trim()) return null;

                return (
                    <div
                        key={index}
                        // Removing prose to have full control with our injected classes
                        className="font-sans"
                        dangerouslySetInnerHTML={{ __html: processContent(part) }}
                    />
                );
            })}
        </motion.div>
    );
};

export default LessonContentRenderer;

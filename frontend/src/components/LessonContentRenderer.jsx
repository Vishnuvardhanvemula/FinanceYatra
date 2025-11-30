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
        '[ATM_SIMULATOR]': <ScamSpotter />, // Keeping old tag for backward compatibility if needed, but preferred new tag
        '[SCAM_SPOTTER]': <ScamSpotter />,
        '[KYC_DETECTIVE]': <KYCDetective />,
        '[UPI_SCANNER]': <UPIScanner />,
        '[COMPOUND_INTEREST]': <CompoundInterestCalculator />
    };

    // Split content by placeholders
    const parts = content.split(/(\[.*?\])/g);

    const processContent = (html) => {
        if (!html) return '';

        // 1. Wrap "Did You Know" / "Pro Tip" boxes in a specific class
        // We look for the specific tailwind classes used in the data
        let processed = html.replace(
            /class="bg-slate-800\/50 p-4 rounded-xl border border-amber-500\/20 my-4"/g,
            'class="pro-tip-box"'
        );

        // 2. Inject Icons for specific keywords
        // We use a simple replace for known patterns to be safe
        const iconMap = {
            'Did You Know': '💡',
            'Pro Tip': '🚀',
            'Security Alert': '🛡️',
            'Key Concept': '🔑'
        };

        for (const [key, icon] of Object.entries(iconMap)) {
            const pattern = new RegExp(`(<strong>${key}:<\/strong>)`, 'g');
            processed = processed.replace(pattern, `<span class="pro-tip-icon">${icon}</span> $1`);
        }

        return processed;
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="card-glass p-6 md:p-8 lesson-content-styled"
        >
            {parts.map((part, index) => {
                if (componentMap[part]) {
                    return (
                        <div key={index} className="my-10 transform hover:scale-[1.02] transition-transform duration-300">
                            {componentMap[part]}
                        </div>
                    );
                }
                // Only render non-empty HTML strings
                if (!part.trim()) return null;

                return (
                    <div
                        key={index}
                        className="prose prose-invert max-w-none"
                        dangerouslySetInnerHTML={{ __html: processContent(part) }}
                    />
                );
            })}
        </motion.div>
    );
};

export default LessonContentRenderer;

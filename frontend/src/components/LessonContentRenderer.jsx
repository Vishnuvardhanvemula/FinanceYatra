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

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="card-glass p-6 md:p-8"
        >
            {parts.map((part, index) => {
                if (componentMap[part]) {
                    return <div key={index} className="my-8">{componentMap[part]}</div>;
                }
                // Only render non-empty HTML strings
                if (!part.trim()) return null;

                return (
                    <div
                        key={index}
                        className="lesson-content prose prose-invert max-w-none"
                        dangerouslySetInnerHTML={{ __html: part }}
                    />
                );
            })}
        </motion.div>
    );
};

export default LessonContentRenderer;

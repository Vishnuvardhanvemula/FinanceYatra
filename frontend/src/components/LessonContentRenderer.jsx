import React from 'react';

const LessonContentRenderer = ({ content }) => {
    return (
        <div
            className="
        lesson-content max-w-none
        /* Headings */
        [&_h3]:text-3xl [&_h3]:font-bold [&_h3]:text-cyan-300 
        [&_h3]:mb-6 [&_h3]:mt-8 [&_h3]:pb-4 
        [&_h3]:border-b-2 [&_h3]:border-cyan-900/50
        
        [&_h4]:text-xl [&_h4]:font-semibold [&_h4]:text-teal-400 
        [&_h4]:mb-4 [&_h4]:mt-6 [&_h4]:pl-4 [&_h4]:py-2
        [&_h4]:bg-gradient-to-r [&_h4]:from-teal-900/30 [&_h4]:to-transparent
        [&_h4]:border-l-4 [&_h4]:border-teal-500 [&_h4]:rounded-r-lg
        
        /* Paragraphs */
        [&_p]:text-slate-300 [&_p]:leading-relaxed [&_p]:mb-4 [&_p]:text-base
        
        /* Lists */
        [&_ul]:space-y-2 [&_ul]:my-4
        [&_li]:text-slate-300 [&_li]:ml-6 [&_li]:leading-relaxed
        [&_li::marker]:text-cyan-400 [&_li::marker]:text-lg
        
        [&_ol]:list-decimal [&_ol]:ml-6 [&_ol]:space-y-2 [&_ol]:my-4
        [&_ol]:bg-slate-900/30 [&_ol]:p-4 [&_ol]:rounded-lg
        [&_ol]:border-l-4 [&_ol]:border-purple-500
        
        /* Strong/Bold */
        [&_strong]:text-white [&_strong]:font-semibold 
        [&_strong]:bg-slate-800/40 [&_strong]:px-1.5 [&_strong]:py-0.5
        [&_strong]:rounded [&_strong]:text-sm
        
        /* Tables */
        [&_table]:w-full [&_table]:border [&_table]:border-slate-700 
        [&_table]:rounded-lg [&_table]:overflow-hidden [&_table]:my-6
        [&_table]:shadow-lg
        [&_thead]:bg-cyan-900/30
        [&_th]:text-cyan-300 [&_th]:font-semibold [&_th]:p-3 
        [&_th]:border-b-2 [&_th]:border-cyan-700 [&_th]:text-left
        [&_td]:p-3 [&_td]:border [&_td]:border-slate-700/50
        [&_tr:hover]:bg-slate-800/30 [&_tbody_tr]:transition-colors
      "
            dangerouslySetInnerHTML={{ __html: content }}
        />
    );
};

export default LessonContentRenderer;

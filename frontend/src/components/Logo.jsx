import React from 'react';

// Logo component shows a center-cropped square of an app artwork.
// Place your source image at `public/assets/logo-source.png` (or adjust path below).
// The component crops via CSS (object-fit/object-position) so you don't need to pre-crop.

import logoAsset from '../assets/logo-source.png';

export default function Logo({ size = 40, alt = 'FinanceYatra', asLink = true }) {
  // Use the provided raster/SVG asset inside the gradient framed square.
  // Icon fixed to h-10 w-10 and gap reduced to 3 (Tailwind `gap-3`).
  const content = (
    <div className="group inline-flex items-center gap-3 no-underline">
      <div className="h-10 w-10 rounded-lg flex items-center justify-center transform transition-transform duration-200 group-hover:-translate-y-0.5 shadow-md group-hover:shadow-2xl shadow-teal-500/20" style={{ background: 'transparent' }}>
        <img src={logoAsset} alt={alt} className="w-full h-full object-contain" draggable={false} />
      </div>

      <div className="flex items-baseline select-none">
        <span className="text-white font-bold tracking-tight" style={{ fontFamily: "Plus Jakarta Sans, Inter, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial", fontSize: 18 }}>Finance</span>
        <span className="ml-1 text-teal-400 font-semibold tracking-tight" style={{ fontFamily: "Plus Jakarta Sans, Inter, system-ui, -apple-system, 'Segoe UI'", fontSize: 18 }}>Yatra</span>
      </div>
    </div>
  );

  if (asLink) {
    return (
      <a href="/" aria-label="Finance Yatra home" className="no-underline">
        {content}
      </a>
    );
  }

  return content;
}

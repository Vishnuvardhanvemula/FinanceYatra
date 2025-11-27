import React from 'react';

// Logo component shows a center-cropped square of an app artwork.
// Place your source image at `public/assets/logo-source.png` (or adjust path below).
// The component crops via CSS (object-fit/object-position) so you don't need to pre-crop.

import logoAsset from '../assets/logo.png';

export default function Logo({ size = 40, alt = 'FinYatra', asLink = true }) {
  // Use the provided raster/SVG asset inside the gradient framed square.
  // Icon fixed to h-10 w-10 and gap reduced to 3 (Tailwind `gap-3`).
  const content = (
    <div className="group inline-flex items-center gap-3 no-underline">
      <div className="h-12 w-12 rounded-lg flex items-center justify-center transform transition-transform duration-200 group-hover:-translate-y-0.5 shadow-md group-hover:shadow-2xl shadow-teal-500/20" style={{ background: 'transparent' }}>
        <img src={logoAsset} alt={alt} className="w-full h-full object-contain" draggable={false} />
      </div>

      <div className="flex items-baseline select-none">
        <span className="text-white font-bold tracking-tight" style={{ fontFamily: "Plus Jakarta Sans, Inter, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial", fontSize: 20 }}>FinYatra</span>
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

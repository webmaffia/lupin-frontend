'use client';

import { useEffect, useState } from 'react';

export default function GlobalPresenceMap() {
  const [svgContent, setSvgContent] = useState(null);

  useEffect(() => {
    // Load SVG content
    fetch('/assets/global-presence/Map ok bro.svg')
      .then(res => res.text())
      .then(svg => {
        setSvgContent(svg);
      })
      .catch(err => console.error('Error loading SVG:', err));
  }, []);

  if (!svgContent) {
    return (
      <div style={{ width: '100%', position: 'relative', minHeight: '400px' }}>
        <div style={{ textAlign: 'center', padding: '50px' }}>Loading map...</div>
      </div>
    );
  }

  return (
    <div style={{ width: '100%', position: 'relative' }}>
      <div 
        dangerouslySetInnerHTML={{ __html: svgContent }}
        style={{ width: '100%', height: 'auto' }}
      />
    </div>
  );
}

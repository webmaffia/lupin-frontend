'use client';

import React from 'react';
import Link from 'next/link';
import '@/scss/components/community/FoundationLink.scss';

export default function FoundationLink({ linkData = null }) {
  // Default content if not provided (based on Figma design)
  const defaultContent = {
    text: "To learn about Lupin's on-ground impact on local communities, visit ",
    linkText: "Lupin Human Welfare and Research Foundation",
    linkUrl: "https://www.lupinfoundation.in/"
  };

  const content = linkData || defaultContent;

  return (
    <section className="foundation-link">
      <div className="foundation-link__container">
        <p className="foundation-link__text">
          {content.text}
          <Link 
            href={content.linkUrl} 
            className="foundation-link__link"
            target="_blank"
            rel="noopener noreferrer"
          >
            {content.linkText}
          </Link>
        </p>
      </div>
    </section>
  );
}


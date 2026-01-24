'use client';

import React from 'react';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import KeyHighlights from '@/components/community/KeyHighlights';
import '@/scss/components/community/LivesProgram.scss';

export default function LivesProgram({ programData = null }) {
  if (!programData) {
    return null;
  }

  const content = programData;

  return (
    <section className="lives-program">
      <div className="lives-program__container">
        <div className="lives-program__content">
          <div className="lives-program__left">
            <div className="lives-program__title-section">
              {content.title && (
                <h2 className="lives-program__title">
                  {content.title}
                </h2>
              )}
              {content.subtitle && (
                <h3 className="lives-program__subtitle">
                  {content.subtitle}
                </h3>
              )}
            </div>
            {content.description && (
              <div className="lives-program__text">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeRaw]}
                >
                  {content.description}
                </ReactMarkdown>
              </div>
            )}
            {content.content && content.content.length > 0 && !content.description && (
              <div className="lives-program__text">
                {content.content.map((item, index) => (
                  <div key={index} className="lives-program__item">
                    {item.type === 'heading' && (
                      <h3 className="lives-program__heading">{item.text}</h3>
                    )}
                    {item.type === 'paragraph' && (
                      <p className="lives-program__paragraph">{item.text}</p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
          {content.image && (
            <div className="lives-program__right">
              <Image
                src={content.image.url}
                alt={content.image.alt || "Lives Program"}
                width={content.image.width || 872}
                height={content.image.height || 600}
                className="lives-program__image"
                quality={100}
              />
            </div>
          )}
        </div>
        {content.highlights && content.highlights.length > 0 && (
          <div className="lives-program__highlights">
            <KeyHighlights highlights={content.highlights.map((highlight) => ({
              id: highlight.id,
              number: highlight.value.toString(),
              description: highlight.description,
              icon: highlight.icon
            }))} />
          </div>
        )}
      </div>
    </section>
  );
}


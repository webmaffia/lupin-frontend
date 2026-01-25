'use client';

import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import '@/scss/pages/community.scss';

export default function LivelihoodSection({ livelihoodData = null }) {
  if (!livelihoodData) {
    return null;
  }

  const data = livelihoodData;

    const CustomParagraph = ({ children }) => {
    return <p className="community-livelihood__paragraph">{children}</p>;
  }

  return (
    <section className="community-livelihood">
      <div className="community-livelihood__bg">
        <picture>
          {data.backgroundImage && (
            <img
              src={data.backgroundImage}
              alt="Livelihood"
              className="community-livelihood__bg-image"
            />
          )}
        </picture>
      </div>
      <div className="community-livelihood__container">
        <div className="community-livelihood__content">
          {data.heading && (
            <h2 className="community-livelihood__heading">
              {data.heading}
            </h2>
          )}
          <div className="community-livelihood__text">
            {data.subheading && (
              <h3 className="community-livelihood__subheading">
                {data.subheading}
              </h3>
            )}
            <div className="community-livelihood__paragraphs">
              {data.description ? (
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeRaw]}
                  components={{
                    p: CustomParagraph,
                  }}
                >
                  {data.description}
                </ReactMarkdown>
              ) : data.paragraphs && data.paragraphs.length > 0 ? (
                data.paragraphs.map((paragraph, index) => (
                  <p key={index} className="community-livelihood__paragraph">
                    {paragraph}
                  </p>
                ))
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


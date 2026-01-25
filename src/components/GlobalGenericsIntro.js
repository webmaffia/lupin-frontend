'use client';

import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import '../scss/components/GlobalGenericsIntro.scss';

export default function GlobalGenericsIntro({ data }) {
  const defaultData = {
    content: [
      "The global generics market is a critical pillar of modern healthcare, enabling greater access to high-quality, affordable medication to patients across major markets globally.",
      "A study by IQVIA projects that by 2029, about $220 billion in branded drug sales will lose exclusivity, creating substantial opportunities for the generic segment. This wave of patent expiries is driving increased demand for affordable, high-quality generics across key markets. Lupin has leveraged this opportunity and is positioned as a leading player in global generics."
    ]
  };

  const introData = data || defaultData;
  const content = introData?.content || introData?.paragraphs || introData?.text || defaultData.content;

  const CustomParagraph = ({ children }) => {
    return <p className="global-generics-intro__paragraph">{children}</p>;
  };

  return (
    <section className="global-generics-intro" data-node-id="3112:602">
      <div className="global-generics-intro__container">
        <div className="global-generics-intro__content">
          {Array.isArray(content) ? (
            content.map((paragraph, index) => (
              <ReactMarkdown
                key={index}
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
                components={{
                  p: CustomParagraph,
                }}
              >
                {paragraph}
              </ReactMarkdown>
            ))
          ) : (
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw]}
              components={{
                p: CustomParagraph,
              }}
            >
              {content}
            </ReactMarkdown>
          )}
        </div>
        <div className="global-generics-intro__line">
          <div className="global-generics-intro__line-pointer">
            <Image
              src="/assets/images/global-generic/smallicon2.svg"
              alt=""
              width={48}
              height={48}
              quality={100}
            />
          </div>
        </div>
      </div>
    </section>
  );
}


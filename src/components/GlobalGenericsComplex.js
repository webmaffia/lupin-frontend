'use client';

import Image from 'next/image';
import '../scss/components/GlobalGenericsComplex.scss';

export default function GlobalGenericsComplex({ data }) {
  const defaultData = {
    content: [
      "Within the generics business, Lupin has centered its strategic growth on Complex Generics, that are generics with multi-faceted dynamic constituents, formulations or path of administration, particularly in the inhalation and injectable space. In the U.S. alone, complex generics now account for 35% of our revenues and are projected to reach 49% by FY30, supported by a robust pipeline.",
      "As per a study the global inhalation market is projected to reach about USD 49.09 billion by 2030, and another study claims that the injectables market is projected to reach around US $401.8 billion by 2035. Lupin has established a strong foothold in both inhalation and injectable segments, leveraging its differentiated capabilities and robust pipeline to drive growth."
    ],
    image: {
      url: "/assets/images/global-generic/Firefly_Gemini Flash_Premium pharmaceutical visual showing advanced inhalation devices and injectable vial 159471 1.png",
      alt: "Pharmaceutical visual showing advanced inhalation devices and injectable vial"
    }
  };

  const complexData = data || defaultData;
  const content = complexData?.content || complexData?.paragraphs || complexData?.text || defaultData.content;
  const imageUrl = complexData?.image?.url || complexData?.image || defaultData.image.url;
  const imageAlt = complexData?.image?.alt || complexData?.imageAlt || defaultData.image.alt;

  return (
    <section className="global-generics-complex" data-node-id="3114:619">
      <div className="global-generics-complex__content">
        <div className="global-generics-complex__left">
          <div className="global-generics-complex__text-content">
            {Array.isArray(content) ? (
              content.map((paragraph, index) => (
                <p key={index} className="global-generics-complex__paragraph">
                  {paragraph}
                </p>
              ))
            ) : (
              <p className="global-generics-complex__paragraph">{content}</p>
            )}
          </div>
        </div>
        <div className="global-generics-complex__divider">
          <div className="global-generics-complex__divider-line"></div>
          <div className="global-generics-complex__divider-icon">
            <Image
              src="/assets/images/global-generic/smallicon2.svg"
              alt=""
              width={48}
              height={48}
              quality={100}
            />
          </div>
        </div>
        <div className="global-generics-complex__right">
          <div className="global-generics-complex__image-wrapper">
            <Image
              src={imageUrl}
              alt={imageAlt}
              fill
              className="global-generics-complex__image"
              quality={100}
            />
          </div>
        </div>
      </div>
    </section>
  );
}


'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import '../scss/components/NewsInsights.scss';

export default function NewsInsights({ data }) {
  // Default data (will be replaced by Strapi)
  const newsData = data || {
    title: "News & Insights",
    items: [
      {
        id: 1,
        date: "12 September, 2025",
        headline: "Ramesh Swaminathan's interview with ET CFO on GST, US tariffs, M&A, biosimilars, and tech in finance.",
        circleOuter: "/assets/news-circle-outer-1.svg",
        circleInner: "/assets/news-circle-inner-1.png",
        href: "#news-1"
      },
      {
        id: 2,
        date: "11 April, 2025",
        headline: "Lupin champions women's empowerment through equal opportunities, leadership development, and inclusive growth.",
        circleOuter: "/assets/news-circle-outer-2.svg",
        circleInner: "/assets/news-circle-inner-2.png",
        href: "#news-2"
      }
    ]
  };

  const [isMobile, setIsMobile] = useState(false);
  const [shouldUseSlider, setShouldUseSlider] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      
      // Activate slider when: desktop (items > 2) or mobile (items > 1)
      const itemCount = newsData.items?.length || 0;
      const shouldActivate = mobile ? itemCount > 1 : itemCount > 2;
      setShouldUseSlider(shouldActivate);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, [newsData.items?.length]);

  const renderNewsItem = (item) => (
    <div key={item.id} className="news-insights__item" data-node-id={`22:${3381 + (item.id - 1) * 14}`}>
      {/* Circular Image Container */}
      <div className="news-insights__circle" data-node-id={`22:${3382 + (item.id - 1) * 14}`}>
        {/* Inner Circle Image */}
        <div 
          className="news-insights__circle-inner"
          data-node-id={`22:${3384 + (item.id - 1) * 14}`}
        >
          <Image
            src={item.circleInner}
            alt=""
            width={626.508}
            height={626.508}
            className="news-insights__circle-img"
            quality={100}
          />
        </div>

        {/* Hover Overlay */}
        <div className="news-insights__circle-overlay"></div>

        {/* Know More Button (appears on hover) */}
        <Link href={item.href} className="news-insights__button" data-node-id="22:3386">
          <div className="news-insights__button-inner" data-node-id="22:3387">
            <div className="news-insights__button-content" data-node-id="22:3388">
              <span className="news-insights__button-dot" data-node-id="22:3389"></span>
              <span className="news-insights__button-text" data-node-id="22:3390">
                know more
              </span>
            </div>
            <span className="news-insights__button-underline" data-node-id="22:3391"></span>
          </div>
        </Link>
      </div>

      {/* Text Content */}
      <div className="news-insights__text" data-node-id={`22:${3392 + (item.id - 1) * 8}`}>
        <p className="news-insights__date" data-node-id={`22:${3393 + (item.id - 1) * 8}`}>
          {item.date}
        </p>
        <p className="news-insights__headline" data-node-id={`22:${3394 + (item.id - 1) * 8}`}>
          {item.headline}
        </p>
      </div>
    </div>
  );

  return (
    <section className="news-insights" data-node-id="22:3369">
      <div className="news-insights__container" data-node-id="22:3378">
        {/* Title */}
        <h2 className="news-insights__title" data-node-id="22:3379">
          {newsData.title}
        </h2>

        {/* News Items */}
        {shouldUseSlider ? (
          <div className="news-insights__items news-insights__items--slider" data-node-id="22:3380">
            <Swiper
              modules={[Navigation, Pagination]}
              spaceBetween={isMobile ? 20 : 50}
              slidesPerView={isMobile ? 1 : 2.2}
              navigation={true}
              pagination={{ clickable: true }}
              className="news-insights__swiper"
            >
              {newsData.items.map((item) => (
                <SwiperSlide key={item.id} className="news-insights__slide">
                  {renderNewsItem(item)}
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        ) : (
          <div className="news-insights__items" data-node-id="22:3380">
            {newsData.items.map((item) => renderNewsItem(item))}
          </div>
        )}
      </div>
    </section>
  );
}


import Link from 'next/link';
import Image from 'next/image';
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
        showButton: true,
        href: "#news-1"
      },
      {
        id: 2,
        date: "11 April, 2025",
        headline: "Lupin champions women's empowerment through equal opportunities, leadership development, and inclusive growth.",
        circleOuter: "/assets/news-circle-outer-2.svg",
        circleInner: "/assets/news-circle-inner-2.png",
        showButton: false,
        href: "#news-2"
      }
    ]
  };

  return (
    <section className="news-insights" data-node-id="22:3369">
      <div className="news-insights__container" data-node-id="22:3378">
        {/* Title */}
        <h2 className="news-insights__title" data-node-id="22:3379">
          {newsData.title}
        </h2>

        {/* News Items */}
        <div className="news-insights__items" data-node-id="22:3380">
          {newsData.items.map((item) => (
            <div key={item.id} className="news-insights__item" data-node-id={`22:${3381 + (item.id - 1) * 14}`}>
              {/* Circular Image Container */}
              <div className="news-insights__circle" data-node-id={`22:${3382 + (item.id - 1) * 14}`}>
                {/* Outer Circle Image */}
                <div className="news-insights__circle-outer" data-node-id={`22:${3383 + (item.id - 1) * 14}`}>
                  <Image
                    src={item.circleOuter}
                    alt=""
                    width={626.508}
                    height={626.508}
                    className="news-insights__circle-img"
                    quality={100}
                  />
                </div>
                
                {/* Inner Circle Image (with opacity for first item) */}
                <div 
                  className={`news-insights__circle-inner ${item.id === 1 ? 'news-insights__circle-inner--opacity' : ''}`}
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

                {/* Know More Button (only for first item) */}
                {item.showButton && (
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
                )}
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
          ))}
        </div>
      </div>
    </section>
  );
}


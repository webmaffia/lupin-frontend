import Image from 'next/image';
import Link from 'next/link';
import ProfileCard from '@/components/global/ProfileCard';
import '@/scss/components/MediaCoverage.scss';

/**
 * MediaCoverage - Media coverage section component
 * 
 * @param {Object} data - Media coverage data
 * @param {string} data.title - Section title (optional)
 * @param {Array} data.items - Array of media coverage items
 * @param {string} className - Additional CSS classes (optional)
 * 
 * @example
 * <MediaCoverage 
 *   data={{
 *     title: "Media Coverage",
 *     items: [
 *       {
 *         id: 1,
 *         name: "November 4, 2025",
 *         title: "Lupin banks on complex generics",
 *         image: "/assets/media-kit-card/demo2.png",
 *         imagePosition: "bottom-right",
 *         link: "/news/article"
 *       }
 *     ]
 *   }}
 * />
 */
export default function MediaCoverage({ data, className = '' }) {
  const defaultData = {
    title: "Media Coverage",
    items: [
      {
        id: 1,
        date: "December 8, 2025",
        text: "Ramesh Swaminathan at the CNBC TV18 Anniversary Ringing Bell Ceremony, Dec 8, 2025",
        link: "/media/coverage/cnbc-tv18-anniversary"
      },
      {
        id: 2,
        date: "December 8, 2025",
        text: "Ramesh Swaminathan in an exclusive interview with CNBC TV18 on their anniversary special episode",
        link: "/media/coverage/cnbc-tv18-interview"
      },
      {
        id: 3,
        date: "November 10, 2025",
        text: "Ramesh Swaminathan with CNBC Asia, Q2 FY26 Earnings, 10th November 2025",
        link: "/media/coverage/cnbc-asia-q2-fy26"
      },
      {
        id: 4,
        date: "November 8, 2025",
        text: "Co-authored article by Dr. Cyrus Karkaria, President – Biotech Business, and Sanjay Tiwari, Vice President – R&D (Biotech), on 'Biotech industry propels research, innovation & ethical solutions to overcome challenges in drug development' published on Pharmabiz portal on November 8, 2025.",
        link: "/media/coverage/biotech-article-pharmabiz"
      },
      {
        id: 5,
        date: "November 7, 2025",
        text: "Ramesh Swaminathan with Business Today TV, Q2 FY26 Earnings, 7th November 2025",
        link: "/media/coverage/business-today-q2-fy26"
      },
      {
        id: 6,
        date: "November 7, 2025",
        text: "Ramesh Swaminathan with NDTV Profit, Q2 FY26 Earnings, 7th November 2025",
        link: "/media/coverage/ndtv-profit-q2-fy26"
      },
      {
        id: 7,
        date: "November 7, 2025",
        text: "Lupin MD Nilesh Gupta, CEO Vinta Gupta, and Global CFO Ramesh Swaminathan with ET Now – Q2 FY26 earnings, 7th November 2025",
        link: "/media/coverage/et-now-q2-fy26"
      },
      {
        id: 8,
        date: "October 29, 2025",
        text: "Sr General Manager and Center Head, Atharv Ability, Lupin, Dr Gaurish Kenkre's authored article titled Women and Stroke – The Silent Warnings Often Ignored, published in The Health Dialogues",
        link: "/media/coverage/women-stroke-article"
      },
      {
        id: 9,
        date: "October 27, 2025",
        text: "Rajeev Sibal, President India Region Formulations, Lupin quoted in an Industry Story published in the Business Today on 'Business of Cancer' on 24th Oct 2025",
        link: "/media/coverage/business-cancer-story"
      }
    ]
  };

  const mediaCoverageData = {
    title: data?.title || defaultData.title,
    items: data?.items || defaultData.items
  };

  return (
    <section className={`media-coverage ${className}`}>
      {/* Background Petals */}
      <div className="media-coverage__bg-petals">
        <Image
          src="/assets/media/bg-petals.svg"
          alt=""
          width={957}
          height={2520}
          className="media-coverage__bg-petals-img"
          quality={100}
          unoptimized
        />
      </div>

      <div className="media-coverage__container">
        {mediaCoverageData.title && (
          <h2 className="media-coverage__title">
            {mediaCoverageData.title}
          </h2>
        )}

        <div className="media-coverage__content">
        <div className="media-coverage__content">
          {mediaCoverageData.items && mediaCoverageData.items.length > 0 && (
            <div className="media-coverage__list">
              {mediaCoverageData.items.map((item, index) => {
                const listItemContent = (
                  <>
                    <p className="media-coverage__list-text">
                      <span className="media-coverage__list-date">{item.date}</span> {item.text}
                    </p>
                    {index < mediaCoverageData.items.length - 1 && (
                      <div className="media-coverage__list-divider"></div>
                    )}
                  </>
                );

                if (item.link) {
                  return (
                    <Link
                      key={item.id || index}
                      href={item.link}
                      className="media-coverage__list-item media-coverage__list-item--link"
                    >
                      {listItemContent}
                    </Link>
                  );
                }

                return (
                  <div key={item.id || index} className="media-coverage__list-item">
                    {listItemContent}
                  </div>
                );
              })}
            </div>
          )}

          <div className="media-coverage__right">
            {mediaCoverageData.profileCards && mediaCoverageData.profileCards.length > 0 ? (
              mediaCoverageData.profileCards.map((card, index) => (
                <ProfileCard
                  key={card.id || index}
                  name={card.name || "Vinita Gupta"}
                  title={card.title || "CEO, Lupin"}
                  image={card.image || "/assets/media-kit-card/bigdemo.png"}
                  link={card.link || "/media/coverage/vinita-gupta"}
                  showArrow={false}
                />
              ))
            ) : (
              <>
                <ProfileCard
                  name={mediaCoverageData.profileCard?.name || "Vinita Gupta"}
                  title={mediaCoverageData.profileCard?.title || "CEO, Lupin"}
                  image={mediaCoverageData.profileCard?.image || "/assets/media-kit-card/bigdemo.png"}
                  link={mediaCoverageData.profileCard?.link || "/media/coverage/vinita-gupta"}
                  showArrow={false}
                />
                <ProfileCard
                  name={mediaCoverageData.profileCard?.name || "Vinita Gupta"}
                  title={mediaCoverageData.profileCard?.title || "CEO, Lupin"}
                  image={mediaCoverageData.profileCard?.image || "/assets/media-kit-card/bigdemo.png"}
                  link={mediaCoverageData.profileCard?.link || "/media/coverage/vinita-gupta"}
                  showArrow={false}
                />
                <ProfileCard
                  name={mediaCoverageData.profileCard?.name || "Vinita Gupta"}
                  title={mediaCoverageData.profileCard?.title || "CEO, Lupin"}
                  image={mediaCoverageData.profileCard?.image || "/assets/media-kit-card/bigdemo.png"}
                  link={mediaCoverageData.profileCard?.link || "/media/coverage/vinita-gupta"}
                  showArrow={false}
                />
              </>
            )}
          </div>
        </div>

 
        </div>
      </div>
    </section>
  );
}


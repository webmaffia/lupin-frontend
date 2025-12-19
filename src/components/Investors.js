import Link from 'next/link';
import Image from 'next/image';
import '../scss/components/Investors.scss';

export default function Investors({ data }) {
  // Default data (will be replaced by Strapi)
  const investorsData = data || {
    eyebrow: "Investors",
    stockQuotes: {
      title: "Stock Quotes",
      lastUpdated: "Latest updated on 19 Aug 25",
      nse: "1932.70",
      bse: "1932.70",
      time: "15:59 IST",
      change: "1.08",
      changePercent: "0.68%"
    },
    performance: {
      title: "Performance",
      subtitle: {
        line1: "Lupin 1QFY26",
        line2: "Financial Results"
      },
      downloads: [
        { label: "Earnings Release", href: "#earnings", available: true },
        { label: "Analyst Presentation", href: "#analyst", available: false }
      ]
    },
    exchangeReleases: {
      title: "Exchange Releases",
      description: {
        line1: "Lupin Financial Results",
        line2: "for the quarter ended",
        line3: "June 30, 2025"
      },
      cta: {
        text: "More releases",
        href: "#releases"
      }
    }
  };

  return (
    <section className="investors">
      {/* Background Gradient */}
      <div className="investors__bg"></div>

      {/* Woman Image - Bottom Left */}
      <div className="investors__woman">
        <Image
          src="/assets/6e01a9ab02dfdbf2b098d95bb83f779151169bff.png"
          alt="Professional Woman"
          width={986}
          height={746}
          className="investors__woman-img"
          quality={100}
        />
      </div>

      {/* Content Container */}
      <div className="investors__container">
        {/* Top Text Section */}
        <div className="investors__top">
          <p className="investors__eyebrow">{investorsData.eyebrow}</p>
          
          <div className="investors__stock-header">
            <div className="investors__stock-title">
              <p>Stock</p>
              <p>Quotes</p>
            </div>
            <p className="investors__stock-updated">{investorsData.stockQuotes.lastUpdated}</p>
          </div>
          
          <div className="investors__stock-item investors__stock-item--1">
            <p className="investors__stock-value">NSE: {investorsData.stockQuotes.nse}</p>
            <p className="investors__stock-meta">
              {investorsData.stockQuotes.time}    {investorsData.stockQuotes.change}    {investorsData.stockQuotes.changePercent}
            </p>
          </div>
          
          <div className="investors__stock-item investors__stock-item--2">
            <p className="investors__stock-value">NSE: {investorsData.stockQuotes.bse}</p>
            <p className="investors__stock-meta">
              {investorsData.stockQuotes.time}    {investorsData.stockQuotes.change}    {investorsData.stockQuotes.changePercent}
            </p>
          </div>
        </div>

        {/* Circles Section */}
        <div className="investors__circles">
          {/* Circle 1 - Performance */}
          <div className="investors__circle investors__circle--1">
            <h3 className="investors__circle-title">{investorsData.performance.title}</h3>
            <div className="investors__circle-subtitle">
              <p>{investorsData.performance.subtitle.line1}</p>
              <p>{investorsData.performance.subtitle.line2}</p>
            </div>
            
            <div className="investors__downloads">
              {investorsData.performance.downloads.map((download, index) => (
                <div key={index} className="investors__download-item">
                  <p className="investors__download-label">{download.label}</p>
                  {download.available ? (
                    <Link href={download.href} className="investors__download-btn investors__download-btn--active">
                      download
                    </Link>
                  ) : (
                    <span className="investors__download-btn investors__download-btn--disabled">
                      download
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Circle 2 - Exchange Releases */}
          <div className="investors__circle investors__circle--2">
            <h3 className="investors__circle-title">{investorsData.exchangeReleases.title}</h3>
            <div className="investors__circle-description">
              <p>{investorsData.exchangeReleases.description.line1}</p>
              <p>{investorsData.exchangeReleases.description.line2}</p>
              <p>{investorsData.exchangeReleases.description.line3}</p>
            </div>
            
            <Link href={investorsData.exchangeReleases.cta.href} className="investors__cta">
              <div className="investors__cta-inner">
                <span className="investors__cta-dot"></span>
                <span className="investors__cta-text">{investorsData.exchangeReleases.cta.text}</span>
              </div>
              <span className="investors__cta-underline"></span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}


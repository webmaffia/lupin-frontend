import Link from 'next/link';
import '../scss/components/SitemapContent.scss';

export default function SitemapContent({ data }) {
  // Default sitemap structure
  const sitemapData = data || {
    sections: [
      {
        title: "Home",
        links: [
          { text: "Home", href: "/" }
        ]
      },
      {
        title: "About Us",
        links: [
          { text: "About Us", href: "/about-us" },
          { text: "Our Purpose", href: "/about-us/purpose" },
          { text: "Our Values", href: "/about-us/our-values" },
          { text: "Global Presence", href: "/about-us/global-presence" },
          { text: "Our Manufacturing Sites", href: "/about-us/our-manufacturing-sites" },
          { text: "Our Science", href: "/about-us/our-science" },
          { text: "Our Leadership", href: "/leaders" },
          { text: "Awards and Recognition", href: "/awards-and-recognition" }
        ]
      },
      {
        title: "Our Business",
        links: [
          { text: "Our Business", href: "/our-business" },
          { text: "Global Generics", href: "/global-generics" },
          { text: "Branded & Emerging Markets", href: "/branded-emerging-markets" },
          { text: "Specialty", href: "/specialty" },
          { text: "Global Technical Operations", href: "/global-technical-operations" },
          { text: "WAVE", href: "/wave" },
          { text: "India", href: "/india" }
        ]
      },
      {
        title: "Products",
        links: [
          { text: "Product Finder", href: "/product-finder" }
        ]
      },
      {
        title: "Allied Business",
        links: [
          { text: "Allied Business", href: "/allied-business" }
        ]
      },
      {
        title: "Patient Support Programs",
        links: [
          { text: "Patient Support Programs", href: "/patient-support-programs" }
        ]
      },
      {
        title: "Investors",
        links: [
          { text: "Investors", href: "/investors" },
          { text: "Financials", href: "/investors/financials" },
          { text: "Reports & Filings", href: "/investors/reports-and-filings" },
          { text: "Committees", href: "/investors/committees" },
          { text: "Code of Conduct", href: "/investors/code-of-conduct" },
          { text: "Policies", href: "/investors/policies" },
          { text: "Share Price", href: "/investors/share-price" },
          { text: "Shareholding Pattern", href: "/investors/shareholding-pattern" },
          { text: "Dividend", href: "/investors/dividend" },
          { text: "Unclaimed Dividend", href: "/investors/unclaimed-dividend" },
          { text: "Transfer Physical Shares", href: "/investors/transfer-physical-shares" },
          { text: "Memorandum & Articles", href: "/investors/memorandum" },
          { text: "Employee Stock Option Schemes", href: "/investors/employee-stock-option-schemes" },
          { text: "News & Events", href: "/investors/news-and-events" },
          { text: "Business Responsibility", href: "/investors/business-responsibility" },
          { text: "Analyst Coverage", href: "/investors/analyst-coverage" },
          { text: "Investor FAQs", href: "/investors/investor-faqs" },
          { text: "Subsidiaries", href: "/investors/subsidiaries" },
          { text: "Other Statutory Information", href: "/investors/other-statutory-information" },
          { text: "Saksham Niveshak", href: "/investors/saksham-niveshak" },
          { text: "Tips for Shareholders", href: "/investors/tips-for-shareholders" },
          { text: "Notice", href: "/investors/notice" }
        ]
      },
      {
        title: "Sustainability",
        links: [
          { text: "Sustainability", href: "/sustainability" }
        ]
      },
      {
        title: "Community",
        links: [
          { text: "Community", href: "/community" }
        ]
      },
      {
        title: "Media",
        links: [
          { text: "Media", href: "/media" },
          { text: "Press Releases", href: "/media/press-releases" },
          { text: "Media Coverage", href: "/media/media-coverage" },
          { text: "Media Kit", href: "/media/media-kit" },
          { text: "Perspectives", href: "/media/perspectives" }
        ]
      },
      {
        title: "Contact & Legal",
        links: [
          { text: "Contact Us", href: "/contact-us" },
          { text: "Privacy Policy", href: "/privacy-policy" },
          { text: "Terms of Service", href: "/terms-of-service" },
          { text: "Cookie Policy", href: "/cookie-policy" },
          { text: "Sitemap", href: "/sitemap" }
        ]
      }
    ]
  };

  return (
    <section className="sitemap-content">
      <div className="sitemap-content__container">
        <div className="sitemap-content__wrapper">
          {sitemapData.sections && sitemapData.sections.map((section, sectionIndex) => (
            <div key={sectionIndex} className="sitemap-content__section">
              <h2 className="sitemap-content__section-title">{section.title}</h2>
              <ul className="sitemap-content__links">
                {section.links && section.links.map((link, linkIndex) => (
                  <li key={linkIndex} className="sitemap-content__link-item">
                    <Link href={link.href} className="sitemap-content__link">
                      {link.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


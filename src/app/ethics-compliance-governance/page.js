import InnerBanner from '@/components/InnerBanner';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo';
import { getEthicsComplianceGovernance, mapTopBannerData, mapEthicsPledgeData, mapEthicsTextContentData } from '@/lib/strapi';
import '@/scss/pages/ethics-compliance-governance.scss';

// Generate metadata for the Ethics, Compliance and Governance page
export const metadata = generateSEOMetadata({
  title: "Ethics, Compliance and Governance - Lupin | Committed to Ethical Business Practices",
  description: "Learn about Lupin's commitment to ethics, compliance, and governance. Discover our policies, frameworks, and dedication to maintaining the highest standards of corporate governance and ethical conduct.",
  canonicalUrl: "https://www.lupin.com/ethics-compliance-governance",
  keywords: "Lupin ethics, compliance, corporate governance, ethical business practices, governance framework, Lupin Limited, corporate responsibility",
});

export default async function EthicsComplianceGovernancePage() {
  // Fetch data from Strapi
  let bannerData = null;
  let pledgeData = null;
  let textContentData = null;

  try {
    const strapiData = await getEthicsComplianceGovernance();
    
    // Map TopBanner data for InnerBanner
    const data = strapiData?.data || strapiData;
    if (data?.TopBanner) {
      bannerData = mapTopBannerData(data.TopBanner);
      
      // Add subheading if available
      if (data.TopBanner.subHeading && !bannerData.subheading) {
        bannerData.subheading = {
          enabled: true,
          text: data.TopBanner.subHeading
        };
      }
    }

    // Map Pledge datad
    pledgeData = mapEthicsPledgeData(strapiData);
    
    // Map TextContent data
    textContentData = mapEthicsTextContentData(strapiData);
  } catch (error) {
    console.error('Error fetching ethics-compliance-governance data from Strapi:', error);
    // Will use default data below
  }

  // Default banner data if Strapi data is not available
  if (!bannerData) {
    bannerData = {
      title: {
        line1: "Ethics, Compliance",
        line2: "and Governance"
      },
      subheading: {
        enabled: true,
        text: ""
      },
      images: {
        banner: {
          url: "/assets/inner-banner/freepik-enhance-42835.jpg",
          alt: "Ethics, Compliance and Governance - Lupin"
        },
        petal: {
          url: "/assets/inner-banner/petal-2.svg",
          alt: "Decorative petal"
        }
      }
    };
  }

  // Default pledge data if Strapi data is not available
  const pledgeText = pledgeData?.text || "We instituted P.L.E.D.G.E. (Preparing Lupin Employees to Demonstrate Governance and Ethical Conduct) to reinforce our robust governing principles. P.L.E.D.G.E. drives the culture of compliance by enforcing a common code of ethics. It empowers employees to report unethical practices and institutes specific mechanisms to deal with any form of workplace harassment.";

  // Default text content data if Strapi data is not available
  const textParagraphs = textContentData || [
    "Good business requires honesty, integrity, commitment, transparency and trust; the pillars of stable governance. These values form an indivisible part of the Lupin culture and help us uphold our promise of caring for our customers.",
    "&nbsp;",
    "They guide the way we conduct business and how we interact with our clients, employees and the community. As a responsible corporate citizen, we strongly believe in the power of 'right' that is doing the right things, in the right manner, at the right time.",
    "&nbsp;",
    "Our policies and processes ensure accountability to all stakeholders and help us remain steadfast in maintaining the highest governance standards. We are an equal opportunity employer, committed to creating a healthy workplace environment that is safe, empowering, and inclusive.",
    "&nbsp;",
    "We have zero tolerance for corrupt or immoral practices and adhere strictly to established norms of ethical, moral, and legal conduct.",
    "&nbsp;",
    "*Lupin fully complies with the Securities and Exchange Board of India (Listing Obligations & Disclosure Requirements) Regulations, 2015, ensuring strong and transparent corporate governance."
  ];

  return (
    <div style={{ position: 'relative' }}>
      <InnerBanner data={bannerData} />
      <section className="ethics-compliance-governance-content">
        <div className="ethics-compliance-governance-content__container">
          <div className="ethics-compliance-governance-content__wrapper">
            {/* P.L.E.D.G.E. Section */}
            {pledgeText && (
              <div className="ethics-compliance-governance-content__pledge-box" data-node-id="2849:57">
                <p className="ethics-compliance-governance-content__pledge-text" data-node-id="2849:58">
                  {pledgeText}
                </p>
              </div>
            )}
            
            {/* Text Content Section */}
            {textParagraphs && textParagraphs.length > 0 && (
              <div className="ethics-compliance-governance-content__text-box" data-node-id="2849:9">
                <div className="ethics-compliance-governance-content__text-content" data-node-id="2849:10">
                  {textParagraphs.map((paragraph, index) => (
                    <p key={index} className="ethics-compliance-governance-content__text-paragraph">
                      {paragraph === "&nbsp;" ? "\u00A0" : paragraph}
                    </p>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}


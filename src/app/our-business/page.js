import InnerBanner from '@/components/InnerBanner';
import ListItem from '@/components/business/listItem';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo';
import '@/scss/pages/our-business.scss';

// Generate metadata for the Our Business page
export const metadata = generateSEOMetadata({
  title: "Our Business - Lupin | Delivering Sustainable Healthcare Across Global Markets",
  description: "Discover how Lupin delivers sustainable healthcare solutions across global markets. Learn about our business segments, global presence, and commitment to making healthcare accessible worldwide.",
  canonicalUrl: "https://www.lupin.com/our-business",
  keywords: "Lupin business, global healthcare, pharmaceutical company, sustainable healthcare, emerging markets, healthcare solutions, Lupin Limited",
});

export default function OurBusinessPage() {
  // Custom banner data for this page
  const bannerData = {
    title: {
      line1: "Our Business",
     
    },
    subheading: {
      enabled: true,
      text: "Delivering Sustainable Healthcare Across Global Markets"
    },
    images: {
      banner: {
        url: "/assets/inner-banner/freepik-enhance-42835.jpg",
        alt: "Our Business - Global Healthcare"
      },
      petal: {
        url: "/assets/inner-banner/petal-2.svg",
        alt: "Decorative petal"
      }
    }
  };

  // Business list items data
  const businessItems = [
    {
      id: 1,
      title: "Global Generics",
      description: "Lupin continues to be the 3rd largest generic pharmaceutical company by prescription volume in the US, reflecting our scale and market leadership.",
      image: {
        url: "/assets/our-business/Image.png",
        alt: "Global Generics"
      },
      link: "/our-business/global-generics",
      isActive: false
    },
    {
      id: 2,
      title: "Branded Emerging Markets",
      description: "Lupin's purpose finds strong expression in the work it does across emerging markets. From being among the top generic companies in South Africa to ranking #3 in ophthalmology in Mexico.",
      image: {
        url: "/assets/our-business/Image.png",
        alt: "Branded Emerging Markets"
      },
      link: "/our-business/branded-emerging-markets",
      isActive: false
    },
    {
      id: 3,
      title: "India",
      description: "Lupin's home market in India is a cornerstone of our global business, with a diversified portfolio across major therapy areas, including anti-TB, anti-diabetes, respiratory, and cardiology, among others.",
      image: {
        url: "/assets/our-business/Image.png",
        alt: "India"
      },
      link: "/our-business/india",
      isActive: false
    },
    {
      id: 4,
      title: "Specialty and Innovation",
      description: "Lupin's specialty business is anchored in science-led innovations across complex platforms, including a range of inhalation and injectable technologies.",
      image: {
        url: "/assets/our-business/Image.png",
        alt: "Specialty and Innovation"
      },
      link: "/our-business/specialty",
      isActive: false
    },
    {
      id: 5,
      title: "Biosimilars",
      description: "Lupin's biosimilars business is focused on making complex biologics more accessible and affordable through science and quality-led manufacturing.",
      image: {
        url: "/assets/our-business/Image.png",
        alt: "Biosimilars"
      },
      link: "/our-business/biosimilars",
      isActive: false
    },
    {
      id: 6,
      title: "Patient Centric Initiatives",
      description: "Lupin's patient-centric initiatives and businesses are designed to offer holistic healthcare support that goes beyond medication.",
      image: {
        url: "/assets/our-business/Image.png",
        alt: "Patient Centric Initiatives"
      },
      link: "/our-business/allied-business",
      isActive: false
    },
  ];

  return (
    <div style={{ position: 'relative' }}>
      <InnerBanner data={bannerData} />
      <section className="our-business-list">
        <div className="our-business-list__container">
          <div className="our-business-list__grid">
            {businessItems.map((item) => (
              <ListItem
                key={item.id}
                id={item.id}
                image={item.image}
                title={item.title}
                description={item.description}
                link={item.link}
                isActive={item.isActive}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}


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
      id: 2,
      title: "Complex Generics",
      description: "Lupin leads in developing and commercializing complex generic products that require specialized formulation, delivery systems, or regulatory expertise.",
      image: {
        url: "/assets/our-business/Image.png",
        alt: "Complex Generics"
      },
      link: "/our-business/complex-generics",
      isActive: false
    },
    {
      id: 3,
      title: "Specialty Products",
      description: "Our specialty portfolio addresses unmet medical needs in areas such as respiratory, dermatology, and women's health, delivering innovative solutions to patients.",
      image: {
        url: "/assets/our-business/Image.png",
        alt: "Specialty Products"
      },
      link: "/our-business/specialty-products",
      isActive: false
    },
    {
      id: 4,
      title: "API & Formulations",
      description: "With world-class manufacturing facilities, Lupin produces high-quality Active Pharmaceutical Ingredients (APIs) and finished formulations across multiple therapeutic areas.",
      image: {
        url: "/assets/our-business/Image.png",
        alt: "API & Formulations"
      },
      link: "/our-business/api-formulations",
      isActive: false
    },
    {
      id: 5,
      title: "Biosimilars",
      description: "Lupin is advancing a robust pipeline of biosimilar products to make life-saving biologic medicines more accessible and affordable to patients globally.",
      image: {
        url: "/assets/our-business/Image.png",
        alt: "Biosimilars"
      },
      link: "/our-business/biosimilars",
      isActive: false
    },
    {
      id: 6,
      title: "India Formulations",
      description: "As one of India's leading pharmaceutical companies, we serve millions of patients across diverse therapeutic segments with high-quality, affordable medicines.",
      image: {
        url: "/assets/our-business/Image.png",
        alt: "India Formulations"
      },
      link: "/our-business/india-formulations",
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


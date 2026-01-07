import InnerBanner from '@/components/InnerBanner';
import MediaNavigation from '@/components/MediaNavigation';
import MediaSearch from '@/components/MediaSearch';
import ProfileCard from '@/components/global/ProfileCard';
import MediaContact from '@/components/global/MediaContact';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo';
import '@/scss/pages/media.scss';

// Generate metadata for the Perspectives page
export const metadata = generateSEOMetadata({
  title: "Perspectives - Lupin | Corporate Communications",
  description: "Insights from the leading minds in our industry. Explore perspectives and thought leadership from Lupin Limited.",
  canonicalUrl: "https://www.lupin.com/media/perspectives",
  keywords: "Lupin perspectives, thought leadership, industry insights, corporate communications, Lupin Limited, executive perspectives",
});

export default function PerspectivesPage() {
  // Banner data for Perspectives page
  const bannerData = {
    title: {
      line1: "Perspectives",
    },
    images: {
      banner: {
        url: "/assets/inner-banner/freepik-enhance-42835.jpg",
        alt: "Perspectives"
      },
      petal: {
        url: "/assets/inner-banner/petal-2.svg",
        alt: "Decorative petal"
      }
    }
  };

  // Profile cards data
  const perspectives = [
    {
      id: 4,
      name: "November 4, 2025",
      title: "Lupin banks on complex generics, speciality products to sustain growth in FY26–27",
      image: "/assets/media-kit-card/demo2.png",
      imagePosition: "bottom-right",
      showArrow: false,
      link: "/news/lupin-banks-on-complex-generics"
    },
    {
      id: 5,
      name: "November 4, 2025",
      title: "Lupin banks on complex generics, speciality products to sustain growth in FY26–27",
      image: "/assets/media-kit-card/demo2.png",
      imagePosition: "bottom-right",
      showArrow: false,
      link: "/news/lupin-banks-on-complex-generics"
    },
    {
      id: 6,
      name: "November 4, 2025",
      title: "Lupin banks on complex generics, speciality products to sustain growth in FY26–27",
      image: "/assets/media-kit-card/demo2.png",
      imagePosition: "bottom-right",
      showArrow: false,
      link: "/news/lupin-banks-on-complex-generics"
    },
    {
      id: 7,
      name: "November 4, 2025",
      title: "Lupin banks on complex generics, speciality products to sustain growth in FY26–27",
      image: "/assets/media-kit-card/demo2.png",
      imagePosition: "bottom-right",
      showArrow: false,
      link: "/news/lupin-banks-on-complex-generics"
    },
    {
      id: 8,
      name: "November 4, 2025",
      title: "Lupin banks on complex generics, speciality products to sustain growth in FY26–27",
      image: "/assets/media-kit-card/demo2.png",
      imagePosition: "bottom-right",
      showArrow: false,
      link: "/news/lupin-banks-on-complex-generics"
    },
    {
      id: 9,
      name: "November 4, 2025",
      title: "Lupin banks on complex generics, speciality products to sustain growth in FY26–27",
      image: "/assets/media-kit-card/demo2.png",
      imagePosition: "bottom-right",
      showArrow: false,
      link: "/news/lupin-banks-on-complex-generics"
    },
  ];

  return (
    <div style={{ position: 'relative' }}>
      <InnerBanner data={bannerData} />
      <MediaNavigation />
      
      <section className="sectionMediaSearch">
        <MediaSearch />
      </section>

      {/* Profile Cards Section */}
      <section className="sectionProfileCards">
        <div className="profile-cards-container">
          <div className="profile-card-grid">
            {perspectives.map((item) => (
              <ProfileCard
                key={item.id}
                name={item.name}
                title={item.title}
                link={item.link}
                image={item.image}
                imagePosition={item.imagePosition}
                showArrow={item.showArrow}
              />
            ))}
          </div>
        </div>
      </section>

      <MediaContact 
        contact={{
          name: "Rajalakshmi Azariah",
          title: "Vice President & Global Head – Corporate Communications",
          email: "rajalakshmiazariah@lupin.com"
        }}
      />
    </div>
  );
}


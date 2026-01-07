import InnerBanner from '@/components/InnerBanner';
import WhatsNew from '@/components/WhatsNew';
import MediaCoverage from '@/components/MediaCoverage';
import MediaContact from '@/components/global/MediaContact';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo';
import '@/scss/pages/media.scss';

// Generate metadata for the Media page
export const metadata = generateSEOMetadata({
  title: "Media - Lupin | Corporate Communications",
  description: "Contact our media relations team for press inquiries, media kits, and corporate communications from Lupin Limited.",
  canonicalUrl: "https://www.lupin.com/media",
  keywords: "Lupin media, press contact, corporate communications, media relations, Lupin Limited, media kit",
});

export default function MediaPage() {
  // Banner data for Media page
  const bannerData = {
    title: {
      line1: "Media",
    
    },
    images: {
      banner: {
        url: "/assets/inner-banner/freepik-enhance-42835.jpg",
        alt: "Media contacts"
      },
      petal: {
        url: "/assets/inner-banner/petal-2.svg",
        alt: "Decorative petal"
      }
    }
  };

  // WhatsNew data - customize this to change content
  const whatsNewData = {
    title: "Press Releases",
    items: [
      {
        id: 1,
        date: "September 17, 2025",
        headline: [
          "Lupin Receives Positive",
          "CHMP Opinion for",
          "Biosimilar Ranibizu",
          "mab"
        ],
        category: "Press Releases",
        href: "#"
      },
      {
        id: 2,
        date: "September 17, 2025",
        headline: [
          "Lupin Receives Positive",
          "CHMP Opinion for",
          "Biosimilar Ranibizu",
          "mab"
        ],
        category: "Press Releases",
        href: "#"
      },
      {
        id: 3,
        date: "September 17, 2025",
        headline: [
          "Lupin Receives Positive",
          "CHMP Opinion for",
          "Biosimilar Ranibizu",
          "mab"
        ],
        category: "Press Releases",
        href: "#"
      },
      {
        id: 4,
        date: "September 17, 2025",
        headline: [
          "Lupin Receives Positive",
          "CHMP Opinion for",
          "Biosimilar Ranibizu",
          "mab"
        ],
        category: "Press Releases",
        href: "#"
      }
    ]
  };

  return (
    <div style={{ position: 'relative' }}>
      <InnerBanner data={bannerData} />

      <section className="sectionPressReleases">
        <WhatsNew className="whats-new--media-page" data={whatsNewData} exploreLink="/press-releases"  />
      </section>

      <MediaCoverage 
        data={{
          title: "Media Coverage"
        }}
        id="media-coverage"
      />
     <section id="perspectives" className="sectionPressReleases">
     <WhatsNew 
        className="whats-new--media-page"
        data={{
          title: "Perspectives",
          description: "Insights from the leading minds in our industry",
          items: [
            {
              id: 1,
              name: "November 4, 2025",
              title: "Lupin banks on complex generics, speciality products to sustain growth in FY26–27",
              image: "/assets/media-kit-card/demo2.png",
              imagePosition: "bottom-right",
              showArrow: false,
              link: "/news/lupin-banks-on-complex-generics"
            },
            {
              id: 2,
              name: "November 4, 2025",
              title: "Lupin banks on complex generics, speciality products to sustain growth in FY26–27",
              image: "/assets/media-kit-card/demo2.png",
              imagePosition: "bottom-right",
              showArrow: false,
              link: "/news/lupin-banks-on-complex-generics"
            },
            {
              id: 3,
              name: "November 4, 2025",
              title: "Lupin banks on complex generics, speciality products to sustain growth in FY26–27",
              image: "/assets/media-kit-card/demo2.png",
              imagePosition: "bottom-right",
              showArrow: false,
              link: "/news/lupin-banks-on-complex-generics"
            },
            {
              id: 4,
              name: "Vinita Gupta",
              title: "Chief Executive Officer",
              link: "/about/vinita-gupta"
            },
            {
              id: 5,
              name: "John Doe",
              title: "Chief Financial Officer",
              link: "/about/john-doe"
            }
          ]
        }}
        useProfileCard={true}
        exploreLink="/perspectives"
      />
      </section>
    
      
      <MediaContact 
        contact={{
          name: "Rajalakshmi Azariah",
          title: "Vice President & Global Head – Corporate Communications",
          email: "rajalakshmiazariah@lupin.com"
        }}
        mediaKitLink="/media-kit"
      />
    </div>
  );
}

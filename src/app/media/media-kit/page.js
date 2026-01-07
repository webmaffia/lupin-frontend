import InnerBanner from '@/components/InnerBanner';
import MediaNavigation from '@/components/MediaNavigation';
import MediaSearch from '@/components/MediaSearch';
import ProfileCard from '@/components/global/ProfileCard';
import PdfDownload from '@/components/global/PdfDownload';
import MediaContact from '@/components/global/MediaContact';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo';
import '@/scss/pages/media.scss';

// Generate metadata for the Media Kit page
export const metadata = generateSEOMetadata({
  title: "Media Kit - Lupin | Corporate Communications",
  description: "Access Lupin's media kit with press materials, company information, logos, and resources for media professionals.",
  canonicalUrl: "https://www.lupin.com/media/media-kit",
  keywords: "Lupin media kit, press materials, corporate communications, media resources, Lupin Limited, press kit",
});

export default function MediaKitPage() {
  // Banner data for Media Kit page
  const bannerData = {
    title: {
      line1: "Media Kit",
    },
    images: {
      banner: {
        url: "/assets/inner-banner/freepik-enhance-42835.jpg",
        alt: "Media kit"
      },
      petal: {
        url: "/assets/inner-banner/petal-2.svg",
        alt: "Decorative petal"
      }
    }
  };

  // Profile data
  const profiles = [
    {
      id: 1,
      name: "Vinita Gupta",
      title: "Chief Executive Officer",
      link: "/about/vinita-gupta"
    },
    {
      id: 2,
      name: "John Doe",
      title: "Chief Financial Officer",
      link: "/about/john-doe"
    },
    {
      id: 3,
      name: "Jane Smith",
      title: "Chief Technology Officer",
      link: "/about/jane-smith"
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
            {profiles.map((profile) => (
              <ProfileCard
                key={profile.id}
                name={profile.name}
                title={profile.title}
                link={profile.link}
                showArrow={true}
              />
            ))}
          </div>
        </div>
      </section>

      {/* PDF Download Section */}
      <section className="sectionPdfDownload">
        <div className="pdf-download-container">
          <PdfDownload
            title="Lupin Corporate Presentation"
            pdfUrl="/documents/corporate-presentation.pdf"
            image="/assets/media-kit-card/demo4.png"
            imageAlt="Lupin Corporate Presentation"
          />
          <PdfDownload
            title="Lupin Corporate Presentation"
            pdfUrl="/documents/corporate-presentation.pdf"
            image="/assets/media-kit-card/demo4.png"
            imageAlt="Lupin Corporate Presentation"
          />
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


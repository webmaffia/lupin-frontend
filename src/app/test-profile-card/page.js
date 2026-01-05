import InnerBanner from '@/components/InnerBanner';
import ProfileCard from '@/components/global/ProfileCard';
import MediaContact from '@/components/global/MediaContact';
import '@/scss/pages/test-profile-card.scss';

export default function TestProfileCardPage() {
  // Banner data
  const bannerData = {
    title: {
      line1: "Profile Card",
      line2: "Test Page"
    },
    images: {
      banner: {
        url: "/assets/inner-banner/freepik-enhance-42835.jpg",
        alt: "Test page banner"
      },
      petal: {
        url: "/assets/inner-banner/petal-2.svg",
        alt: "Decorative petal"
      }
    }
  };

  // Dummy profile data
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
    }
  ];

  return (
    <div style={{ position: 'relative' }}>
      <InnerBanner data={bannerData} />
      
      <section className="test-profile-card">
        <div className="test-profile-card__container">
          <div className="test-profile-card__header">
            <h2 className="test-profile-card__title">Profile Cards Demo</h2>
            <p className="test-profile-card__description">
              This page demonstrates the reusable ProfileCard component that can be used in media coverage and other pages.
            </p>
          </div>

          <div className="profile-card-grid">
            {profiles.map((profile) => (
              <ProfileCard
                key={profile.id}
                name={profile.name}
                title={profile.title}
                date={profile.date}
                link={profile.link}
                image={profile.image}
                imagePosition={profile.imagePosition}
                showArrow={profile.showArrow}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Media Contact Section */}
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


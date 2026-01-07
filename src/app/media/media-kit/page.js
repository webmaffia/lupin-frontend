'use client';

import { useState, useEffect } from 'react';
import InnerBanner from '@/components/InnerBanner';
import MediaNavigation from '@/components/MediaNavigation';
import ProfileCard from '@/components/global/ProfileCard';
import PdfDownload from '@/components/global/PdfDownload';
import MediaContact from '@/components/global/MediaContact';
import '@/scss/pages/media.scss';

export default function MediaKitPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
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
  const allProfiles = [
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

  // Search and filter logic
  const filteredProfiles = allProfiles.filter((item) => {
    // Search filter - check name and title
    const matchesSearch = searchQuery === '' || 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.title && item.title.toLowerCase().includes(searchQuery.toLowerCase()));
    
    // Year filter - placeholder for future year matching
    const matchesYear = selectedYear === '' || true;
    
    return matchesSearch && matchesYear;
  });

  // Reset filters when search changes
  useEffect(() => {
    // This ensures the component re-renders when search changes
  }, [searchQuery, selectedYear]);

  return (
    <div style={{ position: 'relative' }}>
      <InnerBanner data={bannerData} />
      <MediaNavigation 
        onSearch={(query) => setSearchQuery(query)}
        onYearChange={(year) => setSelectedYear(year)}
      />

      {/* Profile Cards Section */}
      <section className="sectionProfileCards">
        <div className="profile-cards-container">
          <div className="profile-card-grid">
            {filteredProfiles.map((profile) => (
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
        mediaKitLink="/media/media-kit"
      />
    </div>
  );
}


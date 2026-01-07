'use client';

import { useState, useEffect } from 'react';
import InnerBanner from '@/components/InnerBanner';
import MediaNavigation from '@/components/MediaNavigation';
import ProfileCard from '@/components/global/ProfileCard';
import MediaContact from '@/components/global/MediaContact';
import '@/scss/pages/media.scss';

export default function PerspectivesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
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
  const allPerspectives = [
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

  // Search and filter logic
  const filteredPerspectives = allPerspectives.filter((item) => {
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
            {filteredPerspectives.map((item) => (
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
        mediaKitLink="/media/media-kit"
      />
    </div>
  );
}


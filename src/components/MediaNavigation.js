'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import '../scss/components/MediaNavigation.scss';

export default function MediaNavigation() {
  const pathname = usePathname();

  // Media navigation links
  const mediaLinks = [
    { 
      id: 'press-releases', 
      label: 'Press Releases', 
      href: '/media/press-releases' 
    },
    { 
      id: 'media-coverage', 
      label: 'Media Coverage', 
      href: '/media/media-coverage' 
    },
    { 
      id: 'media-kit', 
      label: 'Media Kit', 
      href: '/media/media-kit' 
    },
    { 
      id: 'perspectives', 
      label: 'perspectives', 
      href: '/media/perspectives' 
    }
  ];

  // Check if current path matches the link
  const isActive = (link) => {
    // For hash links, check if we're on the base /media page
    // (Note: hash links won't change pathname, so we consider them active when on /media)
    if (link.href.startsWith('/media#')) {
      return pathname === '/media';
    }
    // Exact match for all other paths
    return pathname === link.href;
  };

  return (
    <section className="media-navigation">
      <h2 className="media-navigation__heading">In this section</h2>
      <div className="media-navigation__tabs">
        {mediaLinks.map((link) => (
          <Link
            key={link.id}
            href={link.href}
            className={`media-navigation__tab ${isActive(link) ? 'media-navigation__tab--active' : ''}`}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </section>
  );
}


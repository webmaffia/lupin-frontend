'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import '../scss/components/NavigationLinks.scss';

export default function NavigationLinks() {
  const pathname = usePathname();

  const navigationLinks = [
    { id: 'share-price', label: 'Share Price', href: '/investors/share-price' },
    { id: 'analyst-coverage', label: 'Analyst Coverage', href: '/investors/analyst-coverage' },
    { id: 'shareholding-pattern', label: 'Shareholding Pattern', href: '/investors/shareholding-pattern' },
    { id: 'dividend', label: 'Dividend', href: '/investors/dividend' },
    { id: 'unclaimed-dividend', label: 'Unclaimed Dividend & Shares', href: '/investors/unclaimed-dividend' },
    { id: 'memorandum', label: 'Memorandum & Articles of Association', href: '/investors/memorandum' },
    { id: 'investor-faqs', label: 'Investor FAQs', href: '/investors/investor-faqs' },
    { id: 'business-responsibility', label: 'Business Responsibility', href: '/investors/business-responsibility' }
  ];

  return (
    <div className="navigation-links">
      <div className="navigation-links__row navigation-links__row--1">
        {navigationLinks.slice(0, 5).map((link) => (
          <Link
            key={link.id}
            href={link.href}
            className={`navigation-links__tab ${pathname === link.href ? 'navigation-links__tab--active' : ''}`}
          >
            {link.label}
          </Link>
        ))}
      </div>
      <div className="navigation-links__row navigation-links__row--2">
        {navigationLinks.slice(5, 8).map((link) => (
          <Link
            key={link.id}
            href={link.href}
            className={`navigation-links__tab ${pathname === link.href ? 'navigation-links__tab--active' : ''}`}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
}


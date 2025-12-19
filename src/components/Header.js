'use client'; // Need client for mobile menu toggle

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import '../scss/components/Header.scss';

export default function Header({ data }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Default navigation data (will be replaced by Strapi)
  const headerData = data || {
    logo: {
      url: "/assets/logo-lupin.png",
      alt: "Lupin Logo"
    },
    navigation: [
      { label: "About Us", href: "/about", active: true },
      { label: "Key Therapeutic Areas", href: "/therapeutic-areas", active: false },
      { label: "Our Offerings", href: "/offerings", active: false },
      { label: "Investors", href: "/investors", active: false },
      { label: "Responsibility", href: "/responsibility", active: false },
      { label: "Media", href: "/media", active: false }
    ],
    contact: {
      label: "Contact",
      href: "/contact"
    }
  };

  return (
    <header className="header">
      <div className="header__container">
        {/* Logo */}
        <Link href="/" className="header__logo-link">
          <Image
            src={headerData.logo.url}
            alt={headerData.logo.alt}
            width={87}
            height={106}
            className="header__logo"
            priority
          />
        </Link>

        {/* Main Navigation */}
        <nav className={`header__nav ${isMenuOpen ? 'is-open' : ''}`}>
          {headerData.navigation.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className={`header__nav-item ${item.active ? 'header__nav-item--active' : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Action CTA */}
        <div className="header__actions">
          {/* Contact */}
          <Link href={headerData.contact.href} className="header__contact">
            {headerData.contact.label}
          </Link>

          {/* Divider */}
          <div className="header__divider">
            <Image
              src="/assets/divider-vertical.svg"
              alt=""
              width={1}
              height={36}
            />
          </div>

          {/* Globe Icon */}
          <button className="header__icon-btn" aria-label="Change language">
            <Image
              src="/assets/icon-globe.svg"
              alt="Globe"
              width={26}
              height={26}
            />
          </button>

          {/* Divider */}
          <div className="header__divider">
            <Image
              src="/assets/divider-vertical.svg"
              alt=""
              width={1}
              height={36}
            />
          </div>

          {/* Search Icon */}
          <button className="header__icon-btn" aria-label="Search">
            <Image
              src="/assets/icon-search.svg"
              alt="Search"
              width={28}
              height={28}
            />
          </button>
        </div>

        {/* Menu Button */}
        <button
          className={`header__menu-btn ${isMenuOpen ? 'is-open' : ''}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <Image
            src="/assets/icon-menu.svg"
            alt="Menu"
            width={24}
            height={14}
            className="header__menu-icon"
          />
          <span className="header__menu-text">Menu</span>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div 
          className="header__overlay" 
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </header>
  );
}


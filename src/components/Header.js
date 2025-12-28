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
      { label: "About Us", href: "/about", active: false },
      { label: "Our Business", href: "/business", active: false },
      { label: "Investors", href: "/investors", active: false },
      { label: "Sustainability", href: "/sustainability", active: false },
      { label: "Community", href: "/community", active: false },
      { label: "Media", href: "/media", active: false }
    ],
    career: {
      label: "Careers",
      href: "/careers"
    },
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
            quality={95}
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
          
          {/* Mobile-only: Career and Contact */}
          <Link 
            href={headerData.career.href} 
            className="header__nav-item header__nav-item--mobile-only"
            onClick={() => setIsMenuOpen(false)}
          >
            {headerData.career.label}
          </Link>
          
          <Link 
            href={headerData.contact.href} 
            className="header__nav-item header__nav-item--mobile-only"
            onClick={() => setIsMenuOpen(false)}
          >
            {headerData.contact.label}
          </Link>
        </nav>

        {/* Action CTA */}
        <div className="header__actions">
          {/* Career */}
          <Link href={headerData.career.href} className="header__career">
            {headerData.career.label}
          </Link>

          <div className="header__divider">
            <Image
              src="/assets/divider-vertical.svg"
              alt=""
              width={1}
              height={36}
              quality={95}
            />
          </div>

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
              quality={95}
            />
          </div>

          {/* Globe Icon */}
          <button className="header__icon-btn" aria-label="Change language">
            <Image
              src="/assets/icon-globe.svg"
              alt="Globe"
              width={26}
              height={26}
              quality={95}
            />
          </button>

          {/* Divider */}
          <div className="header__divider">
            <Image
              src="/assets/divider-vertical.svg"
              alt=""
              width={1}
              height={36}
              quality={95}
            />
          </div>

          {/* Search Icon */}
          <button className="header__icon-btn" aria-label="Search">
            <Image
              src="/assets/icon-search.svg"
              alt="Search"
              width={28}
              height={28}
              quality={95}
            />
          </button>

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
            quality={95}
          />
          <span className="header__menu-text">Menu</span>
        </button>
        </div>

        {/* Mobile Globe Icon (before menu button) */}
        <button 
          className="header__icon-btn header__icon-btn--mobile-header" 
          aria-label="Change language"
        >
          <Image
            src="/assets/icon-globe.svg"
            alt="Globe"
            width={26}
            height={26}
            quality={95}
          />
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


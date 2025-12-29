'use client';

import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import '../scss/components/AnalystCoverage.scss';

export default function AnalystCoverage() {
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

  const analysts = [
    {
      id: 1,
      institution: 'Ambit Capital',
      analyst: 'Prashant Nair',
      email: 'prashant.nair@ambit.co',
      isActive: false // First card has green background
    },
    {
      id: 2,
      institution: 'Antique',
      analyst: 'Gaurav Tinani',
      email: 'gaurav.tinani@antiquelimited.com',
      isActive: false
    },
    {
      id: 3,
      institution: 'Avendus Spark',
      analyst: 'Harith Ahamed',
      email: 'harith@sparkcapital.in',
      isActive: false
    },
    {
      id: 4,
      institution: 'Axis Capital',
      analyst: 'Kunal Randeria',
      email: 'kunal.randeria@axiscap.in',
      isActive: false
    },
    {
      id: 5,
      institution: 'B&K Securities',
      analyst: 'Maulik Varia',
      email: 'maulik.varia@bksec.com',
      isActive: false
    },
    {
      id: 6,
      institution: 'BOB CAPS',
      analyst: 'Girish Pai',
      email: 'Girish.Pai@bobcaps.in',
      isActive: false
    },
    {
      id: 7,
      institution: 'Bank of America',
      analyst: 'Neha Manpuria',
      email: 'neha.manpuria@bofa.com',
      isActive: false
    },
    {
      id: 8,
      institution: 'BNP',
      analyst: 'Tausif Shaikh',
      email: 'tausif.shaikh@asia.bnpparibas.com',
      isActive: false
    },
    {
      id: 9,
      institution: 'Citi',
      analyst: 'Vivek Agrawal',
      email: 'vivek1.agrawal@citi.com',
      isActive: false
    },
    {
      id: 10,
      institution: 'CLSA',
      analyst: 'Kunal Lakhan',
      email: 'kunal.lakhan@clsa.com',
      isActive: false
    },
    {
      id: 11,
      institution: 'Dam Capital',
      analyst: 'Nitin Agarwal',
      email: 'nitin.a@damcapital.in',
      isActive: false
    },
    {
      id: 12,
      institution: 'Dolat Capital',
      analyst: 'Rashmi Sancheti',
      email: 'rashmis@dolatcapital.com',
      isActive: false
    }
  ];

  return (
    <section className="analyst-coverage">
      {/* Background */}
      <div className="analyst-coverage__bg"></div>
      
      {/* Decorative Petals */}
      <div className="analyst-coverage__petal analyst-coverage__petal--left">
        <Image
          src="/assets/analyst-coverage/fill-petal-1.svg"
          alt=""
          width={266}
          height={273}
          className="analyst-coverage__petal-img"
          quality={100}
        />
      </div>
      <div className="analyst-coverage__petal analyst-coverage__petal--right">
        <Image
          src="/assets/analyst-coverage/fill-petal-2.svg"
          alt=""
          width={236}
          height={243}
          className="analyst-coverage__petal-img"
          quality={100}
        />
      </div>

      {/* Container */}
      <div className="analyst-coverage__container">
        {/* Navigation Links */}
        <div className="analyst-coverage__tabs">
          <div className="analyst-coverage__tabs-row analyst-coverage__tabs-row--1">
            {navigationLinks.slice(0, 5).map((link) => (
              <Link
                key={link.id}
                href={link.href}
                className={`analyst-coverage__tab ${pathname === link.href ? 'analyst-coverage__tab--active' : ''}`}
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="analyst-coverage__tabs-row analyst-coverage__tabs-row--2">
            {navigationLinks.slice(5, 8).map((link) => (
              <Link
                key={link.id}
                href={link.href}
                className={`analyst-coverage__tab ${pathname === link.href ? 'analyst-coverage__tab--active' : ''}`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Analyst Cards Grid */}
        <div className="analyst-coverage__grid">
          {analysts.map((analyst) => (
            <div
              key={analyst.id}
              className={`analyst-card ${analyst.isActive ? 'analyst-card--active' : ''}`}
            >
              <div className="analyst-card__content">
                <h3 className="analyst-card__institution">{analyst.institution}</h3>
                <div className="analyst-card__info">
                  <p className="analyst-card__name">{analyst.analyst}</p>
                  <a
                    href={`mailto:${analyst.email}`}
                    className="analyst-card__email"
                  >
                    {analyst.email}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


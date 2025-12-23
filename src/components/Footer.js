import Link from 'next/link';
import Image from 'next/image';
import '../scss/components/Footer.scss';

export default function Footer({ data }) {
  // Default data (will be replaced by Strapi)
  const footerData = data || {
    logo: {
      url: "/assets/logo-lupin.png",
      alt: "Lupin Logo"
    },
    contact: {
      email: "info@lupin.com",
      phone: "+91 22 6640 2323"
    },
    links: {
      aboutUs: [
        "Lupin Story",
        "Our Purpose",
        "Our Values",
        "Governing Principle",
        "Global Presence",
        "Our Manufacturing Excellence",
        "Our Science",
        "Our Leadership",
        "Awards and Recognition"
      ],
      ourBusiness: [
        "Global Generics",
        "Branded Emerging Markets",
        "India",
        "Specialty",
        "Biosimilars",
        "Patient Centric Initiatives"
      ],
      investors: [
        "Investors FAQ",
        "News and Events",
        "Policies",
        "Reports and Filings",
        "Tips for shareholders"
      ],
      media: [
        "Media Listing",
        "Media Coverage",
        "Media Kit",
        "Perspectives",
        "Press Releases"
      ],
      community: [],
      sustainability: [],
      careers: []
    },
    copyright: "© 2025 Lupin. All rights reserved",
    legal: [
      { label: "Privacy", href: "#privacy" },
      { label: "Disclaimer", href: "#disclaimer" },
      { label: "Sitemap", href: "#sitemap" }
    ],
    social: [
      { name: "Twitter", icon: "/assets/social-twitter.svg", href: "#twitter", width: 30, height: 28.221 },
      { name: "Facebook", icon: "/assets/social-facebook.svg", href: "#facebook", width: 15, height: 32.8 },
      { name: "Instagram", icon: "/assets/social-instagram.svg", href: "#instagram", width: 29, height: 29.057 },
      { name: "LinkedIn", icon: "/assets/social-linkedin.svg", href: "#linkedin", width: 28, height: 26.898 },
      { name: "YouTube", icon: "/assets/social-youtube.svg", href: "#youtube", width: 32, height: 22.241 }
    ]
  };

  return (
    <footer className="footer" data-node-id="2018:2">
      <div className="footer__container" data-node-id="2018:3">
        {/* Left Section - Logo and Contact */}
        <div className="footer__left" data-node-id="2018:4">
          {/* Logo */}
          <div className="footer__logo" data-node-id="2018:5">
            <Image
              src={footerData.logo.url}
              alt={footerData.logo.alt}
              width={142}
              height={173}
              className="footer__logo-img"
              quality={100}
            />
          </div>

          {/* Contact Information */}
          <div className="footer__contact" data-node-id="2018:6">
            <div className="footer__contact-item" data-node-id="2018:7">
              <div className="footer__contact-icon" data-node-id="2018:8">
                <Image
                  src="/assets/icon-email.svg"
                  alt=""
                  width={22}
                  height={16.607}
                  quality={100}
                />
              </div>
              <p className="footer__contact-text" data-node-id="2018:9">
                {footerData.contact.email}
              </p>
            </div>
            
            <div className="footer__contact-item" data-node-id="2018:10">
              <div className="footer__contact-icon" data-node-id="2018:11">
                <Image
                  src="/assets/icon-phone.svg"
                  alt=""
                  width={19.431}
                  height={19.474}
                  quality={100}
                />
              </div>
              <p className="footer__contact-text" data-node-id="2018:13">
                {footerData.contact.phone}
              </p>
            </div>
          </div>

          {/* Copyright and Legal */}
          <div className="footer__legal" data-node-id="2018:14">
            <div className="footer__legal-content" data-node-id="2018:15">
              <p className="footer__copyright" data-node-id="2018:16">
                {footerData.copyright}
              </p>
              <p className="footer__legal-links" data-node-id="2018:17">
                {footerData.legal.map((link, index) => (
                  <span key={index}>
                    <Link href={link.href} className="footer__legal-link">
                      {link.label}
                    </Link>
                    {index < footerData.legal.length - 1 && ' | '}
                  </span>
                ))}
              </p>
            </div>
          </div>
        </div>

        {/* Right Section - Navigation Links */}
        <div className="footer__right" data-node-id="2018:26">
          {/* About Us */}
          <div className="footer__column" data-node-id="2018:27">
            <h3 className="footer__column-title" data-node-id="2018:28">About Us</h3>
            <ul className="footer__column-links" data-node-id="2018:29">
              {footerData.links.aboutUs.map((link, index) => (
                <li key={index}>
                  <Link href={`#${link.toLowerCase().replace(/\s+/g, '-')}`} className="footer__link">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Our Business */}
          <div className="footer__column" data-node-id="2018:30">
            <h3 className="footer__column-title" data-node-id="2018:31">Our Business</h3>
            <ul className="footer__column-links" data-node-id="2018:32">
              {footerData.links.ourBusiness.map((link, index) => (
                <li key={index}>
                  <Link href={`#${link.toLowerCase().replace(/\s+/g, '-')}`} className="footer__link">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Investors */}
          <div className="footer__column" data-node-id="2018:33">
            <h3 className="footer__column-title" data-node-id="2018:34">Investors</h3>
            <ul className="footer__column-links" data-node-id="2018:35">
              {footerData.links.investors.map((link, index) => (
                <li key={index}>
                  <Link href={`#${link.toLowerCase().replace(/\s+/g, '-')}`} className="footer__link">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Media */}
          <div className="footer__column" data-node-id="2018:36">
            <h3 className="footer__column-title" data-node-id="2018:37">Media</h3>
            <ul className="footer__column-links" data-node-id="2018:38">
              {footerData.links.media.map((link, index) => (
                <li key={index}>
                  <Link href={`#${link.toLowerCase().replace(/\s+/g, '-')}`} className="footer__link">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>


          <div className="bottomLinks">
             {/* Community */}
             <div className="footer__column" data-node-id="2018:39">
            <h3 className="footer__column-title" data-node-id="2018:40">Community</h3>
          </div>

          {/* Sustainability */}
          <div className="footer__column" data-node-id="2018:42">
            <h3 className="footer__column-title" data-node-id="2018:43">Sustainability</h3>
          </div>

          {/* Careers */}
          <div className="footer__column" data-node-id="2018:45">
            <h3 className="footer__column-title" data-node-id="2018:46">Careers</h3>
          </div>
        </div>
       
        </div>

       

        {/* Bottom Section - Social Media */}
        <div className="footer__social" data-node-id="2018:18">
          <div className="footer__social-divider" data-node-id="2018:19"></div>
          <div className="footer__social-icons" data-node-id="2018:20">
            {footerData.social.map((social, index) => (
              <Link
                key={index}
                href={social.href}
                className="footer__social-icon"
                aria-label={social.name}
                data-node-id={`2018:${21 + index}`}
              >
                <Image
                  src={social.icon}
                  alt={social.name}
                  width={social.width}
                  height={social.height}
                  quality={100}
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}


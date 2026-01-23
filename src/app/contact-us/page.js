import InnerBanner from '@/components/InnerBanner';
import ContactUsSection from '@/components/ContactUsSection';
import ContactUsLocationSlider from '@/components/ContactUsLocationSlider';
import ContactUsForm from '@/components/ContactUsForm';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo';

// Generate metadata for the Contact Us page
export const metadata = generateSEOMetadata({
  title: "Contact Us - Lupin | Get in Touch",
  description: "Contact Lupin for inquiries, support, or information about our pharmaceutical products and services. Reach out to our team for assistance.",
  canonicalUrl: "https://www.lupin.com/contact-us",
  keywords: "contact Lupin, Lupin contact, pharmaceutical contact, Lupin Limited contact, customer support, inquiry, get in touch",
});

export default function ContactUsPage() {
  // Banner data for InnerBanner
  const bannerData = {
    title: {
      line1: "Contact",
      line2: "Us",
    },
    subheading: {
      enabled: false,
      text: ""
    },
    images: {
      banner: {
        url: "/assets/inner-banner/freepik-enhance-42835.jpg",
        alt: "Contact Us - Lupin"
      },
      petal: {
        url: "/assets/inner-banner/petal-2.svg",
        alt: "Decorative petal"
      }
    }
  };

  // Section data for ContactUsSection
  const sectionData = {
    heading: "Get In Touch",
    subheading: "Write to us",
    contacts: [
      {
        title: "Enquiries",
        email: "info@lupin.com"
      },
      {
        title: "Investor Relations",
        email: "ravikagrawal@lupin.com"
      },
      {
        title: "Careers",
        email: "careers@lupin.com"
      }
    ]
  };

  // Location slider data
  const locationSliderData = {
    locations: [
      {
        id: 'india',
        name: 'INDIA',
        label: 'India',
        image: '/assets/images/contact/india.png',
        addresses: [
          {
            title: 'Corporate Office',
            address: [
              'Lupin Limited, 3rd Floor, Kalpataru Inspire,',
              'Off. Western Expressway Highway,',
              'Santacruz (East), Mumbai, India. 400 055',
              'Phone: +91 22 6640 2323 Email: info@lupin.com'
            ]
          },
          {
            title: 'Registered Office',
            address: [
              'Lupin Limited, 3rd Floor, Kalpataru Inspire,',
              'Off. Western Expressway Highway,',
              'Santacruz (East), Mumbai, India. 400 055',
              'Phone: +91 22 6640 2323 Email: info@lupin.com'
            ]
          },
          {
            title: 'Corporate Identity Number (CIN):',
            address: ['L24100MH1983PLC029442']
          },
          {
            title: 'DRUG SAFETY CONTACT INFORMATION:',
            address: [
              'Patients and other consumers should contact their physician with questions about prescription products and their indications. To obtain medical information or to report an adverse event or product complaint, please call on the toll-free numbers 1800-209-2505 / 1800-266-7400 or email us at dsrm@lupin.com'
            ]
          }
        ]
      },
      {
        id: 'us',
        name: 'U.S.',
        label: 'U.S.',
        image: '/assets/images/contact/india.png',
        addresses: [
          {
            title: 'Head Office',
            address: [
              'Lupin Pharmaceuticals Inc.',
              '3 Parkway North, Suite 400',
              'Deerfield, IL 60015, USA',
              'Phone: +1 847-948-3300 Email: info@lupin.com'
            ]
          }
        ]
      },
      {
        id: 'latam',
        name: 'LATAM',
        label: 'LATAM',
        image: '/assets/images/contact/india.png',
        addresses: [
          {
            title: 'Regional Office',
            address: [
              'Lupin Latin America',
              'Address details to be added',
              'Phone: Email:'
            ]
          }
        ]
      },
      {
        id: 'apac',
        name: 'APAC',
        label: 'APAC',
        image: '/assets/images/contact/india.png',
        addresses: [
          {
            title: 'Regional Office',
            address: [
              'Lupin Asia Pacific',
              'Address details to be added',
              'Phone: Email:'
            ]
          }
        ]
      },
      {
        id: 'emea',
        name: 'EMEA',
        label: 'EMEA',
        image: '/assets/images/contact/india.png',
        addresses: [
          {
            title: 'Regional Office',
            address: [
              'Lupin Europe, Middle East & Africa',
              'Address details to be added',
              'Phone: Email:'
            ]
          }
        ]
      }
    ]
  };

      return (
        <div style={{ position: 'relative' }}>
          <InnerBanner data={bannerData} />
          <ContactUsSection data={sectionData} />
          <ContactUsLocationSlider data={locationSliderData} />
          <ContactUsForm />
        </div>
      );
}


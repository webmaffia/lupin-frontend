import Image from 'next/image';
import Link from 'next/link';
import '@/scss/components/sustainability/SustainabilityCTASection.scss';

export default function SustainabilityCTASection() {
  const ctaItems = [
    {
      id: 1,
      title: "Sustainability Policies",
      href: "#",
      isPrimary: true,
      icon: "imgGroup96"
    },
    {
      id: 2,
      title: "Carbon Reduction Pathway – Net Zero",
      href: "#",
      isPrimary: false,
      icon: "imgGroup97"
    },
    {
      id: 3,
      title: "Human Rights Reports",
      href: "#",
      isPrimary: false,
      icon: "imgGroup97"
    },
    {
      id: 4,
      title: "TCFD Report",
      href: "#",
      isPrimary: false,
      icon: "imgGroup97"
    },
    {
      id: 5,
      title: "ESG Goals",
      href: "#",
      isPrimary: false,
      icon: "imgGroup97"
    },
    {
      id: 6,
      title: "Read our entire Integrated report here",
      href: "#",
      isPrimary: false,
      icon: "imgGroup97"
    }
  ];

  return (
    <section className="sustainability-cta">
      <div className="sustainability-cta__container">
        <div className="sustainability-cta__grid">
          {ctaItems.map((item) => (
            <Link 
              key={item.id} 
              href={item.href}
              className={`sustainability-cta__card ${item.isPrimary ? 'sustainability-cta__card--primary' : ''}`}
            >
              <span className="sustainability-cta__card-text">{item.title}</span>
              <div className="sustainability-cta__card-icon">
                <Image 
                  src={item.isPrimary 
                    ? "/assets/images/sustainability/a6533c54f9df6306e2b191c9999973143c4073fa.svg"
                    : "/assets/images/sustainability/b9ccf46e480fff21e8efd04012ad80a27776b5e8.svg"
                  }
                  alt="Arrow icon" 
                  width={24}
                  height={24}
                  className="sustainability-cta__icon-img"
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}


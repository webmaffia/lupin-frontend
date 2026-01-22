import InnerBanner from '@/components/InnerBanner';
import AlliedBusinessIntro from '@/components/AlliedBusinessIntro';
import AlliedBusinessLupinLife from '@/components/AlliedBusinessLupinLife';
import AlliedBusinessLightBox from '@/components/AlliedBusinessLightBox';
import AlliedBusinessDigitalHealth from '@/components/AlliedBusinessDigitalHealth';
import AlliedBusinessAtharvAbility from '@/components/AlliedBusinessAtharvAbility';
import AlliedBusinessLifeSciences from '@/components/AlliedBusinessLifeSciences';
import AlliedBusinessLookingAhead from '@/components/AlliedBusinessLookingAhead';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo';

// Generate metadata for the Allied Business page
export const metadata = generateSEOMetadata({
  title: "Allied Business - Lupin | Strategic Business Partnerships",
  description: "At Lupin, patient centricity is about building meaningful, accessible and holistic healthcare solutions. Through our allied businesses, we are addressing unmet needs across diagnosis, prevention, treatment and rehabilitation.",
  canonicalUrl: "https://www.lupin.com/allied-business",
  keywords: "Lupin allied business, strategic partnerships, business collaborations, pharmaceutical partnerships, Lupin Limited, patient centricity, healthcare solutions",
});

export default function AlliedBusinessPage() {
  // Banner data for InnerBanner
  const bannerData = {
    title: {
      line1: "Allied Business",
    },
    subheading: {
      enabled: true,
      text: "Caring for our Patients Beyond Medicines "
    },
    images: {
      banner: {
        url: "/assets/inner-banner/freepik-enhance-42835.jpg",
        alt: "Allied Business - Lupin"
      },
      petal: {
        url: "/assets/inner-banner/petal-2.svg",
        alt: "Decorative petal"
      }
    }
  };

  // Intro section data
  const introData = {
    text: "At Lupin, patient centricity is about building meaningful, accessible and holistic healthcare solutions. Through our allied businesses, we are addressing unmet needs across diagnosis, prevention, treatment and rehabilitation. Our specialized arms and focused services reflect our commitment to making healthcare more inclusive, personalized, and impactful. Discover how our allied businesses are transforming care and enhancing lives."
  };

  // LupinLife section data
  const lupinLifeData = {
    heading: "LupinLife Consumer Healthcare",
    content: [
      "LupinLife is our consumer healthcare arm, focused on delivering science-led, trusted wellness solutions that are aligned with India's evolving healthcare needs. As a strategic arm of Lupin's prescription business, LupinLife represents a strong pivot towards the holistic over-the-counter (OTC) medication segment.",
      "Since its inception in 2017, LupinLife has built a diversified portfolio across gastro care, health supplements, women's health, and pain management. Its flagship brand Softovac leads the bulk laxatives category with a 42% market share and has doubled in size over 5 years, driven by innovations like Softovac Liquid Fibre.",
      "In the children's health category, Aptivate has strengthened emotional engagement with families through high-impact activations. Our OTC segment accelerates portfolio innovation and unlocks sharper consumer focus for sustainable future growth."
    ],
    websiteUrl: "https://lupinlife.com/",
    websiteText: "LupinLife",
    image: {
      url: "/assets/images/AlliedBusiness/joyful-family-moments-children-play-parents-laugh-umbrella-protection 1.png",
      alt: "Joyful family moments - LupinLife Consumer Healthcare"
    }
  };

  // LightBox section data (Lupin Diagnostics)
  const lightBoxData = {
    heading: "Lupin Diagnostics",
    content: [
      "Lupin Diagnostics plays a pivotal role in India's shift toward preventive and personalized healthcare by delivering high-quality, accessible diagnostic services. Launched in 2021, the business has rapidly built a pan-India presence with 44 processing labs across 250+ cities, including Tier 3 and Tier 4 towns.",
      "Serving 150,000+ patients every month, Lupin Diagnostics has achieved strong revenue growth in just three years. Quality is central to our operations, with NABL-accredited greenfield labs and a 450,000 sq ft state-of-the-art National Reference Laboratory in Navi Mumbai that's equipped with advanced genomic and molecular technologies.",
      "With 750+ collection centers, 200+ trained field executives, and a robust home-collection network, Lupin Diagnostics ensures last-mile access and reliable results."
    ],
    websiteUrl: "https://www.lupindiagnostics.com/",
    websiteText: "Lupin Diagnostics",
    image: {
      url: "/assets/images/AlliedBusiness/Image.png",
      alt: "Lupin Diagnostics - Healthcare Services"
    }
  };

  // Digital Health section data
  const digitalHealthData = {
    heading: "Lupin Digital Health",
    content: [
      "Lupin Digital Health is redefining chronic disease management through clinically validated digital therapies, with a strong focus on cardiovascular care. Its flagship platform, LYFE, supports patients with heart diseases through remote monitoring, behavioral support, and digital care coaches, reaching 380+ districts across India.",
      "The platform integrates seamlessly into patient journeys through partnerships with insurers, hospitals, and surgical care providers. Expanding beyond treatment, Lupin Digital Health has also launched a prevention-focused platform for individuals at risk of cardiometabolic diseases such as hypertension, type 2 diabetes, dyslipidemia, and obesity.",
      "Backed by global collaborations, including with the American College of Cardiology, and multiple peer-reviewed publications, the platform combines scientific rigor with user-centric design. With key regulatory approvals and global quality certifications, the business represents a scalable, human-first approach to digital care."
    ],
    websiteUrl: "https://content.ldhlyfe.in/",
    websiteText: "Lupin Digital Health",
    image: {
      url: "/assets/images/AlliedBusiness/health.png",
      alt: "Lupin Digital Health - Healthcare Technology"
    }
  };

  // Atharv Ability section data
  const atharvAbilityData = {
    heading: "Atharv Ability",
    content: [
      "Atharv Ability reflects Lupin's bold and compassionate dedication to neurological rehabilitation, addressing a critically underserved area of care in India. Established as a state-of-the-art outpatient neuro-rehabilitation center in Mumbai, India, Atharv Ability delivers customized, multidisciplinary therapies for adults and children with complex neurological conditions. The center has demonstrated 30–40% improvement in functional recovery and quality of life across patient cohorts.",
      "Atharv Ability caters to a wide spectrum of conditions like stroke, brain or spine injury, Parkinson's disease, cerebral palsy, MS, and more. Its integrated care model includes neurophysiotherapy, robotic rehabilitation, speech and occupational therapy, cognitive and pediatric neurological rehabilitation, and aqua therapy, among many others.",
      "In FY25, Atharv Ability treated 2,800+ patients and delivered nearly 40,000 therapy sessions, helping many regain mobility and independence. With its architecture built on clinical excellence and technological precision, Atharv Ability is now expanding into Hyderabad, setting new benchmarks for accessible high-quality neurorehabilitation in India."
    ],
    websiteUrl: "#",
    websiteText: "Atharv Ability",
    image: {
      url: "/assets/images/AlliedBusiness/ability.png",
      alt: "Atharv Ability - Neurological Rehabilitation"
    }
  };

  // Life Sciences section data
  const lifeSciencesData = {
    heading: "Lupin Life Sciences",
    content: [
      "Lupin Life Sciences (LLS) is Lupin's trade generics business unit, created as our wholly owned subsidiary. The intent of this unit is to sharpen focus in a fast-growing and high-impact segment. With a portfolio of 350+ products spanning across pain management, gastrointestinal care, anti-infectives, respiratory care, dermatology, and multivitamins, LLS takes a step forward in Lupin's commitment to making affordable healthcare accessible to all.",
      "The business has undergone a strategic transformation by streamlining its operations and expanding its national footprint. LLS efforts are shifting and directed towards demand generation at the last mile, with a strong field force, and deeper chemist engagement.",
      "LLS is enhancing patient access to quality medicines. Its renewed approach positions it as a market shaper in India's evolving trade generics landscape."
    ],
    image: {
      url: "/assets/images/AlliedBusiness/sci.png",
      alt: "Lupin Life Sciences - Laboratory Research"
    }
  };

  // Looking Ahead section data
  const lookingAheadData = {
    heading: "Looking Ahead",
    content: [
      "By combining the power of science, technology and empathy, Lupin is continuing to create integrated care models and services that serve as touchpoints across various stages of the patient journey."
    ],
    image: {
      url: "/assets/images/AlliedBusiness/biopharmaceutical-industry-laboratory-with-scientist-handling-vials-modern-research-facility (1) 1.png",
      alt: "Biopharmaceutical Industry Laboratory"
    },
    pointerIcon: {
      url: "/assets/images/AlliedBusiness/Group.svg",
      alt: "Pointer Icon"
    }
  };

  return (
    <div style={{ position: 'relative' }}>
      <InnerBanner data={bannerData} />
      <AlliedBusinessIntro data={introData} />
      <AlliedBusinessLupinLife data={lupinLifeData} />
      <AlliedBusinessLightBox data={lightBoxData} />
      <AlliedBusinessDigitalHealth data={digitalHealthData} />
      <AlliedBusinessAtharvAbility data={atharvAbilityData} />
      <AlliedBusinessLifeSciences data={lifeSciencesData} />
      <AlliedBusinessLookingAhead data={lookingAheadData} />
    </div>
  );
}


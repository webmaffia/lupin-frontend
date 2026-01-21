import InnerBanner from '@/components/InnerBanner';
import ScienceIntro from '@/components/ScienceIntro';
import ScienceHighlights from '@/components/ScienceHighlights';
import ScienceResearch from '@/components/ScienceResearch';
import ScienceDigital from '@/components/ScienceDigital';
import ScienceCapability from '@/components/ScienceCapability';
import ScienceCapabilities from '@/components/ScienceCapabilities';
import ScienceArchitecture from '@/components/ScienceArchitecture';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo';
import { mapTopBannerData, mapScienceIntroData, mapScienceResearchData, mapScienceDigitalData, mapScienceCapabilityData, mapScienceCapabilitiesData, mapScienceArchitectureData, fetchAPI } from '@/lib/strapi';
import '@/scss/pages/our-science.scss';

// Generate metadata for the Our Science page
export const metadata = generateSEOMetadata({
  title: "Our Science - Lupin | Pharmaceutical Research & Innovation",
  description: "Discover Lupin's commitment to pharmaceutical research, innovation, and scientific excellence. Learn about our research capabilities, development programs, and scientific breakthroughs.",
  canonicalUrl: "https://www.lupin.com/our-science",
  keywords: "Lupin science, pharmaceutical research, drug development, pharmaceutical innovation, research and development, Lupin R&D, scientific excellence",
});

export default async function OurSciencePage() {
  // Fetch data from Strapi
  let bannerData = null;

  try {
    const strapiData = await fetchAPI('our-science?populate=deep', {
      next: { revalidate: 60 },
    });
    
    // Map TopBanner data for InnerBanner
    const data = strapiData?.data || strapiData;
    if (data?.TopBanner) {
      bannerData = mapTopBannerData(data.TopBanner);
    }
  } catch (error) {
    console.error('Error fetching our-science data from Strapi:', error);
    // Will use default data below
  }

  // Default banner data if Strapi data is not available
  if (!bannerData) {
    bannerData = {
      title: {
        line1: "Our",
        line2: "Science"
      },
      subheading: {
        enabled: false,
        text: ""
      },
      images: {
        banner: {
          url: "/assets/inner-banner/freepik-enhance-42835.jpg",
          alt: "Our Science - Lupin"
        },
        bannerMobile: {
          url: "/assets/inner-banner/freepik-enhance-42835.jpg",
          alt: "Our Science - Lupin"
        },
        petal: {
          url: "/assets/inner-banner/petal-2.svg",
          alt: "Decorative petal"
        }
      }
    };
  }

  // Fetch intro data from Strapi
  let introData = null;

  try {
    const strapiData = await fetchAPI('our-science?populate=deep', {
      next: { revalidate: 60 },
    });
    
    introData = mapScienceIntroData(strapiData);
  } catch (error) {
    console.error('Error fetching our-science intro data from Strapi:', error);
  }

  // Default intro data if Strapi data is not available
  if (!introData) {
    introData = {
      heading: {
        line1: "Turning intellectual capital",
        line2: "into meaningful healthcare impact"
      },
      description: "At Lupin, behind every product manufactured or a formulation created lies the power of science. Our intellectual prowess resides in subject-matter expertise, a passion for innovation, and in-depth research. In everything we do, here at Lupin, science is reflected through our Research and Development unit and our continuous focus on Digital Transformation."
    };
  }

  // Fetch highlights data from Strapi
  let highlightsData = null;

  try {
    const strapiData = await fetchAPI('our-science?populate=deep', {
      next: { revalidate: 60 },
    });
    
    const data = strapiData?.data || strapiData;
    if (data?.Highlights || data?.highlights || data?.KeyHighlights || data?.keyHighlights) {
      const highlights = data.Highlights || data.highlights || data.KeyHighlights || data.keyHighlights;
      
      // Handle different Strapi structures
      if (Array.isArray(highlights.items)) {
        highlightsData = { items: highlights.items };
      } else if (Array.isArray(highlights)) {
        highlightsData = { items: highlights };
      } else if (Array.isArray(highlights.cards)) {
        highlightsData = { items: highlights.cards };
      }
    }
  } catch (error) {
    console.error('Error fetching our-science highlights data from Strapi:', error);
  }

  // Default highlights data if Strapi data is not available
  if (!highlightsData) {
    highlightsData = {
      items: [
        {
          value: "480",
          label: "Cumulative Patents"
        },
        {
          value: "713",
          label: "Cumulative Filings"
        },
        {
          value: "550",
          label: "Cumulative Approvals"
        },
        {
          value: "INR 170,000+",
          label: "Mn Investment In R&D"
        },
        {
          value: "7",
          label: "Research Centers Globally"
        },
        {
          value: "1,400 +",
          label: "Experts"
        }
      ]
    };
  }

  // Fetch research data from Strapi
  let researchData = null;

  try {
    const strapiData = await fetchAPI('our-science?populate=deep', {
      next: { revalidate: 60 },
    });
    
    researchData = mapScienceResearchData(strapiData);
  } catch (error) {
    console.error('Error fetching our-science research data from Strapi:', error);
  }

  // Default research data if Strapi data is not available
  if (!researchData) {
    researchData = {
      heading: "Research and Development",
      content: [
        "Innovation at Lupin is driven by a single motivation; to deliver advanced, accessible and safe healthcare solutions to reduce the burden of diseases worldwide.",
        "Our globally spread R&D centers and team of scientists bring deep domain knowledge across complex generics, specialty formulations, Active Pharmaceutical Ingredients and novel therapies.",
        "With 41 product filings and 52 approvals in FY25, Lupin is gaining momentum in complex generics and Active Pharmaceutical Ingredients. Our Intellectual Property Management Group plays a vital role in safeguarding innovations across Active Pharmaceutical Ingredients, biologics, and novel chemical entities.",
        "In FY25, we secured 87 patents out of which 6 were for formulations and 81 for new chemical entities.",
        "Our New Chemical Entity (NCE) team, with a strategic focus on oncology, immunology, and metabolic disorders, is advancing novel therapeutics from early-stage research through clinical development. These efforts underscore our commitment to delivering breakthrough medicines that transform lives."
      ],
      image: {
        url: "/assets/images/our-sci/biotechnology-scientist-researching-laboratory-using-microscope-typing-pc-chemist-examining-virus-evolution-using-high-tech-scientific-research-vaccine-development-against-covid19-1 1.png",
        alt: "Scientist researching in laboratory"
      }
    };
  }

  // Fetch digital data from Strapi
  let digitalData = null;

  try {
    const strapiData = await fetchAPI('our-science?populate=deep', {
      next: { revalidate: 60 },
    });
    
    digitalData = mapScienceDigitalData(strapiData);
  } catch (error) {
    console.error('Error fetching our-science digital data from Strapi:', error);
  }

  // Default digital data if Strapi data is not available
  if (!digitalData) {
    digitalData = {
      mainHeading: "Digital Transformation",
      introParagraph: "At Lupin, our digital ambition is anchored in our purpose, to catalyze treatments that transform hope into healing.",
      sectionHeading: {
        line1: "Our Digital",
        line2: "Ambition"
      },
      description: "From Labs to Lives - We aspire to build an intelligent, resilient, and trusted enterprise where digital capabilities strengthen how we operate, innovate, and scale.",
      image: {
        url: "/assets/images/our-sci/doctor-from-future-concept (2) 1.png",
        alt: "Future doctor concept"
      }
    };
  }

  // Fetch capability data from Strapi
  let capabilityData = null;

  try {
    const strapiData = await fetchAPI('our-science?populate=deep', {
      next: { revalidate: 60 },
    });
    
    capabilityData = mapScienceCapabilityData(strapiData);
  } catch (error) {
    console.error('Error fetching our-science capability data from Strapi:', error);
  }

  // Default capability data if Strapi data is not available
  if (!capabilityData) {
    capabilityData = {
      text: "We are realizing this ambition through a Core-Common-Distinct business capability model, guided by clear enterprise architecture principles."
    };
  }

  // Fetch capabilities data from Strapi
  let capabilitiesData = null;

  try {
    const strapiData = await fetchAPI('our-science?populate=deep', {
      next: { revalidate: 60 },
    });
    
    capabilitiesData = mapScienceCapabilitiesData(strapiData);
  } catch (error) {
    console.error('Error fetching our-science capabilities data from Strapi:', error);
  }

  // Default capabilities data if Strapi data is not available
  if (!capabilitiesData) {
    capabilitiesData = {
      capabilities: [
        {
          title: "Core",
          description: "business capabilities provide a secure, reliable backbone for the enterprise.",
          icon: "/assets/images/our-sci/icon22.svg"
        },
        {
          title: "Common",
          description: "business capabilities are designed for reuse and consistency across the organization.",
          icon: "/assets/images/our-sci/icon22.svg"
        },
        {
          title: "Distinct",
          description: "business capabilities enable our businesses (manufacturing, quality, R&D, supply chain, and commercial), to innovate and differentiate with agility, while staying aligned to enterprise standards.",
          icon: "/assets/images/our-sci/icon22.svg"
        }
      ]
    };
  }

  // Fetch architecture data from Strapi
  let architectureData = null;

  try {
    const strapiData = await fetchAPI('our-science?populate=deep', {
      next: { revalidate: 60 },
    });
    
    architectureData = mapScienceArchitectureData(strapiData);
  } catch (error) {
    console.error('Error fetching our-science architecture data from Strapi:', error);
  }

  // Default architecture data if Strapi data is not available
  if (!architectureData) {
    architectureData = {
      content: [
        {
          text: "Our enterprise architecture principles ensure that we remain ",
          bold: "experience-led, data-first, cloud-enabled, AI-powered, and quality-by-design.",
          after: " These principles help us make disciplined technology choices, reduce complexity, and scale innovation responsibly."
        },
        " ",
        "A unified GenAI platform, strong data foundations, and platform-led design allow intelligence to be embedded seamlessly into everyday decisions and operations.",
        " ",
        {
          text: "Ultimately, our digital ambition is about ",
          bold: "people, purpose, and performance.",
          after: " Through proactive communication, team collaboration and by building AI fluency, we create shared momentum and confidence in change."
        },
        " ",
        {
          text: "This is how Lupin continues to strengthen its digital foundation, ",
          bold: "running with purpose, growing with resilience, and innovating without limits.",
          after: ""
        },
        " ",
        "We do this to deliver better outcomes for patients worldwide."
      ]
    };
  }

  return (
    <div style={{ position: 'relative' }}>
      <InnerBanner data={bannerData} />
      <ScienceIntro data={introData} />
      <ScienceHighlights data={highlightsData} />
      <ScienceResearch data={researchData} />
      <ScienceDigital data={digitalData} />
      <ScienceCapability data={capabilityData} />
      <ScienceCapabilities data={capabilitiesData} />
      <ScienceArchitecture data={architectureData} />
    </div>
  );
}


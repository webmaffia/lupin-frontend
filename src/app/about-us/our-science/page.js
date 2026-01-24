import InnerBanner from '@/components/InnerBanner';
import ScienceIntro from '@/components/ScienceIntro';
import ScienceHighlights from '@/components/ScienceHighlights';
import ScienceResearch from '@/components/ScienceResearch';
import ScienceDigital from '@/components/ScienceDigital';
import ScienceCapability from '@/components/ScienceCapability';
import ScienceCapabilities from '@/components/ScienceCapabilities';
import ScienceArchitecture from '@/components/ScienceArchitecture';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo';
import { getOurScience, mapOurScienceData } from '@/lib/strapi-pages';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import '@/scss/pages/our-science.scss';

// Generate metadata for the Our Science page
export const metadata = generateSEOMetadata({
  title: "Our Science - Lupin | Pharmaceutical Research & Innovation",
  description: "Discover Lupin's commitment to pharmaceutical research, innovation, and scientific excellence. Learn about our research capabilities, development programs, and scientific breakthroughs.",
  canonicalUrl: "https://www.lupin.com/about-us/our-science",
  keywords: "Lupin science, pharmaceutical research, drug development, pharmaceutical innovation, research and development, Lupin R&D, scientific excellence",
});

export default async function OurSciencePage() {
  // Fetch data from Strapi
  let scienceData = {
    banner: null,
    introSection: null,
    numberHighlightsSection: null,
    researchDevelopmentSection: null,
    digitalTransformationSection: null,
    paragraphSection: null,
    coreSection: null,
    contentSection: null
  };

  try {
    const strapiData = await getOurScience();
    
    // Debug logging
    if (process.env.NODE_ENV === 'development') {
      console.log('OurSciencePage - Raw Strapi data:', strapiData);
      console.log('OurSciencePage - ParaGraphSection from API:', strapiData?.data?.ParaGraphSection);
      console.log('OurSciencePage - ContentSection from API:', strapiData?.data?.ContentSection);
    }
    
    scienceData = mapOurScienceData(strapiData);
    
    // Debug logging after mapping
    if (process.env.NODE_ENV === 'development') {
      console.log('OurSciencePage - Mapped scienceData:', scienceData);
      console.log('OurSciencePage - paragraphSection:', scienceData.paragraphSection);
      console.log('OurSciencePage - contentSection:', scienceData.contentSection);
    }
  } catch (error) {
    console.error('Error fetching our-science data from Strapi:', error);
  }

  return (
    <div style={{ position: 'relative' }}>
      {scienceData.banner && <InnerBanner data={scienceData.banner} />}
      
      {scienceData.introSection && <ScienceIntro data={scienceData.introSection} />}
      
      {scienceData.numberHighlightsSection && (
        <ScienceHighlights data={scienceData.numberHighlightsSection} />
      )}
      
      {scienceData.researchDevelopmentSection && (
        <ScienceResearch data={scienceData.researchDevelopmentSection} />
      )}
      
      {scienceData.digitalTransformationSection && (
        <ScienceDigital data={scienceData.digitalTransformationSection} />
      )}
      
      {scienceData.paragraphSection && (
        <ScienceCapability data={scienceData.paragraphSection} />
      )}
      
      {scienceData.coreSection && (
        <ScienceCapabilities data={scienceData.coreSection} />
      )}
      
      {scienceData.contentSection && (
        <ScienceArchitecture data={scienceData.contentSection} />
      )}
    </div>
  );
}


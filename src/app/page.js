import Hero from '@/components/Hero';
import OurStory from '@/components/OurStory';
import OurPurpose from '@/components/OurPurpose';
import Overview from '@/components/Overview';
import OurBusiness from '@/components/OurBusiness';
import Investors from '@/components/Investors';
import Sustainability from '@/components/Sustainability';
import CSR from '@/components/CSR';
import Life from '@/components/Life';
import NewsInsights from '@/components/NewsInsights';
import GoldenLine from '@/components/GoldenLine';
import MobileLine from '@/components/MobileLine';
import { generateMetadata as generateSEOMetadata, generateOrganizationSchema } from '@/lib/seo';
import { getHomepage, mapHomepageHeroData, mapHomepageOurStoryData, mapHomepageOurPurposeData, mapHomepageOverviewData, mapHomepageOurBusinessData, mapHomepageSustainabilityData, mapHomepageCSRData, mapHomepageLifeData, mapHomepageNewsInsightsData } from '@/lib/strapi';

// Generate metadata for the home page
export const metadata = generateSEOMetadata({
  title: "Lupin - Global Pharmaceutical Leader | Innovations in Healthcare",
  description: "Lupin is a leading pharmaceutical company committed to improving lives through innovative medicines, global reach, and sustainable healthcare solutions across 100+ countries.",
  canonicalUrl: "https://www.lupin.com", // Update with your actual domain
  keywords: "Lupin, pharmaceutical, healthcare, medicines, global pharma, innovation, sustainability",
});

export default async function Home() {
  // Generate structured data for SEO
  const organizationSchema = generateOrganizationSchema();

  // Fetch homepage data from Strapi - no fallback, must get from API
  const homepageData = await getHomepage();
  
  // Log raw API response for debugging
  console.log('Raw Strapi API response:', JSON.stringify(homepageData, null, 2));
  
  const heroData = mapHomepageHeroData(homepageData);
  const ourStoryData = mapHomepageOurStoryData(homepageData);
  const ourPurposeData = mapHomepageOurPurposeData(homepageData);
  const overviewData = mapHomepageOverviewData(homepageData);
  const ourBusinessData = mapHomepageOurBusinessData(homepageData);
  const sustainabilityData = mapHomepageSustainabilityData(homepageData);
  const csrData = mapHomepageCSRData(homepageData);
  const lifeData = mapHomepageLifeData(homepageData);
  const newsInsightsData = mapHomepageNewsInsightsData(homepageData);
  
  // Log mapped data for debugging
  console.log('Mapped hero data:', JSON.stringify(heroData, null, 2));
  console.log('Mapped ourStory data:', JSON.stringify(ourStoryData, null, 2));
  console.log('Mapped ourPurpose data:', JSON.stringify(ourPurposeData, null, 2));
  console.log('Mapped overview data:', JSON.stringify(overviewData, null, 2));
  console.log('Mapped ourBusiness data:', JSON.stringify(ourBusinessData, null, 2));
  console.log('Mapped sustainability data:', JSON.stringify(sustainabilityData, null, 2));
  console.log('Mapped CSR data:', JSON.stringify(csrData, null, 2));
  console.log('Mapped life data:', JSON.stringify(lifeData, null, 2));
  console.log('Mapped newsInsights data:', JSON.stringify(newsInsightsData, null, 2));

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />

      <div style={{ position: 'relative', overflow: 'hidden' }}>
        <GoldenLine />
       
        <Hero data={heroData} />
        <main>
          <OurStory data={ourStoryData} />
          <OurPurpose data={ourPurposeData} />
          <Overview data={overviewData} />
          <OurBusiness data={ourBusinessData} />
          <Investors />
          <Sustainability data={sustainabilityData} />
          <CSR data={csrData} />
          <Life data={lifeData} />
          <NewsInsights data={newsInsightsData} />
        </main>
      </div>
    </>
  );
}

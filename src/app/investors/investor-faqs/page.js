import InnerBanner from '@/components/InnerBanner';
import InvestorFAQs from '@/components/InvestorFAQs';
import SubscriberUpdated from '@/components/SubscriberUpdated';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo';
import { fetchAPI } from '@/lib/strapi';

// Generate metadata for the investor FAQs page
export const metadata = generateSEOMetadata({
  title: "Investor FAQs - Lupin | Investor Relations",
  description: "Find answers to frequently asked questions about Lupin's investor relations, stock information, dividends, and corporate governance.",
  canonicalUrl: "https://www.lupin.com/investors/investor-faqs",
  keywords: "Lupin investor FAQs, investor relations, stock questions, dividend information, corporate governance",
});

export default async function InvestorFAQSPage() {
  // Fetch initial FAQs from Strapi (first 5)
  let initialFAQs = [];
  try {
    const data = await fetchAPI('investor-faqs?pagination[start]=0&pagination[limit]=5&sort=id:asc', {
      next: { revalidate: 60 },
    });
    
    if (data.data && data.data.length > 0) {
      initialFAQs = data.data.map((item, index) => ({
        id: index,
        question: item.attributes?.question || item.attributes?.title || '',
        answer: item.attributes?.answer || item.attributes?.content || ''
      }));
    }
  } catch (error) {
    console.error('Error fetching initial FAQs:', error);
    // Will use default FAQs from component
  }
  const bannerData = {
    title: {
      line1: "Investor",
      line2: "FAQs"
    },
    images: {
      banner: {
        url: "/assets/inner-banner/freepik-enhance-42835.jpg",
        alt: "Investor FAQs"
      },
      petal: {
        url: "/assets/inner-banner/petal-2.svg",
        alt: "Decorative petal"
      }
    }
  };
  
  return (
    <div style={{ position: 'relative' }}>
      <InnerBanner data={bannerData} />
      <InvestorFAQs initialFAQs={initialFAQs} />
      <SubscriberUpdated />
    </div>
  );
}


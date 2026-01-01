import InnerBanner from '@/components/InnerBanner';
import EmployeeStockOptionSchemes from '@/components/EmployeeStockOptionSchemes';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo';

// Generate metadata for the employee stock option schemes page
export const metadata = generateSEOMetadata({
  title: "Employee Stock Option Schemes - Lupin | Investor Relations",
  description: "View Lupin's Employee Stock Option Schemes and related documents for investors.",
  canonicalUrl: "https://www.lupin.com/investors/employee-stock-option-schemes",
  keywords: "Lupin employee stock option schemes, ESOP, investor relations, stock options",
});

export default function EmployeeStockOptionSchemesPage() {
  // Custom banner data for this page
  const bannerData = {
    title: {
      line1: "Employee Stock Option",
      line2: "Schemes"
    },
    images: {
      banner: {
        url: "/assets/inner-banner/freepik-enhance-42835.jpg",
        alt: "Employee Stock Option Schemes"
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
      <EmployeeStockOptionSchemes />
    </div>
  );
}


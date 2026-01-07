import InnerBanner from '@/components/InnerBanner';
import TransferPhysicalShares from '@/components/TransferPhysicalShares';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo';

// Generate metadata for the transfer of physical shares page
export const metadata = generateSEOMetadata({
  title: "Transfer of Physical Shares (Re-lodgement) - Lupin | Investor Relations",
  description: "Information about re-lodging transfer requests for physical shares that were rejected and returned to the lodger on or before March 31, 2019.",
  canonicalUrl: "https://www.lupin.com/investors/transfer-physical-shares",
  keywords: "Lupin physical shares, share transfer, re-lodgement, RTA, MUFG Intime, investor relations",
});

export default function TransferPhysicalSharesPage() {
  // Custom banner data for this page
  const bannerData = {
    title: {
      line1: "Transfer of Physical",
      line2: "Shares (Re-lodgement)"
    }
  };

  return (
    <div style={{ position: 'relative' }}>
      <InnerBanner data={bannerData} />
      <TransferPhysicalShares />
    </div>
  );
}







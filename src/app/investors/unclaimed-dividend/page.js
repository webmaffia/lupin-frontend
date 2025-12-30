import InnerBanner from '@/components/InnerBanner';
import UnclaimedDividend from '@/components/UnclaimedDividend';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo';
import { fetchAPI } from '@/lib/strapi';

// Generate metadata for the unclaimed dividend page
export const metadata = generateSEOMetadata({
  title: "Unclaimed Dividend & Shares - Lupin | Investor Relations",
  description: "Check unclaimed dividends and equity shares information for Lupin Limited. Submit your Member ID to claim unclaimed dividends and shares as per IEPF Rules, 2016.",
  canonicalUrl: "https://www.lupin.com/investors/unclaimed-dividend",
  keywords: "Lupin unclaimed dividend, unclaimed shares, IEPF, investor relations, dividend claim",
});

export default async function UnclaimedDividendPage() {
  // Fetch data from Strapi
  let unclaimedData = null;
  try {
    const data = await fetchAPI('unclaimed-dividend?populate=deep', {
      next: { revalidate: 60 },
    });
    
    if (data.data && data.data.attributes) {
      // Map Strapi data to component format
      const attributes = data.data.attributes;
      unclaimedData = {
        title: attributes.title || attributes.heading,
        form: {
          memberIdPlaceholder: attributes.memberIdPlaceholder || attributes.form?.memberIdPlaceholder,
          formTypePlaceholder: attributes.formTypePlaceholder || attributes.form?.formTypePlaceholder,
          formTypeOptions: attributes.formTypeOptions || attributes.form?.formTypeOptions || [],
          submitText: attributes.submitText || attributes.form?.submitText
        },
        instructions: attributes.instructions || [],
        nodalOfficer: {
          name: attributes.nodalOfficerName || attributes.nodalOfficer?.name,
          email: attributes.nodalOfficerEmail || attributes.nodalOfficer?.email
        },
        decorativeImage: attributes.decorativeImage?.data ? {
          url: attributes.decorativeImage.data.attributes.url,
          alt: attributes.decorativeImage.data.attributes.alternativeText || ""
        } : null,
        notice: {
          title: attributes.notice?.title || attributes.noticeTitle,
          registrarAppointment: attributes.notice?.registrarAppointment || attributes.registrarAppointment,
          address: {
            company: attributes.notice?.address?.company || attributes.address?.company,
            unit: attributes.notice?.address?.unit || attributes.address?.unit,
            building: attributes.notice?.address?.building || attributes.address?.building,
            street: attributes.notice?.address?.street || attributes.address?.street,
            city: attributes.notice?.address?.city || attributes.address?.city
          },
          emails: {
            label: attributes.notice?.emails?.label || attributes.emailLabel,
            list: attributes.notice?.emails?.list || attributes.emailList || []
          },
          phones: attributes.notice?.phones || attributes.phones || [],
          importantNotice: attributes.notice?.importantNotice || attributes.importantNotice,
          iepfLink: {
            text: attributes.notice?.iepfLink?.text || attributes.iepfLinkText,
            url: attributes.notice?.iepfLink?.url || attributes.iepfLinkUrl
          },
          unclaimedDividend: {
            label: attributes.notice?.unclaimedDividend?.label || attributes.unclaimedDividendLabel,
            text: attributes.notice?.unclaimedDividend?.text || attributes.unclaimedDividendText,
            linkText: attributes.notice?.unclaimedDividend?.linkText || attributes.unclaimedDividendLinkText,
            linkUrl: attributes.notice?.unclaimedDividend?.linkUrl || attributes.unclaimedDividendLinkUrl
          }
        }
      };
    }
  } catch (error) {
    console.error('Error fetching unclaimed dividend data from Strapi:', error);
    // Will use default data from component
  }

  const bannerData = {
    title: {
      line1: "Unclaimed Dividend",
      line2: "& Shares"
    },
    images: {
      banner: {
        url: "/assets/inner-banner/freepik-enhance-42835.jpg",
        alt: "Unclaimed Dividend & Shares"
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
      <UnclaimedDividend data={unclaimedData} />
    </div>
  );
}


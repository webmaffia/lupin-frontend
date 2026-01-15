'use client';

import Image from 'next/image';
import Link from 'next/link';
import NavigationLinks from './NavigationLinks';
import '../scss/components/Policies.scss';

export default function Policies({ data }) {
  // Default data (will be replaced by Strapi)
  const policiesData = data || {
    policies: [
      {
        id: 1,
        title: "Dividend Distribution Policy",
        pdfUrl: "https://www.lupin.com/wp-content/uploads/2025/06/dividend-distribution-policy.pdf",
        isActive: false
      },
      {
        id: 2,
        title: "Nomination and Remuneration Policy",
        pdfUrl: "https://www.lupin.com/wp-content/uploads/2025/02/nomination-and-remuneration-policy.pdf",
        isActive: false
      },
      {
        id: 3,
        title: "Policy on Related Party Transactions",
        pdfUrl: "https://www.lupin.com/wp-content/uploads/2025/03/policy-on-related-party-transactions.pdf",
        isActive: false
      },
      {
        id: 4,
        title: "Policy for determining material subsidiaries",
        pdfUrl: "https://www.lupin.com/wp-content/uploads/2025/08/policy-for-determining-material-subsidiaries.pdf",
        isActive: false
      },
      {
        id: 5,
        title: "Authorized Persons: Policy For Determining Materiality For Disclosures Of Events Or Information",
        pdfUrl: "https://www.lupin.com/wp-content/uploads/2024/09/policy-for-determining-materiality-for-disclosures-of-events-or-information-1.pdf",
        isActive: false
      },
      {
        id: 6,
        title: "Policy For Determining Materiality For Disclosures Of Events Or Information",
        pdfUrl: "https://www.lupin.com/wp-content/uploads/2024/12/lupin-policy-for-determination-of-materiality-of-events-or-information.pdf",
        isActive: false
      },
      {
        id: 7,
        title: "Preservation of Documents and Archival Policy",
        pdfUrl: "https://www.lupin.com/wp-content/uploads/2025/06/preservation-of-documents-and-archival-policy.pdf",
        isActive: false
      },
      {
        id: 8,
        title: "Corporate Social Responsibility Policy",
        pdfUrl: "https://www.lupin.com/wp-content/uploads/2025/06/csr-policy-for-board-circulation.pdf",
        isActive: false
      },
      {
        id: 9,
        title: "Tax Strategy: Lupin Healthcare (UK) Ltd. (Formerly Lupin (Europe) Ltd.)",
        pdfUrl: "https://www.lupin.com/wp-content/uploads/2025/03/lupin-healthcare-uk-ltd-tax-strategy-fy-2024-25-v2.pdf",
        isActive: false
      },
      {
        id: 10,
        title: "Whistleblower Policy",
        pdfUrl: "https://www.lupin.com/wp-content/uploads/2022/02/Whistleblower-Policy-Website.pdf",
        isActive: false
      },
      {
        id: 11,
        title: "Board Diversity Policy",
        pdfUrl: "https://www.lupin.com/wp-content/uploads/2022/08/board-diversity-policy-signed.pdf",
        isActive: false
      },
      {
        id: 12,
        title: "Third Party Code of Conduct Policy",
        pdfUrl: "https://www.lupin.com/wp-content/uploads/2025/05/third-party-code-of-conduct.pdf",
        isActive: false
      },
      {
        id: 13,
        title: "Human Rights Policy",
        pdfUrl: "https://www.lupin.com/wp-content/uploads/2025/06/human-rights-policy-signed.pdf",
        isActive: false
      },
      {
        id: 14,
        title: "Environmental, Health, Safety and Sustainability Policy",
        pdfUrl: "https://www.lupin.com/wp-content/uploads/2025/06/ehss-policy.pdf",
        isActive: false
      },
      {
        id: 15,
        title: "Global Tax Policy",
        pdfUrl: "https://www.lupin.com/wp-content/uploads/2024/05/global-tax-policy-2024.pdf",
        isActive: false
      },
      {
        id: 16,
        title: "Biodiversity and No-Deforestation Commitment Policy",
        pdfUrl: "https://www.lupin.com/wp-content/uploads/2025/06/biodiversity-and-no-deforestation-commitment-policy-signed.pdf",
        isActive: false
      },
      {
        id: 17,
        title: "Diversity, Equity and Inclusion Policy",
        pdfUrl: "https://www.lupin.com/wp-content/uploads/2025/01/diversity-equity-and-inclusion-policy.pdf",
        isActive: false
      },
      {
        id: 18,
        title: "Our Position on Water",
        pdfUrl: "https://www.lupin.com/wp-content/uploads/2025/11/our-position-on-water.pdf",
        isActive: false
      },
      {
        id: 19,
        title: "Sustainable Procurement Policy",
        pdfUrl: "https://www.lupin.com/wp-content/uploads/2025/05/sustainable-procurement-policy.pdf",
        isActive: false
      },
      {
        id: 20,
        title: "Ethical Marketing Policy",
        pdfUrl: "https://www.lupin.com/wp-content/uploads/2025/05/ethical-marketing-policy.pdf",
        isActive: false
      },
      {
        id: 21,
        title: "Corporate Sustainability Policy",
        pdfUrl: "https://www.lupin.com/wp-content/uploads/2025/02/corporate-sustainability-policy.pdf",
        isActive: false
      },
      {
        id: 22,
        title: "Information Security Management Systems Policy",
        pdfUrl: "https://www.lupin.com/wp-content/uploads/2025/04/information-security-management-systems-policy.pdf",
        isActive: false
      },
      {
        id: 23,
        title: "Terms and Conditions for Appointment of Independent Directors",
        pdfUrl: "https://www.lupin.com/wp-content/uploads/2025/07/terms-and-conditions-of-appointment-of-independent-director.pdf",
        isActive: false
      },
      {
        id: 24,
        title: "Enterprise Risk Management (ERM) Policy",
        pdfUrl: "https://www.lupin.com/wp-content/uploads/2025/10/risk-management-policy.pdf",
        isActive: false
      },
      {
        id: 25,
        title: "Lupin’s Clinical Trial Commitment",
        pdfUrl: "https://www.lupin.com/wp-content/uploads/2026/01/lupins-clinical-trial-commitment.pdf",
        isActive: false
      },
      {
        id: 24,
        title: "Political Involvement Policy",
        pdfUrl: "https://www.lupin.com/wp-content/uploads/2026/01/political-involvement-policy.pdf",
        isActive: false
      },
      {
        id: 25,
        title: "Animal Testing Policy and Animal Welfare Program",
        pdfUrl: "https://www.lupin.com/wp-content/uploads/2025/11/animal-testing-policy-and-animal-welfare-program.pdf",
        isActive: false
      }
    ],
    images: {
      downloadButton: {
        active: "/assets/policies/download-button-active.svg",
        inactive: "/assets/policies/download-button-inactive.svg"
      },
      decorativeGroup: "/assets/policies/group.svg"
    }
  };

  return (
    <section className="policies">
      {/* Container */}
      <div className="policies__container">
        {/* Navigation Links */}
        <NavigationLinks links={[
          { id: 'committees', label: 'Committees of the Board', href: '/investors/committees' },
          { id: 'code-of-conduct', label: 'Code of Conduct', href: '/investors/code-of-conduct' },
          { id: 'policies', label: 'Policies', href: '/investors/policies' }
        ]} />

        {/* Content */}
        <div className="policies__content">
          {/* Policy Cards Grid */}
          <div className="policies__grid">
            {policiesData.policies.map((policy) => (
              <div
                key={policy.id}
                className="policy-card"
              >
                <div className="policy-card__content">
                  <h3 className="policy-card__title">{policy.title}</h3>
                  <div className="policy-card__download">
                    <Link href={policy.pdfUrl} className="policy-card__download-link">
                      Download PDF
                    </Link>
                    <Link href={policy.pdfUrl} className="policy-card__download-button">
                      <Image
                        src={policy.isActive ? policiesData.images.downloadButton.active : policiesData.images.downloadButton.inactive}
                        alt="Download"
                        width={104}
                        height={104}
                        className="policy-card__download-icon"
                        quality={100}
                      />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Decorative Group Image */}
          <div className="policies__decorative">
            <Image
              src={policiesData.images.decorativeGroup}
              alt=""
              width={319}
              height={313}
              className="policies__decorative-img"
              quality={100}
            />
          </div>
        </div>
      </div>
    </section>
  );
}


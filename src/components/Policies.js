'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import '../scss/components/Policies.scss';

export default function Policies({ data }) {
  const [activeTab, setActiveTab] = useState('policies');

  // Default data (will be replaced by Strapi)
  const policiesData = data || {
    tabs: [
      { id: 'committees', label: 'Committees of the Board' },
      { id: 'code-of-conduct', label: 'Code of Conduct' },
      { id: 'policies', label: 'Policies' }
    ],
    policies: [
      {
        id: 1,
        title: "Lupin Secures SBTi validation for Emission ReductionTargets",
        pdfUrl: "#",
        isActive: true
      },
      {
        id: 2,
        title: "Lupin Secures SBTi validation for Emission ReductionTargets",
        pdfUrl: "#",
        isActive: false
      },
      {
        id: 3,
        title: "Lupin Secures SBTi validation for Emission ReductionTargets",
        pdfUrl: "#",
        isActive: false
      },
      {
        id: 4,
        title: "Lupin Secures SBTi validation for Emission ReductionTargets",
        pdfUrl: "#",
        isActive: false
      },
      {
        id: 5,
        title: "Lupin Secures SBTi validation for Emission ReductionTargets",
        pdfUrl: "#",
        isActive: false
      },
      {
        id: 6,
        title: "Lupin Secures SBTi validation for Emission ReductionTargets",
        pdfUrl: "#",
        isActive: false
      },
      {
        id: 7,
        title: "Lupin Secures SBTi validation for Emission ReductionTargets",
        pdfUrl: "#",
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
        {/* Tabs Navigation */}
        <div className="policies__tabs">
          {policiesData.tabs.map((tab) => (
            <button
              key={tab.id}
              className={`policies__tab ${activeTab === tab.id ? 'policies__tab--active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content based on active tab */}
        {activeTab === 'policies' && (
          <div className="policies__content">
            {/* Policy Cards Grid */}
            <div className="policies__grid">
              {policiesData.policies.map((policy) => (
                <div
                  key={policy.id}
                  className={`policy-card ${policy.isActive ? 'policy-card--active' : ''}`}
                >
                  <div className="policy-card__content">
                    <h3 className="policy-card__title">{policy.title}</h3>
                    <div className="policy-card__download">
                      <Link href={policy.pdfUrl} className="policy-card__download-link">
                        Download PDF
                      </Link>
                      <div className="policy-card__download-button">
                        <Image
                          src={policy.isActive ? policiesData.images.downloadButton.active : policiesData.images.downloadButton.inactive}
                          alt="Download"
                          width={104}
                          height={104}
                          className="policy-card__download-icon"
                          quality={100}
                        />
                      </div>
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
        )}

        {/* Placeholder content for other tabs */}
        {activeTab !== 'policies' && (
          <div className="policies__placeholder">
            <p>Content for {policiesData.tabs.find(t => t.id === activeTab)?.label} coming soon.</p>
          </div>
        )}
      </div>
    </section>
  );
}


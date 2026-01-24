'use client';

import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

/**
 * GTOTabs - Tabs component for Global Technical Operations
 * 
 * @param {Array} tabs - Array of tab objects from Strapi with structure:
 *   { id, label, dataNodeId, sections: [{ heading, paragraphs, image, link }] }
 * @param {string} defaultActiveTab - Default active tab ID (optional)
 */
export default function GTOTabs({ tabs: propTabs = null, defaultActiveTab = null }) {
  // Default tabs (fallback if no Strapi data)
  const defaultTabs = [
    {
      id: 'manufacturing',
      label: 'Manufacturing',
      dataNodeId: '2852:339',
      sections: []
    },
    {
      id: 'procurement',
      label: 'Procurement',
      dataNodeId: '2852:342',
      sections: []
    },
    {
      id: 'supply-chain',
      label: 'Supply Chain',
      dataNodeId: '2852:345',
      sections: []
    }
  ];

  // Use Strapi data if available, otherwise use defaults
  const tabs = propTabs && propTabs.length > 0 ? propTabs : defaultTabs;
  
  // Determine initial active tab
  const getInitialActiveTab = () => {
    if (defaultActiveTab) {
      return defaultActiveTab;
    }
    return tabs[0]?.id || 'manufacturing';
  };

  const [activeTab, setActiveTab] = useState(getInitialActiveTab());

  return (
    <div className="global-technical-operations-tabs-wrapper">
      <div className="global-technical-operations-tabs" data-node-id="2852:338">
        {tabs.map((tab, index) => {
          const isActive = activeTab === tab.id;
          return (
            <div
              key={tab.id}
              className={`global-technical-operations-tabs__tab global-technical-operations-tabs__tab--${index + 1} ${isActive ? 'global-technical-operations-tabs__tab--active' : ''}`}
              data-node-id={tab.dataNodeId}
              onClick={() => setActiveTab(tab.id)}
            >
              <div className="global-technical-operations-tabs__tab-bg"></div>
              <p className="global-technical-operations-tabs__tab-text">
                {tab.label}
              </p>
            </div>
          );
        })}
      </div>
      
      {/* Tab Content */}
      <div className="global-technical-operations-tabs__content">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          if (!isActive) return null;

          // Use the same content class for all tabs to maintain consistent spacing
          // This ensures Procurement and Supply Chain have the same padding, gap, and background as Manufacturing
          const contentClass = 'global-technical-operations-tabs__content-manufacturing';
          
          // If no sections from Strapi, show placeholder or default content
          if (!tab.sections || tab.sections.length === 0) {
            // Fallback to default content for manufacturing tab
            if (tab.id === 'manufacturing') {
              return (
                <div key={tab.id} className={contentClass}>
                  {renderDefaultManufacturingContent()}
                </div>
              );
            }
            // For other tabs (Procurement, Supply Chain), show empty state with same structure
            // This ensures consistent layout even when no data is available
            return (
              <div key={tab.id} className={contentClass}>
                <div className="global-technical-operations-tabs__content-placeholder">
                  <p>Content for {tab.label} will be added here</p>
                </div>
              </div>
            );
          }

          // Render sections from Strapi
          return (
            <div key={tab.id} className={contentClass}>
              {tab.sections.map((section, sectionIndex) => {
                // Determine section class - use manufacturing classes for all tabs to maintain consistent structure
                const sectionClass = `global-technical-operations-tabs__manufacturing-section-${sectionIndex + 1}`;
                // Use imageFirst from Strapi if available, otherwise alternate based on index
                const isImageFirst = section.imageFirst !== undefined 
                  ? section.imageFirst 
                  : sectionIndex % 2 === 1;
                
                return (
                  <div key={sectionIndex} className={sectionClass}>
                    {isImageFirst && section.image && (
                      <div className="global-technical-operations-tabs__manufacturing-image-wrapper">
                        <img 
                          src={section.image.url} 
                          alt={section.image.alt || ''} 
                          className="global-technical-operations-tabs__manufacturing-image"
                        />
                      </div>
                    )}
                    
                    <div className="global-technical-operations-tabs__manufacturing-footprint">
                      <div className="global-technical-operations-tabs__manufacturing-heading-text">
                        {section.heading && (
                          <h2 className="global-technical-operations-tabs__manufacturing-heading">
                            {section.heading}
                          </h2>
                        )}
                        {section.subheading && (
                          <div className="global-technical-operations-tabs__manufacturing-text">
                            <ReactMarkdown
                              remarkPlugins={[remarkGfm]}
                              rehypePlugins={[rehypeRaw]}
                              components={{
                                p: ({ children }) => (
                                  <p>{children || '\u00A0'}</p>
                                )
                              }}
                            >
                              {section.subheading}
                            </ReactMarkdown>
                          </div>
                        )}
                        {!section.subheading && section.paragraphs && section.paragraphs.length > 0 && (
                          <div className="global-technical-operations-tabs__manufacturing-text">
                            {section.paragraphs.map((para, paraIndex) => (
                              <p key={paraIndex}>{para || '\u00A0'}</p>
                            ))}
                          </div>
                        )}
                      </div>
                      {section.link && section.link.text && (
                        <div className="global-technical-operations-tabs__manufacturing-link">
                          <a 
                            href={section.link.href || '#'} 
                            className="global-technical-operations-tabs__manufacturing-link-text"
                          >
                            {section.link.text}
                          </a>
                          <svg className="global-technical-operations-tabs__manufacturing-link-icon" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13.5 4.5L4.5 13.5M4.5 13.5H13.5M4.5 13.5V4.5" stroke="#08a03f" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                      )}
                    </div>
                    
                    {!isImageFirst && section.image && (
                      <div className="global-technical-operations-tabs__manufacturing-image-wrapper">
                        <img 
                          src={section.image.url} 
                          alt={section.image.alt || ''} 
                          className="global-technical-operations-tabs__manufacturing-image"
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/**
 * Render default manufacturing content (fallback)
 * This is used when Strapi data is not available
 */
function renderDefaultManufacturingContent() {
  return (
    <>
      <div className="global-technical-operations-tabs__manufacturing-section-1" data-node-id="2852:350">
        <div className="global-technical-operations-tabs__manufacturing-footprint" data-node-id="2852:351">
          <div className="global-technical-operations-tabs__manufacturing-heading-text" data-node-id="2852:352">
            <h2 className="global-technical-operations-tabs__manufacturing-heading" data-node-id="2852:353">
              Manufacturing Footprint
            </h2>
            <div className="global-technical-operations-tabs__manufacturing-text" data-node-id="2852:354">
              <p>Lupin's manufacturing network hosts a vast global portfolio of 15 state-of-the-art facilities across India, U.S., Brazil and Mexico. Here is a snapshot of our manufacturing sites.</p>
            </div>
          </div>
          <div className="global-technical-operations-tabs__manufacturing-link" data-node-id="2852:355">
            <a href="#" className="global-technical-operations-tabs__manufacturing-link-text" data-node-id="2852:356">
              Click here to see our manufacturing sites.
            </a>
            <svg className="global-technical-operations-tabs__manufacturing-link-icon" data-node-id="2852:357" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13.5 4.5L4.5 13.5M4.5 13.5H13.5M4.5 13.5V4.5" stroke="#08a03f" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
        <div className="global-technical-operations-tabs__manufacturing-image-wrapper" data-node-id="2852:360">
          <img 
            src="/assets/global-technical/conveyor-belt-with-blue-vials-production-facility 1.png" 
            alt="Manufacturing facility" 
            className="global-technical-operations-tabs__manufacturing-image"
            data-node-id="2852:362"
          />
        </div>
      </div>
      
      <div className="global-technical-operations-tabs__manufacturing-section-2">
        <div className="global-technical-operations-tabs__manufacturing-image-wrapper">
          <img 
            src="/assets/global-technical/conveyor-belt-with-blue-vials-production-facility 1.png" 
            alt="Manufacturing facility" 
            className="global-technical-operations-tabs__manufacturing-image"
          />
        </div>
        <div className="global-technical-operations-tabs__manufacturing-footprint">
          <div className="global-technical-operations-tabs__manufacturing-heading-text">
            <h2 className="global-technical-operations-tabs__manufacturing-heading">
              Sustainable Manufacturing
            </h2>
            <div className="global-technical-operations-tabs__manufacturing-text">
              <p>At Lupin, we believe that true healthcare progress must go together with responsible operations. Our manufacturing approach is deeply rooted in sustainability, ensuring every product made, positively impacts not just individual health but our planet as well.</p>
              <p>&nbsp;</p>
              <p>Environmental stewardship is a part of our core. In FY25, we continued transitioning our operations to renewable energy while optimizing resource consumption across our manufacturing network. From adopting energy-efficient lighting, advanced pumping systems, and sustainable cooling technologies to investing in low-carbon processes, every action was driven with the purpose of preserving our ecosystem.</p>
              <p>&nbsp;</p>
              <p>Notably, our Tarapur API facility earned a Gold Award at the 10th India Green Manufacturing Challenge organized by the International Research Institute for Manufacturing (IRIM), and our Ankleshwar site successfully completed the GME assessment in May 2024, being recognized as a leader in sustainable practices.</p>
            </div>
          </div>
          <div className="global-technical-operations-tabs__manufacturing-link">
            <a href="#" className="global-technical-operations-tabs__manufacturing-link-text">
              Read more on Sustainability at Lupin right here.
            </a>
            <svg className="global-technical-operations-tabs__manufacturing-link-icon" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13.5 4.5L4.5 13.5M4.5 13.5H13.5M4.5 13.5V4.5" stroke="#08a03f" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </div>
      
      <div className="global-technical-operations-tabs__manufacturing-section-3">
        <div className="global-technical-operations-tabs__manufacturing-footprint">
          <div className="global-technical-operations-tabs__manufacturing-heading-text">
            <h2 className="global-technical-operations-tabs__manufacturing-heading">
              Product Quality and Safety
            </h2>
            <div className="global-technical-operations-tabs__manufacturing-text">
              <p>Our quality management systems guide our manufacturing processes, through enhanced assessment models and stringent regulatory compliance.</p>
              <p>&nbsp;</p>
              <p>Across our regulated sites, 16 labs are certified at the 5S level, reflecting our disciplined operational standards. We work towards advancing technology solutions in our labs, and due to our dedicated teams, Lupin Goa was awarded Technology Leader of the Year at the Manufacturing Today Conference and Awards-2024 for its innovative automated mobile phase preparation assembly.</p>
              <p>&nbsp;</p>
              <p>We have also developed a methodology to monitor and improve hydrogen utilization, yielding cost efficiencies equivalent to 52 new units, leading to outcomes that connect directly with our product quality initiatives.</p>
            </div>
          </div>
        </div>
        <div className="global-technical-operations-tabs__manufacturing-image-wrapper">
          <img 
            src="/assets/global-technical/conveyor-belt-with-blue-vials-production-facility 1.png" 
            alt="Manufacturing facility" 
            className="global-technical-operations-tabs__manufacturing-image"
          />
        </div>
      </div>
      
      <div className="global-technical-operations-tabs__manufacturing-section-4">
        <div className="global-technical-operations-tabs__manufacturing-image-wrapper">
          <img 
            src="/assets/global-technical/conveyor-belt-with-blue-vials-production-facility 1.png" 
            alt="Manufacturing facility" 
            className="global-technical-operations-tabs__manufacturing-image"
          />
        </div>
        <div className="global-technical-operations-tabs__manufacturing-footprint">
          <div className="global-technical-operations-tabs__manufacturing-heading-text">
            <h2 className="global-technical-operations-tabs__manufacturing-heading">
              Manufacturing Upskilling and Capability Building
            </h2>
            <div className="global-technical-operations-tabs__manufacturing-text">
              <p>At Lupin, continuous learning helps us stay committed to operational excellence.</p>
              <p>&nbsp;</p>
              <p>Some of our learning initiatives include Enteral Drug Societies Education Course, Lupin Training Academy that features classroom and practical training spaces.</p>
              <p>&nbsp;</p>
              <p>We have institutionalized the Gemba Walkthrough Program across all facilities to promote real-time observation, cross-functional engagement, and proactive problem-solving. Our All-Time Inspection Readiness Program, launched at Tarapur and Mandideep Unit-1, focuses on critical quality subsystems with support from internal SMEs and external consultants. The Ninja X gamification platform fosters interactive learning and operational proficiency, with over 3,000 users and enhanced modules.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

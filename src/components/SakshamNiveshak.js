'use client';

import Image from 'next/image';
import Link from 'next/link';
import '../scss/components/SakshamNiveshak.scss';

export default function SakshamNiveshak({ data }) {
  // Default data (will be replaced by Strapi)
  const sakshamData = data || {
    content: [
      {
        type: 'paragraph',
        text: [
          "Pursuant to the provisions of Section 124(6) of the Companies Act, 2013 and Investor Education & Protection Fund (IEPF) Authority Rules 2016, the dividend which has remained unclaimed/unpaid for a period of seven years shall be credited to the IEPF Account.",
           
          "Further, the corresponding shares on which dividend has remained unclaimed/unpaid for seven consecutive years shall also be transferred to the IEPF Account as per the procedure prescribed.",
          "",
          "Shareholders who have not claimed their dividend and remained unpaid with the Company, are requested to update the below mentioned details to claim their unpaid dividends."
        ]
      },
      {
        type: 'list',
        items: [
          "Name of the shareholder",
          "Folio/Demat Account",
          "Contact Details",
          "Bank Details",
          "Nominee Details",         
          "PAN",
          "Dividend Payment Preference (Cheque/Bank Transfer/Both)"
        ]
      },
      {
        type: 'paragraph',
        text: [
          "If the details are not updated for claiming the unclaimed/unpaid dividend, and the same has remained unclaimed for seven consecutive years, the Company shall initiate to transfer the same to the IEPF Account.",
          "",
          "For any further information/clarification, please contact our Registrar & Transfer Agents (RTA) MUFG Intime India Pvt. Limited. (formerly Link Intime India Private Limited), C-101, Tower C, 247 Park, L.B.S. Marg, Vikhroli (West),",
          "Mumbai – 400 083. Tel. no. 8108116767, e-mail ",
          "",
          "Please note – unclaimed/unpaid dividend and unclaimed shares once transferred to the IEPF can be claimed by you from the IEPF Authority by filing e-form IEPF-5, as prescribed in the IEPF Rules."
        ],
        email: "rnt.helpdesk@in.mpms.mufg.com"
      }
    ],
    decorativeImage: {
      url: "/assets/saksham-niveshak/5a520e5b63258cdda90b9f1f24d3b53d61fd8d2c.svg",
      alt: ""
    }
  };

  return (
    <section className="saksham-niveshak" data-node-id="66:641">
      <div className="saksham-niveshak__container">
        <div className="saksham-niveshak__content">
          {sakshamData.content.map((section, sectionIndex) => {
            if (section.type === 'paragraph') {
              return (
                <div key={sectionIndex} className="saksham-niveshak__paragraph-section">
                  {section.text.map((paragraph, paraIndex) => {
                    // Handle empty paragraphs as line breaks
                    if (paragraph === "") {
                      return <br key={paraIndex} className="saksham-niveshak__line-break" />;
                    }
                    
                    // Handle paragraph with email link
                    if (section.email && paragraph.includes("e-mail ")) {
                      const emailIndex = paragraph.indexOf("e-mail ");
                      const beforeEmail = paragraph.substring(0, emailIndex + 7);
                      return (
                        <p key={paraIndex} className="saksham-niveshak__paragraph">
                          {beforeEmail}
                          <Link href={`mailto:${section.email}`} className="saksham-niveshak__email-link">
                            {section.email}
                          </Link>
                        </p>
                      );
                    }
                    
                    return (
                      <p key={paraIndex} className="saksham-niveshak__paragraph">
                        {paragraph}
                      </p>
                    );
                  })}
                </div>
              );
            }
            
            if (section.type === 'list') {
              return (
                <div key={sectionIndex} className="saksham-niveshak__list">
                  {section.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="saksham-niveshak__list-item">
                      <div className="saksham-niveshak__number-badge">
                        <span className="saksham-niveshak__number">{itemIndex + 1}</span>
                      </div>
                      <p className="saksham-niveshak__list-text">{item}</p>
                    </div>
                  ))}
                </div>
              );
            }
            
            return null;
          })}
        </div>

        {/* Decorative Image */}
        {sakshamData.decorativeImage && (
          <div className="saksham-niveshak__decorative">
            <Image
              src={sakshamData.decorativeImage.url}
              alt={sakshamData.decorativeImage.alt || ""}
              width={600}
              height={600}
              className="saksham-niveshak__decorative-img"
              quality={100}
            />
          </div>
        )}
      </div>
    </section>
  );
}


'use client';

import Link from 'next/link';
import '../scss/components/Policies.scss';

export default function NoticeSection({ data }) {
  // Default data matching Figma design exactly (will be replaced by Strapi)
  const noticeData = data || {
    title: "Notice",
    mainParagraph: "Appointment of Registrar and Share Transfer Agent of the Company Shareholders, Beneficial Owners, Depository Participants and all other persons concerned dealing in the shares of Lupin Limited ('the Company') are hereby informed that the Company has appointed MUFG Intime India Pvt. Ltd. ('MUFG Intime') as the Registrar and Share Transfer Agent of the Company, with effect from June 15, 2018. All persons concerned are hereby requested to send/deliver all the documents/correspondence relating to the transmission of shares, deletion of name, change of address (physical shares), issue of duplicate share certificates, claim of unpaid dividend/unclaimed shares, dematerialization of shares etc. pertaining to shares of the Company to the MUFG Intime at the following address:",
    address: {
      company: "MUFG Intime India Pvt. Ltd.",
      unit: "Unit: Lupin Limited",
      line1: "C-101, 247 Park,",
      line2: "L.B.S. Marg, Vikhroli (West),",
      line3: "Mumbai – 400 083"
    },
    contact: {
      emailText: "The dedicated e-mail id for shareholders of the Company for communication with MUFG Intime is ",
      email1: "rnt.helpdesk@in.mpms.mufg.com",
      email2: "Investor.helpdesk@in.mpms.mufg.com",
      emailLink: "mailto:rnt.helpdesk@in.mpms.mufg.com",
      contactText: " and contact ",
      phoneText: "tel. nos. are: +91 810 811 6767. Toll free no.1800 1020 878."
    }
  };

  return (
    <section className="policies policies--light-bg">
      {/* Container */}
      <div className="policies__container">
        {/* Content */}
        <div className="policies__content policies__content--no-top-margin">
          {/* Notice Box - matching Figma design exactly */}
          <div className="policies__notice-box" data-node-id="2273:759">
            <div className="policies__notice-content" data-node-id="2273:760">
              {/* Title */}
              <h2 className="policies__notice-title" data-node-id="2273:762">
                {noticeData.title}
              </h2>

              {/* Main Content */}
              <div className="policies__notice-main" data-node-id="2273:763">
                {/* First Paragraph */}
                <p className="policies__notice-paragraph" data-node-id="2273:764">
                  {noticeData.mainParagraph}
                </p>

                {/* Two Column Layout */}
                <div className="policies__notice-columns" data-node-id="2273:765">
                  {/* Left Column - Address */}
                  <div className="policies__notice-address-column" data-node-id="2273:766">
                    <p className="policies__notice-address-text">
                      {noticeData.address.company}
                      <br aria-hidden="true" />
                      {noticeData.address.unit}
                      <br aria-hidden="true" />
                      {noticeData.address.line1}
                      <br aria-hidden="true" />
                      {noticeData.address.line2}
                      <br aria-hidden="true" />
                      {noticeData.address.line3}
                    </p>
                  </div>

                  {/* Right Column - Contact */}
                  <div className="policies__notice-contact-column" data-node-id="2273:767">
                    <p className="policies__notice-contact-text">
                      <span>{noticeData.contact.emailText}</span>
                      <Link 
                        href={noticeData.contact.emailLink} 
                        className="policies__notice-email-link"
                      >
                        <span>{noticeData.contact.email1} {noticeData.contact.email2}</span>
                      </Link>
                      <span>{noticeData.contact.contactText}</span>
                    </p>
                    <p className="policies__notice-phone-text">
                      {noticeData.contact.phoneText}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


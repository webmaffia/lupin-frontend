'use client';

import Image from 'next/image';
import '../scss/components/TransferPhysicalShares.scss';

export default function TransferPhysicalShares({ data }) {
  // Default data (will be replaced by Strapi)
  const transferData = data || {
    content: [
      'In terms of SEBI Circular SEBI/HO/MIRSD/MIRSD-PoD/P/CIR/2025/97 dated July 02, 2025, the transfer requests of physical shares which were rejected and returned to the lodger on or before March 31, 2019, can be re-lodged after rectifying the errors, for registration of transfer from July 07, 2025 to January 06, 2026 with our Registrar and Share Transfer Agents (\'RTA\'), i.e, M/s. MUFG Intime India Pvt. Ltd., C-101, 247 Park, LBS Marg, Vikhroli (West), Mumbai – 400083.',
      'Transferred Shares will only be issued in demat mode once all the documents are found in order by RTA. The lodger must have a demat account and provide its Client Master List (\'CML\'), along with the transfer documents and share certificate, while lodging the documents for transfer with RTA.',
      'Transfer requests submitted after January 06, 2026 will not be accepted by the Company/RTA.'
    ]
  };

  return (
    <section className="transfer-physical-shares">
      {/* Background Petals */}
      <div className="transfer-physical-shares__bg-petals">
        <Image
          src="/assets/bg-petals.svg"
          alt=""
          width={1099}
          height={1210}
          className="transfer-physical-shares__bg-petals-img"
          quality={100}
        />
      </div>
      
      <div className="transfer-physical-shares__container">
        <div className="transfer-physical-shares__content">
          {transferData.content.map((paragraph, index) => (
            <p key={index} className="transfer-physical-shares__paragraph">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}


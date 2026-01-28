import Image from 'next/image';
import Link from 'next/link';
import '@/scss/components/sustainability/ESGReportLink.scss';

export default function ESGReportLink() {
  return (
    <section className="esg-report-link">
      <div className="esg-report-link__container">
        <Link href="/investors/reports-filings" className="esg-report-link__link">
          <p className="esg-report-link__text">
            Find our complete ESG report here
          </p>
          <div className="esg-report-link__icon">
            <Image 
              src="/assets/sustainability/arrow.svg"
              alt="Arrow icon" 
              width={33}
              height={33}
              className="esg-report-link__icon-img"
            />
          </div>
        </Link>
      </div>
    </section>
  );
}


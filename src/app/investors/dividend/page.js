import InnerBanner from '@/components/InnerBanner';
import NavigationLinks from '@/components/NavigationLinks';
import TdsDividendSection from '@/components/TdsDividendSection';
import VotingTable from '@/components/VotingTable';
import SubscriberUpdated from '@/components/SubscriberUpdated';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo';
import '@/scss/pages/dividend.scss';

// Generate metadata for the dividend page
export const metadata = generateSEOMetadata({
  title: "Dividend - Lupin | Investor Relations",
  description: "View Lupin Limited's dividend information, dividend history, and dividend payment details for shareholders.",
  canonicalUrl: "https://www.lupin.com/investors/dividend",
  keywords: "Lupin dividend, dividend information, dividend history, dividend payment, investor relations, Lupin Limited",
});

export default function DividendPage() {
  // Custom banner data for this page
  const bannerData = {
    title: {
      line1: "Dividend",
      line2: ""
    },
    images: {
      banner: {
        url: "/assets/inner-banner/freepik-enhance-42835.jpg",
        alt: "Dividend"
      },
      petal: {
        url: "/assets/inner-banner/petal-2.svg",
        alt: "Decorative petal"
      }
    }
  };
  

  return (
    <div className="dividend-page-wrapper" style={{ position: 'relative' }}>
      <InnerBanner data={bannerData} />
      <section className="dividend-page">
       
        <NavigationLinks />
        <TdsDividendSection />
    
      </section>

      <VotingTable data={{
        paragraph: "Lupin track of dividends is detailed below. Dividends are remitted through the National Electronic Clearing Service (NECS), subject to availability of NECS centres and timely furnishing of complete and correct bank account details by shareowners. Dividend other than NECS is remitted by means of warrants.",
        table: {
          headers: [
            { text: "Dividend period", bgColor: "#08a03f", textColor: "#ffffff", padding: "17px" },
            { text: "Dividend (%)", bgColor: "#d9f0e1", textColor: "#08a03f", padding: "17px" },
            { text: "Per Share (Rs.)", bgColor: "#08a03f", textColor: "#ffffff", padding: "17px" },
            { text: "Closure/ record date(s)", bgColor: "#d9f0e1", textColor: "#08a03f", padding: "58px" },
            { text: "Date of Declaration of Dividend", bgColor: "#08a03f", textColor: "#ffffff", padding: "17px" },
            { text: "Dividend payment date", bgColor: "#d9f0e1", textColor: "#08a03f", padding: "17px" }
          ],
          rows: [
            { "Dividend period": "2024-25", "Dividend (%)": "600", "Per Share (Rs.)": "12.00", "Closure/ record date(s)": "25.07.2025", "Date of Declaration of Dividend": "11.08.2025", "Dividend payment date": "14.08.2025" },
            { "Dividend period": "2023-24", "Dividend (%)": "400", "Per Share (Rs.)": "8.00", "Closure/ record date(s)": "16.07.2024", "Date of Declaration of Dividend": "02.08.2024", "Dividend payment date": "07.08.2024" },
            { "Dividend period": "2022-23", "Dividend (%)": "200", "Per Share (Rs.)": "4.00", "Closure/ record date(s)": "14.07.2023", "Date of Declaration of Dividend": "03.08.2023", "Dividend payment date": "08.08.2023" },
            { "Dividend period": "2021-22", "Dividend (%)": "200", "Per Share (Rs.)": "4.00", "Closure/ record date(s)": "15.07.2022", "Date of Declaration of Dividend": "03.08.2022", "Dividend payment date": "05.08.2022" },
            { "Dividend period": "2020-21", "Dividend (%)": "325", "Per Share (Rs.)": "6.50", "Closure/ record date(s)": "28.07.2021", "Date of Declaration of Dividend": "11.08.2021", "Dividend payment date": "17.08.2021" },
            { "Dividend period": "2019-20", "Dividend (%)": "300", "Per Share (Rs.)": "6.00", "Closure/ record date(s)": "05.08.2020 – 12.08.2020", "Date of Declaration of Dividend": "12.08.2020", "Dividend payment date": "18.08.2020" },
            { "Dividend period": "2018-19", "Dividend (%)": "250", "Per Share (Rs.)": "5.00", "Closure/ record date(s)": "31.07.2019 – 07.08.2019", "Date of Declaration of Dividend": "07.08.2019", "Dividend payment date": "13.08.2019" },
            { "Dividend period": "2017-18", "Dividend (%)": "250.", "Per Share (Rs.)": "5.00", "Closure/ record date(s)": "01.08.2018 – 08.08.2018", "Date of Declaration of Dividend": "08.08.2018", "Dividend payment date": "13.08.2018" },
            { "Dividend period": "2016-17", "Dividend (%)": "375", "Per Share (Rs.)": "7.50", "Closure/ record date(s)": "26.07.2017 – 02.08.2017", "Date of Declaration of Dividend": "02.08.2017", "Dividend payment date": "05.08.2017" },
            { "Dividend period": "2015-16", "Dividend (%)": "375", "Per Share (Rs.)": "7.50", "Closure/ record date(s)": "27.07.2016 – 03.08.2016", "Date of Declaration of Dividend": "03.08.2016", "Dividend payment date": "06.08.2016" },
            { "Dividend period": "2014-15", "Dividend (%)": "375", "Per Share (Rs.)": "7.50", "Closure/ record date(s)": "16.07.2015 – 23.07.2015", "Date of Declaration of Dividend": "23.07.2015", "Dividend payment date": "27.07.2015" },
            { "Dividend period": "2013-14 (Final)", "Dividend (%)": "150", "Per Share (Rs.)": "3.00", "Closure/ record date(s)": "23.07.2014 – 30.07.2014", "Date of Declaration of Dividend": "30.07.2014", "Dividend payment date": "31.07.2014" },
            { "Dividend period": "2013-14 (Interim)", "Dividend (%)": "150", "Per Share (Rs.)": "3.00", "Closure/ record date(s)": "14.02.2014", "Date of Declaration of Dividend": "03.02.2014", "Dividend payment date": "21.02.2014" },
            { "Dividend period": "2012-2013", "Dividend (%)": "200", "Per Share (Rs.)": "4.00", "Closure/ record date(s)": "31.07.2013 – 07.08.2013", "Date of Declaration of Dividend": "07.08.2013", "Dividend payment date": "08.08.2013" },
            { "Dividend period": "2011-2012", "Dividend (%)": "160", "Per Share (Rs.)": "3.20", "Closure/ record date(s)": "17.07.2012 – 24.07.2012", "Date of Declaration of Dividend": "24.07.2012", "Dividend payment date": "25.07.2012" },
            { "Dividend period": "2010-2011", "Dividend (%)": "150", "Per Share (Rs.)": "3.00", "Closure/ record date(s)": "20-07-2011 – 27-07-2011", "Date of Declaration of Dividend": "27-07-2011", "Dividend payment date": "28-07-2011" },
            { "Dividend period": "2009-2010", "Dividend (%)": "135", "Per Share (Rs.)": "13.50", "Closure/ record date(s)": "21-07-2010 – 28-07-2010", "Date of Declaration of Dividend": "28-07-2010", "Dividend payment date": "29-07-2010" },
            { "Dividend period": "2008-2009", "Dividend (%)": "125", "Per Share (Rs.)": "12.50", "Closure/ record date(s)": "22-07-2009 – 29-07-2009", "Date of Declaration of Dividend": "29-07-2009", "Dividend payment date": "30-07-2009" },
            { "Dividend period": "2007-2008", "Dividend (%)": "100", "Per Share (Rs.)": "10.00", "Closure/ record date(s)": "15.07.2008 – 22.07.2008", "Date of Declaration of Dividend": "22.07.2008", "Dividend payment date": "23.07.2008" },
            { "Dividend period": "2006-2007", "Dividend (%)": "50", "Per Share (Rs.)": "5.00", "Closure/ record date(s)": "12.07.2007 – 19.07.2007", "Date of Declaration of Dividend": "19.07.2007", "Dividend payment date": "20.07.2007" },
            { "Dividend period": "2005-2006", "Dividend (%)": "65", "Per Share (Rs.)": "6.50", "Closure/ record date(s)": "11.07.2006 – 12.07.2006", "Date of Declaration of Dividend": "25.07.2006", "Dividend payment date": "26.07.2006" },
            { "Dividend period": "2004-2005", "Dividend (%)": "65", "Per Share (Rs.)": "6.50", "Closure/ record date(s)": "19.07.2005 – 20.07.2005", "Date of Declaration of Dividend": "28.07.2005", "Dividend payment date": "29.07.2005" },
            { "Dividend period": "2003-2004", "Dividend (%)": "65", "Per Share (Rs.)": "6.50", "Closure/ record date(s)": "15.07.2004 – 16.07.2004", "Date of Declaration of Dividend": "29.07.2004", "Dividend payment date": "30.07.2004" },
            { "Dividend period": "2002-2003", "Dividend (%)": "50", "Per Share (Rs.)": "5.00", "Closure/ record date(s)": "17.07.2003 – 18.07.2003", "Date of Declaration of Dividend": "06.08.2003", "Dividend payment date": "07.08.2003" },
            { "Dividend period": "2001-2002 (Final)", "Dividend (%)": "25", "Per Share (Rs.)": "2.50", "Closure/ record date(s)": "20.08.2002 – 21.08.2002", "Date of Declaration of Dividend": "02.09.2002", "Dividend payment date": "03.09.2002" },
            { "Dividend period": "2001-2002 (Interim)", "Dividend (%)": "25", "Per Share (Rs.)": "2.50", "Closure/ record date(s)": "07.02.2002", "Date of Declaration of Dividend": "17.01.2002\n(Board meeting)", "Dividend payment date": "15.02.2002" },
            { "Dividend period": "2000-2001", "Dividend (%)": "35", "Per Share (Rs.)": "3.50", "Closure/ record date(s)": "13.09.2001 – 14.09.2001", "Date of Declaration of Dividend": "25.09.2001", "Dividend payment date": "26.09.2001" }
          ]
        }
      }} />
     
      <SubscriberUpdated />
    </div>
  );
}


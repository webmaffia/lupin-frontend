import Header from '@/components/Header';
import Hero from '@/components/Hero';
import OurStory from '@/components/OurStory';
import OurPurpose from '@/components/OurPurpose';
import Overview from '@/components/Overview';
import OurBusiness from '@/components/OurBusiness';
import Investors from '@/components/Investors';
import Sustainability from '@/components/Sustainability';
import CSR from '@/components/CSR';
import Life from '@/components/Life';
import NewsInsights from '@/components/NewsInsights';
import Footer from '@/components/Footer';
import GoldenLine from '@/components/GoldenLine';

export default async function Home() {
  return (
    <div style={{ position: 'relative' }}>
      <GoldenLine />
      <Header />
      <Hero />
      <main>
        <OurStory />
        <OurPurpose />
        <Overview />
        <OurBusiness />
        <Investors />
        <Sustainability />
        <CSR />
        <Life />
        <NewsInsights />
      </main>
      <Footer />
    </div>
  );
}

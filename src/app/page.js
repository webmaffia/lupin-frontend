import Header from '@/components/Header';
import Hero from '@/components/Hero';
import OurStory from '@/components/OurStory';
import OurPurpose from '@/components/OurPurpose';
import Overview from '@/components/Overview';
import OurBusiness from '@/components/OurBusiness';

export default async function Home() {
  return (
    <>
      <Header />
      <Hero />
      <main>
        <OurStory />
        <OurPurpose />
        <Overview />
        <OurBusiness />
      </main>
    </>
  );
}

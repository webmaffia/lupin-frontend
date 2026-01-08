import InnerBanner from '@/components/InnerBanner';
import PressReleaseDetail from '@/components/PressReleaseDetail';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo';
import '@/scss/pages/press-release-detail.scss';

export async function generateMetadata({ params }) {
  // In production, fetch from Strapi
  // const pressRelease = await fetchPressRelease(params.slug);
  
  return generateSEOMetadata({
    title: "Press Release - Lupin | Corporate Communications",
    description: "Read the latest press releases and corporate communications from Lupin Limited.",
    canonicalUrl: `https://www.lupin.com/media/press-releases/${params.slug}`,
    keywords: "Lupin press release, corporate communications, Lupin Limited",
  });
}

export default async function PressReleaseDetailPage({ params }) {
  // In production, fetch from Strapi
  // const pressRelease = await fetchPressRelease(params.slug);
  
  // Default data structure (will be replaced by Strapi)
  const pressReleaseData = {
    title: "The ₹40-crore AI payoff: How Lupin is building a data-first, AI-ready pharma enterprise",
    date: "November 18, 2025",
    author: {
      name: "Rakesh Bhardwaj, CIO, Lupin",
      image: "/assets/press/Image.png"
    },
    content: `
      <p>Pharma giant Lupin started its digital transformation journey in 2021. Four years later, AI is now embedded across the company's $2.5 billion global operations. From the company's labs to shop floors to its supply chains, it's strategically woven in to create measurable impact across research, manufacturing, and compliance.</p>
      <p>&nbsp;</p>
      <p>"Our outlook is to transform digital from a support function into a central growth engine by making data, automation, and AI first-class enablers across various functions," Rakesh Bhardwaj, Chief Information Officer at Lupin tells ET Enterprise AI. "That starts from R&D and runs all the way to the stage when our products hit the pharmacies."</p>
      <p>&nbsp;</p>
      <p>He highlights that Lupin's AI and digital charter rests on three priorities: Enhancing patient outcomes, driving operational excellence, and building a future-ready workforce. Over the last few years, that vision has translated into enterprise-wide systems — from deploying Industrial IoT and Manufacturing Execution Systems (MES) for real-time control, to scaling GenAI pilots and democratising analytics through tools like Qlik.</p>
      <p>&nbsp;</p>
      <p>The payoff is visible. Lupin's digital and AI interventions delivered ₹40 crore in cost savings and reclaimed 12,000 man-days in FY25, improving manufacturing margins by over 10 per cent in two years, Bhardwaj shares.</p>
      <p>&nbsp;</p>
      <p>"The outcome of these initiatives has translated into better process efficiencies, improved regulatory compliance, and enhanced business intelligence and transparency."</p>
      <p>&nbsp;</p>
      <p>Among its various AI pilots, yield optimisation was the first to move from proof-of-concept to scale. At Lupin's Nagpur Unit-1, advanced analytics on compression parameters for five key products "delivered significant improvements in yields," Bhardwaj shares. The ROI and scalability were so clear that the programme was quickly rolled out across other product lines.</p>
      <p>&nbsp;</p>
      <p>Predictive maintenance and digital quality systems have followed. "Predictive analytics through IIoT (industrial internet of things) dashboards at Tarapur are enhancing uptime, and our IPQA (in-process quality assurance) digital platform has already been rolled out across four sites," he adds.</p>
      <h2>AI in the lab</h2>
      <p>In the research and drug discovery domain, where speed and accuracy directly influence patient outcomes, Lupin has taken a decisive step by establishing a dedicated Generative AI Center of Excellence (GenAI CoE). "The initiative is designed to drive innovation while reinforcing operational safeguards across key business functions," Bhardwaj says.</p>
      <p>&nbsp;</p>
      <p>Early results are already visible. AI models are helping researchers make faster, smarter decisions by evaluating multiple scientific parameters — from mechanism of action to clinical probability of success — to identify high-potential candidates much earlier in the process. At the same time, digital tools such as In-Process Quality Assurance, Quality Co-Author, and OOS Navigator are reducing manual errors and documentation lapses by automating routine checks. The combined effect is shorter cycle times, smoother workflows, and a meaningful release of capacity, allowing teams to focus their time and budgets on more complex scientific work.</p>
      <h2>Balancing speed with governance</h2>
      <p>In the research and drug discovery domain, where speed and accuracy directly influence patient outcomes, Lupin has taken a decisive step by establishing a dedicated Generative AI Center of Excellence (GenAI CoE). "The initiative is designed to drive innovation while reinforcing operational safeguards across key business functions," Bhardwaj says.</p>
      <p>&nbsp;</p>
      <p>Early results are already visible. AI models are helping researchers make faster, smarter decisions by evaluating multiple scientific parameters — from mechanism of action to clinical probability of success — to identify high-potential candidates much earlier in the process. At the same time, digital tools such as In-Process Quality Assurance, Quality Co-Author, and OOS Navigator are reducing manual errors and documentation lapses by automating routine checks. The combined effect is shorter cycle times, smoother workflows, and a meaningful release of capacity, allowing teams to focus their time and budgets on more complex scientific work.</p>
      <h2>Building vs. Buying AI</h2>
      <p>Like most enterprises navigating the AI landscape, Lupin blends in-house innovation with external collaboration.</p>
      <p>"When evaluating whether to build or buy, we consider factors such as speed of deployment, scalability, data sensitivity, integration complexity, and long-term strategic value," says Bhardwaj.</p>
      <p>&nbsp;</p>
      <p>&nbsp;</p>
      <p>For domain-intensive areas like AI-driven drug discovery or manufacturing optimisation, Lupin builds internally. For enterprise analytics or supply chain tools, it partners with leading providers. The GenAI CoE is a hybrid example that combines custom in-house pilots with an external AI provider to accelerate drug discovery insights.</p>
      <p>This dual approach has already shown results, including enhanced supply chain visibility, improved productivity, and faster R&D decision-making, Bhardwaj notes.</p>
      <h2>Measuring AI's impact</h2>
      <p>For Bhardwaj, AI transformation isn't just about new tech, it's about new thinking. "Our focus is on shaping an organisation that's AI-ready by design — not just by hiring new talent, but by rearchitecting capabilities," he says. "The real investment is in transforming how our people think."</p>
      <p>That mindset extends to Lupin's broader ecosystem too. "The real differentiator has been co-creation with partners, domain experts, and teams," he adds. "Acceleration came from building the right ecosystem."</p>
      <p>Lupin's next phase (FY26 and beyond) is about scale. The company plans to expand its digital backbone globally, embedding AI deeper into supply chain, research, and quality functions. "Our focus is to make digital intelligence a core driver of innovation, efficiency, and growth," Bhardwaj says.</p>
      <p>This interview was first published on the <a href="https://enterpriseai.economictimes.indiatimes.com/news/case-studies/lupins-435-crore-ai-transformation-a-data-first-approach-in-pharma/125399348">ET Enterprise AI</a> online portal on Nov 18, 2025</p>
    `
  };

  const bannerData = {
    title: {
      line1: "Press Releases",
      line2: ""
    },
    images: {
      banner: {
        url: "/assets/inner-banner/freepik-enhance-42835.jpg",
        alt: "Press Releases"
      },
      petal: {
        url: "/assets/inner-banner/petal-2.svg",
        alt: "Decorative petal"
      }
    }
  };

  return (
    <div style={{ position: 'relative' }}>
      <InnerBanner data={bannerData} />
      <PressReleaseDetail data={pressReleaseData} />
    </div>
  );
}


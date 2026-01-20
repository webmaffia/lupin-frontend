// Strapi API helper functions for Reports & Filings
// Handles the report-filing Single Type with nested repeatable components

import { fetchAPI, getStrapiMedia, mapTopBannerData } from './strapi';

/**
 * Fetch report-filing data from Strapi
 * This is a Single Type, so it returns one entry with all sections
 * 
 * @returns {Promise<Object>} Raw Strapi API response
 */
export async function getReportFiling() {
  // Explicitly populate TopBanner DesktopImage and MobileImage (banner images)
  // Populate all nested components following the actual Strapi structure
  // Following chaining method like policies API endpoint
  const populateQuery = [
    'populate[TopBanner][populate][DesktopImage][populate]=*',
    'populate[TopBanner][populate][MobileImage][populate]=*',
    // QuarterlyResultsSection -> QuarterlyEarningsSection -> PdfCard -> Pdf
    'populate[QuarterlyResultsSection][populate][QuarterlyEarningsSection][populate][PdfCard][populate][Pdf][populate]=*',
    // AnnualReportSection -> pdfCard -> Pdf, image, pdf (main)
    'populate[AnnualReportSection][populate][pdfCard][populate][Pdf][populate]=*',
    'populate[AnnualReportSection][populate][image][populate]=*',
    'populate[AnnualReportSection][populate][pdf][populate]=*',
    // AnnualReturnsSection -> PdfCard (single component) -> Pdf
    'populate[AnnualReturnsSection][populate][PdfCard][populate][Pdf][populate]=*',
    // Board_Meeting_Filings_Section (with underscores) -> pdfCard -> Pdf
    'populate[Board_Meeting_Filings_Section][populate][pdfCard][populate][Pdf][populate]=*',
    // OtherExchangeFilingsSection -> PdfCard -> Pdf
    'populate[OtherExchangeFilingsSection][populate][PdfCard][populate][Pdf][populate]=*'
  ].join('&');

  return fetchAPI(`report-filing?${populateQuery}`, {
    next: { revalidate: 60 },
  });
}

/**
 * Map PDF component to standardized format
 * Handles both Pdfcomponent and PdfCard components with various field name cases
 * 
 * @param {Object} pdfCard - PDF card component from Strapi
 * @returns {Object|null} Mapped PDF card or null
 */
function mapPdfCard(pdfCard) {
  if (!pdfCard) return null;

  // Handle different field name cases: Pdf, pdf, PdfCard.pdf, etc.
  const pdf = pdfCard?.Pdf?.data?.attributes 
    || pdfCard?.Pdf 
    || pdfCard?.pdf?.data?.attributes 
    || pdfCard?.pdf;
  const pdfUrl = pdf ? getStrapiMedia(pdf) : null;

  // Handle different title field cases: Title, title
  const title = pdfCard?.Title || pdfCard?.title || '';

  return {
    id: pdfCard.id || null,
    title: title,
    pdfUrl: pdfUrl || '#',
    pdf: pdf ? {
      url: pdfUrl,
      name: pdf.name || '',
      size: pdf.size || 0,
      mime: pdf.mime || 'application/pdf',
      alternativeText: pdf.alternativeText || title || ''
    } : null,
    isActive: pdfCard?.isActive !== undefined ? pdfCard.isActive : true,
    publishedDate: pdfCard?.PublishedDate || pdfCard?.publishedDate || null,
    quarterLabel: pdfCard?.QuarterLabel || pdfCard?.quarterLabel || null,
    isAudited: pdfCard?.isAudited !== undefined ? pdfCard.isAudited : false,
  };
}

/**
 * Map Quarterly Earnings Section (nested inside QuarterlyResultsSection)
 * 
 * @param {Object} earningsSection - Quarterly earnings section from Strapi
 * @returns {Object} Mapped quarterly earnings section
 */
function mapQuarterlyEarningsSection(earningsSection) {
  if (!earningsSection) return null;

  // PdfCard (uppercase) in QuarterlyEarningsSection
  const pdfCards = Array.isArray(earningsSection?.PdfCard)
    ? earningsSection.PdfCard.map(mapPdfCard).filter(card => card && card.id !== null)
    : Array.isArray(earningsSection?.pdfCard)
    ? earningsSection.pdfCard.map(mapPdfCard).filter(card => card && card.id !== null)
    : [];

  return {
    id: earningsSection.id || null,
    quarterLabel: earningsSection?.QuarterLabel || earningsSection?.quarterLabel || '',
    pdfCards: pdfCards,
  };
}

/**
 * Map Quarterly Results Section data
 * 
 * @param {Object} quarterlySection - Quarterly results section from Strapi
 * @returns {Object} Mapped quarterly results section
 */
function mapQuarterlyResultsSection(quarterlySection) {
  if (!quarterlySection) return null;

  const earningsSections = Array.isArray(quarterlySection?.QuarterlyEarningsSection)
    ? quarterlySection.QuarterlyEarningsSection.map(mapQuarterlyEarningsSection).filter(Boolean)
    : [];

  return {
    id: quarterlySection.id || null,
    financialYear: quarterlySection?.FinancialYear || quarterlySection?.financialYear || '',
    earningsSections: earningsSections,
  };
}

/**
 * Map Annual Report Section data
 * 
 * @param {Object} annualReportSection - Annual report section from Strapi
 * @returns {Object} Mapped annual report section
 */
function mapAnnualReportSection(annualReportSection) {
  if (!annualReportSection) return null;

  const image = annualReportSection?.image?.data?.attributes || annualReportSection?.image;
  const imageUrl = image ? getStrapiMedia(image) : null;
  
  const mainPdf = annualReportSection?.pdf?.data?.attributes || annualReportSection?.pdf;
  const mainPdfUrl = mainPdf ? getStrapiMedia(mainPdf) : null;

  // pdfCard is lowercase in AnnualReportSection
  const pdfCards = Array.isArray(annualReportSection?.pdfCard)
    ? annualReportSection.pdfCard.map(mapPdfCard).filter(card => card && card.id !== null)
    : [];

  return {
    id: annualReportSection.id || null,
    tabYear: annualReportSection?.TabYear || annualReportSection?.tabYear || '',
    micrositeUrl: annualReportSection?.MicrositeUrl || annualReportSection?.micrositeUrl || null,
    image: imageUrl ? {
      url: imageUrl,
      alt: image?.alternativeText || image?.caption || '',
      width: image?.width,
      height: image?.height
    } : null,
    mainPdf: mainPdfUrl ? {
      url: mainPdfUrl,
      name: mainPdf.name || '',
      size: mainPdf.size || 0,
      mime: mainPdf.mime || 'application/pdf'
    } : null,
    pdfCards: pdfCards,
  };
}

/**
 * Map Annual Returns Section data
 * 
 * @param {Object} annualReturnsSection - Annual returns section from Strapi
 * @returns {Object} Mapped annual returns section
 */
function mapAnnualReturnsSection(annualReturnsSection) {
  if (!annualReturnsSection) return null;

  // PdfCard is a component (not repeatable) in AnnualReturnsSection
  const pdfCard = annualReturnsSection?.PdfCard 
    ? mapPdfCard(annualReturnsSection.PdfCard) 
    : null;

  return {
    id: annualReturnsSection.id || null,
    pdfCard: pdfCard,
  };
}

/**
 * Map Board Meeting Filings Section data
 * 
 * @param {Object} boardMeetingSection - Board meeting filings section from Strapi
 * @returns {Object} Mapped board meeting filings section
 */
function mapBoardMeetingFilingsSection(boardMeetingSection) {
  if (!boardMeetingSection) return null;

  // pdfCard is lowercase in BoardMeetingFilingsSection
  const pdfCards = Array.isArray(boardMeetingSection?.pdfCard)
    ? boardMeetingSection.pdfCard.map(mapPdfCard).filter(card => card && card.id !== null)
    : [];

  return {
    id: boardMeetingSection.id || null,
    tabYear: boardMeetingSection?.TabYear || boardMeetingSection?.tabYear || '',
    pdfCards: pdfCards,
  };
}

/**
 * Map Other Exchange Filings Section data
 * 
 * @param {Object} otherExchangeSection - Other exchange filings section from Strapi
 * @returns {Object} Mapped other exchange filings section
 */
function mapOtherExchangeFilingsSection(otherExchangeSection) {
  if (!otherExchangeSection) return null;

  const pdfCards = Array.isArray(otherExchangeSection?.PdfCard)
    ? otherExchangeSection.PdfCard.map(mapPdfCard).filter(card => card && card.id !== null)
    : [];

  return {
    id: otherExchangeSection.id || null,
    tabYear: otherExchangeSection?.TabYear || otherExchangeSection?.tabYear || '',
    pdfCards: pdfCards,
  };
}

/**
 * Map complete report-filing data from Strapi
 * 
 * @param {Object} strapiData - Raw Strapi API response
 * @returns {Object} Mapped report filing data
 */
export function mapReportFilingData(strapiData) {
  // Handle Strapi v4 response structure (Single Type) with chaining and fallbacks
  const data = strapiData?.data || strapiData;

  if (!data) {
    throw new Error('No data received from Strapi API. Check that the report-filing endpoint returns data.');
  }

  // Map TopBanner if available
  const topBanner = mapTopBannerData(data?.TopBanner);

  // Map each section using new field names
  const quarterlyResultsSections = Array.isArray(data?.QuarterlyResultsSection)
    ? data.QuarterlyResultsSection.map(mapQuarterlyResultsSection).filter(Boolean)
    : [];

  const annualReportSections = Array.isArray(data?.AnnualReportSection)
    ? data.AnnualReportSection.map(mapAnnualReportSection).filter(Boolean)
    : [];

  const annualReturnsSections = Array.isArray(data?.AnnualReturnsSection)
    ? data.AnnualReturnsSection.map(mapAnnualReturnsSection).filter(Boolean)
    : [];

  const boardMeetingFilingsSections = Array.isArray(data?.Board_Meeting_Filings_Section)
    ? data.Board_Meeting_Filings_Section.map(mapBoardMeetingFilingsSection).filter(Boolean)
    : Array.isArray(data?.BoardMeetingFilingsSection)
    ? data.BoardMeetingFilingsSection.map(mapBoardMeetingFilingsSection).filter(Boolean)
    : [];

  const otherExchangeFilingsSections = Array.isArray(data?.OtherExchangeFilingsSection)
    ? data.OtherExchangeFilingsSection.map(mapOtherExchangeFilingsSection).filter(Boolean)
    : [];

  return {
    topBanner: topBanner,
    quarterlyResultsSections: quarterlyResultsSections,
    annualReportSections: annualReportSections,
    annualReturnsSections: annualReturnsSections,
    boardMeetingFilingsSections: boardMeetingFilingsSections,
    otherExchangeFilingsSections: otherExchangeFilingsSections,
  };
}

/**
 * Get quarterly results grouped by year
 * 
 * @param {Object} reportFilingData - Mapped report filing data
 * @returns {Object} Quarterly results grouped by year
 */
export function getQuarterlyResultsGrouped(reportFilingData) {
  const grouped = {};

  (reportFilingData.quarterlyResultsSections || []).forEach(section => {
    const year = section.financialYear;
    if (!grouped[year]) {
      grouped[year] = [];
    }
    // Flatten earnings sections into the grouped data
    section.earningsSections.forEach(earnings => {
      grouped[year].push({
        ...earnings,
        financialYear: year
      });
    });
  });

  return grouped;
}

/**
 * Get annual reports grouped by year
 * 
 * @param {Object} reportFilingData - Mapped report filing data
 * @returns {Object} Annual reports grouped by year
 */
export function getAnnualReportsGrouped(reportFilingData) {
  const grouped = {};

  (reportFilingData.annualReportSections || []).forEach(section => {
    const year = section.tabYear;
    if (!grouped[year]) {
      grouped[year] = [];
    }
    grouped[year].push(section);
  });

  return grouped;
}

/**
 * Get board meeting filings grouped by year
 * 
 * @param {Object} reportFilingData - Mapped report filing data
 * @returns {Object} Board meeting filings grouped by year
 */
export function getBoardMeetingFilingsGrouped(reportFilingData) {
  const grouped = {};

  (reportFilingData.boardMeetingFilingsSections || []).forEach(section => {
    const year = section.tabYear;
    if (!grouped[year]) {
      grouped[year] = [];
    }
    grouped[year].push(section);
  });

  return grouped;
}

/**
 * Get other exchange filings grouped by year
 * 
 * @param {Object} reportFilingData - Mapped report filing data
 * @returns {Object} Other exchange filings grouped by year
 */
export function getOthersFilingsGrouped(reportFilingData) {
  const grouped = {};

  (reportFilingData.otherExchangeFilingsSections || []).forEach(section => {
    const year = section.tabYear;
    if (!grouped[year]) {
      grouped[year] = [];
    }
    grouped[year].push(section);
  });

  return grouped;
}

/**
 * Get quarterly results by year
 * 
 * @param {Object} reportFilingData - Mapped report filing data
 * @param {string} year - Financial year (e.g., "FY 2025-26")
 * @returns {Array} Quarterly results for the specified year
 */
export function getQuarterlyResultsByYear(reportFilingData, year) {
  return reportFilingData.quarterlyResults.filter(
    result => result.quarterYear === year
  );
}

/**
 * Get annual report by year
 * 
 * @param {Object} reportFilingData - Mapped report filing data
 * @param {string} year - Year (e.g., "2025")
 * @returns {Object|null} Annual report for the specified year
 */
export function getAnnualReportByYear(reportFilingData, year) {
  return reportFilingData.annualReports.find(
    report => report.tabYear === year
  ) || null;
}

/**
 * Get board meeting filings by year
 * 
 * @param {Object} reportFilingData - Mapped report filing data
 * @param {string} year - Year (e.g., "2025")
 * @returns {Array} Board meeting filings for the specified year
 */
export function getBoardMeetingFilingsByYear(reportFilingData, year) {
  return reportFilingData.boardMeetingFilings.filter(
    filing => filing.tabYear === year
  );
}

/**
 * Get others filings by year
 * 
 * @param {Object} reportFilingData - Mapped report filing data
 * @param {string} year - Year (e.g., "2025")
 * @returns {Array} Others filings for the specified year
 */
export function getOthersFilingsByYear(reportFilingData, year) {
  return reportFilingData.othersFilings.filter(
    filing => filing.tabYear === year
  );
}

/**
 * Get active annual returns only
 * 
 * @param {Object} reportFilingData - Mapped report filing data
 * @returns {Array} Active annual returns
 */
export function getActiveAnnualReturns(reportFilingData) {
  return (reportFilingData.annualReturnsSections || []).filter(
    section => section.pdfCard && section.pdfCard.isActive !== false
  );
}

/**
 * Get active quarterly results only
 * 
 * @param {Object} reportFilingData - Mapped report filing data
 * @returns {Array} Active quarterly results
 */
export function getActiveQuarterlyResults(reportFilingData) {
  const allResults = [];
  (reportFilingData.quarterlyResultsSections || []).forEach(section => {
    section.earningsSections.forEach(earnings => {
      if (earnings.pdfCards && earnings.pdfCards.some(card => card.isActive !== false)) {
        allResults.push(earnings);
      }
    });
  });
  return allResults;
}

/**
 * Get active annual reports only
 * 
 * @param {Object} reportFilingData - Mapped report filing data
 * @returns {Array} Active annual reports
 */
export function getActiveAnnualReports(reportFilingData) {
  // Annual reports don't have isActive field at section level, so return all
  return reportFilingData.annualReportSections || [];
}

/**
 * Process quarterly data for a specific year
 * Helper function to extract quarterly items and cards from earnings sections
 * 
 * @param {Array} yearData - Array of earnings sections for a specific year
 * @returns {Object} Formatted quarterly data for that year
 */
function processQuarterlyDataForYear(yearData) {
  const quarterlyItems = [];
  const cards = [];
  const quarterlyItemsAfterCards = [];
  const cardsAfterQ2 = [];
  
  if (yearData.length > 0) {
    // Process earnings sections - each section represents a quarter
    // Sort by quarterLabel to ensure Q1 comes before Q2
    const sortedEarnings = [...yearData].sort((a, b) => {
      const aQuarter = a.quarterLabel?.match(/Q(\d+)/)?.[1] || '0';
      const bQuarter = b.quarterLabel?.match(/Q(\d+)/)?.[1] || '0';
      return parseInt(aQuarter) - parseInt(bQuarter);
    });
    
    // Process first quarter (Q1)
    if (sortedEarnings.length > 0) {
      const q1Earnings = sortedEarnings[0];
      const quarterLabel = q1Earnings.quarterLabel || '';
      
      // Extract period from QuarterLabel (e.g., "Q1 (April-June)" -> "Q1(April-June)")
      // or "Q2 (July– Sep)" -> "Q2(July– Sep)" - handle both en dash (–) and hyphen (-)
      const periodMatch = quarterLabel.match(/Q\d+\s*[–-]?\s*\(([^)]+)\)/);
      const period = periodMatch ? periodMatch[1] : '';
      const quarterNumber = quarterLabel.match(/Q(\d+)/)?.[1] || '1';
      
      // Determine status from first card's isAudited field
      const status = q1Earnings.pdfCards?.[0]?.isAudited ? 'Audited' : 'Unaudited';
      
      // Format period: if we have period text, use "Q1(period)", otherwise use the full quarterLabel
      const formattedPeriod = period 
        ? `Q${quarterNumber}(${period})` 
        : (quarterLabel || `Q${quarterNumber}`);
      
      quarterlyItems.push({
        period: formattedPeriod,
        status: status
      });
      
      // Add all cards from Q1
      if (q1Earnings.pdfCards && q1Earnings.pdfCards.length > 0) {
        cards.push(...q1Earnings.pdfCards.map(card => ({
          id: card.id,
          title: card.title,
          pdfUrl: card.pdfUrl || '#',
          isActive: card.isActive !== false
        })));
      }
    }
    
    // Process second quarter (Q2)
    if (sortedEarnings.length > 1) {
      const q2Earnings = sortedEarnings[1];
      const quarterLabel = q2Earnings.quarterLabel || '';
      
      // Extract period from QuarterLabel - handle both en dash (–) and hyphen (-)
      const periodMatch = quarterLabel.match(/Q\d+\s*[–-]?\s*\(([^)]+)\)/);
      const period = periodMatch ? periodMatch[1] : '';
      const quarterNumber = quarterLabel.match(/Q(\d+)/)?.[1] || '2';
      
      // Determine status from first card's isAudited field
      const status = q2Earnings.pdfCards?.[0]?.isAudited ? 'Audited' : 'Unaudited';
      
      // Format period: if we have period text, use "Q2(period)", otherwise use the full quarterLabel
      const formattedPeriod = period 
        ? `Q${quarterNumber}(${period})` 
        : (quarterLabel || `Q${quarterNumber}`);
      
      quarterlyItemsAfterCards.push({
        period: formattedPeriod,
        status: status
      });
      
      // Add all cards from Q2
      if (q2Earnings.pdfCards && q2Earnings.pdfCards.length > 0) {
        cardsAfterQ2.push(...q2Earnings.pdfCards.map(card => ({
          id: card.id,
          title: card.title,
          pdfUrl: card.pdfUrl || '#',
          isActive: card.isActive !== false
        })));
      }
    }
  }
  
  return {
    quarterlyItems,
    cards,
    quarterlyItemsAfterCards,
    cardsAfterQ2
  };
}

/**
 * Transform quarterly results for QuarterlyResultsWithTabs component
 * Returns data for all tabs, with each tab having its own quarterly data
 * 
 * @param {Object} reportFilingData - Mapped report filing data
 * @returns {Object} Formatted data for QuarterlyResultsWithTabs
 */
export function transformQuarterlyResultsForComponent(reportFilingData) {
  const grouped = getQuarterlyResultsGrouped(reportFilingData);
  const tabs = Object.keys(grouped).sort().reverse(); // Most recent first
  
  // Process data for each tab/year
  const tabsData = {};
  
  tabs.forEach(year => {
    const yearData = grouped[year] || [];
    tabsData[year] = processQuarterlyDataForYear(yearData);
  });
  
  // For backward compatibility, also return data for the first year
  const firstYear = tabs[0];
  const firstYearData = tabsData[firstYear] || {
    quarterlyItems: [],
    cards: [],
    quarterlyItemsAfterCards: [],
    cardsAfterQ2: []
  };
  
  return {
    tabs,
    tabsData,
    // Legacy fields for first year (for components that haven't been updated yet)
    quarterlyItems: firstYearData.quarterlyItems,
    cards: firstYearData.cards,
    quarterlyItemsAfterCards: firstYearData.quarterlyItemsAfterCards,
    cardsAfterQ2: firstYearData.cardsAfterQ2
  };
}

/**
 * Transform annual reports for IntegratedReportAnnualReport component
 * 
 * @param {Object} reportFilingData - Mapped report filing data
 * @returns {Object} Formatted data for IntegratedReportAnnualReport
 */
export function transformAnnualReportsForComponent(reportFilingData) {
  const grouped = getAnnualReportsGrouped(reportFilingData);
  const tabs = Object.keys(grouped).sort().reverse(); // Most recent first
  
  const tabsData = {};
  
  tabs.forEach(year => {
    const reports = grouped[year];
    if (reports.length > 0) {
      const report = reports[0]; // Take first report for this year
      
      // Transform pdfCards to extraSmallCards format
      const extraSmallCards = report.pdfCards.map(card => ({
        id: card.id,
        title: card.title,
        pdfUrl: card.pdfUrl || '#',
        isActive: card.isActive
      }));
      
      // Create cardData
      const cardData = {
        title: report.title ? report.title.split(' ').slice(-2) : ["Financial Year", year],
        image: report.image ? {
          url: report.image.url,
          alt: report.image.alt
        } : {
          url: "/assets/reports-filings/circle.png",
          alt: `Integrated Report ${year}`
        },
        buttons: [
          {
            label: "Download Now",
            href: report.mainPdf?.url || "#",
            variant: "outline"
          },
          {
            label: "Visit ESG Microsite",
            href: report.micrositeUrl || "#",
            variant: "filled"
          }
        ]
      };
      
      tabsData[year] = {
        cardData,
        extraSmallCards
      };
    }
  });
  
  return {
    tabs,
    tabsData
  };
}

/**
 * Transform annual returns for AnnualReturns component
 * 
 * @param {Object} reportFilingData - Mapped report filing data
 * @returns {Array} Formatted cards for AnnualReturns
 */
export function transformAnnualReturnsForComponent(reportFilingData) {
  const activeReturns = getActiveAnnualReturns(reportFilingData);
  
  return activeReturns.map(section => ({
    id: section.id,
    title: section.pdfCard?.title || 'Annual Return',
    pdfUrl: section.pdfCard?.pdfUrl || '#',
    isActive: section.pdfCard?.isActive !== false
  }));
}

/**
 * Transform board meeting filings for ExchangeFilings component
 * 
 * @param {Object} reportFilingData - Mapped report filing data
 * @returns {Object} Formatted data for ExchangeFilings
 */
export function transformBoardMeetingFilingsForComponent(reportFilingData) {
  const grouped = getBoardMeetingFilingsGrouped(reportFilingData);
  const tabs = Object.keys(grouped).sort().reverse(); // Most recent first
  
  const tabsData = {};
  
  tabs.forEach(year => {
    const filings = grouped[year];
    const cards = [];
    
    filings.forEach(filing => {
      filing.pdfCards.forEach(card => {
        cards.push({
          links: [{
            text: card.title,
            href: card.pdfUrl || '#'
          }]
        });
      });
    });
    
    tabsData[year] = {
      cards: cards.length > 0 ? cards : null
    };
  });
  
  return {
    tabs,
    tabsData
  };
}

/**
 * Transform others filings for ExchangeFilings component
 * 
 * @param {Object} reportFilingData - Mapped report filing data
 * @returns {Object} Formatted data for ExchangeFilings
 */
export function transformOthersFilingsForComponent(reportFilingData) {
  const grouped = getOthersFilingsGrouped(reportFilingData);
  const tabs = Object.keys(grouped).sort().reverse(); // Most recent first
  
  const tabsData = {};
  
  tabs.forEach(year => {
    const filings = grouped[year];
    const cards = [];
    
    filings.forEach(filing => {
      filing.pdfCards.forEach(card => {
        cards.push({
          links: [{
            text: card.title,
            href: card.pdfUrl || '#'
          }]
        });
      });
    });
    
    tabsData[year] = {
      cards: cards.length > 0 ? cards : null
    };
  });
  
  return {
    tabs,
    tabsData
  };
}

/**
 * Fetch policy data from Strapi
 * This is a Single Type, so it returns one entry with PolicyDocumentsSection array and TopBanner
 * 
 * @returns {Promise<Object>} Raw Strapi API response
 */
export async function getPolicy() {
  // Use simpler populate format that works - populate all fields recursively
  // This will populate TopBanner (DesktopImage, MobileImage, Heading, SubHeading) and PolicyDocumentsSection (Title, PublishedDate, Pdf, isActive)
  return fetchAPI('policy?populate[TopBanner][populate]=*&populate[PolicyDocumentsSection][populate]=*', {
    next: { revalidate: 60 },
  });
}

/**
 * Map policy data from Strapi
 * 
 * @param {Object} strapiData - Raw Strapi API response
 * @returns {Object} Mapped policy data for component
 */
export function mapPolicyData(strapiData) {
  // Handle Strapi v4 response structure (Single Type) with chaining and fallbacks
  const data = strapiData?.data || strapiData;

  // If no data, throw error so page can handle it properly
  if (!data) {
    throw new Error('No data received from Strapi API. Check that the policy endpoint returns data.');
  }

  // Map PolicyDocumentsSection array to component format with chaining
  const policies = Array.isArray(data?.PolicyDocumentsSection)
    ? data.PolicyDocumentsSection.map((card) => {
        let pdfUrl = null;

        // Try to get PDF URL from different possible sources using chaining:
        // 1. PDF stored as Strapi Media file (card.Pdf) - direct structure from API
        if (card?.Pdf) {
          // Handle both nested (data.attributes) and direct structure
          const pdf = card.Pdf?.data?.attributes || card.Pdf;
          if (pdf?.url || pdf) {
            pdfUrl = getStrapiMedia(pdf);
          }
        }
        
        // 2. Fallback to lowercase field names (for backward compatibility)
        if (!pdfUrl && card?.pdf) {
          const pdf = card.pdf?.data?.attributes || card.pdf;
          if (pdf?.url || pdf) {
            pdfUrl = getStrapiMedia(pdf);
          }
        }
        
        // 3. PDF stored as external URL text field (card.pdfUrl)
        if (!pdfUrl && card?.pdfUrl) {
          pdfUrl = card.pdfUrl;
        }
        
        // 4. PDF stored as direct URL string in Pdf field
        if (!pdfUrl && typeof card?.Pdf === 'string' && card.Pdf.startsWith('http')) {
          pdfUrl = card.Pdf;
        }

        // Log in development if PDF URL is missing
        if (process.env.NODE_ENV === 'development' && !pdfUrl) {
          console.warn(`Policy "${card?.Title || card?.title || 'Unknown'}" (ID: ${card?.id || 'N/A'}) is missing PDF URL. Available fields:`, Object.keys(card || {}));
        }

        return {
          id: card?.id || null,
          title: card?.Title || card?.title || '',
          pdfUrl: pdfUrl || '#',
          isActive: card?.isActive !== undefined ? card.isActive : false,
          publishedDate: card?.PublishedDate || card?.publishedDate || null
        };
      }).filter(policy => policy.id !== null) // Filter out invalid policies
    : [];

  // Return in component-expected format (images are static assets, not from API)
  return {
    policies: policies,
    images: {
      downloadButton: {
        active: "/assets/policies/download-button-active.svg",
        inactive: "/assets/policies/download-button-inactive.svg"
      },
      decorativeGroup: "/assets/policies/group.svg"
    }
  };
}

/**
 * Fetch code-of-conduct data from Strapi
 * This is a Single Type, so it returns one entry with CodeOfConductDocumentsSection array and TopBanner
 * 
 * @returns {Promise<Object>} Raw Strapi API response
 */
export async function getCodeOfConduct() {
  // Use simpler populate format that works - populate all fields recursively
  // This will populate TopBanner (DesktopImage, MobileImage, Heading, SubHeading) and CodeOfConductDocumentsSection (Title, PublishedDate, Pdf, isActive)
  return fetchAPI('code-of-conduct?populate[TopBanner][populate]=*&populate[CodeOfConductDocumentsSection][populate]=*', {
    next: { revalidate: 60 },
  });
}

/**
 * Map code-of-conduct data from Strapi
 * 
 * @param {Object} strapiData - Raw Strapi API response
 * @returns {Object} Mapped code of conduct data for component
 */
export function mapCodeOfConductData(strapiData) {
  // Handle Strapi v4 response structure (Single Type) with chaining and fallbacks
  const data = strapiData?.data || strapiData;

  // If no data, throw error so page can handle it properly
  if (!data) {
    throw new Error('No data received from Strapi API. Check that the code-of-conduct endpoint returns data.');
  }

  // Map CodeOfConductDocumentsSection array to component format with chaining
  const codes = Array.isArray(data?.CodeOfConductDocumentsSection)
    ? data.CodeOfConductDocumentsSection.map((card) => {
        let pdfUrl = null;

        // Try to get PDF URL from different possible sources using chaining:
        // 1. PDF stored as Strapi Media file (card.Pdf) - direct structure from API
        if (card?.Pdf) {
          // Handle both nested (data.attributes) and direct structure
          const pdf = card.Pdf?.data?.attributes || card.Pdf;
          if (pdf?.url || pdf) {
            pdfUrl = getStrapiMedia(pdf);
          }
        }
        
        // 2. Fallback to lowercase field names (for backward compatibility)
        if (!pdfUrl && card?.pdf) {
          const pdf = card.pdf?.data?.attributes || card.pdf;
          if (pdf?.url || pdf) {
            pdfUrl = getStrapiMedia(pdf);
          }
        }
        
        // 3. PDF stored as external URL text field (card.pdfUrl)
        if (!pdfUrl && card?.pdfUrl) {
          pdfUrl = card.pdfUrl;
        }
        
        // 4. PDF stored as direct URL string in Pdf field
        if (!pdfUrl && typeof card?.Pdf === 'string' && card.Pdf.startsWith('http')) {
          pdfUrl = card.Pdf;
        }

        // Log in development if PDF URL is missing
        if (process.env.NODE_ENV === 'development' && !pdfUrl) {
          console.warn(`Code of Conduct "${card?.Title || card?.title || 'Unknown'}" (ID: ${card?.id || 'N/A'}) is missing PDF URL. Available fields:`, Object.keys(card || {}));
        }

        return {
          id: card?.id || null,
          title: card?.Title || card?.title || '',
          pdfUrl: pdfUrl || '#',
          isActive: card?.isActive !== undefined ? card.isActive : false,
          publishedDate: card?.PublishedDate || card?.publishedDate || null
        };
      }).filter(code => code.id !== null) // Filter out invalid codes
    : [];

  // Return in component-expected format (images are static assets, not from API)
  return {
    codes: codes,
    images: {
      downloadButton: {
        active: "/assets/policies/download-button-active.svg",
        inactive: "/assets/policies/download-button-inactive.svg"
      },
      decorativeGroup: "/assets/policies/group.svg"
    }
  };
}

/**
 * Fetch analyst-coverage data from Strapi
 * This is a Single Type, so it returns one entry with AnalystCoverageSection array and TopBanner
 * 
 * @returns {Promise<Object>} Raw Strapi API response
 */
export async function getAnalystCoverage() {
  // Explicitly populate TopBanner DesktopImage and MobileImage (banner images)
  // Populate AnalystCoverageSection with all fields (Institution, AnalystName, Email, DisplayOrder)
  // Following chaining method like policies API endpoint
  const populateQuery = [
    'populate[TopBanner][populate][DesktopImage][populate]=*',
    'populate[TopBanner][populate][MobileImage][populate]=*',
    'populate[AnalystCoverageSection][populate]=*'
  ].join('&');
  
  return fetchAPI(`analyst-coverage?${populateQuery}`, {
    next: { revalidate: 60 },
  });
}

/**
 * Map analyst coverage data from Strapi
 * 
 * @param {Object} strapiData - Raw Strapi API response
 * @returns {Array} Mapped analyst data array
 */
export function mapAnalystCoverageData(strapiData) {
  // Handle Strapi v4 response structure (Single Type) with chaining and fallbacks
  const data = strapiData?.data || strapiData;

  // If no data, throw error so page can handle it properly
  if (!data) {
    throw new Error('No data received from Strapi API. Check that the analyst-coverage endpoint returns data.');
  }

  // Map AnalystCoverageSection array to component format with chaining
  const analysts = Array.isArray(data?.AnalystCoverageSection)
    ? data.AnalystCoverageSection.map((card, index) => ({
        id: card?.id || index + 1,
        institution: card?.Institution || card?.institution || card?.company_name || '',
        analyst: card?.AnalystName || card?.analystName || card?.name || '',
        email: card?.Email || card?.email || '',
        isActive: card?.isActive !== undefined ? card.isActive : false,
        displayOrder: card?.DisplayOrder || card?.displayOrder || null
      }))
    : [];

  // Sort by displayOrder if available, otherwise keep original order
  return analysts.sort((a, b) => {
    if (a.displayOrder !== null && b.displayOrder !== null) {
      return a.displayOrder - b.displayOrder;
    }
    if (a.displayOrder !== null) return -1;
    if (b.displayOrder !== null) return 1;
    return 0;
  });
}

/**
 * Fetch investor-faqs data from Strapi
 * This is a Single Type, so it returns one entry with FaqSection array and TopBanner
 * 
 * @returns {Promise<Object>} Raw Strapi API response
 */
export async function getInvestorFAQs() {
  // Explicitly populate TopBanner DesktopImage and MobileImage (banner images)
  // Populate FaqSection with all fields (Question, Answer, isActive)
  // Following chaining method like policies API endpoint
  const populateQuery = [
    'populate[TopBanner][populate][DesktopImage][populate]=*',
    'populate[TopBanner][populate][MobileImage][populate]=*',
    'populate[FaqSection][populate]=*'
  ].join('&');
  
  return fetchAPI(`investor-faq?${populateQuery}`, {
    next: { revalidate: 60 },
  });
}

/**
 * Map investor FAQs data from Strapi
 * 
 * @param {Object} strapiData - Raw Strapi API response
 * @returns {Object} Mapped investor FAQs data for component
 */
export function mapInvestorFAQsData(strapiData) {
  // Handle Strapi v4 response structure (Single Type) with chaining and fallbacks
  const data = strapiData?.data || strapiData;

  // If no data, throw error so page can handle it properly
  if (!data) {
    throw new Error('No data received from Strapi API. Check that the investor-faqs endpoint returns data.');
  }

  // Map FaqSection array to component format with chaining
  const faqs = Array.isArray(data?.FaqSection)
    ? data.FaqSection.map((faq, index) => ({
        id: faq?.id || index,
        question: faq?.Question || faq?.question || '',
        answer: faq?.Answer || faq?.answer || '',
        isActive: faq?.isActive !== undefined ? faq.isActive : true
      })).filter(faq => faq.isActive && faq.question) // Only include active FAQs with questions
    : [];

  return {
    faqs: faqs
  };
}


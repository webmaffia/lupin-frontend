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
  // Check for nested structure first (data.attributes), then direct object
  const pdf = pdfCard?.Pdf?.data?.attributes 
    || pdfCard?.Pdf 
    || pdfCard?.pdf?.data?.attributes 
    || pdfCard?.pdf;
  
  // Extract PDF URL - handle both nested and direct structures
  let pdfUrl = null;
  if (pdf) {
    if (typeof pdf === 'string') {
      pdfUrl = getStrapiMedia(pdf);
    } else if (pdf.url) {
      pdfUrl = getStrapiMedia(pdf);
    } else if (pdf.data?.attributes?.url) {
      pdfUrl = getStrapiMedia(pdf.data.attributes);
    }
  }

  // Handle different title field cases: Title, title
  const title = pdfCard?.Title || pdfCard?.title || '';

  // Generate a unique ID if not present
  const cardId = pdfCard.id || pdfCard.documentId || pdf?.documentId || `pdf-${Math.random().toString(36).substr(2, 9)}`;

  if (process.env.NODE_ENV === 'development') {
    console.log('mapPdfCard - Processing card:', {
      cardId,
      title,
      hasPdf: !!pdf,
      pdfUrl,
      pdfStructure: pdf ? Object.keys(pdf) : null,
      isActive: pdfCard?.isActive !== undefined ? pdfCard.isActive : true
    });
  }

  // Return card even if no PDF URL (component will handle it)
  return {
    id: cardId,
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
  // Map all cards and filter out nulls (but keep cards even if they don't have IDs)
  const pdfCards = Array.isArray(earningsSection?.PdfCard)
    ? earningsSection.PdfCard.map(mapPdfCard).filter(card => card !== null)
    : Array.isArray(earningsSection?.pdfCard)
    ? earningsSection.pdfCard.map(mapPdfCard).filter(card => card !== null)
    : [];

  if (process.env.NODE_ENV === 'development') {
    console.log('mapQuarterlyEarningsSection - Processing section:', {
      id: earningsSection.id,
      quarterLabel: earningsSection?.QuarterLabel || earningsSection?.quarterLabel || '',
      pdfCardsCount: pdfCards.length,
      pdfCards: pdfCards.map(card => ({
        id: card.id,
        title: card.title,
        pdfUrl: card.pdfUrl,
        isActive: card.isActive
      }))
    });
  }

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

  if (process.env.NODE_ENV === 'development') {
    console.log('mapReportFilingData - Raw data structure:', {
      hasQuarterlyResultsSection: !!data?.QuarterlyResultsSection,
      quarterlyResultsSectionType: Array.isArray(data?.QuarterlyResultsSection) ? 'array' : typeof data?.QuarterlyResultsSection,
      quarterlyResultsSectionLength: Array.isArray(data?.QuarterlyResultsSection) ? data.QuarterlyResultsSection.length : 'N/A',
      quarterlyResultsSectionKeys: data?.QuarterlyResultsSection ? Object.keys(data.QuarterlyResultsSection) : []
    });
  }

  // Map TopBanner if available
  const topBanner = mapTopBannerData(data?.TopBanner);

  // Map each section using new field names
  // Handle both array and single object structures
  let quarterlyResultsSections = [];
  if (Array.isArray(data?.QuarterlyResultsSection)) {
    quarterlyResultsSections = data.QuarterlyResultsSection.map(mapQuarterlyResultsSection).filter(Boolean);
  } else if (data?.QuarterlyResultsSection) {
    // Handle single object structure (if API returns single object instead of array)
    const mapped = mapQuarterlyResultsSection(data.QuarterlyResultsSection);
    if (mapped) {
      quarterlyResultsSections = [mapped];
    }
  }

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

  if (process.env.NODE_ENV === 'development') {
    console.log('mapReportFilingData - Mapped sections:', {
      quarterlyResultsSectionsCount: quarterlyResultsSections.length,
      quarterlyResultsSections: quarterlyResultsSections.map(section => ({
        id: section.id,
        financialYear: section.financialYear,
        earningsSectionsCount: section.earningsSections?.length || 0,
        earningsSections: section.earningsSections?.map(e => ({
          id: e.id,
          quarterLabel: e.quarterLabel,
          pdfCardsCount: e.pdfCards?.length || 0
        })) || []
      }))
    });
  }

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
  // New structure: array of quarters, each with its own items and cards
  const quarters = [];
  
  if (process.env.NODE_ENV === 'development') {
    console.log('processQuarterlyDataForYear - Input yearData:', {
      length: yearData.length,
      quarters: yearData.map(e => ({
        quarterLabel: e.quarterLabel,
        pdfCardsCount: e.pdfCards?.length || 0
      }))
    });
  }
  
  if (yearData.length > 0) {
    // Process earnings sections - each section represents a quarter
    // Sort by quarterLabel to ensure Q1 comes before Q2, Q2 before Q3, etc.
    // Extract quarter number and sort numerically (Q1, Q2, Q3, Q4)
    const sortedEarnings = [...yearData].sort((a, b) => {
      const aMatch = a.quarterLabel?.match(/Q(\d+)/);
      const bMatch = b.quarterLabel?.match(/Q(\d+)/);
      const aQuarter = aMatch ? parseInt(aMatch[1]) : 999;
      const bQuarter = bMatch ? parseInt(bMatch[1]) : 999;
      return aQuarter - bQuarter; // Sort Q1, Q2, Q3, Q4 in ascending order
    });
    
    if (process.env.NODE_ENV === 'development') {
      console.log('processQuarterlyDataForYear - Sorted earnings:', {
        total: sortedEarnings.length,
        quarters: sortedEarnings.map(e => ({
          label: e.quarterLabel,
          quarterNum: e.quarterLabel?.match(/Q(\d+)/)?.[1] || 'N/A',
          pdfCardsCount: e.pdfCards?.length || 0
        }))
      });
    }
    
    // Process each quarter separately
    for (let i = 0; i < sortedEarnings.length; i++) {
      const quarterEarnings = sortedEarnings[i];
      // USE RAW QUARTERLABEL DIRECTLY FROM API - NO REFORMATTING
      const quarterLabel = quarterEarnings.quarterLabel || '';
      
      if (process.env.NODE_ENV === 'development') {
        console.log(`Q${i + 1} Label - Using raw from API:`, {
          original: quarterLabel,
          rawQuarterLabel: quarterEarnings.quarterLabel
        });
      }
      
      // Determine status from first card's isAudited field
      const status = quarterEarnings.pdfCards?.[0]?.isAudited ? 'Audited' : 'Unaudited';
      
      // USE RAW QUARTERLABEL DIRECTLY - NO REFORMATTING TO PRESERVE CMS CHANGES
      const formattedPeriod = quarterLabel || `Q${i + 1}`;
      
      // Process cards for this quarter
      const quarterCards = [];
      if (quarterEarnings.pdfCards && quarterEarnings.pdfCards.length > 0) {
        const activeCards = quarterEarnings.pdfCards
          .filter(card => card && card.isActive !== false)
          .map(card => ({
            id: card.id,
            title: card.title || '',
            pdfUrl: card.pdfUrl || '#',
            isActive: card.isActive !== false
          }));
        quarterCards.push(...activeCards);
        
        if (process.env.NODE_ENV === 'development') {
          console.log(`Q${i + 1} cards added:`, activeCards.length);
        }
      }
      
      // Add this quarter to the quarters array
      quarters.push({
        items: [{
          period: formattedPeriod,
          status: status
        }],
        cards: quarterCards
      });
      
      if (process.env.NODE_ENV === 'development') {
        console.log(`Q${i + 1} processed:`, {
          quarterLabel,
          formattedPeriod,
          status,
          pdfCardsCount: quarterEarnings.pdfCards?.length || 0,
          cardsCount: quarterCards.length
        });
      }
    }
  }
  
  // For backward compatibility, also maintain the old structure
  // Q1 goes to quarterlyItems and cards
  // Q2-Q4 go to quarterlyItemsAfterCards and cardsAfterQ2
  const quarterlyItems = quarters[0]?.items || [];
  const cards = quarters[0]?.cards || [];
  const quarterlyItemsAfterCards = quarters.slice(1).flatMap(q => q.items);
  const cardsAfterQ2 = quarters.slice(1).flatMap(q => q.cards);
  
  if (process.env.NODE_ENV === 'development') {
    console.log('processQuarterlyDataForYear - Final result:', {
      quartersCount: quarters.length,
      quarterlyItemsCount: quarterlyItems.length,
      cardsCount: cards.length,
      quarterlyItemsAfterCardsCount: quarterlyItemsAfterCards.length,
      cardsAfterQ2Count: cardsAfterQ2.length,
      quarters: quarters.map((q, idx) => ({
        quarter: q.items[0]?.period,
        cardsCount: q.cards.length
      }))
    });
  }
  
  return {
    quarters, // New structure: array of quarters with items and cards
    quarterlyItems, // Legacy: Q1 items
    cards, // Legacy: Q1 cards
    quarterlyItemsAfterCards, // Legacy: Q2-Q4 items
    cardsAfterQ2 // Legacy: Q2-Q4 cards
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
  
  if (process.env.NODE_ENV === 'development') {
    console.log('transformQuarterlyResultsForComponent - Grouped data:', {
      years: tabs,
      yearDataCounts: Object.keys(grouped).map(year => ({
        year,
        quartersCount: grouped[year]?.length || 0,
        quarters: grouped[year]?.map(e => e.quarterLabel) || []
      }))
    });
  }
  
  // Process data for each tab/year
  const tabsData = {};
  
  tabs.forEach(year => {
    const yearData = grouped[year] || [];
    tabsData[year] = processQuarterlyDataForYear(yearData);
    
    if (process.env.NODE_ENV === 'development') {
      console.log(`transformQuarterlyResultsForComponent - ${year} processed:`, {
        quarterlyItemsCount: tabsData[year].quarterlyItems.length,
        cardsCount: tabsData[year].cards.length,
        quarterlyItemsAfterCardsCount: tabsData[year].quarterlyItemsAfterCards.length,
        cardsAfterQ2Count: tabsData[year].cardsAfterQ2.length,
        allQuarters: [
          ...tabsData[year].quarterlyItems.map(i => i.period),
          ...tabsData[year].quarterlyItemsAfterCards.map(i => i.period)
        ]
      });
    }
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

/**
 * Fetch financial data from Strapi
 * This is a Single Type, so it returns one entry with all sections
 * 
 * @returns {Promise<Object>} Raw Strapi API response
 */
export async function getFinancial() {
  // Populate all nested components and media
  // Following the structure from the screenshot and same pattern as reports-and-filings:
  // - TopBanner with DesktopImage and MobileImage
  // - RevenueProfitabilitySection with charts (FinancialMetricChart) and data (FinancialMetricItem)
  // - Financial_Document_Item (PdfCard array) - May be top-level or nested
  // - RelatedPartyTransactionsSection (PdfCard array) - Top-level repeatable component
  // 
  // Structure: RevenueProfitabilitySection -> charts (FinancialMetricChart) -> data (FinancialMetricItem)
  // Need to explicitly populate the nested data array within charts
  const populateQuery = [
    'populate[TopBanner][populate][DesktopImage][populate]=*',
    'populate[TopBanner][populate][MobileImage][populate]=*',
    // Populate RevenueProfitabilitySection -> charts -> data (nested structure)
    'populate[RevenueProfitabilitySection][populate][charts][populate][data][populate]=*',
    // Financial_Document_Item is nested inside RevenueProfitabilitySection
    'populate[RevenueProfitabilitySection][populate][Financial_Document_Item][populate][Pdf][populate]=*',
    // RelatedPartyTransactionsSection is a top-level repeatable component (PdfCard)
    'populate[RelatedPartyTransactionsSection][populate][Pdf][populate]=*'
  ].join('&');
  
  return fetchAPI(`financial?${populateQuery}`, {
    next: { revalidate: 60 },
  });
}

/**
 * Map RevenueProfitabilitySection data from Strapi
 * 
 * @param {Object} section - RevenueProfitabilitySection from Strapi
 * @returns {Object} Mapped revenue profitability data for FinancialBarSection
 */
function mapRevenueProfitabilitySection(section) {
  if (!section) return null;

  const sectionTitle = section?.SectionTitle || section?.sectionTitle || 'Revenue and Profitability';
  
  // Map charts array
  const charts = Array.isArray(section?.charts)
    ? section.charts.map((chart) => {
        const metricTitle = chart?.MetricTitleTitle || chart?.metricTitleTitle || chart?.MetricTitle || '';
        const unit = chart?.Unit || chart?.unit || '';
        const chartTitle = unit ? `${metricTitle} (${unit})` : metricTitle;
        
        // Map data array (FinancialMetricItem)
        // Handle both direct data array and nested structure (data or Data)
        const chartData = chart?.data || chart?.Data || [];
        const data = Array.isArray(chartData)
          ? chartData.map((item) => {
              const financialYear = item?.FinancialYear || item?.financialYear || '';
              const year = item?.Year || item?.year || '';
              const amount = item?.Amount || item?.amount || '0';
              
              // Format label: "FY25 – 221,921" or "FY 2025-26 – 221,921"
              const yearLabel = financialYear || year || '';
              // Parse amount - handle string numbers with commas or spaces
              const amountNum = typeof amount === 'string' 
                ? parseFloat(amount.replace(/[,\s]/g, '')) 
                : parseFloat(amount) || 0;
              const formattedAmount = amountNum > 0 ? amountNum.toLocaleString('en-US') : '0';
              const label = yearLabel ? `${yearLabel} – ${formattedAmount}` : formattedAmount;
              
              return {
                label: label,
                value: amountNum
              };
            }).filter(item => item.value > 0 || item.label) // Filter out empty items
          : [];
        
        // Only return chart if it has data
        if (data.length === 0) return null;
        
        return {
          title: chartTitle,
          data: data
        };
      }).filter(chart => chart !== null) // Filter out null charts
    : [];

  return {
    title: sectionTitle,
    charts: charts
  };
}

/**
 * Map financial data from Strapi
 * 
 * @param {Object} strapiData - Raw Strapi API response
 * @returns {Object} Mapped financial data for components
 */
export function mapFinancialData(strapiData) {
  // Handle Strapi v4 response structure (Single Type) with chaining and fallbacks
  const data = strapiData?.data || strapiData;

  // If no data, throw error so page can handle it properly
  if (!data) {
    throw new Error('No data received from Strapi API. Check that the financial endpoint returns data.');
  }

  // Map RevenueProfitabilitySection
  const revenueProfitabilityData = mapRevenueProfitabilitySection(
    data?.RevenueProfitabilitySection || data?.revenueProfitabilitySection
  );

  // Map Financial_Document_Item (PdfCard array) - for financial documents
  // Financial_Document_Item is nested inside RevenueProfitabilitySection (as confirmed by API response)
  const financialDocumentsData = data?.RevenueProfitabilitySection?.Financial_Document_Item
    || data?.RevenueProfitabilitySection?.FinancialDocumentItem
    || data?.Financial_Document_Item
    || data?.FinancialDocumentItem;
  const financialDocuments = Array.isArray(financialDocumentsData)
    ? financialDocumentsData.map((card, index) => {
        // Handle Pdf field (uppercase) or pdf (lowercase)
        const pdf = card?.Pdf?.data?.attributes || card?.Pdf || card?.pdf?.data?.attributes || card?.pdf;
        const pdfUrl = pdf ? getStrapiMedia(pdf) : null;

        return {
          id: card?.id || index + 1,
          title: card?.Title || card?.title || '',
          pdfUrl: pdfUrl || '#',
          isActive: card?.isActive !== undefined ? card.isActive : false,
          publishedDate: card?.PublishedDate || card?.publishedDate || null
        };
      }).filter(card => card.title) // Only include cards with titles
    : [];

  // Map RelatedPartyTransactionsSection (PdfCard array) - for related party transactions
  const relatedPartyTransactions = Array.isArray(data?.RelatedPartyTransactionsSection)
    ? data.RelatedPartyTransactionsSection.map((card, index) => {
        // Handle Pdf field (uppercase) or pdf (lowercase)
        const pdf = card?.Pdf?.data?.attributes || card?.Pdf || card?.pdf?.data?.attributes || card?.pdf;
        const pdfUrl = pdf ? getStrapiMedia(pdf) : null;

        return {
          id: card?.id || index + 1,
          title: card?.Title || card?.title || '',
          pdfUrl: pdfUrl || '#',
          isActive: card?.isActive !== undefined ? card.isActive : false,
          publishedDate: card?.PublishedDate || card?.publishedDate || null
        };
      }).filter(card => card.title) // Only include cards with titles
    : [];

  return {
    revenueProfitability: revenueProfitabilityData,
    financialDocuments: financialDocuments,
    relatedPartyTransactions: relatedPartyTransactions
  };
}

/**
 * Fetch subsidiary data from Strapi
 * This is a Collection Type, so it returns an array of entries
 * 
 * @returns {Promise<Object>} Raw Strapi API response
 */
export async function getSubsidiary() {
  // Populate all nested components and media
  // Following the structure from the screenshot and same pattern as Financial API:
  // - TopBanner with DesktopImage and MobileImage
  // - Subsidiaries (Repeatable Component - SubsidiaryItem) with SubsidiaryName
  // - Documents (Repeatable Component - Subsidiary-yearly-document) nested inside Subsidiaries
  //   with FinancialYear, DocumentFilePdf, isActive, DisplayOrder
  // 
  // Following the same pattern as getFinancial() which successfully handles nested components
  const populateQuery = [
    'populate[TopBanner][populate][DesktopImage][populate]=*',
    'populate[TopBanner][populate][MobileImage][populate]=*',
    'populate[Subsidiaries][populate][Documents][populate][DocumentFilePdf][populate]=*'
  ].join('&');
  
  return fetchAPI(`subsidiary?${populateQuery}`, {
    next: { revalidate: 60 },
  });
}

/**
 * Map subsidiary data from Strapi
 * 
 * @param {Object} strapiData - Raw Strapi API response
 * @returns {Object} Mapped subsidiary data for component
 */
export function mapSubsidiaryData(strapiData) {
  // Handle Strapi v4 response structure (Single Type, not Collection Type)
  // Structure: data.Subsidiaries[] where each item has Documents[]
  const data = strapiData?.data || strapiData;

  // Debug logging
  if (process.env.NODE_ENV === 'development') {
    console.log('mapSubsidiaryData - Raw data:', {
      hasData: !!strapiData,
      hasDataObject: !!data,
      isArray: Array.isArray(data),
      keys: data ? Object.keys(data) : [],
      subsidiaries: data?.Subsidiaries || data?.subsidiaries
    });
  }

  // If no data, return empty array
  if (!data) {
    if (process.env.NODE_ENV === 'development') {
      console.log('mapSubsidiaryData - No data found');
    }
    return {
      subsidiaries: []
    };
  }

  // Get Subsidiaries array (Repeatable Component - SubsidiaryItem)
  // This is a Single Type, so Subsidiaries is directly on the data object
  const subsidiariesArray = data?.Subsidiaries || data?.subsidiaries || [];

  if (process.env.NODE_ENV === 'development') {
    console.log('mapSubsidiaryData - Subsidiaries array:', {
      length: subsidiariesArray.length,
      firstSubsidiary: subsidiariesArray[0]
    });
  }

  // Map each subsidiary item
  // Documents are nested inside each SubsidiaryItem
  const subsidiaries = subsidiariesArray.map((subsidiaryItem, index) => {
    const subsidiaryName = subsidiaryItem?.SubsidiaryName || subsidiaryItem?.subsidiaryName || '';
    
    // Get Documents from subsidiary item (nested inside each SubsidiaryItem)
    const documentsArray = subsidiaryItem?.Documents || subsidiaryItem?.documents || [];
    
    if (process.env.NODE_ENV === 'development' && index === 0) {
      console.log('mapSubsidiaryData - First subsidiary mapping:', {
        name: subsidiaryName,
        documentsCount: documentsArray.length,
        firstDocument: documentsArray[0]
      });
    }
    
    // Map documents to years format
    const years = Array.isArray(documentsArray)
      ? documentsArray
          .filter(doc => doc?.isActive !== false) // Only active documents (isActive !== false)
          .map((doc) => {
            const financialYear = doc?.FinancialYear || doc?.financialYear || '';
            const documentPdf = doc?.DocumentFilePdf?.data?.attributes || doc?.DocumentFilePdf || doc?.documentFilePdf?.data?.attributes || doc?.documentFilePdf;
            const pdfUrl = documentPdf ? getStrapiMedia(documentPdf) : '#';
            const displayOrder = doc?.DisplayOrder || doc?.displayOrder || '';
            
            return {
              year: financialYear || displayOrder || '',
              url: pdfUrl,
              isActive: doc?.isActive !== false
            };
          })
          .filter(year => year.year) // Filter out empty years
          .sort((a, b) => {
            // Sort by year (descending - most recent first)
            return b.year.localeCompare(a.year);
          })
      : [];
    
    return {
      id: subsidiaryItem?.id || index + 1,
      name: subsidiaryName,
      years: years
    };
  }).filter(subsidiary => subsidiary.name); // Only include subsidiaries with name (years can be empty)

  if (process.env.NODE_ENV === 'development') {
    console.log('mapSubsidiaryData - Mapped result:', {
      subsidiariesCount: subsidiaries.length,
      firstSubsidiary: subsidiaries[0]
    });
  }

  return {
    subsidiaries: subsidiaries
  };
}

/**
 * Fetch employee-stock-option-scheme data from Strapi
 * This is a Single Type, so it returns one entry
 * 
 * @returns {Promise<Object>} Raw Strapi API response
 */
export async function getEmployeeStockOptionScheme() {
  // Populate all nested components and media
  // Following the structure from the screenshot and same pattern as other Single Types:
  // - TopBanner with DesktopImage and MobileImage
  // - EmployeeStockOptionSchemesSection (Repeatable Component - PdfCard) with Title, PublishedDate, Pdf, isActive
  const populateQuery = [
    'populate[TopBanner][populate][DesktopImage][populate]=*',
    'populate[TopBanner][populate][MobileImage][populate]=*',
    'populate[EmployeeStockOptionSchemesSection][populate][Pdf][populate]=*'
  ].join('&');
  
  return fetchAPI(`employee-stock-option-scheme?${populateQuery}`, {
    next: { revalidate: 60 },
  });
}

/**
 * Map employee stock option scheme data from Strapi
 * 
 * @param {Object} strapiData - Raw Strapi API response
 * @returns {Object} Mapped employee stock option scheme data for component
 */
export function mapEmployeeStockOptionSchemeData(strapiData) {
  // Handle Strapi v4 response structure (Single Type) with chaining and fallbacks
  const data = strapiData?.data || strapiData;

  // If no data, return empty array
  if (!data) {
    return {
      schemes: []
    };
  }

  // Get EmployeeStockOptionSchemesSection array (Repeatable Component - PdfCard)
  const schemesArray = data?.EmployeeStockOptionSchemesSection || data?.employeeStockOptionSchemesSection || [];

  // Map schemes array to component format
  const schemes = schemesArray
    .filter(scheme => scheme?.isActive !== false) // Only active schemes
    .map((scheme, index) => {
      // Handle Pdf field (uppercase) or pdf (lowercase)
      const pdf = scheme?.Pdf?.data?.attributes || scheme?.Pdf || scheme?.pdf?.data?.attributes || scheme?.pdf;
      const pdfUrl = pdf ? getStrapiMedia(pdf) : '#';

      return {
        id: scheme?.id || index + 1,
        title: scheme?.Title || scheme?.title || '',
        pdfUrl: pdfUrl,
        isActive: scheme?.isActive !== false
      };
    })
    .filter(scheme => scheme.title); // Only include schemes with titles

  return {
    schemes: schemes
  };
}

/**
 * Fetch investor-regulation-disclosure data from Strapi
 * This is a Single Type, so it returns one entry
 * 
 * @returns {Promise<Object>} Raw Strapi API response
 */
export async function getInvestorRegulationDisclosure() {
  // Populate all nested components and media
  // Following the structure:
  // - TopBanner with DesktopImage and MobileImage
  // - RegulationDisclosureSection (Repeatable Component - RegulationDisclosureItem) with:
  //   - Particular (Rich text)
  //   - Documents (Repeatable Component - DisclosureDocumentLink) with Label, DocumentFile, Url, isActive
  //   - isActive (Boolean)
  const populateQuery = [
    'populate[TopBanner][populate][DesktopImage][populate]=*',
    'populate[TopBanner][populate][MobileImage][populate]=*',
    'populate[RegulationDisclosureSection][populate][Documents][populate][DocumentFile][populate]=*'
  ].join('&');
  
  return fetchAPI(`investor-regulation-disclosure?${populateQuery}`, {
    next: { revalidate: 60 },
  });
}

/**
 * Map investor regulation disclosure data from Strapi
 * 
 * @param {Object} strapiData - Raw Strapi API response
 * @returns {Object} Mapped investor regulation disclosure data for component
 */
export function mapInvestorRegulationDisclosureData(strapiData) {
  // Handle Strapi v4 response structure (Single Type) with chaining and fallbacks
  const data = strapiData?.data || strapiData;

  // If no data, return empty array
  if (!data) {
    return {
      items: []
    };
  }

  // Get RegulationDisclosureSection array (Repeatable Component - RegulationDisclosureItem)
  const sectionsArray = data?.RegulationDisclosureSection || data?.regulationDisclosureSection || [];

  // Map sections to items
  // One row per section (Particular), using the first active document's URL or DocumentFile
  let itemNumber = 1;
  const items = [];

  sectionsArray
    .filter(section => section?.isActive !== false) // Only active sections
    .forEach((section) => {
      const particular = section?.Particular || section?.particular || '';
      const documentsArray = section?.Documents || section?.documents || [];

      if (!particular) {
        return; // Skip sections without particular text
      }

      // Find the first active document
      const activeDocuments = documentsArray.filter(doc => doc?.isActive !== false);
      let url = '#';
      let label = null;

      if (activeDocuments.length > 0) {
        // Use the first active document
        const firstDoc = activeDocuments[0];
        
        // Get Label if available
        label = firstDoc?.Label || firstDoc?.label || null;
        
        // Priority: Url first, then DocumentFile
        if (firstDoc?.Url || firstDoc?.url) {
          url = firstDoc?.Url || firstDoc?.url;
        } else if (firstDoc?.DocumentFile) {
          // Extract DocumentFile URL
          const documentFile = firstDoc?.DocumentFile?.data?.attributes || firstDoc?.DocumentFile || firstDoc?.documentFile?.data?.attributes || firstDoc?.documentFile;
          url = documentFile ? getStrapiMedia(documentFile) : '#';
        }
      }

      items.push({
        id: section?.id || itemNumber,
        number: String(itemNumber),
        particulars: particular,
        url: url,
        label: label // Store label for potential future use
      });
      itemNumber++;
    });

  return {
    items: items
  };
}

/**
 * Fetch dividend data from Strapi
 * This is a Single Type, so it returns one entry
 * Note: API endpoint is "divedend" (typo in Strapi)
 * 
 * @returns {Promise<Object>} Raw Strapi API response
 */
export async function getDividend() {
  // Populate all nested components and media
  // Following the structure:
  // - TopBanner with DesktopImage and MobileImage
  // - DividendTdsCommunicationSection (Component - DividendTdsDocumentCard) with:
  //   - Heading, SubHeading, Description (Rich text)
  //   - PdfCard (Component - PdfCard) with Title, PublishedDate, Pdf, isActive
  // - DivedendHistorySection (Component - DividendHistorySection) with:
  //   - IntroText (Rich text), DivedendHistory (Rich text), isActive
  const populateQuery = [
    'populate[TopBanner][populate][DesktopImage][populate]=*',
    'populate[TopBanner][populate][MobileImage][populate]=*',
    'populate[DividendTdsCommunicationSection][populate][PdfCard][populate][Pdf][populate]=*',
    'populate[DivedendHistorySection][populate]=*'
  ].join('&');
  
  return fetchAPI(`divedend?${populateQuery}`, {
    next: { revalidate: 60 },
  });
}

/**
 * Map dividend data from Strapi
 * 
 * @param {Object} strapiData - Raw Strapi API response
 * @returns {Object} Mapped dividend data for components
 */
export function mapDividendData(strapiData) {
  // Handle Strapi v4 response structure (Single Type) with chaining and fallbacks
  const data = strapiData?.data || strapiData;

  // If no data, return empty structure
  if (!data) {
    return {
      tdsSection: null,
      historySection: null
    };
  }

  // Map DividendTdsCommunicationSection
  const tdsSection = data?.DividendTdsCommunicationSection || data?.dividendTdsCommunicationSection;
  let mappedTdsSection = null;
  
  if (tdsSection && tdsSection?.isActive !== false) {
    const pdfCard = tdsSection?.PdfCard || tdsSection?.pdfCard;
    const pdf = pdfCard?.Pdf?.data?.attributes || pdfCard?.Pdf || pdfCard?.pdf?.data?.attributes || pdfCard?.pdf;
    const pdfUrl = pdf ? getStrapiMedia(pdf) : '#';

    mappedTdsSection = {
      heading: tdsSection?.Heading || tdsSection?.heading || '',
      subHeading: tdsSection?.SubHeading || tdsSection?.subHeading || '',
      description: tdsSection?.Description || tdsSection?.description || '',
      pdfCard: pdfCard ? {
        title: pdfCard?.Title || pdfCard?.title || '',
        publishedDate: pdfCard?.PublishedDate || pdfCard?.publishedDate || '',
        pdfUrl: pdfUrl,
        isActive: pdfCard?.isActive !== false
      } : null
    };
  }

  // Map DivedendHistorySection
  const historySection = data?.DivedendHistorySection || data?.divedendHistorySection;
  let mappedHistorySection = null;
  
  if (historySection && historySection?.isActive !== false) {
    mappedHistorySection = {
      introText: historySection?.IntroText || historySection?.introText || '',
      dividendHistory: historySection?.DivedendHistory || historySection?.divedendHistory || ''
    };
  }

  return {
    tdsSection: mappedTdsSection,
    historySection: mappedHistorySection
  };
}

/**
 * Convert JSON table data to HTML table format
 * Used as fallback for dividend history table
 * 
 * @param {Object} tableData - Table data with headers and rows
 * @returns {string} HTML table string
 */
export function convertTableDataToHTML(tableData) {
  if (!tableData || !tableData.headers || !tableData.rows) {
    return '';
  }

  const { headers, rows } = tableData;

  // Build HTML table
  let html = '<div class="policies__voting-table-wrapper">';
  
  // Header row
  html += '<div class="policies__voting-table-header">';
  headers.forEach((header, index) => {
    const bgColor = header.bgColor || '#08a03f';
    const textColor = header.textColor || '#ffffff';
    const padding = header.padding || '17px';
    const largePaddingClass = index === 1 ? 'policies__voting-table-header-cell--large-padding' : '';
    
    html += `<div class="policies__voting-table-header-cell ${largePaddingClass}" style="background-color: ${bgColor}; color: ${textColor}; padding: ${padding};">`;
    html += `<p>${header.text || ''}</p>`;
    html += '</div>';
  });
  html += '</div>';

  // Data rows
  html += '<div class="policies__voting-table-rows">';
  rows.forEach((row) => {
    html += '<div class="policies__voting-table-row">';
    headers.forEach((header) => {
      const cellValue = row[header.text] || '';
      html += `<p class="policies__voting-table-cell">${cellValue}</p>`;
    });
    html += '</div>';
  });
  html += '</div>';

  html += '</div>';

  return html;
}

/**
 * Get fallback dividend history table data
 * Used when API data is not available
 * 
 * @returns {Object} Fallback table data
 */
export function getFallbackDividendHistoryTable() {
  return {
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
  };
}

/**
 * Fetch notice data from Strapi
 * This is a Single Type, so it returns one entry
 * 
 * @returns {Promise<Object>} Raw Strapi API response
 */
export async function getNotice() {
  // Populate all nested components and media
  // Following the structure:
  // - TopBanner with DesktopImage and MobileImage
  // - NoticeSection (Repeatable Component - NoticeCard) with:
  //   - FinancialLabel (Text)
  //   - Documents (Repeatable Component - NoticeDocument) with:
  //     - LanguageLabel (Text)
  //     - DocumentFile (Media)
  //     - isDefault (Boolean)
  //     - DisplayOrder (Text)
  //   - isActive (Boolean)
  //   - DisplayOrder (Text)
  const populateQuery = [
    'populate[TopBanner][populate][DesktopImage][populate]=*',
    'populate[TopBanner][populate][MobileImage][populate]=*',
    'populate[NoticeSection][populate][Documents][populate][DocumentFile][populate]=*'
  ].join('&');
  
  return fetchAPI(`notice?${populateQuery}`, {
    next: { revalidate: 60 },
  });
}

/**
 * Map notice data from Strapi
 * 
 * @param {Object} strapiData - Raw Strapi API response
 * @returns {Object} Mapped notice data for component
 */
export function mapNoticeData(strapiData) {
  // Handle Strapi v4 response structure (Single Type) with chaining and fallbacks
  const data = strapiData?.data || strapiData;

  // If no data, return empty array
  if (!data) {
    return {
      notices: []
    };
  }

  // Get NoticeSection array (Repeatable Component - NoticeCard)
  const noticeSectionsArray = data?.NoticeSection || data?.noticeSection || [];

  // Map notice sections to component format
  const notices = noticeSectionsArray
    .filter(section => section?.isActive !== false) // Only active sections
    .map((section, index) => {
      const financialLabel = section?.FinancialLabel || section?.financialLabel || '';
      const documentsArray = section?.Documents || section?.documents || [];

      // Find English and Marathi documents
      let englishDoc = null;
      let marathiDoc = null;
      let defaultDoc = null;

      documentsArray.forEach((doc) => {
        const languageLabel = (doc?.LanguageLabel || doc?.languageLabel || '').toLowerCase();
        
        // Check if it's the default document
        if (doc?.isDefault === true) {
          defaultDoc = doc;
        }
        
        // Find by language label
        if (languageLabel.includes('english') || languageLabel.includes('en')) {
          englishDoc = doc;
        } else if (languageLabel.includes('marathi') || languageLabel.includes('mr')) {
          marathiDoc = doc;
        }
      });

      // Use default doc if no language-specific doc found
      if (!englishDoc && defaultDoc) {
        englishDoc = defaultDoc;
      }
      if (!marathiDoc && defaultDoc && documentsArray.length > 1) {
        // Only use default for marathi if there are multiple documents
        marathiDoc = documentsArray.find(d => d !== englishDoc) || defaultDoc;
      }

      // Get document URLs
      const getDocumentUrl = (doc) => {
        if (!doc) return '#';
        const documentFile = doc?.DocumentFile?.data?.attributes || doc?.DocumentFile || doc?.documentFile?.data?.attributes || doc?.documentFile;
        return documentFile ? getStrapiMedia(documentFile) : '#';
      };

      const englishUrl = getDocumentUrl(englishDoc);
      const marathiUrl = getDocumentUrl(marathiDoc);
      const pdfUrl = englishUrl !== '#' ? englishUrl : (defaultDoc ? getDocumentUrl(defaultDoc) : '#');

      return {
        id: section?.id || index + 1,
        financialLabel: financialLabel,
        englishLink: englishUrl,
        marathiLink: marathiUrl,
        pdfUrl: pdfUrl,
        isActive: section?.isActive !== false && pdfUrl !== '#',
        displayOrder: section?.DisplayOrder || section?.displayOrder || String(index + 1)
      };
    })
    .filter(notice => notice.financialLabel) // Only include notices with financial label
    .sort((a, b) => {
      // Sort by DisplayOrder if available, otherwise maintain order
      const orderA = a.displayOrder || '999';
      const orderB = b.displayOrder || '999';
      return orderA.localeCompare(orderB);
    });

  return {
    notices: notices
  };
}

/**
 * Fetch other-statutory-information data from Strapi
 * This is a Single Type, so it returns one entry
 * 
 * @returns {Promise<Object>} Raw Strapi API response
 */
export async function getOtherStatutoryInformation() {
  // Populate all nested components and media
  // Following the structure:
  // - TopBanner with DesktopImage and MobileImage
  // - ExtraordinaryGeneralMeetingSection (Component) with SectionTitle and Documents (Repeatable PdfCard)
  // - EvotingSection (Component) with SectionTitle, Documents, Heading (Rich text), PdfCard
  // - DivendInfo (Repeatable Component: DividendHistorySection) with IntroText (Rich text), DividendHistory (Rich text), isActive
  // - NoticeSection (Rich text)
  // - PdfSection (Repeatable Component - PdfCard)
  // - KycUpdateSection (Repeatable Component) with SectionTitle and Documents
  const populateQuery = [
    'populate[TopBanner][populate][DesktopImage][populate]=*',
    'populate[TopBanner][populate][MobileImage][populate]=*',
    'populate[ExtraordinaryGeneralMeetingSection][populate][Documents][populate][Pdf][populate]=*',
    'populate[EvotingSection][populate][Documents][populate][Pdf][populate]=*',
    'populate[EvotingSection][populate][PdfCard][populate][Pdf][populate]=*',
    'populate[KycUpdateSection][populate][Documents][populate][Pdf][populate]=*'
  ].join('&');
  
  return fetchAPI(`other-statutory-information?${populateQuery}`, {
    next: { revalidate: 60 },
  });
}

/**
 * Map other statutory information data from Strapi
 * 
 * @param {Object} strapiData - Raw Strapi API response
 * @returns {Object} Mapped other statutory information data for components
 */
export function mapOtherStatutoryInformationData(strapiData) {
  // Handle Strapi v4 response structure (Single Type) with chaining and fallbacks
  const data = strapiData?.data || strapiData;

  // If no data, return empty structure
  if (!data) {
    return {
      egmSection: null,
      evotingSection: null,
      dividendInfo: null,
      noticeSection: null,
      pdfSection: null,
      kycSection: null
    };
  }

  // Map ExtraordinaryGeneralMeetingSection
  const egmSection = data?.ExtraordinaryGeneralMeetingSection || data?.extraordinaryGeneralMeetingSection;
  let mappedEgmSection = null;
  
  if (egmSection) {
    const documentsArray = egmSection?.Documents || egmSection?.documents || [];
    const cards = documentsArray
      .filter(doc => doc?.isActive !== false)
      .map((doc, index) => {
        const pdf = doc?.Pdf?.data?.attributes || doc?.Pdf || doc?.pdf?.data?.attributes || doc?.pdf;
        const pdfUrl = pdf ? getStrapiMedia(pdf) : '#';
        
        return {
          id: doc?.id || index + 1,
          title: doc?.Title || doc?.title || '',
          pdfUrl: pdfUrl,
          isActive: doc?.isActive !== false && pdfUrl !== '#'
        };
      })
      .filter(card => card.title);

    mappedEgmSection = {
      title: egmSection?.SectionTitle || egmSection?.sectionTitle || 'Extraordinary General Meeting (EGM)',
      cards: cards
    };
  }

  // Map EvotingSection
  const evotingSection = data?.EvotingSection || data?.evotingSection;
  let mappedEvotingSection = null;
  
  if (evotingSection) {
    const documentsArray = evotingSection?.Documents || evotingSection?.documents || [];
    const cards = documentsArray
      .filter(doc => doc?.isActive !== false)
      .map((doc, index) => {
        const pdf = doc?.Pdf?.data?.attributes || doc?.Pdf || doc?.pdf?.data?.attributes || doc?.pdf;
        const pdfUrl = pdf ? getStrapiMedia(pdf) : '#';
        
        return {
          id: doc?.id || index + 1,
          title: doc?.Title || doc?.title || '',
          pdfUrl: pdfUrl,
          isActive: doc?.isActive !== false && pdfUrl !== '#'
        };
      })
      .filter(card => card.title);

    // Get PdfCard (Component)
    const pdfCard = evotingSection?.PdfCard || evotingSection?.pdfCard;
    let mappedPdfCard = null;
    if (pdfCard) {
      const pdf = pdfCard?.Pdf?.data?.attributes || pdfCard?.Pdf || pdfCard?.pdf?.data?.attributes || pdfCard?.pdf;
      const pdfUrl = pdf ? getStrapiMedia(pdf) : '#';
      mappedPdfCard = {
        title: pdfCard?.Title || pdfCard?.title || '',
        pdfUrl: pdfUrl,
        isActive: pdfCard?.isActive !== false && pdfUrl !== '#'
      };
    }

    mappedEvotingSection = {
      title: evotingSection?.SectionTitle || evotingSection?.sectionTitle || 'Declaration of Results of E-voting',
      cards: cards,
      heading: evotingSection?.Heading || evotingSection?.heading || '',
      pdfCard: mappedPdfCard
    };
  }

  // Map DivendInfo (Repeatable Component: DividendHistorySection)
  // Try multiple field name variations as Strapi field names can vary
  const dividendInfoArray = data?.DivendInfo 
    || data?.divendInfo 
    || data?.DividendInfo 
    || data?.dividendInfo
    || data?.DivedendInfo
    || data?.divedendInfo
    || [];
  const mappedDividendInfo = dividendInfoArray
    .filter(info => info?.isActive !== false)
    .map((info, index) => ({
      id: info?.id || index + 1,
      introText: info?.IntroText || info?.introText || '',
      dividendHistory: info?.DividendHistory || info?.dividendHistory || ''
    }));

  // Map NoticeSection (Rich text)
  const noticeSection = data?.NoticeSection || data?.noticeSection || '';

  // Map PdfSection (Repeatable Component - PdfCard)
  // Try multiple field name variations as Strapi field names can vary
  const pdfSectionArray = data?.PdfSection 
    || data?.pdfSection 
    || data?.PdfSections
    || data?.pdfSections
    || [];
  const mappedPdfSection = pdfSectionArray
    .filter(pdf => pdf?.isActive !== false)
    .map((pdf, index) => {
      const pdfFile = pdf?.Pdf?.data?.attributes || pdf?.Pdf || pdf?.pdf?.data?.attributes || pdf?.pdf;
      const pdfUrl = pdfFile ? getStrapiMedia(pdfFile) : '#';
      
      return {
        id: pdf?.id || index + 1,
        title: pdf?.Title || pdf?.title || '',
        pdfUrl: pdfUrl,
        isActive: pdf?.isActive !== false && pdfUrl !== '#'
      };
    })
    .filter(pdf => pdf.title);

  // Map KycUpdateSection (Repeatable Component)
  const kycSectionArray = data?.KycUpdateSection || data?.kycUpdateSection || [];
  const mappedKycSection = kycSectionArray
    .filter(section => section?.isActive !== false)
    .map((section, index) => {
      const documentsArray = section?.Documents || section?.documents || [];
      const cards = documentsArray
        .filter(doc => doc?.isActive !== false)
        .map((doc, docIndex) => {
          const pdf = doc?.Pdf?.data?.attributes || doc?.Pdf || doc?.pdf?.data?.attributes || doc?.pdf;
          const pdfUrl = pdf ? getStrapiMedia(pdf) : '#';
          
          return {
            id: doc?.id || docIndex + 1,
            title: doc?.Title || doc?.title || '',
            pdfUrl: pdfUrl,
            isActive: doc?.isActive !== false && pdfUrl !== '#'
          };
        })
        .filter(card => card.title);

      return {
        id: section?.id || index + 1,
        title: section?.SectionTitle || section?.sectionTitle || '',
        cards: cards
      };
    })
    .filter(section => section.title);

  return {
    egmSection: mappedEgmSection,
    evotingSection: mappedEvotingSection,
    dividendInfo: mappedDividendInfo.length > 0 ? mappedDividendInfo : null,
    noticeSection: noticeSection || null,
    pdfSection: mappedPdfSection.length > 0 ? mappedPdfSection : null,
    kycSection: mappedKycSection.length > 0 ? mappedKycSection : null
  };
}

/**
 * Fetch news-and-event data from Strapi
 * This is a Single Type, so it returns one entry
 * 
 * @returns {Promise<Object>} Raw Strapi API response
 */
export async function getNewsAndEvent() {
  // Populate all nested components and media
  // Following the structure:
  // - TopBanner with DesktopImage and MobileImage
  // - AnnualGeneralMeetingSection (Repeatable Component - AgmEventCard) with:
  //   - MeetingTitle, MeetingDate, VideoFile, VideoUrl, Pdf, isActive, DisplayOrder
  // - EventSection (Repeatable Component - EventCard) with:
  //   - EventTitle, Eventdate, isActive, DisplayOrder
  // - PresentationSection (Repeatable Component - PdfCard) with:
  //   - Title, PublishedDate, Pdf, isActive
  const populateQuery = [
    'populate[TopBanner][populate][DesktopImage][populate]=*',
    'populate[TopBanner][populate][MobileImage][populate]=*',
    'populate[AnnualGeneralMeetingSection][populate][VideoFile][populate]=*',
    'populate[AnnualGeneralMeetingSection][populate][VideoUrl][populate]=*',
    'populate[AnnualGeneralMeetingSection][populate][Pdf][populate]=*',
    'populate[EventSection][populate]=*',
    'populate[PresentationSection][populate][Pdf][populate]=*'
  ].join('&');
  
  return fetchAPI(`news-and-event?${populateQuery}`, {
    next: { revalidate: 60 },
  });
}

/**
 * Map news and event data from Strapi
 * 
 * @param {Object} strapiData - Raw Strapi API response
 * @returns {Object} Mapped news and event data for components
 */
export function mapNewsAndEventData(strapiData) {
  // Handle Strapi v4 response structure (Single Type) with chaining and fallbacks
  const data = strapiData?.data || strapiData;

  // If no data, return empty structure
  if (!data) {
    return {
      meetingVideoSection: null,
      eventsSection: null,
      presentationsSection: null
    };
  }

  // Map AnnualGeneralMeetingSection (Repeatable Component - AgmEventCard) -> MeetingVideo
  const agmSectionsArray = data?.AnnualGeneralMeetingSection || data?.annualGeneralMeetingSection || [];
  const mappedMeetingVideos = agmSectionsArray
    .filter(section => section?.isActive !== false)
    .map((section, index) => {
      // Get video URL - VideoUrl might be Media or Text field, VideoFile is Media
      let videoUrlString = '';
      
      // Try VideoUrl as text first (URL string)
      if (typeof section?.VideoUrl === 'string') {
        videoUrlString = section.VideoUrl;
      } else {
        // Try VideoUrl as Media
        const videoUrlMedia = section?.VideoUrl?.data?.attributes || section?.VideoUrl || section?.videoUrl?.data?.attributes || section?.videoUrl;
        if (videoUrlMedia && videoUrlMedia.url) {
          videoUrlString = getStrapiMedia(videoUrlMedia);
        } else {
          // Fallback to VideoFile (Media)
          const videoFile = section?.VideoFile?.data?.attributes || section?.VideoFile || section?.videoFile?.data?.attributes || section?.videoFile;
          videoUrlString = videoFile ? getStrapiMedia(videoFile) : '';
        }
      }
      
      // Get PDF for transcript
      const pdf = section?.Pdf?.data?.attributes || section?.Pdf || section?.pdf?.data?.attributes || section?.pdf;
      const pdfUrl = pdf ? getStrapiMedia(pdf) : '#';

      // Format meeting date
      const meetingDate = section?.MeetingDate || section?.meetingDate || '';
      const formattedDate = meetingDate ? new Date(meetingDate).toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }) : '';

      // Get thumbnail from video file if available
      const videoFile = section?.VideoFile?.data?.attributes || section?.VideoFile || section?.videoFile?.data?.attributes || section?.videoFile;
      const thumbnail = videoFile?.formats?.thumbnail?.url 
        ? getStrapiMedia(videoFile.formats.thumbnail) 
        : (videoFile?.url ? getStrapiMedia(videoFile) : null);

      return {
        id: section?.id || index + 1,
        title: section?.MeetingTitle || section?.meetingTitle || '',
        date: formattedDate,
        videoUrl: videoUrlString,
        thumbnail: thumbnail,
        transcriptLink: pdfUrl !== '#' ? {
          text: `${section?.MeetingTitle || section?.meetingTitle || 'Meeting'} Transcript`,
          href: pdfUrl
        } : null,
        displayOrder: section?.DisplayOrder || section?.displayOrder || String(index + 1)
      };
    })
    .filter(video => video.title && video.videoUrl)
    .sort((a, b) => {
      // Sort by DisplayOrder if available
      const orderA = a.displayOrder || '999';
      const orderB = b.displayOrder || '999';
      return orderB.localeCompare(orderA); // Most recent first
    });

  const meetingVideoSection = mappedMeetingVideos.length > 0 ? {
    title: "Annual General Meeting",
    videos: mappedMeetingVideos
  } : null;

  // Map EventSection (Repeatable Component - EventCard) -> Events
  const eventsArray = data?.EventSection || data?.eventSection || [];
  const mappedEvents = eventsArray
    .filter(event => event?.isActive !== false)
    .map((event, index) => {
      // Format event date
      const eventDate = event?.Eventdate || event?.eventdate || event?.EventDate || event?.eventDate || '';
      const formattedDate = eventDate ? new Date(eventDate).toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }) : '';

      // Alternate variant (dark/light) based on index
      const variant = index % 2 === 0 ? 'dark' : 'light';

      return {
        id: event?.id || index + 1,
        date: formattedDate,
        title: event?.EventTitle || event?.eventTitle || '',
        href: '#', // Events might not have links, or could be added later
        variant: variant,
        displayOrder: event?.DisplayOrder || event?.displayOrder || String(index + 1)
      };
    })
    .filter(event => event.title)
    .sort((a, b) => {
      // Sort by DisplayOrder if available
      const orderA = a.displayOrder || '999';
      const orderB = b.displayOrder || '999';
      return orderB.localeCompare(orderA); // Most recent first
    });

  const eventsSection = mappedEvents.length > 0 ? {
    title: "Events",
    events: mappedEvents
  } : null;

  // Map PresentationSection (Repeatable Component - PdfCard) -> Presentations
  const presentationsArray = data?.PresentationSection || data?.presentationSection || [];
  const mappedPresentations = presentationsArray
    .filter(presentation => presentation?.isActive !== false)
    .map((presentation, index) => {
      const pdf = presentation?.Pdf?.data?.attributes || presentation?.Pdf || presentation?.pdf?.data?.attributes || presentation?.pdf;
      const pdfUrl = pdf ? getStrapiMedia(pdf) : '#';

      return {
        id: presentation?.id || index + 1,
        title: presentation?.Title || presentation?.title || '',
        pdfUrl: pdfUrl,
        isActive: presentation?.isActive !== false && pdfUrl !== '#'
      };
    })
    .filter(presentation => presentation.title);

  const presentationsSection = mappedPresentations.length > 0 ? {
    title: "Presentations",
    presentations: mappedPresentations,
    images: {
      downloadButton: {
        active: "/assets/policies/download-button-active.svg",
        inactive: "/assets/policies/download-button-inactive.svg"
      },
      decorative: "/assets/egm/decorative.svg"
    }
  } : null;

  return {
    meetingVideoSection: meetingVideoSection,
    eventsSection: eventsSection,
    presentationsSection: presentationsSection
  };
}

/**
 * Fetch saksham-niveshak data from Strapi
 * This is a Single Type, so it returns one entry
 * 
 * @returns {Promise<Object>} Raw Strapi API response
 */
export async function getSakshamNiveshak() {
  // Populate all nested components and media
  // Following the structure:
  // - TopBanner with DesktopImage and MobileImage
  // - Description (Rich text - Markdown)
  const populateQuery = [
    'populate[TopBanner][populate][DesktopImage][populate]=*',
    'populate[TopBanner][populate][MobileImage][populate]=*'
  ].join('&');
  
  return fetchAPI(`saksham-niveshak?${populateQuery}`, {
    next: { revalidate: 60 },
  });
}

/**
 * Map saksham niveshak data from Strapi
 * 
 * @param {Object} strapiData - Raw Strapi API response
 * @returns {Object} Mapped saksham niveshak data for component
 */
export function mapSakshamNiveshakData(strapiData) {
  // Handle Strapi v4 response structure (Single Type) with chaining and fallbacks
  const data = strapiData?.data || strapiData;

  // If no data, return empty structure
  if (!data) {
    return {
      description: null
    };
  }

  // Map Description (Rich text - Markdown)
  const description = data?.Description || data?.description || '';

  return {
    description: description || null
  };
}

/**
 * Fetch share-price data from Strapi
 * This is a Single Type, so it returns one entry
 * 
 * @returns {Promise<Object>} Raw Strapi API response
 */
export async function getSharePrice() {
  // Populate all nested components and media
  // Following the structure:
  // - TopBanner with DesktopImage and MobileImage
  // - SharePriceSection (Repeatable Component - SharePriceCard) with:
  //   - Heading (Text)
  //   - Content (Rich text - Markdown)
  //   - isActive (Boolean)
  const populateQuery = [
    'populate[TopBanner][populate][DesktopImage][populate]=*',
    'populate[TopBanner][populate][MobileImage][populate]=*',
    'populate[SharePriceSection][populate]=*'
  ].join('&');
  
  return fetchAPI(`share-price?${populateQuery}`, {
    next: { revalidate: 60 },
  });
}

/**
 * Map share price data from Strapi
 * 
 * @param {Object} strapiData - Raw Strapi API response
 * @returns {Object} Mapped share price data for component
 */
export function mapSharePriceData(strapiData) {
  // Handle Strapi v4 response structure (Single Type) with chaining and fallbacks
  const data = strapiData?.data || strapiData;

  // If no data, return empty structure
  if (!data) {
    return {
      sections: []
    };
  }

  // Map SharePriceSection (Repeatable Component - SharePriceCard)
  const sharePriceSectionsArray = data?.SharePriceSection || data?.sharePriceSection || [];
  const mappedSections = sharePriceSectionsArray
    .filter(section => section?.isActive !== false)
    .map((section, index) => ({
      id: section?.id || index + 1,
      heading: section?.Heading || section?.heading || '',
      content: section?.Content || section?.content || ''
    }))
    .filter(section => section.heading || section.content);

  // Map to component structure
  // First section -> shareCapital, Second section -> listingOfSecurities
  const shareCapital = mappedSections[0] ? {
    title: mappedSections[0].heading,
    content: mappedSections[0].content
  } : null;

  const listingOfSecurities = mappedSections[1] ? {
    title: mappedSections[1].heading,
    content: mappedSections[1].content
  } : null;

  return {
    shareCapital: shareCapital,
    listingOfSecurities: listingOfSecurities,
    sections: mappedSections // Keep all sections for potential future use
  };
}

/**
 * Fetch transfer-physical-share data from Strapi
 * This is a Single Type, so it returns one entry
 * 
 * @returns {Promise<Object>} Raw Strapi API response
 */
export async function getTransferPhysicalShare() {
  // Populate all nested components and media
  // Following the structure:
  // - TopBanner with DesktopImage and MobileImage
  // - Description (Rich text - Markdown)
  const populateQuery = [
    'populate[TopBanner][populate][DesktopImage][populate]=*',
    'populate[TopBanner][populate][MobileImage][populate]=*'
  ].join('&');
  
  return fetchAPI(`transfer-physical-share?${populateQuery}`, {
    next: { revalidate: 60 },
  });
}

/**
 * Map transfer physical share data from Strapi
 * 
 * @param {Object} strapiData - Raw Strapi API response
 * @returns {Object} Mapped transfer physical share data for component
 */
export function mapTransferPhysicalShareData(strapiData) {
  // Handle Strapi v4 response structure (Single Type) with chaining and fallbacks
  const data = strapiData?.data || strapiData;

  // If no data, return empty structure
  if (!data) {
    return {
      description: null
    };
  }

  // Map Description (Rich text - Markdown)
  const description = data?.Description || data?.description || '';

  return {
    description: description || null
  };
}

/**
 * Fetch unclaimed-dividend data from Strapi
 * This is a Single Type, so it returns one entry
 * 
 * @returns {Promise<Object>} Raw Strapi API response
 */
export async function getUnclaimedDividend() {
  // Populate all nested components and media
  // Following the structure:
  // - TopBanner with DesktopImage and MobileImage
  // - UnclaimedDivendSection (Component - UnclaimedDividendCard) with:
  //   - SectionTitle (Text)
  //   - DividendInfoSection (Rich text - Markdown)
  //   - DividendNotice (Rich text - Markdown)
  const populateQuery = [
    'populate[TopBanner][populate][DesktopImage][populate]=*',
    'populate[TopBanner][populate][MobileImage][populate]=*',
    'populate[UnclaimedDivendSection][populate]=*'
  ].join('&');
  
  return fetchAPI(`unclaimed-dividend?${populateQuery}`, {
    next: { revalidate: 60 },
  });
}

/**
 * Map unclaimed dividend data from Strapi
 * 
 * @param {Object} strapiData - Raw Strapi API response
 * @returns {Object} Mapped unclaimed dividend data for component
 */
export function mapUnclaimedDividendData(strapiData) {
  // Handle Strapi v4 response structure (Single Type) with chaining and fallbacks
  const data = strapiData?.data || strapiData;

  // If no data, return empty structure
  if (!data) {
    return {
      sectionTitle: null,
      dividendInfoSection: null,
      dividendNotice: null
    };
  }

  // Map UnclaimedDivendSection (Component - UnclaimedDividendCard)
  const section = data?.UnclaimedDivendSection || data?.unclaimedDivendSection || {};

  return {
    sectionTitle: section?.SectionTitle || section?.sectionTitle || null,
    dividendInfoSection: section?.DividendInfoSection || section?.dividendInfoSection || null,
    dividendNotice: section?.DividendNotice || section?.dividendNotice || null
  };
}

/**
 * Fetch shareholding-pattern data from Strapi
 * This is a Single Type, so it returns one entry
 * 
 * @returns {Promise<Object>} Raw Strapi API response
 */
export async function getShareholdingPattern() {
  // Populate all nested components and media
  // Following the structure:
  // - TopBanner with DesktopImage and MobileImage
  const populateQuery = [
    'populate[TopBanner][populate][DesktopImage][populate]=*',
    'populate[TopBanner][populate][MobileImage][populate]=*'
  ].join('&');
  
  return fetchAPI(`shareholding-pattern?${populateQuery}`, {
    next: { revalidate: 60 },
  });
}

/**
 * Map shareholding pattern data from Strapi
 * 
 * @param {Object} strapiData - Raw Strapi API response
 * @returns {Object} Mapped shareholding pattern data for component
 */
export function mapShareholdingPatternData(strapiData) {
  // Handle Strapi v4 response structure (Single Type) with chaining and fallbacks
  const data = strapiData?.data || strapiData;

  // If no data, return empty structure
  if (!data) {
    return {};
  }

  // This API only has TopBanner, no other fields to map
  // Iframe data is handled separately or kept as fallback
  return {};
}

/**
 * Fetch committee data from Strapi
 * This is a Single Type, so it returns one entry
 * 
 * @returns {Promise<Object>} Raw Strapi API response
 */
export async function getCommittee() {
  // Populate all nested components and media
  // Following the structure:
  // - TopBanner with DesktopImage and MobileImage
  const populateQuery = [
    'populate[TopBanner][populate][DesktopImage][populate]=*',
    'populate[TopBanner][populate][MobileImage][populate]=*'
  ].join('&');
  
  return fetchAPI(`committee?${populateQuery}`, {
    next: { revalidate: 60 },
  });
}

/**
 * Fetch leaders data from Strapi
 * This is a Collection Type, so it returns an array
 * 
 * @returns {Promise<Object>} Raw Strapi API response
 */
export async function getLeaders() {
  // Populate all nested components and media
  // Following the structure:
  // - LeaderName, ProfileImage, slug, Designation, LeadershipType, DetailDescription, EducationDetail
  // - Age, Nationality, Tenure, Appointed, CommitteeMembership, isActive, cta, Pdf, DisplayOrder
  const populateQuery = [
    'populate[ProfileImage][populate]=*',
    'populate[cta][populate]=*',
    'populate[Pdf][populate]=*',
    'filters[isActive][$eq]=true',
    'sort=DisplayOrder:asc'
  ].join('&');
  
  return fetchAPI(`leaders?${populateQuery}`, {
    next: { revalidate: 60 },
  });
}

/**
 * Map committee and leaders data from Strapi
 * Groups leaders by LeadershipType to form committees
 * 
 * @param {Object} leadersData - Raw Strapi API response for leaders
 * @returns {Object} Mapped committees data for component
 */
export function mapCommitteesData(leadersData) {
  // Handle Strapi v4 response structure (Collection Type)
  const leadersArray = leadersData?.data || leadersData || [];

  if (!Array.isArray(leadersArray) || leadersArray.length === 0) {
    return {
      committees: []
    };
  }

  // Group leaders by LeadershipType (which represents the committee)
  const committeesMap = new Map();

  leadersArray.forEach((leader) => {
    const leadershipType = leader?.LeadershipType || leader?.leadershipType || leader?.attributes?.LeadershipType || leader?.attributes?.leadershipType;
    
    if (!leadershipType) {
      return; // Skip leaders without a LeadershipType
    }

    // Get or create committee
    if (!committeesMap.has(leadershipType)) {
      committeesMap.set(leadershipType, {
        id: leadershipType,
        title: leadershipType, // Use LeadershipType as committee title
        members: []
      });
    }

    const committee = committeesMap.get(leadershipType);

    // Extract leader data
    const profileImage = leader?.ProfileImage?.data?.attributes || leader?.ProfileImage || leader?.attributes?.ProfileImage?.data?.attributes || leader?.attributes?.ProfileImage;
    const imageUrl = profileImage ? getStrapiMedia(profileImage) : null;

    const slug = leader?.slug || leader?.attributes?.slug || '';
    const leaderLink = slug ? `/leaders/${slug}` : '#';

    const member = {
      id: leader?.id || leader?.documentId || Math.random(),
      name: leader?.LeaderName || leader?.leaderName || leader?.attributes?.LeaderName || leader?.attributes?.leaderName || '',
      title: leader?.Designation || leader?.designation || leader?.attributes?.Designation || leader?.attributes?.designation || '',
      image: imageUrl ? {
        url: imageUrl,
        alt: leader?.LeaderName || leader?.leaderName || leader?.attributes?.LeaderName || leader?.attributes?.leaderName || ''
      } : null,
      link: leaderLink,
      displayOrder: leader?.DisplayOrder || leader?.displayOrder || leader?.attributes?.DisplayOrder || leader?.attributes?.displayOrder || '999'
    };

    // Only add if name exists
    if (member.name) {
      committee.members.push(member);
    }
  });

  // Convert map to array and sort members by DisplayOrder
  const committees = Array.from(committeesMap.values()).map(committee => ({
    ...committee,
    members: committee.members.sort((a, b) => {
      const orderA = a.displayOrder || '999';
      const orderB = b.displayOrder || '999';
      return orderA.localeCompare(orderB);
    })
  }));

  // Sort committees by title
  committees.sort((a, b) => a.title.localeCompare(b.title));

  return {
    committees: committees
  };
}

/**
 * Fetch investor page data from Strapi
 * This is a Single Type, so it returns one entry
 * 
 * @returns {Promise<Object>} Raw Strapi API response
 */
export async function getInvestor() {
  // Populate all nested components and media
  const populateQuery = [
    'populate[TopBanner][populate][DesktopImage][populate]=*',
    'populate[TopBanner][populate][MobileImage][populate]=*',
    'populate[CorporateGovernanceSection][populate][DesktopImage][populate]=*',
    'populate[CorporateGovernanceSection][populate][MobileImage][populate]=*',
    'populate[CorporateGovernanceSection][populate][Links][populate]=*',
    'populate[ShareholderInformationSection][populate][Image][populate]=*',
    'populate[ShareholderInformationSection][populate][ShareHolderInformation][populate][DocumentPdf][populate]=*',
    'populate[ShareholderInformationSection][populate][ShareHolderInformation][populate][cta][populate]=*',
    'populate[NewsSection][populate][items][populate][circleInner][populate]=*',
    'populate[NewsSection][populate][items][populate][cta][populate]=*',
    'populate[ReportsFilingSection][populate][FinancialHighLightCard][populate][DocumentFile][populate]=*',
    'populate[ReportsFilingSection][populate][FinancialHighLightCard][populate][cta][populate]=*',
    'populate[ReportsFilingSection][populate][IntegratedReport][populate][CoverImage][populate]=*',
    'populate[ReportsFilingSection][populate][IntegratedReport][populate][ReportFile][populate]=*',
    'populate[ReportsFilingSection][populate][NseExchangeSection][populate][PdfDocument][populate][Pdf][populate]=*'
  ].join('&');
  
  return fetchAPI(`investor?${populateQuery}`, {
    next: { revalidate: 60 },
  });
}

/**
 * Map investor page data from Strapi
 * 
 * @param {Object} strapiData - Raw Strapi API response
 * @returns {Object} Mapped investor data for components
 */
export function mapInvestorData(strapiData) {
  // Handle Strapi v4 response structure (Single Type)
  const data = strapiData?.data || strapiData;
  
  if (!data) {
    return {
      introductionSection: null,
      corporateGovernanceSection: null,
      shareholderInformationSection: null,
      newsSection: null,
      reportsFilingSection: null,
      nseExchangeSection: null
    };
  }

  // Map IntroductionSection (Rich text - Markdown)
  const introductionSection = data?.IntroductionSection || data?.introductionSection || null;

  // Map CorporateGovernanceSection
  const corporateGovernanceSection = data?.CorporateGovernanceSection || data?.corporateGovernanceSection;
  let mappedCorporateGovernance = null;
  if (corporateGovernanceSection) {
    const desktopImage = corporateGovernanceSection?.DesktopImage?.data?.attributes || corporateGovernanceSection?.DesktopImage || corporateGovernanceSection?.desktopImage;
    const mobileImage = corporateGovernanceSection?.MobileImage?.data?.attributes || corporateGovernanceSection?.MobileImage || corporateGovernanceSection?.mobileImage;
    const links = Array.isArray(corporateGovernanceSection?.Links) 
      ? corporateGovernanceSection.Links 
      : (Array.isArray(corporateGovernanceSection?.links) ? corporateGovernanceSection.links : []);

    mappedCorporateGovernance = {
      sectionTitle: corporateGovernanceSection?.SectionTitle || corporateGovernanceSection?.sectionTitle || null,
      desktopImage: desktopImage ? getStrapiMedia(desktopImage) : null,
      mobileImage: mobileImage ? getStrapiMedia(mobileImage) : null,
      links: links.map(link => ({
        text: link?.text || link?.Text || '',
        href: link?.href || link?.Href || '#'
      }))
    };
  }

  // Map ShareholderInformationSection
  const shareholderInformationSection = data?.ShareholderInformationSection || data?.shareholderInformationSection;
  let mappedShareholderInformation = null;
  if (shareholderInformationSection) {
    const centerImage = shareholderInformationSection?.Image?.data?.attributes || shareholderInformationSection?.Image || shareholderInformationSection?.image;
    const shareholderInfo = Array.isArray(shareholderInformationSection?.ShareHolderInformation)
      ? shareholderInformationSection.ShareHolderInformation
      : (Array.isArray(shareholderInformationSection?.shareHolderInformation) ? shareholderInformationSection.shareHolderInformation : []);

    // Filter by isActive and sort by DisplayOrder
    const filteredInfo = shareholderInfo
      .filter(item => item?.isActive !== false && item?.IsActive !== false)
      .sort((a, b) => {
        const orderA = a?.DisplayOrder || a?.displayOrder || '999';
        const orderB = b?.DisplayOrder || b?.displayOrder || '999';
        return orderA.localeCompare(orderB);
      })
      .map(item => {
        const documentPdf = item?.DocumentPdf?.data?.attributes || item?.DocumentPdf || item?.documentPdf;
        const cta = item?.cta || item?.Cta || {};
        const pdfUrl = documentPdf ? getStrapiMedia(documentPdf) : null;
        
        return {
          pdfTitle: item?.PdfTitle || item?.pdfTitle || '',
          documentPdf: pdfUrl,
          cta: {
            text: cta?.text || cta?.Text || '',
            href: cta?.href || cta?.Href || cta?.href || '#'
          }
        };
      });

    mappedShareholderInformation = {
      sectionTitle: shareholderInformationSection?.SectionTitle || shareholderInformationSection?.sectionTitle || null,
      image: centerImage ? getStrapiMedia(centerImage) : null,
      shareholderInformation: filteredInfo
    };
  }

  // Map NewsSection (but user said keep press release as is, so we might not use this)
  const newsSection = data?.NewsSection || data?.newsSection;
  let mappedNewsSection = null;
  if (newsSection) {
    const items = Array.isArray(newsSection?.items) ? newsSection.items : [];
    mappedNewsSection = {
      title: newsSection?.titile || newsSection?.title || null, // Note: typo in API field name "titile"
      items: items.map(item => {
        const circleInner = item?.circleInner?.data?.attributes || item?.circleInner || item?.CircleInner;
        const cta = item?.cta || item?.Cta || {};
        const imageUrl = circleInner ? getStrapiMedia(circleInner) : null;
        
        return {
          date: item?.date || item?.Date || '',
          headline: item?.headline || item?.Headline || '',
          image: imageUrl ? {
            url: imageUrl,
            alt: item?.headline || item?.Headline || ''
          } : null,
          href: cta?.href || cta?.Href || cta?.href || '#'
        };
      })
    };
  }

  // Map ReportsFilingSection
  const reportsFilingSection = data?.ReportsFilingSection || data?.reportsFilingSection;
  let mappedReportsFiling = null;
  if (reportsFilingSection) {
    const financialHighlightCard = reportsFilingSection?.FinancialHighLightCard || reportsFilingSection?.financialHighLightCard;
    const integratedReport = reportsFilingSection?.IntegratedReport || reportsFilingSection?.integratedReport;
    const nseExchangeSection = reportsFilingSection?.NseExchangeSection || reportsFilingSection?.nseExchangeSection;
    
    let mappedFinancialHighlight = null;
    if (financialHighlightCard && financialHighlightCard?.isActive !== false && financialHighlightCard?.IsActive !== false) {
      const documentFile = financialHighlightCard?.DocumentFile?.data?.attributes || financialHighlightCard?.DocumentFile || financialHighlightCard?.documentFile;
      const cta = financialHighlightCard?.cta || financialHighlightCard?.Cta || {};
      const pdfUrl = documentFile ? getStrapiMedia(documentFile) : null;
      
      mappedFinancialHighlight = {
        financialYear: financialHighlightCard?.FinancialYear || financialHighlightCard?.financialYear || '',
        grossProfit: financialHighlightCard?.GrossProfit || financialHighlightCard?.grossProfit || '',
        grossProfitMargin: financialHighlightCard?.GrossProfitMargin || financialHighlightCard?.grossProfitMargin || '',
        rndInvestment: financialHighlightCard?.RndInvestment || financialHighlightCard?.rndInvestment || '',
        documentFile: pdfUrl,
        viewAllUrl: financialHighlightCard?.ViewAllUrl || financialHighlightCard?.viewAllUrl || '#',
        cta: {
          text: cta?.text || cta?.Text || '',
          href: cta?.href || cta?.Href || cta?.href || '#'
        }
      };
    }

    let mappedIntegratedReport = null;
    if (integratedReport && integratedReport?.isActive !== false && integratedReport?.IsActive !== false) {
      const coverImage = integratedReport?.CoverImage?.data?.attributes || integratedReport?.CoverImage || integratedReport?.coverImage;
      const reportFile = integratedReport?.ReportFile?.data?.attributes || integratedReport?.ReportFile || integratedReport?.reportFile;
      const coverImageUrl = coverImage ? getStrapiMedia(coverImage) : null;
      const reportFileUrl = reportFile ? getStrapiMedia(reportFile) : null;
      
      mappedIntegratedReport = {
        reportTitle: integratedReport?.ReportTitle || integratedReport?.reportTitle || '',
        reportYear: integratedReport?.ReportYear || integratedReport?.reportYear || '',
        coverImage: coverImageUrl ? {
          url: coverImageUrl,
          alt: integratedReport?.ReportTitle || integratedReport?.reportTitle || ''
        } : null,
        reportFile: reportFileUrl,
        downloadLabel: integratedReport?.DownloadLabel || integratedReport?.downloadLabel || '',
        viewAllLabel: integratedReport?.ViewAllLabel || integratedReport?.viewAllLabel || '',
        viewAllUrl: integratedReport?.ViewAllUrl || integratedReport?.viewAllUrl || '#'
      };
    }

    // Map NseExchangeSection (nested inside ReportsFilingSection)
    let mappedNseExchange = null;
    if (nseExchangeSection) {
      const pdfDocuments = Array.isArray(nseExchangeSection?.PdfDocument)
        ? nseExchangeSection.PdfDocument
        : (Array.isArray(nseExchangeSection?.pdfDocument) ? nseExchangeSection.pdfDocument : []);

      // Filter by isActive and sort by PublishedDate
      const filteredPdfs = pdfDocuments
        .filter(item => item?.isActive !== false && item?.IsActive !== false)
        .sort((a, b) => {
          const dateA = a?.PublishedDate || a?.publishedDate || '';
          const dateB = b?.PublishedDate || b?.publishedDate || '';
          return new Date(dateB) - new Date(dateA); // Descending order (newest first)
        })
        .map(item => {
          const pdf = item?.Pdf?.data?.attributes || item?.Pdf || item?.pdf;
          const pdfUrl = pdf ? getStrapiMedia(pdf) : null;
          
          return {
            title: item?.Title || item?.title || '',
            publishedDate: item?.PublishedDate || item?.publishedDate || null,
            pdf: pdfUrl
          };
        });

      mappedNseExchange = {
        sectionTitle: nseExchangeSection?.SectionTitle || nseExchangeSection?.sectionTitle || null,
        pdfDocuments: filteredPdfs
      };
    }

    mappedReportsFiling = {
      financialHighlightCard: mappedFinancialHighlight,
      integratedReport: mappedIntegratedReport,
      nseExchangeSection: mappedNseExchange
    };
  }

  return {
    introductionSection: introductionSection,
    corporateGovernanceSection: mappedCorporateGovernance,
    shareholderInformationSection: mappedShareholderInformation,
    newsSection: mappedNewsSection,
    reportsFilingSection: mappedReportsFiling
  };
}


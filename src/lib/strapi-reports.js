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
  // Populate all nested components and media files including TopBanner
  const populateQuery = [
    'populate[TopBanner][populate][desktop_image][populate]=*',
    'populate[TopBanner][populate][mobile_image][populate]=*',
    'populate[QuarterlyResult][populate][pdfCard][populate][pdf][populate]=*',
    'populate[AnnualReport][populate][pdfCard][populate][pdf][populate]=*',
    'populate[AnnualReport][populate][image][populate]=*',
    'populate[AnnualReport][populate][pdf][populate]=*',
    'populate[AnnualReturns][populate][PdfCard][populate][pdf][populate]=*',
    'populate[BoardMeetingFiling][populate][pdfCard][populate][pdf][populate]=*',
    'populate[OthersFilings][populate][PdfCard][populate][pdf][populate]=*'
  ].join('&');

  return fetchAPI(`report-filing?${populateQuery}`, {
    next: { revalidate: 60 },
  });
}

/**
 * Map PDF component to standardized format
 * Handles both Pdfcomponent and PdfCard components
 * 
 * @param {Object} pdfCard - PDF card component from Strapi
 * @returns {Object|null} Mapped PDF card or null
 */
function mapPdfCard(pdfCard) {
  if (!pdfCard) return null;

  const pdf = pdfCard.pdf?.data?.attributes || pdfCard.pdf;
  const pdfUrl = pdf ? getStrapiMedia(pdf) : null;

  return {
    id: pdfCard.id,
    title: pdfCard.title || '',
    pdfUrl: pdfUrl,
    pdf: pdf ? {
      url: pdfUrl,
      name: pdf.name || '',
      size: pdf.size || 0,
      mime: pdf.mime || 'application/pdf',
      alternativeText: pdf.alternativeText || pdfCard.title || ''
    } : null,
    isActive: pdfCard.isActive !== undefined ? pdfCard.isActive : true,
    publishedDate: pdfCard.publishedDate || null,
    quarterLabel: pdfCard.quarterLabel || null,
    isAudited: pdfCard.isAudited !== undefined ? pdfCard.isAudited : false,
  };
}

/**
 * Map Quarterly Result data
 * 
 * @param {Object} quarterlyResult - Quarterly result from Strapi
 * @returns {Object} Mapped quarterly result
 */
function mapQuarterlyResult(quarterlyResult) {
  if (!quarterlyResult) return null;

  const pdfCards = Array.isArray(quarterlyResult.pdfCard)
    ? quarterlyResult.pdfCard.map(mapPdfCard).filter(Boolean)
    : [];

  return {
    id: quarterlyResult.id,
    quarterYear: quarterlyResult.QuarterYear || '',
    pdfCards: pdfCards,
  };
}

/**
 * Map Annual Report data
 * 
 * @param {Object} annualReport - Annual report from Strapi
 * @returns {Object} Mapped annual report
 */
function mapAnnualReport(annualReport) {
  if (!annualReport) return null;

  const image = annualReport.image?.data?.attributes || annualReport.image;
  const imageUrl = image ? getStrapiMedia(image) : null;
  
  const mainPdf = annualReport.pdf?.data?.attributes || annualReport.pdf;
  const mainPdfUrl = mainPdf ? getStrapiMedia(mainPdf) : null;

  const pdfCards = Array.isArray(annualReport.pdfCard)
    ? annualReport.pdfCard.map(mapPdfCard).filter(Boolean)
    : [];

  return {
    id: annualReport.id,
    tabYear: annualReport.TabYear || '',
    title: annualReport.title || '',
    micrositeUrl: annualReport.MicrositeUrl || null,
    image: imageUrl ? {
      url: imageUrl,
      alt: image.alternativeText || image.caption || annualReport.title || '',
      width: image.width,
      height: image.height
    } : null,
    mainPdf: mainPdfUrl ? {
      url: mainPdfUrl,
      name: mainPdf.name || '',
      size: mainPdf.size || 0,
      mime: mainPdf.mime || 'application/pdf'
    } : null,
    pdfCards: pdfCards,
    isActive: annualReport.isActive !== undefined ? annualReport.isActive : true,
    publishedDate: annualReport.publishedDate || null,
    quarterLabel: annualReport.quarterLabel || null,
    isAudited: annualReport.isAudited !== undefined ? annualReport.isAudited : false,
  };
}

/**
 * Map Annual Return data
 * 
 * @param {Object} annualReturn - Annual return from Strapi
 * @returns {Object} Mapped annual return
 */
function mapAnnualReturn(annualReturn) {
  if (!annualReturn) return null;

  const pdfCard = annualReturn.PdfCard ? mapPdfCard(annualReturn.PdfCard) : null;

  return {
    id: annualReturn.id,
    title: annualReturn.title || '',
    pdfCard: pdfCard,
    publishedDate: annualReturn.publishedDate || null,
    isActive: annualReturn.isActive !== undefined ? annualReturn.isActive : true,
  };
}

/**
 * Map Board Meeting Filing data
 * 
 * @param {Object} boardMeetingFiling - Board meeting filing from Strapi
 * @returns {Object} Mapped board meeting filing
 */
function mapBoardMeetingFiling(boardMeetingFiling) {
  if (!boardMeetingFiling) return null;

  const pdfCards = Array.isArray(boardMeetingFiling.pdfCard)
    ? boardMeetingFiling.pdfCard.map(mapPdfCard).filter(Boolean)
    : [];

  return {
    id: boardMeetingFiling.id,
    tabYear: boardMeetingFiling.TabYear || '',
    pdfCards: pdfCards,
  };
}

/**
 * Map Others Filing data
 * 
 * @param {Object} othersFiling - Others filing from Strapi
 * @returns {Object} Mapped others filing
 */
function mapOthersFiling(othersFiling) {
  if (!othersFiling) return null;

  const pdfCards = Array.isArray(othersFiling.PdfCard)
    ? othersFiling.PdfCard.map(mapPdfCard).filter(Boolean)
    : [];

  return {
    id: othersFiling.id,
    tabYear: othersFiling.TabYear || '',
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
  // Handle Strapi v4 response structure (Single Type)
  const data = strapiData?.data || strapiData;

  if (!data) {
    throw new Error('No data received from Strapi API. Check that the report-filing endpoint returns data.');
  }

  // Map TopBanner if available
  const topBanner = mapTopBannerData(data.TopBanner);

  // Map each section
  const quarterlyResults = Array.isArray(data.QuarterlyResult)
    ? data.QuarterlyResult.map(mapQuarterlyResult).filter(Boolean)
    : [];

  const annualReports = Array.isArray(data.AnnualReport)
    ? data.AnnualReport.map(mapAnnualReport).filter(Boolean)
    : [];

  const annualReturns = Array.isArray(data.AnnualReturns)
    ? data.AnnualReturns.map(mapAnnualReturn).filter(Boolean)
    : [];

  const boardMeetingFilings = Array.isArray(data.BoardMeetingFiling)
    ? data.BoardMeetingFiling.map(mapBoardMeetingFiling).filter(Boolean)
    : [];

  const othersFilings = Array.isArray(data.OthersFilings)
    ? data.OthersFilings.map(mapOthersFiling).filter(Boolean)
    : [];

  return {
    topBanner: topBanner,
    quarterlyResults: quarterlyResults,
    annualReports: annualReports,
    annualReturns: annualReturns,
    boardMeetingFilings: boardMeetingFilings,
    othersFilings: othersFilings,
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

  reportFilingData.quarterlyResults.forEach(result => {
    const year = result.quarterYear;
    if (!grouped[year]) {
      grouped[year] = [];
    }
    grouped[year].push(result);
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

  reportFilingData.annualReports.forEach(report => {
    const year = report.tabYear;
    if (!grouped[year]) {
      grouped[year] = [];
    }
    grouped[year].push(report);
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

  reportFilingData.boardMeetingFilings.forEach(filing => {
    const year = filing.tabYear;
    if (!grouped[year]) {
      grouped[year] = [];
    }
    grouped[year].push(filing);
  });

  return grouped;
}

/**
 * Get others filings grouped by year
 * 
 * @param {Object} reportFilingData - Mapped report filing data
 * @returns {Object} Others filings grouped by year
 */
export function getOthersFilingsGrouped(reportFilingData) {
  const grouped = {};

  reportFilingData.othersFilings.forEach(filing => {
    const year = filing.tabYear;
    if (!grouped[year]) {
      grouped[year] = [];
    }
    grouped[year].push(filing);
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
  return reportFilingData.annualReturns.filter(
    returnItem => returnItem.isActive !== false
  );
}

/**
 * Get active quarterly results only
 * 
 * @param {Object} reportFilingData - Mapped report filing data
 * @returns {Array} Active quarterly results
 */
export function getActiveQuarterlyResults(reportFilingData) {
  return reportFilingData.quarterlyResults.filter(
    result => result.pdfCards.some(card => card.isActive !== false)
  );
}

/**
 * Get active annual reports only
 * 
 * @param {Object} reportFilingData - Mapped report filing data
 * @returns {Array} Active annual reports
 */
export function getActiveAnnualReports(reportFilingData) {
  return reportFilingData.annualReports.filter(
    report => report.isActive !== false
  );
}

/**
 * Transform quarterly results for QuarterlyResultsWithTabs component
 * 
 * @param {Object} reportFilingData - Mapped report filing data
 * @returns {Object} Formatted data for QuarterlyResultsWithTabs
 */
export function transformQuarterlyResultsForComponent(reportFilingData) {
  const grouped = getQuarterlyResultsGrouped(reportFilingData);
  const tabs = Object.keys(grouped).sort().reverse(); // Most recent first
  
  // Get the first year's data (most recent)
  const firstYear = tabs[0];
  const firstYearData = grouped[firstYear] || [];
  
  // Extract quarterly items and cards from pdfCards
  // Group pdfCards by quarterLabel to identify Q1, Q2, etc.
  const quarterlyItems = [];
  const cards = [];
  const quarterlyItemsAfterCards = [];
  const cardsAfterQ2 = [];
  
  if (firstYearData.length > 0) {
    // Process all pdfCards and group them by quarter
    const cardsByQuarter = {};
    
    firstYearData.forEach(result => {
      if (result.pdfCards && result.pdfCards.length > 0) {
        result.pdfCards.forEach((card) => {
          if (card.quarterLabel) {
            // Extract quarter from quarterLabel (e.g., "Q2 (July– Sep)" -> "Q2")
            const quarterMatch = card.quarterLabel.match(/Q(\d+)/);
            const quarter = quarterMatch ? `Q${quarterMatch[1]}` : null;
            
            if (quarter) {
              if (!cardsByQuarter[quarter]) {
                cardsByQuarter[quarter] = {
                  period: card.quarterLabel,
                  status: card.isAudited ? 'Audited' : 'Unaudited',
                  cards: []
                };
              }
              cardsByQuarter[quarter].cards.push({
                id: card.id,
                title: card.title,
                pdfUrl: card.pdfUrl || '#',
                isActive: card.isActive !== false
              });
            }
          } else {
            // If no quarterLabel, add to first quarter
            if (!cardsByQuarter['Q1']) {
              cardsByQuarter['Q1'] = {
                period: 'Q1',
                status: card.isAudited ? 'Audited' : 'Unaudited',
                cards: []
              };
            }
            cardsByQuarter['Q1'].cards.push({
              id: card.id,
              title: card.title,
              pdfUrl: card.pdfUrl || '#',
              isActive: card.isActive !== false
            });
          }
        });
      }
    });
    
    // Sort quarters and assign to Q1 and Q2
    const sortedQuarters = Object.keys(cardsByQuarter).sort();
    
    if (sortedQuarters.length > 0) {
      const q1Data = cardsByQuarter[sortedQuarters[0]];
      if (q1Data) {
        // Extract period format (e.g., "Q2 (July– Sep)" -> "Q2(July– Sep)")
        const periodMatch = q1Data.period.match(/Q\d+\s*\(([^)]+)\)/);
        const period = periodMatch ? periodMatch[1] : '';
        quarterlyItems.push({
          period: period ? `Q1(${period})` : 'Q1',
          status: q1Data.status
        });
        cards.push(...q1Data.cards);
      }
    }
    
    if (sortedQuarters.length > 1) {
      const q2Data = cardsByQuarter[sortedQuarters[1]];
      if (q2Data) {
        const periodMatch = q2Data.period.match(/Q\d+\s*\(([^)]+)\)/);
        const period = periodMatch ? periodMatch[1] : '';
        quarterlyItemsAfterCards.push({
          period: period ? `Q2(${period})` : 'Q2',
          status: q2Data.status
        });
        cardsAfterQ2.push(...q2Data.cards);
      }
    }
  }
  
  return {
    tabs,
    quarterlyItems,
    cards,
    quarterlyItemsAfterCards,
    cardsAfterQ2
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
  
  return activeReturns.map(returnItem => ({
    id: returnItem.id,
    title: returnItem.title || returnItem.pdfCard?.title || 'Annual Return',
    pdfUrl: returnItem.pdfCard?.pdfUrl || '#',
    isActive: returnItem.isActive
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


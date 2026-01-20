# Reports and Filings API Documentation

## Overview
This document provides reference documentation for the Reports and Filings page dynamic API integration with Strapi CMS.

## API Endpoint
- **Endpoint**: `/api/report-filing`
- **Type**: Single Type (returns one entry with all sections)
- **Base URL**: `http://65.2.155.211:1380/api/report-filing`

## Strapi Content Structure

### Top-Level Structure
The `report-filing` Single Type contains the following sections:

1. **TopBanner** (Component: `InnerBanner`)
   - `DesktopImage` (Media)
   - `MobileImage` (Media)
   - `Heading` (Text)
   - `SubHeading` (Text)
   - `SubHeadingText` (Boolean)

2. **QuarterlyResultsSection** (Repeatable Component: `QuarterTab`)
   - `FinancialYear` (Text) - e.g., "FY 2025-26"
   - **QuarterlyEarningsSection** (Repeatable Component: `EarningsPeriodCard`)
     - `QuarterLabel` (Text) - e.g., "Q1 (April-June)"
     - **pdfCard** (Repeatable Component: `Pdfcomponent`)
       - `Title` (Text)
       - `isAudited` (Boolean)
       - `isActive` (Boolean)
       - `QuarterLabel` (Text)
       - `PublishedDate` (Date)
       - `Pdf` (Media)

3. **AnnualReportSection** (Repeatable Component: `AnnualReport`)
   - `TabYear` (Text) - e.g., "2025"
   - **pdfCard** (Repeatable Component: `Pdfcomponent`)
     - `Title` (Text)
     - `isAudited` (Boolean)
     - `isActive` (Boolean)
     - `QuarterLabel` (Text)
     - `PublishedDate` (Date)
     - `pdf` (Media)
   - `image` (Media) - Cover image
   - `MicrositeUrl` (Text) - ESG Microsite URL
   - `pdf` (Media) - Main PDF download

4. **AnnualReturnsSection** (Repeatable Component: `AnnualReturns`)
   - **PdfCard** (Component: `PdfCard`) - Single component (not repeatable)
     - `Title` (Text)
     - `PublishedDate` (Date)
     - `Pdf` (Media)
     - `isActive` (Boolean)

5. **BoardMeetingFilingsSection** (Repeatable Component: `BoardMeetingTab`)
   - `TabYear` (Text) - e.g., "2025"
   - **pdfCard** (Repeatable Component: `PdfCard`)
     - `Title` (Text)
     - `PublishedDate` (Date)
     - `Pdf` (Media)
     - `isActive` (Boolean)

6. **OtherExchangeFilingsSection** (Repeatable Component: `OthersTab`)
   - `TabYear` (Text) - e.g., "2025"
   - **PdfCard** (Repeatable Component: `PdfCard`)
     - `Title` (Text)
     - `PublishedDate` (Date)
     - `Pdf` (Media)
     - `isActive` (Boolean)

## API Functions

### `getReportFiling()`
Fetches data from the Strapi API with proper population of all nested components.

**Location**: `src/lib/strapi-reports.js`

**Populate Query**:
```
populate[TopBanner][populate][DesktopImage][populate]=*&
populate[TopBanner][populate][MobileImage][populate]=*&
populate[QuarterlyResultsSection][populate][QuarterlyEarningsSection][populate][pdfCard][populate][Pdf][populate]=*&
populate[AnnualReportSection][populate][pdfCard][populate][pdf][populate]=*&
populate[AnnualReportSection][populate][image][populate]=*&
populate[AnnualReportSection][populate][pdf][populate]=*&
populate[AnnualReturnsSection][populate][PdfCard][populate][Pdf][populate]=*&
populate[BoardMeetingFilingsSection][populate][pdfCard][populate][Pdf][populate]=*&
populate[OtherExchangeFilingsSection][populate][PdfCard][populate][Pdf][populate]=*
```

### `mapReportFilingData(strapiData)`
Maps raw Strapi API response to a standardized format.

**Returns**:
```javascript
{
  topBanner: Object | null,
  quarterlyResultsSections: Array,
  annualReportSections: Array,
  annualReturnsSections: Array,
  boardMeetingFilingsSections: Array,
  otherExchangeFilingsSections: Array
}
```

## Transformation Functions

These functions convert the mapped Strapi data into the format expected by React components:

### `transformQuarterlyResultsForComponent(reportFilingData)`
Transforms quarterly results data for `QuarterlyResultsWithTabs` component.

**Returns**:
```javascript
{
  tabs: Array<string>,              // e.g., ["FY 2025-26", "FY 2024-25"]
  quarterlyItems: Array<Object>,     // [{ period: "Q1(April-June)", status: "Unaudited" }]
  cards: Array<Object>,              // Q1 cards: [{ id, title, pdfUrl, isActive }]
  quarterlyItemsAfterCards: Array<Object>,  // [{ period: "Q2(July-Sep)", status: "Unaudited" }]
  cardsAfterQ2: Array<Object>        // Q2 cards: [{ id, title, pdfUrl, isActive }]
}
```

### `transformAnnualReportsForComponent(reportFilingData)`
Transforms annual reports data for `IntegratedReportAnnualReport` component.

**Returns**:
```javascript
{
  tabs: Array<string>,              // e.g., ["2025", "2024", "2023"]
  tabsData: {
    [year]: {
      cardData: {
        title: Array<string>,       // ["Financial Year", "2025"]
        image: { url, alt },
        buttons: Array<Object>       // [{ label, href, variant }]
      },
      extraSmallCards: Array<Object> // [{ id, title, pdfUrl, isActive }]
    }
  }
}
```

### `transformAnnualReturnsForComponent(reportFilingData)`
Transforms annual returns data for `AnnualReturns` component.

**Returns**:
```javascript
[
  { id, title, pdfUrl, isActive },
  ...
]
```

### `transformBoardMeetingFilingsForComponent(reportFilingData)`
Transforms board meeting filings data for `ExchangeFilings` component.

**Returns**:
```javascript
{
  tabs: Array<string>,              // e.g., ["2025", "2024"]
  tabsData: {
    [year]: {
      cards: [
        {
          links: [
            { text: String, href: String },
            ...
          ]
        },
        ...
      ]
    }
  }
}
```

### `transformOthersFilingsForComponent(reportFilingData)`
Transforms other exchange filings data for `ExchangeFilings` component.

**Returns**: Same format as `transformBoardMeetingFilingsForComponent`

## Page Implementation

### File Location
`src/app/investors/reports-and-filings/page.js`

### Key Features
- **Async Server Component**: Fetches data at build/request time
- **Single API Call**: One call fetches all sections and banner
- **Error Handling**: Try-catch blocks with graceful error messages
- **No Fallback Data**: All hardcoded data removed, relies entirely on Strapi API
- **Debug Logging**: Development mode logs for debugging

### Data Flow
1. `getReportFiling()` fetches raw data from Strapi
2. `mapReportFilingData()` maps to standardized format
3. Transformation functions convert to component format
4. Components receive formatted data as props

## Component Data Requirements

### QuarterlyResultsWithTabs
- `tabs`: Array of financial year strings
- `quarterlyItems`: Array of period/status objects
- `cards`: Array of Q1 PDF cards
- `quarterlyItemsAfterCards`: Array of period/status objects
- `cardsAfterQ2`: Array of Q2 PDF cards

### IntegratedReportAnnualReport
- `tabs`: Array of year strings
- `tabsData`: Object mapping year to card data and extra small cards

### AnnualReturns
- `cards`: Array of PDF card objects

### ExchangeFilings
- `tabs`: Array of year strings
- `tabsData`: Object mapping year to cards with links

## Field Name Variations

The mapping functions handle various field name cases for robustness:
- `Pdf` / `pdf`
- `Title` / `title`
- `TabYear` / `tabYear`
- `FinancialYear` / `financialYear`
- `QuarterLabel` / `quarterLabel`
- `PublishedDate` / `publishedDate`
- `DesktopImage` / `desktop_image`
- `MobileImage` / `mobile_image`

## Testing the API

### Test Endpoint
```
http://65.2.155.211:1380/api/report-filing?populate[TopBanner][populate][DesktopImage][populate]=*&populate[TopBanner][populate][MobileImage][populate]=*&populate[QuarterlyResultsSection][populate][QuarterlyEarningsSection][populate][pdfCard][populate][Pdf][populate]=*&populate[AnnualReportSection][populate][pdfCard][populate][pdf][populate]=*&populate[AnnualReportSection][populate][image][populate]=*&populate[AnnualReportSection][populate][pdf][populate]=*&populate[AnnualReturnsSection][populate][PdfCard][populate][Pdf][populate]=*&populate[BoardMeetingFilingsSection][populate][pdfCard][populate][Pdf][populate]=*&populate[OtherExchangeFilingsSection][populate][PdfCard][populate][Pdf][populate]=*
```

### Expected Response Structure
```json
{
  "data": {
    "id": Number,
    "TopBanner": { ... },
    "QuarterlyResultsSection": [ ... ],
    "AnnualReportSection": [ ... ],
    "AnnualReturnsSection": [ ... ],
    "BoardMeetingFilingsSection": [ ... ],
    "OtherExchangeFilingsSection": [ ... ]
  },
  "meta": { ... }
}
```

## Error Handling

The page implements comprehensive error handling:
- API fetch errors are caught and logged
- Empty responses are handled gracefully
- Components receive `null` or empty arrays when data is unavailable
- Development mode shows detailed error messages

## Notes

- All PDF URLs are extracted using `getStrapiMedia()` helper function
- Images are handled with proper fallbacks
- The structure supports both camelCase and snake_case field names
- All repeatable components are properly mapped to arrays
- Single components (like `PdfCard` in `AnnualReturnsSection`) are handled as objects

## Related Files

- `src/lib/strapi-reports.js` - API functions and mapping logic
- `src/lib/strapi.js` - Core Strapi helpers (`fetchAPI`, `getStrapiMedia`, `mapTopBannerData`)
- `src/app/investors/reports-and-filings/page.js` - Page implementation
- `src/components/QuarterlyResultsWithTabs.js` - Quarterly results component
- `src/components/IntegratedReportAnnualReport.js` - Annual report component
- `src/components/AnnualReturns.js` - Annual returns component
- `src/components/ExchangeFilings.js` - Exchange filings component


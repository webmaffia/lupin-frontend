# Reports & Filings API Documentation

This document describes the Strapi API structure and helper functions for the Reports & Filings page.

---

## 📋 API Endpoint

**Base URL:** `http://65.2.155.211:1380/api/report-filing`

**Type:** Single Type (not Collection Type)

**Full Endpoint with Population:**
```
GET /api/report-filing?populate[QuarterlyResult][populate][pdfCard][populate][pdf][populate]=*&populate[AnnualReport][populate][pdfCard][populate][pdf][populate]=*&populate[AnnualReport][populate][image][populate]=*&populate[AnnualReport][populate][pdf][populate]=*&populate[AnnualReturns][populate][PdfCard][populate][pdf][populate]=*&populate[BoardMeetingFiling][populate][pdfCard][populate][pdf][populate]=*&populate[OthersFilings][populate][PdfCard][populate][pdf][populate]=*
```

---

## 📦 Strapi Structure

### Single Type: `report-filing`

The Single Type contains 5 repeatable components:

#### 1. QuarterlyResult (Repeatable)
- **QuarterYear** (Text) - e.g., "FY 2025-26"
- **pdfCard** (Repeatable Component - Pdfcomponent)
  - title (Text)
  - pdf (Media)
  - isAudited (Boolean)
  - isActive (Boolean)
  - quarterLabel (Text)
  - publishedDate (Date)

#### 2. AnnualReport (Repeatable)
- **TabYear** (Text) - e.g., "2025"
- **title** (Text)
- **MicrositeUrl** (Text)
- **image** (Media)
- **pdf** (Media) - Main report PDF
- **pdfCard** (Repeatable Component - Pdfcomponent)
  - title (Text)
  - pdf (Media)
  - isAudited (Boolean)
  - isActive (Boolean)
  - quarterLabel (Text)
  - publishedDate (Date)

#### 3. AnnualReturns (Repeatable)
- **title** (Text)
- **publishedDate** (Date)
- **isActive** (Boolean)
- **PdfCard** (Component - PdfCard)
  - title (Text)
  - pdf (Media)
  - publishedDate (Date)
  - isActive (Boolean)

#### 4. BoardMeetingFiling (Repeatable)
- **TabYear** (Text) - e.g., "2025"
- **pdfCard** (Repeatable Component - PdfCard)
  - title (Text)
  - pdf (Media)
  - publishedDate (Date)
  - isActive (Boolean)

#### 5. OthersFilings (Repeatable)
- **TabYear** (Text) - e.g., "2025"
- **PdfCard** (Repeatable Component - PdfCard)
  - title (Text)
  - pdf (Media)
  - publishedDate (Date)
  - isActive (Boolean)

---

## 🔧 Helper Functions

All helper functions are in `src/lib/strapi-reports.js`

### Core Functions

#### `getReportFiling()`
Fetches the report-filing data from Strapi with all nested components populated.

```javascript
import { getReportFiling } from '@/lib/strapi-reports';

const data = await getReportFiling();
```

#### `mapReportFilingData(strapiData)`
Maps raw Strapi response to a clean, usable format.

```javascript
import { getReportFiling, mapReportFilingData } from '@/lib/strapi-reports';

const rawData = await getReportFiling();
const mappedData = mapReportFilingData(rawData);
```

**Returns:**
```javascript
{
  quarterlyResults: [
    {
      id: 10,
      quarterYear: "FY 2025-26",
      pdfCards: [
        {
          id: 1,
          title: "Q2 Consolidated",
          pdfUrl: "http://...",
          pdf: { url, name, size, mime, alternativeText },
          isActive: true,
          publishedDate: "2025-10-15",
          quarterLabel: "Q2 (July– Sep)",
          isAudited: false
        }
      ]
    }
  ],
  annualReports: [
    {
      id: 6,
      tabYear: "2025",
      title: "FINANCIAL YEAR 2025",
      micrositeUrl: "https://...",
      image: { url, alt, width, height },
      mainPdf: { url, name, size, mime },
      pdfCards: [...],
      isActive: true,
      publishedDate: "2025-06-30"
    }
  ],
  annualReturns: [...],
  boardMeetingFilings: [...],
  othersFilings: [...]
}
```

### Grouping Functions

#### `getQuarterlyResultsGrouped(reportFilingData)`
Groups quarterly results by financial year.

```javascript
import { mapReportFilingData, getQuarterlyResultsGrouped } from '@/lib/strapi-reports';

const rawData = await getReportFiling();
const mappedData = mapReportFilingData(rawData);
const grouped = getQuarterlyResultsGrouped(mappedData);

// Returns: { "FY 2025-26": [...], "FY 2024-25": [...] }
```

#### `getAnnualReportsGrouped(reportFilingData)`
Groups annual reports by year.

```javascript
const grouped = getAnnualReportsGrouped(mappedData);
// Returns: { "2025": [...], "2024": [...] }
```

#### `getBoardMeetingFilingsGrouped(reportFilingData)`
Groups board meeting filings by year.

```javascript
const grouped = getBoardMeetingFilingsGrouped(mappedData);
// Returns: { "2025": [...], "2024": [...] }
```

#### `getOthersFilingsGrouped(reportFilingData)`
Groups others filings by year.

```javascript
const grouped = getOthersFilingsGrouped(mappedData);
// Returns: { "2025": [...], "2024": [...] }
```

### Filtering Functions

#### `getQuarterlyResultsByYear(reportFilingData, year)`
Get quarterly results for a specific financial year.

```javascript
const results = getQuarterlyResultsByYear(mappedData, "FY 2025-26");
```

#### `getAnnualReportByYear(reportFilingData, year)`
Get annual report for a specific year.

```javascript
const report = getAnnualReportByYear(mappedData, "2025");
```

#### `getBoardMeetingFilingsByYear(reportFilingData, year)`
Get board meeting filings for a specific year.

```javascript
const filings = getBoardMeetingFilingsByYear(mappedData, "2025");
```

#### `getOthersFilingsByYear(reportFilingData, year)`
Get others filings for a specific year.

```javascript
const filings = getOthersFilingsByYear(mappedData, "2025");
```

### Active Items Functions

#### `getActiveAnnualReturns(reportFilingData)`
Get only active annual returns.

```javascript
const activeReturns = getActiveAnnualReturns(mappedData);
```

#### `getActiveQuarterlyResults(reportFilingData)`
Get only active quarterly results (with at least one active PDF card).

```javascript
const activeResults = getActiveQuarterlyResults(mappedData);
```

#### `getActiveAnnualReports(reportFilingData)`
Get only active annual reports.

```javascript
const activeReports = getActiveAnnualReports(mappedData);
```

---

## 💻 Usage Examples

### Example 1: Fetch and Display All Data

```javascript
// app/investors/reports-filings/page.js
import { getReportFiling, mapReportFilingData } from '@/lib/strapi-reports';

export default async function ReportsFilingsPage() {
  const rawData = await getReportFiling();
  const data = mapReportFilingData(rawData);

  return (
    <div>
      <QuarterlyResultsSection data={data.quarterlyResults} />
      <AnnualReportsSection data={data.annualReports} />
      <AnnualReturnsSection data={data.annualReturns} />
      <BoardMeetingSection data={data.boardMeetingFilings} />
      <OthersFilingsSection data={data.othersFilings} />
    </div>
  );
}
```

### Example 2: Get Quarterly Results by Year

```javascript
import { 
  getReportFiling, 
  mapReportFilingData,
  getQuarterlyResultsByYear 
} from '@/lib/strapi-reports';

export default async function QuarterlyResultsPage() {
  const rawData = await getReportFiling();
  const mappedData = mapReportFilingData(rawData);
  const currentYearResults = getQuarterlyResultsByYear(mappedData, "FY 2025-26");

  return (
    <div>
      {currentYearResults.map(result => (
        <div key={result.id}>
          <h3>{result.quarterYear}</h3>
          {result.pdfCards.map(card => (
            <a key={card.id} href={card.pdfUrl}>
              {card.title}
            </a>
          ))}
        </div>
      ))}
    </div>
  );
}
```

### Example 3: Display Annual Report with Image

```javascript
import { 
  getReportFiling, 
  mapReportFilingData,
  getAnnualReportByYear 
} from '@/lib/strapi-reports';
import Image from 'next/image';

export default async function AnnualReportPage() {
  const rawData = await getReportFiling();
  const mappedData = mapReportFilingData(rawData);
  const report = getAnnualReportByYear(mappedData, "2025");

  if (!report) {
    return <div>Report not found</div>;
  }

  return (
    <div>
      <h1>{report.title}</h1>
      {report.image && (
        <Image
          src={report.image.url}
          alt={report.image.alt}
          width={report.image.width}
          height={report.image.height}
        />
      )}
      {report.mainPdf && (
        <a href={report.mainPdf.url}>Download Main Report</a>
      )}
      {report.micrositeUrl && (
        <a href={report.micrositeUrl}>Visit ESG Microsite</a>
      )}
      {report.pdfCards.map(card => (
        <a key={card.id} href={card.pdfUrl}>
          {card.title}
        </a>
      ))}
    </div>
  );
}
```

### Example 4: Group and Display by Year

```javascript
import { 
  getReportFiling, 
  mapReportFilingData,
  getAnnualReportsGrouped 
} from '@/lib/strapi-reports';

export default async function AnnualReportsPage() {
  const rawData = await getReportFiling();
  const mappedData = mapReportFilingData(rawData);
  const grouped = getAnnualReportsGrouped(mappedData);

  return (
    <div>
      {Object.keys(grouped).map(year => (
        <div key={year}>
          <h2>{year}</h2>
          {grouped[year].map(report => (
            <div key={report.id}>
              <h3>{report.title}</h3>
              {/* Render report details */}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
```

---

## 📊 Data Structure Reference

### QuarterlyResult
```typescript
{
  id: number;
  quarterYear: string; // "FY 2025-26"
  pdfCards: Array<{
    id: number;
    title: string;
    pdfUrl: string | null;
    pdf: {
      url: string;
      name: string;
      size: number;
      mime: string;
      alternativeText: string;
    } | null;
    isActive: boolean;
    publishedDate: string | null;
    quarterLabel: string | null;
    isAudited: boolean;
  }>;
}
```

### AnnualReport
```typescript
{
  id: number;
  tabYear: string; // "2025"
  title: string;
  micrositeUrl: string | null;
  image: {
    url: string;
    alt: string;
    width: number;
    height: number;
  } | null;
  mainPdf: {
    url: string;
    name: string;
    size: number;
    mime: string;
  } | null;
  pdfCards: Array<{...}>; // Same as QuarterlyResult pdfCards
  isActive: boolean;
  publishedDate: string | null;
  quarterLabel: string | null;
  isAudited: boolean;
}
```

### AnnualReturn
```typescript
{
  id: number;
  title: string;
  pdfCard: {
    id: number;
    title: string;
    pdfUrl: string | null;
    pdf: {...} | null;
    isActive: boolean;
    publishedDate: string | null;
  } | null;
  publishedDate: string | null;
  isActive: boolean;
}
```

### BoardMeetingFiling
```typescript
{
  id: number;
  tabYear: string; // "2025"
  pdfCards: Array<{
    id: number;
    title: string;
    pdfUrl: string | null;
    pdf: {...} | null;
    isActive: boolean;
    publishedDate: string | null;
  }>;
}
```

### OthersFiling
```typescript
{
  id: number;
  tabYear: string; // "2025"
  pdfCards: Array<{
    id: number;
    title: string;
    pdfUrl: string | null;
    pdf: {...} | null;
    isActive: boolean;
    publishedDate: string | null;
  }>;
}
```

---

## 🔍 Notes

1. **Media URLs**: All PDF and image URLs are automatically converted to full URLs using `getStrapiMedia()` helper.

2. **Null Safety**: All functions handle missing data gracefully and return `null` or empty arrays when appropriate.

3. **Active Status**: Use `isActive` field to filter out inactive items. The helper functions provide `getActive*` variants for convenience.

4. **Date Format**: Dates are returned as ISO strings from Strapi. Format them in your components as needed.

5. **Single Type**: This is a Single Type, not a Collection Type, so there's only one entry. All sections are repeatable components within that single entry.

6. **Component Names**: Note that Strapi uses different component names:
   - `Pdfcomponent` (for QuarterlyResult and AnnualReport pdfCard)
   - `PdfCard` (for AnnualReturns, BoardMeetingFiling, and OthersFilings)

---

## ✅ Checklist

- [x] Created `getReportFiling()` function
- [x] Created `mapReportFilingData()` function
- [x] Created grouping functions
- [x] Created filtering functions
- [x] Created active items functions
- [x] Handled media URL conversion
- [x] Added null safety
- [x] Created documentation

---

**Last Updated:** 2025-01-15




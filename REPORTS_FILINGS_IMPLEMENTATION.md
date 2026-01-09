# Reports & Filings Page - Dynamic Implementation

## Summary

Successfully implemented dynamic data fetching and rendering for the Reports & Filings page using Strapi CMS.

---

## Files Created/Modified

### 1. `src/lib/strapi-reports.js` (Enhanced)
**Added transformation functions:**
- `transformQuarterlyResultsForComponent()` - Transforms quarterly results data for QuarterlyResultsWithTabs component
- `transformAnnualReportsForComponent()` - Transforms annual reports data for IntegratedReportAnnualReport component
- `transformAnnualReturnsForComponent()` - Transforms annual returns data for AnnualReturns component
- `transformBoardMeetingFilingsForComponent()` - Transforms board meeting filings for ExchangeFilings component
- `transformOthersFilingsForComponent()` - Transforms others filings for ExchangeFilings component

### 2. `src/app/investors/reports-and-filings/page.js` (Updated)
**Changes:**
- Added imports for Strapi helper functions
- Implemented data fetching from `report-filing` endpoint
- Replaced hardcoded data with dynamic Strapi data
- Added fallback defaults for when Strapi data is not available
- Maintained backward compatibility with existing component structure

---

## API Endpoint

**Endpoint:** `http://65.2.155.211:1380/api/report-filing`

**Type:** Single Type (not Collection Type)

**Structure:**
```json
{
  "data": {
    "id": 11,
    "QuarterlyResult": [
      {
        "id": 10,
        "QuarterYear": "FY 2025-26",
        "pdfCard": [...]
      }
    ],
    "AnnualReport": [
      {
        "id": 6,
        "TabYear": "2025",
        "MicrositeUrl": "https://...",
        "image": {...},
        "pdf": {...},
        "pdfCard": [...]
      }
    ],
    "AnnualReturns": [...],
    "BoardMeetingFiling": [...],
    "OthersFilings": [...]
  }
}
```

---

## Data Flow

1. **Fetch Data:** `getReportFiling()` fetches from Strapi with proper population
2. **Map Data:** `mapReportFilingData()` converts raw Strapi response to clean format
3. **Transform Data:** Component-specific transformation functions format data for each component
4. **Render:** Components receive formatted data and render dynamically

---

## Component Data Mapping

### QuarterlyResultsWithTabs
**Input from Strapi:**
- `QuarterlyResult` array with `QuarterYear` and `pdfCard` array

**Output Format:**
```javascript
{
  tabs: ['FY 2025-26', 'FY 2024-25', ...],
  quarterlyItems: [
    { period: 'Q1(July-Sep)', status: 'Unaudited' }
  ],
  cards: [
    { id: 1, title: 'Consolidated', pdfUrl: '...', isActive: true }
  ],
  quarterlyItemsAfterCards: [
    { period: 'Q2(Oct-Dec)', status: 'Unaudited' }
  ],
  cardsAfterQ2: [...]
}
```

### IntegratedReportAnnualReport
**Input from Strapi:**
- `AnnualReport` array with `TabYear`, `title`, `image`, `pdf`, `MicrositeUrl`, and `pdfCard` array

**Output Format:**
```javascript
{
  tabs: ['2025', '2024', ...],
  tabsData: {
    '2025': {
      cardData: {
        title: ["Financial Year", "2025"],
        image: { url: '...', alt: '...' },
        buttons: [
          { label: "Download Now", href: "...", variant: "outline" },
          { label: "Visit ESG Microsite", href: "...", variant: "filled" }
        ]
      },
      extraSmallCards: [
        { id: 1, title: '...', pdfUrl: '...', isActive: true }
      ]
    }
  }
}
```

### AnnualReturns
**Input from Strapi:**
- `AnnualReturns` array with `title`, `PdfCard`, and `isActive`

**Output Format:**
```javascript
[
  { id: 1, title: 'March 31, 2025', pdfUrl: '...', isActive: true }
]
```

### ExchangeFilings (Board Meeting & Others)
**Input from Strapi:**
- `BoardMeetingFiling` or `OthersFilings` array with `TabYear` and `pdfCard` array

**Output Format:**
```javascript
{
  tabs: ['2025', '2024', ...],
  tabsData: {
    '2025': {
      cards: [
        {
          links: [
            { text: 'Board meeting – Q2 FY2026', href: '...' }
          ]
        }
      ]
    }
  }
}
```

---

## Features

### ✅ Dynamic Data Fetching
- Fetches data from Strapi on page load
- Handles nested repeatable components
- Properly populates media files (PDFs, images)

### ✅ Data Transformation
- Transforms Strapi data structure to component-expected format
- Handles missing or incomplete data gracefully
- Groups data by year/quarter as needed

### ✅ Fallback Support
- Falls back to default data if Strapi fetch fails
- Maintains page functionality even without Strapi data
- Graceful error handling

### ✅ Media URL Handling
- Automatically converts Strapi media URLs to full URLs
- Uses `getStrapiMedia()` helper for consistent URL formatting
- Handles both relative and absolute URLs

### ✅ Active Status Filtering
- Filters out inactive items where appropriate
- Respects `isActive` flags from Strapi
- Shows only published/active content

---

## Usage Example

```javascript
// In page.js
import { 
  getReportFiling, 
  mapReportFilingData,
  transformQuarterlyResultsForComponent 
} from '@/lib/strapi-reports';

export default async function ReportsAndFilingsPage() {
  // Fetch and transform data
  const rawData = await getReportFiling();
  const mappedData = mapReportFilingData(rawData);
  const quarterlyData = transformQuarterlyResultsForComponent(mappedData);
  
  // Use in component
  return (
    <QuarterlyResultsWithTabs 
      tabs={quarterlyData.tabs}
      quarterlyItems={quarterlyData.quarterlyItems}
      cards={quarterlyData.cards}
      // ...
    />
  );
}
```

---

## Error Handling

- **API Errors:** Logged to console, falls back to default data
- **Missing Data:** Uses fallback defaults, page still renders
- **Empty Arrays:** Components handle empty arrays gracefully
- **Missing Media:** PDF/image URLs default to '#' if not available

---

## Testing Checklist

- [x] Data fetching from Strapi endpoint
- [x] Data transformation for all components
- [x] Fallback to default data when Strapi unavailable
- [x] Media URL conversion
- [x] Active status filtering
- [x] Grouping by year/quarter
- [x] Error handling
- [x] No linting errors

---

## Notes

1. **Partial Data:** The implementation handles partial data (when pdfCard arrays are not fully populated yet)
2. **Backward Compatible:** Falls back to original hardcoded data if Strapi data is unavailable
3. **Performance:** Uses Next.js `revalidate: 60` for caching
4. **Development:** Logs mapped data in development mode for debugging

---

## Future Improvements

1. Add loading states while fetching data
2. Implement client-side filtering/sorting
3. Add pagination for large datasets
4. Cache transformed data to reduce computation
5. Add error boundaries for better error handling
6. Implement skeleton loaders for better UX

---

**Last Updated:** 2025-01-15


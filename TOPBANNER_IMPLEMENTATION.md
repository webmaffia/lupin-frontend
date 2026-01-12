# TopBanner Component Implementation

This document describes the implementation of the TopBanner component integration for all investor pages.

## Overview

The TopBanner component has been added to Strapi CMS and integrated into all 4 investor pages:
- Financials
- Policies
- Reports & Filings
- Analyst Coverage

## Strapi TopBanner Component Structure

The TopBanner component in Strapi contains:
- `desktop_image` (Media) - Desktop banner image
- `mobile_image` (Media) - Mobile banner image
- `BannerTitle` (Text) - Main banner title
- `subHeading` (Text) - Sub heading text
- `subheadingtext` (Text) - Additional sub heading text

## API Endpoint Updates

All API endpoints have been updated to populate the TopBanner component:

### 1. Financials API
**Endpoint:** `http://65.2.155.211:1380/api/financial?populate=*`

**Updated Query:**
```
populate[TopBanner][populate][desktop_image][populate]=*&
populate[TopBanner][populate][mobile_image][populate]=*&
populate[PdfCard][populate][pdf][populate]=*
```

### 2. Policies API
**Endpoint:** `http://65.2.155.211:1380/api/policy?populate=*`

**Updated Query:**
```
populate[TopBanner][populate][desktop_image][populate]=*&
populate[TopBanner][populate][mobile_image][populate]=*&
populate[PdfCard][populate][pdf][populate]=*
```

### 3. Analyst Coverage API
**Endpoint:** `http://65.2.155.211:1380/api/analyst-coverage?populate=*`

**Updated Query:**
```
populate[TopBanner][populate][desktop_image][populate]=*&
populate[TopBanner][populate][mobile_image][populate]=*&
populate[AnalystCard][populate]=*
```

### 4. Reports & Filings API
**Endpoint:** `http://65.2.155.211:1380/api/report-filing?populate=*`

**Updated Query:**
```
populate[TopBanner][populate][desktop_image][populate]=*&
populate[TopBanner][populate][mobile_image][populate]=*&
populate[QuarterlyResult][populate][pdfCard][populate][pdf][populate]=*&
... (other populate queries)
```

## Helper Functions

### `mapTopBannerData(topBanner)`
**Location:** `src/lib/strapi.js`

**Purpose:** Maps Strapi TopBanner component to InnerBanner component format

**Input:**
```javascript
{
  desktop_image: { data: { attributes: {...} } },
  mobile_image: { data: { attributes: {...} } },
  BannerTitle: "Title Text",
  subHeading: "Sub Heading",
  subheadingtext: "Additional Text"
}
```

**Output:**
```javascript
{
  title: {
    line1: "Title Text",
    line2: "Additional Text"
  },
  images: {
    banner: {
      url: "https://...",
      alt: "Banner image"
    },
    petal: {
      url: "/assets/inner-banner/petal-2.svg",
      alt: "Decorative petal"
    }
  }
}
```

**Logic:**
- Uses `desktop_image` as primary banner image, falls back to `mobile_image` if desktop not available
- Maps `BannerTitle` to `title.line1` (or `subHeading` if BannerTitle is empty)
- Maps `subheadingtext` to `title.line2`
- Automatically includes default petal image
- Handles both Strapi v4 nested structure (`data.attributes`) and flat structure

## Page Updates

All 4 pages have been updated with commented-out code to fetch and use TopBanner data:

### Financials Page (`src/app/investors/financials/page.js`)
```javascript
// TODO: Uncomment when ready to connect to Strapi API
// Fetch banner data from Strapi
// let bannerData = null;
// 
// try {
//   const rawData = await getFinancial();
//   const topBanner = rawData?.data?.TopBanner || rawData?.TopBanner;
//   bannerData = mapTopBannerData(topBanner);
// } catch (error) {
//   console.error('Error fetching Financial banner data from Strapi:', error);
// }

// Using fallback banner data (will be replaced by Strapi API later)
const bannerData = {
  title: {
    line1: "Financials",
    line2: ""
  },
  images: {
    banner: {
      url: "/assets/inner-banner/freepik-enhance-42835.jpg",
      alt: "Financials"
    },
    petal: {
      url: "/assets/inner-banner/petal-2.svg",
      alt: "Decorative petal"
    }
  }
};
```

### Policies Page (`src/app/investors/policies/page.js`)
Similar structure with fallback banner data for "Policies"

### Analyst Coverage Page (`src/app/investors/analyst-coverage/page.js`)
Similar structure with fallback banner data for "Analyst Coverage"

### Reports & Filings Page (`src/app/investors/reports-and-filings/page.js`)
```javascript
// TODO: Uncomment when ready to connect to Strapi API
// Fetch banner data from Strapi
// let bannerData = null;
// 
// try {
//   const rawData = await getReportFiling();
//   const mappedData = mapReportFilingData(rawData);
//   bannerData = mappedData.topBanner;
// } catch (error) {
//   console.error('Error fetching Reports and Filings banner data from Strapi:', error);
// }
```

**Note:** Reports & Filings uses `mapReportFilingData()` which now includes `topBanner` in its return value.

## Reports & Filings Special Handling

The `mapReportFilingData()` function in `src/lib/strapi-reports.js` has been updated to:
1. Import `mapTopBannerData` from `strapi.js`
2. Map the TopBanner component when available
3. Include `topBanner` in the returned data object

```javascript
return {
  topBanner: topBanner,  // Added
  quarterlyResults: quarterlyResults,
  annualReports: annualReports,
  // ... other sections
};
```

## Current Status

✅ **API Endpoints Updated** - All endpoints now populate TopBanner
✅ **Helper Functions Created** - `mapTopBannerData()` function ready
✅ **Pages Updated** - All 4 pages have commented code ready to use
✅ **Fallback Data** - All pages have working fallback banner data
✅ **No Breaking Changes** - All existing functionality preserved

## To Enable Dynamic Banners

When ready to connect to Strapi:

1. **Uncomment the import statements** in each page:
   ```javascript
   import { getFinancial, mapFinancialData, mapTopBannerData } from '@/lib/strapi';
   ```

2. **Change function to async**:
   ```javascript
   export default async function FinancialsPage() {
   ```

3. **Uncomment the banner fetch code**:
   ```javascript
   let bannerData = null;
   
   try {
     const rawData = await getFinancial();
     const topBanner = rawData?.data?.TopBanner || rawData?.TopBanner;
     bannerData = mapTopBannerData(topBanner);
   } catch (error) {
     console.error('Error fetching Financial banner data from Strapi:', error);
   }
   ```

4. **Use fallback if Strapi data is null**:
   ```javascript
   const finalBannerData = bannerData || {
     // fallback data
   };
   ```

## Testing

When testing with Strapi data:

1. Ensure TopBanner component is added to each Single Type in Strapi
2. Upload desktop and mobile images
3. Fill in BannerTitle, subHeading, and subheadingtext fields
4. Verify the mapped data structure matches InnerBanner expectations
5. Test responsive behavior (desktop vs mobile images)

## Notes

- The mapping function prioritizes `desktop_image` over `mobile_image` for the banner
- If `BannerTitle` is empty, it falls back to `subHeading` for `line1`
- The petal image is always included as a default decorative element
- All banner data is optional - pages will use fallback data if Strapi data is unavailable

---

**Last Updated:** 2025-01-15


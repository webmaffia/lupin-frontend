# Strapi API Endpoints - Temporarily Commented Out

This document tracks the Strapi API endpoints that have been temporarily commented out. All pages are currently using fallback/default data.

---

## 📋 Pages with Commented API Calls

### 1. **Financials Page** (`src/app/investors/financials/page.js`)

**API Endpoint:** `http://65.2.155.211:1380/api/financial?populate=*`

**Status:** ✅ Commented out - Using fallback data

**What's Commented:**
- `import { getFinancial, mapFinancialData } from '@/lib/strapi';`
- `async function` → changed to regular `function`
- API fetch try-catch block for Related Party Transactions

**Fallback Data:** 
- 9 Related Party Transactions items (Half year ended dates from 2021-2025)

**To Re-enable:**
1. Uncomment the import statement
2. Change `function` back to `async function`
3. Uncomment the try-catch block
4. Remove the fallback `const relatedPartyTransactions = [...]` declaration

---

### 2. **Policies Page** (`src/app/investors/policies/page.js`)

**API Endpoint:** `http://65.2.155.211:1380/api/policy?populate=*`

**Status:** ✅ Commented out - Using fallback data

**What's Commented:**
- `import { getPolicy, mapPolicyData } from '@/lib/strapi';`
- `async function` → changed to regular `function`
- API fetch try-catch block

**Fallback Data:**
- Component uses default data when `policiesData = null` is passed

**To Re-enable:**
1. Uncomment the import statement
2. Change `function` back to `async function`
3. Uncomment the try-catch block
4. Change `const policiesData = null;` back to `let policiesData = null;`

---

### 3. **Reports & Filings Page** (`src/app/investors/reports-and-filings/page.js`)

**API Endpoint:** `http://65.2.155.211:1380/api/report-filing?populate=*`

**Status:** ✅ Commented out - Using fallback data

**What's Commented:**
- All imports from `@/lib/strapi-reports`
- `async function` → changed to regular `function`
- API fetch try-catch block
- All data transformation calls

**Fallback Data:**
- Quarterly Results tabs and data
- Integrated Report tabs and data
- Annual Returns cards
- Exchange Filings (Board Meeting) tabs and data
- Exchange Filings (Others) tabs and data

**To Re-enable:**
1. Uncomment all import statements
2. Change `function` back to `async function`
3. Uncomment the try-catch block
4. Change all `const` declarations back to `let` with fallback operators (`||`)

---

### 4. **Analyst Coverage Page** (`src/app/investors/analyst-coverage/page.js`)

**API Endpoint:** `http://65.2.155.211:1380/api/analyst-coverage?populate=*`

**Status:** ✅ Commented out - Using fallback data

**What's Commented:**
- `import { getAnalystCoverage, mapAnalystCoverageData } from '@/lib/strapi';`
- `async function` → changed to regular `function`
- API fetch try-catch block

**Fallback Data:**
- Component uses default data when `analystsData = []` is passed (empty array triggers default)

**To Re-enable:**
1. Uncomment the import statement
2. Change `function` back to `async function`
3. Uncomment the try-catch block
4. Change `const analystsData = [];` back to `let analystsData = [];`

---

## 🔧 Helper Functions Still Available

All helper functions in `src/lib/strapi.js` and `src/lib/strapi-reports.js` are still available and ready to use:

### In `src/lib/strapi.js`:
- ✅ `getFinancial()` - Ready to use
- ✅ `mapFinancialData()` - Ready to use
- ✅ `getPolicy()` - Ready to use
- ✅ `mapPolicyData()` - Ready to use
- ✅ `getAnalystCoverage()` - Ready to use
- ✅ `mapAnalystCoverageData()` - Ready to use

### In `src/lib/strapi-reports.js`:
- ✅ `getReportFiling()` - Ready to use
- ✅ `mapReportFilingData()` - Ready to use
- ✅ All transformation functions - Ready to use

---

## 📝 Quick Re-enable Guide

### Step 1: Uncomment Imports
Find and uncomment the import statements in each page:
```javascript
// Change from:
// import { getFinancial, mapFinancialData } from '@/lib/strapi';

// To:
import { getFinancial, mapFinancialData } from '@/lib/strapi';
```

### Step 2: Change Function to Async
```javascript
// Change from:
export default function FinancialsPage() {

// To:
export default async function FinancialsPage() {
```

### Step 3: Uncomment API Calls
Uncomment the try-catch blocks that fetch from Strapi

### Step 4: Restore Fallback Logic
Change from direct assignment to conditional with fallback:
```javascript
// Change from:
const relatedPartyTransactions = [ /* fallback data */ ];

// To:
let relatedPartyTransactions = [];
try {
  const rawData = await getFinancial();
  relatedPartyTransactions = mapFinancialData(rawData);
} catch (error) {
  // Fallback data
  relatedPartyTransactions = [ /* fallback data */ ];
}
```

---

## ✅ Current Status

All 4 pages are:
- ✅ Using fallback/default data
- ✅ Fully functional without Strapi API
- ✅ Ready to connect to Strapi when needed
- ✅ No linting errors
- ✅ All helper functions preserved and ready

---

## 🎯 Next Steps

When ready to connect to Strapi:

1. **Test API Endpoints First:**
   - Verify all endpoints are accessible
   - Check data structure matches expectations
   - Ensure proper authentication if needed

2. **Uncomment Gradually:**
   - Start with one page (e.g., Analyst Coverage - simplest)
   - Test thoroughly
   - Move to next page

3. **Monitor for Errors:**
   - Check browser console
   - Check server logs
   - Verify data mapping is correct

---

**Last Updated:** 2025-01-15


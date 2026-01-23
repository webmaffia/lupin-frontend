import { NextResponse } from 'next/server';
import { fetchAPI } from '@/lib/strapi';

export async function GET(request) {
  try {
    // Check if Strapi URL is configured
    if (!process.env.NEXT_PUBLIC_STRAPI_URL) {
      return NextResponse.json({
        geography: [],
        category: [],
        oncology: []
      });
    }

    // Fetch product categories from product-categories endpoint
    let categoryOptions = [];
    try {
      const categoriesResponse = await fetchAPI('product-categories?pagination[page]=1&pagination[pageSize]=100', {
        next: { revalidate: 60 },
      });

      if (categoriesResponse && categoriesResponse.data) {
        categoryOptions = categoriesResponse.data.map((item) => {
          const category = item.attributes || item;
          const name = category.name || '';
          return {
            value: name,
            label: name
          };
        }).filter(option => option.value); // Filter out empty values
      }
    } catch (error) {
      console.error('Error fetching product categories:', error);
    }

    // Fetch all products to extract unique filter values for geography and oncology
    const queryString = `products?pagination[page]=1&pagination[pageSize]=100&sort=brandName:asc`;
    
    let allProducts = [];
    let currentPage = 1;
    let totalPages = 1;

    // Fetch first page
    const firstPageResponse = await fetchAPI(queryString, {
      next: { revalidate: 60 },
    });

    if (firstPageResponse && firstPageResponse.data) {
      allProducts = [...firstPageResponse.data];
      totalPages = firstPageResponse.meta?.pagination?.pageCount || 1;

      // Fetch remaining pages if needed
      if (totalPages > 1) {
        const remainingPages = [];
        for (let page = 2; page <= totalPages; page++) {
          remainingPages.push(
            fetchAPI(`products?pagination[page]=${page}&pagination[pageSize]=100&sort=brandName:asc`, {
              next: { revalidate: 60 },
            })
          );
        }

        const remainingResponses = await Promise.all(remainingPages);
        remainingResponses.forEach((response) => {
          if (response && response.data) {
            allProducts = [...allProducts, ...response.data];
          }
        });
      }
    }

    // Extract unique values for geography and oncology
    const geographySet = new Set();
    const oncologySet = new Set();

    allProducts.forEach((item) => {
      const product = item.attributes || item;
      
      if (product.geography && product.geography.trim() !== '') {
        geographySet.add(product.geography.trim());
      }
      if (product.oncology && product.oncology.trim() !== '') {
        oncologySet.add(product.oncology.trim());
      }
    });

    // Convert to sorted arrays
    const geography = Array.from(geographySet).sort();
    const oncology = Array.from(oncologySet).sort();

    return NextResponse.json({
      geography: geography.map(value => ({ value, label: value })),
      category: categoryOptions, // Use product categories from API
      oncology: oncology.map(value => ({ value, label: value }))
    });
  } catch (error) {
    console.error('Error fetching product filters:', error);
    return NextResponse.json({
      geography: [],
      category: [],
      oncology: []
    }, { status: 200 });
  }
}


import { NextResponse } from 'next/server';
import { fetchAPI } from '@/lib/strapi';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const pageSize = parseInt(searchParams.get('pageSize') || '10');
    const searchTerm = searchParams.get('searchTerm') || '';
    const selectedLetter = searchParams.get('selectedLetter') || '';
    const geography = searchParams.get('geography') || '';
    const category = searchParams.get('category') || '';
    const oncology = searchParams.get('oncology') || '';

    // Check if Strapi URL is configured
    if (!process.env.NEXT_PUBLIC_STRAPI_URL) {
      return NextResponse.json({
        data: [],
        meta: {
          pagination: {
            page: 1,
            pageSize: pageSize,
            pageCount: 0,
            total: 0
          }
        },
        message: 'Strapi not configured'
      });
    }

    // Build filters array
    const filters = [];

    // Filter by search term - search both brand name and active ingredient (name)
    if (searchTerm) {
      // Use $or to search in both fields
      filters.push(`filters[$or][0][brandName][$containsi]=${encodeURIComponent(searchTerm)}`);
      filters.push(`filters[$or][1][name][$containsi]=${encodeURIComponent(searchTerm)}`);
    }

    // Filter by active ingredient (name) starting with letter
    if (selectedLetter) {
      filters.push(`filters[name][$startsWithi]=${encodeURIComponent(selectedLetter)}`);
    }

    // Filter by geography (if field exists in Strapi)
    if (geography) {
      filters.push(`filters[geography][$eq]=${encodeURIComponent(geography)}`);
    }

    // Filter by category (if field exists in Strapi)
    if (category) {
      filters.push(`filters[category][$eq]=${encodeURIComponent(category)}`);
    }

    // Filter by oncology (if field exists in Strapi)
    if (oncology) {
      filters.push(`filters[oncology][$eq]=${encodeURIComponent(oncology)}`);
    }

    // Build query string
    const filterQuery = filters.length > 0 ? `&${filters.join('&')}` : '';
    const queryString = `products?pagination[page]=${page}&pagination[pageSize]=${pageSize}${filterQuery}&sort=brandName:asc`;

    // Fetch products from Strapi
    const data = await fetchAPI(queryString, {
      next: { revalidate: 60 },
    });

    // Map Strapi data to component format
    const products = (data.data || []).map((item) => {
      const product = item.attributes || item;
      return {
        id: item.id || item.documentId,
        documentId: item.documentId,
        brandName: product.brandName || '',
        activeIngredient: product.name || product.activeIngredient || '',
        therapyArea: product.therapyArea || product.category || '',
        form: product.form || '',
        name: product.name || ''
      };
    });

    return NextResponse.json({
      data: products,
      meta: data.meta || {
        pagination: {
          page: page,
          pageSize: pageSize,
          pageCount: 0,
          total: 0
        }
      }
    });
  } catch (error) {
    console.error('Error fetching products from Strapi:', error);
    // Return empty response so component can handle gracefully
    return NextResponse.json({
      data: [],
      meta: {
        pagination: {
          page: 1,
          pageSize: 10,
          pageCount: 0,
          total: 0
        }
      },
      error: 'Strapi API not available'
    }, { status: 200 }); // Return 200 so it doesn't trigger error handling
  }
}


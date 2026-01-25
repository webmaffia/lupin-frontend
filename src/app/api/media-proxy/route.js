import { NextResponse } from 'next/server';

/**
 * Proxy route for Strapi media files
 * This allows HTTP resources to be served over HTTPS in production (Vercel)
 * to avoid mixed content blocking issues
 */
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const url = searchParams.get('url');

    if (!url) {
      return NextResponse.json({ error: 'URL parameter is required' }, { status: 400 });
    }

    // Validate that the URL is from the Strapi server
    const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1380';
    const strapiHost = new URL(strapiUrl).hostname;
    const requestHost = new URL(url).hostname;

    // Only allow requests to the Strapi server
    if (requestHost !== strapiHost && requestHost !== 'localhost' && requestHost !== '127.0.0.1') {
      return NextResponse.json({ error: 'Invalid URL' }, { status: 403 });
    }

    // Fetch the media file from Strapi
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0',
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: `Failed to fetch media: ${response.statusText}` },
        { status: response.status }
      );
    }

    // Get the content type from the response
    const contentType = response.headers.get('content-type') || 'application/octet-stream';

    // Get the file content
    const buffer = await response.arrayBuffer();

    // Return the file with appropriate headers
    return new NextResponse(buffer, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (error) {
    console.error('Error proxying media:', error);
    return NextResponse.json(
      { error: 'Failed to proxy media file' },
      { status: 500 }
    );
  }
}


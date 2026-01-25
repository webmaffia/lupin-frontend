import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const url = searchParams.get('url');

    if (!url) {
      return NextResponse.json(
        { error: 'Missing url parameter' },
        { status: 400 }
      );
    }

    let decodedUrl: string;
    try {
      decodedUrl = decodeURIComponent(url);
    } catch (error) {
      return NextResponse.json(
        { error: 'Invalid URL encoding' },
        { status: 400 }
      );
    }

    let targetUrl: URL;
    try {
      targetUrl = new URL(decodedUrl);
    } catch (error) {
      return NextResponse.json(
        { error: 'Invalid URL format' },
        { status: 400 }
      );
    }

    const response = await fetch(targetUrl.toString(), {
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0',
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: `Failed to fetch image: ${response.status} ${response.statusText}` },
        { status: response.status }
      );
    }

    // Get content type from response or infer from URL
    const contentType = response.headers.get('content-type') || 
      (decodedUrl.toLowerCase().endsWith('.svg') || decodedUrl.toLowerCase().includes('.svg?') 
        ? 'image/svg+xml' 
        : decodedUrl.toLowerCase().match(/\.(jpg|jpeg)$/i) 
        ? 'image/jpeg' 
        : decodedUrl.toLowerCase().match(/\.(png)$/i)
        ? 'image/png'
        : decodedUrl.toLowerCase().match(/\.(webp)$/i)
        ? 'image/webp'
        : 'image/jpeg'); // default

    // For SVG, read as text; for other images, read as array buffer
    const isSvg = contentType.includes('svg');
    const imageData = isSvg ? await response.text() : await response.arrayBuffer();

    if (!imageData || (isSvg && (imageData as string).trim().length === 0)) {
      return NextResponse.json(
        { error: 'Empty image content' },
        { status: 404 }
      );
    }

    return new NextResponse(imageData, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=3600, s-maxage=3600',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET',
      },
    });
  } catch (error) {
    console.error('Image proxy error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}


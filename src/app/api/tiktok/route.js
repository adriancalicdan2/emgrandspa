import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get('url');

  if (!url) {
    return NextResponse.json({ error: 'Missing url parameter' }, { status: 400 });
  }

  try {
    // We fetch the short URL from the server side to resolve redirects and avoid CORS issues.
    const res = await fetch(url, {
      method: 'GET',
      redirect: 'follow',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36'
      }
    });

    const finalUrl = res.url;
    const match = finalUrl.match(/\/video\/(\d+)/);
    const videoId = match ? match[1] : null;

    return NextResponse.json({ finalUrl, videoId });
  } catch (err) {
    console.error('Error resolving TikTok URL:', err);
    return NextResponse.json({ error: 'Failed to resolve URL' }, { status: 500 });
  }
}

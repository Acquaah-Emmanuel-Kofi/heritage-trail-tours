export function getYouTubeEmbedUrl(url?: string | null) {
  if (!url || typeof url !== 'string') {
    return null;
  }

  try {
    const parsedUrl = new URL(url);
    const hostname = parsedUrl.hostname.toLowerCase().replace(/^www\./, '');
    const pathname = parsedUrl.pathname;
    let videoId: string | null = null;

    if (hostname === 'youtu.be') {
      videoId = pathname.slice(1);
    } else if (hostname === 'youtube.com' || hostname === 'youtube-nocookie.com') {
      if (pathname.startsWith('/watch')) {
        videoId = parsedUrl.searchParams.get('v');
      } else if (pathname.startsWith('/embed/')) {
        videoId = pathname.split('/')[2] ?? null;
      } else if (pathname.startsWith('/shorts/')) {
        videoId = pathname.split('/')[2] ?? null;
      } else if (pathname.startsWith('/v/')) {
        videoId = pathname.split('/')[2] ?? null;
      }
    }

    if (!videoId) {
      const candidate = pathname.split('/').filter(Boolean).pop();
      videoId = candidate || null;
    }

    videoId = (videoId || '').split('?')[0].split('&')[0];

    if (!videoId || !/^[A-Za-z0-9_-]{11,}$/.test(videoId)) {
      return null;
    }

    return `https://www.youtube.com/embed/${videoId}`;
  } catch {
    return null;
  }
}

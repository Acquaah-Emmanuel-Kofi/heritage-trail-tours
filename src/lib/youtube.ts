export function getYouTubeEmbedUrl(url?: string) {
  if (!url || typeof url !== 'string') {
    return undefined;
  }

  try {
    const parsedUrl = new URL(url);
    const hostname = parsedUrl.hostname.toLowerCase().replace(/^www\./, '');
    const pathname = parsedUrl.pathname;

    let videoId: string | undefined;

    if (hostname === 'youtu.be') {
      videoId = pathname.slice(1);
    } else if (
      hostname === 'youtube.com' ||
      hostname === 'youtube-nocookie.com'
    ) {
      if (pathname.startsWith('/watch')) {
        videoId = parsedUrl.searchParams.get('v') || undefined;
      } else if (
        pathname.startsWith('/embed/') ||
        pathname.startsWith('/shorts/') ||
        pathname.startsWith('/v/')
      ) {
        videoId = pathname.split('/')[2];
      }
    }

    if (!videoId) {
      const candidate = pathname.split('/').filter(Boolean).pop();
      videoId = candidate || undefined;
    }

    videoId = videoId?.split('?')[0].split('&')[0];

    if (!videoId || !/^[A-Za-z0-9_-]{11,}$/.test(videoId)) {
      return undefined;
    }

    return `https://www.youtube.com/embed/${videoId}`;
  } catch {
    return undefined;
  }
}
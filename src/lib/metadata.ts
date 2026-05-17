import type { Metadata } from 'next';

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://heritage-trail-tours.vercel.app';
const siteName = 'Heritage Trail Tours';

export async function generateMetadata({
  title,
  description,
  path = '',
  image,
  noindex = false,
}: {
  title: string;
  description: string;
  path?: string;
  image?: string;
  noindex?: boolean;
}): Promise<Metadata> {
  const url = `${baseUrl}${path}`;
  const ogImage = image || `${baseUrl}/og-image.jpg`;

  return {
    metadataBase: new URL(baseUrl),
    title: `${title} | ${siteName}`,
    description,
    robots: noindex ? { index: false, follow: false } : { index: true, follow: true },
    keywords: ['heritage tours', 'African culture', 'cultural tourism', 'authentic travel', 'heritage experiences'],
    authors: [{ name: 'Heritage Trail Tours' }],
    creator: 'Heritage Trail Tours',
    publisher: 'Heritage Trail Tours',
    openGraph: {
      title: `${title} | ${siteName}`,
      description,
      url,
      type: 'website',
      siteName,
      locale: 'en_US',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
          type: 'image/jpeg',
        },
        {
          url: ogImage,
          width: 800,
          height: 600,
          alt: title,
          type: 'image/jpeg',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | ${siteName}`,
      description,
      images: [ogImage],
      creator: '@saljays',
    },
    // add meta tag for inStagram, Facebook, LinkedIn, TikTok, etc. 
    alternates: {
      canonical: url,
    }
    }
}

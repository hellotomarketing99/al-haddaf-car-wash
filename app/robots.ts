import { MetadataRoute } from 'next';
import { getSiteSettings } from '@/actions/settings-actions';

export default async function robots(): Promise<MetadataRoute.Robots> {
  const settings = await getSiteSettings();
  const baseUrl = settings.seo.canonicalUrl || 'https://alhaddafcarwash.ae';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/api/'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}

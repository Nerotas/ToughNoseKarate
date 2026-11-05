import type { MetadataRoute } from 'next';
import { publicPages, SITE_URL } from './(DashboardLayout)/metadata';

export default function sitemap(): MetadataRoute.Sitemap {
  return Object.keys(publicPages).map((path) => ({
    url: new URL(path, SITE_URL).href,
  }));
}

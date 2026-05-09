import { getAllPageSeo } from '@/actions/seo-actions';
import { STATIC_PAGES } from '@/lib/seo-constants';
import { SeoManager } from '@/components/admin/seo-manager';
import prisma from '@/lib/db';
import { Search } from 'lucide-react';

export const metadata = { title: 'SEO Manager | Admin' };

export default async function SeoAdminPage() {
  const [allPageSeo, serviceCount, areaCount, postCount] = await Promise.all([
    getAllPageSeo(),
    prisma.service.count(),
    prisma.area.count(),
    prisma.post.count(),
  ]);

  // Build a map of pageKey → seo row for quick lookup
  const pageSeoMap: Record<string, any> = {};
  for (const page of STATIC_PAGES) {
    pageSeoMap[page.key] = allPageSeo.find(r => r.pageKey === page.key) || null;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
          <Search className="w-5 h-5" />
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">SEO Manager</h1>
          <p className="text-sm text-gray-500">
            Manage meta tags, Open Graph, Twitter Cards, schema markup, and focus keywords for every page.
          </p>
        </div>
      </div>

      <SeoManager
        pageSeoMap={pageSeoMap}
        dynamicCounts={{ services: serviceCount, areas: areaCount, posts: postCount }}
      />
    </div>
  );
}

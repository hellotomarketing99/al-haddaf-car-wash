'use client';

import { useState } from 'react';
import { SeoEditor } from '@/components/admin/seo-editor';
import { STATIC_PAGES, type PageSeoData } from '@/lib/seo-constants';
import { CheckCircle2, AlertCircle, XCircle, ChevronRight, Globe, Search, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface SeoManagerProps {
  pageSeoMap: Record<string, PageSeoData | null>;
  dynamicCounts: { services: number; areas: number; posts: number };
}

function SeoScore({ seo }: { seo: PageSeoData | null }) {
  if (!seo) return (
    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-red-500 bg-red-50 px-2.5 py-1 rounded-full">
      <XCircle className="w-3.5 h-3.5" /> Not configured
    </span>
  );

  const hasTitle = !!seo.metaTitle;
  const hasDesc = !!seo.metaDescription;
  const hasKeyword = !!seo.focusKeyword;
  const hasOg = !!seo.ogTitle || !!seo.ogDescription;
  const hasSchema = !!seo.schemaMarkup;
  const score = [hasTitle, hasDesc, hasKeyword, hasOg, hasSchema].filter(Boolean).length;

  if (score >= 4) return (
    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
      <CheckCircle2 className="w-3.5 h-3.5" /> Good ({score}/5)
    </span>
  );
  if (score >= 2) return (
    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full">
      <AlertCircle className="w-3.5 h-3.5" /> Needs work ({score}/5)
    </span>
  );
  return (
    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-red-500 bg-red-50 px-2.5 py-1 rounded-full">
      <XCircle className="w-3.5 h-3.5" /> Incomplete ({score}/5)
    </span>
  );
}

export function SeoManager({ pageSeoMap, dynamicCounts }: SeoManagerProps) {
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [editingLabel, setEditingLabel] = useState<string>('');

  if (editingKey) {
    return (
      <SeoEditor
        pageSeo={pageSeoMap[editingKey] || null}
        pageKey={editingKey}
        pageLabel={editingLabel}
        onBack={() => setEditingKey(null)}
      />
    );
  }

  const configured = Object.values(pageSeoMap).filter(Boolean).length;
  const total = STATIC_PAGES.length;

  return (
    <div className="space-y-6">
      {/* Summary Bar */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Pages Configured', value: `${configured}/${total}`, sub: 'Static pages with SEO', color: 'text-primary', bg: 'bg-primary/5' },
          { label: 'Dynamic Pages', value: dynamicCounts.services + dynamicCounts.areas + dynamicCounts.posts, sub: 'Services + Areas + Posts', color: 'text-purple-600', bg: 'bg-purple-50' },
          { label: 'SEO Coverage', value: `${Math.round((configured / total) * 100)}%`, sub: 'Static pages configured', color: 'text-emerald-600', bg: 'bg-emerald-50' },
        ].map(stat => (
          <div key={stat.label} className={cn("rounded-xl p-5 border border-border", stat.bg)}>
            <p className={cn("text-3xl font-black", stat.color)}>{stat.value}</p>
            <p className="font-bold text-sm mt-1">{stat.label}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{stat.sub}</p>
          </div>
        ))}
      </div>

      {/* Static Pages */}
      <div className="bg-white rounded-xl border border-border shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-border bg-gray-50 flex items-center gap-2">
          <Globe className="w-4 h-4 text-primary" />
          <h3 className="font-bold">Static Pages</h3>
          <span className="text-xs text-muted-foreground ml-auto">Click a page to edit its SEO</span>
        </div>
        <div className="divide-y divide-border">
          {STATIC_PAGES.map((page) => {
            const seo = pageSeoMap[page.key];
            return (
              <button
                key={page.key}
                onClick={() => { setEditingKey(page.key); setEditingLabel(page.label); }}
                className="w-full flex items-center gap-4 px-6 py-4 hover:bg-gray-50 transition-colors group text-left"
              >
                <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Search className="w-4 h-4 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-sm">{page.label}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{page.path}</p>
                  {seo?.metaTitle && <p className="text-xs text-gray-500 mt-1 truncate italic">"{seo.metaTitle}"</p>}
                </div>
                <div className="flex items-center gap-3">
                  <SeoScore seo={seo} />
                  <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Dynamic Pages */}
      <div className="bg-white rounded-xl border border-border shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-border bg-gray-50 flex items-center gap-2">
          <ExternalLink className="w-4 h-4 text-primary" />
          <h3 className="font-bold">Dynamic Pages</h3>
          <span className="text-xs text-muted-foreground ml-auto">SEO is managed in each item's edit form</span>
        </div>
        <div className="divide-y divide-border">
          {[
            { label: 'Service Pages', sub: `${dynamicCounts.services} services — SEO configured per service`, href: '/admin/services', count: dynamicCounts.services },
            { label: 'Area Pages', sub: `${dynamicCounts.areas} areas — SEO configured per area`, href: '/admin/areas', count: dynamicCounts.areas },
            { label: 'Blog Posts', sub: `${dynamicCounts.posts} posts — SEO configured per post`, href: '/admin/blogs', count: dynamicCounts.posts },
          ].map((item) => (
            <Link key={item.href} href={item.href}
              className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50 transition-colors group"
            >
              <div className="h-10 w-10 rounded-xl bg-purple-50 flex items-center justify-center flex-shrink-0">
                <ExternalLink className="w-4 h-4 text-purple-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-sm">{item.label}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{item.sub}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-purple-600 bg-purple-50 px-2.5 py-1 rounded-full">{item.count} pages</span>
                <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Checklist */}
      <div className="bg-white rounded-xl border border-border shadow-sm p-6">
        <h3 className="font-bold mb-4 flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary" /> SEO Checklist</h3>
        <div className="grid sm:grid-cols-2 gap-2">
          {[
            { label: 'Set meta title on all static pages', done: configured >= total },
            { label: 'Add meta descriptions (150–160 chars)', done: Object.values(pageSeoMap).filter(s => s?.metaDescription && s.metaDescription.length > 100).length > 0 },
            { label: 'Set focus keywords for target pages', done: Object.values(pageSeoMap).some(s => s?.focusKeyword) },
            { label: 'Configure Open Graph for homepage', done: !!(pageSeoMap['page:home']?.ogTitle || pageSeoMap['page:home']?.metaTitle) },
            { label: 'Add schema markup to homepage', done: !!pageSeoMap['page:home']?.schemaMarkup },
            { label: 'Configure Google Analytics (Site Settings)', done: false },
            { label: 'Submit sitemap to Google Search Console', done: false },
          ].map(({ label, done }) => (
            <div key={label} className={cn("flex items-center gap-2.5 text-sm", done ? "text-emerald-700" : "text-gray-500")}>
              {done ? <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" /> : <div className="w-4 h-4 rounded-full border-2 border-gray-300 flex-shrink-0" />}
              {label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

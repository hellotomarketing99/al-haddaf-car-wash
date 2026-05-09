'use server';

import prisma from '@/lib/db';
import { revalidatePath } from 'next/cache';

import { STATIC_PAGES, type PageSeoData } from '@/lib/seo-constants';


export async function getAllPageSeo() {
  const rows = await prisma.pageSeo.findMany({ orderBy: { pageKey: 'asc' } });
  return rows;
}

export async function getPageSeo(pageKey: string): Promise<PageSeoData | null> {
  const row = await prisma.pageSeo.findUnique({ where: { pageKey } });
  return row;
}

export async function savePageSeo(data: PageSeoData) {
  try {
    await prisma.pageSeo.upsert({
      where: { pageKey: data.pageKey },
      update: {
        pageLabel: data.pageLabel,
        metaTitle: data.metaTitle || null,
        metaDescription: data.metaDescription || null,
        canonicalUrl: data.canonicalUrl || null,
        focusKeyword: data.focusKeyword || null,
        ogTitle: data.ogTitle || null,
        ogDescription: data.ogDescription || null,
        ogImage: data.ogImage || null,
        ogType: data.ogType || 'website',
        twitterCard: data.twitterCard || 'summary_large_image',
        twitterTitle: data.twitterTitle || null,
        twitterDescription: data.twitterDescription || null,
        twitterImage: data.twitterImage || null,
        noIndex: data.noIndex ?? false,
        noFollow: data.noFollow ?? false,
        schemaMarkup: data.schemaMarkup || null,
      },
      create: {
        pageKey: data.pageKey,
        pageLabel: data.pageLabel,
        metaTitle: data.metaTitle || null,
        metaDescription: data.metaDescription || null,
        canonicalUrl: data.canonicalUrl || null,
        focusKeyword: data.focusKeyword || null,
        ogTitle: data.ogTitle || null,
        ogDescription: data.ogDescription || null,
        ogImage: data.ogImage || null,
        ogType: data.ogType || 'website',
        twitterCard: data.twitterCard || 'summary_large_image',
        twitterTitle: data.twitterTitle || null,
        twitterDescription: data.twitterDescription || null,
        twitterImage: data.twitterImage || null,
        noIndex: data.noIndex ?? false,
        noFollow: data.noFollow ?? false,
        schemaMarkup: data.schemaMarkup || null,
      },
    });
    revalidatePath('/');
    revalidatePath('/admin/seo');
    return { success: true };
  } catch (error) {
    console.error('SEO save error:', error);
    return { success: false, error: 'Failed to save SEO data' };
  }
}

// For entity-level SEO (Service, Area, Post)
export async function saveEntitySeo(
  entity: 'service' | 'area' | 'post',
  id: string,
  seoData: { focusKeyword?: string; schemaMarkup?: string; metaTitle?: string; metaDescription?: string; canonicalUrl?: string }
) {
  try {
    if (entity === 'service') {
      await prisma.service.update({ where: { id }, data: seoData });
      revalidatePath('/services');
    } else if (entity === 'area') {
      await prisma.area.update({ where: { id }, data: seoData });
      revalidatePath('/areas');
    } else if (entity === 'post') {
      await prisma.post.update({ where: { id }, data: seoData });
      revalidatePath('/blogs');
    }
    return { success: true };
  } catch {
    return { success: false, error: 'Failed to save entity SEO' };
  }
}

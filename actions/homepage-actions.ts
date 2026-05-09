'use server';

import prisma from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { HOMEPAGE_DEFAULTS, type SectionKey } from '@/data/homepage-defaults';

export async function getHomepageSettings() {
  const keys = Object.keys(HOMEPAGE_DEFAULTS) as SectionKey[];

  const settings = await prisma.siteSetting.findMany({
    where: { key: { in: keys as string[] } },
  });

  // Deep-merge DB values over defaults so missing keys always have a fallback
  const result: Record<string, any> = {};
  for (const key of keys) {
    const row = settings.find((s) => s.key === key);
    if (row) {
      try {
        result[key] = { ...HOMEPAGE_DEFAULTS[key], ...JSON.parse(row.value) };
      } catch {
        result[key] = HOMEPAGE_DEFAULTS[key];
      }
    } else {
      result[key] = HOMEPAGE_DEFAULTS[key];
    }
  }

  return result as typeof HOMEPAGE_DEFAULTS;
}

export async function saveHomepageSection(key: SectionKey, value: any) {
  try {
    await prisma.siteSetting.upsert({
      where: { key },
      update: { value: JSON.stringify(value) },
      create: { key, value: JSON.stringify(value) },
    });
    revalidatePath('/');
    revalidatePath('/admin/homepage');
    return { success: true };
  } catch (error) {
    console.error('Error saving setting:', error);
    return { success: false, error: 'Failed to save settings' };
  }
}

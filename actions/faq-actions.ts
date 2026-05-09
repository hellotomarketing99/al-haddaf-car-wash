'use server';

import prisma from '@/lib/db';
import { revalidatePath } from 'next/cache';

// --- FAQs ---

export async function getAdminFaqs() {
  return await prisma.faq.findMany({
    orderBy: { order: 'asc' },
    include: { category: true }
  });
}

export async function reorderFaqs(items: { id: string; order: number }[]) {
  try {
    await prisma.$transaction(
      items.map((item) =>
        prisma.faq.update({
          where: { id: item.id },
          data: { order: item.order },
        })
      )
    );
    revalidatePath('/admin/faqs');
    revalidatePath('/');
    return { success: true };
  } catch (error) {
    return { success: false, error: 'Failed to reorder FAQs' };
  }
}

export async function toggleFaqPublish(id: string, isPublished: boolean) {
  try {
    await prisma.faq.update({ where: { id }, data: { isPublished } });
    revalidatePath('/admin/faqs');
    revalidatePath('/');
    return { success: true };
  } catch (error) {
    return { success: false, error: 'Failed to update publish status' };
  }
}

export async function deleteFaq(id: string) {
  try {
    await prisma.faq.delete({ where: { id } });
    revalidatePath('/admin/faqs');
    revalidatePath('/');
    return { success: true };
  } catch (error) {
    return { success: false, error: 'Failed to delete FAQ' };
  }
}

export async function saveFaq(formData: FormData) {
  try {
    const id = formData.get('id') as string | null;
    const question = formData.get('question') as string;
    const answer = formData.get('answer') as string;
    const categoryName = formData.get('category') as string;

    let categoryId = null;
    if (categoryName) {
      const category = await prisma.faqCategory.upsert({
        where: { name: categoryName },
        update: {},
        create: { name: categoryName }
      });
      categoryId = category.id;
    }

    if (id) {
      await prisma.faq.update({
        where: { id },
        data: { question, answer, categoryId },
      });
    } else {
      const maxOrder = await prisma.faq.aggregate({ _max: { order: true } });
      const nextOrder = (maxOrder._max.order || 0) + 1;

      await prisma.faq.create({
        data: { question, answer, categoryId, order: nextOrder, isPublished: true },
      });
    }

    revalidatePath('/admin/faqs');
    revalidatePath('/');
    return { success: true };
  } catch (error) {
    console.error('Error saving FAQ:', error);
    return { success: false, error: 'Failed to save FAQ' };
  }
}

// --- Categories ---

export async function getFaqCategories() {
  return await prisma.faqCategory.findMany({
    orderBy: { order: 'asc' },
  });
}

export async function saveFaqCategory(name: string, id?: string) {
  try {
    if (id) {
      await prisma.faqCategory.update({ where: { id }, data: { name } });
    } else {
      const maxOrder = await prisma.faqCategory.aggregate({ _max: { order: true } });
      await prisma.faqCategory.create({ data: { name, order: (maxOrder._max.order || 0) + 1 } });
    }
    revalidatePath('/admin/faqs');
    revalidatePath('/');
    return { success: true };
  } catch (error) {
    return { success: false, error: 'Failed to save category' };
  }
}

export async function deleteFaqCategory(id: string) {
  try {
    await prisma.faqCategory.delete({ where: { id } });
    revalidatePath('/admin/faqs');
    revalidatePath('/');
    return { success: true };
  } catch (error) {
    return { success: false, error: 'Failed to delete category (make sure no FAQs use it)' };
  }
}

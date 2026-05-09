import { FaqForm } from '@/components/admin/faq-form';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import prisma from '@/lib/db';
import { notFound } from 'next/navigation';

export const metadata = {
  title: 'Edit FAQ | Admin',
};

export default async function EditFaqPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const faq = await prisma.faq.findUnique({
    where: { id },
    include: { category: true }
  });

  if (!faq) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/faqs" className="text-gray-500 hover:text-gray-900 transition-colors">
          <ChevronLeft className="w-6 h-6" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Edit FAQ</h1>
          <p className="text-gray-500">Update the question and answer.</p>
        </div>
      </div>

      <FaqForm initialData={faq} />
    </div>
  );
}

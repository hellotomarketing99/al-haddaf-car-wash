import { ReviewForm } from '@/components/admin/review-form';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import prisma from '@/lib/db';
import { notFound } from 'next/navigation';

export const metadata = {
  title: 'Edit Review | Admin',
};

export default async function EditReviewPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const review = await prisma.review.findUnique({
    where: { id },
  });

  if (!review) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/reviews" className="text-gray-500 hover:text-gray-900 transition-colors">
          <ChevronLeft className="w-6 h-6" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Edit Review</h1>
          <p className="text-gray-500">Update customer review details.</p>
        </div>
      </div>

      <ReviewForm initialData={review} />
    </div>
  );
}

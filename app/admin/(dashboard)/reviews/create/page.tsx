import { ReviewForm } from '@/components/admin/review-form';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

export const metadata = {
  title: 'Add Review | Admin',
};

export default function CreateReviewPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/reviews" className="text-gray-500 hover:text-gray-900 transition-colors">
          <ChevronLeft className="w-6 h-6" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Add Review</h1>
          <p className="text-gray-500">Manually add a customer review.</p>
        </div>
      </div>

      <ReviewForm />
    </div>
  );
}

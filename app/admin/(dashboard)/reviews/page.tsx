import { getAdminReviews } from '@/actions/review-actions';
import { SortableReviewTable } from '@/components/admin/sortable-review-table';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Manage Reviews | Admin',
};

export default async function ReviewsAdminPage() {
  const reviews = await getAdminReviews();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Customer Reviews</h1>
          <p className="text-gray-500">Manage what your customers say about you.</p>
        </div>
        <Link href="/admin/reviews/create">
          <Button>
            <Plus className="w-4 h-4 mr-2" /> Add Review
          </Button>
        </Link>
      </div>

      <SortableReviewTable initialReviews={reviews as any} />
    </div>
  );
}

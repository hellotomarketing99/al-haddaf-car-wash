import { getAdminFaqs } from '@/actions/faq-actions';
import { SortableFaqTable } from '@/components/admin/sortable-faq-table';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Manage FAQs | Admin',
};

export default async function FaqsAdminPage() {
  const faqs = await getAdminFaqs();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Frequently Asked Questions</h1>
          <p className="text-gray-500">Manage FAQs and their categories.</p>
        </div>
        <Link href="/admin/faqs/create">
          <Button>
            <Plus className="w-4 h-4 mr-2" /> Add FAQ
          </Button>
        </Link>
      </div>

      <SortableFaqTable initialFaqs={faqs as any} />
    </div>
  );
}

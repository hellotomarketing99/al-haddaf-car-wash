import { FaqForm } from '@/components/admin/faq-form';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

export const metadata = {
  title: 'Add FAQ | Admin',
};

export default function CreateFaqPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/faqs" className="text-gray-500 hover:text-gray-900 transition-colors">
          <ChevronLeft className="w-6 h-6" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Add FAQ</h1>
          <p className="text-gray-500">Create a new frequently asked question.</p>
        </div>
      </div>

      <FaqForm />
    </div>
  );
}

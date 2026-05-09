import { AreaForm } from '@/components/admin/area-form';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

export const metadata = {
  title: 'Create Area | Admin',
};

export default function CreateAreaPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/areas" className="text-gray-500 hover:text-gray-900 transition-colors">
          <ChevronLeft className="w-6 h-6" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Create Area</h1>
          <p className="text-gray-500">Add a new service area offering.</p>
        </div>
      </div>

      <AreaForm />
    </div>
  );
}

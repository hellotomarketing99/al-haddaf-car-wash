import { ServiceForm } from '@/components/admin/service-form';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

export const metadata = {
  title: 'Create Service | Admin',
};

export default function CreateServicePage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/services" className="text-gray-500 hover:text-gray-900 transition-colors">
          <ChevronLeft className="w-6 h-6" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Create Service</h1>
          <p className="text-gray-500">Add a new car wash service offering.</p>
        </div>
      </div>

      <ServiceForm />
    </div>
  );
}

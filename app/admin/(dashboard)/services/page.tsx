import { getAdminServices } from '@/actions/service-actions';
import { SortableServiceTable } from '@/components/admin/sortable-service-table';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Manage Services | Admin',
};

export default async function ServicesAdminPage() {
  const services = await getAdminServices();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Services</h1>
          <p className="text-gray-500">Manage your car wash services, pricing, and visibility.</p>
        </div>
        <Link href="/admin/services/create">
          <Button>
            <Plus className="w-4 h-4 mr-2" /> Add Service
          </Button>
        </Link>
      </div>

      <SortableServiceTable initialServices={services as any} />
    </div>
  );
}

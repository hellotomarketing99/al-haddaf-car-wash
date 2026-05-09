import { getAdminAreas } from '@/actions/area-actions';
import { SortableAreaTable } from '@/components/admin/sortable-area-table';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Manage Areas | Admin',
};

export default async function AreasAdminPage() {
  const areas = await getAdminAreas();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Service Areas</h1>
          <p className="text-gray-500">Manage areas where you provide car wash services.</p>
        </div>
        <Link href="/admin/areas/create">
          <Button>
            <Plus className="w-4 h-4 mr-2" /> Add Area
          </Button>
        </Link>
      </div>

      <SortableAreaTable initialAreas={areas as any} />
    </div>
  );
}

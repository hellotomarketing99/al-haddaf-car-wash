import { AreaForm } from '@/components/admin/area-form';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import prisma from '@/lib/db';
import { notFound } from 'next/navigation';

export const metadata = {
  title: 'Edit Area | Admin',
};

export default async function EditAreaPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const area = await prisma.area.findUnique({
    where: { id },
  });

  if (!area) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/areas" className="text-gray-500 hover:text-gray-900 transition-colors">
          <ChevronLeft className="w-6 h-6" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Edit Area</h1>
          <p className="text-gray-500">Update the details for "{area.title}".</p>
        </div>
      </div>

      <AreaForm initialData={area} />
    </div>
  );
}

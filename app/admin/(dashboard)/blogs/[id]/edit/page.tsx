import { BlogForm } from '@/components/admin/blog-form';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import prisma from '@/lib/db';
import { notFound } from 'next/navigation';

export const metadata = {
  title: 'Edit Post | Admin',
};

export default async function EditBlogPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = await prisma.post.findUnique({
    where: { id },
    include: { category: true, tags: true },
  });

  if (!post) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/blogs" className="text-gray-500 hover:text-gray-900 transition-colors">
          <ChevronLeft className="w-6 h-6" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Edit Post</h1>
          <p className="text-gray-500">Update "{post.title}".</p>
        </div>
      </div>

      <BlogForm initialData={post} />
    </div>
  );
}

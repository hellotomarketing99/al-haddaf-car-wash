import { getAdminBlogs } from '@/actions/blog-actions';
import { BlogTable } from '@/components/admin/blog-table';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Manage Blogs | Admin',
};

export default async function BlogsAdminPage() {
  const blogs = await getAdminBlogs();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Blog Posts</h1>
          <p className="text-gray-500">Write, edit, and manage your articles.</p>
        </div>
        <Link href="/admin/blogs/create">
          <Button>
            <Plus className="w-4 h-4 mr-2" /> Write a Post
          </Button>
        </Link>
      </div>

      <BlogTable initialBlogs={blogs as any} />
    </div>
  );
}

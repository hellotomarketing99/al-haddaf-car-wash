import { BlogForm } from '@/components/admin/blog-form';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

export const metadata = {
  title: 'Write a Post | Admin',
};

export default function CreateBlogPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/blogs" className="text-gray-500 hover:text-gray-900 transition-colors">
          <ChevronLeft className="w-6 h-6" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Write a Post</h1>
          <p className="text-gray-500">Create a new article for your readers.</p>
        </div>
      </div>

      <BlogForm />
    </div>
  );
}

import { getHomepageSettings } from '@/actions/homepage-actions';
import { HomepageEditor } from '@/components/admin/homepage-editor';

export const metadata = {
  title: 'Homepage CMS | Admin',
};

export default async function HomepageAdminPage() {
  const settings = await getHomepageSettings();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Homepage CMS</h1>
        <p className="text-gray-500">
          Control every section of the homepage. Changes are applied instantly to the live site.
        </p>
      </div>

      <div className="rounded-lg bg-amber-50 border border-amber-200 px-4 py-3 text-sm text-amber-800">
        💡 <strong>Tip:</strong> Use the eye icon on each section to show or hide it from the homepage. Click "Save Changes" on each section individually.
      </div>

      <HomepageEditor settings={settings} />
    </div>
  );
}

import { getSiteSettings } from '@/actions/settings-actions';
import { SiteSettingsEditor } from '@/components/admin/site-settings-editor';
import { Settings2 } from 'lucide-react';

export const metadata = { title: 'Site Settings | Admin' };

export default async function SettingsPage() {
  const settings = await getSiteSettings();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
          <Settings2 className="w-5 h-5" />
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Site Settings</h1>
          <p className="text-sm text-gray-500">
            Manage global settings. Changes apply instantly across the live site.
          </p>
        </div>
      </div>

      <SiteSettingsEditor settings={settings} />
    </div>
  );
}

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import dynamic from 'next/dynamic';
const ImageUpload = dynamic(() => import('./image-upload').then(m => m.ImageUpload), { ssr: false });
const RichTextEditor = dynamic(() => import('./rich-text-editor').then(m => m.RichTextEditor), { ssr: false });
import { saveService } from '@/actions/service-actions';
import { Plus, X } from 'lucide-react';

interface ServiceFormProps {
  initialData?: any;
}

export function ServiceForm({ initialData }: ServiceFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [features, setFeatures] = useState<string[]>(initialData?.features || ['']);
  const [benefits, setBenefits] = useState<string[]>(initialData?.benefits || ['']);
  const [fullDescription, setFullDescription] = useState(initialData?.fullDescription || '');

  const handleArrayChange = (setter: any, items: string[], index: number, value: string) => {
    const newItems = [...items];
    newItems[index] = value;
    setter(newItems);
  };

  const addArrayItem = (setter: any, items: string[]) => {
    setter([...items, '']);
  };

  const removeArrayItem = (setter: any, items: string[], index: number) => {
    setter(items.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const formData = new FormData(e.currentTarget);
    formData.set('fullDescription', fullDescription);
    formData.set('features', JSON.stringify(features.filter(f => f.trim() !== '')));
    formData.set('benefits', JSON.stringify(benefits.filter(b => b.trim() !== '')));

    if (initialData?.id) {
      formData.set('id', initialData.id);
    }

    const result = await saveService(formData);

    if (result.success) {
      router.push('/admin/services');
    } else {
      setError(result.error || 'Failed to save service');
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl bg-white p-6 rounded-lg shadow-sm">
      {error && <div className="p-3 bg-red-100 text-red-600 rounded-md">{error}</div>}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Title *</label>
            <Input name="title" defaultValue={initialData?.title} required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Slug</label>
            <Input name="slug" defaultValue={initialData?.slug} placeholder="auto-generated-if-empty" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Price (AED) *</label>
              <Input type="number" step="0.01" name="price" defaultValue={initialData?.price} required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Duration *</label>
              <Input name="duration" defaultValue={initialData?.duration} placeholder="e.g. 45 mins" required />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Short Description *</label>
            <Textarea name="shortDescription" defaultValue={initialData?.shortDescription} required rows={3} />
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Service Image</label>
            <ImageUpload 
              value={initialData?.image || ''} 
              onChange={() => {}} // Form input file handles state inherently
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <label className="block text-sm font-medium mb-1">Full Description</label>
        <RichTextEditor value={fullDescription} onChange={setFullDescription} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-2">Features</label>
          <div className="space-y-2">
            {features.map((feature, i) => (
              <div key={i} className="flex gap-2">
                <Input value={feature} onChange={(e) => handleArrayChange(setFeatures, features, i, e.target.value)} placeholder="Feature..." />
                <Button type="button" variant="ghost" size="icon" onClick={() => removeArrayItem(setFeatures, features, i)}>
                  <X className="w-4 h-4 text-red-500" />
                </Button>
              </div>
            ))}
            <Button type="button" variant="outline" size="sm" onClick={() => addArrayItem(setFeatures, features)}>
              <Plus className="w-4 h-4 mr-2" /> Add Feature
            </Button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Benefits</label>
          <div className="space-y-2">
            {benefits.map((benefit, i) => (
              <div key={i} className="flex gap-2">
                <Input value={benefit} onChange={(e) => handleArrayChange(setBenefits, benefits, i, e.target.value)} placeholder="Benefit..." />
                <Button type="button" variant="ghost" size="icon" onClick={() => removeArrayItem(setBenefits, benefits, i)}>
                  <X className="w-4 h-4 text-red-500" />
                </Button>
              </div>
            ))}
            <Button type="button" variant="outline" size="sm" onClick={() => addArrayItem(setBenefits, benefits)}>
              <Plus className="w-4 h-4 mr-2" /> Add Benefit
            </Button>
          </div>
        </div>
      </div>

      <div className="border-t pt-6 space-y-4">
        <h3 className="font-semibold text-lg">SEO Metadata</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-1">Meta Title</label>
            <Input name="metaTitle" defaultValue={initialData?.metaTitle} placeholder="SEO Title" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Meta Description</label>
            <Textarea name="metaDescription" defaultValue={initialData?.metaDescription} placeholder="SEO Description" rows={2} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Focus Keyword</label>
            <Input name="focusKeyword" defaultValue={initialData?.focusKeyword} placeholder="Primary keyword" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Schema Markup (JSON-LD)</label>
            <Textarea name="schemaMarkup" defaultValue={initialData?.schemaMarkup} placeholder='{"@context": "https://schema.org", ...}' rows={3} className="font-mono text-xs" />
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-4 pt-6">
        <Button type="button" variant="outline" onClick={() => router.push('/admin/services')} disabled={loading}>
          Cancel
        </Button>
        <Button type="submit" disabled={loading}>
          {loading ? 'Saving...' : initialData ? 'Update Service' : 'Create Service'}
        </Button>
      </div>
    </form>
  );
}

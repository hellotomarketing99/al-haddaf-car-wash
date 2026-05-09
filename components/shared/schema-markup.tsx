/**
 * SchemaMarkup — renders JSON-LD structured data in a <script> tag.
 * Use this in any page that has a schemaMarkup string from the DB.
 *
 * Usage:
 *   import { SchemaMarkup } from '@/components/shared/schema-markup'
 *   <SchemaMarkup json={service.schemaMarkup} />
 */
export function SchemaMarkup({ json }: { json?: string | null }) {
  if (!json) return null;
  try {
    JSON.parse(json); // validate before rendering
    return (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: json }}
      />
    );
  } catch {
    return null;
  }
}

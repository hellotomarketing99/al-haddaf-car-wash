import { generatePageMetadata } from '@/lib/seo';
import { SchemaMarkup } from '@/components/shared/schema-markup';
import { getPageSeo } from '@/actions/seo-actions';
import { Badge } from '@/components/ui/badge';

export const generateMetadata = () => generatePageMetadata('page:privacy');

export default async function PrivacyPage() {
  const pageSeo = await getPageSeo('page:privacy');

  return (
    <div className="min-h-screen pt-32 pb-24 bg-white">
      <SchemaMarkup json={pageSeo?.schemaMarkup} />
      <div className="container-premium max-w-4xl">
        <div className="mb-12">
          <Badge variant="outline" className="mb-4">Legal</Badge>
          <h1 className="text-4xl md:text-5xl font-black text-primary uppercase tracking-tighter mb-4">
            Privacy Policy
          </h1>
          <p className="text-muted-foreground italic">Last updated: May 9, 2026</p>
        </div>

        <div className="prose prose-lg max-w-none prose-headings:text-primary prose-headings:font-bold">
          <h2>1. Introduction</h2>
          <p>
            At Al Haddaf Car Wash, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your personal information when you use our website and mobile car wash services in Dubai.
          </p>

          <h2>2. Information We Collect</h2>
          <p>
            We collect information that you provide directly to us when booking a service, including your name, email address, phone number, vehicle details, and service location.
          </p>

          <h2>3. How We Use Your Information</h2>
          <p>
            We use your information to provide and improve our services, process your bookings, communicate with you about your appointments, and send you promotional offers if you have opted in.
          </p>

          <h2>4. Data Security</h2>
          <p>
            We implement industry-standard security measures to protect your personal data from unauthorized access, alteration, or destruction.
          </p>

          <h2>5. Cookies</h2>
          <p>
            Our website uses cookies to enhance your browsing experience and analyze site traffic. You can manage your cookie preferences through your browser settings.
          </p>

          <h2>6. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at info@alhaddafcarwash.ae.
          </p>
        </div>
      </div>
    </div>
  );
}

import { generatePageMetadata } from '@/lib/seo';
import { SchemaMarkup } from '@/components/shared/schema-markup';
import { getPageSeo } from '@/actions/seo-actions';
import { Badge } from '@/components/ui/badge';

export const generateMetadata = () => generatePageMetadata('page:terms');

export default async function TermsPage() {
  const pageSeo = await getPageSeo('page:terms');

  return (
    <div className="min-h-screen pt-32 pb-24 bg-white">
      <SchemaMarkup json={pageSeo?.schemaMarkup} />
      <div className="container-premium max-w-4xl">
        <div className="mb-12">
          <Badge variant="outline" className="mb-4">Legal</Badge>
          <h1 className="text-4xl md:text-5xl font-black text-primary uppercase tracking-tighter mb-4">
            Terms of Service
          </h1>
          <p className="text-muted-foreground italic">Last updated: May 9, 2026</p>
        </div>

        <div className="prose prose-lg max-w-none prose-headings:text-primary prose-headings:font-bold">
          <h2>1. Service Agreement</h2>
          <p>
            By booking a service with Al Haddaf Car Wash, you agree to these Terms of Service. We provide mobile car wash and detailing services at the location specified in your booking.
          </p>

          <h2>2. Bookings and Cancellations</h2>
          <p>
            Bookings are subject to availability. Cancellations made less than 2 hours before the scheduled appointment may be subject to a cancellation fee.
          </p>

          <h2>3. Service Requirements</h2>
          <p>
            You must provide a safe and legal space for our team to perform the service. Access to water and electricity is generally not required for our mobile units, but may be requested for specific deep cleaning services.
          </p>

          <h2>4. Liability</h2>
          <p>
            While we take the utmost care with your vehicle, Al Haddaf Car Wash is not liable for pre-existing damage. Any claims for damage caused during service must be reported within 24 hours.
          </p>

          <h2>5. Payments</h2>
          <p>
            Payment is due upon completion of the service unless otherwise agreed. We accept cash and major credit cards through our mobile payment terminals.
          </p>

          <h2>6. Governing Law</h2>
          <p>
            These terms are governed by the laws of the United Arab Emirates as applied in the Emirate of Dubai.
          </p>
        </div>
      </div>
    </div>
  );
}

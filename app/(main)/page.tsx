import { Hero } from '@/components/sections/hero'
import { TrustBar } from '@/components/sections/trust-bar'
import { WhyChooseUs } from '@/components/sections/why-choose-us'
import { HowItWorks } from '@/components/sections/how-it-works'
import { ServiceAreas } from '@/components/sections/service-areas'
import { CustomerReviews } from '@/components/sections/customer-reviews'
import { FAQAccordion } from '@/components/sections/faq-accordion'
import { FinalCTA } from '@/components/sections/final-cta'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { formatPrice } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import prisma from '@/lib/db'
import { getHomepageSettings } from '@/actions/homepage-actions'
import { generatePageMetadata } from '@/lib/seo'
import { SchemaMarkup } from '@/components/shared/schema-markup'
import { getPageSeo } from '@/actions/seo-actions'

export const generateMetadata = () => generatePageMetadata('page:home');

export default async function Home() {
  const [settings, dbServices, dbFaqs, dbReviews, pageSeo] = await Promise.all([
    getHomepageSettings(),
    prisma.service.findMany({ 
      where: { isPublished: true }, 
      orderBy: { order: 'asc' },
      select: {
        id: true,
        title: true,
        slug: true,
        shortDescription: true,
        price: true,
        duration: true,
        isPopular: true,
        features: true,
      }
    }),
    prisma.faq.findMany({ 
      where: { isPublished: true }, 
      orderBy: { order: 'asc' }, 
      include: { category: true } 
    }),
    prisma.review.findMany({ 
      where: { isPublished: true }, 
      orderBy: { order: 'asc' },
      select: {
        id: true,
        author: true,
        rating: true,
        content: true,
        role: true,
        location: true,
        avatar: true,
        isFeatured: true,
      }
    }),
    getPageSeo('page:home')
  ]);

  return (
    <div className="flex min-h-screen flex-col">
      <SchemaMarkup json={pageSeo?.schemaMarkup} />
      {/* 1. Hero Section */}
      <Hero data={settings.hero} />

      {/* 2. Trust Bar */}
      <TrustBar data={settings.trustBar} />

      {/* 3. Services Grid */}
      <section id="services" className="bg-muted/30 py-24">
        <div className="container-premium">
          <div className="mb-16 text-center">
            <Badge variant="secondary" className="mb-4 px-4 py-1">Premium Care</Badge>
            <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">Our Detailing Services</h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              Experience the finest mobile detailing services in Dubai, delivered with precision 
              right to your doorstep.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {dbServices.map((service) => (
              <Card key={service.id} className="group flex flex-col">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline">{service.duration}</Badge>
                    {service.isPopular && <Badge variant="accent">Most Popular</Badge>}
                  </div>
                  <CardTitle className="mt-4 text-2xl group-hover:text-primary transition-colors">
                    {service.title}
                  </CardTitle>
                  <CardDescription className="text-base">{service.shortDescription}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <ul className="space-y-3 text-sm text-muted-foreground">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter className="flex flex-col gap-4 border-t border-border/50 pt-8">
                  <div className="flex w-full items-end justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-wider text-muted-foreground">Investment</p>
                      <p className="text-3xl font-black text-primary">{formatPrice(service.price)}</p>
                    </div>
                  </div>
                  <Link href={`/services/${service.slug}`} className="w-full">
                    <Button className="w-full h-12 text-base font-bold shadow-soft group-hover:shadow-premium transition-all">
                      View Service
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Why Choose Us */}
      <WhyChooseUs data={settings.whyChooseUs} />

      {/* 5. How It Works */}
      <HowItWorks data={settings.howItWorks} />

      {/* 6. Service Areas */}
      <ServiceAreas />

      {/* 7. Customer Reviews */}
      <CustomerReviews dbReviews={dbReviews as any} />

      {/* 8. FAQ Accordion */}
      <FAQAccordion dbFaqs={dbFaqs as any} />

      {/* 9. Final CTA */}
      <FinalCTA data={settings.finalCta} />
    </div>
  )
}

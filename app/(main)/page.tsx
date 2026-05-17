import { Hero } from '@/components/sections/hero'
import { TrustBar } from '@/components/sections/trust-bar'
import { WhyChooseUs } from '@/components/sections/why-choose-us'
import { HowItWorks } from '@/components/sections/how-it-works'
import { ServiceAreas } from '@/components/sections/service-areas'
import { CustomerReviews } from '@/components/sections/customer-reviews'
import { FAQAccordion } from '@/components/sections/faq-accordion'
import { FinalCTA } from '@/components/sections/final-cta'
import { BeforeAfterGallery } from '@/components/sections/before-after-gallery'
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
        compareAtPrice: true,
        duration: true,
        isPopular: true,
        isBundle: true,
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
            {dbServices.filter((s) => !s.isBundle).map((service) => (
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
                      {service.price === 0 ? (
                        <p className="text-3xl font-black text-primary">Contact Us</p>
                      ) : (
                        <p className="text-3xl font-black text-primary">{formatPrice(service.price)}</p>
                      )}
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

          {/* Bundle Highlight */}
          {dbServices.filter((s) => s.isBundle).map((bundle) => (
            <div key={bundle.id} className="mt-12 rounded-3xl bg-primary p-8 md:p-12 text-white relative overflow-hidden">
              <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
                <div>
                  <span className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-1.5 text-sm font-bold mb-4">
                    ✨ Best Value Bundle
                  </span>
                  <h3 className="text-3xl md:text-4xl font-black mb-2">{bundle.title}</h3>
                  <p className="text-white/80 mb-4">{bundle.shortDescription}</p>
                  <div className="flex items-center gap-3">
                    {bundle.compareAtPrice && (
                      <span className="text-white/50 line-through text-xl">AED {bundle.compareAtPrice}</span>
                    )}
                    <span className="text-4xl font-black">AED {bundle.price}</span>
                    {bundle.compareAtPrice && (
                      <span className="rounded-full bg-green-500 px-3 py-1 text-sm font-bold">
                        Save AED {bundle.compareAtPrice - bundle.price}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                  <Link href={`/services/${bundle.slug}`}>
                    <Button size="lg" variant="outline" className="w-full border-white text-white hover:bg-white hover:text-primary font-bold px-8">
                      Learn More
                    </Button>
                  </Link>
                  <Link href="/book">
                    <Button size="lg" variant="secondary" className="w-full font-bold px-8">
                      Grab Bundle Deal →
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="absolute top-0 right-0 -translate-y-1/3 translate-x-1/3 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
            </div>
          ))}
        </div>
      </section>

      {/* 4. Before / After Gallery */}
      <BeforeAfterGallery />

      {/* 5. Why Choose Us */}
      <WhyChooseUs data={settings.whyChooseUs} />

      {/* 6. How It Works */}
      <HowItWorks data={settings.howItWorks} />

      {/* CTA Strip — post How It Works */}
      <div className="bg-secondary py-7">
        <div className="container-premium flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <p className="font-black text-white text-xl">Your clean car is one booking away.</p>
            <p className="text-white/80 text-sm mt-0.5">Same-day slots available · We come to you · No hidden fees</p>
          </div>
          <Link href="/book" className="shrink-0">
            <Button size="lg" className="bg-white text-secondary hover:bg-white/90 font-black px-8 shadow-xl">
              Book My Wash Now →
            </Button>
          </Link>
        </div>
      </div>

      {/* 7. Service Areas */}
      <ServiceAreas />

      {/* 8. Customer Reviews */}
      <CustomerReviews dbReviews={dbReviews as any} />

      {/* CTA Strip — post Reviews */}
      {dbReviews.length > 0 && (
        <div className="bg-primary py-7">
          <div className="container-premium flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <p className="font-black text-white text-xl">
              Join 500+ happy customers across Dubai.
            </p>
            <Link href="/book" className="shrink-0">
              <Button size="lg" variant="secondary" className="font-black px-8 shadow-xl">
                Get My Car Washed →
              </Button>
            </Link>
          </div>
        </div>
      )}

      {/* 9. FAQ Accordion */}
      <FAQAccordion dbFaqs={dbFaqs as any} />

      {/* 10. Final CTA */}
      <FinalCTA data={settings.finalCta} />
    </div>
  )
}

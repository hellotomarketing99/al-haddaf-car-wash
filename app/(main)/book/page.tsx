import { getServices } from '@/actions/db-actions'
import { BookingForm } from '@/components/sections/booking-form'
import Image from 'next/image'
import { generatePageMetadata } from '@/lib/seo'
import { SchemaMarkup } from '@/components/shared/schema-markup'
import { getPageSeo } from '@/actions/seo-actions'

export const generateMetadata = () => generatePageMetadata('page:book');

export default async function BookingPage() {
  const [services, pageSeo] = await Promise.all([
    getServices(),
    getPageSeo('page:book')
  ]);

  return (
    <main className="flex-1">
      <SchemaMarkup json={pageSeo?.schemaMarkup} />
      {/* Hero Section for Booking */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero-bg.png"
            alt="Luxury car wash booking"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/80 bg-gradient-to-b from-black/40 to-black" />
        </div>
        
        <div className="container-premium relative z-10">
          <div className="grid gap-16 lg:grid-cols-2 items-center">
            <div className="space-y-8 text-white">
              <h1 className="text-5xl font-black tracking-tighter sm:text-7xl">
                Ready for a <br />
                <span className="text-secondary">Showroom Shine?</span>
              </h1>
              <p className="text-xl text-white/70 max-w-lg leading-relaxed">
                Fill out the form to schedule your premium mobile detailing service. 
                Our team will arrive at your location in Dubai within 45 minutes of confirmation.
              </p>
              
              <div className="grid gap-6">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-2xl bg-secondary/20 flex items-center justify-center text-secondary">
                    <span className="font-bold">01</span>
                  </div>
                  <div>
                    <p className="font-bold">Select Your Package</p>
                    <p className="text-sm text-white/50">Choose from our range of premium services.</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-2xl bg-primary/20 flex items-center justify-center text-primary">
                    <span className="font-bold">02</span>
                  </div>
                  <div>
                    <p className="font-bold">Pick Time & Location</p>
                    <p className="text-sm text-white/50">We come to you anywhere in Dubai.</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-2xl bg-accent/20 flex items-center justify-center text-accent">
                    <span className="font-bold">03</span>
                  </div>
                  <div>
                    <p className="font-bold">Confirm on WhatsApp</p>
                    <p className="text-sm text-white/50">Instant verification and live tracking.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:mb-[-100px] relative z-20">
              <BookingForm services={services} />
            </div>
          </div>
        </div>
      </section>

      {/* Spacer to handle the negative margin on desktop */}
      <div className="h-24 lg:h-48 bg-background" />
      
      {/* Trust Section */}
      <section className="py-24 bg-background">
        <div className="container-premium text-center">
          <h2 className="text-3xl font-bold mb-12">Trusted by Dubai's Most Discerning Owners</h2>
          <div className="flex flex-wrap justify-center gap-12 opacity-50 grayscale">
            {/* Logos could go here */}
          </div>
        </div>
      </section>
    </main>
  )
}

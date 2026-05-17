import { siteConfig } from '@/data/site-config'
import { MapPin, Clock, CheckCircle2 } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'

export function ServiceAreas() {
  return (
    <section id="areas" className="py-24 bg-background">
      <div className="container-premium">
        <div className="flex flex-col lg:flex-row gap-16 items-start">

          {/* ── Left: text + area pills ── */}
          <div className="flex-1 space-y-8">
            <div className="space-y-4">
              <Badge variant="secondary">Coverage</Badge>
              <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
                Serving All Major <span className="text-primary">Dubai Districts</span>
              </h2>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Our mobile units are strategically positioned across Dubai to ensure
                fast response times in your neighbourhood.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {siteConfig.serviceAreas.map((area) => (
                <div
                  key={area}
                  className="flex items-center gap-3 p-4 rounded-xl border border-border hover:border-primary hover:bg-primary/5 transition-all group"
                >
                  <div className="h-9 w-9 shrink-0 rounded-full bg-muted flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                    <MapPin size={16} />
                  </div>
                  <span className="font-semibold text-sm">{area}</span>
                </div>
              ))}
            </div>

            {/* Stats row */}
            <div className="flex flex-wrap gap-6 pt-2">
              <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
                <Clock size={16} className="text-primary" />
                45-min average arrival
              </div>
              <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
                <CheckCircle2 size={16} className="text-primary" />
                7 days a week
              </div>
              <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
                <CheckCircle2 size={16} className="text-primary" />
                Same-day slots available
              </div>
            </div>

            <Link
              href="/areas/dubai-marina"
              className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-bold text-muted-foreground hover:bg-muted transition-colors"
            >
              View all coverage areas →
            </Link>
          </div>

          {/* ── Right: Google Maps embed ── */}
          <div className="flex-1 w-full">
            <div className="relative w-full rounded-3xl overflow-hidden border border-border shadow-premium" style={{ height: '480px' }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1p3!2d55.27406994628911!3d25.19744!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f43348a67e24b%3A0xff45e502e1ceb7e2!2sDubai!5e0!3m2!1sen!2sae!4v1748000000000!5m2!1sen!2sae"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Al Haddaf Car Wash — Dubai Service Areas"
              />

              {/* Overlay glass card — response time */}
              <div className="absolute bottom-4 left-4 glass-effect rounded-2xl px-5 py-4 shadow-premium">
                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">
                  Average Response Time
                </p>
                <p className="text-3xl font-black text-primary leading-none">45 Mins</p>
                <p className="text-sm text-muted-foreground mt-1">Anywhere in Dubai</p>
              </div>

              {/* Overlay badge — top right */}
              <div className="absolute top-4 right-4 rounded-full bg-primary px-4 py-2 text-xs font-black text-white shadow-lg">
                📍 We come to you
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

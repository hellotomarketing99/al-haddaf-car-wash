import { ContactForm } from '@/components/sections/contact-form'
import { siteConfig } from '@/data/site-config'
import { Mail, Phone, MapPin, Clock } from 'lucide-react'

export const metadata = {
  title: 'Contact Us | Al Haddaf Car Wash Dubai',
  description: 'Get in touch with Al Haddaf Car Wash. Book a service, ask about custom packages, or reach us via WhatsApp, email, or phone.',
}

const infoCards = [
  {
    icon: Phone,
    label: 'Call Us',
    value: siteConfig.phone,
    href: `tel:${siteConfig.phone.replace(/\s/g, '')}`,
    linkLabel: 'Call now',
  },
  {
    icon: Mail,
    label: 'Email Us',
    value: siteConfig.email,
    href: `mailto:${siteConfig.email}`,
    linkLabel: 'Send email',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: siteConfig.address,
    href: null,
    linkLabel: null,
  },
  {
    icon: Clock,
    label: 'Business Hours',
    value: `Mon–Sat ${siteConfig.businessHours.mon_sat}\nSun ${siteConfig.businessHours.sun}`,
    href: null,
    linkLabel: null,
  },
]

const whyUs = [
  'Fast response within 2 hours',
  'Certified & insured detailing team',
  'Custom quotes — no obligation',
  'Flexible scheduling at your location',
]

const trustBadges = [
  { emoji: '✅', label: 'Response within 2 hours' },
  { emoji: '🛡', label: 'Certified & Insured Team' },
  { emoji: '⭐', label: '4.9/5 Customer Rating' },
]

export default function ContactPage() {
  return (
    <main className="bg-background">
      {/* Page Header */}
      <section className="bg-primary pt-32 pb-16 text-white">
        <div className="container-premium text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/20 px-4 py-2 text-white text-sm font-semibold backdrop-blur-sm mb-6">
            Get in Touch
          </div>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-4">
            Contact Al Haddaf
          </h1>
          <p className="text-white/80 text-lg max-w-xl mx-auto">
            We&apos;re here to help with any questions about our mobile car wash services. Reach out and we&apos;ll reply within 2 hours.
          </p>
        </div>
      </section>

      {/* Info Cards */}
      <section className="container-premium -mt-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {infoCards.map((card) => {
            const Icon = card.icon
            return (
              <div
                key={card.label}
                className="rounded-2xl border border-border bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <Icon size={20} className="text-primary" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                    {card.label}
                  </span>
                </div>
                <p className="text-sm font-semibold text-gray-800 whitespace-pre-line leading-relaxed">
                  {card.value}
                </p>
                {card.href && (
                  <a
                    href={card.href}
                    className="mt-3 inline-flex text-xs font-bold text-primary hover:underline"
                  >
                    {card.linkLabel} →
                  </a>
                )}
              </div>
            )
          })}
        </div>
      </section>

      {/* Main: Form + Sidebar */}
      <section className="container-premium py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Contact Form */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-border bg-white p-8 shadow-sm">
              <h2 className="text-2xl font-black tracking-tight mb-1">Send Us a Message</h2>
              <p className="text-sm text-muted-foreground mb-6">
                Fill in the form and we&apos;ll get back to you within 2 hours.
              </p>
              <ContactForm />
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-5 space-y-6">
            {/* WhatsApp CTA */}
            <div className="rounded-2xl bg-green-500 p-6 text-white">
              <h3 className="text-xl font-black mb-2">Prefer WhatsApp?</h3>
              <p className="text-green-100 text-sm mb-4">
                Chat with us directly for the fastest response. We&apos;re available during business hours.
              </p>
              <a
                href={siteConfig.links.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-black text-green-600 hover:bg-green-50 transition-colors w-full text-center"
              >
                Chat on WhatsApp
              </a>
            </div>

            {/* Instagram */}
            <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
              <h3 className="text-base font-black mb-1">Follow Us</h3>
              <p className="text-sm text-muted-foreground mb-3">
                See our latest work on Instagram.
              </p>
              <a
                href={siteConfig.links.instagram}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-bold text-muted-foreground hover:bg-muted transition-colors"
              >
                @alhaddafcarwash →
              </a>
            </div>

            {/* Why Reach Out */}
            <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
              <h3 className="text-base font-black mb-4">Why Reach Out?</h3>
              <ul className="space-y-3">
                {whyUs.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-gray-700">
                    <span className="mt-0.5 h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <span className="text-primary text-xs font-black">✓</span>
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Business Hours */}
            <div className="rounded-2xl border border-border bg-muted/40 p-6">
              <h3 className="text-base font-black mb-3">Business Hours</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="font-semibold text-gray-700">Monday – Saturday</span>
                  <span className="text-muted-foreground">{siteConfig.businessHours.mon_sat}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold text-gray-700">Sunday</span>
                  <span className="text-muted-foreground">{siteConfig.businessHours.sun}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Strip */}
      <section className="border-t border-border bg-muted/30 py-10">
        <div className="container-premium">
          <div className="flex flex-wrap justify-center gap-6">
            {trustBadges.map((badge) => (
              <div
                key={badge.label}
                className="flex items-center gap-2 rounded-full border border-border bg-white px-5 py-2.5 text-sm font-bold shadow-sm"
              >
                <span>{badge.emoji}</span>
                {badge.label}
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

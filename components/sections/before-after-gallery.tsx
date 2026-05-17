import Link from 'next/link'

const transformations = [
  {
    id: 1,
    title: 'Exterior Deep Clean',
    service: 'Prestige Car Wash',
    before: '/gallery/before-1.jpg',
    after: '/gallery/after-1.jpg',
  },
  {
    id: 2,
    title: 'Interior Detailing',
    service: 'Interior Detailing',
    before: '/gallery/before-2.jpg',
    after: '/gallery/after-2.jpg',
  },
  {
    id: 3,
    title: 'Full Detailing & Polish',
    service: 'Full Detailing + Polishing',
    before: '/gallery/before-3.jpg',
    after: '/gallery/after-3.jpg',
  },
]

export function BeforeAfterGallery() {
  return (
    <section className="py-24 bg-white">
      <div className="container-premium">
        {/* Header */}
        <div className="mb-16 text-center space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 border border-primary/20 px-4 py-1.5 text-primary text-sm font-bold">
            Real Results
          </div>
          <h2 className="text-4xl font-black tracking-tight sm:text-5xl">
            See the Transformation
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Every vehicle tells a story. Here&apos;s what a professional detail can do for yours.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {transformations.map((item) => (
            <div
              key={item.id}
              className="group rounded-2xl border border-border overflow-hidden shadow-soft hover:shadow-premium transition-all"
            >
              {/* Before */}
              <div className="relative">
                <div className="absolute top-3 left-3 z-10 rounded-full bg-black/60 px-3 py-1 text-xs font-bold text-white backdrop-blur-sm">
                  Before
                </div>
                <div className="h-48 bg-gray-200 flex items-center justify-center">
                  {/* Placeholder — replace src with real photo */}
                  <div className="flex flex-col items-center gap-2 text-gray-400">
                    <div className="h-16 w-16 rounded-full bg-gray-300 flex items-center justify-center text-2xl">
                      📷
                    </div>
                    <span className="text-xs font-semibold">Before Photo</span>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="relative flex items-center justify-center bg-primary py-2">
                <div className="flex items-center gap-3 text-white text-xs font-black tracking-wider">
                  <span className="h-px w-12 bg-white/40" />
                  TRANSFORMATION
                  <span className="h-px w-12 bg-white/40" />
                </div>
              </div>

              {/* After */}
              <div className="relative">
                <div className="absolute top-3 left-3 z-10 rounded-full bg-primary/90 px-3 py-1 text-xs font-bold text-white backdrop-blur-sm">
                  After
                </div>
                <div className="h-48 bg-gray-100 flex items-center justify-center">
                  {/* Placeholder — replace src with real photo */}
                  <div className="flex flex-col items-center gap-2 text-gray-400">
                    <div className="h-16 w-16 rounded-full bg-primary/20 flex items-center justify-center text-2xl">
                      ✨
                    </div>
                    <span className="text-xs font-semibold">After Photo</span>
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="p-4 bg-white border-t border-border">
                <p className="font-black text-gray-900 text-sm">{item.title}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{item.service}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-14 text-center">
          <p className="text-muted-foreground mb-4">
            Ready to see this transformation on your vehicle?
          </p>
          <Link
            href="/book"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-black text-white hover:bg-primary/90 shadow-premium transition-all"
          >
            Book Your Transformation →
          </Link>
        </div>
      </div>
    </section>
  )
}

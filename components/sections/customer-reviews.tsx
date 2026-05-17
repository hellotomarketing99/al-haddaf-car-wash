import { Star, BadgeCheck, Quote } from 'lucide-react'
import Image from 'next/image'

interface Review {
  id: string
  author: string
  role: string
  location?: string | null
  content: string
  rating: number
  avatar?: string | null
  isFeatured?: boolean
}

export function CustomerReviews({ dbReviews = [] }: { dbReviews?: Review[] }) {
  if (dbReviews.length === 0) return null

  return (
    <section className="py-24 bg-muted/30">
      <div className="container-premium">
        {/* Header */}
        <div className="mb-16 text-center space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 border border-primary/20 px-4 py-1.5 text-primary text-sm font-bold">
            What Our Clients Say
          </div>
          <h2 className="text-4xl font-black tracking-tight sm:text-5xl">
            Loved by Dubai Car Owners
          </h2>
          {/* Rating Summary */}
          <div className="flex items-center justify-center gap-2">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={18} className="fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="font-black text-gray-900">4.9/5</span>
            <span className="text-muted-foreground text-sm">· Based on 500+ Google Reviews</span>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {dbReviews.map((review) => (
            <div
              key={review.id}
              className={`relative bg-white rounded-2xl p-6 shadow-soft transition-all hover:shadow-premium flex flex-col ${
                review.isFeatured
                  ? 'border-2 border-primary/30 ring-1 ring-primary/10'
                  : 'border border-border'
              }`}
            >
              {/* Featured badge */}
              {review.isFeatured && (
                <div className="absolute -top-3 -right-3 bg-primary text-white rounded-full p-1 shadow-lg">
                  <BadgeCheck size={18} />
                </div>
              )}

              {/* Quote icon */}
              <Quote size={32} className="text-primary/15 mb-4 shrink-0" fill="currentColor" />

              {/* Content */}
              <p className="text-gray-700 leading-relaxed italic flex-1 mb-6">
                &ldquo;{review.content}&rdquo;
              </p>

              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} size={14} className="fill-amber-400 text-amber-400" />
                ))}
                {[...Array(5 - review.rating)].map((_, i) => (
                  <Star key={i + review.rating} size={14} className="text-gray-200 fill-gray-200" />
                ))}
              </div>

              {/* Author */}
              <div className="flex items-center gap-3 border-t border-border pt-4">
                <div className="relative h-12 w-12 overflow-hidden rounded-full border-2 border-primary/10 bg-primary/5 shrink-0 flex items-center justify-center">
                  {review.avatar ? (
                    <Image src={review.avatar} alt={review.author} fill className="object-cover" />
                  ) : (
                    <span className="font-black text-primary text-lg">
                      {review.author.charAt(0)}
                    </span>
                  )}
                </div>
                <div>
                  <p className="font-black text-gray-900 leading-tight">{review.author}</p>
                  <p className="text-xs text-muted-foreground">
                    {review.role}
                    {review.location && (
                      <span className="opacity-75"> · {review.location}</span>
                    )}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer CTA */}
        <div className="mt-12 text-center">
          <a
            href="https://wa.me/971555503288"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:underline"
          >
            Join 500+ happy customers — Book your wash today →
          </a>
        </div>
      </div>
    </section>
  )
}

import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import pg from 'pg'

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

const reviews = [
  {
    author: 'Ahmed Al Mansoori',
    role: 'Range Rover Owner',
    location: 'Dubai Marina',
    content: 'Absolutely brilliant service! The team arrived exactly on time and transformed my Range Rover. The interior detailing was so thorough — even the vents and door pockets were spotless. Highly recommended to any car owner in Dubai.',
    rating: 5,
    isFeatured: true,
    isVerified: true,
    isPublished: true,
    order: 1,
  },
  {
    author: 'Sarah Johnson',
    role: 'BMW 5 Series Owner',
    location: 'Business Bay',
    content: 'I was skeptical about a mobile car wash but Al Haddaf completely changed my mind. They came to my office parking, did a premium wash while I was in meetings, and my car looked showroom-fresh when I got back. Will definitely book again.',
    rating: 5,
    isFeatured: false,
    isVerified: true,
    isPublished: true,
    order: 2,
  },
  {
    author: 'Mohammed Al Rashid',
    role: 'Mercedes S-Class Owner',
    location: 'Palm Jumeirah',
    content: 'Worth every dirham. I booked the Full Detailing + Polishing package and the result was outstanding — the paint looks brand new. The team is professional, uses quality products, and treats your car with real care. My go-to from now on.',
    rating: 5,
    isFeatured: true,
    isVerified: true,
    isPublished: true,
    order: 3,
  },
  {
    author: 'Jessica Chen',
    role: 'Toyota Camry Owner',
    location: 'JLT',
    content: 'Quick, convenient, and great value. Booked the Quick Car Wash at 8am and they were done by 9am — just in time for my workday. The car was spotless. Booking through WhatsApp was super easy too.',
    rating: 5,
    isFeatured: false,
    isVerified: true,
    isPublished: true,
    order: 4,
  },
  {
    author: 'Khalid Al Hamdan',
    role: 'Porsche Cayenne Owner',
    location: 'Downtown Dubai',
    content: 'My Porsche has never looked better. The Prestige wash package was exactly what I needed — careful attention to the paint, rims cleaned perfectly, and the finish was flawless. Professional team who clearly knows their craft.',
    rating: 5,
    isFeatured: false,
    isVerified: true,
    isPublished: true,
    order: 5,
  },
  {
    author: 'Priya Sharma',
    role: 'Honda CR-V Owner',
    location: 'Arabian Ranches',
    content: 'Great service overall. The interior detailing was very thorough and the team was polite and professional. Took slightly longer than expected but the quality made up for it. Would recommend to friends and family.',
    rating: 4,
    isFeatured: false,
    isVerified: true,
    isPublished: true,
    order: 6,
  },
]

async function main() {
  console.log('Seeding reviews...')
  for (const review of reviews) {
    await prisma.review.create({ data: review })
    console.log(`  ✓ ${review.author}`)
  }
  console.log(`Done. ${reviews.length} reviews seeded.`)
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())

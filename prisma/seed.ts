import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import pg from 'pg'
import { services } from '../data/services'
import 'dotenv/config'
import bcrypt from 'bcryptjs'

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function main() {
  console.log('Seeding data...')

  // Create Admin User
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@alhaddaf.ae'
  const adminPassword = process.env.ADMIN_PASSWORD || 'Admin@Alhaddaf2030'
  const hashedPassword = await bcrypt.hash(adminPassword, 10)

  await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      password: hashedPassword,
      name: 'Al Haddaf Admin',
      role: 'ADMIN',
    },
  })
  console.log('Admin user created/verified.')

  // Clear old services (and their bookings) before re-seeding
  await prisma.booking.deleteMany({})
  await prisma.service.deleteMany({})
  console.log('Old services cleared.')

  // Seed new services
  for (let i = 0; i < services.length; i++) {
    const service = services[i]
    await prisma.service.create({
      data: {
        slug: service.slug,
        title: service.title,
        shortDescription: service.shortDescription,
        fullDescription: service.fullDescription,
        price: service.price,
        duration: service.duration,
        image: service.image,
        features: service.features,
        benefits: service.benefits,
        isPopular: service.isPopular ?? false,
        compareAtPrice: service.compareAtPrice ?? null,
        isBundle: service.isBundle ?? false,
        order: i,
        metaTitle: service.metaTitle,
        metaDescription: service.metaDescription,
      },
    })
    console.log(`  Created: ${service.title}`)
  }

  console.log('Seed completed successfully.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
    await pool.end()
  })

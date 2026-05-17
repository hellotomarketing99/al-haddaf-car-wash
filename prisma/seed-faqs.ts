import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import pg from 'pg'

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

const faqData = [
  {
    category: { name: 'Pricing & Booking', order: 1 },
    faqs: [
      {
        question: 'How do I book a service?',
        answer: 'You can book in 3 easy ways: fill in our online booking form at /book, send us a message on WhatsApp (+971 55 550 3288), or call us directly. We confirm all bookings within minutes during business hours.',
        order: 1,
      },
      {
        question: 'What payment methods do you accept?',
        answer: 'We accept cash on the day of service, all major credit and debit cards, and bank transfer. Payment is collected after the service is complete and you are satisfied with the result.',
        order: 2,
      },
      {
        question: 'Can I reschedule or cancel my booking?',
        answer: 'Yes — you can reschedule or cancel free of charge up to 2 hours before your appointment. Simply WhatsApp or call us and we will sort it out immediately. We understand schedules change.',
        order: 3,
      },
      {
        question: 'Do you offer packages or loyalty discounts?',
        answer: 'Yes! We offer monthly wash packages for regular customers — great if you want your car maintained on a set schedule. We also have a referral program: refer a friend and both of you get a discount on your next wash. Ask us on WhatsApp for current deals.',
        order: 4,
      },
    ],
  },
  {
    category: { name: 'Services & Quality', order: 2 },
    faqs: [
      {
        question: 'Which areas in Dubai do you cover?',
        answer: 'We cover all major residential and commercial areas across Dubai including Dubai Marina, Palm Jumeirah, Downtown Dubai, Business Bay, JLT, JBR, Arabian Ranches, Mirdif, and more. If you are unsure whether we serve your area, just ask — we are expanding regularly.',
        order: 1,
      },
      {
        question: 'How long does each service take?',
        answer: 'Service times vary: Quick Car Wash takes 45–60 minutes, Premium Car Wash 60–90 minutes, Prestige Car Wash 90–120 minutes, Interior Detailing 2–3 hours, Exterior Car Polishing 2–4 hours, and Full Detailing + Polishing 4–6 hours. We will give you a more accurate estimate when you book.',
        order: 2,
      },
      {
        question: 'What products do you use — are they safe for my car?',
        answer: 'We use 100% professional-grade, eco-friendly, and pH-neutral products that are safe for all paint types, coatings, and interior materials. Our products are the same ones used by top detailing studios globally. They are gentle on your car and the environment.',
        order: 3,
      },
      {
        question: 'Is my vehicle insured during the service?',
        answer: 'Absolutely. Every service we provide is fully insured. Your vehicle is covered from the moment our team arrives until we pack up and leave. In the extremely unlikely event of any damage, we handle it fully — no stress for you.',
        order: 4,
      },
      {
        question: 'Do I need to be present while my car is being washed?',
        answer: 'No — you do not need to be present. Many of our customers book while at work, at home, or even while travelling. Just ensure the vehicle is parked in an accessible spot and leave us a note on any special requests. We will handle the rest and notify you when it is done.',
        order: 5,
      },
    ],
  },
]

async function main() {
  console.log('Seeding FAQs...')
  for (const group of faqData) {
    const category = await prisma.faqCategory.create({
      data: { name: group.category.name, order: group.category.order },
    })
    console.log(`  Category: ${category.name}`)
    for (const faq of group.faqs) {
      await prisma.faq.create({
        data: { ...faq, categoryId: category.id, isPublished: true },
      })
      console.log(`    ✓ ${faq.question}`)
    }
  }
  console.log('Done.')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())

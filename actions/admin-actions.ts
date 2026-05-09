'use server'

import prisma from '@/lib/db'
import { revalidatePath } from 'next/cache'
import { BookingStatus } from '@prisma/client'

export async function getDashboardStats() {
  const [
    totalBookings,
    pendingBookings,
    confirmedBookings,
    completedBookings,
    cancelledBookings,
    totalServices,
    publishedServices,
    totalReviews,
    totalBlogs,
    publishedBlogs,
    totalFaqs,
    totalAreas,
    recentBookings,
    latestReviews,
  ] = await Promise.all([
    prisma.booking.count(),
    prisma.booking.count({ where: { status: 'PENDING' } }),
    prisma.booking.count({ where: { status: 'CONFIRMED' } }),
    prisma.booking.count({ where: { status: 'COMPLETED' } }),
    prisma.booking.count({ where: { status: 'CANCELLED' } }),
    prisma.service.count(),
    prisma.service.count({ where: { isPublished: true } }),
    prisma.review.count(),
    prisma.post.count(),
    prisma.post.count({ where: { isPublished: true } }),
    prisma.faq.count(),
    prisma.area.count(),
    prisma.booking.findMany({
      take: 6,
      orderBy: { createdAt: 'desc' },
      include: { service: { select: { title: true, price: true } } }
    }),
    prisma.review.findMany({
      take: 4,
      orderBy: { createdAt: 'desc' },
      select: { id: true, author: true, rating: true, content: true, avatar: true, location: true, createdAt: true }
    }),
  ])

  const completedBookingsList = await prisma.booking.findMany({
    where: { status: 'COMPLETED' },
    include: { service: { select: { price: true } } }
  })
  const totalRevenue = completedBookingsList.reduce((acc: number, b) => acc + b.service.price, 0)

  return {
    totalBookings,
    pendingBookings,
    confirmedBookings,
    completedBookings,
    cancelledBookings,
    totalServices,
    publishedServices,
    totalReviews,
    totalBlogs,
    publishedBlogs,
    totalFaqs,
    totalAreas,
    totalRevenue,
    recentBookings,
    latestReviews,
  }
}

export async function getBookings() {
  return await prisma.booking.findMany({
    orderBy: { createdAt: 'desc' },
    include: { service: true }
  })
}

export async function updateBookingStatus(id: string, status: BookingStatus) {
  await prisma.booking.update({
    where: { id },
    data: { status }
  })
  revalidatePath('/admin/bookings')
}

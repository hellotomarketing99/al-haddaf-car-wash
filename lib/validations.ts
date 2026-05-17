import { z } from 'zod'

export const bookingSchema = z.object({
  serviceId: z.string().min(1, 'Please select a service'),
  customerName: z.string().min(2, 'Name must be at least 2 characters'),
  customerEmail: z.string().email('Invalid email address'),
  customerPhone: z.string().min(10, 'Please enter a valid phone number (e.g. 050XXXXXXX)'),
  carModel: z.string().min(2, 'Please enter your car model'),
  location: z.string().min(3, 'Please select or enter your area in Dubai'),
  date: z.string().min(1, 'Please select a date'),
  time: z.string().min(1, 'Please select a time'),
  notes: z.string().optional(),
  honeypot: z.string().max(0, { message: "Spam detected" }).optional(), // Spam protection
})

export type BookingInput = z.infer<typeof bookingSchema>

export const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(9, 'Enter a valid phone number'),
  subject: z.string().min(1, 'Please select a subject'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  honeypot: z.string().max(0, { message: 'Spam detected' }).optional(),
})

export type ContactInput = z.infer<typeof contactSchema>

export const reviewSchema = z.object({
  author: z.string().min(2, 'Name must be at least 2 characters'),
  role: z.string().min(2, 'Car model must be at least 2 characters'),
  content: z.string().min(10, 'Review must be at least 10 characters'),
  rating: z.number().min(1).max(5),
})

export type ReviewInput = z.infer<typeof reviewSchema>

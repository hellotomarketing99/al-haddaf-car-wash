'use server'

import prisma from '@/lib/db'
import { revalidatePath } from 'next/cache'
import { contactSchema } from '@/lib/validations'
import { ContactStatus } from '@prisma/client'

export async function createContactSubmission(data: unknown) {
  const parsed = contactSchema.safeParse(data)
  if (!parsed.success) {
    return { success: false, error: 'Invalid form data. Please check all fields.' }
  }

  const { name, email, phone, subject, message, honeypot } = parsed.data
  if (honeypot) return { success: false, error: 'Spam detected.' }

  try {
    await prisma.contactSubmission.create({
      data: { name, email, phone, subject, message },
    })
    revalidatePath('/admin/contacts')
    return { success: true }
  } catch (error) {
    console.error('Error saving contact submission:', error)
    return { success: false, error: 'Failed to send message. Please try again.' }
  }
}

export async function getContactSubmissions() {
  return prisma.contactSubmission.findMany({
    orderBy: { createdAt: 'desc' },
  })
}

export async function updateContactStatus(
  id: string,
  status: ContactStatus,
  adminNote?: string
) {
  try {
    await prisma.contactSubmission.update({
      where: { id },
      data: { status, ...(adminNote !== undefined ? { adminNote } : {}) },
    })
    revalidatePath('/admin/contacts')
    return { success: true }
  } catch (error) {
    console.error('Error updating contact status:', error)
    return { success: false, error: 'Failed to update status.' }
  }
}

export async function deleteContactSubmission(id: string) {
  try {
    await prisma.contactSubmission.delete({ where: { id } })
    revalidatePath('/admin/contacts')
    return { success: true }
  } catch (error) {
    console.error('Error deleting contact submission:', error)
    return { success: false, error: 'Failed to delete submission.' }
  }
}

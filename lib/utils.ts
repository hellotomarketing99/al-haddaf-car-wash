import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Merges Tailwind CSS classes with clsx and tailwind-merge
 * This handles conditional classes and prevents Tailwind class conflicts
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Formats a number as a currency string (AED for Dubai)
 */
export function formatPrice(price: number) {
  return new Intl.NumberFormat('en-AE', {
    style: 'currency',
    currency: 'AED',
    minimumFractionDigits: 0,
  }).format(price)
}

/**
 * Delays execution for a specified duration (useful for simulated loading)
 */
export const delay = (ms: number) => new Promise((res) => setTimeout(res, ms))

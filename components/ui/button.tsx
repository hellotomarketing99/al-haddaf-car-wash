import * as React from 'react'
import { cn } from '@/lib/utils'

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'accent' | 'whatsapp'
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'icon'
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center rounded-full font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 active:scale-95'
    
    const variants = {
      primary: 'bg-primary text-white shadow-soft hover:bg-primary-dark hover:shadow-premium',
      secondary: 'bg-secondary text-white shadow-soft hover:opacity-90',
      accent: 'bg-accent text-white shadow-soft hover:opacity-90',
      whatsapp: 'bg-whatsapp text-white shadow-soft hover:opacity-90',
      outline: 'border-2 border-primary text-primary bg-transparent hover:bg-primary hover:text-white',
      ghost: 'text-primary hover:bg-primary/10',
    }
    
    const sizes = {
      sm: 'h-9 px-4 text-sm',
      md: 'h-11 px-6 text-base',
      lg: 'h-14 px-8 text-lg font-bold',
      xl: 'h-16 px-10 text-xl font-bold',
      icon: 'h-11 w-11',
    }

    return (
      <button
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

export { Button }

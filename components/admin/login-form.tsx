'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Loader2, Lock, Mail } from 'lucide-react'
import { login } from '@/actions/auth-actions'

export function LoginForm() {
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    const formData = new FormData(e.currentTarget)
    const result = await login(formData)

    if (result?.error) {
      setError(result.error)
      setIsLoading(false)
    } else {
      router.push('/admin')
      router.refresh()
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-bold flex items-center gap-2">
          <Mail size={16} className="text-primary" /> Email Address
        </label>
        <Input
          name="email"
          type="email"
          placeholder="admin@alhaddaf.ae"
          required
          className="h-12 bg-muted/30 border-none rounded-xl focus-visible:ring-primary"
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-sm font-bold flex items-center gap-2">
            <Lock size={16} className="text-primary" /> Password
          </label>
          <button type="button" className="text-xs font-bold text-primary hover:underline">
            Forgot?
          </button>
        </div>
        <Input
          name="password"
          type="password"
          placeholder="••••••••"
          required
          className="h-12 bg-muted/30 border-none rounded-xl focus-visible:ring-primary"
        />
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-destructive/10 text-destructive text-sm font-bold border border-destructive/20 animate-shake">
          {error}
        </div>
      )}

      <Button
        type="submit"
        size="xl"
        className="w-full h-14 text-lg font-bold shadow-lg shadow-primary/20 transition-all active:scale-[0.98]"
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Signing In...
          </>
        ) : (
          'Access Dashboard'
        )}
      </Button>
    </form>
  )
}

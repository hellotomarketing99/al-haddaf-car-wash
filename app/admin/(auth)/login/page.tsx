import { LoginForm } from "@/components/admin/login-form"
import Image from "next/image"

export default function LoginPage() {
  return (
    <div className="flex min-h-screen">
      {/* Left Side - Form */}
      <div className="flex flex-1 flex-col justify-center px-8 py-12 sm:px-12 lg:flex-none lg:px-24 xl:px-32 bg-white">
        <div className="mx-auto w-full max-w-sm">
          <div className="mb-10">
            <h1 className="text-3xl font-black tracking-tighter text-primary uppercase">Al Haddaf Admin</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Enter your credentials to access the management suite.
            </p>
          </div>
          
          <LoginForm />
          
          <p className="mt-10 text-center text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Al Haddaf Premium Car Wash. All rights reserved.
          </p>
        </div>
      </div>

      {/* Right Side - Visual */}
      <div className="relative hidden w-0 flex-1 lg:block">
        <Image
          src="/hero-bg.png"
          alt="Luxury Car Wash Background"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-primary/40 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        
        <div className="absolute bottom-12 left-12 right-12 text-white">
          <blockquote className="space-y-4">
            <p className="text-3xl font-bold leading-tight">
              "The difference between a car wash and detailing is the obsession with perfection."
            </p>
            <footer className="text-lg font-medium text-white/70 italic">
              — Al Haddaf Excellence Standards
            </footer>
          </blockquote>
        </div>
      </div>
    </div>
  )
}

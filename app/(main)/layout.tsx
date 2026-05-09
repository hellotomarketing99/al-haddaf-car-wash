import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { WhatsAppButton } from '@/components/shared/whatsapp-button'
import prisma from '@/lib/db'
import { getSiteSettings } from '@/actions/settings-actions'

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [services, areas, settings] = await Promise.all([
    prisma.service.findMany({
      where: { isPublished: true },
      orderBy: { order: 'asc' },
      select: { title: true, slug: true }
    }),
    prisma.area.findMany({
      where: { isPublished: true },
      orderBy: { order: 'asc' },
      select: { title: true, slug: true }
    }),
    getSiteSettings(),
  ])

  const whatsappHref = `https://wa.me/${settings.general.whatsapp}`

  return (
    <div className="relative flex min-h-screen flex-col">
      <Navbar dbServices={services} dbAreas={areas} />
      <main className="flex-1">{children}</main>
      <Footer />
      <WhatsAppButton href={whatsappHref} />
    </div>
  )
}

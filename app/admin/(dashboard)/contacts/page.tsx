import { getContactSubmissions } from '@/actions/contact'
import { ContactManager } from '@/components/admin/contact-manager'
import { Mail } from 'lucide-react'

export const metadata = {
  title: 'Contact Submissions | Admin',
}

export default async function ContactsPage() {
  const submissions = await getContactSubmissions()
  const newCount = submissions.filter((s) => s.status === 'NEW').length

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-black tracking-tight">Contact Submissions</h1>
            {newCount > 0 && (
              <span className="rounded-full bg-blue-100 px-2.5 py-0.5 text-sm font-bold text-blue-700">
                {newCount} new
              </span>
            )}
          </div>
          <p className="text-sm text-muted-foreground font-medium">
            {submissions.length} total submission{submissions.length !== 1 ? 's' : ''}
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-xl border border-border bg-white px-4 py-3 text-sm font-semibold text-muted-foreground shadow-sm">
          <Mail size={16} className="text-primary" />
          Manage contact form responses
        </div>
      </div>

      <ContactManager submissions={submissions} />
    </div>
  )
}

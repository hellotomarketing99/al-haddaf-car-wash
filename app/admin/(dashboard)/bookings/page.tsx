import { getBookings } from '@/actions/admin-actions';
import { BookingManager } from '@/components/admin/booking-manager';
import { Button } from '@/components/ui/button';
import { CalendarCheck, Download, Plus } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Bookings Management | Admin',
};

export default async function BookingsPage() {
  const bookings = await getBookings();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight">Bookings</h1>
          <p className="text-sm text-muted-foreground font-medium">Manage and track your car wash appointments</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" className="gap-2">
            <Download size={14} /> Export CSV
          </Button>
          <Link href="/book" target="_blank">
            <Button size="sm" className="gap-2 shadow-premium">
              <Plus size={14} /> Create Booking
            </Button>
          </Link>
        </div>
      </div>

      <BookingManager bookings={bookings} />
    </div>
  );
}

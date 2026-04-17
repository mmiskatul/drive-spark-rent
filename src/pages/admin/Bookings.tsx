import DashboardLayout, { PageHeader } from "@/layouts/DashboardLayout";
import { StatusBadge } from "@/components/StatusBadge";
import { bookings } from "@/lib/mock-data";

export default function AdminBookings() {
  return (
    <DashboardLayout role="admin">
      <PageHeader title="All bookings" description="Monitor every booking on the platform." />
      <div className="rounded-2xl border border-border bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-secondary/40 text-xs uppercase text-muted-foreground"><tr><th className="text-left p-4">Code</th><th className="text-left p-4">Customer</th><th className="text-left p-4">Car</th><th className="text-left p-4">Partner</th><th className="text-left p-4">Dates</th><th className="text-left p-4">Total</th><th className="text-left p-4">Status</th></tr></thead>
            <tbody className="divide-y divide-border">
              {bookings.map(b => (
                <tr key={b.id} className="hover:bg-secondary/30">
                  <td className="p-4 font-mono text-xs">{b.code}</td>
                  <td className="p-4">{b.customer.name}</td>
                  <td className="p-4 text-muted-foreground">{b.car.title}</td>
                  <td className="p-4 text-muted-foreground">{b.partner}</td>
                  <td className="p-4 text-muted-foreground">{b.pickupDate} → {b.returnDate}</td>
                  <td className="p-4 font-semibold">${b.total}</td>
                  <td className="p-4"><StatusBadge status={b.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}

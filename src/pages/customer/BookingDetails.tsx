import { useParams, Link } from "react-router-dom";
import DashboardLayout, { PageHeader } from "@/layouts/DashboardLayout";
import { bookings } from "@/lib/mock-data";
import { StatusBadge } from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MessageCircle, XCircle, Star, MapPin, Check } from "lucide-react";

export default function CustomerBookingDetails() {
  const { id } = useParams();
  const b = bookings.find((x) => x.id === id) ?? bookings[0];
  const steps = [
    { k: "pending", label: "Request sent" },
    { k: "confirmed", label: "Confirmed by partner" },
    { k: "active", label: "Rental active" },
    { k: "completed", label: "Completed" },
  ];
  const currentIdx = steps.findIndex((s) => s.k === b.status);

  return (
    <DashboardLayout role="customer">
      <Button asChild variant="ghost" size="sm" className="mb-4 -ml-3"><Link to="/customer/bookings"><ArrowLeft className="h-4 w-4 mr-1" /> Back</Link></Button>
      <PageHeader title={b.car.title} description={`Booking ${b.code}`} actions={<StatusBadge status={b.status} />} />

      <div className="grid lg:grid-cols-[1fr_360px] gap-6">
        <div className="space-y-6">
          <div className="rounded-2xl border border-border bg-card overflow-hidden">
            <img src={b.car.image} alt={b.car.title} className="w-full h-64 object-cover" />
            <div className="p-6 grid sm:grid-cols-3 gap-4">
              <div><p className="text-xs text-muted-foreground">Pickup</p><p className="font-semibold mt-1">{b.pickupDate}</p></div>
              <div><p className="text-xs text-muted-foreground">Return</p><p className="font-semibold mt-1">{b.returnDate}</p></div>
              <div><p className="text-xs text-muted-foreground">Location</p><p className="font-semibold mt-1 flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> {b.pickupLocation}</p></div>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6">
            <h3 className="font-display font-semibold mb-5">Status timeline</h3>
            <ol className="space-y-4">
              {steps.map((s, i) => {
                const done = i <= currentIdx && b.status !== "rejected";
                return (
                  <li key={s.k} className="flex items-start gap-3">
                    <span className={`grid h-7 w-7 place-items-center rounded-full ${done ? "bg-status-confirmed text-white" : "bg-secondary text-muted-foreground"}`}>
                      {done ? <Check className="h-3.5 w-3.5" /> : <span className="text-[11px]">{i + 1}</span>}
                    </span>
                    <div className="flex-1 pt-1">
                      <p className={`text-sm font-medium ${done ? "" : "text-muted-foreground"}`}>{s.label}</p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>

          {b.notes && (
            <div className="rounded-2xl border border-border bg-card p-6">
              <h3 className="font-display font-semibold mb-3">Notes</h3>
              <p className="text-sm text-muted-foreground">{b.notes}</p>
            </div>
          )}
        </div>

        <aside className="space-y-4">
          <div className="rounded-2xl border border-border bg-card p-6">
            <h3 className="font-display font-semibold mb-4">Payment summary</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-muted-foreground"><span>Subtotal</span><span>${b.subtotal}</span></div>
              <div className="flex justify-between text-muted-foreground"><span>Taxes & fees</span><span>${b.taxes}</span></div>
              <div className="flex justify-between font-semibold text-base pt-3 border-t border-border"><span>Total</span><span>${b.total}</span></div>
            </div>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6">
            <h3 className="font-display font-semibold mb-4">Rental partner</h3>
            <div className="flex items-center gap-3">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-accent text-accent-foreground font-bold">{b.partner.split(" ").map(w => w[0]).slice(0, 2).join("")}</div>
              <div><p className="text-sm font-semibold">{b.partner}</p><p className="text-xs text-muted-foreground">⭐ 4.9 · Verified</p></div>
            </div>
            <Button variant="outline" className="w-full mt-4 rounded-full"><MessageCircle className="h-4 w-4 mr-2" /> Contact partner</Button>
          </div>
          <div className="space-y-2">
            {b.status === "completed" && <Button className="w-full rounded-full"><Star className="h-4 w-4 mr-2" /> Leave a review</Button>}
            {(b.status === "pending" || b.status === "confirmed") && <Button variant="outline" className="w-full rounded-full text-destructive hover:text-destructive"><XCircle className="h-4 w-4 mr-2" /> Cancel request</Button>}
          </div>
        </aside>
      </div>
    </DashboardLayout>
  );
}

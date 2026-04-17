"use client";

import { useState } from "react";
import DashboardLayout, { PageHeader } from "@/layouts/DashboardLayout";
import { StatusBadge } from "@/components/StatusBadge";
import { bookings } from "@/lib/mock-data";
import type { Booking } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Check, X } from "lucide-react";
import { toast } from "sonner";

export default function PartnerRequests() {
  const [open, setOpen] = useState<Booking | null>(null);
  return (
    <DashboardLayout role="partner">
      <PageHeader title="Booking requests" description="Live requests from customers." />
      <div className="rounded-2xl border border-border bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-secondary/40 text-xs uppercase text-muted-foreground">
              <tr><th className="text-left p-4">Customer</th><th className="text-left p-4">Car</th><th className="text-left p-4">Dates</th><th className="text-left p-4">Amount</th><th className="text-left p-4">Status</th><th></th></tr>
            </thead>
            <tbody className="divide-y divide-border">
              {bookings.map((b) => (
                <tr key={b.id} className="hover:bg-secondary/30">
                  <td className="p-4"><div className="flex items-center gap-3"><div className="grid h-9 w-9 place-items-center rounded-full bg-accent text-accent-foreground font-semibold text-xs">{b.customer.name.split(" ").map(w => w[0]).join("")}</div><div><p className="font-semibold">{b.customer.name}</p><p className="text-xs text-muted-foreground">{b.code}</p></div></div></td>
                  <td className="p-4 text-muted-foreground">{b.car.title}</td>
                  <td className="p-4 text-muted-foreground">{b.pickupDate} → {b.returnDate}</td>
                  <td className="p-4 font-semibold">${b.total}</td>
                  <td className="p-4"><StatusBadge status={b.status} /></td>
                  <td className="p-4 text-right"><Button variant="outline" size="sm" className="rounded-full" onClick={() => setOpen(b)}>View</Button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Sheet open={!!open} onOpenChange={(v) => !v && setOpen(null)}>
        <SheetContent className="w-full sm:max-w-md overflow-y-auto">
          {open && (
            <div className="space-y-5 mt-6">
              <div>
                <p className="text-xs text-muted-foreground font-mono">{open.code}</p>
                <h3 className="font-display text-xl font-bold mt-1">{open.car.title}</h3>
                <div className="mt-2"><StatusBadge status={open.status} /></div>
              </div>
              <img src={open.car.image} className="w-full h-40 object-cover rounded-xl" alt="" />
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-xl border border-border p-3"><p className="text-xs text-muted-foreground">Pickup</p><p className="font-semibold">{open.pickupDate}</p></div>
                <div className="rounded-xl border border-border p-3"><p className="text-xs text-muted-foreground">Return</p><p className="font-semibold">{open.returnDate}</p></div>
                <div className="rounded-xl border border-border p-3 col-span-2"><p className="text-xs text-muted-foreground">Customer</p><p className="font-semibold">{open.customer.name}</p><p className="text-xs text-muted-foreground">{open.customer.email}</p></div>
              </div>
              <div className="rounded-xl border border-border p-4 space-y-1.5 text-sm">
                <div className="flex justify-between text-muted-foreground"><span>Subtotal</span><span>${open.subtotal}</span></div>
                <div className="flex justify-between text-muted-foreground"><span>Taxes</span><span>${open.taxes}</span></div>
                <div className="flex justify-between font-semibold pt-2 border-t border-border"><span>Total</span><span>${open.total}</span></div>
              </div>
              {open.notes && <div className="rounded-xl border border-border p-4"><p className="text-xs text-muted-foreground mb-1">Customer notes</p><p className="text-sm">{open.notes}</p></div>}
              <div className="grid grid-cols-2 gap-2">
                <Button onClick={() => { toast.success("Request accepted"); setOpen(null); }} className="rounded-full"><Check className="h-4 w-4 mr-1" /> Accept</Button>
                <Button variant="outline" onClick={() => { toast("Request rejected"); setOpen(null); }} className="rounded-full text-destructive hover:text-destructive"><X className="h-4 w-4 mr-1" /> Reject</Button>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </DashboardLayout>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import DashboardLayout, { PageHeader } from "@/layouts/DashboardLayout";
import { StatusBadge } from "@/components/StatusBadge";
import { bookings } from "@/lib/mock-data";
import type { BookingStatus } from "@/lib/mock-data";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { CalendarDays } from "lucide-react";

const tabs: { value: "all" | BookingStatus; label: string }[] = [
  { value: "all", label: "All" },
  { value: "pending", label: "Pending" },
  { value: "confirmed", label: "Confirmed" },
  { value: "active", label: "Active" },
  { value: "completed", label: "Completed" },
  { value: "rejected", label: "Cancelled" },
];

export default function CustomerBookings() {
  const [tab, setTab] = useState<"all" | BookingStatus>("all");
  const list = tab === "all" ? bookings : bookings.filter((b) => b.status === tab);

  return (
    <DashboardLayout role="customer">
      <PageHeader title="My bookings" description="Track all your rentals in one place." />
      <Tabs value={tab} onValueChange={(v) => setTab(v as any)}>
        <TabsList className="overflow-x-auto">
          {tabs.map((t) => <TabsTrigger key={t.value} value={t.value}>{t.label}</TabsTrigger>)}
        </TabsList>
      </Tabs>

      <div className="mt-6 space-y-3">
        {list.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border bg-card p-16 text-center">
            <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-secondary"><CalendarDays className="h-6 w-6 text-muted-foreground" /></div>
            <h3 className="mt-5 font-display font-semibold text-lg">No bookings yet</h3>
            <p className="mt-2 text-sm text-muted-foreground">When you book a car, it'll show up here.</p>
            <Button asChild className="mt-6 rounded-full"><Link href="/cars">Browse cars</Link></Button>
          </div>
        ) : list.map((b) => (
          <Link key={b.id} href={`/customer/bookings/${b.id}`} className="block rounded-2xl border border-border bg-card hover:shadow-soft transition-shadow">
            <div className="flex flex-col sm:flex-row gap-4 p-4">
              <img src={b.car.image} alt={b.car.title} className="h-32 sm:h-24 sm:w-32 w-full rounded-xl object-cover" />
              <div className="flex-1 min-w-0 grid sm:grid-cols-[1fr_auto] gap-4">
                <div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground"><span className="font-mono">{b.code}</span> · <span>{b.partner}</span></div>
                  <h3 className="font-display font-semibold text-lg mt-1 truncate">{b.car.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{b.pickupDate} → {b.returnDate} · {b.days} days</p>
                </div>
                <div className="flex sm:flex-col items-start sm:items-end justify-between gap-2">
                  <StatusBadge status={b.status} />
                  <p className="font-display text-lg font-bold">${b.total}</p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </DashboardLayout>
  );
}

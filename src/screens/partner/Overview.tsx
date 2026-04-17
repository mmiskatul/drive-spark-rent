"use client";

import Link from "next/link";
import DashboardLayout, { PageHeader, StatCard } from "@/layouts/DashboardLayout";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/StatusBadge";
import { bookings, cars } from "@/lib/mock-data";
import { Car, CalendarDays, Clock, DollarSign, Plus, ArrowRight, TrendingUp } from "lucide-react";

export default function PartnerOverview() {
  return (
    <DashboardLayout role="partner">
      <PageHeader
        title="Partner dashboard"
        description="Live overview of your fleet and bookings."
        actions={<Button asChild className="rounded-full"><Link href="/partner/cars/new"><Plus className="h-4 w-4 mr-1" /> Add car</Link></Button>}
      />

      <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard label="Total cars" value="42" icon={Car} />
        <StatCard label="Active listings" value="38" icon={Car} tone="success" />
        <StatCard label="Pending requests" value="6" icon={Clock} tone="warning" delta="+2 today" />
        <StatCard label="Confirmed" value="14" icon={CalendarDays} tone="info" />
        <StatCard label="Earnings (30d)" value="$24.8k" icon={DollarSign} tone="success" delta="+12.4%" />
      </div>

      <div className="mt-6 grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 rounded-2xl border border-border bg-card">
          <div className="flex items-center justify-between p-5 border-b border-border">
            <div className="flex items-center gap-2">
              <span className="live-dot" />
              <h3 className="font-display font-semibold">Live booking requests</h3>
            </div>
            <Button asChild variant="ghost" size="sm"><Link href="/partner/requests">View all <ArrowRight className="ml-1 h-3.5 w-3.5" /></Link></Button>
          </div>
          <div className="divide-y divide-border">
            {bookings.slice(0, 4).map((b) => (
              <div key={b.id} className="flex items-center gap-4 p-4 hover:bg-secondary/40">
                <img src={b.car.image} alt="" className="h-14 w-20 rounded-lg object-cover" />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold truncate text-sm">{b.car.title}</p>
                  <p className="text-xs text-muted-foreground">{b.customer.name} · {b.pickupDate} → {b.returnDate}</p>
                </div>
                <StatusBadge status={b.status} />
                <span className="hidden sm:block font-semibold">${b.total}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5">
          <h3 className="font-display font-semibold flex items-center gap-2"><TrendingUp className="h-4 w-4 text-primary" /> Fleet performance</h3>
          <div className="mt-5 space-y-4">
            {cars.slice(0, 4).map((c, i) => (
              <div key={c.id}>
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="font-medium truncate">{c.title}</span>
                  <span className="text-muted-foreground">{90 - i * 12}%</span>
                </div>
                <div className="h-2 rounded-full bg-secondary overflow-hidden">
                  <div className="h-full brand-gradient rounded-full" style={{ width: `${90 - i * 12}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

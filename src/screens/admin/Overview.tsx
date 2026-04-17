"use client";

import DashboardLayout, { PageHeader, StatCard } from "@/layouts/DashboardLayout";
import { Users, Car, ShieldCheck, CalendarDays, AlertTriangle, TrendingUp } from "lucide-react";
import { StatusBadge } from "@/components/StatusBadge";
import { bookings, partners } from "@/lib/mock-data";

export default function AdminOverview() {
  return (
    <DashboardLayout role="admin">
      <PageHeader title="Platform overview" description="System health, growth and activity at a glance." />
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total users" value="12,486" delta="+248" icon={Users} tone="info" />
        <StatCard label="Rental Partners" value="384" icon={ShieldCheck} tone="success" />
        <StatCard label="Total bookings" value="48,201" icon={CalendarDays} />
        <StatCard label="Pending verifications" value="14" icon={AlertTriangle} tone="warning" />
      </div>
      <div className="mt-6 grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 rounded-2xl border border-border bg-card p-6">
          <h3 className="font-display font-semibold flex items-center gap-2"><TrendingUp className="h-4 w-4 text-primary" /> Booking volume (12mo)</h3>
          <div className="mt-6 flex items-end gap-2 h-48">
            {[40, 55, 48, 62, 70, 65, 80, 75, 90, 85, 95, 110].map((v, i) => (
              <div key={i} className="flex-1 rounded-t-md brand-gradient hover:opacity-80 transition-opacity" style={{ height: `${(v / 110) * 100}%` }} />
            ))}
          </div>
        </div>
        <div className="rounded-2xl border border-border bg-card p-6">
          <h3 className="font-display font-semibold mb-4">Recent activity</h3>
          <div className="space-y-3">
            {bookings.slice(0, 5).map(b => (
              <div key={b.id} className="flex items-center gap-3 text-sm">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-accent text-accent-foreground text-xs font-semibold">{b.customer.name.split(" ").map(w => w[0]).join("")}</span>
                <div className="flex-1 min-w-0"><p className="truncate"><span className="font-semibold">{b.customer.name}</span> · {b.code}</p><p className="text-xs text-muted-foreground truncate">{b.car.title}</p></div>
                <StatusBadge status={b.status} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

"use client";

import DashboardLayout, { PageHeader, StatCard } from "@/layouts/DashboardLayout";
import { DollarSign, TrendingUp, Calendar, Car } from "lucide-react";
import { cars } from "@/lib/mock-data";

export default function PartnerReports() {
  const data = [22, 35, 28, 42, 38, 55, 48, 62, 58, 70, 65, 80];
  const max = Math.max(...data);
  return (
    <DashboardLayout role="partner">
      <PageHeader title="Reports & earnings" description="Revenue and performance over time." />
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Revenue (30d)" value="$24,860" delta="+12.4%" icon={DollarSign} tone="success" />
        <StatCard label="Bookings" value="148" delta="+8.1%" icon={Calendar} tone="info" />
        <StatCard label="Utilization" value="76%" icon={TrendingUp} />
        <StatCard label="Active cars" value="38" icon={Car} />
      </div>
      <div className="mt-6 grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 rounded-2xl border border-border bg-card p-6">
          <h3 className="font-display font-semibold mb-6">Revenue trend</h3>
          <div className="flex items-end gap-2 h-48">
            {data.map((v, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full rounded-t-md brand-gradient transition-all hover:opacity-80" style={{ height: `${(v / max) * 100}%` }} />
                <span className="text-[10px] text-muted-foreground">{["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][i]}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-2xl border border-border bg-card p-6">
          <h3 className="font-display font-semibold mb-4">Top cars</h3>
          <div className="space-y-3">
            {cars.slice(0, 4).map((c) => (
              <div key={c.id} className="flex items-center gap-3">
                <img src={c.image} className="h-10 w-14 rounded-md object-cover" alt="" />
                <div className="flex-1 min-w-0"><p className="text-sm font-medium truncate">{c.title}</p><p className="text-xs text-muted-foreground">{c.reviews} bookings</p></div>
                <p className="text-sm font-semibold">${c.pricePerDay * 8}k</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

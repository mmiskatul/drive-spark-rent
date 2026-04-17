"use client";

import DashboardLayout, { PageHeader, StatCard } from "@/layouts/DashboardLayout";
import { TrendingUp, Users, DollarSign, MapPin } from "lucide-react";

export default function AdminAnalytics() {
  const data = [30, 45, 38, 55, 60, 52, 70, 68, 82, 78, 90, 100];
  return (
    <DashboardLayout role="admin">
      <PageHeader title="Analytics" description="Platform growth and KPIs." />
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Revenue (YTD)" value="$1.84M" delta="+22%" icon={DollarSign} tone="success" />
        <StatCard label="New users" value="1,248" delta="+18%" icon={Users} tone="info" />
        <StatCard label="Conversion" value="4.6%" delta="+0.4%" icon={TrendingUp} />
        <StatCard label="Top city" value="Dubai" icon={MapPin} />
      </div>
      <div className="mt-6 rounded-2xl border border-border bg-card p-6">
        <h3 className="font-display font-semibold mb-6">Growth trend</h3>
        <div className="flex items-end gap-2 h-56">
          {data.map((v, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-2">
              <div className="w-full rounded-t-md brand-gradient" style={{ height: `${v}%` }} />
              <span className="text-[10px] text-muted-foreground">{["J","F","M","A","M","J","J","A","S","O","N","D"][i]}</span>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}

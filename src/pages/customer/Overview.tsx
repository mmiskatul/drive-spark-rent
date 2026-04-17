import { Link } from "react-router-dom";
import { CalendarDays, Clock, CarFront, CheckCircle2, ArrowRight, Sparkles } from "lucide-react";
import DashboardLayout, { PageHeader, StatCard } from "@/layouts/DashboardLayout";
import { Button } from "@/components/ui/button";
import { CarCard } from "@/components/CarCard";
import { StatusBadge } from "@/components/StatusBadge";
import { bookings, cars } from "@/lib/mock-data";

export default function CustomerOverview() {
  return (
    <DashboardLayout role="customer">
      <PageHeader
        title="Welcome back, Ahmed"
        description="Here's a snapshot of your rentals and recommendations."
        actions={<Button asChild className="rounded-full"><Link to="/cars">Find a car</Link></Button>}
      />

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total bookings" value="12" icon={CalendarDays} delta="+3 this month" />
        <StatCard label="Pending" value="1" icon={Clock} tone="warning" />
        <StatCard label="Active rentals" value="1" icon={CarFront} tone="info" />
        <StatCard label="Completed" value="9" icon={CheckCircle2} tone="success" />
      </div>

      <div className="mt-6 grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 rounded-2xl border border-border bg-card">
          <div className="flex items-center justify-between p-5 border-b border-border">
            <div>
              <h3 className="font-display font-semibold">Recent activity</h3>
              <p className="text-xs text-muted-foreground mt-0.5">Your last bookings</p>
            </div>
            <Button asChild variant="ghost" size="sm"><Link to="/customer/bookings">All bookings <ArrowRight className="ml-1 h-3.5 w-3.5" /></Link></Button>
          </div>
          <div className="divide-y divide-border">
            {bookings.slice(0, 4).map((b) => (
              <div key={b.id} className="flex items-center gap-4 p-4 hover:bg-secondary/40 transition-colors">
                <img src={b.car.image} alt={b.car.title} className="h-14 w-20 rounded-lg object-cover" />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold truncate">{b.car.title}</p>
                  <p className="text-xs text-muted-foreground">{b.code} · {b.pickupDate} → {b.returnDate}</p>
                </div>
                <div className="flex items-center gap-3">
                  <StatusBadge status={b.status} />
                  <span className="hidden sm:block font-semibold">${b.total}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card">
          <div className="p-5 border-b border-border flex items-center gap-2">
            <span className="live-dot" />
            <h3 className="font-display font-semibold">Notifications</h3>
          </div>
          <div className="divide-y divide-border">
            {[
              { t: "Booking DN-48201 received by partner", time: "2m ago", color: "active" },
              { t: "Your trip starts tomorrow", time: "1h ago", color: "warning" },
              { t: "Tesla Model Y is now available", time: "3h ago", color: "default" },
            ].map((n, i) => (
              <div key={i} className="p-4 hover:bg-secondary/40 transition-colors">
                <p className="text-sm font-medium">{n.t}</p>
                <p className="text-xs text-muted-foreground mt-1">{n.time}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display font-semibold flex items-center gap-2"><Sparkles className="h-4 w-4 text-primary" /> Recommended for you</h3>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {cars.slice(0, 3).map((c) => <CarCard key={c.id} car={c} />)}
        </div>
      </div>
    </DashboardLayout>
  );
}

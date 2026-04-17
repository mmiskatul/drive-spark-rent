import DashboardLayout, { PageHeader } from "@/layouts/DashboardLayout";
import { Button } from "@/components/ui/button";

const days = Array.from({ length: 35 }, (_, i) => i - 2);
const booked = [3, 4, 5, 12, 13, 18, 19, 20, 25];
const blocked = [9, 10, 22];
const maint = [27];

export default function PartnerCalendar() {
  return (
    <DashboardLayout role="partner">
      <PageHeader title="Availability calendar" description="April 2026 — Mercedes-Benz GLE 450" actions={<Button className="rounded-full">Block dates</Button>} />
      <div className="rounded-2xl border border-border bg-card p-6">
        <div className="grid grid-cols-7 gap-1 text-xs font-semibold text-muted-foreground mb-2">
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(d => <div key={d} className="p-2 text-center">{d}</div>)}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {days.map((d, i) => {
            const isBooked = booked.includes(d);
            const isBlocked = blocked.includes(d);
            const isMaint = maint.includes(d);
            const empty = d <= 0 || d > 30;
            return (
              <div key={i} className={`aspect-square rounded-lg p-2 text-sm border ${empty ? "bg-transparent border-transparent text-transparent" : isBooked ? "bg-status-confirmed-bg text-status-confirmed border-status-confirmed/20" : isBlocked ? "bg-status-rejected-bg text-status-rejected border-status-rejected/20" : isMaint ? "bg-status-pending-bg text-status-pending border-status-pending/20" : "bg-secondary/30 border-border hover:bg-secondary"}`}>
                {empty ? "·" : d}
              </div>
            );
          })}
        </div>
        <div className="mt-6 flex flex-wrap gap-4 text-xs text-muted-foreground">
          <Legend color="bg-status-confirmed" label="Booked" />
          <Legend color="bg-status-rejected" label="Blocked" />
          <Legend color="bg-status-pending" label="Maintenance" />
          <Legend color="bg-secondary border border-border" label="Available" />
        </div>
      </div>
    </DashboardLayout>
  );
}
function Legend({ color, label }: { color: string; label: string }) {
  return <div className="flex items-center gap-2"><span className={`h-3 w-3 rounded ${color}`} /> {label}</div>;
}

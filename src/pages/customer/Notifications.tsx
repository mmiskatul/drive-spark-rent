import DashboardLayout, { PageHeader } from "@/layouts/DashboardLayout";
import { Bell } from "lucide-react";

const items = [
  { t: "Booking DN-48201 received", d: "Your request has been sent to Prestige Auto Rentals.", time: "2m ago", read: false },
  { t: "Your trip starts tomorrow", d: "Pickup at Dubai Marina at 10:00 AM.", time: "1h ago", read: false },
  { t: "Booking DN-48180 confirmed", d: "EcoMotion Rentals confirmed your Tesla Model Y.", time: "3h ago", read: true },
  { t: "Welcome to DriveNow", d: "Get $20 off your first booking with code DRIVE20.", time: "Yesterday", read: true },
];

export default function CustomerNotifications() {
  return (
    <DashboardLayout role="customer">
      <PageHeader title="Notifications" description="Stay on top of your bookings and account activity." />
      <div className="rounded-2xl border border-border bg-card divide-y divide-border">
        {items.map((n, i) => (
          <div key={i} className={`flex items-start gap-4 p-5 ${!n.read ? "bg-accent/30" : ""}`}>
            <span className={`mt-1 grid h-9 w-9 place-items-center rounded-full ${!n.read ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"}`}>
              <Bell className="h-4 w-4" />
            </span>
            <div className="flex-1">
              <p className="font-semibold text-sm">{n.t}</p>
              <p className="text-sm text-muted-foreground mt-0.5">{n.d}</p>
              <p className="text-xs text-muted-foreground mt-2">{n.time}</p>
            </div>
            {!n.read && <span className="h-2 w-2 rounded-full bg-primary mt-2" />}
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}

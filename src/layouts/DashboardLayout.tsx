import { ReactNode, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import {
  LayoutDashboard, CalendarDays, Bell, User, Car, BarChart3,
  ShieldCheck, Users, Settings, Search, ChevronDown, LogOut, Menu, X, Plus,
} from "lucide-react";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export type Role = "customer" | "partner" | "admin";

const navByRole: Record<Role, { to: string; label: string; icon: typeof LayoutDashboard }[]> = {
  customer: [
    { to: "/customer", label: "Overview", icon: LayoutDashboard },
    { to: "/customer/bookings", label: "My bookings", icon: CalendarDays },
    { to: "/customer/notifications", label: "Notifications", icon: Bell },
    { to: "/customer/profile", label: "Profile", icon: User },
  ],
  partner: [
    { to: "/partner", label: "Overview", icon: LayoutDashboard },
    { to: "/partner/cars", label: "My cars", icon: Car },
    { to: "/partner/requests", label: "Requests", icon: Bell },
    { to: "/partner/calendar", label: "Calendar", icon: CalendarDays },
    { to: "/partner/reports", label: "Reports", icon: BarChart3 },
    { to: "/partner/profile", label: "Profile", icon: ShieldCheck },
  ],
  admin: [
    { to: "/admin", label: "Overview", icon: LayoutDashboard },
    { to: "/admin/users", label: "Users", icon: Users },
    { to: "/admin/verifications", label: "Verifications", icon: ShieldCheck },
    { to: "/admin/cars", label: "Cars", icon: Car },
    { to: "/admin/bookings", label: "Bookings", icon: CalendarDays },
    { to: "/admin/analytics", label: "Analytics", icon: BarChart3 },
    { to: "/admin/settings", label: "Settings", icon: Settings },
  ],
};

const roleMeta: Record<Role, { label: string; name: string; subtitle: string; initials: string }> = {
  customer: { label: "Customer", name: "Ahmed Hassan", subtitle: "ahmed@example.com", initials: "AH" },
  partner:  { label: "Rental Partner", name: "Prestige Auto", subtitle: "Verified partner", initials: "PA" },
  admin:    { label: "Admin", name: "Admin Console", subtitle: "Platform owner", initials: "AD" },
};

function SidebarBody({ role, onNavigate }: { role: Role; onNavigate?: () => void }) {
  const items = navByRole[role];
  const meta = roleMeta[role];
  return (
    <div className="flex h-full flex-col">
      <div className="flex h-16 items-center px-6 border-b border-sidebar-border">
        <Logo />
      </div>
      <div className="px-4 pt-4 pb-2">
        <p className="px-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">{meta.label}</p>
      </div>
      <nav className="flex-1 px-3 space-y-1 overflow-y-auto">
        {items.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === `/${role}`}
            onClick={onNavigate}
            className={({ isActive }) => cn(
              "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
              isActive
                ? "bg-sidebar-accent text-sidebar-accent-foreground"
                : "text-sidebar-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground",
            )}
          >
            <item.icon className="h-4 w-4" />
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="m-3 rounded-2xl border border-sidebar-border bg-sidebar-accent/40 p-4">
        <div className="flex items-center gap-3">
          <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full brand-gradient text-primary-foreground text-xs font-semibold">
            {meta.initials}
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-sidebar-foreground">{meta.name}</p>
            <p className="truncate text-xs text-muted-foreground">{meta.subtitle}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DashboardLayout({ role, children }: { role: Role; children?: ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const meta = roleMeta[role];
  const location = useLocation();
  const items = navByRole[role];
  const current = items.find((i) => location.pathname === i.to) ?? items.find((i) => location.pathname.startsWith(i.to)) ?? items[0];

  return (
    <div className="min-h-screen bg-secondary/30 flex">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex w-64 shrink-0 flex-col border-r border-sidebar-border bg-sidebar sticky top-0 h-screen">
        <SidebarBody role={role} />
      </aside>

      {/* Mobile sheet */}
      {mobileOpen && (
        <>
          <div className="fixed inset-0 z-40 bg-foreground/40 backdrop-blur-sm lg:hidden" onClick={() => setMobileOpen(false)} />
          <aside className="fixed inset-y-0 left-0 z-50 w-72 bg-sidebar border-r border-sidebar-border lg:hidden animate-fade-in">
            <SidebarBody role={role} onNavigate={() => setMobileOpen(false)} />
          </aside>
        </>
      )}

      <div className="flex-1 min-w-0 flex flex-col">
        <header className="sticky top-0 z-30 h-16 border-b border-border bg-background/80 backdrop-blur-xl">
          <div className="flex h-full items-center justify-between gap-4 px-4 sm:px-6">
            <div className="flex items-center gap-3 min-w-0">
              <button
                className="lg:hidden -ml-2 inline-flex h-10 w-10 items-center justify-center rounded-lg hover:bg-secondary"
                onClick={() => setMobileOpen(true)}
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5" />
              </button>
              <div className="hidden md:block min-w-0">
                <p className="text-xs text-muted-foreground">{meta.label}</p>
                <h1 className="font-display font-semibold truncate">{current.label}</h1>
              </div>
            </div>

            <div className="hidden md:flex flex-1 max-w-md">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search…" className="pl-9 h-10 rounded-full bg-secondary border-transparent focus-visible:bg-background" />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="relative rounded-full">
                <Bell className="h-4 w-4" />
                <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-destructive ring-2 ring-background" />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-2 rounded-full pl-1 pr-3 py-1 hover:bg-secondary transition-colors">
                    <span className="grid h-8 w-8 place-items-center rounded-full brand-gradient text-primary-foreground text-xs font-semibold">{meta.initials}</span>
                    <span className="hidden sm:flex items-center gap-1 text-sm font-medium">
                      {meta.name.split(" ")[0]} <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
                    </span>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>{meta.name}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild><Link to={`/${role}/profile`}>Profile</Link></DropdownMenuItem>
                  <DropdownMenuItem asChild><Link to="/">Switch role</Link></DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild><Link to="/login" className="text-destructive"><LogOut className="h-4 w-4 mr-2" />Sign out</Link></DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {children ?? <Outlet />}
        </main>
      </div>
    </div>
  );
}

export function PageHeader({ title, description, actions }: { title: string; description?: string; actions?: ReactNode }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
      <div>
        <h2 className="text-2xl font-display font-bold tracking-tight">{title}</h2>
        {description && <p className="text-sm text-muted-foreground mt-1">{description}</p>}
      </div>
      {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
    </div>
  );
}

export function StatCard({
  label, value, delta, icon: Icon, tone = "default",
}: { label: string; value: string | number; delta?: string; icon: typeof LayoutDashboard; tone?: "default" | "success" | "warning" | "info" }) {
  const tones = {
    default: "bg-secondary text-foreground",
    success: "bg-status-confirmed-bg text-status-confirmed",
    warning: "bg-status-pending-bg text-status-pending",
    info: "bg-status-active-bg text-status-active",
  };
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-xs card-hover">
      <div className="flex items-start justify-between">
        <span className={cn("inline-flex h-10 w-10 items-center justify-center rounded-xl", tones[tone])}>
          <Icon className="h-5 w-5" />
        </span>
        {delta && <span className="text-xs font-medium text-status-confirmed">{delta}</span>}
      </div>
      <p className="mt-4 text-2xl font-display font-bold tracking-tight">{value}</p>
      <p className="text-xs text-muted-foreground mt-1">{label}</p>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, LogOut, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/Logo";
import { cn } from "@/lib/utils";

const links = [
  { to: "/cars", label: "Browse cars" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
  { to: "/faq", label: "FAQ" },
];

type PublicSession = {
  user?: {
    role?: "customer" | "partner" | "admin";
  };
};

const dashboardByRole = {
  customer: "/customer",
  partner: "/partner",
  admin: "/admin",
};

export function PublicNavbar() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [session, setSession] = useState<PublicSession | null>(null);
  const pathname = usePathname() ?? "";
  const role = session?.user?.role;
  const dashboardHref = role ? dashboardByRole[role] : "/customer";
  const showDashboardActions = role === "customer" || role === "partner";

  useEffect(() => {
    let ignore = false;

    async function loadSession() {
      try {
        const response = await fetch("/api/auth/session", { cache: "no-store" });

        if (!response.ok) {
          return;
        }

        const data = (await response.json()) as PublicSession;

        if (!ignore) {
          setSession(data);
        }
      } catch {
        if (!ignore) {
          setSession(null);
        }
      }
    }

    void loadSession();

    return () => {
      ignore = true;
    };
  }, []);

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    setSession(null);
    setOpen(false);
    router.push("/");
    router.refresh();
  }

  return (
    <header className={cn(
      "sticky top-0 z-50 w-full border-b transition-colors",
      "bg-background/80 backdrop-blur-xl border-border/60",
    )}>
      <div className="container flex h-16 items-center justify-between gap-4">
        <div className="flex items-center gap-8">
          <Logo />
          <nav className="hidden lg:flex items-center gap-1">
            {links.map((l) => (
              <Link
                key={l.to}
                href={l.to}
                className={cn(
                  "px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                  pathname === l.to ? "text-foreground bg-secondary" : "text-muted-foreground hover:text-foreground hover:bg-secondary/60",
                )}
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>

        {showDashboardActions ? (
          <div className="hidden md:flex items-center gap-2">
            <Button asChild variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
              <Link href={dashboardHref}>
                <LayoutDashboard className="mr-2 h-4 w-4" />
                Dashboard
              </Link>
            </Button>
            <Button type="button" size="sm" className="rounded-full px-5 shadow-soft" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        ) : (
          <div className="hidden md:flex items-center gap-2">
            <Button asChild variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
              <Link href="/login">Sign in</Link>
            </Button>
            <Button asChild size="sm" className="rounded-full px-5 shadow-soft">
              <Link href="/register">Get started</Link>
            </Button>
          </div>
        )}

        <button
          className="lg:hidden -mr-2 inline-flex h-10 w-10 items-center justify-center rounded-lg text-foreground hover:bg-secondary"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t border-border/60 bg-background animate-fade-in">
          <div className="container py-4 space-y-1">
            {links.map((l) => (
              <Link
                key={l.to}
                href={l.to}
                onClick={() => setOpen(false)}
                className={cn(
                  "block px-3 py-2.5 text-sm font-medium rounded-lg",
                  pathname === l.to ? "bg-secondary text-foreground" : "text-muted-foreground",
                )}
              >
                {l.label}
              </Link>
            ))}
            {showDashboardActions ? (
              <div className="pt-3 grid grid-cols-2 gap-2">
                <Button asChild variant="outline" size="sm">
                  <Link href={dashboardHref} onClick={() => setOpen(false)}>
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    Dashboard
                  </Link>
                </Button>
                <Button type="button" size="sm" onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Button>
              </div>
            ) : (
              <div className="pt-3 grid grid-cols-2 gap-2">
                <Button asChild variant="outline" size="sm"><Link href="/login">Sign in</Link></Button>
                <Button asChild size="sm"><Link href="/register">Get started</Link></Button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

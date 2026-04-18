"use client";

import DashboardLayout, { PageHeader } from "@/layouts/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Bell, Mail, ShieldCheck, SlidersHorizontal } from "lucide-react";
import { toast } from "sonner";

export default function AdminSettings() {
  return (
    <DashboardLayout role="admin">
      <PageHeader title="Settings" description="Manage platform defaults and admin preferences." />

      <div className="grid gap-6 lg:grid-cols-3">
        <section className="space-y-5 rounded-2xl border border-border bg-card p-6 lg:col-span-2">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="h-4 w-4 text-primary" />
            <h3 className="font-display font-semibold">Platform settings</h3>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="platform-name">Platform name</Label>
              <Input id="platform-name" className="mt-1.5" defaultValue="Drive Spark Rent" />
            </div>
            <div>
              <Label htmlFor="support-email">Support email</Label>
              <Input id="support-email" className="mt-1.5" type="email" defaultValue="support@drivespark.ae" />
            </div>
            <div>
              <Label htmlFor="default-city">Default city</Label>
              <Input id="default-city" className="mt-1.5" defaultValue="Dubai" />
            </div>
            <div>
              <Label htmlFor="commission">Partner commission</Label>
              <Input id="commission" className="mt-1.5" defaultValue="12%" />
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            {[
              {
                icon: ShieldCheck,
                label: "Require partner verification",
                description: "Partners must be approved before publishing cars.",
                enabled: true,
              },
              {
                icon: Mail,
                label: "Email verification",
                description: "New accounts must verify email before dashboard access.",
                enabled: true,
              },
              {
                icon: Bell,
                label: "Admin alerts",
                description: "Send alerts for pending verifications and disputes.",
                enabled: true,
              },
            ].map((item) => {
              const Icon = item.icon;

              return (
                <div key={item.label} className="flex items-center justify-between gap-4 rounded-xl border border-border bg-secondary/30 p-4">
                  <div className="flex min-w-0 items-start gap-3">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-accent text-accent-foreground">
                      <Icon className="h-4 w-4" />
                    </span>
                    <div className="min-w-0">
                      <p className="font-medium">{item.label}</p>
                      <p className="text-xs text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                  <Switch defaultChecked={item.enabled} />
                </div>
              );
            })}
          </div>

          <Button className="rounded-full" onClick={() => toast.success("Settings saved")}>
            Save settings
          </Button>
        </section>

        <aside className="space-y-4">
          <div className="rounded-2xl border border-border bg-card p-6">
            <h3 className="font-display font-semibold">System status</h3>
            <div className="mt-4 space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">API</span>
                <span className="font-medium text-status-confirmed">Operational</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Payments</span>
                <span className="font-medium text-status-confirmed">Operational</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Email</span>
                <span className="font-medium text-status-confirmed">Operational</span>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6">
            <h3 className="font-display font-semibold">Maintenance</h3>
            <p className="mt-2 text-xs text-muted-foreground">
              Temporarily pause public booking actions while keeping admin access available.
            </p>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-sm">Maintenance mode</span>
              <Switch />
            </div>
          </div>
        </aside>
      </div>
    </DashboardLayout>
  );
}

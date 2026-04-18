"use client";

import { type FormEvent, useEffect, useState } from "react";
import DashboardLayout, { PageHeader } from "@/layouts/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Camera } from "lucide-react";
import { getInitials, type ProfileUser } from "@/lib/profile";
import { toast } from "sonner";

export default function CustomerProfile() {
  const [user, setUser] = useState<ProfileUser | null>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    async function loadProfile() {
      try {
        const response = await fetch("/api/auth/me", { cache: "no-store" });

        if (!response.ok) {
          throw new Error("Could not load profile.");
        }

        const data = (await response.json()) as ProfileUser;
        setUser(data);
        setName(data.name);
        setPhone(data.phone ?? "");
        setAddress(data.address ?? "");
      } catch (error) {
        toast.error("Could not load profile", {
          description: error instanceof Error ? error.message : "Please refresh the page.",
        });
      }
    }

    void loadProfile();
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSaving(true);

    try {
      const response = await fetch("/api/auth/me", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, address }),
      });
      const data = (await response.json()) as ProfileUser;

      if (!response.ok) {
        throw new Error("Could not update profile.");
      }

      setUser(data);
      setName(data.name);
      setPhone(data.phone ?? phone);
      setAddress(data.address ?? address);
      toast.success("Profile updated");
    } catch (error) {
      toast.error("Could not update profile", {
        description: error instanceof Error ? error.message : "Please try again.",
      });
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <DashboardLayout role="customer">
      <PageHeader title="Profile & settings" description="Manage your account and preferences." />
      <div className="grid gap-6 lg:grid-cols-3">
        <form onSubmit={handleSubmit} className="space-y-5 rounded-2xl border border-border bg-card p-6 lg:col-span-2">
          <h3 className="font-display font-semibold">Personal information</h3>
          <div className="flex items-center gap-5">
            <div className="relative">
              <div className="grid h-20 w-20 place-items-center rounded-full brand-gradient text-xl font-bold text-primary-foreground">
                {getInitials(name || user?.name || "User")}
              </div>
              <button type="button" className="absolute -bottom-1 -right-1 grid h-8 w-8 place-items-center rounded-full border border-border bg-card shadow-soft">
                <Camera className="h-3.5 w-3.5" />
              </button>
            </div>
            <div>
              <p className="font-semibold">{user?.name ?? "Loading..."}</p>
              <p className="text-xs text-muted-foreground">{user?.email ?? "Loading account"}</p>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label>Full name</Label>
              <Input className="mt-1.5" value={name} onChange={(event) => setName(event.target.value)} />
            </div>
            <div>
              <Label>Email</Label>
              <Input className="mt-1.5" value={user?.email ?? ""} disabled />
            </div>
            <div>
              <Label>Phone</Label>
              <Input
                className="mt-1.5"
                type="tel"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                placeholder="+971 50 123 4567"
              />
            </div>
            <div>
              <Label>Address</Label>
              <Input
                className="mt-1.5"
                value={address}
                onChange={(event) => setAddress(event.target.value)}
                placeholder="Dubai Marina, UAE"
              />
            </div>
          </div>
          <Button type="submit" className="rounded-full" disabled={isSaving || !name.trim()}>
            {isSaving ? "Saving..." : "Save changes"}
          </Button>
        </form>

        <div className="space-y-4">
          <div className="space-y-4 rounded-2xl border border-border bg-card p-6">
            <h3 className="font-display font-semibold">Notifications</h3>
            {[
              ["Booking updates", true],
              ["New car alerts", true],
              ["Promotions", false],
              ["Newsletter", false],
            ].map(([label, value]) => (
              <div key={label as string} className="flex items-center justify-between">
                <span className="text-sm">{label as string}</span>
                <Switch defaultChecked={value as boolean} />
              </div>
            ))}
          </div>
          <div className="rounded-2xl border border-border bg-card p-6">
            <h3 className="font-display mb-4 font-semibold">Password</h3>
            <Button variant="outline" className="w-full rounded-full">Change password</Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

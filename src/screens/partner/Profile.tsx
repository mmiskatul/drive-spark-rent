"use client";

import { type FormEvent, useEffect, useState } from "react";
import DashboardLayout, { PageHeader } from "@/layouts/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BadgeCheck, UploadCloud } from "lucide-react";
import { getInitials, type ProfileUser } from "@/lib/profile";
import { toast } from "sonner";

export default function PartnerProfile() {
  const [user, setUser] = useState<ProfileUser | null>(null);
  const [name, setName] = useState("");
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
        body: JSON.stringify({ name }),
      });
      const data = (await response.json()) as ProfileUser;

      if (!response.ok) {
        throw new Error("Could not update profile.");
      }

      setUser(data);
      setName(data.name);
      toast.success("Business profile updated");
    } catch (error) {
      toast.error("Could not update profile", {
        description: error instanceof Error ? error.message : "Please try again.",
      });
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <DashboardLayout role="partner">
      <PageHeader title="Business profile" description="Manage your company details and verification." />
      <div className="grid gap-6 lg:grid-cols-3">
        <form onSubmit={handleSubmit} className="space-y-5 rounded-2xl border border-border bg-card p-6 lg:col-span-2">
          <h3 className="font-display font-semibold">Company information</h3>
          <div className="flex items-center gap-4 rounded-xl border border-border bg-secondary/30 p-4">
            <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full brand-gradient text-sm font-bold text-primary-foreground">
              {getInitials(name || user?.name || "Partner")}
            </div>
            <div className="min-w-0">
              <p className="truncate font-semibold">{user?.name ?? "Loading..."}</p>
              <p className="truncate text-xs text-muted-foreground">{user?.email ?? "Loading account"}</p>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label>Company name</Label>
              <Input className="mt-1.5" value={name} onChange={(event) => setName(event.target.value)} />
            </div>
            <div>
              <Label>Owner email</Label>
              <Input className="mt-1.5" value={user?.email ?? ""} disabled />
            </div>
            <div>
              <Label>Phone</Label>
              <Input className="mt-1.5" placeholder="+971 4 555 1234" />
            </div>
            <div>
              <Label>Business type</Label>
              <Input className="mt-1.5" value="Rental partner" disabled />
            </div>
            <div className="sm:col-span-2">
              <Label>Address</Label>
              <Input className="mt-1.5" placeholder="Sheikh Zayed Road, Dubai" />
            </div>
          </div>
          <Button className="rounded-full" disabled={isSaving || !name.trim()}>
            {isSaving ? "Saving..." : "Save changes"}
          </Button>
        </form>
        <div className="space-y-4">
          <div className="rounded-2xl border border-border bg-card p-6">
            <div className="flex items-center gap-2 text-status-confirmed">
              <BadgeCheck className="h-5 w-5" /> <span className="font-semibold">Verified partner</span>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">Your account is fully verified and active.</p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6">
            <h3 className="font-display mb-3 font-semibold">Documents</h3>
            <div className="rounded-xl border-2 border-dashed border-border bg-secondary/30 p-6 text-center">
              <UploadCloud className="mx-auto h-6 w-6 text-muted-foreground" />
              <p className="mt-2 text-xs text-muted-foreground">Upload trade license, ID, insurance</p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

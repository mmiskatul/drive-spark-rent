import DashboardLayout, { PageHeader } from "@/layouts/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Camera } from "lucide-react";
import { toast } from "sonner";

export default function CustomerProfile() {
  return (
    <DashboardLayout role="customer">
      <PageHeader title="Profile & settings" description="Manage your account and preferences." />
      <div className="grid lg:grid-cols-3 gap-6">
        <form
          onSubmit={(e) => { e.preventDefault(); toast.success("Profile updated"); }}
          className="lg:col-span-2 rounded-2xl border border-border bg-card p-6 space-y-5"
        >
          <h3 className="font-display font-semibold">Personal information</h3>
          <div className="flex items-center gap-5">
            <div className="relative">
              <div className="grid h-20 w-20 place-items-center rounded-full brand-gradient text-primary-foreground text-xl font-bold">AH</div>
              <button type="button" className="absolute -bottom-1 -right-1 grid h-8 w-8 place-items-center rounded-full bg-card border border-border shadow-soft"><Camera className="h-3.5 w-3.5" /></button>
            </div>
            <div><p className="font-semibold">Ahmed Hassan</p><p className="text-xs text-muted-foreground">Member since 2024</p></div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div><Label>Full name</Label><Input className="mt-1.5" defaultValue="Ahmed Hassan" /></div>
            <div><Label>Email</Label><Input className="mt-1.5" defaultValue="ahmed@example.com" /></div>
            <div><Label>Phone</Label><Input className="mt-1.5" defaultValue="+971 50 123 4567" /></div>
            <div><Label>Address</Label><Input className="mt-1.5" defaultValue="Dubai Marina, UAE" /></div>
          </div>
          <Button type="submit" className="rounded-full">Save changes</Button>
        </form>

        <div className="space-y-4">
          <div className="rounded-2xl border border-border bg-card p-6 space-y-4">
            <h3 className="font-display font-semibold">Notifications</h3>
            {[
              ["Booking updates", true],
              ["New car alerts", true],
              ["Promotions", false],
              ["Newsletter", false],
            ].map(([label, val]) => (
              <div key={label as string} className="flex items-center justify-between">
                <span className="text-sm">{label as string}</span>
                <Switch defaultChecked={val as boolean} />
              </div>
            ))}
          </div>
          <div className="rounded-2xl border border-border bg-card p-6">
            <h3 className="font-display font-semibold mb-4">Password</h3>
            <Button variant="outline" className="w-full rounded-full">Change password</Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

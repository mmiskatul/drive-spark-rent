import DashboardLayout, { PageHeader } from "@/layouts/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";

export default function AdminSettings() {
  return (
    <DashboardLayout role="admin">
      <PageHeader title="Platform settings" description="Branding, content and global configuration." />
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-border bg-card p-6 space-y-4">
          <h3 className="font-display font-semibold">Branding</h3>
          <div><Label>Platform name</Label><Input className="mt-1.5" defaultValue="DriveNow" /></div>
          <div><Label>Tagline</Label><Input className="mt-1.5" defaultValue="Drive the city on your own terms" /></div>
          <div><Label>Support email</Label><Input className="mt-1.5" defaultValue="support@drivenow.com" /></div>
        </div>
        <div className="rounded-2xl border border-border bg-card p-6 space-y-4">
          <h3 className="font-display font-semibold">Notifications</h3>
          {["Email notifications", "SMS notifications", "Push notifications", "Weekly reports"].map(t => (
            <div key={t} className="flex items-center justify-between"><span className="text-sm">{t}</span><Switch defaultChecked /></div>
          ))}
        </div>
        <div className="rounded-2xl border border-border bg-card p-6 lg:col-span-2 space-y-4">
          <h3 className="font-display font-semibold">Policies</h3>
          <div><Label>Terms of service</Label><Textarea rows={4} className="mt-1.5 resize-none" defaultValue="By using DriveNow, you agree to our terms…" /></div>
          <Button className="rounded-full">Save settings</Button>
        </div>
      </div>
    </DashboardLayout>
  );
}

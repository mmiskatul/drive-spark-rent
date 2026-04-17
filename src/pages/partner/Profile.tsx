import DashboardLayout, { PageHeader } from "@/layouts/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BadgeCheck, UploadCloud } from "lucide-react";

export default function PartnerProfile() {
  return (
    <DashboardLayout role="partner">
      <PageHeader title="Business profile" description="Manage your company details and verification." />
      <div className="grid lg:grid-cols-3 gap-6">
        <form className="lg:col-span-2 rounded-2xl border border-border bg-card p-6 space-y-5">
          <h3 className="font-display font-semibold">Company information</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <div><Label>Company name</Label><Input className="mt-1.5" defaultValue="Prestige Auto Rentals" /></div>
            <div><Label>Owner</Label><Input className="mt-1.5" defaultValue="Khalid Al Maktoum" /></div>
            <div><Label>Email</Label><Input className="mt-1.5" defaultValue="hello@prestige.ae" /></div>
            <div><Label>Phone</Label><Input className="mt-1.5" defaultValue="+971 4 555 1234" /></div>
            <div className="sm:col-span-2"><Label>Address</Label><Input className="mt-1.5" defaultValue="Sheikh Zayed Road, Dubai" /></div>
          </div>
          <Button className="rounded-full">Save changes</Button>
        </form>
        <div className="space-y-4">
          <div className="rounded-2xl border border-border bg-card p-6">
            <div className="flex items-center gap-2 text-status-confirmed"><BadgeCheck className="h-5 w-5" /> <span className="font-semibold">Verified partner</span></div>
            <p className="text-xs text-muted-foreground mt-2">Your account is fully verified and active.</p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6">
            <h3 className="font-display font-semibold mb-3">Documents</h3>
            <div className="rounded-xl border-2 border-dashed border-border p-6 text-center bg-secondary/30">
              <UploadCloud className="h-6 w-6 mx-auto text-muted-foreground" />
              <p className="mt-2 text-xs text-muted-foreground">Upload trade license, ID, insurance</p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

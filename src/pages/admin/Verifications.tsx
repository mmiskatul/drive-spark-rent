import DashboardLayout, { PageHeader } from "@/layouts/DashboardLayout";
import { Button } from "@/components/ui/button";
import { partners } from "@/lib/mock-data";
import { Check, X, FileText } from "lucide-react";
import { toast } from "sonner";

export default function AdminVerifications() {
  return (
    <DashboardLayout role="admin">
      <PageHeader title="Partner verifications" description="Review pending applications." />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {partners.map((p) => (
          <div key={p.id} className="rounded-2xl border border-border bg-card p-5">
            <div className="flex items-center gap-3"><div className="grid h-12 w-12 place-items-center rounded-2xl bg-accent text-accent-foreground font-display font-bold">{p.name.split(" ").map(w => w[0]).slice(0, 2).join("")}</div><div><p className="font-semibold">{p.name}</p><p className="text-xs text-muted-foreground">{p.cars} cars listed</p></div></div>
            <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground"><FileText className="h-3.5 w-3.5" /> 3 documents · Submitted Apr 12</div>
            <div className="mt-3 inline-flex rounded-full px-2.5 py-1 text-xs font-medium bg-status-pending-bg text-status-pending">Pending review</div>
            <div className="mt-5 grid grid-cols-2 gap-2">
              <Button onClick={() => toast.success("Partner approved")} className="rounded-full"><Check className="h-4 w-4 mr-1" /> Approve</Button>
              <Button variant="outline" onClick={() => toast("Application rejected")} className="rounded-full text-destructive hover:text-destructive"><X className="h-4 w-4 mr-1" /> Reject</Button>
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}

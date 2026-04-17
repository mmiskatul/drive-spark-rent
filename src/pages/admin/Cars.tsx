import DashboardLayout, { PageHeader } from "@/layouts/DashboardLayout";
import { Button } from "@/components/ui/button";
import { cars } from "@/lib/mock-data";
import { Eye, EyeOff, Trash2 } from "lucide-react";

export default function AdminCars() {
  return (
    <DashboardLayout role="admin">
      <PageHeader title="Car moderation" description="Review and moderate listings." />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cars.map(c => (
          <div key={c.id} className="rounded-2xl border border-border bg-card overflow-hidden card-hover">
            <img src={c.image} alt="" className="w-full h-40 object-cover" />
            <div className="p-4">
              <p className="text-xs text-muted-foreground">{c.partner.name}</p>
              <p className="font-semibold mt-1 truncate">{c.title}</p>
              <div className="mt-3 flex gap-2">
                <Button size="sm" variant="outline" className="flex-1 rounded-full"><Eye className="h-3.5 w-3.5 mr-1" /> Approve</Button>
                <Button size="sm" variant="outline" className="rounded-full"><EyeOff className="h-3.5 w-3.5" /></Button>
                <Button size="sm" variant="outline" className="rounded-full text-destructive"><Trash2 className="h-3.5 w-3.5" /></Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}

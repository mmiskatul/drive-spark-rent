import DashboardLayout, { PageHeader } from "@/layouts/DashboardLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, MoreHorizontal } from "lucide-react";

const users = [
  { name: "Ahmed Hassan", email: "ahmed@example.com", role: "Customer", status: "Active", joined: "Mar 14, 2024" },
  { name: "Sara Khan", email: "sara@example.com", role: "Customer", status: "Active", joined: "Apr 2, 2024" },
  { name: "Prestige Auto", email: "hello@prestige.ae", role: "Rental Partner", status: "Verified", joined: "Jan 8, 2024" },
  { name: "Marco Rossi", email: "marco@example.com", role: "Customer", status: "Suspended", joined: "Feb 19, 2024" },
  { name: "EcoMotion", email: "team@ecomotion.ae", role: "Rental Partner", status: "Pending", joined: "Apr 11, 2026" },
];
const tone: Record<string, string> = {
  Active: "bg-status-confirmed-bg text-status-confirmed",
  Verified: "bg-status-confirmed-bg text-status-confirmed",
  Pending: "bg-status-pending-bg text-status-pending",
  Suspended: "bg-status-rejected-bg text-status-rejected",
};

export default function AdminUsers() {
  return (
    <DashboardLayout role="admin">
      <PageHeader title="Users" description="Manage all platform users." />
      <div className="mb-4 relative max-w-md"><Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" /><Input placeholder="Search users…" className="pl-9 rounded-full" /></div>
      <div className="rounded-2xl border border-border bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-secondary/40 text-xs uppercase text-muted-foreground"><tr><th className="text-left p-4">User</th><th className="text-left p-4">Role</th><th className="text-left p-4">Status</th><th className="text-left p-4">Joined</th><th></th></tr></thead>
            <tbody className="divide-y divide-border">
              {users.map((u, i) => (
                <tr key={i} className="hover:bg-secondary/30">
                  <td className="p-4"><div className="flex items-center gap-3"><div className="grid h-9 w-9 place-items-center rounded-full bg-accent text-accent-foreground font-semibold text-xs">{u.name.split(" ").map(w => w[0]).join("")}</div><div><p className="font-semibold">{u.name}</p><p className="text-xs text-muted-foreground">{u.email}</p></div></div></td>
                  <td className="p-4 text-muted-foreground">{u.role}</td>
                  <td className="p-4"><span className={`rounded-full px-2.5 py-1 text-xs font-medium ${tone[u.status]}`}>{u.status}</span></td>
                  <td className="p-4 text-muted-foreground">{u.joined}</td>
                  <td className="p-4 text-right"><Button variant="ghost" size="icon" className="h-8 w-8"><MoreHorizontal className="h-4 w-4" /></Button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}

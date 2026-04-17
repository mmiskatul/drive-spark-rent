"use client";

import Link from "next/link";
import DashboardLayout, { PageHeader } from "@/layouts/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cars } from "@/lib/mock-data";
import { Plus, Search, Edit, Trash2, Star } from "lucide-react";

export default function PartnerCars() {
  return (
    <DashboardLayout role="partner">
      <PageHeader
        title="My cars"
        description="Manage your fleet and listings."
        actions={<Button asChild className="rounded-full"><Link href="/partner/cars/new"><Plus className="h-4 w-4 mr-1" /> Add car</Link></Button>}
      />
      <div className="mb-4 relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search cars…" className="pl-9 rounded-full" />
      </div>
      <div className="rounded-2xl border border-border bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-secondary/40 text-xs uppercase text-muted-foreground">
              <tr>
                <th className="text-left p-4 font-medium">Car</th>
                <th className="text-left p-4 font-medium">Category</th>
                <th className="text-left p-4 font-medium">Price/day</th>
                <th className="text-left p-4 font-medium">Status</th>
                <th className="text-left p-4 font-medium">Bookings</th>
                <th className="text-left p-4 font-medium">Rating</th>
                <th className="p-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {cars.map((c) => (
                <tr key={c.id} className="hover:bg-secondary/30">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img src={c.image} className="h-12 w-16 rounded-lg object-cover" alt="" />
                      <div>
                        <p className="font-semibold">{c.title}</p>
                        <p className="text-xs text-muted-foreground">{c.brand} · {c.year}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-muted-foreground">{c.category}</td>
                  <td className="p-4 font-semibold">${c.pricePerDay}</td>
                  <td className="p-4">
                    <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${c.available ? "bg-status-confirmed-bg text-status-confirmed" : "bg-status-rejected-bg text-status-rejected"}`}>
                      {c.available ? "Active" : "Booked"}
                    </span>
                  </td>
                  <td className="p-4 text-muted-foreground">{c.reviews}</td>
                  <td className="p-4 flex items-center gap-1"><Star className="h-3.5 w-3.5 fill-warning text-warning" /> {c.rating}</td>
                  <td className="p-4">
                    <div className="flex gap-1 justify-end">
                      <Button size="icon" variant="ghost" className="h-8 w-8"><Edit className="h-3.5 w-3.5" /></Button>
                      <Button size="icon" variant="ghost" className="h-8 w-8 text-destructive"><Trash2 className="h-3.5 w-3.5" /></Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}

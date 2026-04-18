import { type ReactNode } from "react";
import { requireRole } from "@/lib/route-auth";

export default async function AdminLayout({ children }: { children: ReactNode }) {
  await requireRole("admin");

  return children;
}

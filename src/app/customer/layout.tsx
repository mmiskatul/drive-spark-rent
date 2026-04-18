import { type ReactNode } from "react";
import { requireRole } from "@/lib/route-auth";

export default async function CustomerLayout({ children }: { children: ReactNode }) {
  await requireRole("customer");

  return children;
}

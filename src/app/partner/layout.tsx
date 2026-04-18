import { type ReactNode } from "react";
import { requireRole } from "@/lib/route-auth";

export default async function PartnerLayout({ children }: { children: ReactNode }) {
  await requireRole("partner");

  return children;
}

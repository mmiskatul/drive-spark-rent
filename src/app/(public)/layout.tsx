import type { ReactNode } from "react";
import PublicLayout from "@/layouts/PublicLayout";

export default function Layout({ children }: { children: ReactNode }) {
  return <PublicLayout>{children}</PublicLayout>;
}

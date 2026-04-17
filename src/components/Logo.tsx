import Link from "next/link";
import { Car as CarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function Logo({ className, mark = false }: { className?: string; mark?: boolean }) {
  return (
    <Link href="/" className={cn("inline-flex items-center gap-2 font-display font-bold text-foreground", className)}>
      <span className="grid h-9 w-9 place-items-center rounded-xl brand-gradient text-primary-foreground shadow-soft">
        <CarIcon className="h-5 w-5" strokeWidth={2.5} />
      </span>
      {!mark && <span className="text-lg tracking-tight">DriveNow</span>}
    </Link>
  );
}

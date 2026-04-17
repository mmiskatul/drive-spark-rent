import { cn } from "@/lib/utils";
import type { BookingStatus } from "@/lib/mock-data";

const config: Record<BookingStatus, { label: string; cls: string }> = {
  pending:   { label: "Pending",   cls: "bg-status-pending-bg text-status-pending border-status-pending/20" },
  confirmed: { label: "Confirmed", cls: "bg-status-confirmed-bg text-status-confirmed border-status-confirmed/20" },
  active:    { label: "Active",    cls: "bg-status-active-bg text-status-active border-status-active/20" },
  completed: { label: "Completed", cls: "bg-status-completed-bg text-status-completed border-status-completed/20" },
  rejected:  { label: "Rejected",  cls: "bg-status-rejected-bg text-status-rejected border-status-rejected/20" },
  cancelled: { label: "Cancelled", cls: "bg-status-rejected-bg text-status-rejected border-status-rejected/20" },
};

export function StatusBadge({ status, className }: { status: BookingStatus; className?: string }) {
  const c = config[status];
  return (
    <span className={cn(
      "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium",
      c.cls,
      className,
    )}>
      <span className="h-1.5 w-1.5 rounded-full bg-current opacity-80" />
      {c.label}
    </span>
  );
}

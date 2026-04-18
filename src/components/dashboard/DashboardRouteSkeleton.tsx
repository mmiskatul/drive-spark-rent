import DashboardLayout, { type Role } from "@/layouts/DashboardLayout";
import { Skeleton } from "@/components/ui/skeleton";

function SkeletonCard() {
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <Skeleton className="h-10 w-10 rounded-xl" />
      <Skeleton className="mt-4 h-7 w-20" />
      <Skeleton className="mt-2 h-3 w-28" />
    </div>
  );
}

export function DashboardRouteSkeleton({ role }: { role: Role }) {
  return (
    <DashboardLayout role={role}>
      <div className="animate-fade-in">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Skeleton className="h-8 w-56" />
            <Skeleton className="mt-3 h-4 w-72 max-w-full" />
          </div>
          <Skeleton className="h-10 w-32 rounded-full" />
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          <div className="rounded-2xl border border-border bg-card lg:col-span-2">
            <div className="flex items-center justify-between border-b border-border p-5">
              <div>
                <Skeleton className="h-5 w-36" />
                <Skeleton className="mt-2 h-3 w-28" />
              </div>
              <Skeleton className="h-8 w-20 rounded-full" />
            </div>
            <div className="divide-y divide-border">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="flex items-center gap-4 p-4">
                  <Skeleton className="h-14 w-20 rounded-lg" />
                  <div className="flex-1">
                    <Skeleton className="h-4 w-44 max-w-full" />
                    <Skeleton className="mt-2 h-3 w-60 max-w-full" />
                  </div>
                  <Skeleton className="hidden h-7 w-24 rounded-full sm:block" />
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-5">
            <Skeleton className="h-5 w-32" />
            <div className="mt-5 space-y-4">
              {Array.from({ length: 5 }).map((_, index) => (
                <div key={index}>
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="mt-2 h-2 w-full rounded-full" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

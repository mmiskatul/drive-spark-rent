"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import DashboardLayout, { PageHeader } from "@/layouts/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { apiCarToCar, type ApiCar, type CarsResponse } from "@/lib/api-cars";
import { Edit, Plus, Search, Trash2 } from "lucide-react";
import { toast } from "sonner";

function getErrorMessage(data: unknown) {
  if (data && typeof data === "object" && "detail" in data) {
    const detail = (data as { detail?: unknown }).detail;
    return typeof detail === "string" ? detail : "Request failed.";
  }

  return "Request failed.";
}

function CarsTableSkeleton() {
  return (
    <>
      {Array.from({ length: 5 }).map((_, index) => (
        <tr key={index}>
          <td className="p-4">
            <div className="flex min-w-72 items-center gap-3">
              <Skeleton className="h-16 w-24 rounded-xl" />
              <div>
                <Skeleton className="h-4 w-40" />
                <Skeleton className="mt-2 h-3 w-28" />
              </div>
            </div>
          </td>
          <td className="p-4">
            <Skeleton className="h-4 w-20" />
          </td>
          <td className="p-4">
            <Skeleton className="h-4 w-28" />
          </td>
          <td className="p-4">
            <Skeleton className="h-4 w-16" />
          </td>
          <td className="p-4">
            <Skeleton className="h-7 w-24 rounded-full" />
          </td>
          <td className="p-4">
            <div className="flex justify-end gap-1">
              <Skeleton className="h-8 w-8 rounded-md" />
              <Skeleton className="h-8 w-8 rounded-md" />
            </div>
          </td>
        </tr>
      ))}
    </>
  );
}

export default function PartnerCars() {
  const [cars, setCars] = useState<ApiCar[]>([]);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [busyCarId, setBusyCarId] = useState<string | null>(null);

  const filteredCars = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return cars;
    }

    return cars.filter((car) =>
      [car.title, car.brand, car.model, car.category, car.location]
        .join(" ")
        .toLowerCase()
        .includes(normalizedQuery),
    );
  }, [cars, query]);

  async function loadCars() {
    setIsLoading(true);

    try {
      const response = await fetch("/api/cars/mine", { cache: "no-store" });
      const data = (await response.json()) as CarsResponse;

      if (!response.ok) {
        throw new Error(getErrorMessage(data));
      }

      setCars(data.items);
    } catch (error) {
      toast.error("Could not load cars", {
        description: error instanceof Error ? error.message : "Please refresh the page.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    void loadCars();
  }, []);

  async function handleDelete(car: ApiCar) {
    if (!window.confirm(`Delete ${car.title}?`)) {
      return;
    }

    setBusyCarId(car.id);

    try {
      const response = await fetch(`/api/cars/${car.id}`, { method: "DELETE" });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        throw new Error(getErrorMessage(data));
      }

      setCars((currentCars) => currentCars.filter((currentCar) => currentCar.id !== car.id));
      toast.success("Car deleted");
    } catch (error) {
      toast.error("Could not delete car", {
        description: error instanceof Error ? error.message : "Please try again.",
      });
    } finally {
      setBusyCarId(null);
    }
  }

  async function handleQuickUpdate(car: ApiCar) {
    const priceInput = window.prompt("Price per day", String(car.price_per_day));

    if (!priceInput) {
      return;
    }

    const price = Number(priceInput);

    if (!Number.isFinite(price) || price <= 0) {
      toast.error("Enter a valid price.");
      return;
    }

    const nextStatus = car.status === "active" ? "unavailable" : "active";
    setBusyCarId(car.id);

    try {
      const response = await fetch(`/api/cars/${car.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          price_per_day: price,
          status: nextStatus,
        }),
      });
      const data = (await response.json().catch(() => null)) as ApiCar | null;

      if (!response.ok || !data) {
        throw new Error(getErrorMessage(data));
      }

      setCars((currentCars) =>
        currentCars.map((currentCar) => (currentCar.id === car.id ? data : currentCar)),
      );
      toast.success("Car updated");
    } catch (error) {
      toast.error("Could not update car", {
        description: error instanceof Error ? error.message : "Please try again.",
      });
    } finally {
      setBusyCarId(null);
    }
  }

  return (
    <DashboardLayout role="partner">
      <PageHeader
        title="My cars"
        description="Manage your fleet and listings."
        actions={
          <Button asChild className="rounded-full">
            <Link href="/partner/cars/new"><Plus className="h-4 w-4 mr-1" /> Add car</Link>
          </Button>
        }
      />
      <div className="mb-4 relative max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search cars..."
          className="pl-9 rounded-full"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </div>
      <div className="overflow-hidden rounded-2xl border border-border bg-card">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-secondary/40 text-xs uppercase text-muted-foreground">
              <tr>
                <th className="p-4 text-left font-medium">Car</th>
                <th className="p-4 text-left font-medium">Category</th>
                <th className="p-4 text-left font-medium">Location</th>
                <th className="p-4 text-left font-medium">Price/day</th>
                <th className="p-4 text-left font-medium">Status</th>
                <th className="p-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {isLoading && <CarsTableSkeleton />}
              {!isLoading && filteredCars.length === 0 && (
                <tr>
                  <td className="p-8 text-center" colSpan={6}>
                    <div className="mx-auto max-w-sm">
                      <p className="font-display text-lg font-semibold">No cars found</p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Add your first car and it will appear here immediately after publishing.
                      </p>
                      <Button asChild className="mt-4 rounded-full">
                        <Link href="/partner/cars/new"><Plus className="h-4 w-4 mr-1" /> Add car</Link>
                      </Button>
                    </div>
                  </td>
                </tr>
              )}
              {filteredCars.map((car) => {
                const displayCar = apiCarToCar(car);

                return (
                  <tr key={car.id} className="hover:bg-secondary/30">
                    <td className="p-4">
                      <div className="flex min-w-72 items-center gap-3">
                        <img
                          src={displayCar.image}
                          alt={car.title}
                          className="h-16 w-24 rounded-xl object-cover"
                          loading="lazy"
                        />
                        <div>
                          <p className="font-semibold">{car.title}</p>
                          <p className="text-xs text-muted-foreground">{car.brand} {car.model} · {car.year}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-muted-foreground">{car.category}</td>
                    <td className="p-4 text-muted-foreground">{car.location}</td>
                    <td className="p-4 font-semibold">${car.price_per_day}</td>
                    <td className="p-4">
                      <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${car.status === "active" ? "bg-status-confirmed-bg text-status-confirmed" : "bg-status-rejected-bg text-status-rejected"}`}>
                        {car.status === "active" ? "Active" : car.status === "draft" ? "Draft" : "Unavailable"}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex justify-end gap-1">
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-8 w-8"
                          disabled={busyCarId === car.id}
                          onClick={() => handleQuickUpdate(car)}
                        >
                          <Edit className="h-3.5 w-3.5" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-8 w-8 text-destructive"
                          disabled={busyCarId === car.id}
                          onClick={() => handleDelete(car)}
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}

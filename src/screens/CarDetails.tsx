"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  BadgeCheck,
  Calendar,
  Check,
  Fuel,
  Heart,
  MapPin,
  Settings2,
  Share2,
  ShieldCheck,
  Star,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { CarCard } from "@/components/CarCard";
import { apiCarToCar, apiCarsToCars, type ApiCar, type CarsResponse } from "@/lib/api-cars";
import { cars as mockCars, type Car } from "@/lib/mock-data";
import { toast } from "sonner";

export default function CarDetails({ id }: { id?: string }) {
  const [car, setCar] = useState<Car>(() => mockCars.find((item) => item.id === id) ?? mockCars[0]);
  const [allCars, setAllCars] = useState<Car[]>(mockCars);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    async function loadCar() {
      if (!id) {
        setCar(mockCars[0]);
        return;
      }

      try {
        const [carResponse, carsResponse] = await Promise.all([
          fetch(`/api/cars/${id}`, { cache: "no-store" }),
          fetch("/api/cars?limit=100", { cache: "no-store" }),
        ]);
        const carData = (await carResponse.json()) as ApiCar;

        if (!carResponse.ok) {
          throw new Error("Could not load car.");
        }

        setCar(apiCarToCar(carData));

        if (carsResponse.ok) {
          const carsData = (await carsResponse.json()) as CarsResponse;
          setAllCars(apiCarsToCars(carsData));
        }
      } catch {
        setCar(mockCars.find((item) => item.id === id) ?? mockCars[0]);
      }
    }

    void loadCar();
  }, [id]);

  useEffect(() => {
    setActiveImage(0);
  }, [car.id]);

  const gallery = car.gallery.length ? car.gallery : [car.image];
  const similar = allCars
    .filter((item) => item.id !== car.id && item.category === car.category)
    .slice(0, 3);

  return (
    <div className="container py-10">
      <Button asChild variant="ghost" size="sm" className="mb-6 -ml-3">
        <Link href="/cars"><ArrowLeft className="h-4 w-4 mr-1" /> Back to cars</Link>
      </Button>

      <div className="grid gap-10 lg:grid-cols-[1fr_400px]">
        <div>
          <div className="mb-3 aspect-[16/10] overflow-hidden rounded-2xl bg-secondary">
            <img src={gallery[activeImage]} alt={car.title} className="h-full w-full object-cover" />
          </div>
          <div className="grid grid-cols-4 gap-3">
            {gallery.map((image, index) => (
              <button
                key={image}
                type="button"
                onClick={() => setActiveImage(index)}
                className={`aspect-[4/3] overflow-hidden rounded-xl border-2 transition-all ${index === activeImage ? "border-primary ring-brand" : "border-transparent opacity-70 hover:opacity-100"}`}
              >
                <img src={image} alt="" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>

          <div className="mt-8 flex items-start justify-between gap-4">
            <div>
              <p className="text-sm text-muted-foreground">{car.brand} · {car.year} · {car.category}</p>
              <h1 className="font-display mt-1 text-3xl font-bold tracking-tight sm:text-4xl">{car.title}</h1>
              <div className="mt-3 flex flex-wrap items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-warning text-warning" />
                  <span className="font-semibold">{car.rating}</span>
                  <span className="text-muted-foreground">({car.reviews} reviews)</span>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground"><MapPin className="h-4 w-4" /> {car.location}</div>
                {car.verified && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-status-confirmed-bg px-2.5 py-1 text-xs font-medium text-status-confirmed">
                    <BadgeCheck className="h-3 w-3" /> Verified
                  </span>
                )}
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" className="rounded-full"><Heart className="h-4 w-4" /></Button>
              <Button variant="outline" size="icon" className="rounded-full"><Share2 className="h-4 w-4" /></Button>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { icon: Users, label: "Seats", value: car.seats },
              { icon: Settings2, label: "Transmission", value: car.transmission },
              { icon: Fuel, label: "Fuel", value: car.fuel },
              { icon: Calendar, label: "Year", value: car.year },
            ].map((spec) => (
              <div key={spec.label} className="rounded-xl border border-border bg-card p-4">
                <spec.icon className="h-4 w-4 text-muted-foreground" />
                <p className="mt-2 text-xs text-muted-foreground">{spec.label}</p>
                <p className="mt-0.5 text-sm font-semibold">{spec.value}</p>
              </div>
            ))}
          </div>

          <Tabs defaultValue="about" className="mt-10">
            <TabsList className="grid w-full max-w-xl grid-cols-4">
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="terms">Terms</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            <TabsContent value="about" className="mt-6">
              <p className="leading-relaxed text-foreground">{car.description}</p>
            </TabsContent>
            <TabsContent value="features" className="mt-6">
              <div className="grid gap-3 sm:grid-cols-2">
                {car.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-2 rounded-xl border border-border p-3">
                    <Check className="h-4 w-4 text-status-confirmed" /> <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="terms" className="mt-6">
              <ul className="space-y-3 text-sm">
                {[
                  "Minimum age: 21 years",
                  "Valid driver license required",
                  "Refundable security deposit",
                  "Free cancellation up to 24h before pickup",
                  "Mileage: 250 km/day included",
                ].map((term) => (
                  <li key={term} className="flex items-start gap-2">
                    <ShieldCheck className="mt-0.5 h-4 w-4 text-primary" /> {term}
                  </li>
                ))}
              </ul>
            </TabsContent>
            <TabsContent value="reviews" className="mt-6 space-y-4">
              {[
                { name: "Sara K.", rating: 5, text: "Spotless car, smooth pickup. Will definitely book again." },
                { name: "Diego A.", rating: 5, text: "Great experience from start to finish - partner was professional." },
              ].map((review) => (
                <div key={review.name} className="rounded-xl border border-border bg-card p-5">
                  <div className="flex items-center gap-3">
                    <div className="grid h-9 w-9 place-items-center rounded-full brand-gradient text-xs font-semibold text-primary-foreground">
                      {review.name.split(" ").map((word) => word[0]).join("")}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold">{review.name}</p>
                      <div className="flex">
                        {Array.from({ length: review.rating }).map((_, index) => (
                          <Star key={index} className="h-3 w-3 fill-warning text-warning" />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="mt-3 text-sm text-foreground">{review.text}</p>
                </div>
              ))}
            </TabsContent>
          </Tabs>

          <div className="mt-10 rounded-2xl border border-border bg-card p-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Rental partner</p>
            <div className="mt-3 flex items-center gap-4">
              <div className="grid h-14 w-14 place-items-center rounded-2xl bg-accent font-display text-lg font-bold text-accent-foreground">
                {car.partner.name.split(" ").map((word) => word[0]).slice(0, 2).join("")}
              </div>
              <div className="flex-1">
                <p className="font-display flex items-center gap-2 font-semibold">
                  {car.partner.name} <BadgeCheck className="h-4 w-4 text-status-confirmed" />
                </p>
                <p className="mt-0.5 text-xs text-muted-foreground">{car.partner.cars} cars · {car.partner.rating} rating</p>
              </div>
              <Button variant="outline" className="rounded-full">View profile</Button>
            </div>
          </div>
        </div>

        <aside>
          <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-soft lg:sticky lg:top-24">
            <div className="p-6">
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="font-display text-3xl font-bold">${car.pricePerDay}</span>
                  <span className="text-sm text-muted-foreground"> / day</span>
                </div>
                <span className="flex items-center gap-1 text-xs font-medium text-status-confirmed">
                  <span className="live-dot" /> Available
                </span>
              </div>
              <div className="mt-6 space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label className="text-xs">Pickup</Label>
                    <Input type="date" defaultValue="2026-04-22" className="mt-1.5" />
                  </div>
                  <div>
                    <Label className="text-xs">Return</Label>
                    <Input type="date" defaultValue="2026-04-26" className="mt-1.5" />
                  </div>
                </div>
                <div>
                  <Label className="text-xs">Pickup location</Label>
                  <Input defaultValue={car.location} className="mt-1.5" />
                </div>
                <div>
                  <Label className="text-xs">Special requests</Label>
                  <Textarea rows={3} placeholder="Any notes for the partner..." className="mt-1.5 resize-none" />
                </div>
              </div>

              <div className="mt-5 space-y-2 border-t border-border pt-4 text-sm">
                <div className="flex justify-between text-muted-foreground">
                  <span>${car.pricePerDay} x 4 days</span><span>${car.pricePerDay * 4}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Service fee</span><span>${Math.round(car.pricePerDay * 4 * 0.05)}</span>
                </div>
                <div className="flex justify-between border-t border-border pt-2 text-base font-semibold">
                  <span>Total</span><span>${car.pricePerDay * 4 + Math.round(car.pricePerDay * 4 * 0.05)}</span>
                </div>
              </div>

              <Button
                className="mt-5 h-12 w-full rounded-full"
                onClick={() => toast.success("Booking request sent", { description: "The partner will respond within minutes." })}
              >
                Request booking
              </Button>
              <p className="mt-3 text-center text-xs text-muted-foreground">You won't be charged until the partner confirms.</p>
            </div>
          </div>
        </aside>
      </div>

      {similar.length > 0 && (
        <section className="mt-20">
          <h2 className="font-display mb-6 text-2xl font-bold tracking-tight">Similar cars</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {similar.map((item) => <CarCard key={item.id} car={item} />)}
          </div>
        </section>
      )}

      <div className="fixed inset-x-0 bottom-0 z-40 flex items-center justify-between gap-3 border-t border-border bg-background/95 p-4 backdrop-blur-xl lg:hidden">
        <div>
          <p className="font-display text-lg font-bold">${car.pricePerDay} <span className="text-xs font-normal text-muted-foreground">/ day</span></p>
          <p className="text-xs text-muted-foreground">Free cancellation 24h</p>
        </div>
        <Button className="h-11 rounded-full px-6" onClick={() => toast.success("Booking request sent")}>Request booking</Button>
      </div>
    </div>
  );
}

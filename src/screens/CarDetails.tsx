"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Star, MapPin, Users, Fuel, Settings2, Calendar, ShieldCheck, BadgeCheck, Heart, Share2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CarCard } from "@/components/CarCard";
import { cars } from "@/lib/mock-data";
import { toast } from "sonner";

export default function CarDetails({ id }: { id?: string }) {
  const car = cars.find((c) => c.id === id) ?? cars[0];
  const [active, setActive] = useState(0);
  const similar = cars.filter((c) => c.id !== car.id && c.category === car.category).slice(0, 3);

  return (
    <div className="container py-10">
      <Button asChild variant="ghost" size="sm" className="mb-6 -ml-3">
        <Link href="/cars"><ArrowLeft className="h-4 w-4 mr-1" /> Back to cars</Link>
      </Button>

      <div className="grid lg:grid-cols-[1fr_400px] gap-10">
        <div>
          {/* Gallery */}
          <div className="rounded-2xl overflow-hidden bg-secondary aspect-[16/10] mb-3">
            <img src={car.gallery[active]} alt={car.title} className="w-full h-full object-cover" />
          </div>
          <div className="grid grid-cols-4 gap-3">
            {car.gallery.map((img, i) => (
              <button key={i} onClick={() => setActive(i)} className={`rounded-xl overflow-hidden aspect-[4/3] border-2 transition-all ${i === active ? "border-primary ring-brand" : "border-transparent opacity-70 hover:opacity-100"}`}>
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>

          {/* Title block */}
          <div className="mt-8 flex items-start justify-between gap-4">
            <div>
              <p className="text-sm text-muted-foreground">{car.brand} · {car.year} · {car.category}</p>
              <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight mt-1">{car.title}</h1>
              <div className="mt-3 flex flex-wrap items-center gap-4 text-sm">
                <div className="flex items-center gap-1"><Star className="h-4 w-4 fill-warning text-warning" /> <span className="font-semibold">{car.rating}</span> <span className="text-muted-foreground">({car.reviews} reviews)</span></div>
                <div className="flex items-center gap-1 text-muted-foreground"><MapPin className="h-4 w-4" /> {car.location}</div>
                {car.verified && <span className="inline-flex items-center gap-1 rounded-full bg-status-confirmed-bg text-status-confirmed text-xs font-medium px-2.5 py-1"><BadgeCheck className="h-3 w-3" /> Verified</span>}
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" className="rounded-full"><Heart className="h-4 w-4" /></Button>
              <Button variant="outline" size="icon" className="rounded-full"><Share2 className="h-4 w-4" /></Button>
            </div>
          </div>

          {/* Specs */}
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { icon: Users, label: "Seats", value: car.seats },
              { icon: Settings2, label: "Transmission", value: car.transmission },
              { icon: Fuel, label: "Fuel", value: car.fuel },
              { icon: Calendar, label: "Year", value: car.year },
            ].map((s, i) => (
              <div key={i} className="rounded-xl border border-border bg-card p-4">
                <s.icon className="h-4 w-4 text-muted-foreground" />
                <p className="text-xs text-muted-foreground mt-2">{s.label}</p>
                <p className="text-sm font-semibold mt-0.5">{s.value}</p>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <Tabs defaultValue="about" className="mt-10">
            <TabsList className="grid w-full grid-cols-4 max-w-xl">
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="terms">Terms</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            <TabsContent value="about" className="mt-6">
              <p className="text-foreground leading-relaxed">{car.description}</p>
            </TabsContent>
            <TabsContent value="features" className="mt-6">
              <div className="grid sm:grid-cols-2 gap-3">
                {car.features.map((f) => (
                  <div key={f} className="flex items-center gap-2 rounded-xl border border-border p-3">
                    <Check className="h-4 w-4 text-status-confirmed" /> <span className="text-sm">{f}</span>
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
                ].map((t) => (
                  <li key={t} className="flex items-start gap-2"><ShieldCheck className="h-4 w-4 text-primary mt-0.5" /> {t}</li>
                ))}
              </ul>
            </TabsContent>
            <TabsContent value="reviews" className="mt-6 space-y-4">
              {[
                { name: "Sara K.", rating: 5, text: "Spotless car, smooth pickup. Will definitely book again." },
                { name: "Diego A.", rating: 5, text: "Great experience from start to finish — partner was professional." },
              ].map((r, i) => (
                <div key={i} className="rounded-xl border border-border bg-card p-5">
                  <div className="flex items-center gap-3">
                    <div className="grid h-9 w-9 place-items-center rounded-full brand-gradient text-primary-foreground text-xs font-semibold">{r.name.split(" ").map(w => w[0]).join("")}</div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold">{r.name}</p>
                      <div className="flex">{Array.from({ length: r.rating }).map((_, j) => <Star key={j} className="h-3 w-3 fill-warning text-warning" />)}</div>
                    </div>
                  </div>
                  <p className="mt-3 text-sm text-foreground">{r.text}</p>
                </div>
              ))}
            </TabsContent>
          </Tabs>

          {/* Partner card */}
          <div className="mt-10 rounded-2xl border border-border bg-card p-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Rental partner</p>
            <div className="mt-3 flex items-center gap-4">
              <div className="grid h-14 w-14 place-items-center rounded-2xl bg-accent text-accent-foreground font-display font-bold text-lg">
                {car.partner.name.split(" ").map(w => w[0]).slice(0, 2).join("")}
              </div>
              <div className="flex-1">
                <p className="font-display font-semibold flex items-center gap-2">{car.partner.name} <BadgeCheck className="h-4 w-4 text-status-confirmed" /></p>
                <p className="text-xs text-muted-foreground mt-0.5">{car.partner.cars} cars · ⭐ {car.partner.rating}</p>
              </div>
              <Button variant="outline" className="rounded-full">View profile</Button>
            </div>
          </div>
        </div>

        {/* Sticky booking card */}
        <aside>
          <div className="lg:sticky lg:top-24 rounded-2xl border border-border bg-card shadow-soft overflow-hidden">
            <div className="p-6">
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="font-display text-3xl font-bold">${car.pricePerDay}</span>
                  <span className="text-sm text-muted-foreground"> / day</span>
                </div>
                <span className="text-xs font-medium text-status-confirmed flex items-center gap-1"><span className="live-dot" /> Available</span>
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
                  <Textarea rows={3} placeholder="Any notes for the partner…" className="mt-1.5 resize-none" />
                </div>
              </div>

              <div className="mt-5 space-y-2 border-t border-border pt-4 text-sm">
                <div className="flex justify-between text-muted-foreground"><span>${car.pricePerDay} × 4 days</span><span>${car.pricePerDay * 4}</span></div>
                <div className="flex justify-between text-muted-foreground"><span>Service fee</span><span>${Math.round(car.pricePerDay * 4 * 0.05)}</span></div>
                <div className="flex justify-between font-semibold text-base pt-2 border-t border-border">
                  <span>Total</span><span>${car.pricePerDay * 4 + Math.round(car.pricePerDay * 4 * 0.05)}</span>
                </div>
              </div>

              <Button className="w-full mt-5 rounded-full h-12" onClick={() => toast.success("Booking request sent", { description: "The partner will respond within minutes." })}>
                Request booking
              </Button>
              <p className="mt-3 text-center text-xs text-muted-foreground">You won't be charged until the partner confirms.</p>
            </div>
          </div>
        </aside>
      </div>

      {/* Similar */}
      {similar.length > 0 && (
        <section className="mt-20">
          <h2 className="font-display text-2xl font-bold tracking-tight mb-6">Similar cars</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {similar.map((c) => <CarCard key={c.id} car={c} />)}
          </div>
        </section>
      )}

      {/* Mobile sticky CTA */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 border-t border-border bg-background/95 backdrop-blur-xl p-4 flex items-center justify-between gap-3">
        <div>
          <p className="font-display text-lg font-bold">${car.pricePerDay} <span className="text-xs font-normal text-muted-foreground">/ day</span></p>
          <p className="text-xs text-muted-foreground">Free cancellation 24h</p>
        </div>
        <Button className="rounded-full px-6 h-11" onClick={() => toast.success("Booking request sent")}>Request booking</Button>
      </div>
    </div>
  );
}

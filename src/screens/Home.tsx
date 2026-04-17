"use client";

import Link from "next/link";
import { Search, MapPin, Calendar, Car as CarIcon, Star, ShieldCheck, Sparkles, Zap, ArrowRight, Quote, BadgeCheck, Headphones, Wallet, Clock } from "lucide-react";
import heroCar from "@/assets/hero-car.jpg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CarCard } from "@/components/CarCard";
import { cars, locations, partners, testimonials, faqs } from "@/lib/mock-data";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden hero-gradient text-primary-foreground">
        <div className="absolute inset-0 glow-bg opacity-70" />
        <div className="container relative pt-20 pb-32 lg:pt-28 lg:pb-40">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 backdrop-blur px-3 py-1.5 text-xs font-medium">
                <Sparkles className="h-3.5 w-3.5" /> 1,200+ verified cars across the UAE
              </span>
              <h1 className="mt-6 font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight">
                Drive the city <br />on your own terms.
              </h1>
              <p className="mt-5 text-lg text-primary-foreground/75 max-w-lg">
                Book premium cars from verified rental partners in minutes. Transparent pricing, instant confirmation, zero hassle.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild size="lg" className="rounded-full bg-white text-primary hover:bg-white/90 shadow-glow">
                  <Link href="/cars">Browse cars <ArrowRight className="ml-1 h-4 w-4" /></Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="rounded-full border-white/25 bg-white/5 text-white hover:bg-white/10 hover:text-white">
                  <Link href="/register">List your car</Link>
                </Button>
              </div>
              <div className="mt-10 flex items-center gap-6 text-sm text-primary-foreground/70">
                <div className="flex items-center gap-2"><BadgeCheck className="h-4 w-4" /> Verified partners</div>
                <div className="flex items-center gap-2"><ShieldCheck className="h-4 w-4" /> Insured rentals</div>
                <div className="hidden sm:flex items-center gap-2"><Headphones className="h-4 w-4" /> 24/7 support</div>
              </div>
            </div>

            <div className="relative hidden lg:block">
              <div className="absolute -inset-10 bg-white/5 blur-3xl rounded-full" />
              <img
                src={heroCar.src}
                alt="Premium car"
                width={1920}
                height={1080}
                className="relative w-full h-auto drop-shadow-2xl animate-scale-in"
              />
            </div>
          </div>

          {/* Search widget */}
          <div className="relative -mb-24 mt-12 lg:-mb-32 lg:mt-16">
            <div className="rounded-2xl bg-card border border-border shadow-elegant p-2 sm:p-3 max-w-5xl mx-auto">
              <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-1">
                <SearchField icon={MapPin} label="Pickup location" placeholder="Dubai, UAE" />
                <SearchField icon={Calendar} label="Pickup date" placeholder="Apr 22, 2026" />
                <SearchField icon={Calendar} label="Return date" placeholder="Apr 26, 2026" />
                <SearchField icon={CarIcon} label="Car type" placeholder="Any type" />
                <Button asChild size="lg" className="lg:h-auto rounded-xl shadow-soft">
                  <Link href="/cars"><Search className="mr-2 h-4 w-4" /> Search</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED CARS */}
      <section className="container pt-40 pb-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">Featured</span>
            <h2 className="mt-2 font-display text-3xl sm:text-4xl font-bold tracking-tight">Hand-picked for your next trip</h2>
          </div>
          <Button asChild variant="ghost" className="hidden sm:inline-flex">
            <Link href="/cars">View all <ArrowRight className="ml-1 h-4 w-4" /></Link>
          </Button>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cars.slice(0, 6).map((c) => <CarCard key={c.id} car={c} />)}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-secondary/40 border-y border-border">
        <div className="container py-20">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">How it works</span>
            <h2 className="mt-2 font-display text-3xl sm:text-4xl font-bold tracking-tight">Premium rentals, simplified</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Search, title: "Find your car", desc: "Browse 1,200+ verified vehicles across categories, locations and budgets." },
              { icon: Zap, title: "Request instantly", desc: "Send a booking request and get confirmation from the partner in minutes." },
              { icon: CarIcon, title: "Drive away", desc: "Pick up your car, hit the road, and manage everything from your dashboard." },
            ].map((s, i) => (
              <div key={i} className="rounded-2xl bg-card border border-border p-7 shadow-xs card-hover">
                <div className="grid h-12 w-12 place-items-center rounded-xl brand-gradient text-primary-foreground shadow-soft">
                  <s.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 font-display font-semibold text-lg">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
                <p className="mt-5 text-xs font-semibold text-muted-foreground">Step 0{i + 1}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="container py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">Why DriveNow</span>
            <h2 className="mt-2 font-display text-3xl sm:text-4xl font-bold tracking-tight">A marketplace built on trust</h2>
            <p className="mt-4 text-muted-foreground">Every detail is engineered to make renting safer, faster and more enjoyable for travelers — and more profitable for partners.</p>
            <div className="mt-8 grid sm:grid-cols-2 gap-4">
              {[
                { icon: ShieldCheck, t: "Verified partners", d: "Multi-step background and document checks." },
                { icon: Wallet, t: "Transparent pricing", d: "No surprise fees. Ever." },
                { icon: Clock, t: "Instant confirmation", d: "Most bookings are confirmed within 5 minutes." },
                { icon: Headphones, t: "24/7 support", d: "Real humans, anytime you need them." },
              ].map((f, i) => (
                <div key={i} className="rounded-xl border border-border p-4 bg-card">
                  <f.icon className="h-5 w-5 text-primary" />
                  <p className="mt-3 font-semibold text-sm">{f.t}</p>
                  <p className="text-xs text-muted-foreground mt-1">{f.d}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {cars.slice(0, 4).map((c, i) => (
              <div key={c.id} className={`rounded-2xl overflow-hidden border border-border bg-card ${i % 2 ? "translate-y-6" : ""}`}>
                <img src={c.image} alt={c.title} loading="lazy" className="w-full aspect-square object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* POPULAR LOCATIONS */}
      <section className="container py-20">
        <div className="mb-10">
          <span className="text-xs font-semibold uppercase tracking-wider text-primary">Popular locations</span>
          <h2 className="mt-2 font-display text-3xl sm:text-4xl font-bold tracking-tight">Drive somewhere new</h2>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {locations.map((loc) => (
            <Link key={loc.name} href="/cars" className="group relative aspect-[4/5] overflow-hidden rounded-2xl border border-border">
              <img src={loc.image} alt={loc.name} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5 text-background">
                <h3 className="font-display font-semibold text-lg">{loc.name}</h3>
                <p className="text-xs opacity-80">{loc.count} cars</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* PARTNERS */}
      <section className="bg-secondary/40 border-y border-border">
        <div className="container py-20">
          <div className="flex items-end justify-between mb-10">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-primary">Verified partners</span>
              <h2 className="mt-2 font-display text-3xl sm:text-4xl font-bold tracking-tight">Trusted fleets across the region</h2>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {partners.slice(0, 4).map((p) => (
              <div key={p.id} className="rounded-2xl bg-card border border-border p-6 card-hover">
                <div className="flex items-center gap-3">
                  <div className="grid h-12 w-12 place-items-center rounded-xl bg-accent text-accent-foreground font-display font-bold">
                    {p.name.split(" ").map((w) => w[0]).slice(0, 2).join("")}
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{p.name}</p>
                    <p className="text-xs text-muted-foreground">{p.cars} cars · ⭐ {p.rating}</p>
                  </div>
                </div>
                <div className="mt-4 inline-flex items-center gap-1 rounded-full bg-status-confirmed-bg text-status-confirmed text-[11px] font-medium px-2.5 py-1">
                  <BadgeCheck className="h-3 w-3" /> Verified
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="container py-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-semibold uppercase tracking-wider text-primary">Loved by drivers</span>
          <h2 className="mt-2 font-display text-3xl sm:text-4xl font-bold tracking-tight">Stories from the road</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <figure key={t.id} className="rounded-2xl border border-border bg-card p-7 card-hover">
              <Quote className="h-6 w-6 text-primary/40" />
              <blockquote className="mt-4 text-foreground leading-relaxed">{t.quote}</blockquote>
              <figcaption className="mt-6 flex items-center gap-3 pt-5 border-t border-border">
                <div className="grid h-10 w-10 place-items-center rounded-full brand-gradient text-primary-foreground text-xs font-semibold">
                  {t.name.split(" ").map((w) => w[0]).join("")}
                </div>
                <div>
                  <p className="text-sm font-semibold">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
                <div className="ml-auto flex">{Array.from({ length: t.rating }).map((_, i) => <Star key={i} className="h-4 w-4 fill-warning text-warning" />)}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* FAQ PREVIEW */}
      <section className="container py-20">
        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">Got questions?</span>
            <h2 className="mt-2 font-display text-3xl sm:text-4xl font-bold tracking-tight">Frequently asked</h2>
            <p className="mt-3 text-muted-foreground">Everything you need to know before your first booking.</p>
            <Button asChild variant="outline" className="mt-6 rounded-full">
              <Link href="/faq">See all FAQs <ArrowRight className="ml-1 h-4 w-4" /></Link>
            </Button>
          </div>
          <Accordion type="single" collapsible className="w-full">
            {faqs.slice(0, 4).map((f, i) => (
              <AccordionItem key={i} value={`f${i}`} className="border-border">
                <AccordionTrigger className="text-left font-semibold">{f.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA */}
      <section className="container pb-24">
        <div className="relative overflow-hidden rounded-3xl hero-gradient text-primary-foreground p-10 sm:p-16">
          <div className="absolute inset-0 glow-bg opacity-50" />
          <div className="relative grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight">Ready to drive?</h2>
              <p className="mt-3 text-primary-foreground/75 max-w-md">Find your next car or start listing yours today. It only takes a minute.</p>
            </div>
            <div className="flex flex-wrap gap-3 lg:justify-end">
              <Button asChild size="lg" className="rounded-full bg-white text-primary hover:bg-white/90">
                <Link href="/cars">Browse cars</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full border-white/25 bg-white/5 text-white hover:bg-white/10 hover:text-white">
                <Link href="/register">List your car</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function SearchField({ icon: Icon, label, placeholder }: { icon: typeof MapPin; label: string; placeholder: string }) {
  return (
    <label className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-secondary/60 transition-colors cursor-pointer">
      <Icon className="h-5 w-5 text-primary shrink-0" />
      <div className="min-w-0 flex-1">
        <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wide">{label}</p>
        <Input className="border-0 p-0 h-6 text-sm font-medium focus-visible:ring-0 bg-transparent" placeholder={placeholder} />
      </div>
    </label>
  );
}

import { Link } from "react-router-dom";
import { ShieldCheck, Heart, Sparkles, Users, Award, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function About() {
  return (
    <>
      <section className="hero-gradient text-primary-foreground">
        <div className="container py-24 lg:py-32 text-center max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 backdrop-blur px-3 py-1.5 text-xs font-medium">Our story</span>
          <h1 className="mt-6 font-display text-4xl sm:text-6xl font-bold leading-[1.05]">A marketplace built for drivers and partners.</h1>
          <p className="mt-6 text-primary-foreground/75 text-lg">We believe renting a car should feel as effortless as ordering a coffee — premium, fast, transparent.</p>
        </div>
      </section>

      <section className="container py-20 grid lg:grid-cols-3 gap-6">
        {[
          { icon: Heart, t: "Our mission", d: "To make premium mobility accessible, safe and delightful for every traveler — anywhere, anytime." },
          { icon: ShieldCheck, t: "Trust & safety", d: "Verified partners, insured rentals, secure payments, real human support — built into every booking." },
          { icon: Sparkles, t: "What we believe", d: "Premium isn't about price — it's about care, design and the people who run great fleets." },
        ].map((b, i) => (
          <div key={i} className="rounded-2xl border border-border bg-card p-7 card-hover">
            <div className="grid h-12 w-12 place-items-center rounded-xl brand-gradient text-primary-foreground"><b.icon className="h-5 w-5" /></div>
            <h3 className="mt-5 font-display font-semibold text-lg">{b.t}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{b.d}</p>
          </div>
        ))}
      </section>

      <section className="bg-secondary/40 border-y border-border">
        <div className="container py-20 grid md:grid-cols-2 gap-10">
          <div className="rounded-2xl bg-card border border-border p-8">
            <Users className="h-6 w-6 text-primary" />
            <h3 className="font-display text-2xl font-bold mt-4">For Customers</h3>
            <ul className="mt-5 space-y-3 text-sm">
              {["Verified partners only", "Transparent pricing", "Instant confirmation", "Premium customer support"].map(t => (
                <li key={t} className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-primary" /> {t}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl bg-card border border-border p-8">
            <Award className="h-6 w-6 text-primary" />
            <h3 className="font-display text-2xl font-bold mt-4">For Rental Partners</h3>
            <ul className="mt-5 space-y-3 text-sm">
              {["Best-in-class dashboard", "Higher conversion rates", "Fast, secure payouts", "Built-in trust & insurance"].map(t => (
                <li key={t} className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-primary" /> {t}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="container py-24 text-center">
        <Globe className="h-8 w-8 text-primary mx-auto" />
        <h2 className="font-display text-3xl sm:text-4xl font-bold mt-4">Join a community of trusted drivers</h2>
        <div className="mt-8 flex justify-center gap-3 flex-wrap">
          <Button asChild size="lg" className="rounded-full"><Link to="/cars">Find your car</Link></Button>
          <Button asChild size="lg" variant="outline" className="rounded-full"><Link to="/register">Become a partner</Link></Button>
        </div>
      </section>
    </>
  );
}

import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Logo } from "@/components/Logo";
import { ShieldCheck, Sparkles, Users } from "lucide-react";

export default function AuthLayout({ children, title, subtitle }: { children: ReactNode; title: string; subtitle: string }) {
  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-background">
      <div className="flex flex-col p-6 sm:p-10">
        <Logo />
        <div className="flex-1 flex items-center justify-center py-10">
          <div className="w-full max-w-md animate-fade-in">
            <div className="mb-8">
              <h1 className="font-display text-3xl font-bold tracking-tight">{title}</h1>
              <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>
            </div>
            {children}
          </div>
        </div>
        <p className="text-xs text-muted-foreground text-center">© 2026 DriveNow. All rights reserved.</p>
      </div>

      <div className="hidden lg:block relative hero-gradient overflow-hidden">
        <div className="absolute inset-0 glow-bg opacity-60" />
        <div className="relative h-full p-12 flex flex-col justify-end text-primary-foreground">
          <div className="max-w-md">
            <h2 className="font-display text-4xl font-bold leading-[1.1]">Drive into your next adventure.</h2>
            <p className="mt-4 text-primary-foreground/75">Join thousands of travelers and rental partners on the most premium marketplace in the region.</p>
            <div className="mt-10 grid grid-cols-3 gap-4">
              {[
                { icon: Users, n: "120k+", l: "Drivers" },
                { icon: ShieldCheck, n: "1.2k", l: "Partners" },
                { icon: Sparkles, n: "4.9★", l: "Avg rating" },
              ].map((s, i) => (
                <div key={i} className="rounded-2xl bg-white/5 backdrop-blur border border-white/10 p-4">
                  <s.icon className="h-4 w-4 opacity-70" />
                  <p className="mt-3 font-display text-2xl font-bold">{s.n}</p>
                  <p className="text-xs opacity-70">{s.l}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

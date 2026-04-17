import Link from "next/link";
import { Logo } from "@/components/Logo";
import { Twitter, Instagram, Linkedin, Github } from "lucide-react";

const cols = [
  { title: "Marketplace", links: [["Browse cars", "/cars"], ["Locations", "/cars"], ["Become a partner", "/register"], ["Pricing", "/about"]] },
  { title: "Company", links: [["About", "/about"], ["Contact", "/contact"], ["FAQ", "/faq"], ["Blog", "/about"]] },
  { title: "Resources", links: [["Help center", "/faq"], ["Trust & safety", "/about"], ["Insurance", "/about"], ["Terms", "/about"]] },
];

export function PublicFooter() {
  return (
    <footer className="border-t border-border/60 bg-secondary/40">
      <div className="container py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2 space-y-4">
            <Logo />
            <p className="text-sm text-muted-foreground max-w-xs">
              The premium marketplace where verified rental partners and modern travelers meet.
            </p>
            <div className="flex gap-2 pt-2">
              {[Twitter, Instagram, Linkedin, Github].map((Icon, i) => (
                <a key={i} href="#" className="grid h-9 w-9 place-items-center rounded-lg border border-border bg-background text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors">
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
          {cols.map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-semibold text-foreground mb-4">{col.title}</h4>
              <ul className="space-y-3">
                {col.links.map(([label, to]) => (
                  <li key={label}>
                    <Link href={to} className="text-sm text-muted-foreground hover:text-foreground transition-colors">{label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 pt-8 border-t border-border/60 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">© 2026 DriveNow. Crafted with care.</p>
          <div className="flex gap-6 text-xs text-muted-foreground">
            <a href="#" className="hover:text-foreground">Privacy</a>
            <a href="#" className="hover:text-foreground">Terms</a>
            <a href="#" className="hover:text-foreground">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

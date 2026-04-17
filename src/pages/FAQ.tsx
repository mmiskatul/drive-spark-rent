import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { faqs } from "@/lib/mock-data";

const cats = [
  { name: "General", items: faqs.slice(0, 3) },
  { name: "Bookings", items: faqs.slice(2, 5) },
  { name: "Payments", items: faqs.slice(3, 6) },
  { name: "Partners", items: faqs.slice(0, 4) },
];

export default function FAQ() {
  return (
    <div className="container py-16">
      <div className="max-w-2xl mb-12">
        <span className="text-xs font-semibold uppercase tracking-wider text-primary">Help center</span>
        <h1 className="mt-2 font-display text-4xl sm:text-5xl font-bold">Frequently asked questions</h1>
        <p className="mt-4 text-muted-foreground">Everything you need to know about renting on DriveNow.</p>
      </div>
      <div className="grid lg:grid-cols-[240px_1fr] gap-10">
        <aside className="space-y-1 lg:sticky lg:top-24 self-start">
          {cats.map((c, i) => (
            <a key={c.name} href={`#${c.name.toLowerCase()}`} className={`block px-4 py-2.5 rounded-xl text-sm font-medium ${i === 0 ? "bg-secondary text-foreground" : "text-muted-foreground hover:bg-secondary/60"}`}>{c.name}</a>
          ))}
        </aside>
        <div className="space-y-12">
          {cats.map((c) => (
            <section key={c.name} id={c.name.toLowerCase()}>
              <h2 className="font-display text-2xl font-bold mb-4">{c.name}</h2>
              <Accordion type="single" collapsible className="rounded-2xl border border-border bg-card divide-y divide-border">
                {c.items.map((f, i) => (
                  <AccordionItem key={i} value={`${c.name}-${i}`} className="border-0 px-5">
                    <AccordionTrigger className="text-left font-semibold">{f.q}</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}

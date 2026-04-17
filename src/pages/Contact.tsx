import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export default function Contact() {
  return (
    <div className="container py-16">
      <div className="max-w-2xl mb-12">
        <span className="text-xs font-semibold uppercase tracking-wider text-primary">Get in touch</span>
        <h1 className="mt-2 font-display text-4xl sm:text-5xl font-bold">We'd love to hear from you</h1>
        <p className="mt-4 text-muted-foreground">Whether you have a question about a booking, a partnership opportunity, or anything else, our team is ready to help.</p>
      </div>

      <div className="grid lg:grid-cols-[1fr_360px] gap-8">
        <form
          onSubmit={(e) => { e.preventDefault(); toast.success("Message sent", { description: "We'll get back to you shortly." }); }}
          className="rounded-2xl border border-border bg-card p-8"
        >
          <div className="grid sm:grid-cols-2 gap-5">
            <div><Label>Full name</Label><Input className="mt-1.5" placeholder="Jane Doe" /></div>
            <div><Label>Email</Label><Input type="email" className="mt-1.5" placeholder="jane@example.com" /></div>
          </div>
          <div className="mt-5"><Label>Subject</Label><Input className="mt-1.5" placeholder="How can we help?" /></div>
          <div className="mt-5"><Label>Message</Label><Textarea rows={6} className="mt-1.5 resize-none" placeholder="Tell us a bit more…" /></div>
          <Button type="submit" className="mt-6 rounded-full" size="lg">Send message</Button>
        </form>

        <aside className="space-y-3">
          {[
            { icon: Mail, t: "Email", d: "support@drivenow.com" },
            { icon: Phone, t: "Phone", d: "+971 4 123 4567" },
            { icon: MapPin, t: "Office", d: "Downtown, Dubai, UAE" },
            { icon: MessageCircle, t: "Live chat", d: "Available 24/7" },
          ].map((c, i) => (
            <div key={i} className="rounded-2xl border border-border bg-card p-5 flex items-start gap-4">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-accent text-accent-foreground"><c.icon className="h-4 w-4" /></span>
              <div><p className="font-semibold text-sm">{c.t}</p><p className="text-sm text-muted-foreground">{c.d}</p></div>
            </div>
          ))}
        </aside>
      </div>
    </div>
  );
}

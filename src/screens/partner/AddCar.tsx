"use client";

import DashboardLayout, { PageHeader } from "@/layouts/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { UploadCloud } from "lucide-react";
import { toast } from "sonner";

const sections = ["Basic info", "Specifications", "Pricing", "Location", "Description", "Features", "Photos", "Availability"];

export default function PartnerAddCar() {
  return (
    <DashboardLayout role="partner">
      <PageHeader title="Add new car" description="List a vehicle on DriveNow in minutes." />

      <div className="grid lg:grid-cols-[220px_1fr] gap-6">
        <aside className="lg:sticky lg:top-24 self-start">
          <ol className="space-y-1">
            {sections.map((s, i) => (
              <li key={s}>
                <a href={`#s${i}`} className={`flex items-center gap-3 px-3 py-2 rounded-xl text-sm ${i === 0 ? "bg-secondary text-foreground font-medium" : "text-muted-foreground hover:bg-secondary/60"}`}>
                  <span className="grid h-6 w-6 place-items-center rounded-full bg-card border border-border text-xs">{i + 1}</span>
                  {s}
                </a>
              </li>
            ))}
          </ol>
        </aside>

        <form onSubmit={(e) => { e.preventDefault(); toast.success("Car listed", { description: "Your car is now visible to customers." }); }} className="space-y-6">
          <Section id="s0" title="Basic information">
            <Field label="Title"><Input placeholder="e.g. BMW 5 Series M Sport" /></Field>
            <div className="grid sm:grid-cols-3 gap-4">
              <Field label="Brand"><Input /></Field>
              <Field label="Model"><Input /></Field>
              <Field label="Year"><Input type="number" /></Field>
            </div>
            <Field label="Category">
              <Select><SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
                <SelectContent>{["SUV", "Sedan", "Coupe", "Hatchback", "Electric", "Pickup"].map(x => <SelectItem key={x} value={x}>{x}</SelectItem>)}</SelectContent>
              </Select>
            </Field>
          </Section>

          <Section id="s1" title="Specifications">
            <div className="grid sm:grid-cols-3 gap-4">
              <Field label="Seats"><Input type="number" defaultValue={5} /></Field>
              <Field label="Doors"><Input type="number" defaultValue={4} /></Field>
              <Field label="Luggage"><Input type="number" defaultValue={3} /></Field>
              <Field label="Transmission">
                <Select><SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                  <SelectContent><SelectItem value="auto">Automatic</SelectItem><SelectItem value="manual">Manual</SelectItem></SelectContent>
                </Select>
              </Field>
              <Field label="Fuel type">
                <Select><SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                  <SelectContent>{["Petrol", "Diesel", "Electric", "Hybrid"].map(x => <SelectItem key={x} value={x}>{x}</SelectItem>)}</SelectContent>
                </Select>
              </Field>
              <Field label="Color"><Input /></Field>
            </div>
          </Section>

          <Section id="s2" title="Pricing">
            <div className="grid sm:grid-cols-3 gap-4">
              <Field label="Price per day ($)"><Input type="number" /></Field>
              <Field label="Security deposit ($)"><Input type="number" /></Field>
              <Field label="Weekly discount (%)"><Input type="number" /></Field>
            </div>
          </Section>

          <Section id="s3" title="Location">
            <Field label="City"><Input placeholder="Dubai" /></Field>
            <Field label="Address"><Input /></Field>
            <Field label="Pickup point"><Input /></Field>
          </Section>

          <Section id="s4" title="Description">
            <Field label="About this car"><Textarea rows={5} className="resize-none" placeholder="Tell renters what makes this car special…" /></Field>
          </Section>

          <Section id="s5" title="Features">
            <div className="grid sm:grid-cols-3 gap-3">
              {["Apple CarPlay", "Bluetooth", "GPS", "Sunroof", "Heated seats", "360° camera", "Cruise control", "Premium audio", "Keyless entry"].map((f) => (
                <label key={f} className="flex items-center gap-2 rounded-xl border border-border p-3 cursor-pointer hover:bg-secondary/40">
                  <Checkbox /><span className="text-sm">{f}</span>
                </label>
              ))}
            </div>
          </Section>

          <Section id="s6" title="Photos">
            <div className="rounded-2xl border-2 border-dashed border-border p-10 text-center bg-secondary/30">
              <UploadCloud className="h-8 w-8 mx-auto text-muted-foreground" />
              <p className="mt-3 text-sm font-medium">Drop your photos here or <span className="text-primary">browse</span></p>
              <p className="mt-1 text-xs text-muted-foreground">PNG, JPG up to 10MB each</p>
            </div>
          </Section>

          <Section id="s7" title="Availability">
            <Field label="Always available"><Checkbox defaultChecked /> <span className="text-sm">Use availability calendar</span></Field>
          </Section>

          <div className="flex flex-wrap gap-3 sticky bottom-0 bg-background/80 backdrop-blur-xl py-4 -mx-4 px-4 border-t border-border">
            <Button type="submit" className="rounded-full">Publish car</Button>
            <Button type="button" variant="outline" className="rounded-full">Save draft</Button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}

function Section({ id, title, children }: any) {
  return (
    <section id={id} className="rounded-2xl border border-border bg-card p-6">
      <h3 className="font-display font-semibold mb-5">{title}</h3>
      <div className="space-y-4">{children}</div>
    </section>
  );
}
function Field({ label, children }: any) {
  return <div><Label className="text-xs">{label}</Label><div className="mt-1.5">{children}</div></div>;
}

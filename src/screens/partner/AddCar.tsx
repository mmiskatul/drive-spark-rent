"use client";

import { type FormEvent, type ReactNode, useState } from "react";
import { useRouter } from "next/navigation";
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
const featureOptions = ["Apple CarPlay", "Bluetooth", "GPS", "Sunroof", "Heated seats", "360 camera", "Cruise control", "Premium audio", "Keyless entry"];

export default function PartnerAddCar() {
  const router = useRouter();
  const [category, setCategory] = useState("");
  const [transmission, setTransmission] = useState("");
  const [fuel, setFuel] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!category || !transmission || !fuel) {
      toast.error("Complete all required selections.");
      return;
    }

    const formData = new FormData(event.currentTarget);
    const city = String(formData.get("city") ?? "").trim();
    const address = String(formData.get("address") ?? "").trim();

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/cars", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: String(formData.get("title") ?? ""),
          brand: String(formData.get("brand") ?? ""),
          model: String(formData.get("model") ?? ""),
          year: Number(formData.get("year")),
          category,
          location: [city, address].filter(Boolean).join(", "),
          price_per_day: Number(formData.get("price_per_day")),
          seats: Number(formData.get("seats")),
          transmission,
          fuel,
          features: formData.getAll("features").map(String),
          description: String(formData.get("description") ?? ""),
          status: "active",
        }),
      });
      const data = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(data?.detail ?? "Unable to publish car.");
      }

      toast.success("Car listed", { description: "Your car is now visible to customers." });
      router.push("/partner/cars");
      router.refresh();
    } catch (error) {
      toast.error("Could not list car", {
        description: error instanceof Error ? error.message : "Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <DashboardLayout role="partner">
      <PageHeader title="Add new car" description="List a vehicle on DriveNow in minutes." />

      <div className="grid lg:grid-cols-[220px_1fr] gap-6">
        <aside className="lg:sticky lg:top-24 self-start">
          <ol className="space-y-1">
            {sections.map((section, index) => (
              <li key={section}>
                <a
                  href={`#s${index}`}
                  className={`flex items-center gap-3 px-3 py-2 rounded-xl text-sm ${index === 0 ? "bg-secondary text-foreground font-medium" : "text-muted-foreground hover:bg-secondary/60"}`}
                >
                  <span className="grid h-6 w-6 place-items-center rounded-full bg-card border border-border text-xs">{index + 1}</span>
                  {section}
                </a>
              </li>
            ))}
          </ol>
        </aside>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Section id="s0" title="Basic information">
            <Field label="Title"><Input name="title" placeholder="e.g. BMW 5 Series M Sport" required /></Field>
            <div className="grid sm:grid-cols-3 gap-4">
              <Field label="Brand"><Input name="brand" required /></Field>
              <Field label="Model"><Input name="model" required /></Field>
              <Field label="Year"><Input name="year" type="number" min={1990} max={2100} required /></Field>
            </div>
            <Field label="Category">
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
                <SelectContent>
                  {["SUV", "Sedan", "Coupe", "Hatchback", "Electric", "Pickup"].map((option) => (
                    <SelectItem key={option} value={option}>{option}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
          </Section>

          <Section id="s1" title="Specifications">
            <div className="grid sm:grid-cols-3 gap-4">
              <Field label="Seats"><Input name="seats" type="number" min={1} max={12} defaultValue={5} required /></Field>
              <Field label="Doors"><Input type="number" defaultValue={4} /></Field>
              <Field label="Luggage"><Input type="number" defaultValue={3} /></Field>
              <Field label="Transmission">
                <Select value={transmission} onValueChange={setTransmission}>
                  <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Automatic">Automatic</SelectItem>
                    <SelectItem value="Manual">Manual</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
              <Field label="Fuel type">
                <Select value={fuel} onValueChange={setFuel}>
                  <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                  <SelectContent>
                    {["Petrol", "Diesel", "Electric", "Hybrid"].map((option) => (
                      <SelectItem key={option} value={option}>{option}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
              <Field label="Color"><Input /></Field>
            </div>
          </Section>

          <Section id="s2" title="Pricing">
            <div className="grid sm:grid-cols-3 gap-4">
              <Field label="Price per day ($)"><Input name="price_per_day" type="number" min={1} step="0.01" required /></Field>
              <Field label="Security deposit ($)"><Input type="number" /></Field>
              <Field label="Weekly discount (%)"><Input type="number" /></Field>
            </div>
          </Section>

          <Section id="s3" title="Location">
            <Field label="City"><Input name="city" placeholder="Dubai" required /></Field>
            <Field label="Address"><Input name="address" /></Field>
            <Field label="Pickup point"><Input /></Field>
          </Section>

          <Section id="s4" title="Description">
            <Field label="About this car"><Textarea name="description" rows={5} className="resize-none" placeholder="Tell renters what makes this car special..." /></Field>
          </Section>

          <Section id="s5" title="Features">
            <div className="grid sm:grid-cols-3 gap-3">
              {featureOptions.map((feature) => (
                <label key={feature} className="flex items-center gap-2 rounded-xl border border-border p-3 cursor-pointer hover:bg-secondary/40">
                  <Checkbox name="features" value={feature} />
                  <span className="text-sm">{feature}</span>
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
            <Button type="submit" className="rounded-full" disabled={isSubmitting}>
              {isSubmitting ? "Publishing..." : "Publish car"}
            </Button>
            <Button type="button" variant="outline" className="rounded-full">Save draft</Button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}

function Section({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section id={id} className="rounded-2xl border border-border bg-card p-6">
      <h3 className="font-display font-semibold mb-5">{title}</h3>
      <div className="space-y-4">{children}</div>
    </section>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return <div><Label className="text-xs">{label}</Label><div className="mt-1.5">{children}</div></div>;
}

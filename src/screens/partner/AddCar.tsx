"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { type ReactNode, useEffect, useMemo, useState } from "react";
import DashboardLayout, { PageHeader } from "@/layouts/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowRight, Check, UploadCloud, X } from "lucide-react";
import { toast } from "sonner";

const draftStorageKey = "partner-add-car-draft";

const steps = [
  { slug: "basic-info", label: "Basic info", title: "Basic information" },
  { slug: "specifications", label: "Specifications", title: "Specifications" },
  { slug: "pricing", label: "Pricing", title: "Pricing" },
  { slug: "location", label: "Location", title: "Location" },
  { slug: "description", label: "Description", title: "Description" },
  { slug: "features", label: "Features", title: "Features" },
  { slug: "photos", label: "Photos", title: "Photos" },
  { slug: "availability", label: "Availability", title: "Availability" },
] as const;

type StepSlug = (typeof steps)[number]["slug"];

type CarDraft = {
  title: string;
  brand: string;
  model: string;
  year: string;
  category: string;
  seats: string;
  doors: string;
  luggage: string;
  transmission: string;
  fuel: string;
  color: string;
  price_per_day: string;
  security_deposit: string;
  weekly_discount: string;
  city: string;
  address: string;
  pickup_point: string;
  description: string;
  features: string[];
  image_urls: string[];
  always_available: boolean;
};

const initialDraft: CarDraft = {
  title: "",
  brand: "",
  model: "",
  year: "",
  category: "",
  seats: "5",
  doors: "4",
  luggage: "3",
  transmission: "",
  fuel: "",
  color: "",
  price_per_day: "",
  security_deposit: "",
  weekly_discount: "",
  city: "",
  address: "",
  pickup_point: "",
  description: "",
  features: [],
  image_urls: [],
  always_available: true,
};

type ImageUploadResponse = {
  url: string;
  public_id: string;
};

const featureOptions = [
  "Apple CarPlay",
  "Bluetooth",
  "GPS",
  "Sunroof",
  "Heated seats",
  "360 camera",
  "Cruise control",
  "Premium audio",
  "Keyless entry",
];

const categoryOptions = ["SUV", "Sedan", "Coupe", "Hatchback", "Electric", "Pickup"];
const fuelOptions = ["Petrol", "Diesel", "Electric", "Hybrid"];

export default function PartnerAddCar({ step }: { step: string }) {
  const router = useRouter();
  const currentIndex = steps.findIndex((item) => item.slug === step);
  const safeIndex = currentIndex === -1 ? 0 : currentIndex;
  const currentStep = steps[safeIndex];
  const isFirstStep = safeIndex === 0;
  const isLastStep = safeIndex === steps.length - 1;
  const [draft, setDraft] = useState<CarDraft>(initialDraft);
  const [completedSteps, setCompletedSteps] = useState<StepSlug[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  const completedSet = useMemo(() => new Set(completedSteps), [completedSteps]);

  useEffect(() => {
    if (currentIndex !== -1) {
      return;
    }

    router.replace(`/partner/cars/new/${steps[0].slug}`);
  }, [currentIndex, router]);

  useEffect(() => {
    const storedDraft = window.localStorage.getItem(draftStorageKey);
    const storedSteps = window.localStorage.getItem(`${draftStorageKey}:completed`);

    if (storedDraft) {
      try {
        setDraft({ ...initialDraft, ...(JSON.parse(storedDraft) as Partial<CarDraft>) });
      } catch {
        window.localStorage.removeItem(draftStorageKey);
      }
    }

    if (storedSteps) {
      try {
        const parsedSteps = JSON.parse(storedSteps) as string[];
        setCompletedSteps(parsedSteps.filter(isStepSlug));
      } catch {
        window.localStorage.removeItem(`${draftStorageKey}:completed`);
      }
    }

    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (!isLoaded) {
      return;
    }

    window.localStorage.setItem(draftStorageKey, JSON.stringify(draft));
    window.localStorage.setItem(`${draftStorageKey}:completed`, JSON.stringify(completedSteps));
  }, [completedSteps, draft, isLoaded]);

  function updateDraft<Key extends keyof CarDraft>(key: Key, value: CarDraft[Key]) {
    setDraft((currentDraft) => ({ ...currentDraft, [key]: value }));
  }

  function toggleFeature(feature: string, checked: boolean) {
    setDraft((currentDraft) => ({
      ...currentDraft,
      features: checked
        ? [...currentDraft.features, feature]
        : currentDraft.features.filter((currentFeature) => currentFeature !== feature),
    }));
  }

  async function handleImageUpload(files: FileList | null) {
    if (!files?.length) {
      return;
    }

    setIsUploadingImage(true);

    try {
      const uploadedUrls: string[] = [];

      for (const file of Array.from(files)) {
        const formData = new FormData();
        formData.append("file", file);

        const response = await fetch("/api/cars/images", {
          method: "POST",
          body: formData,
        });
        const data = (await response.json().catch(() => null)) as ImageUploadResponse | { detail?: string } | null;

        if (!response.ok || !data || !("url" in data)) {
          throw new Error(data && "detail" in data && data.detail ? data.detail : "Image upload failed.");
        }

        uploadedUrls.push(data.url);
      }

      updateDraft("image_urls", [...draft.image_urls, ...uploadedUrls]);
      toast.success("Photos uploaded");
    } catch (error) {
      toast.error("Could not upload photos", {
        description: error instanceof Error ? error.message : "Please try again.",
      });
    } finally {
      setIsUploadingImage(false);
    }
  }

  function removeImageUrl(imageUrl: string) {
    updateDraft(
      "image_urls",
      draft.image_urls.filter((currentUrl) => currentUrl !== imageUrl),
    );
  }

  function markCurrentStepComplete() {
    setCompletedSteps((currentSteps) =>
      currentSteps.includes(currentStep.slug) ? currentSteps : [...currentSteps, currentStep.slug],
    );
  }

  function validateStep(slug: StepSlug) {
    if (slug === "basic-info") {
      if (!draft.title.trim() || !draft.brand.trim() || !draft.model.trim() || !draft.year || !draft.category) {
        toast.error("Complete the basic information before continuing.");
        return false;
      }
    }

    if (slug === "specifications") {
      if (!draft.seats || !draft.transmission || !draft.fuel) {
        toast.error("Complete the specifications before continuing.");
        return false;
      }
    }

    if (slug === "pricing" && !draft.price_per_day) {
      toast.error("Add a price per day before continuing.");
      return false;
    }

    if (slug === "location" && !draft.city.trim()) {
      toast.error("Add the city before continuing.");
      return false;
    }

    return true;
  }

  function goToStep(index: number) {
    router.push(`/partner/cars/new/${steps[index].slug}`);
  }

  function handleNext() {
    if (!validateStep(currentStep.slug)) {
      return;
    }

    markCurrentStepComplete();
    goToStep(Math.min(safeIndex + 1, steps.length - 1));
  }

  function handlePrevious() {
    goToStep(Math.max(safeIndex - 1, 0));
  }

  async function handleSubmit() {
    if (!validateStep(currentStep.slug)) {
      return;
    }

    markCurrentStepComplete();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/cars", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: draft.title,
          brand: draft.brand,
          model: draft.model,
          year: Number(draft.year),
          category: draft.category,
          location: [draft.city, draft.address].filter(Boolean).join(", "),
          price_per_day: Number(draft.price_per_day),
          seats: Number(draft.seats),
          transmission: draft.transmission,
          fuel: draft.fuel,
          features: draft.features,
          image_urls: draft.image_urls,
          description: draft.description,
          status: "active",
        }),
      });
      const data = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(data?.detail ?? "Unable to publish car.");
      }

      window.localStorage.removeItem(draftStorageKey);
      window.localStorage.removeItem(`${draftStorageKey}:completed`);
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
      <PageHeader title="Add new car" description="Complete each section to publish a vehicle." />

      <div className="grid gap-6 lg:grid-cols-[240px_1fr]">
        <aside className="self-start lg:sticky lg:top-24">
          <ol className="space-y-1">
            {steps.map((item, index) => {
              const isActive = item.slug === currentStep.slug;
              const isComplete = completedSet.has(item.slug);

              return (
                <li key={item.slug}>
                  <Link
                    href={`/partner/cars/new/${item.slug}`}
                    className={cn(
                      "flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition-colors",
                      isActive && "bg-secondary text-foreground font-medium",
                      !isActive && "text-muted-foreground hover:bg-secondary/60",
                    )}
                  >
                    <span
                      className={cn(
                        "grid h-6 w-6 shrink-0 place-items-center rounded-full border text-xs",
                        isComplete
                          ? "border-destructive bg-destructive text-destructive-foreground"
                          : "border-border bg-card text-muted-foreground",
                      )}
                    >
                      {isComplete ? <Check className="h-3.5 w-3.5" /> : index + 1}
                    </span>
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ol>
        </aside>

        <section className="rounded-2xl border border-border bg-card p-6">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-xs font-medium uppercase text-muted-foreground">
                Step {safeIndex + 1} of {steps.length}
              </p>
              <h3 className="font-display text-xl font-semibold">{currentStep.title}</h3>
            </div>
          </div>

          <div className="min-h-[360px]">
            {currentStep.slug === "basic-info" && (
              <div className="space-y-4">
                <Field label="Title">
                  <Input value={draft.title} onChange={(event) => updateDraft("title", event.target.value)} placeholder="e.g. BMW 5 Series M Sport" required />
                </Field>
                <div className="grid gap-4 sm:grid-cols-3">
                  <Field label="Brand">
                    <Input value={draft.brand} onChange={(event) => updateDraft("brand", event.target.value)} required />
                  </Field>
                  <Field label="Model">
                    <Input value={draft.model} onChange={(event) => updateDraft("model", event.target.value)} required />
                  </Field>
                  <Field label="Year">
                    <Input value={draft.year} onChange={(event) => updateDraft("year", event.target.value)} type="number" min={1990} max={2100} required />
                  </Field>
                </div>
                <Field label="Category">
                  <Select value={draft.category} onValueChange={(value) => updateDraft("category", value)}>
                    <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
                    <SelectContent>
                      {categoryOptions.map((option) => (
                        <SelectItem key={option} value={option}>{option}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
              </div>
            )}

            {currentStep.slug === "specifications" && (
              <div className="grid gap-4 sm:grid-cols-3">
                <Field label="Seats">
                  <Input value={draft.seats} onChange={(event) => updateDraft("seats", event.target.value)} type="number" min={1} max={12} required />
                </Field>
                <Field label="Doors">
                  <Input value={draft.doors} onChange={(event) => updateDraft("doors", event.target.value)} type="number" />
                </Field>
                <Field label="Luggage">
                  <Input value={draft.luggage} onChange={(event) => updateDraft("luggage", event.target.value)} type="number" />
                </Field>
                <Field label="Transmission">
                  <Select value={draft.transmission} onValueChange={(value) => updateDraft("transmission", value)}>
                    <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Automatic">Automatic</SelectItem>
                      <SelectItem value="Manual">Manual</SelectItem>
                    </SelectContent>
                  </Select>
                </Field>
                <Field label="Fuel type">
                  <Select value={draft.fuel} onValueChange={(value) => updateDraft("fuel", value)}>
                    <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                    <SelectContent>
                      {fuelOptions.map((option) => (
                        <SelectItem key={option} value={option}>{option}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
                <Field label="Color">
                  <Input value={draft.color} onChange={(event) => updateDraft("color", event.target.value)} />
                </Field>
              </div>
            )}

            {currentStep.slug === "pricing" && (
              <div className="grid gap-4 sm:grid-cols-3">
                <Field label="Price per day ($)">
                  <Input value={draft.price_per_day} onChange={(event) => updateDraft("price_per_day", event.target.value)} type="number" min={1} step="0.01" required />
                </Field>
                <Field label="Security deposit ($)">
                  <Input value={draft.security_deposit} onChange={(event) => updateDraft("security_deposit", event.target.value)} type="number" />
                </Field>
                <Field label="Weekly discount (%)">
                  <Input value={draft.weekly_discount} onChange={(event) => updateDraft("weekly_discount", event.target.value)} type="number" />
                </Field>
              </div>
            )}

            {currentStep.slug === "location" && (
              <div className="space-y-4">
                <Field label="City">
                  <Input value={draft.city} onChange={(event) => updateDraft("city", event.target.value)} placeholder="Dubai" required />
                </Field>
                <Field label="Address">
                  <Input value={draft.address} onChange={(event) => updateDraft("address", event.target.value)} />
                </Field>
                <Field label="Pickup point">
                  <Input value={draft.pickup_point} onChange={(event) => updateDraft("pickup_point", event.target.value)} />
                </Field>
              </div>
            )}

            {currentStep.slug === "description" && (
              <Field label="About this car">
                <Textarea
                  value={draft.description}
                  onChange={(event) => updateDraft("description", event.target.value)}
                  rows={8}
                  className="resize-none"
                  placeholder="Tell renters what makes this car special..."
                />
              </Field>
            )}

            {currentStep.slug === "features" && (
              <div className="grid gap-3 sm:grid-cols-3">
                {featureOptions.map((feature) => (
                  <label key={feature} className="flex cursor-pointer items-center gap-2 rounded-xl border border-border p-3 hover:bg-secondary/40">
                    <Checkbox
                      checked={draft.features.includes(feature)}
                      onCheckedChange={(checked) => toggleFeature(feature, checked === true)}
                    />
                    <span className="text-sm">{feature}</span>
                  </label>
                ))}
              </div>
            )}

            {currentStep.slug === "photos" && (
              <div className="space-y-4">
                <label className="block cursor-pointer rounded-2xl border-2 border-dashed border-border bg-secondary/30 p-10 text-center transition-colors hover:bg-secondary/50">
                  <UploadCloud className="mx-auto h-8 w-8 text-muted-foreground" />
                  <p className="mt-3 text-sm font-medium">
                    {isUploadingImage ? "Uploading photos..." : "Drop your photos here or browse"}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">PNG, JPG up to 10MB each</p>
                  <Input
                    type="file"
                    accept="image/*"
                    multiple
                    disabled={isUploadingImage}
                    className="sr-only"
                    onChange={(event) => void handleImageUpload(event.target.files)}
                  />
                </label>

                {draft.image_urls.length > 0 && (
                  <div className="grid gap-3 sm:grid-cols-3">
                    {draft.image_urls.map((imageUrl) => (
                      <div key={imageUrl} className="group relative overflow-hidden rounded-xl border border-border">
                        <img src={imageUrl} alt="Uploaded car" className="h-32 w-full object-cover" />
                        <Button
                          type="button"
                          variant="secondary"
                          size="icon"
                          className="absolute right-2 top-2 h-8 w-8 rounded-full opacity-90"
                          onClick={() => removeImageUrl(imageUrl)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {currentStep.slug === "availability" && (
              <label className="flex items-center gap-3 rounded-xl border border-border p-4">
                <Checkbox
                  checked={draft.always_available}
                  onCheckedChange={(checked) => updateDraft("always_available", checked === true)}
                />
                <span className="text-sm">Always available</span>
              </label>
            )}
          </div>

          <div className="mt-6 flex flex-wrap justify-between gap-3 border-t border-border pt-5">
            <Button type="button" variant="outline" className="rounded-full" disabled={isFirstStep} onClick={handlePrevious}>
              <ArrowLeft className="h-4 w-4" /> Previous
            </Button>
            <div className="flex flex-wrap gap-3">
              <Button type="button" variant="outline" className="rounded-full" onClick={() => toast.success("Draft saved")}>
                Save draft
              </Button>
              {isLastStep ? (
                <Button type="button" className="rounded-full" disabled={isSubmitting} onClick={handleSubmit}>
                  {isSubmitting ? "Publishing..." : "Publish car"}
                </Button>
              ) : (
                <Button type="button" className="rounded-full" onClick={handleNext}>
                  Next <ArrowRight className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <Label className="text-xs">{label}</Label>
      <div className="mt-1.5">{children}</div>
    </div>
  );
}

function isStepSlug(value: string): value is StepSlug {
  return steps.some((step) => step.slug === value);
}

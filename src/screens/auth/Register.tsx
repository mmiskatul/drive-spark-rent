"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { type FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import AuthLayout from "@/layouts/AuthLayout";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

type AccountRole = "customer" | "partner";

type RegisterResponse = {
  message?: string;
  detail?: string | { msg?: string }[];
  email?: string;
  role?: AccountRole;
};

function getErrorMessage(data: RegisterResponse) {
  if (data.message) {
    return data.message;
  }

  if (typeof data.detail === "string") {
    return data.detail;
  }

  if (Array.isArray(data.detail)) {
    return data.detail.map((item) => item.msg).filter(Boolean).join(" ");
  }

  return "Unable to create account.";
}

function isValidPasswordByteLength(password: string) {
  return new TextEncoder().encode(password).length <= 72;
}

async function registerAccount({
  name,
  email,
  password,
  role,
}: {
  name: string;
  email: string;
  password: string;
  role: AccountRole;
}) {
  const response = await fetch("/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password, role }),
  });
  const data = (await response.json()) as RegisterResponse;

  if (!response.ok) {
    throw new Error(getErrorMessage(data));
  }

  return data;
}

export default function Register() {
  const router = useRouter();
  const [customerAgreed, setCustomerAgreed] = useState(false);
  const [partnerAgreed, setPartnerAgreed] = useState(false);
  const [businessType, setBusinessType] = useState("");
  const [isSubmitting, setIsSubmitting] = useState<AccountRole | null>(null);

  async function handleCustomerSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const password = String(formData.get("password") ?? "");
    const confirmPassword = String(formData.get("confirmPassword") ?? "");

    if (!customerAgreed) {
      toast.error("Please accept the terms to continue.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    if (!isValidPasswordByteLength(password)) {
      toast.error("Password is too long.", {
        description: "Use 72 bytes or fewer. Some symbols and emojis count as multiple bytes.",
      });
      return;
    }

    setIsSubmitting("customer");

    try {
      const data = await registerAccount({
        name: String(formData.get("name") ?? ""),
        email: String(formData.get("email") ?? ""),
        password,
        role: "customer",
      });
      toast.success("Verification code sent", {
        description: "Enter the verification code sent to your email.",
      });
      const email = data.email ?? String(formData.get("email") ?? "");
      router.push(`/verify-email?email=${encodeURIComponent(email)}&role=customer`);
    } catch (error) {
      toast.error("Registration failed", {
        description: error instanceof Error ? error.message : "Please try again.",
      });
    } finally {
      setIsSubmitting(null);
    }
  }

  async function handlePartnerSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const password = String(formData.get("password") ?? "");
    const confirmPassword = String(formData.get("confirmPassword") ?? "");
    const ownerName = String(formData.get("ownerName") ?? "");
    const businessName = String(formData.get("businessName") ?? "");

    if (!partnerAgreed) {
      toast.error("Please accept the partner terms to continue.");
      return;
    }

    if (!businessType) {
      toast.error("Please select a business type.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    if (!isValidPasswordByteLength(password)) {
      toast.error("Password is too long.", {
        description: "Use 72 bytes or fewer. Some symbols and emojis count as multiple bytes.",
      });
      return;
    }

    setIsSubmitting("partner");

    try {
      const data = await registerAccount({
        name: businessName || ownerName,
        email: String(formData.get("email") ?? ""),
        password,
        role: "partner",
      });
      toast.success("Verification code sent", {
        description: "Enter the verification code sent to your email.",
      });
      const email = data.email ?? String(formData.get("email") ?? "");
      router.push(`/verify-email?email=${encodeURIComponent(email)}&role=partner`);
    } catch (error) {
      toast.error("Registration failed", {
        description: error instanceof Error ? error.message : "Please try again.",
      });
    } finally {
      setIsSubmitting(null);
    }
  }

  return (
    <AuthLayout title="Create your account" subtitle="Join the most premium car rental marketplace">
      <Tabs defaultValue="customer">
        <TabsList className="grid grid-cols-2 mb-6">
          <TabsTrigger value="customer">Customer</TabsTrigger>
          <TabsTrigger value="partner">Rental Partner</TabsTrigger>
        </TabsList>

        <TabsContent value="customer">
          <form onSubmit={handleCustomerSubmit} className="space-y-4">
            <div>
              <Label htmlFor="customer-name">Full name</Label>
              <Input id="customer-name" name="name" className="mt-1.5 h-11" placeholder="Jane Doe" autoComplete="name" required />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="customer-email">Email</Label>
                <Input id="customer-email" name="email" className="mt-1.5 h-11" type="email" autoComplete="email" required />
              </div>
              <div>
                <Label htmlFor="customer-phone">Phone</Label>
                <Input id="customer-phone" name="phone" className="mt-1.5 h-11" type="tel" autoComplete="tel" />
              </div>
            </div>
            <div>
              <Label htmlFor="customer-password">Password</Label>
              <Input id="customer-password" name="password" className="mt-1.5 h-11" type="password" autoComplete="new-password" maxLength={72} required />
            </div>
            <div>
              <Label htmlFor="customer-confirm-password">Confirm password</Label>
              <Input id="customer-confirm-password" name="confirmPassword" className="mt-1.5 h-11" type="password" autoComplete="new-password" maxLength={72} required />
            </div>
            <div className="flex items-start gap-2">
              <Checkbox
                id="terms"
                className="mt-0.5"
                checked={customerAgreed}
                onCheckedChange={(checked) => setCustomerAgreed(checked === true)}
              />
              <label htmlFor="terms" className="text-xs text-muted-foreground">
                I agree to the <a className="text-primary hover:underline">Terms</a> and <a className="text-primary hover:underline">Privacy Policy</a>.
              </label>
            </div>
            <Button type="submit" className="w-full h-11 rounded-full" disabled={isSubmitting === "customer"}>
              {isSubmitting === "customer" ? "Creating account..." : "Create customer account"}
            </Button>
            <p className="text-center text-sm text-muted-foreground">
              Already have an account? <Link href="/login" className="text-primary font-semibold hover:underline">Sign in</Link>
            </p>
          </form>
        </TabsContent>

        <TabsContent value="partner">
          <form onSubmit={handlePartnerSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="owner-name">Owner name</Label>
                <Input id="owner-name" name="ownerName" className="mt-1.5 h-11" required />
              </div>
              <div>
                <Label htmlFor="business-name">Business name</Label>
                <Input id="business-name" name="businessName" className="mt-1.5 h-11" required />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="partner-email">Email</Label>
                <Input id="partner-email" name="email" className="mt-1.5 h-11" type="email" autoComplete="email" required />
              </div>
              <div>
                <Label htmlFor="partner-phone">Phone</Label>
                <Input id="partner-phone" name="phone" className="mt-1.5 h-11" type="tel" autoComplete="tel" />
              </div>
            </div>
            <div>
              <Label>Business type</Label>
              <Select value={businessType} onValueChange={setBusinessType}>
                <SelectTrigger className="mt-1.5 h-11"><SelectValue placeholder="Select type" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="individual">Individual</SelectItem>
                  <SelectItem value="agency">Rental agency</SelectItem>
                  <SelectItem value="dealership">Dealership</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="partner-password">Password</Label>
                <Input id="partner-password" name="password" className="mt-1.5 h-11" type="password" autoComplete="new-password" maxLength={72} required />
              </div>
              <div>
                <Label htmlFor="partner-confirm-password">Confirm</Label>
                <Input id="partner-confirm-password" name="confirmPassword" className="mt-1.5 h-11" type="password" autoComplete="new-password" maxLength={72} required />
              </div>
            </div>
            <div className="rounded-xl bg-status-pending-bg text-status-pending text-xs p-3 border border-status-pending/20">
              Your partner account is created after email verification. Partner review still happens before listing cars.
            </div>
            <div className="flex items-start gap-2">
              <Checkbox
                id="ptos"
                className="mt-0.5"
                checked={partnerAgreed}
                onCheckedChange={(checked) => setPartnerAgreed(checked === true)}
              />
              <label htmlFor="ptos" className="text-xs text-muted-foreground">I agree to the Partner Terms.</label>
            </div>
            <Button type="submit" className="w-full h-11 rounded-full" disabled={isSubmitting === "partner"}>
              {isSubmitting === "partner" ? "Submitting..." : "Apply as partner"}
            </Button>
          </form>
        </TabsContent>
      </Tabs>
    </AuthLayout>
  );
}

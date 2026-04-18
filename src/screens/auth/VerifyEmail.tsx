"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { type FormEvent, useEffect, useMemo, useState } from "react";
import AuthLayout from "@/layouts/AuthLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

type VerifyResponse = {
  detail?: string | { msg?: string }[];
  user?: {
    role?: "customer" | "partner" | "admin";
  };
};

const roleRedirects = {
  customer: "/customer",
  partner: "/partner",
  admin: "/admin",
};

function getErrorMessage(data: VerifyResponse) {
  if (typeof data.detail === "string") {
    return data.detail;
  }

  if (Array.isArray(data.detail)) {
    return data.detail.map((item) => item.msg).filter(Boolean).join(" ");
  }

  return "Unable to verify email.";
}

export default function VerifyEmail() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialEmail = useMemo(() => searchParams.get("email") ?? "", [searchParams]);
  const [email, setEmail] = useState(initialEmail);
  const [code, setCode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isResending, setIsResending] = useState(false);

  useEffect(() => {
    if (initialEmail) {
      setEmail(initialEmail);
    }
  }, [initialEmail]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!email) {
      toast.error("Verification email is missing.", {
        description: "Please register again or use the latest verification link.",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/auth/verify-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code }),
      });
      const data = (await response.json()) as VerifyResponse;

      if (!response.ok) {
        throw new Error(getErrorMessage(data));
      }

      toast.success("Account created");
      const redirectTo = data.user?.role ? roleRedirects[data.user.role] : "/customer";
      router.push(redirectTo);
      router.refresh();
    } catch (error) {
      toast.error("Verification failed", {
        description: error instanceof Error ? error.message : "Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleResend() {
    if (!email) {
      toast.error("Enter your email first.");
      return;
    }

    setIsResending(true);

    try {
      const response = await fetch("/api/auth/resend-verification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = (await response.json()) as VerifyResponse;

      if (!response.ok) {
        throw new Error(getErrorMessage(data));
      }

      toast.success("Verification code sent");
    } catch (error) {
      toast.error("Could not resend code", {
        description: error instanceof Error ? error.message : "Please try again.",
      });
    } finally {
      setIsResending(false);
    }
  }

  return (
    <AuthLayout title="Verify your email" subtitle="Enter the 6-digit code to create your account">
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="hidden" name="email" value={email} />
        <div>
          <Label htmlFor="verify-code">Verification code</Label>
          <Input
            id="verify-code"
            className="mt-1.5 h-12 text-center text-lg font-semibold tracking-[0.35em]"
            inputMode="numeric"
            maxLength={6}
            pattern="[0-9]{6}"
            placeholder="000000"
            value={code}
            onChange={(event) => setCode(event.target.value.replace(/\D/g, "").slice(0, 6))}
            required
          />
        </div>
        <Button type="submit" className="w-full h-11 rounded-full" disabled={isSubmitting}>
          {isSubmitting ? "Verifying..." : "Verify email"}
        </Button>
        <Button
          type="button"
          variant="outline"
          className="w-full h-11 rounded-full"
          disabled={isResending}
          onClick={handleResend}
        >
          {isResending ? "Sending..." : "Resend code"}
        </Button>
        <p className="text-center text-sm text-muted-foreground">
          Already verified?{" "}
          <Link href="/login" className="text-primary font-semibold hover:underline">
            Sign in
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}

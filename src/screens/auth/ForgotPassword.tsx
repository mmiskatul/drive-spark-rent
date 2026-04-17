"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AuthLayout from "@/layouts/AuthLayout";
import { CheckCircle2 } from "lucide-react";

export default function ForgotPassword() {
  const [sent, setSent] = useState(false);
  return (
    <AuthLayout title={sent ? "Check your inbox" : "Forgot password?"} subtitle={sent ? "We sent a reset link to your email." : "We'll send you a reset link."}>
      {!sent ? (
        <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="space-y-4">
          <div><Label>Email</Label><Input className="mt-1.5 h-11" type="email" placeholder="you@example.com" /></div>
          <Button type="submit" className="w-full h-11 rounded-full">Send reset link</Button>
          <p className="text-center text-sm text-muted-foreground">Remembered? <Link href="/login" className="text-primary font-semibold hover:underline">Back to sign in</Link></p>
        </form>
      ) : (
        <div className="rounded-2xl border border-border bg-card p-8 text-center">
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-status-confirmed-bg text-status-confirmed">
            <CheckCircle2 className="h-7 w-7" />
          </div>
          <h3 className="mt-5 font-display font-bold text-lg">Email sent</h3>
          <p className="mt-2 text-sm text-muted-foreground">Click the link in the email to set a new password. The link expires in 30 minutes.</p>
          <Button asChild variant="outline" className="mt-6 rounded-full"><Link href="/login">Back to sign in</Link></Button>
        </div>
      )}
    </AuthLayout>
  );
}

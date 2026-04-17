"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import AuthLayout from "@/layouts/AuthLayout";
import { toast } from "sonner";

export default function Login() {
  const router = useRouter();
  return (
    <AuthLayout title="Welcome back" subtitle="Sign in to your DriveNow account">
      <form onSubmit={(e) => { e.preventDefault(); toast.success("Signed in"); router.push("/customer"); }} className="space-y-4">
        <div><Label>Email</Label><Input className="mt-1.5 h-11" type="email" placeholder="you@example.com" /></div>
        <div>
          <div className="flex justify-between items-center"><Label>Password</Label><Link href="/forgot-password" className="text-xs text-primary hover:underline">Forgot?</Link></div>
          <Input className="mt-1.5 h-11" type="password" placeholder="••••••••" />
        </div>
        <div className="flex items-center gap-2"><Checkbox id="remember" /><label htmlFor="remember" className="text-sm">Remember me for 30 days</label></div>
        <Button type="submit" className="w-full h-11 rounded-full">Sign in</Button>
        <div className="relative my-6"><div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border" /></div><span className="relative bg-background px-3 text-xs text-muted-foreground mx-auto block w-fit">or continue with</span></div>
        <div className="grid grid-cols-2 gap-3">
          <Button variant="outline" type="button" className="h-11 rounded-full">Google</Button>
          <Button variant="outline" type="button" className="h-11 rounded-full">Apple</Button>
        </div>
        <p className="text-center text-sm text-muted-foreground">Don't have an account? <Link href="/register" className="text-primary font-semibold hover:underline">Sign up</Link></p>
      </form>
    </AuthLayout>
  );
}

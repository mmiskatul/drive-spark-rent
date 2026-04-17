"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import AuthLayout from "@/layouts/AuthLayout";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

export default function Register() {
  const router = useRouter();
  return (
    <AuthLayout title="Create your account" subtitle="Join the most premium car rental marketplace">
      <Tabs defaultValue="customer">
        <TabsList className="grid grid-cols-2 mb-6">
          <TabsTrigger value="customer">Customer</TabsTrigger>
          <TabsTrigger value="partner">Rental Partner</TabsTrigger>
        </TabsList>

        <TabsContent value="customer">
          <form onSubmit={(e) => { e.preventDefault(); toast.success("Account created"); router.push("/customer"); }} className="space-y-4">
            <div><Label>Full name</Label><Input className="mt-1.5 h-11" placeholder="Jane Doe" /></div>
            <div className="grid grid-cols-2 gap-3">
              <div><Label>Email</Label><Input className="mt-1.5 h-11" type="email" /></div>
              <div><Label>Phone</Label><Input className="mt-1.5 h-11" type="tel" /></div>
            </div>
            <div><Label>Password</Label><Input className="mt-1.5 h-11" type="password" /></div>
            <div><Label>Confirm password</Label><Input className="mt-1.5 h-11" type="password" /></div>
            <div className="flex items-start gap-2"><Checkbox id="terms" className="mt-0.5" /><label htmlFor="terms" className="text-xs text-muted-foreground">I agree to the <a className="text-primary hover:underline">Terms</a> and <a className="text-primary hover:underline">Privacy Policy</a>.</label></div>
            <Button type="submit" className="w-full h-11 rounded-full">Create customer account</Button>
            <p className="text-center text-sm text-muted-foreground">Already have an account? <Link href="/login" className="text-primary font-semibold hover:underline">Sign in</Link></p>
          </form>
        </TabsContent>

        <TabsContent value="partner">
          <form onSubmit={(e) => { e.preventDefault(); toast.success("Partner application submitted", { description: "Verification typically takes 24–48h." }); router.push("/partner"); }} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div><Label>Owner name</Label><Input className="mt-1.5 h-11" /></div>
              <div><Label>Business name</Label><Input className="mt-1.5 h-11" /></div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div><Label>Email</Label><Input className="mt-1.5 h-11" type="email" /></div>
              <div><Label>Phone</Label><Input className="mt-1.5 h-11" type="tel" /></div>
            </div>
            <div>
              <Label>Business type</Label>
              <Select><SelectTrigger className="mt-1.5 h-11"><SelectValue placeholder="Select type" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="individual">Individual</SelectItem>
                  <SelectItem value="agency">Rental agency</SelectItem>
                  <SelectItem value="dealership">Dealership</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div><Label>Password</Label><Input className="mt-1.5 h-11" type="password" /></div>
              <div><Label>Confirm</Label><Input className="mt-1.5 h-11" type="password" /></div>
            </div>
            <div className="rounded-xl bg-status-pending-bg text-status-pending text-xs p-3 border border-status-pending/20">
              Verification is required before you can list cars. We'll review your account within 24–48 hours.
            </div>
            <div className="flex items-start gap-2"><Checkbox id="ptos" className="mt-0.5" /><label htmlFor="ptos" className="text-xs text-muted-foreground">I agree to the Partner Terms.</label></div>
            <Button type="submit" className="w-full h-11 rounded-full">Apply as partner</Button>
          </form>
        </TabsContent>
      </Tabs>
    </AuthLayout>
  );
}

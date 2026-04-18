import { Suspense } from "react";
import VerifyEmail from "@/screens/auth/VerifyEmail";

export default function Page() {
  return (
    <Suspense fallback={null}>
      <VerifyEmail />
    </Suspense>
  );
}

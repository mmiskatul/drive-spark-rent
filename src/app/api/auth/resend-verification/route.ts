import { NextRequest } from "next/server";
import { proxyBackendRequest } from "@/lib/backend-api";

export async function POST(request: NextRequest) {
  return proxyBackendRequest(request, "/auth/resend-verification", {
    method: "POST",
    body: await request.text(),
  });
}

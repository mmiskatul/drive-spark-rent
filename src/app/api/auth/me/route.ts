import { NextRequest } from "next/server";
import { proxyBackendRequest } from "@/lib/backend-api";

export async function GET(request: NextRequest) {
  return proxyBackendRequest(request, "/auth/me");
}

export async function PATCH(request: NextRequest) {
  return proxyBackendRequest(request, "/auth/me", {
    method: "PATCH",
    body: await request.text(),
  });
}

import { NextRequest } from "next/server";
import { proxyBackendRequest } from "@/lib/backend-api";

export async function GET(request: NextRequest) {
  return proxyBackendRequest(request, `/cars${request.nextUrl.search}`);
}

export async function POST(request: NextRequest) {
  return proxyBackendRequest(request, "/cars", {
    method: "POST",
    body: await request.text(),
  });
}

import { NextRequest } from "next/server";
import { proxyBackendRequest } from "@/lib/backend-api";

export async function GET(request: NextRequest) {
  return proxyBackendRequest(request, `/cars/mine${request.nextUrl.search}`);
}

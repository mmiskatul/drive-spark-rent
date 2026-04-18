import { NextRequest } from "next/server";
import { proxyBackendRequest } from "@/lib/backend-api";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  return proxyBackendRequest(request, `/cars/${id}/images`, {
    method: "POST",
    body: await request.arrayBuffer(),
  });
}

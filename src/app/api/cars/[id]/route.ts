import { NextRequest } from "next/server";
import { proxyBackendRequest } from "@/lib/backend-api";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  return proxyBackendRequest(request, `/cars/${id}`, {
    method: "PATCH",
    body: await request.text(),
  });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  return proxyBackendRequest(request, `/cars/${id}`, {
    method: "DELETE",
  });
}

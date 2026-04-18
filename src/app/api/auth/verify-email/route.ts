import { NextRequest, NextResponse } from "next/server";
import { copySetCookieHeaders, getBackendUrl, proxyBackendRequest } from "@/lib/backend-api";

const roleRedirects = {
  customer: "/customer",
  partner: "/partner",
  admin: "/admin",
};

type BackendVerifyResponse = {
  user?: {
    role?: keyof typeof roleRedirects;
  };
  detail?: string;
};

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("token");

  if (!token) {
    return NextResponse.json({ message: "Verification token is required." }, { status: 400 });
  }

  const backendUrl = getBackendUrl("/auth/verify-email");
  backendUrl.searchParams.set("token", token);
  const backendResponse = await fetch(backendUrl, {
    headers: { cookie: request.headers.get("cookie") ?? "" },
    cache: "no-store",
  });
  const data = (await backendResponse.json()) as BackendVerifyResponse;

  if (!backendResponse.ok) {
    return NextResponse.json(
      { message: data.detail ?? "Verification link is invalid or expired." },
      { status: backendResponse.status },
    );
  }

  const redirectTo = data.user?.role ? roleRedirects[data.user.role] : "/customer";
  const response = request.headers.get("accept")?.includes("application/json")
    ? NextResponse.json({ ...data, redirectTo })
    : NextResponse.redirect(new URL(redirectTo, request.url));
  copySetCookieHeaders(backendResponse, response);

  return response;
}

export async function POST(request: NextRequest) {
  return proxyBackendRequest(request, "/auth/verify-email", {
    method: "POST",
    body: await request.text(),
  });
}

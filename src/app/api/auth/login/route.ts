import { NextRequest, NextResponse } from "next/server";
import { copySetCookieHeaders, getBackendUrl } from "@/lib/backend-api";

const roleRedirects = {
  customer: "/customer",
  partner: "/partner",
  admin: "/admin",
};

type BackendLoginResponse = {
  user?: {
    role?: keyof typeof roleRedirects;
  };
  detail?: string;
};

export async function POST(request: NextRequest) {
  const backendResponse = await fetch(getBackendUrl("/auth/login"), {
    method: "POST",
    headers: {
      "content-type": request.headers.get("content-type") ?? "application/json",
      cookie: request.headers.get("cookie") ?? "",
    },
    body: await request.text(),
    cache: "no-store",
  });
  const data = (await backendResponse.json()) as BackendLoginResponse;
  const response = NextResponse.json(
    backendResponse.ok
      ? {
          ...data,
          redirectTo: data.user?.role ? roleRedirects[data.user.role] : "/customer",
        }
      : {
          message: data.detail ?? "Unable to sign in. Please try again.",
        },
    { status: backendResponse.status },
  );
  copySetCookieHeaders(backendResponse, response);

  return response;
}

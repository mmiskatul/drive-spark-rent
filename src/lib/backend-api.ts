import { NextRequest, NextResponse } from "next/server";

const API_PREFIX = "/api/v1";

export function getBackendUrl(path: string) {
  const baseUrl = process.env.BACKEND_URL ?? "http://localhost:8000";
  return new URL(`${API_PREFIX}${path}`, baseUrl);
}

export function copySetCookieHeaders(source: Response, target: NextResponse) {
  const setCookie = source.headers.get("set-cookie");

  if (setCookie) {
    target.headers.set("set-cookie", setCookie);
  }
}

export async function proxyBackendRequest(
  request: NextRequest,
  path: string,
  init: RequestInit = {},
) {
  const response = await fetch(getBackendUrl(path), {
    ...init,
    headers: {
      "content-type": request.headers.get("content-type") ?? "application/json",
      cookie: request.headers.get("cookie") ?? "",
      ...(init.headers ?? {}),
    },
    cache: "no-store",
  });
  const body = await response.text();
  const nextResponse = new NextResponse(body, {
    status: response.status,
    headers: {
      "content-type": response.headers.get("content-type") ?? "application/json",
    },
  });
  copySetCookieHeaders(response, nextResponse);

  return nextResponse;
}

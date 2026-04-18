import { NextRequest, NextResponse } from "next/server";

const API_PREFIX = "/api/v1";
const ACCESS_TOKEN_COOKIE_NAME = "drive_spark_access";

export function getBackendUrl(path: string) {
  const baseUrl = process.env.BACKEND_URL ?? "http://localhost:8000";
  return new URL(`${API_PREFIX}${path}`, baseUrl);
}

export function copySetCookieHeaders(source: Response, target: NextResponse) {
  const setCookie = source.headers.get("set-cookie");

  if (setCookie) {
    target.headers.append("set-cookie", setCookie);
  }
}

function getCookieValueFromSetCookie(setCookie: string | null, cookieName: string) {
  if (!setCookie) {
    return null;
  }

  const match = setCookie.match(new RegExp(`(?:^|,\\s*)${cookieName}=([^;]+)`));
  return match?.[1] ?? null;
}

function mergeCookieHeader(cookieHeader: string, name: string, value: string) {
  const cookies = cookieHeader
    .split(";")
    .map((cookie) => cookie.trim())
    .filter(Boolean)
    .filter((cookie) => !cookie.startsWith(`${name}=`));

  cookies.push(`${name}=${value}`);
  return cookies.join("; ");
}

async function refreshAccessCookie(cookieHeader: string) {
  return fetch(getBackendUrl("/auth/refresh"), {
    method: "POST",
    headers: {
      cookie: cookieHeader,
    },
    cache: "no-store",
  });
}

export async function proxyBackendRequest(
  request: NextRequest,
  path: string,
  init: RequestInit = {},
) {
  const cookieHeader = request.headers.get("cookie") ?? "";
  const headers = {
      "content-type": request.headers.get("content-type") ?? "application/json",
      cookie: cookieHeader,
      ...(init.headers ?? {}),
  };
  let response = await fetch(getBackendUrl(path), {
    ...init,
    headers,
    cache: "no-store",
  });

  let refreshResponse: Response | null = null;

  if (response.status === 401 && !path.startsWith("/auth/")) {
    refreshResponse = await refreshAccessCookie(cookieHeader);

    if (refreshResponse.ok) {
      const refreshedAccessToken = getCookieValueFromSetCookie(
        refreshResponse.headers.get("set-cookie"),
        ACCESS_TOKEN_COOKIE_NAME,
      );
      const refreshedCookieHeader = refreshedAccessToken
        ? mergeCookieHeader(cookieHeader, ACCESS_TOKEN_COOKIE_NAME, refreshedAccessToken)
        : cookieHeader;

      response = await fetch(getBackendUrl(path), {
        ...init,
        headers: {
          ...headers,
          cookie: refreshedCookieHeader,
        },
        cache: "no-store",
      });
    }
  }

  const body = await response.text();
  const nextResponse = new NextResponse(body, {
    status: response.status,
    headers: {
      "content-type": response.headers.get("content-type") ?? "application/json",
    },
  });
  if (refreshResponse?.ok) {
    copySetCookieHeaders(refreshResponse, nextResponse);
  }
  copySetCookieHeaders(response, nextResponse);

  return nextResponse;
}

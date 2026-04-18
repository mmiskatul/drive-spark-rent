import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getBackendUrl } from "@/lib/backend-api";

export type RouteRole = "customer" | "partner" | "admin";

type SessionResponse = {
  user?: {
    role?: RouteRole;
  };
};

const dashboardByRole: Record<RouteRole, string> = {
  customer: "/customer",
  partner: "/partner",
  admin: "/admin",
};

async function getCurrentRole() {
  try {
    const cookieStore = await cookies();
    const response = await fetch(getBackendUrl("/auth/refresh"), {
      method: "POST",
      headers: {
        cookie: cookieStore.toString(),
      },
      cache: "no-store",
    });

    if (!response.ok) {
      return null;
    }

    const session = (await response.json()) as SessionResponse;
    return session.user?.role ?? null;
  } catch {
    return null;
  }
}

export async function requireRole(allowedRole: RouteRole) {
  const role = await getCurrentRole();

  if (!role) {
    redirect("/login");
  }

  if (role !== allowedRole) {
    redirect(dashboardByRole[role]);
  }
}

export type ProfileUser = {
  id: string;
  name: string;
  email: string;
  role: "customer" | "partner" | "admin";
  phone?: string | null;
  address?: string | null;
  business_type?: string | null;
  businessType?: string | null;
  email_verified_at?: string | null;
};

export function getInitials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);

  if (parts.length === 0) {
    return "U";
  }

  return parts.map((part) => part[0]).slice(0, 2).join("").toUpperCase();
}

export function roleLabel(role: ProfileUser["role"]) {
  if (role === "partner") {
    return "Rental Partner";
  }

  return role[0].toUpperCase() + role.slice(1);
}

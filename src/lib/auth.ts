import bcrypt from "bcryptjs";
import { createHash, createHmac, randomBytes, timingSafeEqual } from "crypto";
import { type NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export type AuthRole = "customer" | "partner" | "admin";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: AuthRole;
  emailVerifiedAt: Date | null;
}

type TokenPurpose = "access" | "refresh";

export const ACCESS_TOKEN_COOKIE_NAME = "drive_now_access";
export const REFRESH_TOKEN_COOKIE_NAME = "drive_now_refresh";
export const ACCESS_TOKEN_MAX_AGE_SECONDS = 60 * 15;
export const REFRESH_TOKEN_MAX_AGE_SECONDS = 60 * 60 * 24 * 30;
export const EMAIL_VERIFICATION_MAX_AGE_SECONDS = Number(
  process.env.EMAIL_VERIFICATION_EXPIRES_SECONDS ?? 60 * 60 * 24,
);

function getAuthSecret() {
  return process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET ?? process.env.JWT_SECRET;
}

function requireAuthSecret() {
  const secret = getAuthSecret();

  if (!secret) {
    throw new Error("AUTH_SECRET is required for authentication.");
  }

  return secret;
}

function signPayload(payload: string) {
  return createHmac("sha256", requireAuthSecret()).update(payload).digest("base64url");
}

function verifySignature(payload: string, signature: string) {
  const expected = signPayload(payload);
  const expectedBuffer = Buffer.from(expected);
  const receivedBuffer = Buffer.from(signature);

  return (
    expectedBuffer.length === receivedBuffer.length &&
    timingSafeEqual(expectedBuffer, receivedBuffer)
  );
}

function createSignedToken(
  user: Pick<AuthUser, "id" | "role">,
  purpose: TokenPurpose,
  maxAgeSeconds: number,
) {
  const payload = Buffer.from(
    JSON.stringify({
      sub: user.id,
      role: user.role,
      purpose,
      exp: Math.floor(Date.now() / 1000) + maxAgeSeconds,
    }),
  ).toString("base64url");
  const signature = signPayload(payload);

  return `${payload}.${signature}`;
}

function hashOpaqueToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

function safeUser(user: {
  id: string;
  name: string;
  email: string;
  role: AuthRole;
  emailVerifiedAt: Date | null;
}): AuthUser {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    emailVerifiedAt: user.emailVerifiedAt,
  };
}

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 12);
}

export async function authenticateUser(email: string, password: string): Promise<AuthUser | null> {
  const normalizedEmail = email.trim().toLowerCase();
  const user = await prisma.user.findUnique({
    where: { email: normalizedEmail },
    select: {
      id: true,
      name: true,
      email: true,
      passwordHash: true,
      role: true,
      emailVerifiedAt: true,
    },
  });

  if (!user) {
    return null;
  }

  const passwordMatches = await bcrypt.compare(password, user.passwordHash);

  if (!passwordMatches) {
    return null;
  }

  return safeUser(user);
}

export function createAccessToken(user: Pick<AuthUser, "id" | "role">) {
  return createSignedToken(user, "access", ACCESS_TOKEN_MAX_AGE_SECONDS);
}

export async function createRefreshToken(user: Pick<AuthUser, "id" | "role">) {
  const token = randomBytes(48).toString("base64url");
  const tokenHash = hashOpaqueToken(token);
  const expiresAt = new Date(Date.now() + REFRESH_TOKEN_MAX_AGE_SECONDS * 1000);

  await prisma.refreshToken.create({
    data: {
      tokenHash,
      userId: user.id,
      expiresAt,
    },
  });

  return token;
}

export async function createEmailVerificationToken(userId: string) {
  const token = randomBytes(48).toString("base64url");
  const tokenHash = hashOpaqueToken(token);

  await prisma.emailVerificationToken.create({
    data: {
      tokenHash,
      userId,
      expiresAt: new Date(Date.now() + EMAIL_VERIFICATION_MAX_AGE_SECONDS * 1000),
    },
  });

  return token;
}

export async function getUserFromAccessToken(token: string | undefined): Promise<AuthUser | null> {
  if (!token) {
    return null;
  }

  try {
    const [payload, signature] = token.split(".");

    if (!payload || !signature || !verifySignature(payload, signature)) {
      return null;
    }

    const session = JSON.parse(Buffer.from(payload, "base64url").toString("utf8")) as {
      sub?: string;
      role?: AuthRole;
      purpose?: TokenPurpose;
      exp?: number;
    };

    if (
      !session.sub ||
      session.purpose !== "access" ||
      !session.exp ||
      session.exp < Math.floor(Date.now() / 1000)
    ) {
      return null;
    }

    const user = await prisma.user.findUnique({
      where: { id: session.sub },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        emailVerifiedAt: true,
      },
    });

    if (!user || user.role !== session.role || !user.emailVerifiedAt) {
      return null;
    }

    return safeUser(user);
  } catch {
    return null;
  }
}

export async function verifyEmailToken(token: string) {
  const tokenHash = hashOpaqueToken(token);
  const verificationToken = await prisma.emailVerificationToken.findUnique({
    where: { tokenHash },
    include: { user: true },
  });

  if (
    !verificationToken ||
    verificationToken.usedAt ||
    verificationToken.expiresAt < new Date()
  ) {
    return null;
  }

  await prisma.emailVerificationToken.update({
    where: { id: verificationToken.id },
    data: { usedAt: new Date() },
  });

  const user = await prisma.user.update({
    where: { id: verificationToken.userId },
    data: { emailVerifiedAt: verificationToken.user.emailVerifiedAt ?? new Date() },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      emailVerifiedAt: true,
    },
  });

  return safeUser(user);
}

export async function refreshAccessFromRefreshToken(refreshToken: string | undefined) {
  if (!refreshToken) {
    return null;
  }

  const tokenHash = hashOpaqueToken(refreshToken);
  const storedToken = await prisma.refreshToken.findUnique({
    where: { tokenHash },
    include: { user: true },
  });

  if (
    !storedToken ||
    storedToken.revokedAt ||
    storedToken.expiresAt < new Date() ||
    !storedToken.user.emailVerifiedAt
  ) {
    return null;
  }

  const user = safeUser(storedToken.user);

  return {
    user,
    accessToken: createAccessToken(user),
  };
}

export async function revokeRefreshToken(refreshToken: string | undefined) {
  if (!refreshToken) {
    return;
  }

  await prisma.refreshToken.updateMany({
    where: {
      tokenHash: hashOpaqueToken(refreshToken),
      revokedAt: null,
    },
    data: { revokedAt: new Date() },
  });
}

export async function issueAuthCookies(response: NextResponse, user: AuthUser) {
  const accessToken = createAccessToken(user);
  const refreshToken = await createRefreshToken(user);

  response.cookies.set(ACCESS_TOKEN_COOKIE_NAME, accessToken, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: ACCESS_TOKEN_MAX_AGE_SECONDS,
  });
  response.cookies.set(REFRESH_TOKEN_COOKIE_NAME, refreshToken, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: REFRESH_TOKEN_MAX_AGE_SECONDS,
  });
}

export function setAccessCookie(response: NextResponse, accessToken: string) {
  response.cookies.set(ACCESS_TOKEN_COOKIE_NAME, accessToken, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: ACCESS_TOKEN_MAX_AGE_SECONDS,
  });
}

export function clearAuthCookies(response: NextResponse) {
  for (const cookieName of [ACCESS_TOKEN_COOKIE_NAME, REFRESH_TOKEN_COOKIE_NAME]) {
    response.cookies.set(cookieName, "", {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 0,
    });
  }
}

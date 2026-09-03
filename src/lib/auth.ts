import { SignJWT, jwtVerify } from "jose";

const SESSION_COOKIE = "admin_session";
const secret = () => new TextEncoder().encode(process.env.JWT_SECRET);

export async function createSessionToken(email: string) {
  return new SignJWT({ email })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret());
}

export async function verifySessionToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, secret());
    return payload as { email: string };
  } catch {
    return null;
  }
}

export const SESSION_COOKIE_NAME = SESSION_COOKIE;

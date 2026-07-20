import { NextResponse } from "next/server";
import { z } from "zod";

const sessionSchema = z.object({
  token: z.string().min(20).max(4_096),
  user: z.record(z.unknown()),
});

const cookieOptions = {
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/",
  maxAge: 60 * 60 * 24 * 6,
};

export async function POST(request: Request) {
  const parsed = sessionSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid session payload" }, { status: 400 });
  }

  const serializedUser = JSON.stringify(parsed.data.user);
  if (serializedUser.length > 3_000) {
    return NextResponse.json({ error: "Session profile is too large" }, { status: 400 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set("token", parsed.data.token, cookieOptions);
  response.cookies.set("s_user", serializedUser, cookieOptions);
  response.headers.set("Cache-Control", "no-store");
  return response;
}

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  if (!request.nextUrl.pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  const current = request.cookies.get("admin_session")?.value;
  if (current === process.env.ADMIN_SECRET) {
    return NextResponse.next();
  }

  const keyFromUrl = request.nextUrl.searchParams.get("adminKey");
  if (keyFromUrl === process.env.ADMIN_SECRET) {
    const response = NextResponse.next();
    response.cookies.set("admin_session", process.env.ADMIN_SECRET, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
    });
    return response;
  }

  return new NextResponse("Unauthorized. Append ?adminKey=YOUR_SECRET once.", {
    status: 401,
  });
}

export const config = {
  matcher: ["/admin/:path*"],
};

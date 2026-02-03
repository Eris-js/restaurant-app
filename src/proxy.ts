import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function proxy(req: NextRequest) {
    const session = await auth();

    const { pathname } = req.nextUrl;

    // Chưa login → chặn admin
    if (!session && pathname.startsWith("/admin")) {
        return NextResponse.redirect(
            new URL(`/login?callbackUrl=${encodeURIComponent(pathname)}`, req.url)
        );
    }

    // Có session nhưng không phải admin
    if (session && pathname.startsWith("/admin") && (session.user as any)?.role !== "admin") {
        return NextResponse.redirect(new URL("/403", req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/admin/:path*"],
};

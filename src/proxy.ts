import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const publicPaths = ['/login', '/api/auth'];

export async function proxy(req: NextRequest) {
    const token = await getToken({
        req,
        secret: process.env.NEXTAUTH_SECRET,
    });

    const { pathname } = req.nextUrl;

    // Chưa login → chặn admin
    if (!token && pathname.startsWith("/admin")) {
        return NextResponse.redirect(
            new URL(`/login?callbackUrl=${encodeURIComponent(pathname)}`, req.url)
        );
    }

    // Có token nhưng không phải admin
    if (token && pathname.startsWith("/admin") && token.role !== "admin") {
        return NextResponse.redirect(new URL("/403", req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/admin/:path*"],
};

import type { NextAuthConfig } from "next-auth";

export const authConfig = {
    pages: {
        signIn: "/login",
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const isOnAdmin = nextUrl.pathname.startsWith("/admin");
            const isOnLogin = nextUrl.pathname === "/login";

            if (isOnAdmin) {
                if (!isLoggedIn) return false; // Redirect to login

                // Check admin role in middleware
                const userRole = (auth.user as any)?.role;
                if (userRole !== "admin") {
                    return Response.redirect(new URL("/403", nextUrl));
                }
                return true;
            } else if (isLoggedIn && isOnLogin) {
                // If logged in and on login page, move to admin
                return Response.redirect(new URL("/admin", nextUrl));
            }

            return true;
        },
        async jwt({ token, user }) {
            if (user) {
                token.role = (user as any).role;
                token.id = user.id;
            }
            return token;
        },
        async session({ session, token }) {
            if (token && session.user) {
                (session.user as any).role = token.role as string;
                (session.user as any).id = token.id as string;
            }
            return session;
        }
    },
    providers: [], // Providers added in auth.ts
} satisfies NextAuthConfig;

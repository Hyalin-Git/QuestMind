import { NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { i18nRouter } from "next-i18n-router";
import { i18nConfig } from "../i18nConfig";
import { cookies } from "next/headers";

export async function middleware(req) {
	// Check if it's an API route

	if (req.nextUrl.pathname.includes(`/dashboard`)) {
		const cookie = await cookies();
		if (!cookie.get("session")) {
			return NextResponse.redirect(new URL("/", req.url));
		}
	}

	if (req.nextUrl.pathname.startsWith("/api")) {
		// JWT Auth middleware for API routes
		try {
			const token = req?.headers?.get("authorization")?.split(" ")[1];
			if (!token) {
				return NextResponse.json(
					{ error: true, message: "Access denied : No token received" },
					{ status: 403 }
				);
			}
			const secret = new TextEncoder().encode(process.env.JWT_SECRET);
			const { payload } = await jwtVerify(token, secret);
			if (payload.role === "user") {
				return NextResponse.json(
					{
						error: true,
						message: "Access denied : User must be an Admin",
					},
					{ status: 403 }
				);
			}
			return NextResponse.next();
		} catch (err) {
			if (err.code === "ERR_JWT_EXPIRED") {
				return NextResponse.json(
					{
						error: true,
						message: "Access denied : Token expired",
					},
					{ status: 403 }
				);
			}
			return NextResponse.json(
				{
					error: true,
					message: err.message || "An unexpected error occurred",
				},
				{ status: 500 }
			);
		}
	}

	// i18n middleware for non-API routes
	return i18nRouter(req, i18nConfig);
}

export const config = {
	matcher: [
		// i18n matcher for pages
		"/((?!_next|api|static|.*\\..*|favicon.ico).*)",

		// API routes that need JWT auth
		"/api/auth/sign-up",
		"/api/auth/refresh-token",
		"/api/auth/update-email",
		"/api/auth/logout",
		"/api/users/:path*",
		"/api/games/post",
		"/api/games/put",
		"/api/games/delete",
		"/api/teams/:path*",
		"/api/nationalities/post",
		"/api/nationalities/put",
		"/api/nationalities/delete",
		"/api/sponsors/post",
		"/api/sponsors/put",
		"/api/sponsors/delete",
		"/api/players/post",
		"/api/players/put",
		"/api/players/delete",
		"/api/players/games/:path*",
		"/api/players/nationalities/:path*",
		"/api/players/teams/:path*",
		"/api/players/trending/post",
		"/api/players/trending/put",
		"/api/players/trending/delete",
	],
};

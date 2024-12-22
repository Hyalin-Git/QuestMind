import { NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { i18nRouter } from "next-i18n-router";
import { i18nConfig } from "../i18nConfig";

// This function can be marked `async` if using `await` inside
export async function middleware(req) {
	return i18nRouter(req, i18nConfig);
	// Middlewares for API
	// try {
	// 	const token = req?.headers?.get("authorization")?.split(" ")[1];
	// 	if (!token) {
	// 		return NextResponse.json(
	// 			{ error: true, message: "Access denied : No token received" },
	// 			{ status: 403 }
	// 		);
	// 	}
	// 	const secret = new TextEncoder().encode(process.env.JWT_SECRET);
	// 	const { payload } = await jwtVerify(token, secret);
	// 	if (payload.role === "user") {
	// 		return NextResponse.json(
	// 			{
	// 				error: true,
	// 				message: "Access denied : User must be an Admin",
	// 			},
	// 			{ status: 403 }
	// 		);
	// 	}
	// 	return NextResponse.next();
	// } catch (err) {
	// 	if (err.code === "ERR_JWT_EXPIRED") {
	// 		return NextResponse.json(
	// 			{
	// 				error: true,
	// 				message: "Access denied : Token expired",
	// 			},
	// 			{ status: 403 }
	// 		);
	// 	}
	// 	return NextResponse.json(
	// 		{
	// 			error: true,
	// 			message: err.message || "An unexpected error occurred",
	// 		},
	// 		{ status: 500 }
	// 	);
	// }
}

// See "Matching Paths" below to learn more
export const config = {
	// Auth routes
	matcher: [
		"/((?!api|static|.*\\..*|_next).*)",
		// Auth routes
		// "/api/auth/sign-up",
		// "/api/auth/refresh-token",
		// "/api/auth/update-email",
		// "/api/auth/logout",
		// // Users routes
		// "/api/users/:path*",
		// // Games routes
		// "/api/games/post",
		// "/api/games/put",
		// "/api/games/delete",
		// // Teams routes
		// "/api/teams/:path*",
		// // Nationalities routes
		// "/api/nationalities/post",
		// "/api/nationalities/put",
		// "/api/nationalities/delete",
		// // Sponsors routes
		// "/api/sponsors/post",
		// "/api/sponsors/put",
		// "/api/sponsors/delete",
		// // players routes
		// "/api/players/post",
		// "/api/players/put",
		// "/api/players/delete",
		// "/api/players/games/:path*",
		// "/api/players/nationalities/:path*",
		// "/api/players/teams/:path*",
		// "/api/players/trending/post",
		// "/api/players/trending/put",
		// "/api/players/trending/delete",
	],
};

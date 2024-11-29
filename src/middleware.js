import { NextResponse } from "next/server";
import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

// This function can be marked `async` if using `await` inside
export async function middleware(req) {
	// Middlewares for API
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

		if (payload.isAdmin === 0) {
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

// See "Matching Paths" below to learn more
export const config = {
	matcher: "/api/auth/sign-up",
};

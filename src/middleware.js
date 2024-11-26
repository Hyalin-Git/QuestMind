import { NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export async function middleware(req) {
    
}

// See "Matching Paths" below to learn more
export const config = {
	matcher: "/api/auth/sign-up",
};

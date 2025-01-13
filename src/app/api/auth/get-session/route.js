import { jwtVerify } from "jose";
import { NextResponse } from "next/server";

export async function GET(req) {
	try {
		const token = req?.headers?.get("authorization")?.split(" ")[1];

		const secret = new TextEncoder().encode(process.env.JWT_SECRET);
		const { payload } = await jwtVerify(token, secret);

		return NextResponse.json(
			{
				success: true,
				data: payload,
			},
			{ status: 200 }
		);
	} catch (err) {
		return NextResponse.json(
			{
				success: false,
				message: err.message || "An unexpected error occurred",
			},
			{ status: 500 }
		);
	}
}

import { jwtVerify } from "jose";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import pool from "../../config/db";

export async function POST(req) {
	try {
		const { token } = await req.json();

		if (!token) {
			return NextResponse.json(
				{ success: false, message: "Access denied : No token received" },
				{ status: 403 }
			);
		}

		const connection = await pool.getConnection();

		// Delete every expired refresh token
		await connection.execute(
			"DELETE FROM `refresh_tokens` WHERE `expires_at` < Now()"
		);

		// Fetch the specified refresh token
		const [refreshToken] = await connection.execute(
			"SELECT * FROM `refresh_tokens` WHERE `refresh_tokens`.`token` = ?",
			[token]
		);

		if (refreshToken.length <= 0) {
			return NextResponse.json(
				{ success: false, message: "No token found with the specified ID" },
				{ status: 404 }
			);
		}

		const secret = new TextEncoder().encode(process.env.JWT_REFRESH_SECRET);
		const { payload } = await jwtVerify(token, secret); // Check refresh token validation

		const newAccessToken = jwt.sign(
			{
				userId: payload.userId,
				role: payload.role,
			},
			process.env.JWT_SECRET,
			{ expiresIn: "30m" }
		);

		const newRefreshToken = jwt.sign(
			{
				userId: payload.userId,
				role: payload.role,
			},
			process.env.JWT_REFRESH_SECRET,
			{ expiresIn: "14d" }
		);

		await connection.execute(
			"UPDATE `refresh_tokens` SET `token` = ?, `updated_at` = NOW(), `expires_at` = NOW() + INTERVAL 14 DAY WHERE `refresh_tokens`.`token` = ?",
			[newRefreshToken, token]
		);

		connection.release();

		return NextResponse.json(
			{
				success: true,
				payload: payload,
				newAccessToken: newAccessToken,
				newRefreshToken: newRefreshToken,
			},
			{
				status: 200,
			}
		);
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
				success: false,
				message: err.message || "An unexpected error occurred",
			},
			{
				status: 500,
			}
		);
	}
}

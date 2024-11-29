import pool from "../../config/db";
import { NextResponse } from "next/server";

export async function POST(req) {
	try {
		const { refreshToken } = await req.json();

		if (!refreshToken) {
			return NextResponse.json(
				{ success: false, message: "No refresh token provided" },
				{ status: 400 }
			);
		}

		const connection = await pool.getConnection();

		// Supprimer le refresh token de la base de données
		const [result] = await connection.execute(
			"DELETE FROM refresh_tokens WHERE token = ?",
			[refreshToken]
		);

		if (result.affectedRows === 0) {
			return NextResponse.json(
				{ success: false, message: "Token not found or already invalidated" },
				{ status: 404 }
			);
		}

		connection.release();

		return NextResponse.json(
			{ success: true, message: "User successfully logged out" },
			{ status: 200 }
		);
	} catch (err) {
		return NextResponse.json(
			{
				success: false,
				message: err.message || "An error occurred during logout",
			},
			{ status: 500 }
		);
	}
}

import { NextResponse } from "next/server";
import pool from "../../config/db";

export async function GET() {
	try {
		const connection = await pool.getConnection();

		const [users] = await connection.query(
			"SELECT `id`, `email`, `role`, `created_at`, `updated_at` FROM `users`"
		);

		if (users.length <= 0) {
			return NextResponse.json(
				{
					success: false,
					message: "No users found in the database",
				},
				{ status: 404 }
			);
		}

		connection.release();

		return NextResponse.json(
			{
				success: true,
				data: users,
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

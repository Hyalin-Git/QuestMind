import { NextResponse } from "next/server";
import pool from "../../config/db";

export async function GET() {
	try {
		const connection = await pool.getConnection();

		const [games] = await connection.query("SELECT * FROM `games`");

		if (games.length <= 0) {
			return NextResponse.json(
				{
					success: false,
					data: "No games found in the database",
				},
				{ status: 404 }
			);
		}

		connection.release();

		return NextResponse.json(
			{
				success: true,
				data: games,
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

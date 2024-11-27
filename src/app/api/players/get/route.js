import { NextResponse } from "next/server";
import pool from "../../config/db";

export async function GET() {
	try {
		const connection = await pool.getConnection();

		const [players] = await connection.query("SELECT * FROM `players`");

		if (players.length <= 0) {
			return NextResponse.json(
				{
					success: false,
					message: "No players found in the Database",
				},
				{ status: 404 }
			);
		}

		return NextResponse.json(
			{
				success: true,
				data: players,
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

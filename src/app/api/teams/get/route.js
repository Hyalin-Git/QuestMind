import pool from "@/app/api/config/db";
import { NextResponse } from "next/server";

export async function GET() {
	try {
		const connection = await pool.getConnection();

		const [teams] = await connection.query("SELECT * FROM `teams`");

		if (teams.length <= 0) {
			return NextResponse.json(
				{
					success: false,
					message: "No teams found in the Database",
				},
				{ status: 404 }
			);
		}

		connection.release();

		return NextResponse.json(
			{
				success: true,
				data: teams,
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

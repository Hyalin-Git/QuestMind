import pool from "@/app/api/config/db";
import { NextResponse } from "next/server";

export async function DELETE(req, { params }) {
	try {
		const { id } = await params;

		const connection = await pool.getConnection();

		const [result] = await connection.execute(
			"DELETE FROM `players_trending` WHERE `players_trending`.`id` = ?",
			[id]
		);

		if (result.affectedRows <= 0) {
			return NextResponse.json(
				{
					success: false,
					message: "An error occurred while removing a player from trending",
				},
				{ status: 500 }
			);
		}

		connection.release();

		return NextResponse.json(
			{
				success: true,
				message: "Player successfully removed from trending",
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

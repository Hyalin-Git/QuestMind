import pool from "@/app/api/config/db";
import { NextResponse } from "next/server";

export async function PUT(req, { params }) {
	try {
		const { id } = await params;
		const { playerId } = await req.json();

		if (!playerId) {
			return NextResponse.json(
				{
					success: false,
					message: "Invalid request",
				},
				{ status: 400 }
			);
		}

		const connection = await pool.getConnection();

		const [player] = await connection.execute(
			"SELECT * FROM `players` WHERE `players`.`id` = ?",
			[playerId]
		);

		if (player.length <= 0) {
			return NextResponse.json(
				{
					success: false,
					message: "No player found with the specified ID",
				},
				{ status: 404 }
			);
		}

		const [result] = await connection.execute(
			"UPDATE `players_trending` SET `player_id` = ? WHERE `players_trending`.`id` = ?",
			[playerId, id]
		);

		if (result.affectedRows <= 0) {
			return NextResponse.json(
				{
					success: false,
					message: "Impossible to update a non-existant player trending",
				},
				{ status: 404 }
			);
		}

		connection.release();

		return NextResponse.json(
			{
				success: true,
				message: "Players trending successfully updated",
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

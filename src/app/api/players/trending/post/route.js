import pool from "@/app/api/config/db";
import { NextResponse } from "next/server";

export async function POST(req) {
	try {
		const { playerId, position } = await req.json();

		if (!playerId || position === null || position > 6) {
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
			"INSERT INTO `players_trending` (`player_id`, `position`) VALUES (?, ?)",
			[playerId, position]
		);

		if (result.affectedRows <= 0) {
			return NextResponse.json(
				{
					success: false,
					message: "An error occurred while adding a player to the trending",
				},
				{ status: 500 }
			);
		}

		connection.release();

		return NextResponse.json(
			{
				success: true,
				message: "Player successfully added to trending",
			},
			{ status: 201 }
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

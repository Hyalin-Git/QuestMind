import pool from "@/app/api/config/db";
import { NextResponse } from "next/server";

export async function POST(req) {
	try {
		const { playerId, gameId } = await req.json();

		if (!playerId || !gameId) {
			return NextResponse.json(
				{
					success: false,
					message: "Invalid request",
				},
				{ status: 400 }
			);
		}

		const connection = await pool.getConnection();

		const [result] = await connection.execute(
			`INSERT INTO players_games (player_id, game_id)
            SELECT ?, ?
            FROM players, games
            WHERE players.id = ? AND games.id = ?`,
			[playerId, gameId, playerId, gameId]
		);

		if (result.affectedRows <= 0) {
			return NextResponse.json(
				{
					success: false,
					message:
						"Failed to associate the player with the game. Please verify the IDs and try again.",
				},
				{ status: 500 }
			);
		}

		connection.release();

		return NextResponse.json(
			{
				success: true,
				message: "Player's game successfully created",
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

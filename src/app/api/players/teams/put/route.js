import pool from "@/app/api/config/db";
import { NextResponse } from "next/server";

export async function PUT(req) {
	try {
		const { playerId, teamId } = await req.json();

		if (!playerId || !teamId) {
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
			`UPDATE players_teams
             SET team_id = ?
             WHERE player_id = ? 
               AND EXISTS (SELECT 1 FROM players WHERE id = ?)
               AND EXISTS (SELECT 1 FROM teams WHERE id = ?);`,
			[teamId, playerId, playerId, teamId]
		);

		// Vérifier si une ligne a été mise à jour
		if (result.affectedRows <= 0) {
			return NextResponse.json(
				{
					success: false,
					message:
						"Failed to update the player's team. Please verify the IDs and try again.",
				},
				{ status: 400 }
			);
		}
		connection.release();

		return NextResponse.json(
			{
				success: true,
				message: "Player's team successfully updated",
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

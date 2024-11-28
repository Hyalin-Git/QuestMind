import pool from "@/app/api/config/db";
import { NextResponse } from "next/server";

export async function POST(req) {
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
			`INSERT INTO players_teams (player_id, team_id)
            SELECT ?, ?
            FROM players, teams
            WHERE players.id = ? AND teams.id = ?`,
			[playerId, teamId, playerId, teamId]
		);

		if (result.affectedRows <= 0) {
			return NextResponse.json(
				{
					success: false,
					message:
						"Failed to associate the player with a team. Please verify the IDs and try again.",
				},
				{ status: 500 }
			);
		}

		connection.release();

		return NextResponse.json(
			{
				success: true,
				message: "Player's team successfully created",
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

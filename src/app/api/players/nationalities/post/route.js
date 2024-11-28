import pool from "@/app/api/config/db";
import { NextResponse } from "next/server";

export async function POST(req) {
	try {
		const { playerId, nationalityId } = await req.json();

		if (!playerId || !nationalityId) {
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
			`INSERT INTO players_nationalities (player_id, nationality_id)
            SELECT ?, ?
            FROM players, nationalities
            WHERE players.id = ? AND nationalities.id = ?`,
			[playerId, nationalityId, playerId, nationalityId]
		);

		if (result.affectedRows <= 0) {
			return NextResponse.json(
				{
					success: false,
					message:
						"Failed to associate the player with a nationality. Please verify the IDs and try again.",
				},
				{ status: 500 }
			);
		}

		connection.release();

		return NextResponse.json(
			{
				success: true,
				message: "Player's nationality successfully created",
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

import pool from "@/app/api/config/db";
import { NextResponse } from "next/server";

export async function GET() {
	try {
		const connection = await pool.getConnection();

		const [results] = await connection.execute(
			`
				SELECT players.id, players.firstName, players.picture, players_trending.position, games.game 
				FROM players
				INNER JOIN players_trending ON players.id = players_trending.player_id
				INNER JOIN players_games ON players.id = players_games.player_id
				INNER JOIN games ON games.id = players_games.game_id 
				ORDER BY players_trending.position ASC
				;
			`
		);

		connection.release();

		return NextResponse.json(
			{
				success: true,
				data: results,
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

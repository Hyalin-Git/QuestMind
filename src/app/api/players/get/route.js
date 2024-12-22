import { NextResponse } from "next/server";
import pool from "../../config/db";

export async function GET(req) {
	try {
		const { searchParams } = new URL(req.url);
		const game = searchParams.get("game");
		const region = searchParams.get("region");

		const connection = await pool.getConnection();

		let query = `
				SELECT players.id, players.firstName, players.picture, games.game, 
				nationalities.nationality,  
				nationalities.region
				FROM players
				INNER JOIN players_games ON players.id = players_games.player_id
				INNER JOIN games ON games.id = players_games.game_id 
				INNER JOIN players_nationalities ON players.id = players_nationalities.player_id
				INNER JOIN nationalities ON nationalities.id = players_nationalities.nationality_id
			`;

		const queryParams = [];

		if (game && region) {
			query += ` WHERE games.game = ? AND nationalities.region = ?`;
			queryParams.push(game, region);
		} else if (region) {
			query += ` WHERE nationalities.region = ?`;
			queryParams.push(region);
		} else if (game) {
			query += ` WHERE games.game = ?`;
			queryParams.push(game);
		}

		query += `;`;

		const [players] = await connection.query(query, queryParams);

		if (players.length <= 0) {
			return NextResponse.json(
				{
					success: false,
					message: "No players found in the Database",
				},
				{ status: 404 }
			);
		}

		connection.release();

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

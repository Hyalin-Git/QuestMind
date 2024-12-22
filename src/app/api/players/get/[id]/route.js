import pool from "@/app/api/config/db";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
	try {
		const { id } = await params;
		const connection = await pool.getConnection();

		let query = `
        SELECT 
            players.id, 
            players.firstname, 
            players.picture, 
            players.audience, 
            players.x_url, 
            players.tiktok_url, 
            players.instagram_url, 
            players.twitch_url, 
            players.youtube_url,
            games.game, 
            nationalities.nationality,
            GROUP_CONCAT(players_performances.performance SEPARATOR ', ') AS performances
        FROM players
        INNER JOIN players_games ON players.id = players_games.player_id
        INNER JOIN games ON games.id = players_games.game_id 
        INNER JOIN players_nationalities ON players.id = players_nationalities.player_id
        INNER JOIN nationalities ON nationalities.id = players_nationalities.nationality_id
        LEFT JOIN players_performances ON players.id = players_performances.player_id
        WHERE players.id = ?
        GROUP BY players.id, players.firstname, players.picture, players.audience, 
                 players.x_url, players.tiktok_url, players.instagram_url, 
                 players.twitch_url, players.youtube_url, games.game, nationalities.nationality
        ;
    `;

		const [player] = await connection.query(query, [id]);

		console.log(player);

		console.log(player);

		if (player.length <= 0) {
			return NextResponse.json(
				{
					success: false,
					message: "No player found in the Database",
				},
				{ status: 404 }
			);
		}

		connection.release();

		return NextResponse.json(
			{
				success: true,
				data: player,
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

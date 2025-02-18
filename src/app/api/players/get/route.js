import { NextResponse } from "next/server";
import pool from "../../config/db";

export async function GET(req) {
	try {
		const { searchParams } = new URL(req.url);
		const game = searchParams.get("game");
		const isMobile = searchParams.get("is_mobile");
		const region = searchParams.get("region");

		const connection = await pool.getConnection();

		let query = `
		SELECT players.id, players.lastName, players.firstName, players.username, players.picture, players.team, players.audience, players.x_url, 
		players.tiktok_url, 
		players.instagram_url, 
		players.twitch_url, 
		players.youtube_url, 
		players.lolpro_url, 
		players.leaguepedia_url, 
		players.vlr_url, 
		players.liquipedia_url, 
		players.hltv_url, 
		players.created_at, players.updated_at, games.game,   
		nationalities.region
		FROM players
		LEFT JOIN players_games ON players.id = players_games.player_id
		LEFT JOIN games ON games.id = players_games.game_id 
		LEFT JOIN players_nationalities ON players.id = players_nationalities.player_id
		LEFT JOIN nationalities ON nationalities.id = players_nationalities.nationality_id
	`;

		const queryConditions = [];
		const queryParams = [];

		if (game) {
			queryConditions.push(`games.game = ?`);
			queryParams.push(game);
		}

		if (isMobile) {
			queryConditions.push(`games.is_mobile = ?`);
			queryParams.push(isMobile);
		}

		if (region) {
			queryConditions.push(`nationalities.region = ?`);
			queryParams.push(region);
		}

		// Ajout des conditions à la requête si elles existent
		if (queryConditions.length > 0) {
			query += ` WHERE ` + queryConditions.join(" AND ");
		}

		query += `;`;

		const [players] = await connection.query(query, queryParams);

		// Si des joueurs sont récupérés, on filtre les doublons
		const uniquePlayers = [];
		const seenIds = new Set();

		players.forEach((player) => {
			if (!seenIds.has(player.id)) {
				seenIds.add(player.id);
				uniquePlayers.push(player);
			}
		});

		if (uniquePlayers.length <= 0) {
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
				data: uniquePlayers,
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

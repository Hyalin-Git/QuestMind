import pool from "@/app/api/config/db";
import { NextResponse } from "next/server";

export async function PUT(req, { params }) {
	try {
		const { id } = params;
		const { playerId, position } = await req.json();

		if (!playerId || position === null || position > 12) {
			return NextResponse.json(
				{
					success: false,
					message: "Invalid request",
				},
				{ status: 400 }
			);
		}

		const connection = await pool.getConnection();

		// Vérifier si le joueur existe
		const [player] = await connection.execute(
			"SELECT * FROM `players` WHERE `players`.`id` = ?",
			[playerId]
		);

		if (player.length <= 0) {
			connection.release();
			return NextResponse.json(
				{
					success: false,
					message: "No player found with the specified ID",
				},
				{ status: 404 }
			);
		}

		// Vérifier si la position est déjà prise
		const [existing] = await connection.execute(
			"SELECT * FROM `players_trending`"
		);

		if (existing.length > 0) {
			// Décaler l'ancien joueur à une autre position (ex: dernière place)
			await connection.execute(
				"UPDATE `players_trending` SET `position` = ? WHERE `position` = ?",
				[existing.length, position]
			);
		}

		// Mettre à jour le joueur dans trending
		const [result] = await connection.execute(
			"UPDATE `players_trending` SET `player_id` = ?, `position` = ? WHERE `id` = ?",
			[playerId, position, id]
		);

		if (result.affectedRows <= 0) {
			connection.release();
			return NextResponse.json(
				{
					success: false,
					message: "Impossible to update a non-existent player trending",
				},
				{ status: 404 }
			);
		}

		connection.release();

		return NextResponse.json(
			{
				success: true,
				message: "Player trending successfully updated",
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

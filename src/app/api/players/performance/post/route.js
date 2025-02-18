import pool from "@/app/api/config/db";
import { NextResponse } from "next/server";

export async function POST(req) {
	try {
		const { playerId, performance } = await req.json();

		if (!playerId || !performance) {
			return NextResponse.json({
				success: false,
				message: "Veuillez renseigner tous les champs",
			});
		}

		const connection = await pool.getConnection();

		const [result] = await connection.execute(
			`INSERT INTO players_performances (performance, player_id)
             VALUES (?, ?)`,
			[performance, playerId]
		);

		if (result.affectedRows === 0) {
			return NextResponse.json({
				success: false,
				message: "Une erreur est survenue lors de l'ajout de la performance",
			});
		}

		connection.release();

		return NextResponse.json({
			success: true,
			message: "Performance ajoutée avec succès",
		});
	} catch (err) {
		return NextResponse.json(
			{
				success: false,
				message: err.message || "Une erreur est survenue",
			},
			{ status: 500 }
		);
	}
}

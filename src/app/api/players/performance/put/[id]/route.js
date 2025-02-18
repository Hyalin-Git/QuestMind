import pool from "@/app/api/config/db";
import { NextResponse } from "next/server";

export async function PUT(req, { params }) {
	try {
		const { id } = params;
		const { performance } = await req.json();

		if (!performance) {
			return NextResponse.json({
				success: false,
				message: "Veuillez renseigner tous les champs",
			});
		}

		const connection = await pool.getConnection();

		const [result] = await connection.execute(
			"UPDATE players_performances SET `performance` = ? WHERE id = ?",
			[performance, id]
		);

		if (result.affectedRows === 0) {
			return NextResponse.json(
				{
					success: false,
					message: "Aucune performance trouvée à mettre à jour",
				},
				{ status: 404 }
			);
		}

		connection.release();

		return NextResponse.json({
			success: true,
			message: "Performance mise à jour avec succès",
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

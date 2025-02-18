import pool from "@/app/api/config/db";
import { NextResponse } from "next/server";

export async function DELETE(req, { params }) {
	try {
		const { id } = params;

		const connection = await pool.getConnection();

		const [result] = await connection.execute(
			`DELETE FROM players_performances WHERE id = ?`,
			[id]
		);

		if (result.affectedRows === 0) {
			return NextResponse.json(
				{
					success: false,
					message: "Aucune performance trouvée à supprimer",
				},
				{ status: 404 }
			);
		}

		connection.release();

		return NextResponse.json({
			success: true,
			message: "Performance supprimée avec succès",
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

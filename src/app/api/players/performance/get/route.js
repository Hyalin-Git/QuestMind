import pool from "@/app/api/config/db";
import { NextResponse } from "next/server";

export async function GET(req) {
	try {
		const connection = await pool.getConnection();

		const [performances] = await connection.execute(
			`SELECT performances.*, players.username, players.firstname, players.lastname, players.picture
             FROM players_performances AS performances 
             JOIN players ON performances.player_id = players.id
             ORDER BY performances.player_id;
             `
		);

		if (performances.length <= 0) {
			return NextResponse.json(
				{
					success: false,
					message: "Aucune performance trouvée",
				},
				{ status: 404 }
			);
		}

		connection.release();

		return NextResponse.json({
			success: true,
			message: "Performances et joueurs trouvés",
			data: performances,
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

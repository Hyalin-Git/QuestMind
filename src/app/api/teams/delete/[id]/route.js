import pool from "@/app/api/config/db";
import { deleteFile } from "@/libs/handleFiles";
import { NextResponse } from "next/server";

export async function DELETE(req, { params }) {
	try {
		const { id } = await params;

		const connection = await pool.getConnection();

		const [team] = await connection.execute(
			"SELECT * FROM `teams` WHERE `teams`.`id` = ?",
			[id]
		);

		if (team.length <= 0) {
			return NextResponse.json(
				{
					success: false,
					message: "Impossible to delete a non-existant team",
				},
				{ status: 404 }
			);
		}

		if (team[0].picture) await deleteFile(team[0].picture);

		await connection.execute("DELETE FROM `teams` WHERE `teams`.`id` = ?", [
			id,
		]);

		connection.release();

		return NextResponse.json(
			{
				success: true,
				message: "Team successfully deleted",
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

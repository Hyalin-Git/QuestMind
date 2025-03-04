import pool from "@/app/api/config/db";
import { destroyFile } from "@/helpers/cloudinary";
import { NextResponse } from "next/server";

export async function DELETE(req, { params }) {
	try {
		const { id } = await params;

		const connection = await pool.getConnection();

		const [player] = await connection.execute(
			"SELECT * FROM `players` WHERE `players`.`id` = ?",
			[id]
		);

		if (player.length <= 0) {
			return NextResponse.json(
				{
					success: false,
					message: "Impossible to delete a non-existant player",
				},
				{ status: 404 }
			);
		}

		if (player[0]?.picture) {
			await destroyFile(player[0]?.picture);
		}

		await connection.execute("DELETE FROM `players` WHERE `players`.`id` = ?", [
			id,
		]);

		connection.release();

		return NextResponse.json(
			{
				success: true,
				message: "Player successfully deleted",
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

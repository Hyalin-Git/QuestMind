import pool from "@/app/api/config/db";
import { deleteFile } from "@/libs/handleFiles";
import { NextResponse } from "next/server";

export async function DELETE(req, { params }) {
	try {
		const { id } = await params;

		const connection = await pool.getConnection();

		// Fetch the game based on the given ID to get the picture path
		const [game] = await connection.execute(
			"SELECT * FROM `games` WHERE `games`.`id` = ?",
			[id]
		);

		// If no game returned then return an error
		if (game.length <= 0) {
			return NextResponse.json(
				{
					success: false,
					message: "Impossible to delete a non-existant game",
				},
				{ status: 404 }
			);
		}

		if (game[0].picture) {
			const res = await deleteFile(game[0].picture);
			console.log(res);
		}

		await connection.execute("DELETE FROM `games` WHERE `games`.`id` = ?", [
			id,
		]);

		connection.release();

		return NextResponse.json(
			{
				success: true,
				message: "Game successfully deleted",
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

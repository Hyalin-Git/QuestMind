import pool from "@/app/api/config/db";
import { deleteFile, saveFile } from "@/libs/handleFiles";
import { gameSchema } from "@/libs/zod";
import { NextResponse } from "next/server";

export async function PUT(req, { params }) {
	try {
		const { id } = await params;
		const formData = await req.formData();
		const game = formData.get("game");
		const picture = formData.get("picture");
		const isMobile = formData.get("isMobile");

		// If not a mobile game the picture is needed
		if (isMobile === "0") {
			if (!picture) {
				return NextResponse.json(
					{
						success: false,
						message: "Invalid request",
					},
					{ status: 400 }
				);
			}
		}

		const validation = gameSchema.safeParse({ game, isMobile });

		if (!validation.success) {
			const { errors } = validation.error;

			return NextResponse.json(
				{
					success: false,
					message: "Invalid request",
					error: errors,
				},
				{ status: 400 }
			);
		}

		const connection = await pool.getConnection();

		const [result] = await connection.execute(
			"SELECT * FROM `games` WHERE `games`.`id` = ?",
			[id]
		);

		if (result.length <= 0) {
			return NextResponse.json(
				{
					success: false,
					message: "Impossible to update a non-existant game",
				},
				{ status: 404 }
			);
		}

		if (game[0].picture) await deleteFile(game[0].picture);

		const savedPicture = picture
			? await saveFile(picture, game.toLowerCase(), "games")
			: null;

		await connection.execute(
			"UPDATE `games` SET `game` = ?, `picture` = ?, `is_mobile` = ?, `updated_at` = NOW() WHERE `games`.`id` = ?",
			[game, savedPicture, isMobile, id]
		);

		connection.release();

		return NextResponse.json(
			{
				success: true,
				message: "Game successfully updated",
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

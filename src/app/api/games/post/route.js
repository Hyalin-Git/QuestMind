import { deleteFile, saveFile } from "@/libs/handleFiles";
import { gameSchema } from "@/libs/zod";
import { NextResponse } from "next/server";
import pool from "../../config/db";

export async function POST(req) {
	try {
		const formData = await req.formData();
		const game = formData.get("game");
		const picture = formData.get("picture");
		const isMobile = formData.get("isMobile");

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

		const [savedGame] = await connection.execute(
			"INSERT INTO `games` (`game`, `picture`, `is_mobile`) VALUES (?, ?, ?)",
			[game, null, isMobile]
		);

		if (savedGame.affectedRows <= 0) {
			return NextResponse.json(
				{
					success: false,
					message: "An error occurred while creating the game",
					error: errors,
				},
				{ status: 500 }
			);
		}

		const savedPicture = picture
			? await saveFile(picture, game.toLowerCase(), "games")
			: null;

		await connection.execute(
			"UPDATE `games` SET `picture` = ? WHERE `games`.`id` = ?",
			[savedPicture, savedGame.insertId]
		);

		connection.release();

		return NextResponse.json(
			{
				success: true,
				message: "Game successfully created",
			},
			{ status: 201 }
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

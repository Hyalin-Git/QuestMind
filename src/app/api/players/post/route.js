import { playerSchema } from "@/libs/zod";
import { NextResponse } from "next/server";
import pool from "../../config/db";
import { saveFile } from "@/libs/handleFiles";

export async function POST(req) {
	try {
		const formData = await req.formData();
		const lastname = formData.get("lastname");
		const firstname = formData.get("firstname");
		const username = formData.get("username");
		const picture = formData.get("picture");
		const genre = formData.get("genre");
		const audience = formData.get("audience");

		const validation = playerSchema.safeParse({
			lastname,
			firstname,
			username,
			picture,
			genre,
			audience,
		});

		if (!validation.success) {
			const { errors } = validation.error;

			return NextResponse.json(
				{
					success: false,
					message: "Invalid request",
					errors: errors,
				},
				{ status: 400 }
			);
		}

		const connection = await pool.getConnection();

		const [savedPlayer] = await connection.execute(
			"INSERT INTO `players` (`lastname`, `firstname`, `username`, `picture`, `genre` `audience`) VALUES (?, ?, ?, ?, ?, ?)",
			[lastname, firstname, username, null, genre, audience]
		);

		if (savedPlayer.affectedRows <= 0) {
			return NextResponse.json(
				{
					success: false,
					message: "An error occurred while creating the player",
				},
				{ status: 500 }
			);
		}

		const savedPicture = picture
			? await saveFile(picture, username.toLowerCase(), "players")
			: null;

		await connection.execute(
			"UPDATE `players` SET `picture` = ? WHERE `players`.`id` = ?",
			[savedPicture, savedPlayer?.insertId]
		);

		connection.release();

		return NextResponse.json(
			{
				success: true,
				message: "Player successfully created",
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

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
		const team = formData.get("team");
		const genre = formData.get("genre");
		const audience = formData.get("audience");
		const xUrl = formData.get("xUrl");
		const tiktokUrl = formData.get("tiktokUrl");
		const instagramUrl = formData.get("instagramUrl");
		const youtubeUrl = formData.get("youtubeUrl");
		const twitchUrl = formData.get("twitchUrl");

		const validation = playerSchema.safeParse({
			lastname,
			firstname,
			username,
			picture,
			team,
			genre,
			audience,
			xUrl,
			tiktokUrl,
			instagramUrl,
			youtubeUrl,
			twitchUrl,
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
			"INSERT INTO `players` (`lastname`, `firstname`, `username`, `picture`, `team`, `genre`, `audience`, `x_url`, `tiktok_url`, `instagram_url`, `youtube_url`, `twitch_url`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
			[
				lastname,
				firstname,
				username,
				null,
				team,
				genre,
				audience,
				xUrl,
				tiktokUrl,
				instagramUrl,
				youtubeUrl,
				twitchUrl,
			]
		);

		if (savedPlayer.affectedRows <= 0) {
			return NextResponse.json(
				{
					success: false,
					message: "An error occurred while creating the player",
					playerId: savedPlayer.insertId,
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

import { playerSchema } from "@/libs/zod";
import { NextResponse } from "next/server";
import pool from "../../config/db";
import { uploadFile } from "@/helpers/cloudinary";

export async function POST(req) {
	try {
		const formData = await req.formData();
		const lastname = formData.get("lastname");
		const firstname = formData.get("firstname");
		const username = formData.get("username");
		const picture = formData.get("picture");
		const team = formData.get("team");
		const audience = formData.get("audience");
		const xUrl = formData.get("xUrl");
		const tiktokUrl = formData.get("tiktokUrl");
		const instagramUrl = formData.get("instagramUrl");
		const youtubeUrl = formData.get("youtubeUrl");
		const twitchUrl = formData.get("twitchUrl");
		const lolproUrl = formData.get("lolproUrl");
		const leaguepediaUrl = formData.get("leaguepediaUrl");
		const vlrUrl = formData.get("vlrUrl");
		const liquipediaUrl = formData.get("liquipediaUrl");
		const hltvUrl = formData.get("hltvUrl");

		const validation = playerSchema.safeParse({
			lastname,
			firstname,
			username,
			picture,
			team,
			audience,
			xUrl,
			tiktokUrl,
			instagramUrl,
			youtubeUrl,
			twitchUrl,
			lolproUrl,
			leaguepediaUrl,
			vlrUrl,
			liquipediaUrl,
			hltvUrl,
		});

		if (!validation.success) {
			const errors = validation.error.flatten().fieldErrors;

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

		const base64 = await picture.arrayBuffer(); // Convert the file to a base64 string
		const buffer = Buffer.from(base64); // Convert the base64 string to a buffer

		const result = await uploadFile(buffer);

		const [savedPlayer] = await connection.execute(
			"INSERT INTO `players` (`lastname`, `firstname`, `username`, `picture`, `team`, `audience`, `x_url`, `tiktok_url`, `instagram_url`, `youtube_url`, `twitch_url`, `lolpro_url`, `leaguepedia_url`, `vlr_url`, `liquipedia_url`, `hltv_url`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
			[
				lastname,
				firstname,
				username,
				result?.secure_url,
				team,
				audience,
				xUrl,
				tiktokUrl,
				instagramUrl,
				youtubeUrl,
				twitchUrl,
				lolproUrl,
				leaguepediaUrl,
				vlrUrl,
				liquipediaUrl,
				hltvUrl,
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

		connection.release();

		return NextResponse.json(
			{
				success: true,
				message: "Player successfully created",
				insertId: savedPlayer?.insertId,
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

import pool from "@/app/api/config/db";
import { destroyFile, uploadFile } from "@/helpers/cloudinary";
import { deleteFile, saveFile } from "@/libs/handleFiles";
import { playerSchema } from "@/libs/zod";
import { NextResponse } from "next/server";

export async function PUT(req, { params }) {
	try {
		const { id } = await params;
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

		const [player] = await connection.execute(
			"SELECT * FROM `players` WHERE `players`.`id` = ?",
			[id]
		);

		if (player.length <= 0) {
			return NextResponse.json(
				{
					success: false,
					message: "Impossible to update a non-existant player",
				},
				{ status: 404 }
			);
		}

		if (player[0].picture && picture.name !== "undefined") {
			await destroyFile(player[0].picture);
		}

		let newPicture = player[0].picture;

		if (picture.name !== "undefined") {
			const base64 = await picture.arrayBuffer(); // Convert the file to a base64 string
			const buffer = Buffer.from(base64); // Convert the base64 string to a buffer

			const result = await uploadFile(buffer);

			newPicture = result.secure_url;
		}

		await connection.execute(
			"UPDATE `players` SET `lastname` = ?, `firstname` = ?, `username` = ?, `picture` = ?, `team` = ?, `audience` = ?, `x_url` = ?, `tiktok_url` = ?, `instagram_url` = ?, `youtube_url` = ?, `twitch_url` = ?, `lolpro_url` = ?, `leaguepedia_url` = ?, `vlr_url` = ?, `liquipedia_url` = ?, `hltv_url` = ?, updated_at = NOW() WHERE `players`.`id` = ?",
			[
				lastname,
				firstname,
				username,
				newPicture,
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
				id,
			]
		);

		connection.release();

		return NextResponse.json(
			{
				success: true,
				message: "Player successfully updated",
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

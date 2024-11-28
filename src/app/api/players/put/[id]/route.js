import pool from "@/app/api/config/db";
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
		const genre = formData.get("genre");
		const audience = formData.get("audience");
		const firstPerformance = formData.get("firstPerformance");
		const secondPerformance = formData.get("secondPerformance");
		const thirdPerformance = formData.get("thirdPerformance");
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
			genre,
			audience,
			firstPerformance,
			secondPerformance,
			thirdPerformance,
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

		const [result] = await connection.execute(
			"SELECT * FROM `players` WHERE `players`.`id` = ?",
			[id]
		);

		if (result.length <= 0) {
			return NextResponse.json(
				{
					success: false,
					message: "Impossible to update a non-existant player",
				},
				{ status: 404 }
			);
		}

		if (result[0].picture) await deleteFile(result[0].picture);

		const savedPicture = picture
			? await saveFile(picture, username.toLowerCase(), "players")
			: null;

		await connection.execute(
			"UPDATE `players` SET `lastname` = ?, `firstname` = ?, `username` = ?, `picture` = ?, `genre` = ?, `audience` = ?, `first_performance` = ?, `second_performance` = ?, `third_performance` = ?, `x_url` = ?, `tiktok_url` = ?, `instagram_url` = ?, `youtube_url` = ?, `twitch_url` = ?, updated_at = NOW() WHERE `players`.`id` = ?",
			[
				lastname,
				firstname,
				username,
				savedPicture,
				genre,
				audience,
				firstPerformance,
				secondPerformance,
				thirdPerformance,
				xUrl,
				tiktokUrl,
				instagramUrl,
				youtubeUrl,
				twitchUrl,
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

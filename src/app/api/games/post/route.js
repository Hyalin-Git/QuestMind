import { gameSchema } from "@/libs/zod";
import { NextResponse } from "next/server";
import pool from "../../config/db";
import { uploadFile } from "@/helpers/cloudinary";

export async function POST(req) {
	try {
		const formData = await req.formData();
		const game = formData.get("game");
		const picture = formData.get("picture");
		const isMobile = formData.get("isMobile");

		const validation = gameSchema.safeParse({ game, isMobile });

		if (!validation.success) {
			const errors = validation.error.flatten().fieldErrors;

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

		let picturePath = null;

		if (picture) {
			if (picture?.name !== "undefined") {
				const base64 = await picture?.arrayBuffer();
				const buffer = Buffer.from(base64);

				const res = await uploadFile(buffer);

				picturePath = res?.secure_url;
			}
		}

		const [savedGame] = await connection.execute(
			"INSERT INTO `games` (`game`, `picture`, `is_mobile`) VALUES (?, ?, ?)",
			[game, picturePath, isMobile]
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

		connection.release();

		return NextResponse.json(
			{
				success: true,
				message: "Game successfully created",
			},
			{ status: 201 }
		);
	} catch (err) {
		console.log(err);
		return NextResponse.json(
			{
				success: false,
				message: err.message || "An unexpected error occurred",
			},
			{ status: 500 }
		);
	}
}

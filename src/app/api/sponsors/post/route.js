import { NextResponse } from "next/server";
import pool from "../../config/db";
import { sponsorsSchema } from "@/libs/zod";
import { saveFile } from "@/libs/handleFiles";

export async function POST(req) {
	try {
		const formData = await req.formData();
		const sponsor = formData.get("sponsor");
		const picture = formData.get("picture");

		const validation = sponsorsSchema.safeParse({ sponsor, picture });

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

		const [savedSponsor] = await connection.execute(
			"INSERT INTO `sponsors` (`sponsor`, `picture`) VALUES (?, ?)",
			[sponsor, null]
		);

		if (savedSponsor.affectedRows <= 0) {
			return NextResponse.json(
				{
					success: false,
					message: "An error occurred while creating a sponsor",
				},
				{ status: 500 }
			);
		}

		const savedPicture = picture
			? await saveFile(picture, sponsor.toLowerCase(), "sponsors")
			: null;

		await connection.execute(
			"UPDATE `sponsors` SET `picture` = ? WHERE `sponsors`.`id` = ?",
			[savedPicture, savedSponsor.insertId]
		);

		connection.release();

		return NextResponse.json(
			{
				success: true,
				message: "Sponsor successfully created",
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

import pool from "@/app/api/config/db";
import { destroyFile, uploadFile } from "@/helpers/cloudinary";
import { sponsorsSchema } from "@/libs/zod";
import { NextResponse } from "next/server";

export async function PUT(req, { params }) {
	try {
		const { id } = await params;
		const formData = await req.formData();
		const sponsor = formData.get("sponsor");
		const picture = formData.get("picture");

		const validation = sponsorsSchema.safeParse({
			sponsor,
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
			"SELECT * FROM `sponsors` WHERE `sponsors`.`id` = ?",
			[id]
		);

		if (result.length <= 0) {
			return NextResponse.json(
				{
					success: false,
					message: "Impossible to update a non-existant sponsor",
				},
				{ status: 404 }
			);
		}

		if (result[0].picture && picture) {
			await destroyFile(result[0].picture);
		}

		let savedPicture = result[0].picture;

		if (picture) {
			const base64 = await picture?.arrayBuffer();
			const buffer = Buffer.from(base64);

			const res = await uploadFile(buffer);
			savedPicture = res?.secure_url;
		}

		await connection.execute(
			"UPDATE `sponsors` SET `sponsor` = ?, `picture` = ?, updated_at = NOW() WHERE `sponsors`.`id` = ?",
			[sponsor, savedPicture, id]
		);

		connection.release();

		return NextResponse.json(
			{
				success: true,
				data: "Sponsor successfully updated",
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

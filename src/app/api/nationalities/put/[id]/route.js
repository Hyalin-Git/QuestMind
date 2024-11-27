import pool from "@/app/api/config/db";
import { deleteFile, saveFile } from "@/libs/handleFiles";
import { nationalitiesSchema } from "@/libs/zod";
import { NextResponse } from "next/server";

export async function PUT(req, { params }) {
	try {
		const { id } = await params;
		const formData = await req.formData();
		const nationality = formData.get("nationality");
		const picture = formData.get("picture");

		const validation = nationalitiesSchema.safeParse({
			nationality,
			picture,
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
			"SELECT * FROM `nationalities` WHERE `nationalities`.`id` = ?",
			[id]
		);

		if (result.length <= 0) {
			return NextResponse.json(
				{
					success: false,
					message: "Impossible to update a non-existant nationality",
				},
				{ status: 404 }
			);
		}

		if (result[0].picture) await deleteFile(result[0].picture);

		const savedPicture = picture
			? await saveFile(picture, nationality.toLowerCase(), "nationalities")
			: null;

		await connection.execute(
			"UPDATE `nationalities` SET `nationality` = ?, `picture` = ?, updated_at = NOW() WHERE `nationalities`.`id` = ?",
			[nationality, savedPicture, id]
		);

		connection.release();

		return NextResponse.json(
			{
				success: true,
				data: "Nationality successfully updated",
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

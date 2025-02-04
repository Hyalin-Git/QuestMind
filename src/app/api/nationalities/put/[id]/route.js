import pool from "@/app/api/config/db";
import { deleteFile, saveFile } from "@/libs/handleFiles";
import { nationalitiesSchema } from "@/libs/zod";
import { NextResponse } from "next/server";

export async function PUT(req, { params }) {
	try {
		const { id } = await params;
		const { region } = await req.json();

		const validation = nationalitiesSchema.safeParse({
			region,
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

		await connection.execute(
			"UPDATE `nationalities` SET `region` = ?, updated_at = NOW() WHERE `nationalities`.`id` = ?",
			[region, id]
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
